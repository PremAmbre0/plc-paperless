

const state = {
    fabricObjectCollection: []
}
const mutations = {
    addNewFabricObject(state, paylaod) {
        return state.fabricObjectCollection.push(paylaod)
    },
}
const actions = {
}
const getters = {
    fabricObjectCollection:(state) => state.fabricObjectCollection
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}