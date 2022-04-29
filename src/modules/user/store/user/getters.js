export const getUsers = (state) => state.users;

export const getUserById =
  (state) =>
    (id = "") => {
      const user = state.users.find((user) => user.id === id);
      if (!user) return;
      return { ...user };
    };
