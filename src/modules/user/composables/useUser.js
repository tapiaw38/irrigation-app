

import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useUser = () => {
  const store = useStore();

  const editUser = (user) => {
    store.dispatch("user/updateUser", user);
  }

  onMounted(() => {
    store.dispatch("user/loadUsers");
  });

  return {
    users: computed(() => store.getters["user/getUsers"]),
    editUser,
  };
};

export default useUser;
