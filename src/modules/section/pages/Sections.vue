<template>
  <q-page class="container">
    <div class="text-subtitle2 text-warning">
      Este modulo estara activo el 26/05
    </div>
    <div class="container-header">
      <div class="flex items-center content-center justify-center q-ma-sm">
        <q-card
          class="location-card q-pa-sm q-ma-sm"
          v-for="item in items"
          :key="item"
          @click="$router.push({ name: item.link })"
        >
          <q-card-section>
            <div class="text-center items-center">
              <q-icon color="primary" size="4em" :name="item.icon" />
              <div class="text-subtitle2">{{ item.name }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="container-image q-ma-sm">
        <q-img src="../../../assets/img/undraw_visualization.svg" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    let items = [
      {
        name: "Secciones",
        link: "",
        icon: "las la-object-ungroup",
      },
      {
        name: "Tomas de agua",
        link: "",
        icon: "las la-water",
      },
    ];
    return {
      items,
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
}

.location-card {
  max-width: 250px;
  min-width: 150px;
  cursor: pointer;

  &:hover {
    background-color: $white;
  }
}
</style>
