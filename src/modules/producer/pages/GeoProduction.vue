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

//composables
import useMapbox from "../composables/useMapbox";
import useProducer from "../../producer/composables/useProducer";

export default defineComponent({
  name: "Geoloaction",
  components: {},
  setup() {
    const { createMap } = useMapbox();
    const { productions } = useProducer();

    let map = {
      container: "map",
      center: [-67.564368, -28.065752],
      zoom: 13,
      markers: productions.value.map((production) => {
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
.map-production {
  width: 100%;
  height: 80vh;
}
</style>
