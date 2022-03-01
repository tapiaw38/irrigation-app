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

      <q-toolbar-title> IR Tinogasta </q-toolbar-title>

      <div>
        <q-btn flat dense round icon="las la-bell" aria-label="Notifications" />
        <q-btn flat dense round icon="las la-user" aria-label="Profile" />
        <q-btn
          flat
          dense
          round
          icon="las la-sign-out-alt"
          aria-label="Logout"
        />
      </div>
      <div>
        <q-btn flat dense round icon="las la-sign-in-alt" aria-label="Login" />
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
