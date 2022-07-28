import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useShift = () => {

  const store = useStore();

  onMounted(() => {
    store.dispatch("shift/loadShifts");
  });

  return {
    shifts: computed(() => store.getters["shift/getShifts"]),
  }
}

export default useShift;
