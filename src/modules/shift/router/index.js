export default {

  component: () =>
    import(/* webpackChunkName: "shiftLayout" */ "../layouts/ShiftLayout"),
  children: [
    {
      path: "",
      name: "shifts",
      component: () =>
        import(/* webpackChunkName: "shifts" */ "../pages/Shifts")
    },
  ],
};
