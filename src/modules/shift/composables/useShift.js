import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useShift = () => {

  const store = useStore();

  const getShiftById = async (id) => {
    const res = store.dispatch("shift/loadShiftById", id);
    return res;
  };

  const createShift = async (shift) => {
    const res = store.dispatch("shift/addShift", shift);
    return res;
  };

  onMounted(() => {
    store.dispatch("shift/loadShifts");
  });

  return {
    shifts: computed(() => store.getters["shift/getShifts"]),
    shift: computed(() => store.getters["shift/getShift"]),
    getShiftById,
    createShift,
  }
}

export default useShift;
