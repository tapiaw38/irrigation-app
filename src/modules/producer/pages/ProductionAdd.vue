<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-seedling"
          color="accent"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Agregar Producción</span>
      </q-toolbar-title>
      <div class="q-gutter-md text-center">
        <q-input
          v-model="production"
          label="Producción"
          type="text"
          class="q-mr-sm"
        />
        <q-input
          v-model="production_name"
          label="Nombre de Producción"
          type="text"
          class="q-mr-sm"
        />
        <q-input
          v-model="production_type"
          label="Tipo de Producción"
          type="text"
          class="q-mr-sm"
        />
        <q-input
          v-model="production_lng"
          label="Longitud"
          type="number"
          class="q-mr-sm"
        />
        <q-input
          v-model="production_lat"
          label="Latitud"
          type="number"
          class="q-mr-sm"
        />
        <q-file
          color="teal"
          outlined
          v-model="production_img"
          label="Agregar imagen"
        >
          <template v-slot:append>
            <q-avatar>
              <q-icon name="las la-image" />
            </q-avatar>
          </template>
        </q-file>
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
  name: "ProductionAdd",
  setup() {
    return {};
  },
});
</script>
