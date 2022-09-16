import Vue from "vue";
import VueRouter from "vue-router";
import Templates from "../views/Templates.vue";
import Datasets from "../views/Datasets.vue";
import Dashboard from "../views/Dashboard.vue";
import Jobs from "../views/Jobs.vue";
import Builder from "../views/Builder.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/templates" },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/templates", name: 'templates', component: Templates },
  { path: "/datasets", name: 'datasets', component: Datasets },
  { path: "/jobs", name: 'jobs', component: Jobs },
  { path: "/builder/:id", name: 'builder', component: Builder },
];

const router = new VueRouter({
  routes,
});

export default router;
