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

export const loadProductions = async ({ commit }) => {
  try {
    const { data } = await api.get("/productions/all");
    commit("setProductions", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadProducerById = async ({ commit }, id) => {
  try {
    const { data } = await api.get(`/producers/${id}`);
    commit("setProducerById", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadProductionById = async ({ commit }, id) => {
  try {
    const { data } = await api.get(`/productions/${id}`);
    commit("setProductionById", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const updateProducer = async ({ commit }, producer) => {
  try {
    const { data } = await api.put(
      `/producers/update/${producer.id}`,
      producer
    );
    commit("updateProducer", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const updateProduction = async ({ commit }, production) => {
  try {
    const { data } = await api.put(
      `/productions/update/${production.id}`,
      production
    );
    commit("updateProduction", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const deleteProducer = async ({ commit }, producer) => {
  try {
    const { data } = await api.delete(`/producers/delete/${producer.id}`);
    commit("deleteProducer", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const deleteProduction = async ({ commit }, production) => {
  try {
    const { data } = await api.delete(`/productions/delete/${production.id}`);
    commit("deleteProduction", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadProducerStorage = async ({ commit }) => {
  try {
    const { data } = await api.get("/producers/all");
    commit("setProducerStorage", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const addProducerStorage = async ({ commit }, producer) => {
  try {
    commit("addProducerStorage", producer);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};

export const addProductionStorage = async ({ commit }, production) => {
  try {
    commit("addProductionStorage", production);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};

export const deleteProducersStorage = async ({ commit }) => {
  try {
    commit("deleteProducersStorage");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: "Error" };
  }
};

export const deleteProductionsStorage = async ({ commit }) => {
  try {
    commit("deleteProductionsStorage");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: "Error" };
  }
};

export const setProducerPicture = async ({ commit }, form) => {
  if (!form) return { ok: false, message: "form is required" };
  try {
    const formData = new FormData();
    formData.append("picture", form.picture);

    const { data } = await api.put(
      `/productions/upload/picture/${form.id}`,
      formData
    );
    commit("setProducerPicture", data.response);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};
