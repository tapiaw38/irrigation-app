

import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useUser = () => {
  const store = useStore();

  const createUser = (user) => {
    const resp = store.dispatch("user/addUser", user);
    return resp;
  };

  const editUser = (user) => {
    const resp = store.dispatch("user/updateUser", user);
    return resp;
  }

  const deleteUser = (user) => {
    store.dispatch("user/deleteUser", user);
  }

  onMounted(() => {
    store.dispatch("user/loadUsers");
  });

  return {
    users: computed(() => store.getters["user/getUsers"]),
    createUser,
    editUser,
    deleteUser,
  };
};

export default useUser;
