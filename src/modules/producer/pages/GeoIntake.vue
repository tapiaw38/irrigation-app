<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md">
      <div class="items-center">
        <q-toolbar-title>
          <span class="text-subtitle2 text-grey q-pa-xs"
            >Geolocalización de Tomas de agua</span
          >
        </q-toolbar-title>
        <div class="map-intake" id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, watch, ref } from "vue";

import useMapbox from "../composables/useMapbox";
import useSection from "../../section/composables/useSection";
import useConfiguration from "../../configuration/composables/useConfiguration";

export default defineComponent({
  name: "GeoIntake",
  components: {},
  setup() {
    const { createMap } = useMapbox();
    const { intakes } = useSection();
    const { configuration } = useConfiguration();
    const isMounted = ref(false);
    const mapCreated = ref(false);

    const createMapWithData = () => {
      if (isMounted.value && intakes.value && intakes.value.length > 0 && !mapCreated.value) {
        const validIntakes = intakes.value
          .filter(intake =>
            intake.latitude &&
            intake.longitude &&
            intake.latitude !== 0 &&
            intake.longitude !== 0
          )
          .sort((a, b) => {
            const numA = parseInt(a.intake_number) || 0;
            const numB = parseInt(b.intake_number) || 0;
            return numA - numB;
          });

        if (validIntakes.length === 0) {
          return;
        }

        const lineCoordinates = validIntakes.map(intake => [
          parseFloat(intake.longitude),
          parseFloat(intake.latitude)
        ]);

        const mapConfig = {
          container: "map",
          center: configuration.value
            ? [configuration.value.default_location.longitude, configuration.value.default_location.latitude]
            : [-67.564368, -28.065752],
          zoom: configuration.value ? configuration.value.default_location.zoom : 13,
          markers: validIntakes.map((intake) => {
            return {
              coordinates: [parseFloat(intake.longitude), parseFloat(intake.latitude)],
              title: `<div class="col">
                        <div class="text-h6">Toma</div>
                        <div class="text-subtitle2">Sección: ${intake.section?.section_number || ''}</div>
                        <div class="text-subtitle2">Toma N°${intake.intake_number || ''}</div>
                        <div class="text-subtitle2">${intake.name || ''}</div>
                      </div>
                      `,
            };
          }),
          line: {
            coordinates: lineCoordinates,
            color: '#3b9ddd',
            width: 3
          }
        };
        createMap(mapConfig);
        mapCreated.value = true;
      }
    };

    watch(
      () => intakes.value,
      () => {
        createMapWithData();
      },
      { deep: true }
    );

    onMounted(() => {
      isMounted.value = true;
      createMapWithData();
    });

    return {};
  },
});
</script>

<style lang="scss" scoped>
.map-intake {
  width: 100%;
  height: 80vh;
}
</style>
