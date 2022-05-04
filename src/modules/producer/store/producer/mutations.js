export const addProducers = (state, producers) => {

  producers.map(producer => {
    state.producers = [{ ...producer }, ...state.producers];
  });

};

export const addProducerStorage = (state, producer) => {
  console.log(producer);
  localStorage.setItem('producersStorage', JSON.stringify([...state.producersStorage, producer.value]));
  state.producersStorage = JSON.parse(localStorage.getItem('producersStorage'));
};

export const setProducers = (state, producers) => {
  state.producers = producers;
}

export const deleteProducersStorage = (state) => {
  localStorage.removeItem('producersStorage');
  state.producersStorage = JSON.parse(localStorage.getItem('producersStorage'));
}
