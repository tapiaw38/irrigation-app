import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const useAuth = () => {

  const store = useStore();

  const handleLogin = (userForm) => {
    const resp = store.dispatch("auth/login", userForm);
    return resp;
  };

  const handleLogout = () => {
    store.dispatch("auth/logout");
  };

  return {
    handleLogin,
    handleLogout,
    authStatus: computed(() => store.getters["auth/currentState"]),
    user: computed(() => store.getters["auth/userSession"])
  };

}

export default useAuth;
