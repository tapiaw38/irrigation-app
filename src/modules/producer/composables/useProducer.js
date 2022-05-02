import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useProducer = () => {
  const store = useStore();

  const createProducer = (producer) => {
    const resp = store.dispatch("producer/addProducer", producer);
    return resp;
  };

  const createProducerStorage = (producer) => {
    store.dispatch("producer/addProducerStorage", producer);
  }

  /*
  const editUser = (user) => {
    const resp = store.dispatch("user/updateUser", user);
    return resp;
  }

  const deleteUser = (user) => {
    store.dispatch("user/deleteUser", user);
  }

  onMounted(() => {
    store.dispatch("user/loadUsers");
  });

  */

  return {
    //producers: computed(() => store.getters["user/getUsers"]),
    producersStorage: computed(() => store.getters["producer/getProducersStorage"]),
    createProducer,
    createProducerStorage,
  };
};

export default useProducer;
