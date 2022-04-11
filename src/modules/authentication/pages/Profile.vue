<template>
  <q-page class="row justify-center q-mt-lg content-profile">
    <div class="col-6 q-mt-lg">
      <q-section>
        <q-card class="my-card">
          <div class="row content-card">
            <div class="q-pa-sm content-profile">
              <q-item-section avatar>
                <div class="flex">
                  <q-avatar size="100px" class="col-12">
                    <q-img
                      style="height: 120px; width: 120px"
                      :src="'https://cdn.quasar.dev/img/avatar2.jpg'"
                    />
                    <div class="edit-image">
                      <q-btn
                        round
                        color="primary"
                        flat
                        icon="las la-camera"
                        @click="$emit('edit-image')"
                      />
                    </div>
                  </q-avatar>
                </div>
                <div class="items-center justify-center text-center">
                  <q-item-label>Nombre del usuario</q-item-label>
                  <q-item-label caption>Administrador</q-item-label>
                </div>
              </q-item-section>
            </div>

            <div class="content-information">
              <q-section class="q-pt-sm">
                <q-item-label>
                  <q-icon name="las la-envelope" />
                  Correo
                </q-item-label>
                <q-item-label caption>usuario@example.com</q-item-label>
              </q-section>
              <q-section class="q-pt-sm">
                <q-item-label>
                  <q-icon name="las la-phone" />
                  Teléfono
                </q-item-label>
                <q-item-label caption>3837439999</q-item-label>
              </q-section>
              <q-section class="q-pt-sm">
                <q-item-label>
                  <q-icon name="las la-map-marker" />
                  Dirección
                </q-item-label>
                <q-item-label caption>Dirección del usuario</q-item-label>
              </q-section>
            </div>
          </div>
        </q-card>
      </q-section>
      <div>
        <q-btn
          @click="ToggleAlertEditProfile()"
          label="Editar"
          color="primary"
          class="btn-block"
        />
      </div>
    </div>
    <div class="col-3 q-ml-lg q-mt-sm profile-icon">
      <q-img src="../../../assets/img/undraw_profile_details.svg" />
    </div>
    <!--alert message-->
    <q-dialog v-model="ShowEditProfile">
      <q-card class="q-pa-lg">
        <q-card-section>
          <div class="text-h6">Editar datos</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled type="text" label="Nnombre" />
            <q-input filled type="text" label="Apellido" />
            <q-input filled type="number" label="Teléfono" />
            <q-input filled type="textarea" label="Dirección" />

            <div>
              <q-btn
                class="btn-block"
                label="Submit"
                type="submit"
                color="primary"
              />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Profile",
  setup() {
    let ShowEditProfile = ref(false);

    const ToggleAlertEditProfile = () => {
      ShowEditProfile.value = !ShowEditProfile.value;
    };

    return {
      ShowEditProfile,
      ToggleAlertEditProfile,
    };
  },
});
</script>

<style lang="scss" scoped>
.content-profile {
  .content-card {
    display: grid;
    grid-template-columns: 40% auto;
    grid-gap: 1rem;

    @media screen and (max-width: 700px) {
      grid-template-columns: auto;
      grid-auto-rows: auto auto;
    }
  }

  .content-profile {
    display: flex;
    padding: 5%;

    &:hover {
      .edit-image {
        display: block;
      }
    }

    .edit-image {
      display: none;
      position: absolute;
      transition: 0.3s ease-in-out;
      top: 0;
      right: 0;
    }

    img {
      margin-bottom: 10px;
    }

    @media screen and (max-width: 700px) {
      justify-content: center;
    }
  }
  .content-information {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    text-align: left;
    height: 100%;

    @media screen and (max-width: 700px) {
      flex-direction: col;
      align-items: left;
      padding: 5%;
    }
  }
  @media screen and (max-width: 700px) {
    .profile-icon {
      display: none;
    }
  }
}
</style>
