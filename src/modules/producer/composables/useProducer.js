import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useProducer = () => {
  const store = useStore();

  const createProducers = async (producers) => {
    const resp = await store.dispatch("producer/addProducers", producers);
    return resp;
  };

  const createProductions = async (productions) => {
    const resp = await store.dispatch("producer/addProductions", productions);
    return resp;
  }

  const createProducerStorage = async (producer) => {
    const resp = store.dispatch("producer/addProducerStorage", producer);
    return resp;
  }

  const createProductionStorage = async (production) => {
    const resp = store.dispatch("producer/addProductionStorage", production);
    return resp;
  }

  const deleteProducersStorage = async () => {
    const resp = store.dispatch("producer/deleteProducersStorage");
    return resp;
  }

  const deleteProductionsStorage = async () => {
    const resp = store.dispatch("producer/deleteProductionsStorage");
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
    store.dispatch("producer/loadProductions");
  });

  return {
    producers: computed(() => store.getters["producer/getProducers"]),
    productions: computed(() => store.getters["producer/getProductions"]),
    producersStorage: computed(() => store.getters["producer/getProducersStorage"]),
    productionsStorage: computed(() => store.getters["producer/getProductionsStorage"]),
    allProducerStorage: computed(() => store.getters["producer/getAllProducerStorage"]),
    createProducers,
    createProductions,
    createProducerStorage,
    deleteProducersStorage,
    deleteProductionsStorage,
    downloadProducers,
    createProductionStorage,
  };
};

export default useProducer;
