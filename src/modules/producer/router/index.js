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
      path: "poducer/:id/detail",
      name: "producer_detail",
      component: () =>
        import(/* webpackChunkName: "producerDetail" */ "../pages/ProducerDetail")
    },

  ],
};
