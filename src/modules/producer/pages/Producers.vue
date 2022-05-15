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
      <q-btn
        round
        color="primary"
        icon="las la-users"
        @click="$router.push({ name: 'producer_add' })"
      />
      <!--
      <q-toggle v-model="showProducerDeleted" label="Mostrar Eliminados" />
      -->
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
        <template v-for="(producer, i) in producers" :key="i">
          <tr v-if="producer.is_active">
            <td class="text-left">{{ producer.first_name }}</td>
            <td class="text-left">{{ producer.last_name }}</td>
            <td class="text-left">{{ producer.document_number }}</td>
            <td class="text-left">{{ producer.address }}</td>
            <td class="text-left">{{ producer.phone_number }}</td>
            <td class="text-left">{{ formatDate(producer.birth_date) }}</td>
            <td class="text-left">
              <q-btn
                round
                text-color="secondary"
                icon="las la-file"
                class="q-mr-sm"
                @click="
                  $router.push({
                    name: 'producer_detail',
                    params: { id: producer.id },
                  })
                "
              />
              <q-btn
                round
                text-color="secondary"
                icon="las la-edit"
                class="q-mr-sm"
                @click="onToggleModal(producer)"
              />
              <q-btn
                round
                text-color="negative"
                icon="las la-trash-alt"
                class="q-mr-sm"
                @click="openAlert(producer)"
              />
            </td>
          </tr>
          <tr
            v-else-if="showProducerDeleted && !producer.is_active"
            :style="{ backgroundColor: 'grey' }"
          >
            <td class="text-left">{{ producer.first_name }}</td>
            <td class="text-left">{{ producer.last_name }}</td>
            <td class="text-left">{{ producer.document_number }}</td>
            <td class="text-left">{{ producer.address }}</td>
            <td class="text-left">{{ producer.phone_number }}</td>
            <td class="text-left">{{ formatDate(producer.birth_date) }}</td>
            <td class="text-left">
              <q-btn
                round
                text-color="secondary"
                icon="las la-file"
                class="q-mr-sm"
                @click="
                  $router.push({
                    name: 'producer_detail',
                    params: { id: producer.id },
                  })
                "
              />
              <q-btn
                round
                text-color="secondary"
                icon="las la-edit"
                class="q-mr-sm"
                @click="onToggleModal(producer)"
              />
              <q-btn
                round
                :text-color="producer.is_active ? 'negative' : 'primary'"
                :icon="
                  producer.is_active ? 'las la-trash-alt' : 'las la-undo-alt'
                "
                class="q-mr-sm"
                @click="onActiveProducer(producer)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </q-markup-table>
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
            @click="onDeleteProducer()"
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
          <producer-form
            :producerData="producerData"
            @submit-form-producer="submitFormProducer"
          />
        </div>
      </template>
    </full-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

// components
import Alert from "../../../components/Alert.vue";
import FullModal from "../../../components/FullModal.vue";
import ProducerForm from "../components/ProducerForm.vue";

// composables
import useProducer from "../composables/useProducer";

// helpers
import { formatDate } from "../../../helpers/formatDate";

export default defineComponent({
  name: "Producers",
  components: {
    Alert,
    FullModal,
    ProducerForm,
  },
  setup() {
    const { producers, editProducer, deleteProducer } = useProducer();

    const producerItems = [
      "Nombre",
      "Apellido",
      "DNI",
      "Dirección",
      "Teléfono",
      "Fecha de Nacimiento",
      "",
    ];

    // modal
    let headerModalMessage = ref("");
    let maximizedToggle = ref(true);
    let isModalOpen = ref(false);

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const producerData = ref(null);

    const onToggleModal = (producer) => {
      producerData.value = producer;
      isModalOpen.value = !isModalOpen.value;
    };

    // submit form update
    const submitFormProducer = async (form) => {
      const { ok, message } = await editProducer(form.value);
      if (ok) {
        closeModal();
      } else {
        headerModalMessage.value = message;
        maximizedToggle.value = false;
      }
    };

    // alert
    let headerMessage = ref("");
    let alertMessage = ref("");
    let isAlertOpen = ref(false);

    const closeAlert = () => {
      isAlertOpen.value = false;
    };

    let producerDeleted = ref(null);
    let showProducerDeleted = ref(false);

    const openAlert = (p) => {
      producerDeleted.value = p;
      headerMessage.value = "Eliminar";
      alertMessage.value = "¿Está seguro que desea eliminar al productor?";
      isAlertOpen.value = true;
    };

    const onDeleteProducer = async () => {
      const { ok } = await deleteProducer(producerDeleted.value);
      if (ok) {
        closeAlert();
      } else {
        headerMessage.value = "Error";
        alertMessage.value = "No se pudo eliminar al productor";
      }
    };

    const onActiveProducer = async (producer) => {
      const { ok } = await deleteProducer(producer);
      if (ok) {
        closeAlert();
      } else {
        headerMessage.value = "Error";
        alertMessage.value = "No se pudo eliminar al productor";
      }
    };

    return {
      producerItems,
      producers,
      formatDate,
      // modal
      headerModalMessage,
      maximizedToggle,
      isModalOpen,
      closeModal,
      onToggleModal,
      producerData,
      submitFormProducer,
      // alert
      openAlert,
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      onDeleteProducer,
      showProducerDeleted,
      onActiveProducer,
    };
  },
});
</script>
