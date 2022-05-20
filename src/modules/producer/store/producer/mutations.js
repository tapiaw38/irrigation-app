export const addProducers = (state, producers) => {
  producers.map(producer => {
    state.producers = [{ ...producer }, ...state.producers];
  });
};

export const addProductions = (state, productions) => {
  productions.map(production => {
    state.productions = [{ ...production }, ...state.productions];
  }
  );
};

export const addProducerStorage = (state, producer) => {
  localStorage.setItem('producersStorage', JSON.stringify([...state.producersStorage, producer.value]));
  state.producersStorage = JSON.parse(localStorage.getItem('producersStorage'));
};

export const addProductionStorage = (state, production) => {
  localStorage.setItem('productionsStorage', JSON.stringify([...state.productionsStorage, production.value]));
  state.productionsStorage = JSON.parse(localStorage.getItem('productionsStorage'));
}

export const setProducers = (state, producers) => {
  state.producers = producers;
}

export const setProductions = (state, productions) => {
  state.productions = productions;
}

export const setProducerById = (state, producer) => {
  state.producer = producer;
}

export const setProductionById = (state, production) => {
  state.production = production;
}

export const updateProducer = (state, producer) => {
  const idx = state.producers.map(p => p.id).indexOf(producer.id);
  state.producers[idx] = producer;
}

export const deleteProducer = (state, producer) => {
  const idx = state.producers.map(p => p.id).indexOf(producer.id);
  state.producers.splice(idx, 1);
}

export const setProducerStorage = (state, producers) => {
  localStorage.setItem('allProducerStorage', JSON.stringify(producers));
  state.allProducerStorage = JSON.parse(localStorage.getItem('allProducerStorage'));
}

export const deleteProducersStorage = (state) => {
  localStorage.removeItem('producersStorage');
  state.producersStorage = JSON.parse(localStorage.getItem('producersStorage'));
}

export const deleteProductionsStorage = (state) => {
  localStorage.removeItem('productionsStorage');
  state.productionsStorage = JSON.parse(localStorage.getItem('productionsStorage'));
}
