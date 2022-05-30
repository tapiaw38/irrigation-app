<template>
  <form @submit="onSubmitSection" class="q-gutter-md">
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
      label="Aplicar"
      type="submit"
    />
  </form>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "SectionForm",
  emmit: ["onSubmitSection"],
  props: {
    sectionData: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    // alert
    let headerMessage = ref("");
    let alertMessage = ref("");
    let isAlertOpen = ref(false);

    const closeAlert = () => {
      isAlertOpen.value = false;
    };

    // form
    const sectionForm = ref({
      section_number: "",
      name: "",
    });

    const onSubmitSection = (e) => {
      e.preventDefault();
      emit("submit-form-section", sectionForm);
    };

    onMounted(() => {
      if (props.sectionData) {
        sectionForm.value = {
          id: props.sectionData.id,
          section_number: props.sectionData.section_number,
          name: props.sectionData.name,
        };
      }
    });

    return {
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      sectionForm,
      onSubmitSection,
    };
  },
};
</script>
