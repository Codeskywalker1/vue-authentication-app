import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../Firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/registro1",
      name: "registro1",
      component: () => import("../views/Registro1View.vue"),
    },
    {
      path: "/registro2",
      name: "registro2",
      component: () => import("../views/Registro2View.vue"),
    },
    {
      path: "/registro3",
      name: "registro3",
      component: () => import("../views/Registro3View.vue"),
    },
    {
      path: "/rutina",
      name: "rutina",
      component: () => import("../views/RutinaView.vue"),
    },
    {
      path: "/dieta",
      name: "dieta",
      component: () => import("../views/DietaView.vue"),
    },
    {
      path: "/citas",
      name: "citas",
      component: () => import("../views/CitasView.vue"),
    },
    {
      path: "/clientes",
      name: "clientes",
      component: () => import("../views/ClientesView.vue"),
    },
    {
      path: "/asignarrutina",
      name: "asignarrutina",
      component: () => import("../views/AsignarRutinaView.vue"),
    },
    {
      path: "/asignardieta",
      name: "asignardieta",
      component: () => import("../views/AsignarDietaView.vue"),
    },
    {
      path: "/ejercicios",
      name: "ejercicios",
      component: () => import("../views/EjerciciosView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/ranking",
      name: "ranking",
      component: () => import("../views/RankingView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(
    "Este es to" + to.path,
    "Este es from" + from,
    "Este es next" + next.path
  );
  if (to.path === "/login" && auth.currentUser) {
    next("/dashboard");
  } else if (
    to.matched.some((record) => record.meta.auth) &&
    !auth.currentUser
  ) {
    next("/login");
  } else {
    next();
  }
});
export default router;
