import Vue from "vue";
import VueRouter from "vue-router";
import Templates from "../views/Templates.vue";
import Datasets from "../views/Datasets.vue";
import Dashboard from "../views/Dashboard.vue";
import Jobs from "../views/Jobs.vue";



Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/templates' },
  { path: '/dashboard', component: Dashboard },
  { path: '/templates', component: Templates },
  { path: '/datasets', component: Datasets },
  { path: '/jobs', component: Jobs }

];

const router = new VueRouter({
  routes,
});

export default router;
