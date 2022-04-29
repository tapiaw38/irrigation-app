export default {

  component: () =>
    import(/* webpackChunkName: "userLayout" */ "../layouts/UserLayout"),
  children: [
    {
      path: "all",
      name: "users",
      component: () =>
        import(/* webpackChunkName: "users" */ "../pages/Users")
    },
    {
      path: ":username/profile",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "users" */ "../pages/Profile"),
    },
    {
      path: "records",
      name: "record",
      component: () =>
        import(/* webpackChunkName: "records" */ "../pages/Records")
    },
  ],
};
