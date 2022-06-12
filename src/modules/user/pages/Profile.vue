<template>
  <q-page class="row justify-center q-mt-lg content-profile">
    <div class="card col-6 q-mt-lg">
      <div>
        <q-card class="my-card">
          <div class="row content-card">
            <div
              class="row q-pa-sm content-profile items-center justify-center text-center"
            >
              <div>
                <div class="row justify-center text-center">
                  <q-avatar class="avatar">
                    <q-img v-if="user.picture" :src="user?.picture" />
                    <q-img v-else src="../../../assets/img/user.png" />
                    <div class="edit-image">
                      <q-btn
                        round
                        color="primary"
                        flat
                        icon="las la-camera"
                        @click="openAlert"
                      />
                    </div>
                  </q-avatar>
                </div>
                <div
                  class="items-center justify-center text-center row q-mt-sm"
                >
                  <q-item-label class="full-width"
                    >{{ user?.first_name }} {{ user?.last_name }}</q-item-label
                  >
                  <q-item-label class="full-width" caption>
                    {{
                      user?.is_admin ? "Administrador" : "Operativo"
                    }}</q-item-label
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
                <q-item-label caption>{{ user?.email }}</q-item-label>
              </div>
              <div class="q-pt-sm">
                <q-item-label>
                  <q-icon name="las la-phone" />
                  Teléfono
                </q-item-label>
                <q-item-label caption>{{
                  user?.phone_number ? user?.phone_number : "Sin Telefono"
                }}</q-item-label>
              </div>
              <div class="q-pt-sm">
                <q-item-label>
                  <q-icon name="las la-map-marker" />
                  Dirección
                </q-item-label>
                <q-item-label caption>{{
                  user?.address ? user?.address : "Sin Direccion"
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
    <!-- change avatar-->
    <alert
      :dialog="isAlertOpen"
      :headerMessage="headerMessage"
      :message="alertMessage"
      :showIcon="false"
      @close="closeAlert()"
    >
      <template v-slot:body>
        <div class="flex justify-center q-mb-sm" style="width: 300px">
          <q-avatar class="avatar" size="6rem">
            <q-img
              v-if="user.picture && imageSelected === null"
              :src="user?.picture"
            />
            <q-img
              v-else-if="!user.picture && imageSelected === null"
              src="../../../assets/img/user.png"
            />
            <q-img v-else :src="imageSelected" />
          </q-avatar>
        </div>
        <div class="flex justify-center">
          <q-input
            @update:model-value="
              (val) => {
                onSelectedImage(val[0]);
              }
            "
            filled
            type="file"
            class="hidden image-input"
          />
          <q-btn
            round
            icon="las la-arrow-circle-up"
            color="primary"
            @click="onSelectImage"
          />
          <q-btn
            label="Aplicar"
            color="primary"
            class="btn-block"
            @click="onEditAvatar"
          />
        </div>
      </template>
    </alert>
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
                label="Aplicar"
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

// components
import Alert from "../../../components/Alert";

// composables
import useAuth from "../../authentication/composables/useAuth";
import useImageSelected from "../../../composables/useImageSelected";

export default defineComponent({
  name: "Profile",
  components: {
    Alert,
  },
  setup() {
    const { user, updateUserSession, updateUserAvatar } = useAuth();
    const { imageSelected, image, onSelectedImage } = useImageSelected();

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

    const onUpdatedUser = async () => {
      const { ok, message } = await updateUserSession(userForm.value);

      if (ok) {
        ShowEditProfile.value = false;
        return;
      }

      console.log(message);
    };

    // alert
    let headerMessage = ref("");
    let alertMessage = ref("");
    let isAlertOpen = ref(false);

    const openAlert = (header, message) => {
      headerMessage.value = "Editar Perfil";
      isAlertOpen.value = true;
    };

    const closeAlert = () => {
      isAlertOpen.value = false;
    };

    const onSelectImage = () => {
      document.querySelector(".image-input").click();
    };

    const onEditAvatar = async () => {
      let profile = {
        id: user.value.id,
        picture: image.value,
      };
      const { ok } = await updateUserAvatar(profile);
      if (ok) {
        closeAlert();
        return;
      }
    };

    return {
      ShowEditProfile,
      ToggleAlertEditProfile,
      user,
      userForm,
      onUpdatedUser,
      // alert
      headerMessage,
      alertMessage,
      isAlertOpen,
      closeAlert,
      openAlert,
      imageSelected,
      onEditAvatar,
      onSelectedImage,
      onSelectImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  max-width: 400px;
  @media screen and (max-width: 700px) {
    width: 80%;
  }
}
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
      .avatar {
        height: 230px;
        width: 230px;
      }
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
