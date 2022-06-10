export const addSections = (state, sections) => {
  sections.map(section => {
    state.sections = [{ ...section }, ...state.sections];
  });
};

export const addSectionsStorage = (state, section) => {
  localStorage.setItem('sectionsStorage', JSON.stringify([...state.sectionsStorage, section.value]));
  state.sectionsStorage = JSON.parse(localStorage.getItem('sectionsStorage'));
};

export const addIntakesStorage = (state, intake) => {
  if (!intake) return new Error('intake not saved');
  localStorage.setItem('intakesStorage', JSON.stringify([...state.intakesStorage, intake.value]));
  state.intakesStorage = JSON.parse(localStorage.getItem('intakesStorage'));
};

export const setSections = (state, sections) => {
  state.sections = sections;
};

export const setSectionById = (state, section) => {
  state.section = section;
};

export const updateSection = (state, section) => {
  const idx = state.sections.map(s => s.id).indexOf(section.id);
  state.sections[idx] = section;
};

export const deleteSection = (state, section) => {
  const idx = state.sections.map(s => s.id).indexOf(section.id);
  state.sections.splice(idx, 1);
};

export const setSectionsStorage = (state, sections) => {
  localStorage.setItem('allSectionsStorage', JSON.stringify(sections));
  state.allSectionsStorage = JSON.parse(localStorage.getItem('allSectionsStorage'));
};

export const deleteSectionsStorage = (state) => {
  localStorage.removeItem('sectionsStorage');
  state.sectionsStorage = JSON.parse(localStorage.getItem('sectionsStorage'));
};
