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
    <!--Dialog content-->
    <q-dialog v-model="basic" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
            perferendis totam, ea at omnis vel numquam exercitationem aut, natus
            minima, porro labore.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
