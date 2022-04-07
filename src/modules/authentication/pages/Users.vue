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
        <tr v-for="(_, i) in 5" :key="i" :class="rowColor">
          <td class="text-left">Nombre</td>
          <td class="text-left">Apellido</td>
          <td class="text-left">email@example.com</td>
          <td class="text-left">Dirección del usuario</td>
          <td class="text-left">3837435567</td>
          <td class="text-left">Encuestador</td>
          <td class="text-left">
            <q-btn
              v-if="!isActive"
              round
              color="positive"
              text-color="white"
              icon="las la-check-circle"
              class="q-mr-sm"
            />
            <q-btn
              v-else
              round
              color="negative"
              text-color="white"
              icon="las la-times-circle"
              class="q-mr-sm"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  name: "Users",
  setup() {
    let isActive = ref(false);

    const rowColor = computed(() => {
      return isActive.value ? "active" : "deactivated";
    });

    const producerItems = [
      "Nombre",
      "Apellido",
      "Email",
      "Dirección",
      "Teléfono",
      "Tipo de usuario",
      "",
    ];

    return {
      producerItems,
      rowColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.active {
  background-color: $white;
}

.deactivated {
  background-color: $negative;
}
</style>
