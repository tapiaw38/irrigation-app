<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="white"
        icon="las la-arrow-alt-circle-left"
        text-color="primary"
        @click="$router.push({ name: 'home' })"
      />
      <q-btn
        round
        color="primary"
        icon="las la-seedling"
        @click="$router.push({ name: 'production_add' })"
      />
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <template v-for="production in productionItems" :key="production">
            <th class="text-left">{{ production }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_, i) in 5" :key="i">
          <td class="text-left">Nombre productor</td>
          <td class="text-left">159</td>
          <td class="text-left">Tinogasta</td>
          <td class="text-left">24</td>
          <td class="text-left">44523423423</td>
          <td class="text-left">Vegetal</td>
          <td class="text-left">Nombre</td>
          <td class="text-left">Tipo</td>
          <td class="text-left">
            <q-btn
              round
              text-color="secondary"
              icon="las la-file"
              class="q-mr-sm"
              @click="
                $router.push({ name: 'production_detail', params: { id: 1 } })
              "
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
  name: "Producers",
  setup() {
    const productionItems = [
      "Productor",
      "Distrito",
      "Partida",
      "N de lote",
      "M. Catastral",
      "Producción",
      "Nombre",
      "Tipo",
      "",
    ];

    return {
      productionItems,
    };
  },
});
</script>
