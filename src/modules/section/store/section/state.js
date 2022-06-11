export default function () {
  return {
    isLoading: true,
    sections: [],
    intakes: [],
    section: null,
    intake: null,
    sectionsStorage: localStorage.getItem('sectionsStorage')
      ? JSON.parse(localStorage.getItem('sectionsStorage'))
      : [],
    intakesStorage: localStorage.getItem('intakesStorage')
      ? JSON.parse(localStorage.getItem('intakesStorage'))
      : [],
    allSectionsStorage: localStorage.getItem('allSectionsStorage')
      ? JSON.parse(localStorage.getItem('allSectionsStorage'))
      : [],
    allIntakesStorage: localStorage.getItem('allIntakesStorage')
      ? JSON.parse(localStorage.getItem('allIntakesStorage'))
      : [],
  };
}
