<template>
  <q-page class="container">
    <div class="container-login">
      <h4 class="text-center">Iniciar sesion</h4>
      <q-input
        v-model="userForm.email"
        label="Email"
        type="email"
        placeholder="Ingresa tu email"
      />
      <q-input
        v-model="userForm.password"
        label="Password"
        type="password"
        placeholder="Ingresa tu password"
      />
      <q-btn @click="login" label="Login" color="primary" class="btn-block" />
    </div>
    <alert
      :dialog="isAlertOpen"
      :headerMessage="headerMessage"
      :message="alertMessage"
      @close="closeAlert()"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

// composables
import useAuth from "../modules/authentication/composables/useAuth";

// components
import Alert from "../components/Alert.vue";

export default defineComponent({
  name: "Login",
  components: {
    Alert,
  },
  setup() {
    const router = useRouter();
    const { handleLogin } = useAuth();
    const userForm = ref({
      email: "",
      password: "",
    });

    // alert message
    let headerMessage = ref("");
    let alertMessage = ref("");
    let isAlertOpen = ref(false);

    const closeAlert = () => {
      isAlertOpen.value = false;
    };

    const login = async () => {
      const { ok, message } = await handleLogin(userForm.value);
      if (!ok) {
        headerMessage.value = "Error";
        alertMessage.value = message;
        isAlertOpen.value = true;
        return;
      }
      router.push({ name: "home" });
    };
    return {
      userForm,
      login,
      alertMessage,
      isAlertOpen,
      closeAlert,
      headerMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
.container-login {
  width: 100%;
  max-width: 400px;

  @media screen and (max-width: 500px) {
    padding: 5%;
  }
}
</style>
