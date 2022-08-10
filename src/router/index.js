import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../views/Auth.vue";
import Templates from "../views/Templates.vue";
import Datasets from "../views/Datasets.vue";
import Dashboard from "../views/Dashboard.vue";
import Jobs from "../views/Jobs.vue";
import Test from "../views/Test.vue";


Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: Auth },
  { path: '/dashboard', component: Dashboard },
  { path: '/templates', component: Templates },
  { path: '/datasets', component: Datasets },
  { path: '/jobs', component: Jobs }

];

const router = new VueRouter({
  routes,
});

export default router;
