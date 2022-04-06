<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="las la-bars"
        aria-label="Menu"
        @click="toggleSideMenu"
      />

      <q-toolbar-title>
        <q-icon size="2rem" name="las la-layer-group" />
        Intendicia de riego
      </q-toolbar-title>

      <div>
        <q-btn flat dense round icon="las la-bell" aria-label="Notifications" />
        <q-btn-dropdown
          split
          color="primary"
          push
          glossy
          no-caps
          icon="las la-user"
          dropdown-icon="las la-angle-down"
          label="Nombre"
          @click="$router.push({ name: 'profile', params: { id: 1 } })"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="$router.push({ name: 'profile', params: { id: 1 } })"
            >
              <q-item-section avatar>
                <q-avatar>
                  <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>Perfil</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section avatar>
                <q-avatar>
                  <q-icon
                    name="las la-sign-out-alt"
                    class="text-primary"
                    size="2em"
                  />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>Cerrar sesion</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer v-model="sideMenuOpen" show-if-above bordered>
    <q-list>
      <q-item-label header> Menu </q-item-label>

      <EssentialLink
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
  </q-drawer>
</template>

<script>
import { defineComponent, ref } from "vue";

import EssentialLink from "../components/EssentialLink";

import useUi from "../composables/useUi";
import linksList from "../helpers/linksList";

export default defineComponent({
  name: "Header",
  components: {
    EssentialLink,
  },

  setup() {
    const { sideMenuOpen, toggleSideMenu } = useUi();

    return {
      essentialLinks: linksList,
      sideMenuOpen,
      toggleSideMenu,
    };
  },
});
</script>
