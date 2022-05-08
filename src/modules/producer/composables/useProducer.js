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

  const downloadProducers = async () => {
    localStorage.removeItem('allProducerStorage');
    const resp = await store.dispatch("producer/loadProducerStorage");
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
  */

  onMounted(() => {
    store.dispatch("producer/loadProducers");
  });

  return {
    producers: computed(() => store.getters["producer/getProducers"]),
    producersStorage: computed(() => store.getters["producer/getProducersStorage"]),
    allProducerStorage: computed(() => store.getters["producer/getAllProducerStorage"]),
    createProducers,
    createProducerStorage,
    deleteProducersStorage,
    downloadProducers,
  };
};

export default useProducer;
