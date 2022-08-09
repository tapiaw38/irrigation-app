<template>
  <form @submit="onSubmitShift" class="q-gutter-md">
    <div class="q-col-sm-12" color="primary">Fecha de inicio:</div>
    <q-input
      v-model="shiftForm.start_date"
      :rules="[{ required: true, message: 'Campo requerido' }]"
      class="q-col-sm-12"
      type="date"
      name="start_date"
    />

    <div class="flex justify-center">
      <q-btn label="Aplicar" type="submit" color="primary" />
    </div>
  </form>
</template>

<script>
import { onMounted, ref } from "vue";

// helpers
import { formatDateDatabase } from "../../../helpers/formatDate";

export default {
  name: "ShiftForm",
  emmit: ["onSubmitShift"],
  props: {
    shiftData: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    // form
    const shiftForm = ref({
      start_date: "",
    });

    const onSubmitShift = (e) => {
      e.preventDefault();
      emit("submit-form-shift", shiftForm);
    };

    onMounted(() => {
      if (props.shiftData) {
        shiftForm.value = {
          id: props.shiftData.id,
          start_date: formatDateDatabase(props.shiftData.start_date),
        };
      }
    });

    return {
      shiftForm,
      onSubmitShift,
    };
  },
};
</script>
