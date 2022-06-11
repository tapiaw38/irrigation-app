export const addSections = (state, sections) => {
  sections.map(section => {
    state.sections = [{ ...section }, ...state.sections];
  });
};

export const addIntakes = (state, intakes) => {
  intakes.map(intake => {
    state.intakes = [{ ...intake }, ...state.intakes];
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

export const setIntakes = (state, intakes) => {
  state.intakes = intakes;
};

export const setSectionById = (state, section) => {
  state.section = section;
};

export const updateSection = (state, section) => {
  const idx = state.sections.map(s => s.id).indexOf(section.id);
  state.sections[idx] = section;
};

export const updateIntake = (state, intake) => {
  const idx = state.intakes.map(i => i.id).indexOf(intake.id);
  state.intakes[idx] = intake;
};

export const deleteSection = (state, section) => {
  const idx = state.sections.map(s => s.id).indexOf(section.id);
  state.sections.splice(idx, 1);
};

export const deleteIntake = (state, intake) => {
  const idx = state.intakes.map(i => i.id).indexOf(intake.id);
  state.intakes.splice(idx, 1);
};

export const setSectionsStorage = (state, sections) => {
  localStorage.setItem('allSectionsStorage', JSON.stringify(sections));
  state.allSectionsStorage = JSON.parse(localStorage.getItem('allSectionsStorage'));
};

export const setIntakesStorage = (state, intakes) => {
  localStorage.setItem('allIntakesStorage', JSON.stringify(intakes));
  state.allIntakesStorage = JSON.parse(localStorage.getItem('allIntakesStorage'));
};

export const deleteSectionsStorage = (state) => {
  localStorage.removeItem('sectionsStorage');
  state.sectionsStorage = JSON.parse(localStorage.getItem('sectionsStorage'));
};

export const deleteIntakesStorage = (state) => {
  localStorage.removeItem('intakesStorage');
  state.intakesStorage = JSON.parse(localStorage.getItem('intakesStorage'));
};
