<template>
  <q-page class="container">
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

.container-panel {
  padding: 5%;
  display: grid;
  width: 100vw;
  max-width: 700px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
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
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  cursor: pointer;

  .card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    i {
      font-size: 3rem;
      color: $primary;
    }
    p {
      margin-top: 0.2rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: $primary;
    }
  }
}
</style>
