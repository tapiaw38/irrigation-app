<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-users"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Agregar Productor</span>
      </q-toolbar-title>
      <div class="q-gutter-md text-center">
        <q-form @submit="onCreateProducer()">
          <q-input
            v-model="producerForm.first_name"
            label="Nombre"
            type="text"
            class="q-mr-sm"
          />
          <q-input
            v-model="producerForm.last_name"
            label="Apellido"
            type="text"
            class="q-mr-sm"
          />
          <q-input
            v-model="producerForm.document_number"
            label="DNI"
            type="number"
            class="q-mr-sm"
          />
          <q-input
            v-model="producerForm.birth_date"
            label="Fecha de Nacimiento"
            type="date"
            stack-label
            class="q-mr-sm"
          />
          <q-input
            v-model="producerForm.phone_number"
            label="Teléfono"
            type="number"
            class="q-mr-sm"
          />
          <q-input
            v-model="producerForm.address"
            label="Dirección"
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
import useProducer from "../composables/useProducer";

// components
import Alert from "../../../components/Alert.vue";

export default defineComponent({
  name: "ProducerAdd",
  components: {
    Alert,
  },
  setup() {
    const { createProducerStorage, producersStorage } = useProducer();

    // alert
    let headerMessage = ref("");
    let alertMessage = ref("");
    let isAlertOpen = ref(false);

    const closeAlert = () => {
      isAlertOpen.value = false;
    };

    // form
    const producerForm = ref({
      first_name: "",
      last_name: "",
      document_number: "",
      address: "",
      phone: "",
      birth_date: "",
    });

    const onCreateProducer = async () => {
      const { ok, message } = await createProducerStorage(producerForm);
      if (!ok) {
        headerMessage.value = "Error";
        alertMessage.value = message;
        isAlertOpen.value = true;
        return;
      }

      headerMessage.value = "Productor Agregado";
      alertMessage.value = `
        Registro guardado correctamente, en memoria.
      `;
      isAlertOpen.value = true;
    };

    return {
      producerForm,
      onCreateProducer,
      producersStorage,
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
    };
  },
});
</script>
