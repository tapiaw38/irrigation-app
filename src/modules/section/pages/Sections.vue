<template>
  <div class="q-pa-md">
    <div class="q-pb-sm q-gutter-sm">
      <q-btn
        round
        color="primary"
        icon="las la-object-ungroup"
        @click="$router.push({ name: 'section_add' })"
      />
    </div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <template v-for="section in sectionItems" :key="section">
            <th class="text-left">{{ section }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(section, i) in sections" :key="i">
          <tr>
            <td class="text-left">{{ section.section_number }}</td>
            <td class="text-left">{{ section.name }}</td>
            <td class="text-left">{{ formatDate(section.updated_at) }}</td>
            <td class="text-left">
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
        </template>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// helpers
import { formatDate } from "../../../helpers/formatDate";

// composables
import useSection from "../composables/useSection";

export default defineComponent({
  name: "Producers",
  components: {},
  setup() {
    const { sections } = useSection();
    const sectionItems = [
      "Numero de Sección",
      "Descripción",
      "Fecha de modificación",
      "",
      "Tomas",
      "",
    ];

    return {
      sectionItems,
      formatDate,
      sections,
    };
  },
});
</script>
