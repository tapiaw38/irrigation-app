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
        <div class="image-icon">
          <q-img src="../../../assets/img/undraw_images.svg" />
        </div>
        <div
          v-if="!production?.picture"
          class="flex justify-center content-center"
        >
          <div class="title2 gray justify-center flex items-center q-mr-sm">
            No hay imagen de la producción
          </div>
          <q-img
            src="../../../assets/img/undraw_zoom.svg"
            style="width: 300px"
          />
        </div>
        <div v-else class="flex justify-center content-center">
          <q-img :src="production?.picture" style="width: 300px" />
        </div>
      </div>
    </div>
    <!--Dialog content-->
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from "vue";

// composables
import useMapbox from "../composables/useMapbox";
import useProducer from "../composables/useProducer";

export default defineComponent({
  name: "ProductionDetail",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {},
  setup(props) {
    const { createMap } = useMapbox();
    const { getProductionById, production } = useProducer();

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

    onMounted(async () => {
      const { ok } = await getProductionById(props.id);
      if (ok) {
        map.value.markers = createMarkers.value;
        createMap(map.value);
      }
    });

    return {
      production,
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
