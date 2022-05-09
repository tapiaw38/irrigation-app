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
