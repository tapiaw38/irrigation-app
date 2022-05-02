export default function () {
  return {
    isLoading: true,
    producers: [],
    producersStorage: localStorage.getItem('producersStorage')
      ? JSON.parse(localStorage.getItem('producersStorage'))
      : [],
  };
}
