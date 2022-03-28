export default {

  component: () =>
    import(/* webpackChunkName: "producerLayout" */ "../layouts/ProducerLayout"),
  children: [
    {
      path: "",
      name: "producer",
      component: () =>
        import(/* webpackChunkName: "producer" */ "../pages/Producers")
    },
    {
      path: "producer/add",
      name: "producer_add",
      component: () =>
        import(/* webpackChunkName: "producerAdd" */ "../pages/ProducerAdd")
    },
    {
      path: "poducer/:id/detail",
      name: "producer_detail",
      component: () =>
        import(/* webpackChunkName: "producerDetail" */ "../pages/ProducerDetail")
    },
    {
      path: "producer/:id/edit",
      name: "producer_edit",
      component: () =>
        import(/* webpackChunkName: "producerEdit" */ "../pages/ProducerEdit")
    },
    {
      path: "",
      name: "production",
      component: () =>
        import(/* webpackChunkName: "production" */ "../pages/Productions")
    },
    {
      path: "production/add",
      name: "production_add",
      component: () =>
        import(/* webpackChunkName: "productionAdd" */ "../pages/ProductionAdd")
    },
    {
      path: "poduction/:id/detail",
      name: "production_detail",
      component: () =>
        import(/* webpackChunkName: "producerDetail" */ "../pages/ProductionDetail")
    },
  ],
};
