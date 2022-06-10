import { ref } from "vue";

const useModal = () => {

  let headerModalMessage = ref("");
  let maximizedToggle = ref(true);
  let isModalOpen = ref(false);

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const openModal = (message = '') => {
    headerModalMessage.value = message;
    maximizedToggle.value = true;
    isModalOpen.value = true;
  }

  return {
    headerModalMessage,
    maximizedToggle,
    isModalOpen,
    closeModal,
    openModal,
  };

};

export default useModal;
