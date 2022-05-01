<template>
  <q-page class="row justify-center q-mt-lg content-profile">
    <div class="col-6 q-mt-lg">
      <div>
        <q-card class="my-card">
          <div class="row content-card">
            <div
              class="row q-pa-sm content-profile items-center justify-center text-center"
            >
              <div>
                <div class="row justify-center text-center">
                  <q-avatar class="avatar">
                    <q-img :src="'https://cdn.quasar.dev/img/avatar2.jpg'" />
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
                <div
                  class="items-center justify-center text-center row q-mt-sm"
                >
                  <q-item-label class="full-width"
                    >{{ user.first_name }} {{ user.last_name }}</q-item-label
                  >
                  <q-item-label class="full-width" caption
                    >Administrador</q-item-label
                  >
                </div>
              </div>
            </div>

            <div class="content-information">
              <div class="q-pt-sm">
                <q-item-label>
                  <q-icon name="las la-envelope" />
                  Correo
                </q-item-label>
                <q-item-label caption>{{ user.email }}</q-item-label>
              </div>
              <div class="q-pt-sm">
                <q-item-label>
                  <q-icon name="las la-phone" />
                  Teléfono
                </q-item-label>
                <q-item-label caption>{{
                  user.phone_number ? user.phone_number : "Sin Telefono"
                }}</q-item-label>
              </div>
              <div class="q-pt-sm">
                <q-item-label>
                  <q-icon name="las la-map-marker" />
                  Dirección
                </q-item-label>
                <q-item-label caption>{{
                  user.address ? user.address : "Sin Direccion"
                }}</q-item-label>
              </div>
            </div>
          </div>
        </q-card>
      </div>
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
            <q-input
              filled
              type="text"
              label="Email"
              v-model="userForm.email"
            />
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

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

// composables
import useAuth from "../../authentication/composables/useAuth";
import useUser from "../composables/useUser";

export default defineComponent({
  name: "Profile",
  setup() {
    const { user } = useAuth();
    const { editUser } = useUser();

    let userForm = ref({
      id: user.value.id,
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      email: user.value.email,
      phone_number: user.value.phone_number,
      address: user.value.address,
      is_active: user.value.is_active,
      is_admin: user.value.is_admin,
    });

    let ShowEditProfile = ref(false);

    const ToggleAlertEditProfile = () => {
      ShowEditProfile.value = !ShowEditProfile.value;
    };

    const onUpdatedUser = () => {
      editUser(userForm.value);
      ShowEditProfile.value = false;
    };

    return {
      ShowEditProfile,
      ToggleAlertEditProfile,
      user,
      userForm,
      onUpdatedUser,
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

    .avatar {
      height: 120px;
      width: 120px;
    }

    .edit-image {
      display: none;
      position: absolute;
      transition: 0.3s ease-in-out;
      top: 0;
      right: 0;
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
