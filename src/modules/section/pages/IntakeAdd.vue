<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-water"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Agregar Tomas de Agua</span>
      </q-toolbar-title>
      <div class="q-gutter-md text-center">
        <q-form @submit="onCreateIntake()">
          <q-select
            :options="options"
            label="Sección"
            dropdown-icon="las la-angle-down"
            v-model="intakeForm.section"
          >
            <template v-slot:prepend>
              <q-icon name="las la-object-ungroup" @click.stop />
            </template>
          </q-select>
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
          <div class="row justify-start col-12">
            <div class="col-9">
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
            </div>
            <div
              class="row justify-center content-center col-3 q-mt-lg q-pt-lg"
            >
              <q-btn color="primary" round @click="determinePosition()">
                <q-icon name="las la-map-marker" />
              </q-btn>
            </div>
          </div>
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
import useGeoloaction from "../../../composables/useGeolocation";
import useSection from "../composables/useSection";
import useAlert from "../../../composables/useAlert";

// components
import Alert from "../../../components/Alert.vue";

export default defineComponent({
  name: "IntakeAdd",
  components: {
    Alert,
  },
  setup() {
    const { positionLoader, position } = useGeoloaction();
    const { createIntakeStorage, allSectionStorage } = useSection();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert } = useAlert();

    // producers option for select
    let options = allSectionStorage.value.map((section) => {
      return {
        label: `${section.section_number}`,
        value: section.id,
      };
    });

    // form
    const intakeForm = ref({
      intake_number: "",
      name: "",
      section: "",
      latitude: 0,
      longitude: 0,
    });

    // on reset form
    const onResetIntake = () => {
      intakeForm.value = {
        intake_number: "",
        name: "",
        section: "",
        latitude: 0,
        longitude: 0,
      };
    };

    // determine position
    const determinePosition = () => {
      positionLoader.value = "determinando...";
      intakeForm.value.latitude = position.value.coords?.latitude;
      intakeForm.value.longitude = position.value.coords?.longitude;
      positionLoader.value = "Posición actualizada";
    };

    // on create section
    const onCreateIntake = async () => {
      const { ok, message } = await createIntakeStorage(intakeForm);
      if (!ok) {
        headerMessage.value = "Error";
        alertMessage.value = message;
        isAlertOpen.value = true;
        return;
      }

      headerMessage.value = "Seccion Agregada";
      alertMessage.value = `
        Registro guardado correctamente, en memoria.
      `;
      isAlertOpen.value = true;
      onResetIntake();
    };

    return {
      intakeForm,
      onCreateIntake,
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      determinePosition,
      options,
    };
  },
});
</script>
