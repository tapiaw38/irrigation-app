<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ headerMessage }}</div>
      </q-card-section>

      <q-card-section
        class="q-pt-none row justify-content-center content-center"
      >
        <q-icon
          v-if="showIcon"
          :color="iconColor"
          size="md"
          :name="icon"
          class="q-mr-sm"
        />
        <div class="subtitle-2 row justify-center items-center">
          {{ message }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="body"></slot>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="CERRAR" color="primary" @click="close()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "Dialog",
  props: {
    headerMessage: {
      type: String,
      default: "Alerta",
    },
    message: {
      type: String,
      required: false,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "las la-info-circle",
    },
    iconColor: {
      type: String,
      default: "primary",
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, context) {
    return {
      isOpen: computed(() => props.dialog),
      close: () => {
        context.emit("close", false);
      },
    };
  },
};
</script>
