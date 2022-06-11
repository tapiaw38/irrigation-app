import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useSection = () => {
  const store = useStore();

  const createSection = async (section) => {
    const resp = await store.dispatch("section/addSections", section);
    return resp;
  };

  const createIntake = async (intake) => {
    const resp = await store.dispatch("section/addIntakes", intake);
    return resp;
  };

  const createSectionStorage = async (section) => {
    const resp = store.dispatch("section/addSectionsStorage", section);
    return resp;
  };

  const createIntakeStorage = async (intake) => {
    const resp = store.dispatch("section/addIntakesStorage", intake);
    return resp;
  };

  const deleteSectionStorage = async (section) => {
    const resp = store.dispatch("section/deleteSectionsStorage", section);
    return resp;
  };

  const downloadSections = async () => {
    localStorage.removeItem("allSectionsStorage");
    const resp = await store.dispatch("section/loadSectionsStorage");
    return resp;
  };

  const getSectionById = async (id) => {
    const res = store.dispatch("section/loadSectionById", id);
    return res;
  };

  const editSection = (section) => {
    const resp = store.dispatch("section/updateSection", section);
    return resp;
  };

  const editIntake = (intake) => {
    const resp = store.dispatch("section/updateIntake", intake);
    return resp;
  };

  const deleteSection = (section) => {
    const resp = store.dispatch("section/deleteSection", section);
    return resp;
  };

  const deleteIntake = (intake) => {
    const resp = store.dispatch("section/deleteIntake", intake);
    return resp;
  };

  onMounted(() => {
    store.dispatch("section/loadSections");
  });

  return {
    sections: computed(() => store.getters["section/getSections"]),
    section: computed(() => store.getters["section/getSection"]),
    sectionsStorage: computed(() => store.getters["section/getSectionsStorage"]),
    allSectionStorage: computed(() => store.getters["section/getAllSectionsStorage"]),
    createSection,
    createSectionStorage,
    createIntakeStorage,
    deleteSectionStorage,
    downloadSections,
    getSectionById,
    editSection,
    deleteSection
  };
}

export default useSection;
