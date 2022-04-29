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
        <tr
          v-for="(user, i) in users"
          :key="i"
          :class="[user.is_active ? 'active' : 'deactivated']"
        >
          <td class="text-left">
            <q-item-section avatar>
              <q-avatar>
                <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
          </td>
          <td class="text-left">{{ user.first_name }}</td>
          <td class="text-left">{{ user.last_name }}</td>
          <td class="text-left">{{ user.email }}</td>
          <td class="text-left">
            {{ user.phone_number ? user.phone_number : "Sin telefono" }}
          </td>
          <td class="text-left">Encuestador</td>
          <td class="text-left">
            {{ user.is_active ? "Activo" : "Inactivo" }}
          </td>
          <td class="text-left">
            <q-btn
              v-if="!user.is_active"
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

// composables
import useUser from "../composables/useUser";

export default defineComponent({
  name: "Users",
  setup() {
    const { users } = useUser();

    const producerItems = [
      "",
      "Nombre",
      "Apellido",
      "Email",
      "Teléfono",
      "Tipo de usuario",
      "Estado",
      "",
    ];

    return {
      producerItems,
      users,
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
