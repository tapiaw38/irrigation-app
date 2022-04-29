export const loginUser = (state, { user, access_token }) => {
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    state.access_token = access_token;
  }
  state.user = user;
  state.status = "authenticated";
  localStorage.setItem("user", JSON.stringify(user, null));
  localStorage.setItem("status", "authenticated");
};


export const logoutUser = (state) => {
  state.user = null;
  state.access_token = null;
  state.status = "not-authenticated";

  localStorage.removeItem("access_token")
  localStorage.removeItem("user")
  localStorage.removeItem("status")
}
