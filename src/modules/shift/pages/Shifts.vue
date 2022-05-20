<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="primary"
        icon="las la-ticket-alt"
        @click="$router.push({ name: 'shift_add' })"
      />
    </div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <template v-for="shift in shiftsItems" :key="shift">
            <th class="text-left">{{ shift }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_, i) in 5" :key="i">
          <td class="text-left">Nombre de productor</td>
          <td class="text-left">Produccion</td>
          <td class="text-left">Tipo</td>
          <td class="text-left">2</td>
          <td class="text-left">12334</td>
          <td class="text-left">1</td>
          <td class="text-left">
            <q-btn
              round
              text-color="secondary"
              icon="las la-file"
              class="q-mr-sm"
            />
            <q-btn
              round
              text-color="secondary"
              icon="las la-edit"
              class="q-mr-sm"
            />
            <q-btn
              round
              text-color="negative"
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
  name: "Shifts",
  setup() {
    const shiftsItems = [
      "Productor",
      "Produccion",
      "Superficie",
      "Horas",
      "Partida",
      "orden",
      "",
    ];

    return {
      shiftsItems,
    };
  },
});
</script>
