export default function () {
  return {
    isLoading: true,
    sections: [],
    section: null,
    sectionsStorage: localStorage.getItem('sectionsStorage')
      ? JSON.parse(localStorage.getItem('sectionsStorage'))
      : [],
    allSectionsStorage: localStorage.getItem('allSectionsStorage')
      ? JSON.parse(localStorage.getItem('allSectionsStorage'))
      : [],
    intakesStorage: localStorage.getItem('intakesStorage')
      ? JSON.parse(localStorage.getItem('intakesStorage'))
      : [],
  };
}
