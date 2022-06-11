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
  ],
};
