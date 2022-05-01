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
        color="white"
        icon="las la-user-plus"
        text-color="primary"
        @click="toggleAlertCreateProfile()"
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
        <template v-for="(user, i) in users" :key="i">
          <tr
            v-if="!user.is_admin"
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
            <td class="text-left">
              {{ user.is_admin ? "Administrador" : "Encuestador" }}
            </td>
            <td class="text-left">
              {{ user.is_active ? "Activo" : "Bloqueado" }}
            </td>
            <td class="text-left">
              {{ formatDate(user.updated_at) }}
            </td>
            <td class="text-left">
              <q-btn
                round
                :color="user.is_active ? 'negative' : 'positive'"
                text-color="white"
                :icon="
                  user.is_active ? 'las la-times-circle' : 'las la-check-circle'
                "
                class="q-mr-sm"
                @click="onChangeState(user)"
              />
              <q-btn
                round
                color="white"
                text-color="primary"
                icon="las la-edit"
                class="q-mr-sm"
                @click="toggleAlertEditProfile(user)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </q-markup-table>
  </div>

  <!-- create user -->
  <q-dialog v-model="ShowCreateProfile">
    <q-card class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">Crear usuario</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="onCreateUser()" class="q-gutter-md">
          <q-input
            filled
            type="text"
            label="Nombre"
            v-model="createForm.first_name"
            :rules="[(val) => !!val || 'Este campo es  requerido']"
          />
          <q-input
            filled
            type="text"
            label="Apellido"
            v-model="createForm.last_name"
          />
          <q-input
            filled
            type="text"
            label="username"
            v-model="createForm.username"
            :rules="[(val) => !!val || 'Este campo es  requerido']"
          />

          <q-input
            filled
            type="text"
            label="Email"
            v-model="createForm.email"
            :rules="[
              (val) =>
                (val.includes('@') && val.includes('.')) ||
                'Ingrese un email valido',
            ]"
          />
          <q-input
            filled
            type="number"
            label="Teléfono"
            v-model="createForm.phone_number"
            :rules="[
              (val) =>
                val.length <= 10 ||
                'Ingrese un número valido sin espacios, 0 al inicio y sin el 15',
            ]"
          />
          <q-input
            filled
            type="password"
            label="Cotraseña"
            v-model="createForm.password"
            :rules="[(val) => !!val || 'Este campo es  requerido']"
          />
          <q-input
            filled
            type="password"
            label="Confirmar contraseña"
            v-model="createForm.passwordValidate"
            :rules="[
              (val) =>
                val.includes(createForm.password) ||
                'Las contraseñas no coinciden',
            ]"
          />
          <div>
            <q-btn
              class="btn-block"
              label="Submit"
              color="primary"
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- update user -->
  <q-dialog v-model="ShowEditProfile">
    <q-card class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">Editar datos</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="onUpdatedUser()" class="q-gutter-md">
          <q-input
            filled
            type="text"
            label="Nombre"
            v-model="userForm.first_name"
          />
          <q-input
            filled
            type="text"
            label="Apellido"
            v-model="userForm.last_name"
          />
          <q-input filled type="text" label="Email" v-model="userForm.email" />
          <q-input
            filled
            type="number"
            label="Teléfono"
            v-model="userForm.phone_number"
          />
          <q-input
            filled
            type="textarea"
            label="Dirección"
            v-model="userForm.address"
          />
          <div>
            <q-btn
              class="btn-block"
              label="Submit"
              color="primary"
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- alert message -->
  <alert
    :dialog="isAlertOpen"
    :headerMessage="headerMessage"
    :message="alertMessage"
    @close="closeAlert()"
  />
</template>

<script>
import { defineComponent, ref } from "vue";

// composables
import useUser from "../composables/useUser";

// helpers
import { formatDate } from "../../../helpers/formatDate";

// components
import Alert from "../../../components/Alert.vue";

export default defineComponent({
  name: "Users",
  components: { Alert },
  setup() {
    const { users, deleteUser, editUser, createUser } = useUser();

    const ShowEditProfile = ref(false);
    const ShowCreateProfile = ref(false);

    const producerItems = [
      "",
      "Nombre",
      "Apellido",
      "Email",
      "Teléfono",
      "Tipo de usuario",
      "Estado",
      "Ultima modificación",
      "",
    ];

    const userForm = ref({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
    });

    const createForm = ref({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      passwordValidate: "",
    });

    let headerMessage = ref("");
    let alertMessage = ref("");
    let isAlertOpen = ref(false);

    const onChangeState = (user) => {
      deleteUser(user);
    };

    const onUpdatedUser = async () => {
      const { ok, message } = await editUser(userForm.value);
      if (!ok) {
        headerMessage.value = "Error";
        alertMessage.value = message;
        isAlertOpen.value = true;
        return;
      }
      ShowEditProfile.value = false;
    };

    const onCreateUser = async () => {
      if (createForm.value.password !== createForm.value.passwordValidate) {
        headerMessage.value = "Error";
        alertMessage.value = "Las contraseñas no coinciden";
        isAlertOpen.value = true;
        return;
      }

      if (createForm.value.password.length < 6) {
        headerMessage.value = "Error";
        alertMessage.value = "La contraseña debe tener al menos 6 caracteres";
        isAlertOpen.value = true;
        return;
      }

      const { ok, message } = await createUser(createForm.value);
      if (!ok) {
        headerMessage.value = "Error";
        alertMessage.value = message;
        isAlertOpen.value = true;
        return;
      }
      ShowCreateProfile.value = false;
    };

    const toggleAlertEditProfile = (u) => {
      userForm.value = {
        id: u.id,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        phone_number: u.phone_number,
        address: u.address,
      };
      ShowEditProfile.value = !ShowEditProfile.value;
    };

    const toggleAlertCreateProfile = () => {
      createForm.value = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        passwordValidate: "",
      };
      ShowCreateProfile.value = !ShowCreateProfile.value;
    };

    return {
      producerItems,
      users,
      formatDate,
      onChangeState,
      userForm,
      ShowEditProfile,
      toggleAlertEditProfile,
      onUpdatedUser,
      headerMessage,
      alertMessage,
      isAlertOpen,
      createForm,
      ShowCreateProfile,
      toggleAlertCreateProfile,
      onCreateUser,
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
