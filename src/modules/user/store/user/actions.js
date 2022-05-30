import api from "../../../../api/api";

export const loadUsers = async ({ commit }) => {
  try {
    const { data } = await api.get("/users/all");
    commit("setUsers", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const updateUser = async ({ commit }, user) => {
  try {
    const { data } = await api.put(`/users/partial/${user.id}`, user);
    commit("updateUser", data.response);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};

export const addUser = async ({ commit }, user) => {
  try {
    const { data } = await api.post("/users/create", user);
    commit("addUser", data.response);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
};

export const deleteUser = async ({ commit }, user) => {
  const userDeactivated = { ...user };
  userDeactivated.is_active = userDeactivated.is_active ? false : true;

  const { data } = await api.put(`/users/partial/${user.id}`, userDeactivated);
  commit("deleteUser", data.response);
};
