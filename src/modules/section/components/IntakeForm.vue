<template>
  <form @submit="onSubmitIntake" class="q-gutter-md">
    <q-input
      v-model="intakeForm.intake_number"
      label="Número de Toma"
      type="text"
      class="q-mr-sm"
    />
    <q-input
      v-model="intakeForm.name"
      label="Descripción"
      type="text"
      class="q-mr-sm"
    />
    <q-input
      v-model="intakeForm.latitude"
      label="Latitud"
      type="text"
      class="q-mr-sm"
    />
    <q-input
      v-model="intakeForm.longitude"
      label="Longitud"
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
  name: "intakeForm",
  emmit: ["onSubmitIntake"],
  props: {
    intakeData: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    // form
    const intakeForm = ref({
      intake_number: "",
      name: "",
      section: "",
      latitude: 0,
      longitude: 0,
    });

    const onSubmitIntake = (e) => {
      e.preventDefault();
      emit("submit-form-intake", intakeForm);
    };

    onMounted(() => {
      if (props.intakeData) {
        intakeForm.value.id = props.intakeData.id;
        intakeForm.value.section = props.intakeData.section.id;
        intakeForm.value.intake_number = props.intakeData.intake_number;
        intakeForm.value.name = props.intakeData.name;
        intakeForm.value.latitude = props.intakeData.latitude;
        intakeForm.value.longitude = props.intakeData.longitude;
      }
    });

    return {
      intakeForm,
      onSubmitIntake,
    };
  },
};
</script>
