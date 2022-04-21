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
    {
      path: "/shift/add",
      name: "shift_add",
      component: () =>
        import(/* webpackChunkName: "shiftAdd" */ "../pages/ShiftAdd")
    },
  ],
};
