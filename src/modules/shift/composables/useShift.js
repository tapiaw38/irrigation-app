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

  const updateShift = async (shift) => {
    const res = store.dispatch("shift/updateShift", shift);
    return res;
  };

  const deleteShift = async (shift) => {
    const res = store.dispatch("shift/deleteShift", shift);
    return res;
  };

  const createShiftProduction = async (shiftProduction) => {
    const res = store.dispatch("shift/addShiftProduction", shiftProduction);
    return res;
  };

  const deleteShiftProduction = async (shiftProduction) => {
    const resp = store.dispatch("shift/deleteShiftProduction", shiftProduction);
    return resp;
  };

  onMounted(() => {
    store.dispatch("shift/loadShifts");
  });

  return {
    shifts: computed(() => store.getters["shift/getShifts"]),
    shift: computed(() => store.getters["shift/getShift"]),
    getShiftById,
    createShift,
    updateShift,
    deleteShift,
    createShiftProduction,
    deleteShiftProduction,
  }
}

export default useShift;
