<template>
  <q-form @submit="onSubmitProduction" class="q-gutter-md">
    <q-select
      :options="optionsProducer"
      label="Productor"
      dropdown-icon="las la-angle-down"
      v-model="productionForm.producer"
    >
      <template v-slot:prepend>
        <q-icon name="las la-user" @click.stop />
      </template>
    </q-select>
    <q-input
      label="Numero de Lote"
      v-model="productionForm.lote_number"
      type="text"
      class="q-mr-sm"
    />
    <q-input
      label="Numero de Partida"
      v-model="productionForm.entry"
      type="text"
      class="q-mr-sm"
    />
    <q-input
      label="Matricula Catastral"
      v-model="productionForm.cadastral_registration"
      type="text"
      class="q-mr-sm"
    />
    <q-input
      label="Nombre de Producción"
      v-model="productionForm.name"
      type="text"
      class="q-mr-sm"
    />
    <q-input
      label="Tipo de Producción"
      v-model="productionForm.production_type"
      type="text"
      class="q-mr-sm"
    />
    <q-select
      :options="optionsDistrict"
      label="Distrito"
      dropdown-icon="las la-angle-down"
      v-model="productionForm.district"
    >
      <template v-slot:prepend>
        <q-icon name="las la-street-view" @click.stop />
      </template>
    </q-select>
    <q-input
      label="Superficie en hectareas"
      v-model="productionForm.area"
      type="number"
      step="any"
      class="q-mr-sm"
    />
    <q-input
      v-model="productionForm.latitude"
      label="Latitud"
      type="text"
      class="q-mr-sm"
    />
    <q-input
      v-model="productionForm.longitude"
      label="Longitud"
      type="text"
      class="q-mr-sm"
    />

    <div>
      <q-btn label="Aplicar" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { onMounted, ref } from "vue";

// composables
import useProducer from "../composables/useProducer";

// helpers
import districtList from "../../../helpers/districtList";

export default {
  name: "ProductionForm",
  emmit: ["onSubmitProduction"],
  props: {
    productionData: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const { producers } = useProducer();

    const productionForm = ref({
      producer: null,
      lote_number: "",
      entry: "",
      cadastral_registration: "",
      name: "",
      production_type: "",
      district: null,
      area: 0,
      latitude: 0,
      longitude: 0,
      picture: "",
    });

    // producers option for select
    let optionsProducer = producers.value.map((producer) => {
      return {
        label: `${producer.first_name} ${producer.last_name}`,
        value: producer.id,
      };
    });

    // districts option for select
    let optionsDistrict = districtList.map((district) => {
      return {
        label: district,
        value: district,
      };
    });

    const onSubmitProduction = (e) => {
      e.preventDefault();
      emit("submit-form-production", productionForm);
    };

    onMounted(() => {
      if (props.productionData) {
        productionForm.value.id = props.productionData.id;
        productionForm.value.producer = {
          label: `${props.productionData.producer.first_name} ${props.productionData.producer.last_name}`,
          value: props.productionData.producer.id,
        };
        productionForm.value.lote_number = props.productionData.lote_number;
        productionForm.value.entry = props.productionData.entry;
        productionForm.value.cadastral_registration =
          props.productionData.cadastral_registration;
        productionForm.value.name = props.productionData.name;
        productionForm.value.production_type =
          props.productionData.production_type;
        productionForm.value.district = {
          label: props.productionData?.district,
          value: props.productionData?.district,
        };
        productionForm.value.area = props.productionData.area;
        productionForm.value.latitude = props.productionData.latitude;
        productionForm.value.longitude = props.productionData.longitude;
        productionForm.value.picture = props.productionData.picture;
      }
    });

    return {
      productionForm,
      onSubmitProduction,
      optionsProducer,
      optionsDistrict,
    };
  },
};
</script>
