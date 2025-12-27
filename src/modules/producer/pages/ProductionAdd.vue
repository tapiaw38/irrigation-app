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
            :options="filteredOptions"
            label="Buscar Productor (DNI, Nombre o Apellido)"
            dropdown-icon="las la-angle-down"
            v-model="production.producer"
            use-input
            input-debounce="300"
            @filter="filterProducers"
            @input-value="setSearchTerm"
          >
            <template v-slot:prepend>
              <q-icon name="las la-user" @click.stop />
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No se encontraron productores
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>DNI: {{ scope.opt.dni }}</q-item-label>
                </q-item-section>
              </q-item>
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
            label="Matricula Catastral"
            v-model="production.cadastral_registration"
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
          <q-select
            :options="optionsDistrict"
            label="Distrito"
            dropdown-icon="las la-angle-down"
            v-model="production.district"
          >
            <template v-slot:prepend>
              <q-icon name="las la-street-view" @click.stop />
            </template>
          </q-select>
          <q-input
            label="Superficie en hectareas cuadradas"
            v-model="production.area"
            type="text"
            class="q-mr-sm"
          />
          <q-input
            label="Superficie en hectareas cuadradas cultivadas"
            v-model="production.cultivated_area"
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
          <div class="hidden">
            <q-btn color="white" round @click="captureImage" class="q-ma-md">
              <q-icon color="primary" name="las la-camera" />
            </q-btn>
            <div v-if="imageSrc" class="container-img">
              <q-img :src="imageSrc" class="q-mb-md" />
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
            class="full-width q-mt-md"
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
import { defineComponent, ref, computed } from "vue";

//composables
import useGeoloaction from "../../../composables/useGeolocation";
import useCamera from "../../../composables/useCamera";
import useProducer from "../composables/useProducer";
import useAlert from "../../../composables/useAlert";

// components
import Alert from "../../../components/Alert.vue";

// helpers
import districtList from "../../../helpers/districtList";

export default defineComponent({
  name: "ProductionAdd",
  components: {
    Alert,
  },
  setup() {
    const { positionLoader, position } = useGeoloaction();
    const { imageSrc, captureImage } = useCamera();
    const { producers, createProductionStorage } = useProducer();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert } = useAlert();

    // producers option for select - computed to react to changes
    const options = computed(() => {
      return producers.value.map((producer) => {
        return {
          label: `${producer.first_name} ${producer.last_name}`,
          value: producer.id,
          dni: producer.document_number || 'Sin DNI',
          firstName: producer.first_name,
          lastName: producer.last_name,
        };
      });
    });

    // filtered options for search
    let filteredOptions = ref([]);
    let searchTerm = ref('');

    // districts option for select
    let optionsDistrict = districtList.map((district) => {
      return {
        label: district,
        value: district,
      };
    });

    // form production
    let production = ref({
      producer: null,
      lote_number: "",
      entry: "",
      cadastral_registration: "",
      name: "",
      production_type: "",
      district: null,
      area: 0,
      cultivated_area: 0,
      latitude: 0,
      longitude: 0,
      picture: "",
    });

    // on reset form
    const onResetProduction = () => {
      production.value = {
        producer: null,
        lote_number: "",
        entry: "",
        cadastral_registration: "",
        name: "",
        production_type: "",
        district: null,
        area: 0,
        cultivated_area: 0,
        latitude: 0,
        longitude: 0,
        picture: "",
      };
    };

    // determine position
    const determinePosition = () => {
      positionLoader.value = "determinando...";
      production.value.latitude = position.value.coords?.latitude;
      production.value.longitude = position.value.coords?.longitude;
      positionLoader.value = "Posición actualizada";
    };

    // delete image
    const deleteImg = () => {
      imageSrc.value = "";
    };

    // filter producers by DNI, first name or last name
    const filterProducers = (val, update) => {
      update(() => {
        if (val === '') {
          filteredOptions.value = options.value;
        } else {
          const needle = val.toLowerCase();
          filteredOptions.value = options.value.filter(producer => {
            const fullName = `${producer.firstName} ${producer.lastName}`.toLowerCase();
            const dni = producer.dni.toLowerCase();
            return fullName.includes(needle) || dni.includes(needle);
          });
        }
      });
    };

    // set search term
    const setSearchTerm = (val) => {
      searchTerm.value = val;
    };

    // create production
    const onCreateProduction = async () => {
      production.value.picture = imageSrc.value;
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
      onResetProduction();
    };

    return {
      options,
      filteredOptions,
      searchTerm,
      optionsDistrict,
      position,
      positionLoader,
      production,
      determinePosition,
      imageSrc,
      captureImage,
      deleteImg,
      filterProducers,
      setSearchTerm,
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
