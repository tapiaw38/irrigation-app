export default function () {
  return {
    isLoading: true,
    producers: [],
    producersStorage: localStorage.getItem('producersStorage')
      ? JSON.parse(localStorage.getItem('producersStorage'))
      : [],
    allProducerStorage: localStorage.getItem('allProducerStorage')
      ? JSON.parse(localStorage.getItem('allProducerStorage'))
      : [],
  };
}
