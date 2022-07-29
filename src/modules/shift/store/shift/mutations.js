export const addShift = (state, shift) => {
  state.shifts = [{ ...shift }, ...state.shifts];
};

export const setShifts = (state, shifts) => {
  state.shifts = shifts;
};

export const setShiftById = (state, shift) => {
  state.shift = shift;
}
