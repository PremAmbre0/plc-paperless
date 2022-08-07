import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth.js";
import templates from "./modules/templates.js";
import datasets from "./modules/datasets.js";
import jobs from "./modules/jobs.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    templates,
    datasets,
    jobs
  },
});
