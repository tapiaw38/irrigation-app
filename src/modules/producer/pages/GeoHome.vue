<template>
  <q-page class="container">
    <div class="container-header">
      <div class="flex items-center content-center justify-center q-ma-sm">
        <q-card
          class="location-card q-pa-sm q-ma-sm"
          v-for="location in locations"
          :key="location"
          @click="$router.push({ name: location.link })"
        >
          <q-card-section>
            <div class="text-center items-center">
              <q-icon color="primary" size="4em" :name="location.icon" />
              <div class="text-subtitle2">{{ location.name }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="container-image q-ma-sm">
        <q-img src="../../../assets/img/undraw_map.svg" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    let locations = [
      {
        name: "Produciones",
        link: "geo-production",
        icon: "las la-seedling",
      },
      {
        name: "Tomas de agua",
        link: "geo-water",
        icon: "las la-water",
      },
    ];
    return {
      locations,
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
