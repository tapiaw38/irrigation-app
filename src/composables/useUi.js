import { computed } from "vue";
import { useStore } from "vuex";


const useUi = () => {

  const store = useStore();

  const toggleSideMenu = () => {
    store.commit("ui/toggleSideMenuOpen");
  };

  return {
    //sideMenuOpen: computed(() => store.getters["ui/getSideMenuOpen"]),
    sideMenuOpen: computed({
      get: () => store.getters["ui/getSideMenuOpen"],
      set: (value) => store.commit("ui/toggleSideMenuOpen"),
    }),
    toggleSideMenu,
  };
}

export default useUi;
