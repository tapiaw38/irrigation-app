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
import { defineComponent, onMounted } from "vue";

//composables
import useMapbox from "../composables/useMapbox";
import useSection from "../../section/composables/useSection";

export default defineComponent({
  name: "GeoIntake",
  components: {},
  setup() {
    const { createMap } = useMapbox();
    const { intakes } = useSection();

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
      createMap(map);
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
