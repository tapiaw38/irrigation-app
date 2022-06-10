import { computed, ref } from "vue";

const useAlert = () => {

  let headerMessage = ref("");
  let alertMessage = ref("");
  let isAlertOpen = ref(false);

  const closeAlert = () => {
    isAlertOpen.value = false;
  };

  const openAlert = (header = '', message = '') => {
    headerMessage.value = header;
    alertMessage.value = message;
    isAlertOpen.value = true;
  }

  return {
    headerMessage,
    alertMessage,
    isAlertOpen: computed({
      get: () => isAlertOpen.value,
      set: (value) => isAlertOpen.value = value,
    }),
    closeAlert,
    openAlert,
  };

};

export default useAlert;
