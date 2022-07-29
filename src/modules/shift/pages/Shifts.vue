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
              <div class="text-h6 q-mb-md">
                Turno:
                {{
                  shift?.start_date
                    ? formatDate(shift.start_date)
                    : "No se selecciono un turno"
                }}
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
    <!-- close create turn -->
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

//components
import Alert from "../../../components/Alert";

// helpers
import { formatDate } from "../../../helpers/formatDate";

// Composables
import useSection from "../../section/composables/useSection";
import useShift from "../composables/useShift";
import useAlert from "../../../composables/useAlert";

export default defineComponent({
  name: "Shifts",
  components: {
    Alert,
  },
  setup() {
    const { sections, intakes } = useSection();
    const { shifts, shift, getShiftById, createShift } = useShift();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert, openAlert } =
      useAlert();

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
</style>
