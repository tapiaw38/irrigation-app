<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-users"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Detalle Sección</span>
      </q-toolbar-title>
      <div class="row">
        <div class="col-md-6 col-sm-12 q-mb-lg items-left">
          <div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">
                Numero de Sección
              </div>
              <div class="text-h6">{{ section?.section_number }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">
                Descripción
              </div>
              <div class="text-h6">{{ section?.name }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">
                Ultima Actualización
              </div>
              <div class="text-h6">{{ formatDate(section?.updated_at) }}</div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <q-toolbar-title>
            <span class="text-subtitle2 text-secondary q-pa-xs">Tomas</span>
            <template v-if="intakesBySection.length > 0">
              <div
                v-for="intake in intakesBySection"
                :key="intake.id"
                class="row"
              >
                <div class="text-h6">
                  {{ intake.intake_number }}: {{ intake?.name }}
                </div>
                <div class="q-ml-sm">
                  <q-btn
                    color="primary"
                    flat
                    label="Ver"
                    @click="
                      $router.push({
                        name: 'intake_detail',
                        params: { id: intake.id },
                      })
                    "
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="text-h6">No hay tomas</div>
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
import { computed, defineComponent, onMounted, ref } from "vue";

// composables
import useSection from "../composables/useSection";
import useMapbox from "../../producer/composables/useMapbox";

// helpers
import { formatDate } from "../../../helpers/formatDate";

export default defineComponent({
  name: "SectionDetail",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { section, getSectionById, intakes } = useSection();
    const { createMap } = useMapbox();

    let intakesBySection = ref([]);

    const getIntakeBySection = (id) => {
      intakesBySection.value = [];
      intakes.value.map((intake) => {
        if (intake.section.id === id) {
          intakesBySection.value = [...intakesBySection.value, intake];
        }
      });
      return intakesBySection.value;
    };

    // mapbox
    let map = {
      container: "map",
      center: [-67.564368, -28.065752],
      zoom: 13,
      markers: intakes.value.map((intake) => {
        return {
          coordinates: [intake.longitude || 0, intake.latitude || 0],
          title: `<div class="col">
                    <div class="text-h6">Toma</div>
                    <div class="text-subtitle2">Sección: ${intake.section?.section_number}</div>
                    <div class="text-subtitle2">Toma N°${intake.intake_number}</div>
                    <div class="text-subtitle2">${intake.name}</div>
                  </div>
                  `,
        };
      }),
    };

    onMounted(() => {
      getSectionById(props.id);
      createMap(map);
    });

    return {
      section,
      formatDate,
      intakesBySection: computed(() => {
        return getIntakeBySection(props.id);
      }),
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
