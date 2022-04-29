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
  const { data } = await api.put(`/users/update/${user.id}`, user);
  commit('updateUser', data.response)
}

