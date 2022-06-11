<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="primary"
        icon="las la-water"
        @click="$router.push({ name: 'intake_add' })"
      />
    </div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <template v-for="intake in intakeItems" :key="intake">
            <th class="text-left">{{ intake }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(intake, i) in intakes" :key="i">
          <tr>
            <td class="text-left">{{ intakes.section_number }}</td>
            <td class="text-left">{{ intakes.name }}</td>
            <td class="text-left">{{ formatDate(intake.updated_at) }}</td>
            <td class="text-left">
              <q-btn
                round
                text-color="secondary"
                icon="las la-file"
                class="q-mr-sm"
                @click="onToggleModal(intake)"
              />
              <q-btn
                round
                text-color="secondary"
                icon="las la-edit"
                class="q-mr-sm"
                @click="onToggleModal(intake)"
              />
              <q-btn
                round
                text-color="negative"
                icon="las la-trash-alt"
                class="q-mr-sm"
                @click="openAlertHandler(intake)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </q-markup-table>
    <!-- Full Modal -->
    <full-modal
      :dialog="isModalOpen"
      :headerMessage="headerModalMessage"
      :maximizedToggle="maximizedToggle"
      @close="closeModal()"
    >
      <template v-slot:body>
        <!-- content for the body slot -->
        <div class="q-pa-md">
          <section-form
            :sectionData="intakeData"
            @submit-form-section="submitFormIntake"
          />
        </div>
      </template>
    </full-modal>
    <!-- Alert -->
    <alert
      :dialog="isAlertOpen"
      :headerMessage="headerMessage"
      :message="alertMessage"
      @close="closeAlert()"
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
            @click="onDeleteIntake()"
          />
          <q-btn
            round
            color="primary"
            text-color="white"
            label="No"
            class="q-mx-sm"
            @click="closeAlert()"
          />
        </div>
      </template>
    </alert>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

// components
import FullModal from "../../../components/FullModal";
import SectionForm from "../components/SectionForm";
import Alert from "../../../components/Alert.vue";

// helpers
import { formatDate } from "../../../helpers/formatDate";

// composables
import useSection from "../composables/useSection";
import useAlert from "../../../composables/useAlert";
import useModal from "../../../composables/useModal";

export default defineComponent({
  name: "Producers",
  components: {
    FullModal,
    SectionForm,
    Alert,
  },
  setup() {
    const { intakes, editIntake, deleteIntake } = useSection();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert, openAlert } =
      useAlert();
    const {
      headerModalMessage,
      maximizedToggle,
      isModalOpen,
      closeModal,
      openModal,
    } = useModal();
    const intakeItems = [
      "Número de Toma",
      "Descripción",
      "Fecha de modificación",
      "",
    ];

    // modal
    const intakeData = ref(null);

    const onToggleModal = (intake) => {
      intakeData.value = intake;
      isModalOpen.value = !isModalOpen.value;
    };

    // submit form producer update
    const submitFormIntake = async (form) => {
      const { ok, message } = await editIntake(form.value);
      if (!ok) {
        openModal("Error, no se pudo editar la toma " + message);
        return;
      }
      closeModal();
    };

    // alert
    let intakeDeleted = ref(null);

    const openAlertHandler = (p) => {
      intakeDeleted.value = p;
      openAlert("Eliminar Toma", "¿Está seguro de eliminar la toma?");
    };

    // delete section
    const onDeleteIntake = async () => {
      const { ok } = await deleteIntake(intakeDeleted.value);
      if (ok) {
        closeAlert();
      } else {
        openAlert("Error", "No se pudo eliminar la toma");
      }
    };

    return {
      intakeItems,
      formatDate,
      intakes,
      isModalOpen,
      closeModal,
      onToggleModal,
      submitFormIntake,
      intakeData,
      headerModalMessage,
      maximizedToggle,
      // alert
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      openAlertHandler,
      onDeleteIntake,
    };
  },
});
</script>
