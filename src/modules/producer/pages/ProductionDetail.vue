<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-seedling"
          color="accent"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Nombre Productor</span>
      </q-toolbar-title>
      <div class="row col-12">
        <div class="column col-6 items-left">
          <div>
            <div class="text-h6">Producción</div>
            <div class="text-subtitle2 text-accent q-pa-xs">Distrito</div>
            <div class="text-subtitle2 text-accent q-pa-xs">Partida</div>
            <div class="text-subtitle2 text-accent q-pa-xs">N Lote</div>
            <div class="text-subtitle2 text-accent q-pa-xs">M. Catastral</div>
            <div class="text-subtitle2 text-accent q-pa-xs">Producción</div>
            <div class="text-subtitle2 text-accent q-pa-xs">Nombre</div>
            <div class="text-subtitle2 text-accent q-pa-xs">Tipo</div>
          </div>
        </div>
        <div class="column col-6">
          <q-toolbar-title>
            <span class="text-subtitle2 text-accent q-pa-xs"
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
import { defineComponent } from "vue";
import useMapbox from "../composables/useMapbox";

export default defineComponent({
  name: "ProductionDetail",
  components: {},
  setup() {
    const { crateMap } = useMapbox();

    return {
      crateMap,
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
