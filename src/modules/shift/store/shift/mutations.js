export const addShift = (state, shift) => {
  state.shifts = [{ ...shift }, ...state.shifts];
};

export const setShifts = (state, shifts) => {
  state.shifts = shifts;
};

export const setShiftById = (state, shift) => {
  state.shift = shift;
};

export const updateShift = (state, shift) => {
  const idx = state.shifts.map((s) => s.id).indexOf(shift.id);
  state.shifts[idx] = shift;
};

export const deleteShift = (state, shift) => {
  const idx = state.shifts.map((s) => s.id).indexOf(shift.id);
  state.shifts.splice(idx, 1);
};

export const addShiftProduction = (state, shift) => {
  state.shift = shift;
};

export const deleteShiftProduction = (state, shift) => {
  state.shift = shift;
};
