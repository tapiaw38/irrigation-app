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
  ],
};
