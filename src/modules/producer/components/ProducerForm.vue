<template>
  <q-form @submit="onSubmitProducer" class="q-gutter-md">
    <q-input
      filled
      type="text"
      v-model="producerForm.first_name"
      label="Nombre"
    />
    <q-input
      filled
      type="text"
      v-model="producerForm.last_name"
      label="Apellido"
    />
    <q-input
      filled
      type="number"
      v-model="producerForm.document_number"
      label="Documento"
    />
    <q-input
      filled
      type="date"
      v-model="producerForm.birth_date"
      label="Fecha de nacimiento"
      stack-label
    />
    <q-input
      filled
      type="text"
      v-model="producerForm.phone_number"
      label="Telefono"
    />
    <q-input
      filled
      type="text"
      v-model="producerForm.address"
      label="Direccion"
    />

    <div>
      <q-btn label="Aplicar" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { onMounted, ref } from "vue";

// helpers
import { formatDateDatabase } from "../../../helpers/formatDate";

export default {
  name: "ProducerForm",
  emmit: ["onSubmitProducer"],
  props: {
    producerData: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const producerForm = ref({
      id: null,
      first_name: "",
      last_name: "",
      document_number: "",
      birth_date: "",
      phone_number: "",
      address: "",
    });

    const onSubmitProducer = (e) => {
      e.preventDefault();
      emit("submit-form-producer", producerForm);
    };

    onMounted(() => {
      if (props.producerData) {
        producerForm.value.id = props.producerData.id;
        producerForm.value.first_name = props.producerData.first_name;
        producerForm.value.last_name = props.producerData.last_name;
        producerForm.value.document_number = props.producerData.document_number;
        producerForm.value.birth_date = formatDateDatabase(
          props.producerData.birth_date
        );
        producerForm.value.phone_number = props.producerData.phone_number;
        producerForm.value.address = props.producerData.address;
      }
    });

    return {
      producerForm,
      onSubmitProducer,
    };
  },
};
</script>
