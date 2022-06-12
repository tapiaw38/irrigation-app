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
      path: ":id/producer",
      name: "producer_detail",
      component: () =>
        import(/* webpackChunkName: "producerDetail" */ "../pages/ProducerDetail"),
      props: (route) => {
        const id = Number(route.params.id);
        return isNaN(id) ? { id: 1 } : { id };
      },
    },
    {
      path: "/production",
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
      path: ":id/production",
      name: "production_detail",
      component: () =>
        import(/* webpackChunkName: "producerDetail" */ "../pages/ProductionDetail"),
      props: (route) => {
        const id = Number(route.params.id);
        return isNaN(id) ? { id: 1 } : { id };
      },
    },
    {
      path: "/geolocation",
      name: "geolocation",
      component: () =>
        import(/* webpackChunkName: "geolocation" */ "../pages/GeoHome")
    },
    {
      path: "/geolocation/production",
      name: "geo-production",
      component: () =>
        import(/* webpackChunkName: "geoProduction" */ "../pages/GeoProduction")
    },
    {
      path: "/geolocation/intake",
      name: "geo-water",
      component: () =>
        import(/* webpackChunkName: "geoIntake" */ "../pages/GeoIntake")
    },
  ],
};
