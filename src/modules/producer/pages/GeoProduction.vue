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
import { defineComponent, onMounted, watch, ref } from "vue";

import useMapbox from "../composables/useMapbox";
import useProducer from "../../producer/composables/useProducer";

export default defineComponent({
  name: "GeoProduction",
  components: {},
  setup() {
    const { createMap } = useMapbox();
    const { productions } = useProducer();
    const isMounted = ref(false);
    const mapCreated = ref(false);

    const createMapWithData = () => {
      if (isMounted.value && productions.value && productions.value.length > 0 && !mapCreated.value) {
        const validProductions = productions.value.filter(
          production =>
            production.latitude &&
            production.longitude &&
            production.latitude !== 0 &&
            production.longitude !== 0
        );

        if (validProductions.length === 0) {
          return;
        }

        const mapConfig = {
          container: "map",
          center: [-67.564368, -28.065752],
          zoom: 13,
          markers: validProductions.map((production) => {
            return {
              coordinates: [parseFloat(production.longitude), parseFloat(production.latitude)],
              title: `<div class="col">
                        <div class="text-h6">Produccion</div>
                        <div class="text-subtitle2">${production.producer?.first_name || ''} ${production.producer?.last_name || ''}</div>
                        <div class="text-subtitle2">${production.name || ''}</div>
                        <div class="text-subtitle2">${production.production_type || ''}</div>
                      </div>
                      `,
            };
          }),
        };
        createMap(mapConfig);
        mapCreated.value = true;
      }
    };

    watch(
      () => productions.value,
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
.map-production {
  width: 100%;
  height: 80vh;
}
</style>
