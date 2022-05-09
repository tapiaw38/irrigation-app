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

export const addProductions = async ({ commit }, productions) => {
  try {
    const { data } = await api.post("/productions/create", productions);
    commit("addProductions", data.response);
    console.log("addProductions", data.response);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
}

export const loadProducers = async ({ commit }) => {
  try {
    const { data } = await api.get("/producers/all");
    commit("setProducers", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadProductions = async ({ commit }) => {
  try {
    const { data } = await api.get("/productions/all");
    commit("setProductions", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
}

export const loadProducerStorage = async ({ commit }) => {
  try {
    const { data } = await api.get("/producers/all");
    commit("setProducerStorage", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
}

export const addProducerStorage = async ({ commit }, producer) => {
  try {
    commit("addProducerStorage", producer);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
}

export const addProductionStorage = async ({ commit }, production) => {
  try {
    commit("addProductionStorage", production);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
}

export const deleteProducersStorage = async ({ commit }) => {
  try {
    commit("deleteProducersStorage");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: "Error" };
  }
}

export const deleteProductionsStorage = async ({ commit }) => {
  try {
    commit("deleteProductionsStorage");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: "Error" };
  }
}
