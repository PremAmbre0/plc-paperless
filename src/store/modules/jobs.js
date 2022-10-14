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
		getJobsList: ({ commit, dispatch }, payload) => {
			let fail = (msg) => commit("failure", msg);
			return dispatch(
				"apiCall",
				{
					method: "get",
					params: payload,
					url: urlForAPIEndpoint + "?pageNo=1&limit=10",
				},
				{ root: true }
			)
				.then((data) => {
					return {
						ok: true,
						totalCount: data.totalCount,
						fetchCount: data.fetchCount,
						list: data.data,
					};
				})
				.catch((err) => {
					console.error("Err:", err);
					fail(err.toString() || "Failed to Load Jobs List");
					return { ok: false, totalCount: 0, fetchCount: 0, list: [] };
				});
		},
		getJobDetails: ({ commit, dispatch }, payload) => {
			let fail = (msg) => commit("failure", msg);
			return dispatch(
				"apiCall",
				{
					method: "get",
					url: urlForAPIEndpoint + "job-changelog/" + payload._id,
				},
				{ root: true }
			)
				.then((data) => {
					return {
						ok: true,
						jobDetails: data.data,
					};
				})
				.catch((err) => {
					console.error("Err:", err);
					fail(err.toString() || "Failed to Load Jobs List");
					return { ok: false, jobDetails: {} };
				});
		},
	},
	getters: {},
};
