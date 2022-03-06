<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        color="primary"
        icon="las la-user-plus"
        @click="$router.push({ name: 'producer_add' })"
      />
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <template v-for="producer in producerItems" :key="producer">
            <th class="text-left">{{ producer }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_, i) in 5" :key="i">
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-left">159</td>
          <td class="text-left">6</td>
          <td class="text-left">24</td>
          <td class="text-left">4</td>
          <td class="text-left">87</td>
          <td class="text-left">
            <q-btn round color="secondary" icon="las la-file" class="q-mr-sm" />
            <q-btn round color="secondary" icon="las la-edit" class="q-mr-sm" />
            <q-btn
              round
              color="negative"
              icon="las la-trash-alt"
              class="q-mr-sm"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Producers",
  setup() {
    const producerItems = [
      "Nombre",
      "Apellido",
      "DNI",
      "Dirección",
      "Teléfono",
      "Fecha de Nacimiento",
      "",
    ];

    return {
      producerItems,
    };
  },
});
</script>
