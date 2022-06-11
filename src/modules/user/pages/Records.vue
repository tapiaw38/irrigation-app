<template>
  <div class="q-pa-md">
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
              @click="onToggleModal('producer')"
            />
            <q-btn
              round
              text-color="negative"
              icon="las la-trash-alt"
              class="q-mr-sm"
              @click="deleteProducersStorage()"
            />
          </td>
        </tr>
        <tr v-if="productionsStorage?.length > 0">
          <td class="text-left">Guardado en dispositivo</td>
          <td class="text-left">Producciones</td>
          <td class="text-left">{{ productionsStorage.length }}</td>
          <td class="text-left">
            <q-btn
              round
              color="secondary"
              icon="las la-cloud-upload-alt"
              class="q-mr-sm"
              @click="onCreateProductions()"
            />
            <q-btn
              round
              text-color="primary"
              icon="las la-file"
              class="q-mr-sm"
              @click="onToggleModal('production')"
            />
            <q-btn
              round
              text-color="negative"
              icon="las la-trash-alt"
              class="q-mr-sm"
              @click="deleteProductionsStorage()"
            />
          </td>
        </tr>
        <tr v-if="sectionsStorage?.length > 0">
          <td class="text-left">Guardado en dispositivo</td>
          <td class="text-left">Secciones</td>
          <td class="text-left">{{ sectionsStorage.length }}</td>
          <td class="text-left">
            <q-btn
              round
              color="secondary"
              icon="las la-cloud-upload-alt"
              class="q-mr-sm"
              @click="onCreateSections()"
            />
            <q-btn
              round
              text-color="primary"
              icon="las la-file"
              class="q-mr-sm"
              @click="onToggleModal('section')"
            />
            <q-btn
              round
              text-color="negative"
              icon="las la-trash-alt"
              class="q-mr-sm"
              @click="deleteSectionStorage()"
            />
          </td>
        </tr>
        <tr v-if="intakesStorage?.length > 0">
          <td class="text-left">Guardado en dispositivo</td>
          <td class="text-left">Tomas de Agua</td>
          <td class="text-left">{{ intakesStorage.length }}</td>
          <td class="text-left">
            <q-btn
              round
              color="secondary"
              icon="las la-cloud-upload-alt"
              class="q-mr-sm"
              @click="onCreateIntakes()"
            />
            <q-btn
              round
              text-color="primary"
              icon="las la-file"
              class="q-mr-sm"
              @click="onToggleModal('intake')"
            />
            <q-btn
              round
              text-color="negative"
              icon="las la-trash-alt"
              class="q-mr-sm"
              @click="deleteIntakeStorage()"
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
            :title="`Datos en memoria de ${tableName}`"
            :rows="rows"
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

// helpers
import columnsProducer from "../helpers/columnsProducer";
import columnsProduction from "../helpers/columnsProduction";
import columnsSection from "../helpers/columnsSection";
import columnsIntake from "../helpers/columnsIntake";

// composables
import useProducer from "../../producer/composables/useProducer";
import useSection from "../../section/composables/useSection";
import useAlert from "../../../composables/useAlert";
import useModal from "../../../composables/useModal";

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
    const {
      producersStorage,
      productionsStorage,
      createProducers,
      createProductions,
      deleteProducersStorage,
      deleteProductionsStorage,
    } = useProducer();
    const {
      sectionsStorage,
      createSection,
      createIntake,
      deleteSectionStorage,
      intakesStorage,
      deleteIntakeStorage,
    } = useSection();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert } = useAlert();
    const { headerModalMessage, maximizedToggle, isModalOpen, closeModal } =
      useModal();

    const producerItems = ["Estado", "Registro", "Cantidad", ""];

    // on toggle modal
    const onToggleModal = (value) => {
      switch (value) {
        case "producer":
          tableName.value = "productores";
          rows.value = producersStorage.value;
          columns.value = columnsProducer;
          break;
        case "production":
          tableName.value = "producciones";
          let productions = productionsStorage.value.map((p) => {
            return {
              ...p,
              producer: p.producer.label,
              area: `${p.area} ha2`,
              district: p.district.label,
            };
          });
          rows.value = productions;
          columns.value = columnsProduction;
          break;
        case "section":
          tableName.value = "secciones";
          rows.value = sectionsStorage.value;
          columns.value = columnsSection;
          break;
        case "intake":
          tableName.value = "tomas de agua";
          let intakes = intakesStorage.value.map((i) => {
            return {
              ...i,
              section: i.section.label,
            };
          });
          rows.value = intakes;
          columns.value = columnsIntake;
          break;
        default:
          break;
      }

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

    // production create
    const onCreateProductions = async () => {
      let productions = productionsStorage.value.map((p) => {
        return {
          ...p,
          producer: p.producer.value,
          area: Number(p.area),
          district: p.district.value,
          latitude: Number(p.latitude),
          longitude: Number(p.longitude),
        };
      });

      const { ok, message } = await createProductions(productions);
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
      const data = await deleteProductionsStorage();
      if (!data.ok) {
        headerMessage.value = "Error";
        alertMessage.value =
          "No se pudo eliminar los productores," + data.message;
        isAlertOpen.value = true;
        return;
      }
      isAlertOpen.value = true;
    };

    // section create
    const onCreateSections = async () => {
      const { ok, message } = await createSection(sectionsStorage.value);
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
      const data = await deleteSectionStorage();
      if (!data.ok) {
        headerMessage.value = "Error";
        alertMessage.value =
          "No se pudo eliminar las secciones," + data.message;
        isAlertOpen.value = true;
        return;
      }
      isAlertOpen.value = true;
    };

    const onCreateIntakes = async () => {
      let intakes = intakesStorage.value.map((i) => {
        return {
          ...i,
          section: i.section.value,
        };
      });

      const { ok, message } = await createIntake(intakes);

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
      const data = await deleteIntakeStorage();
      if (!data.ok) {
        headerMessage.value = "Error";
        alertMessage.value =
          "No se pudo eliminar las tomas de agua," + data.message;
        isAlertOpen.value = true;
        return;
      }
      isAlertOpen.value = true;
    };

    // data table
    let tableName = ref("");
    const columns = ref([]);
    const rows = ref([]);

    return {
      producerItems,
      producersStorage,
      productionsStorage,
      sectionsStorage,
      intakesStorage,
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      onCreateProducers,
      onCreateProductions,
      onCreateSections,
      onCreateIntakes,
      headerModalMessage,
      maximizedToggle,
      isModalOpen,
      closeModal,
      onToggleModal,
      columns,
      rows,
      tableName,
      deleteProductionsStorage,
      deleteProducersStorage,
      deleteSectionStorage,
      deleteIntakeStorage,
    };
  },
});
</script>
