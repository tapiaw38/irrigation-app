import api from "../../../../api/api";

export const addShift = async ({ commit }, shift) => {
  try {
    const { data } = await api.post("/turns/create", shift);
    commit("addShift", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadShifts = async ({ commit }) => {
  try {
    const { data } = await api.get("/turns/all");
    commit("setShifts", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadShiftById = async ({ commit }, id) => {
  try {
    const { data } = await api.get(`/turns/${id}`);
    commit("setShiftById", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};


export const updateShift = async ({ commit }, shift) => {
  try {
    const { data } = await api.put(`/turns/update/${shift.id}`, shift);
    commit("updateShift", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const deleteShift = async ({ commit }, shift) => {
  try {
    const { data } = await api.delete(`/turns/delete/${shift.id}`);
    commit("deleteShift", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const addShiftProduction = async ({ commit }, shiftProduction) => {
  try {
    const { data } = await api.post(
      `/turns/production/${shiftProduction.turn_id}`,
      shiftProduction
    );
    commit("addShiftProduction", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const deleteShiftProduction = async ({ commit }, shiftProduction) => {
  try {
    const { data } = await api.post(
      `/turns/production/delete/${shiftProduction.turn_id}`,
      shiftProduction
    );
    commit("deleteShiftProduction", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};
