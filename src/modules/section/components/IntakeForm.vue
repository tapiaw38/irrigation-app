<template>
  <form @submit="onSubmitIntake" class="q-gutter-md">
    <div class="text-weight-bold text-subtitle1 text-primary">
      Sección {{ sectionNumber }}
    </div>
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
      <div class="row justify-center content-center col-3 q-mt-lg q-pt-lg">
        <q-btn color="primary" round @click="determinePosition()">
          <q-icon name="las la-map-marker" />
        </q-btn>
      </div>
    </div>
    <q-btn
      class="full-width q-mt-md"
      color="primary"
      label="Aplicar"
      type="submit"
    />
  </form>
</template>

<script>
import { onMounted, ref, computed } from "vue";

//composables
import useGeoloaction from "../../../composables/useGeolocation";
import useAlert from "../../../composables/useAlert";

export default {
  name: "intakeForm",
  emmit: ["onSubmitIntake"],
  props: {
    intakeData: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const { positionLoader, position } = useGeoloaction();
    const { headerMessage, alertMessage, isAlertOpen, closeAlert } = useAlert();

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

    // determine position
    const determinePosition = () => {
      positionLoader.value = "determinando...";
      intakeForm.value.latitude = position.value.coords?.latitude;
      intakeForm.value.longitude = position.value.coords?.longitude;
      positionLoader.value = "Posición actualizada";
    };

    onMounted(() => {
      if (props.intakeData) {
        intakeForm.value.intake_number = props.intakeData.intake_number;
        intakeForm.value.name = props.intakeData.name;
        intakeForm.value.section = props.intakeData?.section?.value.id;
      }
    });

    return {
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      intakeForm,
      onSubmitIntake,
      determinePosition,
      positionLoader,
      sectionNumber: computed(
        () => props.intakeData?.section?.value.section_number
      ),
    };
  },
};
</script>
