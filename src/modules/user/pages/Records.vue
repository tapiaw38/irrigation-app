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
          <td class="text-left">Nombre de usuario</td>
          <td class="text-left">123</td>
          <td class="text-left">Productor</td>
          <td class="text-left">2</td>
          <td class="text-left">
            <q-btn
              round
              color="secondary"
              icon="las la-cloud-upload-alt"
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
  name: "Records",
  setup() {
    const producerItems = ["Usuario", "Registro", "Tipo", "Cantidad", ""];

    return {
      producerItems,
    };
  },
});
</script>
