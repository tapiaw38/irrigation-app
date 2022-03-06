<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title>
        <span>Agregar Productor</span>
      </q-toolbar-title>
      <div class="q-gutter-md text-center">
        <q-input
          v-model="first_name"
          label="Nombre"
          type="text"
          class="q-mr-sm"
        />
        <q-input
          v-model="last_name"
          label="Apellido"
          type="text"
          class="q-mr-sm"
        />
        <q-input v-model="dni" label="DNI" type="text" class="q-mr-sm" />
        <q-input
          v-model="address"
          label="Dirección"
          type="text"
          class="q-mr-sm"
        />
        <q-input v-model="phone" label="Teléfono" type="text" class="q-mr-sm" />
        <q-input
          v-model="birth_date"
          label="Fecha de Nacimiento"
          type="text"
          class="q-mr-sm"
        />
        <q-btn
          class="full-width"
          color="primary"
          label="Agregar"
          @click="save"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProducerAdd",
  setup() {
    return {};
  },
});
</script>
