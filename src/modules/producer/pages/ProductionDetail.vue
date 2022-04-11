<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-seedling"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Nombre Productor</span>
      </q-toolbar-title>
      <div class="container-detail">
        <div class="items-left">
          <div>
            <div class="text-h6">Producción</div>
            <div class="text-subtitle2 text-dark q-pa-xs">Distrito</div>
            <div class="text-subtitle2 text-dark q-pa-xs">Partida</div>
            <div class="text-subtitle2 text-dark q-pa-xs">N Lote</div>
            <div class="text-subtitle2 text-dark q-pa-xs">M. Catastral</div>
            <div class="text-subtitle2 text-dark q-pa-xs">Producción</div>
            <div class="text-subtitle2 text-dark q-pa-xs">Nombre</div>
            <div class="text-subtitle2 text-dark q-pa-xs">Tipo</div>
          </div>
        </div>
        <div class="items-left">
          <q-toolbar-title>
            <span class="text-subtitle2 text-grey q-pa-xs"
              >Geolocalizacion</span
            >
          </q-toolbar-title>
          <div class="map-production" id="map"></div>
        </div>
      </div>
    </div>
    <!--Dialog content-->
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import useMapbox from "../composables/useMapbox";

export default defineComponent({
  name: "ProductionDetail",
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
  height: 60vh;
}

.container-detail {
  display: grid;
  grid-template-columns: 30% 70%;
  grid-gap: 1em;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
</style>
