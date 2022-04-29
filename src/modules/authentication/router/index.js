export default {

  component: () =>
    import(/* webpackChunkName: "authLayout" */ "../layouts/AuthLayout"),
  children: [],
};
