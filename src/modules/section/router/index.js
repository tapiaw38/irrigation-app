export default {

  component: () =>
    import(/* webpackChunkName: "producerLayout" */ "../layouts/SectionLayout"),
  children: [
    {
      path: "",
      name: "sections",
      component: () =>
        import(/* webpackChunkName: "sections" */ "../pages/Sections")
    },
    {
      path: "section/add",
      name: "section_add",
      component: () =>
        import(/* webpackChunkName: "sectionAdd" */ "../pages/SectionAdd")
    },
    {
      path: ":id/section",
      name: "section_detail",
      component: () =>
        import(/* webpackChunkName: "sectionDetail" */ "../pages/SectionDetail"),
      props: (route) => {
        const id = Number(route.params.id);
        return isNaN(id) ? { id: 1 } : { id };
      },
    },
    {
      path: "intakes",
      name: "intakes",
      component: () =>
        import(/* webpackChunkName: "intakes" */ "../pages/Intakes")
    },
    {
      path: "intake/add",
      name: "intake_add",
      component: () =>
        import(/* webpackChunkName: "intakeAdd" */ "../pages/IntakeAdd")
    },
    {
      path: ":id/intake",
      name: "intake_detail",
      component: () =>
        import(/* webpackChunkName: "intakeDetail" */ "../pages/IntakeDetail"),
      props: (route) => {
        const id = Number(route.params.id);
        return isNaN(id) ? { id: 1 } : { id };
      },
    },
  ],
};
