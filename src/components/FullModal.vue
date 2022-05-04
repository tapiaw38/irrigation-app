<template>
  <q-dialog
    v-model="isOpen"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-space />

        <q-btn
          dense
          flat
          icon="las la-window-minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          flat
          icon="las la-window-maximize"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn dense flat icon="las la-window-close " @click="close()">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6">{{ headerMessage }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="body"></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, ref, watch } from "vue";
export default {
  name: "Dialog",
  props: {
    headerMessage: {
      type: String,
      default: "Alerta",
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    let maximizedToggle = ref(true);

    return {
      isOpen: computed(() => props.dialog),
      close: () => {
        context.emit("close", false);
      },
      maximizedToggle,
    };
  },
};
</script>
