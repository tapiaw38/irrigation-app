export default {
  component: () =>
    import(/* webpackChunkName: "configurationLayout" */ "../layouts/ConfigurationLayout"),
  children: [
    {
      path: "",
      name: "configuration",
      component: () =>
        import(/* webpackChunkName: "configuration" */ "../pages/Configuration"),
    },
  ],
};
