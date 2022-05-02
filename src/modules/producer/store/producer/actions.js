import api from "../../../../api/api";


export const addProducers = async ({ commit }, producers) => {
  try {
    const { data } = await api.post("/producers/create", producers);
    commit("addProducers", data.response);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};

export const loadProducers = async ({ commit }) => {
  try {
    const { data } = await api.get("/producers/all");
    commit("setProducers", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const addProducerStorage = async ({ commit }, producer) => {
  commit("addProducerStorage", producer);
}
