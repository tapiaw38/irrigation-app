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
        <span
          >{{ production?.producer.first_name }}
          {{ production?.producer.last_name }}</span
        >
      </q-toolbar-title>
      <div class="container-detail">
        <div class="items-left">
          <div>
            <div class="q-mt-sm">
              <div class="text-subtitle3 text-secondary q-pa-xs">
                Numero de lote
              </div>
              <div class="text-subtitle2 q-pa-xs">
                {{ production?.lote_number }}
              </div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle3 text-secondary q-pa-xs">
                Numero de partida
              </div>
              <div class="text-subtitle2 q-pa-xs">{{ production?.entry }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle3 text-secondary q-pa-xs">
                Matricuala catastral
              </div>
              <div class="text-subtitle2 q-pa-xs">
                {{ production?.cadastral_registration }}
              </div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle3 text-secondary q-pa-xs">
                Producción
              </div>
              <div class="text-subtitle2 q-pa-xs">
                {{ production?.name }}
              </div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle3 text-secondary q-pa-xs">
                Tipo de producción
              </div>
              <div class="text-subtitle2 q-pa-xs">
                {{ production?.production_type }}
              </div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle3 text-secondary q-pa-xs">Distrito</div>
              <div class="text-subtitle2 q-pa-xs">
                {{ production?.district }}
              </div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle3 text-secondary q-pa-xs">Hectáreas</div>
              <div class="text-subtitle2 q-pa-xs">
                {{ production?.area }} ha2
              </div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle3 text-secondary q-pa-xs">
                Hectáreas cultivadas
              </div>
              <div class="text-subtitle2 q-pa-xs">
                {{ production?.cultivated_area }} ha2
              </div>
            </div>
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
      <div class="flex container-image">
        <div class="image-icon flex justify-center content-center">
          <q-img src="../../../assets/img/undraw_images.svg" />
        </div>
        <div class="flex justify-center content-center">
          <q-img
            v-if="!production?.picture"
            src="../../../assets/img/undraw_zoom.svg"
            style="width: 80%"
          />
          <q-img v-else :src="production?.picture" style="width: 90%" />
          <div class="edit-image">
            <q-btn
              round
              color="primary"
              flat
              icon="las la-camera"
              @click="openAlertHandler"
            />
          </div>
        </div>
      </div>
    </div>
    <!--Dialog content-->
    <!-- change picture-->
    <alert
      :dialog="isAlertOpen"
      :headerMessage="headerMessage"
      :message="alertMessage"
      :showIcon="false"
      @close="closeAlert()"
    >
      <template v-slot:body>
        <div class="flex justify-center q-mb-sm" style="width: 300px">
          <q-img class="avatar" size="6rem">
            <q-img
              v-if="production.picture && imageSelected === null"
              :src="production?.picture"
            />
            <q-img
              v-else-if="!production.picture && imageSelected === null"
              src="../../../assets/img/undraw_zoom.svg"
            />
            <q-img v-else :src="imageSelected" />
          </q-img>
        </div>
        <div class="flex justify-center">
          <q-input
            @update:model-value="
              (val) => {
                onSelectedImage(val[0]);
              }
            "
            filled
            type="file"
            class="hidden image-input"
          />
          <q-btn
            round
            icon="las la-arrow-circle-up"
            color="primary"
            @click="onSelectImage"
          />
          <q-btn
            label="Aplicar"
            color="primary"
            class="btn-block"
            @click="onEditPicture"
          />
        </div>
      </template>
    </alert>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from "vue";

// composables
import useMapbox from "../composables/useMapbox";
import useProducer from "../composables/useProducer";
import useAlert from "../../../composables/useAlert";
import useImageSelected from "../../../composables/useImageSelected";

//components
import Alert from "../../../components/Alert";

export default defineComponent({
  name: "ProductionDetail",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    Alert,
  },
  setup(props) {
    const { createMap } = useMapbox();
    const { getProductionById, production, updateProductionPicture } =
      useProducer();
    const { imageSelected, image, onSelectedImage } = useImageSelected();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert } = useAlert();

    const map = ref({
      container: "map",
      center: [-67.564368, -28.065752],
      zoom: 13,
      markers: [],
    });

    const createMarkers = computed(() => {
      return [
        {
          coordinates: [
            production?.value.longitude || 0,
            production?.value.latitude || 0,
          ],
          title: `<div class="col">
                    <div class="text-h6">Produccion</div>
                    <div class="text-subtitle2">${production?.value.producer.first_name} ${production?.value.producer.last_name}</div>
                    <div class="text-subtitle2">${production?.value.name}</div>
                    <div class="text-subtitle2">${production?.value.production_type}</div>
                  </div>
                  `,
        },
      ];
    });

    // change picture
    const openAlertHandler = (header, message) => {
      headerMessage.value = "Editar Imagen";
      isAlertOpen.value = true;
    };

    const onSelectImage = () => {
      document.querySelector(".image-input").click();
    };

    const onEditPicture = async () => {
      let formProduction = {
        id: production?.value.id,
        picture: image.value,
      };
      const { ok } = await updateProductionPicture(formProduction);
      if (ok) {
        closeAlert();
        return;
      }
    };

    // mount
    onMounted(async () => {
      const { ok, message } = await getProductionById(props.id);
      if (ok) {
        map.value.markers = createMarkers.value;
        createMap(map.value);
      }
    });

    return {
      production,
      openAlertHandler,
      isAlertOpen,
      closeAlert,
      headerMessage,
      alertMessage,
      imageSelected,
      image,
      onSelectedImage,
      onEditPicture,
      onSelectImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.map-production {
  width: 100%;
  height: 70vh;
}

.container-detail {
  display: grid;
  grid-template-columns: 30% 70%;
  grid-gap: 1em;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.container-image {
  padding-top: 3%;
  display: grid;
  grid-template-columns: 30% 70%;

  @media (max-width: 600px) {
    .image-icon {
      display: none;
    }
    grid-template-columns: 1fr;
  }
}
</style>
