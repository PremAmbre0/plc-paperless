let urlForAPIEndpoint = "https://paperless-clone.herokuapp.com/v1/jobs/";
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
        submitJob: ({ commit, dispatch }, payload) => {
            console.log(payload)
            let form = new FormData();
            form.append("payload", JSON.stringify(payload));
            console.log(...form)
            let fail = (msg) => commit("failure", msg);
            return dispatch(
                "apiCall",
                {
                    method: "post",
                    data: form,
                    url: urlForAPIEndpoint,
                },
                { root: true }
            )
                .then((data) => {
                    commit("openSnackbar", {
                        text: "Job Submitted Successfully!",
                        type: "success",
                      }, { root: true });
                    return data;
                })
                .catch((err) => {
                    console.error("Err:", err);
                    commit("openSnackbar", {
                        text: "Failed to submit Job, try again!",
                        type: "error",
                      }, { root: true });
                    fail(err.toString() || "Failed to start Job");
                    return {
                        ok: false,
                        message: err.message,
                    };
                });
        },
    },
    getters: {},
};
