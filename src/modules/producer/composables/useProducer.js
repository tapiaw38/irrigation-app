import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useProducer = () => {
  const store = useStore();

  const createProducers = async (producers) => {
    const resp = await store.dispatch("producer/addProducers", producers);
    return resp;
  };

  const createProducerStorage = async (producer) => {
    const resp = store.dispatch("producer/addProducerStorage", producer);
    return resp;
  }

  const deleteProducersStorage = async () => {
    const resp = store.dispatch("producer/deleteProducersStorage");
    return resp;
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
    createProducers,
    createProducerStorage,
    deleteProducersStorage,
  };
};

export default useProducer;
