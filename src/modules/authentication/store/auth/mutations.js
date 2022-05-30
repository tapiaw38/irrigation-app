export const loginUser = (state, { user, access_token }) => {
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    state.access_token = access_token;
  }

  localStorage.setItem("user", JSON.stringify(user));
  state.userSession = JSON.parse(localStorage.getItem("user"));

  state.status = "authenticated";
  localStorage.setItem("status", "authenticated");
};


export const logoutUser = (state) => {

  localStorage.removeItem("user")
  localStorage.removeItem("status")
  localStorage.removeItem("access_token")

  state.userSession = JSON.parse(localStorage.getItem("user"));
  state.status = null;
  state.access_token = null;


}

export const setUser = (state, user) => {
  localStorage.removeItem("user")
  localStorage.setItem("user", JSON.stringify(user));
  state.userSession = JSON.parse(localStorage.getItem("user"));
}

export const setUserProfile = (state, user) => {
  localStorage.removeItem("user")
  localStorage.setItem("user", JSON.stringify(user));
  state.userSession = JSON.parse(localStorage.getItem("user"));
};
