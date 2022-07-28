<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="primary"
        icon="las la-ticket-alt"
        @click="$router.push({ name: 'shift_add' })"
      />
    </div>
    <div class="q-pt-sm q-gutter-y-md">
      <div>
        <q-splitter v-model="splitterModel" unit="px" style="height: 400px">
          <template v-slot:before>
            <div class="q-pa-md">
              <div class="text-h6 q-mb-md">Turnos</div>
              <div class="q-my-md">
                <div v-for="(shift, index) in shifts" :key="shift.id">
                  <q-card class="q-pa-sm turn-btn"
                    >Turno {{ index + 1 }}:
                    {{ formatDate(shift.start_date) }}</q-card
                  >
                </div>
              </div>
            </div>
          </template>

          <template v-slot:after>
            <div class="q-pa-md">
              <div class="text-h6 q-mb-md">Turno 12/08/2022</div>
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
                      Producciones agregadas para riego:
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
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

// Composables
import useSection from "../../section/composables/useSection";
import useShift from "../composables/useShift";

// helpers
import { formatDate } from "../../../helpers/formatDate";

export default defineComponent({
  name: "Shifts",
  setup() {
    const { sections } = useSection();
    const { shifts } = useShift();

    return {
      sections,
      shifts,
      splitterModel: ref(200),
      tab: ref(sections?.value[0]?.section_number) || 0,
      formatDate,
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
</style>
