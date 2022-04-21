import producerRouter from "../modules/producer/router";
import recordRouter from "../modules/record/router";
import shiftRouter from "../modules/shift/router";
import authRouter from "../modules/authentication/router";


const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("src/pages/Login.vue")
      },
      {
        path: "/home",
        name: "home",
        component: () => import("src/pages/Home.vue")
      }
    ],
  },
  {
    path: "/producer",
    ...producerRouter,
  },
  {
    path: "/record",
    ...recordRouter,
  },
  {
    path: "/auth",
    ...authRouter,
  },
  {
    path: "/shift",
    ...shiftRouter,
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
