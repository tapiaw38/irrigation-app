export const getSections = (state) => state.sections;
export const getSection = (state) => state.section;

export const getIntakes = (state) => state.intakes;
export const getIntake = (state) => state.intake;

export const getIntakesBySection =
  (state) =>
    (section = "") => {
      if (section === "") return state.intakes;
      return state.intakes.filter((intake) => {
        return intake.section.id === section;
      });
    };

export const getSectionsStorage = (state) => state.sectionsStorage;
export const getAllSectionsStorage = (state) => state.allSectionsStorage;

export const getIntakesStorage = (state) => state.intakesStorage;
export const getAllIntakesStorage = (state) => state.allIntakesStorage;
