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

  const getProducerById = async (id) => {
    const res = store.dispatch("producer/loadProducerById", id);
    return res;
  }

  const getProductionById = async (id) => {
    const res = store.dispatch("producer/loadProductionById", id);
    return res;
  }

  const editProducer = (producer) => {
    const resp = store.dispatch("producer/updateProducer", producer);
    return resp;
  }

  const editProduction = (production) => {
    const resp = store.dispatch("producer/updateProduction", production);
    return resp;
  }

  const deleteProducer = (producer) => {
    const resp = store.dispatch("producer/deleteProducer", producer);
    return resp;
  }

  const deleteProduction = (production) => {
    const resp = store.dispatch("producer/deleteProduction", production);
    return resp;
  }

  onMounted(() => {
    store.dispatch("producer/loadProducers");
    store.dispatch("producer/loadProductions");
  });

  return {
    producers: computed(() => store.getters["producer/getProducers"]),
    producer: computed(() => store.getters["producer/getProducer"]),
    productions: computed(() => store.getters["producer/getProductions"]),
    production: computed(() => store.getters["producer/getProduction"]),
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
    getProducerById,
    getProductionById,
    editProducer,
    editProduction,
    deleteProducer,
    deleteProduction
  };
};

export default useProducer;
