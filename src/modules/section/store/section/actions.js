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

export const loadSections = async ({ commit }) => {
  try {
    const { data } = await api.get("/sections/all");
    commit("setSections", data.response);
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

export const updateSection = async ({ commit }, section) => {
  try {
    const { data } = await api.put(`/sections/update/${section.id}`, section);
    commit("updateSection", data.response);
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

export const loadSectionsStorage = async ({ commit }) => {
  try {
    const { data } = await api.get("/sections/all");
    commit("setSectionsStorage", data.response);
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

export const deleteSectionsStorage = async ({ commit }) => {
  try {
    commit("deleteSectionsStorage");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: "Error" };
  }
};
