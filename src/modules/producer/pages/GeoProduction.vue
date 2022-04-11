<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md">
      <div class="items-center">
        <q-toolbar-title>
          <span class="text-subtitle2 text-grey q-pa-xs"
            >Geolocalización de producciones</span
          >
        </q-toolbar-title>
        <div class="map-production" id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import useMapbox from "../composables/useMapbox";

export default defineComponent({
  name: "Geoloaction",
  components: {},
  setup() {
    const { createMap } = useMapbox();

    let map = {
      container: "map",
      center: [-67.564368, -28.065752],
      zoom: 13,
      markers: [
        {
          coordinates: [-67.560005, -28.057496],
          title: `<div class="text-h6">Producción</div>`,
        },
      ],
    };

    onMounted(async () => {
      await createMap(map);
    });

    return {};
  },
});
</script>

<style lang="scss" scoped>
.map-production {
  width: 100%;
  height: 80vh;
}
</style>
