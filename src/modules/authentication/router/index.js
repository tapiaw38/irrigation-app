export default {

  component: () =>
    import(/* webpackChunkName: "authLayout" */ "../layouts/AuthLayout"),
  children: [
    {
      path: "",
      name: "users",
      component: () =>
        import(/* webpackChunkName: "users" */ "../pages/Users")
    },
    {
      path: "/profile/:id/edit",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "users" */ "../pages/Profile")
    },
  ],
};
