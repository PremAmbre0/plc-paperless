import Vue from "vue";
import VueRouter from "vue-router";
import paperless from "../views/Paperless.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "paperless",
    component: paperless,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
