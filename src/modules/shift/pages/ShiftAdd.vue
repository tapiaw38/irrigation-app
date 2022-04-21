<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-ticket-alt"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Agregar Turno</span>
      </q-toolbar-title>
      <div class="q-gutter-md text-center">
        <q-select
          v-model="producer"
          :options="options"
          label="Productor"
          dropdown-icon="las la-angle-down"
        >
          <template v-slot:prepend>
            <q-icon name="las la-user" @click.stop />
          </template>
        </q-select>

        <q-select
          v-model="production"
          :options="options"
          label="Produccion"
          dropdown-icon="las la-angle-down"
        >
          <template v-slot:prepend>
            <q-icon name="las la-seedling" @click.stop />
          </template>
        </q-select>

        <q-input
          v-model="dni"
          label="Superficie"
          type="number"
          class="q-mr-sm"
        />
        <q-input
          v-model="address"
          label="Horas"
          type="number"
          class="q-mr-sm"
        />
        <q-input v-model="phone" label="Partida" type="text" class="q-mr-sm" />
        <q-input
          v-model="birth_date"
          label="Fecha de Nacimiento"
          type="text"
          class="q-mr-sm"
        />
        <q-input
          v-model="birth_date"
          label="Orden"
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
  name: "ShiftAdd",
  setup() {
    let options = [
      "Juan Perez",
      "Pedro Perez",
      "Juan Perez",
      "Pedro Perez",
      "Juan Perez",
    ];
    return {
      options,
    };
  },
});
</script>
