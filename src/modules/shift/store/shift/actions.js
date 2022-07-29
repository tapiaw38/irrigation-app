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
