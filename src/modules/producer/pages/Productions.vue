<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="primary"
        icon="las la-seedling"
        @click="$router.push({ name: 'production_add' })"
      />
    </div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <template v-for="production in productionItems" :key="production">
            <th class="text-left">{{ production }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(production, i) in productions" :key="i">
          <td class="text-left">
            {{ production.producer.first_name }}
            {{ production.producer.last_name }}
          </td>
          <td class="text-left">{{ production.lote_number }}</td>
          <td class="text-left">{{ production.entry }}</td>
          <td class="text-left">{{ production.cadastral_registration }}</td>
          <td class="text-left">{{ production.name }}</td>
          <td class="text-left">{{ production.production_type }}</td>
          <td class="text-left">{{ production.district }}</td>
          <td class="text-left">{{ production.area }}</td>
          <td class="text-left">
            <q-btn
              round
              text-color="secondary"
              icon="las la-file"
              class="q-mr-sm"
              @click="
                $router.push({
                  name: 'production_detail',
                  params: { id: production.id },
                })
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
    const { productions } = useProducer();

    const productionItems = [
      "Productor",
      "Numerp de lote",
      "Partida",
      "Matricula catastral",
      "Producción",
      "Tipo de producción",
      "Distrito",
      "Hectareas",
      "",
    ];

    return {
      productionItems,
      formatDate,
      productions,
    };
  },
});
</script>
