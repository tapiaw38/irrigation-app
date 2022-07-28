import api from "../../../../api/api";


export const loadShifts = async ({ commit }) => {
  try {
    const { data } = await api.get("/turns/all");
    commit("setShifts", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};
