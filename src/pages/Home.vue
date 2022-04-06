<template>
  <q-page class="container">
    <div class="container-header">
      <div class="container-description">
        <q-img src="../assets/img/sun.png" />
        <h6>Buenos dias! Nombre Usuario</h6>
        <div class="alerts">
          <q-banner inline-actions rounded class="bg-primary text-white">
            Tu dispositivo tiene una conexion estable a internet.
            <template v-slot:action>
              <q-btn flat label="Conectar" />
              <q-btn flat label="Outline" />
            </template>
          </q-banner>
        </div>
      </div>
      <div class="container-image">
        <q-img src="../assets/img/undraw_group_hangout.svg" />
      </div>
    </div>
    <div class="container-panel">
      <template v-for="link in essentialLinks" :key="link.title">
        <div
          class="card"
          v-if="link.is_home"
          @click="$router.push({ name: link.link })"
        >
          <div class="card-body">
            <i :class="link.icon"></i>
            <p>{{ link.title }}</p>
          </div>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import linksList from "../helpers/linksList";

export default defineComponent({
  name: "Home",
  setup() {
    return {
      essentialLinks: linksList,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2rem;
  display: flex;
}

.container-header {
  display: grid;
  width: 100vw;
  max-width: 700px;
  grid-template-columns: auto 40%;
  grid-template-rows: auto;
  grid-gap: 1rem;
  height: 250px;

  @media screen and (max-width: 700px) {
    grid-template-columns: auto;
    grid-auto-rows: auto auto;
  }

  .container-description {
    width: 100%;
    padding: 5%;
    display: grid;
    grid-template-columns: 10% auto;
    grid-template-rows: 20% auto;
    grid-gap: 1rem;

    .alerts {
      padding-top: 15px;
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
      align-content: center;
      justify-content: center;
      text-align: center;
    }

    h6 {
      text-align: left;
      margin: 0;
    }

    img {
      width: 30px;
      height: 30px;
    }
  }
  .container-image {
    width: 100%;
    padding: 5%;
    display: flex;
    flex-direction: row;
    align-content: flex-end;
    img {
      width: 80%;
    }

    @media screen and (max-width: 700px) {
      display: none;
    }
  }
}

.container-panel {
  background-image: url("../assets/img/blur.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 5%;
  display: grid;
  width: 100vw;
  height: 60vh;
  max-width: 700px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    height: 100%;
  }
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 150px;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  z-index: 2;
  cursor: pointer;

  &:hover {
    background-color: $primary;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    transition: 0.3s ease-in-out;
  }

  &:hover .card-body > i,
  p {
    color: white;
  }

  &:hover .card-body > p {
    color: white;
  }

  .card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    i,
    p {
      color: $primary;
    }

    i {
      font-size: 3rem;
    }
    p {
      margin-top: 0.2rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
}
</style>
