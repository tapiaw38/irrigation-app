export const setUsers = (state, users) => {
  state.users = users;
  state.isLoading = false;
};

export const updateUser = (state, user) => {
  const idx = state.users.map((u) => u.id).indexOf(user.id);
  state.users[idx] = user;
  state.isLoading = false;
};

export const addUser = (state, user) => {
  state.users = [{ ...user }, ...state.users];
  state.isLoading = false;
};

export const deleteUser = (state, user) => {
  const idx = state.users.map((u) => u.id).indexOf(user.id);
  state.users[idx] = user;
  state.isLoading = false;
};
