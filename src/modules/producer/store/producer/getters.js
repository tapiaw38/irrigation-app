export const getProducers = (state) => state.producers;
export const getProducer = (state) => state.producer;
export const getProductions = (state) => state.productions;

export const getProducerById =
  (state) =>
    (id = "") => {
      const producer = state.producers.find((producer) => producer.id === id);
      if (!producer) return;
      return { ...producer };
    };

export const getProducersStorage = (state) => state.producersStorage;
export const getProductionsStorage = (state) => state.productionsStorage;

export const getAllProducerStorage = (state) => state.allProducerStorage;
