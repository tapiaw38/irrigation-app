export default function () {
  return {
    isLoading: true,
    producers: [],
    productions: [],
    producersStorage: localStorage.getItem('producersStorage')
      ? JSON.parse(localStorage.getItem('producersStorage'))
      : [],
    allProducerStorage: localStorage.getItem('allProducerStorage')
      ? JSON.parse(localStorage.getItem('allProducerStorage'))
      : [],
    productionsStorage: localStorage.getItem('productionsStorage')
      ? JSON.parse(localStorage.getItem('productionsStorage'))
      : [],
  };
}
