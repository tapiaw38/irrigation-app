<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-water"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Detalle Tomas de Agua</span>
      </q-toolbar-title>
      <div class="row">
        <div class="col-md-6 col-sm-12 items-left q-mb-lg">
          <div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">
                Numero de Toma
              </div>
              <div class="text-h6">{{ intake?.intake_number }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">
                Descripción
              </div>
              <div class="text-h6">{{ intake?.name }}</div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <q-toolbar-title>
            <span class="text-subtitle2 text-secondary q-pa-xs"
              >Producciones en Toma</span
            >
            <template v-if="intake?.productions">
              <div
                v-for="production in intake?.productions"
                :key="production.id"
                class="row"
              >
                <div class="text-h6">
                  <span class="text-subtitle2">{{
                    production.watering_order &&
                    `${production.watering_order} - `
                  }}</span>
                  {{ production.producer.first_name }}
                  {{ production.producer.last_name }}: {{ production?.name }}
                  {{ production?.production_type }}
                </div>
                <div class="q-ml-sm">
                  <q-btn
                    color="primary"
                    flat
                    label="Ver"
                    @click="
                      $router.push({
                        name: 'production_detail',
                        params: { id: production.id },
                      })
                    "
                  />
                  <q-btn
                    color="primary"
                    flat
                    label="Editar"
                    @click="openAlertHandler(production)"
                  />
                  <q-btn
                    color="negative"
                    flat
                    label="Quitar de Toma"
                    @click="deleteIntakeProductionById(production.id)"
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="text-h6">No hay producciones relacionadas</div>
            </template>
          </q-toolbar-title>
        </div>
        <div class="col-12 q-mt-md">
          <q-toolbar-title>
            <span class="text-subtitle2 text-grey q-pa-xs"
              >Geolocalizacion</span
            >
          </q-toolbar-title>
          <div class="map-production" id="map"></div>
        </div>
      </div>
    </div>
    <!-- Alert -->
    <alert
      :dialog="isAlertOpen"
      :headerMessage="headerMessage"
      :message="alertMessage"
      :showIcon="false"
      @close="closeAlert()"
    >
      <template v-slot:body>
        <!-- content for the body slot -->
        <div class="q-pa-md row justify-center">
          <div>
            <q-input
              label="Orden de riego"
              v-model="intakeProductions.watering_order"
              type="number"
            ></q-input>
            <q-btn
              class="full-width q-mt-md"
              label="Aplicar"
              color="primary"
              @click="updateIntakeProductionbyId()"
            />
          </div>
        </div>
      </template>
    </alert>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";

// components
import Alert from "../../../components/Alert.vue";

// composables
import useSection from "../composables/useSection";
import useMapbox from "../../producer/composables/useMapbox";
import useAlert from "../../../composables/useAlert";

export default defineComponent({
  name: "IntakeDetail",
  components: {
    Alert,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const {
      intake,
      getIntakeById,
      updateIntakeProduction,
      deleteIntakeProduction,
    } = useSection();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert, openAlert } =
      useAlert();
    const { createMap } = useMapbox();

    const map = ref({
      container: "map",
      center: [-67.564368, -28.065752],
      zoom: 13,
      markers: [],
    });

    const createMarkers = computed(() => {
      return intake?.value.productions?.map((production) => {
        return {
          coordinates: [production.longitude || 0, production.latitude || 0],
          title: `<div class="col">
                    <div class="text-h6">Produccion</div>
                    <div class="text-subtitle2">${production.producer.first_name} ${production.producer.last_name}</div>
                    <div class="text-subtitle2">${production.name}</div>
                    <div class="text-subtitle2">${production.production_type}</div>
                  </div>
                  `,
        };
      });
    });

    const createIntakeMarker = computed(() => {
      return [
        {
          coordinates: [
            intake?.value.longitude || 0,
            intake?.value.latitude || 0,
          ],
          title: `<div class="col">
                    <div class="text-h6">Toma</div>
                    <div class="text-subtitle2">Sección: ${intake?.value.section?.section_number}</div>
                    <div class="text-subtitle2">Toma N°${intake?.value.intake_number}</div>
                    <div class="text-subtitle2">${intake?.value.name}</div>
                  </div>
                  `,
        },
      ];
    });

    onMounted(async () => {
      const { ok } = await getIntakeById(props.id);
      if (ok) {
        map.value.markers = createMarkers.value
          ? [...createMarkers.value, ...createIntakeMarker.value]
          : createIntakeMarker.value;

        createMap(map.value);
      }
    });

    let intakeProductions = ref({
      intake_id: null,
      production_id: null,
      watering_order: null,
    });

    // update intake productions
    const openAlertHandler = (production) => {
      intakeProductions.value.intake_id = String(props.id);
      intakeProductions.value.production_id = String(production.id);
      intakeProductions.value.watering_order = production.watering_order;
      openAlert("Editar orden de riego");
    };

    const updateIntakeProductionbyId = async () => {
      intakeProductions.value.intake_id = String(
        intakeProductions.value.intake_id
      );
      intakeProductions.value.production_id = String(
        intakeProductions.value.production_id
      );
      intakeProductions.value.watering_order = Number(
        intakeProductions.value.watering_order
      );

      const { ok } = await updateIntakeProduction(intakeProductions.value);
      if (ok) {
        intakeProductions.value = {
          intake_id: null,
          production_id: null,
          watering_order: null,
        };
        closeAlert();
      }
    };

    // delete intake production
    const deleteIntakeProductionById = async (idProduction) => {
      intakeProductions.value.intake_id = String(props.id);
      intakeProductions.value.production_id = String(idProduction);
      const { ok } = await deleteIntakeProduction(intakeProductions.value);
      if (ok) {
        map.value.markers = createMarkers.value
          ? [...createMarkers.value, ...createIntakeMarker.value]
          : createIntakeMarker.value;

        createMap(map.value);
      }
    };

    return {
      intake,
      intakeProductions,
      updateIntakeProductionbyId,
      deleteIntakeProductionById,
      isAlertOpen,
      headerMessage,
      alertMessage,
      closeAlert,
      openAlert,
      openAlertHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.map-production {
  width: 100%;
  height: 300px;
}

.mapboxgl-control-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  button {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }
}
</style>
