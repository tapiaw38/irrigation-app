import authApi from "../../../../api/authApi";
import api from "../../../../api/api";

export const login = async ({ commit }, userForm) => {

  const { email, password } = userForm

  try {
    const { data } = await authApi.post("/users/login", { email, password });
    const { access_token, user } = data.response;
    commit("loginUser", { user, access_token });
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const logout = async ({ commit }) => {
  commit("logoutUser");
};

export const checkAuthentication = async ({ commit }) => {

  const idToken = localStorage.getItem("access_token")

  if (!idToken) {
    commit("logoutUser")
    return { ok: false, message: 'no Token' }
  }
  return { ok: true };

}

export const loadUser = async ({ commit }, id) => {
  try {
    const { data } = await api.get(`/users/${id}`);
    commit("setUser", data.response);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.response.data };
  }
};

export const setUser = async ({ commit }, user) => {
  try {
    const { data } = await api.put(`/users/partial/${user.id}`, user);
    commit('setUser', data.response)
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
}

export const setUserAvatar = async ({ commit }, profile) => {
  if (!profile) return { ok: false, message: "Profile is required" };
  try {
    const formData = new FormData();
    formData.append('picture', profile.picture);
    formData.append('is_active', profile.is_active);
    formData

    const { data } = await api.put(`/users/update/avatar/${profile.id}`, formData);
    commit('setUserProfile', data.response)
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data };
  }
}
