<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="primary"
        icon="las la-ticket-alt"
        @click="openAlert()"
      />
    </div>
    <div class="q-pt-sm q-gutter-y-lg">
      <div>
        <q-splitter v-model="splitterModel" unit="px" style="height: 79vh">
          <template v-slot:before>
            <div class="q-pa-md">
              <div class="text-h6 q-mb-md">Turnos</div>
              <div class="q-my-md">
                <div v-for="(shift, index) in shifts" :key="shift.id">
                  <q-card
                    class="q-pa-sm turn-btn q-my-sm"
                    @click="getShiftById(shift.id)"
                    >Turno {{ index + 1 }}:
                    {{ formatDate(shift.start_date) }}</q-card
                  >
                </div>
              </div>
            </div>
          </template>

          <template v-slot:after>
            <div class="q-pa-md">
              <div class="q-mb-md row justify-between items-center">
                <div class="text-h6">
                  Turno:
                  {{
                    shift?.start_date
                      ? formatDate(shift.start_date)
                      : "No se selecciono un turno"
                  }}
                </div>

                <div class="q-my-md" v-if="shift">
                  <q-btn
                    round
                    color="primary"
                    size="0.8rem"
                    icon="las la-seedling"
                    @click="openAlertProduction()"
                  />
                  <q-btn
                    round
                    color="primary"
                    size="0.8rem"
                    icon="las la-edit"
                    class="q-ml-sm"
                    @click="openAlertEdit()"
                  />
                  <q-btn
                    round
                    color="negative"
                    size="0.8rem"
                    icon="las la-trash"
                    class="q-ml-sm"
                    @click="openAlertDelete()"
                  />
                </div>
              </div>
              <q-card>
                <q-tabs
                  v-model="tab"
                  dense
                  class="bg-white text-primary"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                >
                  <template v-for="section in sections" :key="section.id">
                    <q-tab
                      :name="section.section_number"
                      :label="'Sec ' + section.section_number"
                    />
                  </template>
                </q-tabs>

                <q-separator />

                <q-tab-panels
                  v-model="tab"
                  animated
                  class="bg-primary text-center"
                >
                  <template v-for="section in sections" :key="section.id">
                    <q-tab-panel :name="section.section_number">
                      <div class="text-h6">{{ section.name }}</div>

                      <div
                        v-for="intake in getIntakeBySection(section?.id)"
                        :key="intake.id"
                      >
                        <div class="q-my-md">
                          <div class="q-pa-sm">
                            <q-card class="q-pa-sm">
                              <div class="text-primary text-subtitle1">
                                Toma {{ intake.intake_number }}
                              </div></q-card
                            >
                            <!--productions array-->
                            <div
                              v-for="(production, index) in shift?.productions"
                              :key="production.id"
                            >
                              <q-card
                                v-if="production.intake_id === intake.id"
                                class="q-pa-sm q-ma-sm"
                              >
                                <q-btn
                                  color="negative"
                                  size="0.8rem"
                                  icon="las la-trash"
                                  class="delte-production"
                                  @click="deleteTurnProduction(production.id)"
                                />
                                <div class="text-subtitle1 text-info">
                                  Orden general: {{ index + 1 }}
                                </div>
                                <div>
                                  Orden de toma:
                                  {{ production.watering_order }}
                                </div>
                                <div>
                                  Producción: {{ production.production_type }},
                                  {{ production.name }}

                                  <q-icon
                                    class="link"
                                    size="1.5rem"
                                    color="primary"
                                    name="las la-caret-square-right"
                                    @click="
                                      $router.push({
                                        name: 'production_detail',
                                        params: { id: production.id },
                                      })
                                    "
                                  />
                                </div>
                                <div>
                                  Productor:
                                  {{ production.producer.first_name }}
                                  {{ production.producer.last_name }}

                                  <q-icon
                                    class="link"
                                    size="1.5rem"
                                    color="primary"
                                    name="las la-caret-square-right"
                                    @click="
                                      $router.push({
                                        name: 'producer_detail',
                                        params: { id: production.producer.id },
                                      })
                                    "
                                  />
                                </div>
                                <div>
                                  Horas de riego:
                                  {{ production.watering_hour }}
                                </div>
                              </q-card>
                              <div v-else></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-tab-panel>
                  </template>
                </q-tab-panels>
              </q-card>
              <div class="q-my-md"></div>
            </div>
          </template>
        </q-splitter>
      </div>
    </div>
    <!-- Alert create turn -->
    <alert
      :dialog="isAlertOpen"
      :headerMessage="headerMessage"
      :message="alertMessage"
      :showIcon="false"
      @close="closeAlert()"
    >
      <template v-slot:body>
        <!-- content for the body slot -->
        <div class="q-pa-md row justify-center">
          <div>
            <div class="q-col-sm-12" color="primary">Fecha de inicio:</div>
            <q-input
              v-model="turn.start_date"
              :rules="[{ required: true, message: 'Campo requerido' }]"
              class="q-col-sm-12"
              type="date"
              name="start_date"
            />
            <q-btn color="primary" @click="createTurn()"> Crear turno </q-btn>
          </div>
        </div>
      </template>
    </alert>
    <!-- Alert delete turn -->
    <alert
      :dialog="isAlertOpenDelete"
      :headerMessage="headerMessageDelete"
      :message="alertMessageDelete"
      @close="closeAlertDelete()"
    >
      <template v-slot:body>
        <!-- content for the body slot -->
        <div class="q-pa-md row justify-center">
          <q-btn
            round
            color="warning"
            text-color="white"
            label="Si"
            class="q-mx-sm"
            @click="deleteTurn()"
          />
          <q-btn
            round
            color="primary"
            text-color="white"
            label="No"
            class="q-mx-sm"
            @click="closeAlertDelete()"
          />
        </div>
      </template>
    </alert>
    <!-- Alert edit turn -->
    <alert
      :dialog="isAlertOpenEdit"
      :headerMessage="headerMessageEdit"
      :message="alertMessageEdit"
      :showIcon="false"
      @close="closeAlertEdit()"
    >
      <template v-slot:body>
        <!-- content for the body slot -->
        <div class="q-pa-md row justify-center">
          <shift-form :shiftData="shift" @submit-form-shift="editTurn" />
        </div>
      </template>
    </alert>
    <!-- Alert create turn production -->
    <alert
      :dialog="isAlertOpenProduction"
      :headerMessage="headerMessageProduction"
      :message="alertMessageProduction"
      :showIcon="false"
      @close="closeAlertProduction()"
    >
      <template v-slot:body>
        <!-- content for the body slot -->
        <div class="q-pa-md row justify-center">
          <q-form @submit="onSubmitCreateTurnProduction" class="q-pa-md">
            <q-select
              :options="optionsProduction"
              label="Producción"
              dropdown-icon="las la-angle-down"
              v-model="turnProduction.production_id"
            >
              <template v-slot:prepend>
                <q-icon name="las la-seedling" @click.stop />
              </template>
            </q-select>
            <q-btn
              class="full-width q-mt-md"
              label="Aplicar"
              type="submit"
              color="primary"
            />
          </q-form>
        </div>
      </template>
    </alert>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";

//components
import Alert from "../../../components/Alert";
import shiftForm from "../components/shiftForm.vue";

// helpers
import { formatDate } from "../../../helpers/formatDate";

// Composables
import useSection from "../../section/composables/useSection";
import useShift from "../composables/useShift";
import useAlert from "../../../composables/useAlert";
import useProducer from "../../producer/composables/useProducer";

export default defineComponent({
  name: "Shifts",
  components: {
    Alert,
    shiftForm,
  },
  setup() {
    const { sections, intakes } = useSection();
    const {
      shifts,
      shift,
      getShiftById,
      createShift,
      deleteShift,
      updateShift,
      createShiftProduction,
      deleteShiftProduction,
    } = useShift();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert, openAlert } =
      useAlert();
    const {
      headerMessage: headerMessageDelete,
      alertMessage: alertMessageDelete,
      isAlertOpen: isAlertOpenDelete,
      closeAlert: closeAlertDelete,
      openAlert: openAlertDelete,
    } = useAlert();
    const {
      headerMessage: headerMessageEdit,
      alertMessage: alertMessageEdit,
      isAlertOpen: isAlertOpenEdit,
      closeAlert: closeAlertEdit,
      openAlert: openAlertEdit,
    } = useAlert();
    const {
      headerMessage: headerMessageProduction,
      alertMessage: alertMessageProduction,
      isAlertOpen: isAlertOpenProduction,
      closeAlert: closeAlertProduction,
      openAlert: openAlertProduction,
    } = useAlert();
    const { productions } = useProducer();

    // get intakes by section
    const getIntakeBySection = (id) => {
      let intakesBySection = [];
      intakes.value.map((intake) => {
        if (intake.section.id === id) {
          intakesBySection = [...intakesBySection, intake];
        }
      });
      return intakesBySection;
    };

    // create turn
    const turn = ref({
      start_date: "",
    });

    const createTurn = async () => {
      const { ok, message } = await createShift(turn.value);
      if (!ok) {
        headerMessage.value = "Error";
        alertMessage.value = message;
        return;
      }
      turn.value = {
        start_date: "",
      };
      closeAlert();
    };

    // delete turn
    const deleteTurn = async () => {
      const { ok, message } = await deleteShift(shift.value);

      if (!ok) {
        headerMessageDelete.value = "Error";
        alertMessageDelete.value = message;
        return;
      }
      closeAlertDelete();
    };

    // edit turn
    const editTurn = async (form) => {
      const { ok, message } = await updateShift(form.value);

      if (!ok) {
        headerMessageEdit.value = "Error";
        alertMessageEdit.value = message;
        return;
      }
      closeAlertEdit();
    };

    // create turn production
    let turnProduction = ref({
      turn_id: null,
      production_id: null,
    });

    const onSubmitCreateTurnProduction = async () => {
      turnProduction.value.production_id = String(
        turnProduction.value.production_id.value
      );
      turnProduction.value.turn_id = String(shift?.value.id);

      const { ok, message } = await createShiftProduction(turnProduction.value);

      if (!ok) {
        headerMessageProduction.value = "Error";
        alertMessageProduction.value = "La producción ya existe en el turno";
        turnProduction.value.production_id = null;
        return;
      }

      turnProduction.value = {
        turn_id: null,
        production_id: null,
      };

      closeAlertProduction();
    };

    // delete turn production
    const deleteTurnProduction = async (productionId) => {
      turnProduction.value.turn_id = String(shift?.value.id);
      turnProduction.value.production_id = String(productionId);

      const { ok, message } = await deleteShiftProduction(turnProduction.value);

      if (!ok) {
        headerMessageProduction.value = "Error";
        alertMessageProduction.value = message;
        turnProduction.value.production_id = null;
        return;
      }

      turnProduction.value = {
        turn_id: null,
        production_id: null,
      };
    };

    // productions option for select
    let optionsProduction = computed(() => {
      let productionOptions = [...productions.value];
      return productionOptions.map((production) => {
        return {
          label: `${production.producer.first_name} ${production.name}`,
          value: production.id,
        };
      });
    });

    return {
      sections,
      getIntakeBySection,
      shifts,
      shift,
      getShiftById,
      splitterModel: ref(120),
      tab: ref(sections?.value[0]?.section_number) || 0,
      formatDate,
      // alert create turn
      headerMessage: ref("Crear turno"),
      alertMessage,
      isAlertOpen,
      closeAlert,
      openAlert,
      // create turn
      turn,
      createTurn,
      // alert delete turn
      headerMessageDelete: ref("Eliminar"),
      alertMessageDelete: ref("¿Está seguro de eliminar el turno?"),
      isAlertOpenDelete,
      closeAlertDelete,
      openAlertDelete,
      // delete turn
      deleteTurn,
      // alert edit turn
      headerMessageEdit: ref("Editar"),
      alertMessageEdit,
      isAlertOpenEdit,
      closeAlertEdit,
      openAlertEdit,
      // edit turn
      editTurn,
      // create turn production
      headerMessageProduction: ref("Agregar producción"),
      alertMessageProduction,
      isAlertOpenProduction,
      closeAlertProduction,
      openAlertProduction,
      // create turn production
      optionsProduction,
      turnProduction,
      onSubmitCreateTurnProduction,
      deleteTurnProduction,
    };
  },
});
</script>

<style lang="scss" scoped>
.turn-btn {
  cursor: pointer;
  max-width: 160px;
  min-width: 100px;

  &:hover {
    background-color: #f5f5f5;
  }
}

.link {
  cursor: pointer;
}

.delte-production {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
