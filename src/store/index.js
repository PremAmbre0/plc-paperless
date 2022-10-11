import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import templates from "./modules/templates.js";
import datasets from "./modules/datasets.js";
import builder from "./modules/builder.js";

Vue.use(Vuex);
const initialState = () => ({
  loaderDialog: false,
  snackbarState: false,
  snackbarText: "",
  snackbarTime: 2000,
  currentState: {},
  messages: {
    loginFailed: "",
    failure: "",
  },
  uploadPercentage: 0,
  showDialogForm: false,
  showOverlayLoader: false,
});

let apiErrorFunction = ({ err, commit, reject }) => {
  console.log("[HTTP API Request Error]", err);
  if (err.message == "Network Error") {
    commit("openSnackbar", { text: "Network Error" });
    console.error("Network Error");
    commit("closeLoaderDialog");
  } else if (err.response && err.response.status == 401) {
    localStorage.clear();
    commit("resetState");
  } else if (err.response && err.response.status == 400) {
    commit("openSnackbar", {
      text: err.response.data.message || "Request Failed, please try again",
    });
  } else if (err.response && err.response.status == 500) {
    console.error("Internal SERVER ERROR");
  } else {
    commit("openSnackbar", {
      text: "Request Failed, please try again",
    });
  }
  let errMsg = "";
  try {
    errMsg = err.response.data.message;
    if (typeof errMsg == "object") {
      errMsg = errMsg[Object.keys(errMsg)[0]];
    }
  } catch (e) {
    console.log(e);
  }
  reject({
    ok: false,
    err,
    message: errMsg || "Request Failed, please try again",
  });
};

export default new Vuex.Store({
  strict: true,
  state: initialState(),
  mutations: {
    openLoaderDialog(state) {
      state.loaderDialog = true;
    },
    closeLoaderDialog(state) {
      state.loaderDialog = false;
    },
    openSnackbar(state, { text = "", time = 5000 } = {}) {
      state.snackbarTime = time;
      state.snackbarText = text;
      state.snackbarState = true;
    },
    closeSnackbar(state) {
      state.snackbarState = false;
    },
    clearUploadPercentage(state) {
      state.uploadPercentage = 0;
    },
    setUploadPercentage(state, { uploadStatus }) {
      state.uploadPercentage = uploadStatus;
    },
    failure: (state, p) => {
      state.messages.failure = p;
    },

    loginFail: (state, p) => {
      state.messages.loginFailed = p;
    },
    openDialogForm(state) {
      state.showDialogForm = true;
    },
    closeDialogForm(state) {
      state.showDialogForm = false;
    },
    // logoutFail: (state, p) => {
    //   console.log("logged out");
    // },
    openOverlayLoader(state) {
      state.showOverlayLoader = true;
    },
    closeOverlayLoader(state) {
      state.showOverlayLoader = false;
    },
    resetState(state) {
      const initial = initialState();
      Object.keys(initial).forEach((key) => {
        state[key] = initial[key];
      });
    },
  },
  actions: {
    apiCallWithHeaderConfig({ commit }, { partConfig, headerConfig }) {
      return new Promise((resolve, reject) => {
        this._vm.$auth
          .getTokenSilently()
          .then((token) => {
            if (!token) {
              throw "no auth token found";
            }
            axios({
              ...partConfig,
              headers: {
                ...headerConfig,
                Authorization: "Bearer " + token,
              },
              onUploadProgress: function (progressEvent) {
                commit("setUploadPercentage", {
                  uploadStatus: parseInt(
                    Math.round(
                      (progressEvent.loaded / progressEvent.total) * 100
                    )
                  ),
                });
              },
            })
              .then((response) => {
                let data = response.data;
                resolve(data);
                commit("clearUploadPercentage");
              })
              .catch((err) => {
                commit("clearUploadPercentage");
                apiErrorFunction({ err, commit, reject });
              });
          })
          .catch((err) => {
            apiErrorFunction({ err, commit, reject });
          });
      });
    },
    apiCallWithoutAuth({ commit }, { partConfig, headerConfig }) {
      return new Promise((resolve, reject) => {
        axios({
          ...partConfig,
          headers: {
            ...headerConfig,
          },
          onUploadProgress: function (progressEvent) {
            commit("setUploadPercentage", {
              uploadStatus: parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              ),
            });
          },
        })
          .then((response) => {
            resolve(response);
            commit("clearUploadPercentage");
          })
          .catch((err) => {
            commit("clearUploadPercentage");
            apiErrorFunction({ err, commit, reject });
          });
      });
    },
    apiCall({ commit }, partConfig) {
      return new Promise((resolve, reject) => {
        // console.log(commit)
        commit("openOverlayLoader");
        this._vm.$auth
          .getTokenSilently()
          .then((token) => {
            if (!token) {
              throw "no auth token found";
            }
            axios({
              ...partConfig,
              headers: {
                Authorization: "Bearer " + token,
              },
            })
              .then((response) => {
                let data = response.data;
                resolve(data);
                commit("closeOverlayLoader");
              })
              .catch((err) => {
                apiErrorFunction({ err, commit, reject });
                commit("closeOverlayLoader");
              });
          })
          .catch((err) => {
            apiErrorFunction({ err, commit, reject });
            commit("closeOverlayLoader");
          });
      });
    },
    fileDownload_API_Call({ state, commit }, partConfig) {
      return new Promise((resolve, reject) => {
        this._vm.$auth
          .getTokenSilently()
          .then((token) => {
            axios({
              ...partConfig,
              headers: {
                Authorization: "Bearer " + token,
              },
              onDownloadProgress: (progressEvent) => {
                console.log(progressEvent);
                console.log((progressEvent.loaded * 100) / progressEvent.total);
              },
            })
              .then((response) => {
                let data = response.data;
                resolve({ data, response });
              })
              .catch((err) => apiErrorFunction({ err, commit, reject }));
          })
          .catch((err) => {
            apiErrorFunction({ err, commit, reject });
          });
        if (!state.auth) {
          throw "no auth token found";
        }
      });
    },
    downloadFile(context, payload) {
      axios({
        url: payload.url,
        method: 'GET',
        responseType: 'blob',
      })
        .then((response) => {
          // create file link in browser's memory
          const href = URL.createObjectURL(response.data);

          // create "a" HTLM element with href to file & click
          const link = document.createElement('a');
          link.href = href;
          link.setAttribute('download', payload.name); //or any other extension
          document.body.appendChild(link);
          link.click();

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        })
    },
    // uploadImageToGDrive: async ({ commit, dispatch }, payload) => { },
  },
  getters: {
    loaderDialog: (state) => state.loaderDialog,
    snackbarState: (state) => state.snackbarState,
    snackbarText: (state) => state.snackbarText,
    snackbarTime: (state) => state.snackbarTime,
    uploadPercentage: (state) => state.uploadPercentage,
    currentState: (state) => state.currentState,
    showDialogForm: (state) => state.showDialogForm,
    showOverlayLoader: (state) => state.showOverlayLoader,
  },
  modules: {
    templates,
    datasets,
    builder,
  },
});
