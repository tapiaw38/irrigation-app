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
        import(/* webpackChunkName: "producer_add" */ "../pages/ProducerAdd")
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
    }
  ],
};
