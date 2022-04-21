<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 700px">
      <q-toolbar-title class="flex-column items-center content-center">
        <q-icon
          name="las la-seedling"
          color="primary"
          size="2.2em"
          class="q-pa-md"
        />
        <span>Agregar Producción</span>
      </q-toolbar-title>
      <div class="q-gutter-md text-center">
        <q-select
          v-model="producer"
          :options="options"
          label="Productor"
          dropdown-icon="las la-angle-down"
        >
          <template v-slot:prepend>
            <q-icon name="las la-user" @click.stop />
          </template>
        </q-select>
        <q-input
          v-model="production_name"
          label="Nombre de Producción"
          type="text"
          class="q-mr-sm"
        />
        <q-input
          v-model="production_type"
          label="Tipo de Producción"
          type="text"
          class="q-mr-sm"
        />
        <q-input
          v-model="production_lng"
          label="Longitud"
          type="number"
          class="q-mr-sm"
        />
        <q-input
          v-model="production_lat"
          label="Latitud"
          type="number"
          class="q-mr-sm"
        />
        GPS position:
        <strong v-if="position.coords">
          {{ position.coords.latitude }}
          , {{ position.coords.longitude }}
        </strong>
        <strong>{{ positionLoader }}</strong>
        <q-file
          color="teal"
          outlined
          v-model="production_img"
          label="Agregar imagen"
        >
          <template v-slot:append>
            <q-avatar>
              <q-icon name="las la-image" />
            </q-avatar>
          </template>
        </q-file>
        <q-btn
          class="full-width"
          color="primary"
          label="Agregar"
          @click="save"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { Geolocation } from "@capacitor/geolocation";

export default defineComponent({
  name: "ProductionAdd",
  setup() {
    let options = [
      "Juan Perez",
      "Pedro Perez",
      "Juan Perez",
      "Pedro Perez",
      "Juan Perez",
    ];

    const position = ref("");
    let positionLoader = ref("determinando...");

    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition().then((newPosition) => {
        position.value = newPosition;
        console.log(newPosition);
      });
    };

    let geoId;

    onMounted(() => {
      getCurrentPosition();

      // we start listening
      geoId = Geolocation.watchPosition({}, (newPosition, err) => {
        console.log("New GPS position");
        position.value = newPosition;
        positionLoader.value = "Posición actualizada";
      });
    });

    onBeforeUnmount(() => {
      // we do cleanup
      Geolocation.clearWatch(geoId);
    });

    return {
      options,
      position,
      positionLoader,
    };
  },
});
</script>
