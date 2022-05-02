import { useStore } from "vuex";
import { computed } from "vue";

const useAuth = () => {

  const store = useStore();

  const handleLogin = (userForm) => {
    const resp = store.dispatch("auth/login", userForm);
    return resp;
  };

  const handleLogout = () => {
    store.dispatch("auth/logout");
  };

  const updateUserSession = (user) => {
    const resp = store.dispatch("auth/setUser", user);
    return resp;
  };

  return {
    handleLogin,
    handleLogout,
    updateUserSession,
    authStatus: computed(() => store.getters["auth/currentState"]),
    user: computed(() => store.getters["auth/userSession"]),
  };

}

export default useAuth;
