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
        icon="las la-users"
        @click="$router.push({ name: 'producer_add' })"
      />
    </div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <template v-for="producer in producerItems" :key="producer">
            <th class="text-left">{{ producer }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producer, i) in producers" :key="i">
          <td class="text-left">{{ producer.first_name }}</td>
          <td class="text-left">{{ producer.last_name }}</td>
          <td class="text-left">{{ producer.document_number }}</td>
          <td class="text-left">{{ producer.address }}</td>
          <td class="text-left">{{ producer.phone_number }}</td>
          <td class="text-left">{{ formatDate(producer.birth_date) }}</td>
          <td class="text-left">
            <q-btn
              round
              text-color="secondary"
              icon="las la-file"
              class="q-mr-sm"
              @click="
                $router.push({ name: 'producer_detail', params: { id: 1 } })
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

// composables
import useProducer from "../composables/useProducer";

// helpers
import { formatDate } from "../../../helpers/formatDate";

export default defineComponent({
  name: "Producers",
  setup() {
    const { producers } = useProducer();

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
      producers,
      formatDate,
    };
  },
});
</script>
