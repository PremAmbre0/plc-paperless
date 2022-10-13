let urlForAPIEndpoint = "https://paperless-clone.herokuapp.com/v1/datasets/";

const initialState = () => ({});
export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    failure: (s, msg) => {
      console.error("[failure] ", msg);
    },
    resetState(state) {
      const initial = initialState();
      Object.keys(initial).forEach((key) => {
        state[key] = initial[key];
      });
    },
  },
  actions: {
    getDatasetsList: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "get",
          params: payload,
          url: urlForAPIEndpoint,
        },
        { root: true }
      )
        .then((data) => {
          return {
            totalCount: data.totalCount,
            fetchCount: data.fetchCount,
            list: data.data,
          };
        })
        .catch((err) => {
          commit("openSnackbar", {
            text: "Something went wrong, refresh the page!",
            type: "error",
          }, { root: true });
          console.error("Err:", err);
          fail(err.toString() || "Failed to Load Datasets List");
          return { totalCount: 0, fetchCount: 0, list: [] };
        });
    },
    uploadDataset: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCallWithHeaderConfig",
        {
          partConfig: {
            method: "post",
            data: payload,
            url: urlForAPIEndpoint,
          },
          headerConfig: {
            "Content-Type": "multipart/form-data",
          },
        },
        { root: true }
      )
        .then(() => {
          commit("openSnackbar", {
            text: "Dataset Uploaded Successfully",
            type: "success",
          }, { root: true });
          return null;
        })
        .catch((err) => {
          console.error("Err:", err);
          commit("openSnackbar", {
            text: "Failed to upload Dataset, try again!",
            type: "error",
          }, { root: true });
          fail(err.toString() || "Failed to upload dataset file");
          return new Error(err.message);
        });
    },

    deleteDataset: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "delete",
          url: urlForAPIEndpoint + payload._id,
        },
        { root: true }
      )
        .then(() => {
          commit("openSnackbar", {
            text: "Dataset deleted successfully!",
            type: "success",
          }, { root: true });
          return null;
        })
        .catch((err) => {
          console.error("Err:", err);
          commit("openSnackbar", {
            text: "Failed to delete dataset",
            type: "error",
          }, { root: true });
          fail(err.toString() || "Failed to Delete Dataset");
          return new Error(err.message);
        });
    },
    getDatasetData: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "get",
          url: urlForAPIEndpoint + payload._id,
        },
        { root: true }
      )
        .then((data) => {
          return {
            ok: true,
            rows: data.data,
          };
        })
        .catch((err) => {
          console.error("Err:", err);
          fail(err.toString() || "Failed to Load Datasets Data");
          commit("openSnackbar", {
            text: "Something went wrong , refresh the page!",
            type: "error",
          }, { root: true });
          return { ok: false, rows: [] };
        });
    },
  },
  getters: {},
};
