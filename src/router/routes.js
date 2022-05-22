import producerRouter from "../modules/producer/router";
import userRouter from "../modules/user/router";
import sectionRouter from "../modules/section/router";
import shiftRouter from "../modules/shift/router";

// guards
import isAuthenticatedGuard from "../modules/authentication/router/auth-guard";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        beforeEnter: [isAuthenticatedGuard],
        component: () => import("src/pages/Home.vue")
      },
      {
        path: "/login",
        name: "login",
        component: () => import("src/pages/Login.vue")
      },
    ],
  },
  {
    path: "/producer",
    beforeEnter: [isAuthenticatedGuard],
    ...producerRouter,
  },
  {
    path: "/user",
    beforeEnter: [isAuthenticatedGuard],
    ...userRouter,
  },
  {
    path: "/section",
    beforeEnter: [isAuthenticatedGuard],
    ...sectionRouter,
  },
  {
    path: "/shift",
    beforeEnter: [isAuthenticatedGuard],
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
