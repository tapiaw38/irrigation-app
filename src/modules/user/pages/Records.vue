<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="white"
        icon="las la-arrow-alt-circle-left"
        text-color="primary"
        @click="$router.push({ name: 'home' })"
      />
    </div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <template v-for="producer in producerItems" :key="producer">
            <th class="text-left">{{ producer }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-if="producersStorage?.length > 0">
          <td class="text-left">Guardado en dispositivo</td>
          <td class="text-left">Productores</td>
          <td class="text-left">{{ producersStorage.length }}</td>
          <td class="text-left">
            <q-btn
              round
              color="secondary"
              icon="las la-cloud-upload-alt"
              class="q-mr-sm"
              @click="onCreateProducers()"
            />
            <q-btn
              round
              text-color="primary"
              icon="las la-file"
              class="q-mr-sm"
              @click="onToggleModal()"
            />
            <q-btn
              round
              text-color="negative"
              icon="las la-trash-alt"
              class="q-mr-sm"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <!-- alert -->
    <alert
      :dialog="isAlertOpen"
      :headerMessage="headerMessage"
      :message="alertMessage"
      @close="closeAlert()"
    />
    <!-- modal -->
    <full-modal
      :dialog="isModalOpen"
      :headerMessage="headerModalMessage"
      :maximizedToggle="maximizedToggle"
      @close="closeModal()"
    >
      <template v-slot:body>
        <!-- content for the body slot -->
        <div class="q-pa-md">
          <q-table
            title="Datos en memoria del dispositivo"
            :rows="producersStorage"
            :columns="columns"
            row-key="name"
            hide-bottom
          >
          </q-table>
        </div>
      </template>
    </full-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

// composables
import useProducer from "../../producer/composables/useProducer";

// components
import Alert from "../../../components/Alert.vue";
import FullModal from "../../../components/FullModal.vue";

export default defineComponent({
  name: "Records",
  components: {
    Alert,
    FullModal,
  },
  setup() {
    const { producersStorage, createProducers, deleteProducersStorage } =
      useProducer();
    const producerItems = ["Estado", "Registro", "Cantidad", ""];

    // alert
    let headerMessage = ref("");
    let alertMessage = ref("");
    let isAlertOpen = ref(false);

    const closeAlert = () => {
      isAlertOpen.value = false;
    };

    // modal
    let headerModalMessage = ref("");
    let maximizedToggle = ref(true);
    let isModalOpen = ref(false);

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const onToggleModal = () => {
      isModalOpen.value = !isModalOpen.value;
    };

    // producer create
    const onCreateProducers = async () => {
      const { ok, message } = await createProducers(producersStorage.value);
      if (!ok) {
        headerMessage.value = "Error";
        alertMessage.value = message;
        isAlertOpen.value = true;
        return;
      }

      headerMessage.value = "Conexión exitosa!";
      alertMessage.value = `
        Se ha conectado con el servidor.
        Registros guardados correctamente.
      `;
      const data = await deleteProducersStorage();
      if (!data.ok) {
        headerMessage.value = "Error";
        alertMessage.value =
          "No se pudo eliminar los productores," + data.message;
        isAlertOpen.value = true;
        return;
      }
      isAlertOpen.value = true;
    };

    // data table
    const columns = [
      {
        name: "first_name",
        label: "Nombre",
        field: "first_name",
        sortable: false,
      },
      {
        name: "last_name",
        label: "Apellido",
        field: "last_name",
        sortable: false,
      },
      {
        name: "birth_date",
        label: "Fecha de nacimiento",
        field: "birth_date",
        sortable: false,
      },
      {
        name: "document_number",
        label: "Documento",
        field: "document_number",
        sortable: false,
      },
      {
        name: "phone_number",
        label: "Teléfono",
        field: "phone_number",
        sortable: false,
      },
      {
        name: "address",
        label: "Dirección",
        field: "address",
        sortable: false,
      },
    ];

    return {
      producerItems,
      producersStorage,
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      onCreateProducers,
      headerModalMessage,
      maximizedToggle,
      isModalOpen,
      closeModal,
      onToggleModal,
      columns,
    };
  },
});
</script>
