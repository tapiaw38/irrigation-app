export const setUsers = (state, users) => {
  state.users = users;
  state.isLoading = false;
};

export const updateUser = (state, user) => {
  const idx = state.users.map(u => u.id).indexOf(user.id);
  state.users[idx] = user;
  localStorage.removeItem("user");
  localStorage.setItem("user", JSON.stringify(user, null));
  state.isLoading = false;
};
