<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="primary"
        icon="las la-object-ungroup"
        @click="$router.push({ name: 'section_add' })"
      />
    </div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <template v-for="section in sectionItems" :key="section">
            <th class="text-left">{{ section }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(section, i) in sections" :key="i">
          <tr>
            <td class="text-left">{{ section.section_number }}</td>
            <td class="text-left">{{ section.name }}</td>
            <td class="text-left">{{ formatDate(section.updated_at) }}</td>
            <td class="text-left">
              <!--
                <q-btn
                round
                text-color="secondary"
                icon="las la-file"
                class="q-mr-sm"
                @click="onToggleModal(section)"
              />
              -->
              <q-btn
                round
                text-color="secondary"
                icon="las la-file"
                class="q-mr-sm"
                @click="
                  $router.push({
                    name: 'section_detail',
                    params: { id: section.id },
                  })
                "
              />
              <q-btn
                round
                text-color="secondary"
                icon="las la-edit"
                class="q-mr-sm"
                @click="onToggleModal(section)"
              />
              <q-btn
                round
                text-color="negative"
                icon="las la-trash-alt"
                class="q-mr-sm"
                @click="openAlertHandler(section)"
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
            :sectionData="sectionData"
            @submit-form-section="submitFormSection"
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
            @click="onDeleteSection()"
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
    const { sections, editSection, deleteSection } = useSection();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert, openAlert } =
      useAlert();
    const {
      headerModalMessage,
      maximizedToggle,
      isModalOpen,
      closeModal,
      openModal,
    } = useModal();
    const sectionItems = [
      "Numero de Sección",
      "Descripción",
      "Fecha de modificación",
      "",
    ];

    // modal
    const sectionData = ref(null);

    const onToggleModal = (section) => {
      sectionData.value = section;
      isModalOpen.value = !isModalOpen.value;
    };

    // submit form producer update
    const submitFormSection = async (form) => {
      const { ok, message } = await editSection(form.value);
      if (!ok) {
        openModal("Error, no se pudo editar la sección " + message);
        return;
      }
      closeModal();
    };

    // alert
    let sectionDeleted = ref(null);

    const openAlertHandler = (p) => {
      sectionDeleted.value = p;
      openAlert("Eliminar Sección", "¿Está seguro de eliminar la sección?");
    };

    // delete section
    const onDeleteSection = async () => {
      const { ok } = await deleteSection(sectionDeleted.value);
      if (ok) {
        closeAlert();
      } else {
        openAlert("Error", "No se pudo eliminar la sección");
      }
    };

    return {
      sectionItems,
      formatDate,
      sections,
      isModalOpen,
      closeModal,
      onToggleModal,
      submitFormSection,
      sectionData,
      headerModalMessage,
      maximizedToggle,
      // alert
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      openAlertHandler,
      onDeleteSection,
    };
  },
});
</script>
