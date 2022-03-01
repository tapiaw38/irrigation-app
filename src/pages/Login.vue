<template>
  <q-page class="container">
    <div class="container-login">
      <h4>Iniciar sesion</h4>
      <q-input
        v-model="email"
        label="Email"
        type="email"
        placeholder="Ingresa tu email"
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
        placeholder="Ingresa tu password"
      />
      <q-btn
        @click="login"
        label="Login"
        color="primary"
        :loading="loading"
        class="btn-block"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
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
