<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-object-ungroup"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Agregar Sección</span>
      </q-toolbar-title>
      <div class="q-gutter-md text-center">
        <q-form @submit="onCreateSection()">
          <q-input
            v-model="sectionForm.section_number"
            label="Número de Sección"
            type="text"
            class="q-mr-sm"
          />
          <q-input
            v-model="sectionForm.name"
            label="Descripción"
            type="text"
            class="q-mr-sm"
          />
          <q-btn
            class="full-width q-mt-md"
            color="primary"
            label="Agregar"
            type="submit"
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
import { defineComponent, ref } from "vue";

// composables
import useSection from "../composables/useSection";
import useAlert from "../../../composables/useAlert";

// components
import Alert from "../../../components/Alert.vue";

export default defineComponent({
  name: "ProducerAdd",
  components: {
    Alert,
  },
  setup() {
    const { createSectionStorage } = useSection();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert } = useAlert();

    // form
    const sectionForm = ref({
      section_number: "",
      name: "",
    });

    // on reset form
    const onResetSection = () => {
      sectionForm.value = {
        section_number: "",
        name: "",
      };
    };

    // on create section
    const onCreateSection = async () => {
      const { ok, message } = await createSectionStorage(sectionForm);
      if (!ok) {
        headerMessage.value = "Error";
        alertMessage.value = message;
        isAlertOpen.value = true;
        return;
      }

      headerMessage.value = "Seccion Agregada";
      alertMessage.value = `
        Registro guardado correctamente, en memoria.
      `;
      isAlertOpen.value = true;
      onResetSection();
    };

    return {
      sectionForm,
      onCreateSection,
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
    };
  },
});
</script>
