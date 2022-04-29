import authApi from "../../../../api/authApi";

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
