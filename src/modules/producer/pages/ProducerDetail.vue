<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-users"
          color="accent"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Detalle Productor</span>
      </q-toolbar-title>
      <div class="row col-12">
        <div class="column col-6 items-left">
          <div>
            <div class="text-h6"></div>
            <div class="text-subtitle2 text-accent q-pa-xs">Nombre</div>
            <div class="text-subtitle2 text-accent q-pa-xs">Apellido</div>
            <div class="text-subtitle2 text-accent q-pa-xs">DNI</div>
            <div class="text-subtitle2 text-accent q-pa-xs">Dirección</div>
            <div class="text-subtitle2 text-accent q-pa-xs">Teléfono</div>
            <div class="text-subtitle2 text-accent q-pa-xs">
              Fecha de Nacimiento
            </div>
          </div>
        </div>
        <div class="column col-6">
          <q-toolbar-title>
            <span class="text-subtitle2 text-accent q-pa-xs">Producciones</span>
          </q-toolbar-title>
          <div class="map-production" id="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProducerDetail",
  components: {},
  setup() {
    return {};
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
