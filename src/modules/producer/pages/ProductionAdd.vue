<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-seedling"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Agregar Producción</span>
      </q-toolbar-title>
      <div class="q-gutter-md text-center">
        <q-select
          :options="options"
          label="Productor"
          dropdown-icon="las la-angle-down"
        >
          <template v-slot:prepend>
            <q-icon name="las la-user" @click.stop />
          </template>
        </q-select>
        <q-input label="Numero de lote" type="text" class="q-mr-sm" />
        <q-input label="Entrada" type="text" class="q-mr-sm" />
        <q-input label="Nombre de Producción" type="text" class="q-mr-sm" />
        <q-input label="Tipo de Producción" type="text" class="q-mr-sm" />
        <div class="row justify-start col-12">
          <div class="col-9">
            <q-input
              v-model="production.coords.latitude"
              label="Latitud"
              type="number"
              class="q-mr-sm"
            />
            <q-input
              v-model="production.coords.longitude"
              label="Longitud"
              type="number"
              class="q-mr-sm"
            />
          </div>
          <div class="row justify-center content-center col-3 q-mt-lg q-pt-lg">
            <q-btn color="primary" round @click="determinePosition()">
              <q-icon name="las la-map-marker" />
            </q-btn>
          </div>
          <div v-if="positionLoader" class="row justify-center col-12 q-mt-md">
            GPS position:
            <strong class="q-ml-sm">{{ positionLoader }}</strong>
          </div>
        </div>

        <div>
          <q-btn color="white" round @click="captureImage" class="q-mb-md">
            <q-icon color="primary" name="las la-camera" />
          </q-btn>
          <div v-if="imageSrc" class="container-img">
            <q-img :src="imageSrc" />
            <div class="delete-image">
              <q-btn
                round
                color="warning"
                flat
                icon="las la-trash"
                @click="deleteImg"
              />
            </div>
          </div>
        </div>
        <q-btn class="full-width" color="primary" label="Agregar" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

//composables
import useGeoloaction from "../../../composables/useGeolocation";
import useCamera from "../../../composables/useCamera";

export default defineComponent({
  name: "ProductionAdd",
  setup() {
    const { positionLoader, position } = useGeoloaction();
    const { imageSrc, captureImage } = useCamera();

    let options = [
      "Juan Perez",
      "Pedro Perez",
      "Juan Perez",
      "Pedro Perez",
      "Juan Perez",
    ];

    let production = ref({
      coords: {
        latitude: 0,
        longitude: 0,
      },
    });

    const determinePosition = () => {
      positionLoader.value = "determinando...";
      production.value.coords.latitude = position.value.coords.latitude;
      production.value.coords.longitude = position.value.coords.longitude;
      positionLoader.value = "Posición actualizada";
    };

    const deleteImg = () => {
      imageSrc.value = "";
    };

    return {
      options,
      position,
      positionLoader,
      production,
      determinePosition,
      imageSrc,
      captureImage,
      deleteImg,
    };
  },
});
</script>

<style lang="scss" scoped>
.container-img {
  position: relative;

  &:hover {
    .delete-image {
      display: block;
    }
  }

  .delete-image {
    display: none;
    position: absolute;
    transition: 0.3s ease-in-out;
    top: 0;
    right: 0;
  }
}
</style>
