<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-users"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Detalle Productor</span>
      </q-toolbar-title>
      <div class="row">
        <div class="col-md-6 col-sm-12 q-mb-lg items-left">
          <div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">Nombre</div>
              <div class="text-h6">{{ producer?.first_name }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">Apellido</div>
              <div class="text-h6">{{ producer?.last_name }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">DNI</div>
              <div class="text-h6">{{ producer?.document_number }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">
                Fecha de Nacimiento
              </div>
              <div class="text-h6">{{ formatDate(producer?.birth_date) }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">Teléfono</div>
              <div class="text-h6">{{ producer?.phone_number }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">Dirección</div>
              <div class="text-h6">{{ producer?.address }}</div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <q-toolbar-title>
            <span class="text-subtitle2 text-secondary q-pa-xs"
              >Producciones</span
            >
            <template v-if="productionsByProducer.length > 0">
              <div
                v-for="production in productionsByProducer"
                :key="production.id"
                class="row"
              >
                <div class="text-h6">
                  {{ production.name }}: {{ production?.production_type }}
                </div>
                <div class="q-ml-sm">
                  <q-btn
                    color="primary"
                    flat
                    label="Ver"
                    @click="
                      $router.push({
                        name: 'production_detail',
                        params: { id: production.id },
                      })
                    "
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="text-h6">No hay producciones</div>
            </template>
          </q-toolbar-title>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";

// composables
import useProducer from "../composables/useProducer";

// helpers
import { formatDate } from "../../../helpers/formatDate";

export default defineComponent({
  name: "ProducerDetail",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { producer, getProducerById, productions } = useProducer();

    let productionsByProducer = ref([]);

    const getProductionByProducer = (id) => {
      productionsByProducer.value = [];
      productions.value.map((production) => {
        if (production.producer.id === id) {
          productionsByProducer.value = [
            ...productionsByProducer.value,
            production,
          ];
        }
      });
      return productionsByProducer.value;
    };

    onMounted(() => {
      getProducerById(props.id);
    });

    return {
      producer,
      formatDate,
      productionsByProducer: computed(() => {
        return getProductionByProducer(props.id);
      }),
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
