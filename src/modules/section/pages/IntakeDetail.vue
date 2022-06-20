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
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";

// composables
import useSection from "../composables/useSection";
import useMapbox from "../../producer/composables/useMapbox";

export default defineComponent({
  name: "IntakeDetail",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { intake, getIntakeById, deleteIntakeProduction } = useSection();
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

    onMounted(async () => {
      const { ok } = await getIntakeById(props.id);
      if (ok) {
        map.value.markers = createMarkers.value;
        createMap(map.value);
      }
    });

    let intakeProductions = ref({
      intake_id: null,
      production_id: null,
    });

    const deleteIntakeProductionById = async (idProduction) => {
      intakeProductions.value.intake_id = String(props.id);
      intakeProductions.value.production_id = String(idProduction);
      const { ok } = await deleteIntakeProduction(intakeProductions.value);
      if (ok) {
        console.log("ok");
        map.value.markers = createMarkers.value;
        createMap(map.value);
      }
    };

    return {
      intake,
      deleteIntakeProductionById,
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
