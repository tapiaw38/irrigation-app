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
        <q-form @submit="onCreateProduction()">
          <q-select
            :options="options"
            label="Productor"
            dropdown-icon="las la-angle-down"
            v-model="production.producer"
          >
            <template v-slot:prepend>
              <q-icon name="las la-user" @click.stop />
            </template>
          </q-select>
          <q-input
            label="Numero de Lote"
            v-model="production.lote_number"
            type="text"
            class="q-mr-sm"
          />
          <q-input
            label="Numero de Partida"
            v-model="production.entry"
            type="text"
            class="q-mr-sm"
          />
          <q-input
            label="Nombre de Producción"
            v-model="production.name"
            type="text"
            class="q-mr-sm"
          />
          <q-input
            label="Tipo de Producción"
            v-model="production.production_type"
            type="text"
            class="q-mr-sm"
          />
          <q-input
            label="Superficie en hectareas"
            v-model="production.area"
            type="text"
            class="q-mr-sm"
          />
          <div class="row justify-start col-12">
            <div class="col-9">
              <q-input
                v-model="production.latitude"
                label="Latitud"
                type="text"
                class="q-mr-sm"
              />
              <q-input
                v-model="production.longitude"
                label="Longitud"
                type="text"
                class="q-mr-sm"
              />
            </div>
            <div
              class="row justify-center content-center col-3 q-mt-lg q-pt-lg"
            >
              <q-btn color="primary" round @click="determinePosition()">
                <q-icon name="las la-map-marker" />
              </q-btn>
            </div>
            <div
              v-if="positionLoader"
              class="row justify-center col-12 q-mt-md"
            >
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
          <q-btn
            type="submit"
            class="full-width"
            color="primary"
            label="Agregar"
          />
        </q-form>
      </div>
    </div>
    <alert
      :dialog="isAlertOpen"
      :headerMessage="headerMessage"
      :message="alertMessage"
      @close="closeAlert()"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

//composables
import useGeoloaction from "../../../composables/useGeolocation";
import useCamera from "../../../composables/useCamera";
import useProducer from "../composables/useProducer";

// components
import Alert from "../../../components/Alert.vue";

export default defineComponent({
  name: "ProductionAdd",
  components: {
    Alert,
  },
  setup() {
    const { positionLoader, position } = useGeoloaction();
    const { imageSrc, captureImage } = useCamera();
    const { allProducerStorage, createProductionStorage } = useProducer();

    // producers option for select
    let options = allProducerStorage.value.map((producer) => {
      return {
        label: `${producer.first_name} ${producer.last_name}`,
        value: producer.id,
      };
    });

    // alert
    let headerMessage = ref("");
    let alertMessage = ref("");
    let isAlertOpen = ref(false);

    const closeAlert = () => {
      isAlertOpen.value = false;
    };

    // form production
    let production = ref({
      producer: null,
      lote_number: "",
      entry: "",
      name: "",
      production_type: "",
      area: 0,
      latitude: 0,
      longitude: 0,
      picture: "",
    });

    // determine position
    const determinePosition = () => {
      positionLoader.value = "determinando...";
      production.value.latitude = position.value.coords.latitude;
      production.value.longitude = position.value.coords.longitude;
      positionLoader.value = "Posición actualizada";
    };

    // delete image
    const deleteImg = () => {
      imageSrc.value = "";
    };

    // create production
    const onCreateProduction = async () => {
      const { ok, message } = await createProductionStorage(production);
      if (!ok) {
        headerMessage.value = "Error";
        alertMessage.value = message;
        isAlertOpen.value = true;
        return;
      }

      headerMessage.value = "Producion Agregada";
      alertMessage.value = `
        Registro guardado correctamente, en memoria.
      `;
      isAlertOpen.value = true;
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
      onCreateProduction,
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
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
