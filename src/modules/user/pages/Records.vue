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
        <tr v-if="producersStorage.length > 0">
          <td class="text-left">Guardado en dispositivo</td>
          <td class="text-left">Productores</td>
          <td class="text-left">{{ producersStorage.length }}</td>
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

// composables
import useProducer from "../../producer/composables/useProducer";

export default defineComponent({
  name: "Records",
  setup() {
    const { producersStorage } = useProducer();
    const producerItems = ["Estado", "Registro", "Cantidad", ""];

    return {
      producerItems,
      producersStorage,
    };
  },
});
</script>
