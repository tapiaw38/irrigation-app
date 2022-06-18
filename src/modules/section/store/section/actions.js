import api from "../../../../api/api";


export const addSections = async ({ commit }, sections) => {
  try {
    const { data } = await api.post("/sections/create", sections);
    commit("addSections", data.response);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};

export const addIntakes = async ({ commit }, intakes) => {
  try {
    const { data } = await api.post("/intakes/create", intakes);
    commit("addIntakes", data.response);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};

export const addIntakeProduction = async ({ commit }, intakeProduction) => {
  try {
    const { data } = await api.post(`/intakes/production/${intakeProduction.intake_id}`, intakeProduction);
    commit("addIntakeProduction", data.response);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};

export const loadSections = async ({ commit }) => {
  try {
    const { data } = await api.get("/sections/all");
    commit("setSections", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadIntakes = async ({ commit }) => {
  try {
    const { data } = await api.get("/intakes/all");
    commit("setIntakes", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadSectionById = async ({ commit }, id) => {
  try {
    const { data } = await api.get(`/sections/${id}`);
    commit("setSectionById", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadIntakeById = async ({ commit }, id) => {
  try {
    const { data } = await api.get(`/intakes/${id}`);
    commit("setIntakeById", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const updateSection = async ({ commit }, section) => {
  try {
    const { data } = await api.put(`/sections/update/${section.id}`, section);
    commit("updateSection", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const updateIntake = async ({ commit }, intake) => {
  try {
    const { data } = await api.put(`/intakes/update/${intake.id}`, intake);
    commit("updateIntake", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const deleteSection = async ({ commit }, section) => {
  try {
    const { data } = await api.delete(`/sections/delete/${section.id}`);
    commit("deleteSection", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const deleteIntake = async ({ commit }, intake) => {
  try {
    const { data } = await api.delete(`/intakes/delete/${intake.id}`);
    commit("deleteIntake", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const deleteIntakeProduction = async ({ commit }, intakeProduction) => {
  try {
    const { data } = await api.post(`/intakes/production/delete/${intakeProduction.intake_id}`, intakeProduction);
    commit("deleteIntakeProduction", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadSectionsStorage = async ({ commit }) => {
  try {
    const { data } = await api.get("/sections/all");
    commit("setSectionsStorage", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const loadIntakesStorage = async ({ commit }) => {
  try {
    const { data } = await api.get("/intakes/all");
    commit("setIntakesStorage", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const addSectionsStorage = async ({ commit }, section) => {
  try {
    commit("addSectionsStorage", section);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};

export const addIntakesStorage = async ({ commit }, intake) => {
  try {
    commit("addIntakesStorage", intake);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: new Error('intake not saved') };
  }
};

export const deleteSectionsStorage = async ({ commit }) => {
  try {
    commit("deleteSectionsStorage");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: "Error" };
  }
};

export const deleteIntakesStorage = async ({ commit }) => {
  try {
    commit("deleteIntakesStorage");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: "Error" };
  }
};
