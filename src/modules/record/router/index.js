export default {

  component: () =>
    import(/* webpackChunkName: "recordLayout" */ "../layouts/RecordLayout"),
  children: [
    {
      path: "",
      name: "record",
      component: () =>
        import(/* webpackChunkName: "records" */ "../pages/Records")
    },
  ],
};
