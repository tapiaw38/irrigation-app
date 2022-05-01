export const loginUser = (state, { user, access_token }) => {
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    state.access_token = access_token;
  }
  state.userSession = user;
  localStorage.setItem("user", JSON.stringify(user, null));

  state.status = "authenticated";
  localStorage.setItem("status", "authenticated");
};


export const logoutUser = (state) => {
  state.user = null;
  state.userSession = null;
  state.access_token = null;
  state.status = "not-authenticated";

  localStorage.removeItem("access_token")
  localStorage.removeItem("user")
  localStorage.removeItem("status")
}

export const setUser = (state, user) => {
  state.userSession = user;
  localStorage.setItem("user", JSON.stringify(user, null));
}
