<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="primary"
        icon="las la-water"
        @click="$router.push({ name: 'intake_add' })"
      />
    </div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <template v-for="intake in intakeItems" :key="intake">
            <th class="text-left">{{ intake }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(intake, i) in intakes" :key="i">
          <tr>
            <td class="text-left">{{ intake.section.section_number }}</td>
            <td class="text-left">{{ intake.intake_number }}</td>
            <td class="text-left">{{ intake.name }}</td>
            <td class="text-left">{{ formatDate(intake.updated_at) }}</td>
            <td class="text-left">
              {{ intake.productions ? intake.productions.length : 0 }}
            </td>
            <td class="text-left">
              <q-btn
                round
                text-color="secondary"
                icon="las la-file"
                class="q-mr-sm"
                @click="
                  $router.push({
                    name: 'intake_detail',
                    params: { id: intake.id },
                  })
                "
              />
              <q-btn
                round
                text-color="secondary"
                icon="las la-edit"
                class="q-mr-sm"
                @click="onToggleModal(intake)"
              />
              <q-btn
                round
                text-color="secondary"
                icon="las la-seedling"
                class="q-mr-sm"
                @click="createOpenAlertHandler(intake)"
              />
              <q-btn
                round
                text-color="negative"
                icon="las la-trash-alt"
                class="q-mr-sm"
                @click="openAlertHandler(intake)"
              />
            </td>
          </tr>
        </template>
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
          <intake-form
            :intakeData="intakeData"
            @submit-form-intake="submitFormIntake"
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
            @click="onDeleteIntake()"
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
    <alert
      :dialog="createIsAlertOpen"
      :headerMessage="createHeaderMessage"
      :message="createAlertMessage"
      :showIcon="false"
      @close="createCloseAlert()"
    >
      <template v-slot:body>
        <q-form @submit="onSubmitCreateIntakeProduction" class="q-pa-sm">
          <q-select
            :options="optionsProduction"
            label="Producción"
            dropdown-icon="las la-angle-down"
            v-model="intakeProduction.production_id"
          >
            <template v-slot:prepend>
              <q-icon name="las la-seedling" @click.stop />
            </template>
          </q-select>
          <q-input
            label="Orden de riego"
            v-model="intakeProduction.watering_order"
            type="number"
          ></q-input>
          <q-btn
            class="full-width q-mt-md"
            label="Aplicar"
            type="submit"
            color="primary"
          />
        </q-form>
      </template>
    </alert>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";

// components
import FullModal from "../../../components/FullModal";
import IntakeForm from "../components/IntakeForm";
import Alert from "../../../components/Alert.vue";

// helpers
import { formatDate } from "../../../helpers/formatDate";

// composables
import useSection from "../composables/useSection";
import useProducer from "../../producer/composables/useProducer";
import useAlert from "../../../composables/useAlert";
import useModal from "../../../composables/useModal";

export default defineComponent({
  name: "Producers",
  components: {
    FullModal,
    IntakeForm,
    Alert,
  },
  setup() {
    const { intakes, editIntake, deleteIntake, createIntakeProduction } =
      useSection();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert, openAlert } =
      useAlert();
    const {
      headerMessage: createHeaderMessage,
      alertMessage: createAlertMessage,
      isAlertOpen: createIsAlertOpen,
      closeAlert: createCloseAlert,
      openAlert: createOpenAlert,
    } = useAlert();
    const { productions } = useProducer();
    const {
      headerModalMessage,
      maximizedToggle,
      isModalOpen,
      closeModal,
      openModal,
    } = useModal();
    const intakeItems = [
      "Seccion",
      "Número de Toma",
      "Descripción",
      "Fecha de modificación",
      "Producciones",
      "",
    ];

    // modal
    const intakeData = ref(null);

    const onToggleModal = (intake) => {
      intakeData.value = intake;
      isModalOpen.value = !isModalOpen.value;
    };

    // submit form producer update
    const submitFormIntake = async (form) => {
      form.value.latitude = Number(form.value.latitude);
      form.value.longitude = Number(form.value.longitude);
      const { ok, message } = await editIntake(form.value);
      if (!ok) {
        openModal("Error, no se pudo editar la toma " + message);
        return;
      }
      closeModal();
    };

    // alert
    let intakeDeleted = ref(null);

    const openAlertHandler = (p) => {
      intakeDeleted.value = p;
      openAlert("Eliminar Toma", "¿Está seguro de eliminar la toma?");
    };

    // delete section
    const onDeleteIntake = async () => {
      const { ok } = await deleteIntake(intakeDeleted.value);
      if (ok) {
        closeAlert();
      } else {
        openAlert("Error", "No se pudo eliminar la toma");
      }
    };

    // productions option for select
    let optionsProduction = computed(() => {
      let productionOptions = [...productions.value];
      return productionOptions.map((production) => {
        // intakes.value.map((intake) => {
        //   let prodSelect = intake.productions?.find(
        //     (p) => p.id === production.id
        //   );
        //   let idx = productionOptions.map(p => p.id).indexOf((p) => p.id === prodSelect?.id);
        //   productionOptions.splice(idx, 1);
        // });
        return {
          label: `${production.producer.first_name} ${production.name}`,
          value: production.id,
        };
      });
    });

    let intakeProduction = ref({
      intake_id: null,
      production_id: null,
      watering_order: null,
    });

    const createOpenAlertHandler = (i) => {
      intakeProduction.value.intake_id = i.id;
      createOpenAlert("Agregar Producción", "Seleccione la producción");
    };

    const onSubmitCreateIntakeProduction = async () => {
      intakeProduction.value.production_id = String(
        intakeProduction.value.production_id.value
      );
      intakeProduction.value.intake_id = String(
        intakeProduction.value.intake_id
      );
      intakeProduction.value.watering_order = Number(
        intakeProduction.value.watering_order
      );
      const { ok, message } = await createIntakeProduction(
        intakeProduction.value
      );
      if (!ok) {
        createOpenAlert("Error", "La producción ya existe en la Toma");
        intakeProduction.value.production_id = null;
        intakeProduction.value.watering_order = null;
        return;
      }
      intakeProduction.value.production_id = null;
      intakeProduction.value.intake_id = null;
      intakeProduction.value.watering_order = null;
      createCloseAlert();
    };

    return {
      intakeItems,
      formatDate,
      intakes,
      isModalOpen,
      closeModal,
      onToggleModal,
      submitFormIntake,
      intakeData,
      headerModalMessage,
      maximizedToggle,
      // alert
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      openAlertHandler,
      onDeleteIntake,
      // create
      createHeaderMessage,
      createAlertMessage,
      createIsAlertOpen,
      createCloseAlert,
      createOpenAlert,
      // productions
      optionsProduction,
      intakeProduction,
      createOpenAlertHandler,
      onSubmitCreateIntakeProduction,
    };
  },
});
</script>
