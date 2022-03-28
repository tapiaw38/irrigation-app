<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        color="primary"
        icon="las la-users"
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
          <td class="text-left">Nombre de productor</td>
          <td class="text-left">Apellido</td>
          <td class="text-left">36132663</td>
          <td class="text-left">Dirección</td>
          <td class="text-left">3837435567</td>
          <td class="text-left">01/01/1982</td>
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
