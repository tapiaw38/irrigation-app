<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="primary"
        icon="las la-seedling"
        @click="$router.push({ name: 'production_add' })"
      />
    </div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <template v-for="production in productionItems" :key="production">
            <th class="text-left">{{ production }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(production, i) in productions" :key="i">
          <td class="text-left">
            {{ production.producer.first_name }}
            {{ production.producer.last_name }}
          </td>
          <td class="text-left">{{ production.lote_number }}</td>
          <td class="text-left">{{ production.entry }}</td>
          <td class="text-left">{{ production.cadastral_registration }}</td>
          <td class="text-left">{{ production.name }}</td>
          <td class="text-left">{{ production.production_type }}</td>
          <td class="text-left">{{ production.district }}</td>
          <td class="text-left">{{ production.area }}</td>
          <td class="text-left">{{ production.cultivated_area }}</td>
          <td class="text-left">
            <q-btn
              round
              text-color="secondary"
              icon="las la-file"
              class="q-mr-sm"
              @click="
                $router.push({
                  name: 'production_detail',
                  params: { id: production.id },
                })
              "
            />

            <q-btn
              round
              text-color="secondary"
              icon="las la-edit"
              class="q-mr-sm"
              @click="onToggleModal(production)"
            />
            <q-btn
              round
              text-color="negative"
              icon="las la-trash-alt"
              class="q-mr-sm"
              @click="openAlert(production)"
            />
          </td>
        </tr>
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
          <production-form
            :productionData="productionData"
            @submit-form-production="submitFormProduction"
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
            @click="onDeleteProduction()"
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
import ProductionForm from "../components/ProductionForm.vue";
import Alert from "../../../components/Alert.vue";
import FullModal from "../../../components/FullModal.vue";

// composables
import useProducer from "../composables/useProducer";

// helpers
import { formatDate } from "../../../helpers/formatDate";

export default defineComponent({
  name: "Producers",
  components: {
    ProductionForm,
    Alert,
    FullModal,
  },
  setup() {
    const { productions, editProduction, deleteProduction } = useProducer();

    const productionItems = [
      "Productor",
      "Número de lote",
      "Partida",
      "Matricula catastral",
      "Producción",
      "Tipo de producción",
      "Distrito",
      "Hectareas",
      "Hectareas cultivadas",
      "",
    ];

    // modal
    let headerModalMessage = ref("");
    let maximizedToggle = ref(true);
    let isModalOpen = ref(false);

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const productionData = ref(null);

    const onToggleModal = (production) => {
      productionData.value = production;
      isModalOpen.value = !isModalOpen.value;
    };

    // submit form producer update
    const submitFormProduction = async (form) => {
      form.value.producer = form.value.producer.value;
      form.value.area = Number(form.value.area);
      form.value.cultivated_area = Number(form.value.cultivated_area);
      form.value.district = form.value.district.value || null;
      form.value.latitude = Number(form.value.latitude);
      form.value.longitude = Number(form.value.longitude);
      const { ok, message } = await editProduction(form.value);
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

    let productionDeleted = ref(null);

    const openAlert = (p) => {
      productionDeleted.value = p;
      headerMessage.value = "Eliminar";
      alertMessage.value = "¿Está seguro que desea eliminar la producción?";
      isAlertOpen.value = true;
    };

    const onDeleteProduction = async () => {
      const { ok } = await deleteProduction(productionDeleted.value);
      if (ok) {
        closeAlert();
      } else {
        headerMessage.value = "Error";
        alertMessage.value = "No se pudo eliminar la producción";
      }
    };

    return {
      productionItems,
      formatDate,
      productions,
      headerModalMessage,
      maximizedToggle,
      isModalOpen,
      closeModal,
      productionData,
      onToggleModal,
      submitFormProduction,
      // alert
      headerMessage,
      alertMessage,
      isAlertOpen,
      openAlert,
      closeAlert,
      onDeleteProduction,
    };
  },
});
</script>
