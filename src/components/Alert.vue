<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="close()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "Dialog",
  props: {
    message: {
      type: String,
      required: false,
    },
    dialog: {
      type: Boolean,
      default: false,
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
