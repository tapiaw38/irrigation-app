import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'
import ui from "./ui";
import auth from "../modules/authentication/store/auth";
import user from "../modules/user/store/user";
import producer from "../modules/producer/store/producer";
import section from "src/modules/section/store/section";
import shift from "src/modules/shift/store/shift";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      ui,
      auth,
      user,
      producer,
      section,
      shift,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
