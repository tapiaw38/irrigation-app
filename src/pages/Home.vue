<template>
  <q-page class="container">
    <div class="container-header">
      <div class="container-description">
        <div class="container-img">
          <q-img v-if="hours <= 20 && hours > 6" src="../assets/img/sun.png" />
          <q-img v-else src="../assets/img/moon.png" />
        </div>
        <h6 v-if="hours <= 20 && hours > 6">
          Buenos dias! {{ user.first_name }}
        </h6>
        <h6 v-else>Buenas noches! {{ user.first_name }}</h6>
        <div class="alerts">
          <q-banner inline-actions rounded class="bg-primary text-white">
            Importar datos de la nube para trabajar offline.
            <template v-slot:action>
              <q-btn
                round
                text-color="primary"
                color="white"
                icon="las la-cloud-download-alt"
                class="q-mr-sm"
                @click="onImportData()"
              />
            </template>
          </q-banner>

          <q-banner
            inline-actions
            rounded
            class="text-white q-mt-sm"
            :class="isDataUpdated ? 'bg-info' : 'bg-warning'"
          >
            La base de datos del dispositivo
            {{ isDataUpdated ? "actualizada" : "no actualizada" }}.
            <template v-slot:action>
              <q-icon
                color="white"
                size="lg"
                :name="
                  !isDataUpdated
                    ? 'las la-exclamation-circle'
                    : 'las la-grin-beam'
                "
              />
            </template>
          </q-banner>

          <q-banner
            v-if="false"
            inline-actions
            rounded
            class="text-white q-mt-sm"
            :class="workType ? 'bg-primary' : 'bg-warning'"
          >
            {{
              workType
                ? "Trabajando con datos de la nube"
                : "Trabajando con datos locales"
            }}
            <template v-slot:action>
              <q-btn
                round
                :text-color="workType ? 'primary' : 'warning'"
                color="white"
                icon="las la-wifi"
                class="q-mr-sm"
                @click="workType = true"
              />
              <q-btn
                round
                :text-color="workType ? 'primary' : 'warning'"
                color="white"
                icon="las la-sd-card"
                class="q-mr-sm"
                @click="workType = false"
              />
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
    <!-- Alert -->
    <alert
      :dialog="isAlertOpen"
      :headerMessage="headerMessage"
      :message="alertMessage"
      :icon="icon"
      :iconColor="iconColor"
      @close="closeAlert()"
    ></alert>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

// composables
import useAuth from "../modules/authentication/composables/useAuth";
import useProducer from "../modules/producer/composables/useProducer";
import useSection from "../modules/section/composables/useSection";

// helpers
import linksList from "../helpers/linksList";

// components
import Alert from "../components/Alert";

export default defineComponent({
  name: "Home",
  components: {
    Alert,
  },
  setup() {
    const { user } = useAuth();
    const { downloadProducers, allProducerStorage, producers } = useProducer();
    const { downloadSections, allSectionStorage, sections } = useSection();

    const store = useStore();
    // alert
    let headerMessage = ref("");
    let alertMessage = ref("");
    let isAlertOpen = ref(false);
    let icon = ref(null);
    let iconColor = ref(null);

    const closeAlert = () => {
      isAlertOpen.value = false;
    };
    // end alert

    // workType
    let workType = ref(true);

    const onChangeWorkState = () => {
      workType.value = !workType.value;
    };

    const onImportData = async () => {
      const resProducer = await downloadProducers();
      const resSection = await downloadSections();
      updateData();

      if (resProducer.ok && resSection.ok) {
        isAlertOpen.value = true;
        headerMessage.value = "Importando datos";
        alertMessage.value = "Se esta importando los datos correctamente";
        icon.value = "las la-check-circle";
        iconColor.value = "info";
        return;
      }
      isAlertOpen.value = true;
      headerMessage.value = "Error al importar datos";
      alertMessage.value = "No se pudieron importar los datos";
      icon.value = "las la-times-circle";
      iconColor.value = "danger";
    };

    // check if the data is updated
    let isDataUpdated = ref(false);

    const onCheckDataUpdated = async () => {
      if (producers.value.length !== allProducerStorage.value.length) {
        isDataUpdated.value = false;
        return;
      }
      if (sections.value.length !== allSectionStorage.value.length) {
        isDataUpdated.value = false;
        return;
      }

      isDataUpdated.value = true;
    };

    const updateData = async () => {
      await store.dispatch("producer/loadProducers");
      await store.dispatch("section/loadSections");
      await onCheckDataUpdated();
    };

    onMounted(async () => {
      updateData();
    });

    return {
      essentialLinks: linksList,
      user,
      hours: computed(() => new Date().getHours()),
      isAlertOpen,
      headerMessage,
      alertMessage,
      closeAlert,
      icon,
      iconColor,
      onImportData,
      workType,
      onChangeWorkState,
      isDataUpdated,
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

    .container-img {
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
      font-size: 0.9rem;
      font-weight: 600;
    }
  }
}
</style>
