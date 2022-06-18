<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-water"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Detalle Tomas de Agua</span>
      </q-toolbar-title>
      <div class="row col-12">
        <div class="column col-6 items-left">
          <div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">
                Numero de Toma
              </div>
              <div class="text-h6">{{ intake?.intake_number }}</div>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-secondary q-pa-xs">
                Descripción
              </div>
              <div class="text-h6">{{ intake?.name }}</div>
            </div>
          </div>
        </div>
        <div class="column col-6">
          <q-toolbar-title>
            <span class="text-subtitle2 text-secondary q-pa-xs"
              >Producciones en Toma</span
            >
            <template v-if="intake?.productions">
              <div
                v-for="production in intake?.productions"
                :key="production.id"
                class="row"
              >
                <div class="text-h6">
                  {{ production.producer.first_name }}
                  {{ production.producer.last_name }}: {{ production?.name }}
                  {{ production?.production_type }}
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
                  <q-btn
                    color="negative"
                    flat
                    label="Quitar de Toma"
                    @click="deleteIntakeProductionById(production.id)"
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="text-h6">No hay producciones relacionadas</div>
            </template>
          </q-toolbar-title>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

// composables
import useSection from "../composables/useSection";

export default defineComponent({
  name: "IntakeDetail",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { intake, getIntakeById, deleteIntakeProduction } = useSection();

    onMounted(() => {
      getIntakeById(props.id);
    });

    let intakeProductions = ref({
      intake_id: null,
      production_id: null,
    });

    const deleteIntakeProductionById = (idProduction) => {
      intakeProductions.value.intake_id = String(props.id);
      intakeProductions.value.production_id = String(idProduction);
      deleteIntakeProduction(intakeProductions.value);
    };

    return {
      intake,
      deleteIntakeProductionById,
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
