import axios from "axios";

const state = {
    userId: null,
    token: null,
}

const getters = {
    userId(state) {
        return state.userId
    },
    token(state) {
        return state.token
    }
}

const mutations = {
    setUser(state, payload) {
        state.userId = payload.userId
        state.token = payload.token
    }
}

const actions = {
    // Email Authentication
    async authByEmail(context, payload) {
        const mode = payload.mode // decides weather to post or get the data from the server
        let responseData = null //will store response from the api call
        let url = null 
        if (mode == 'signIn') {
            // for new user 
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-dtkS6bRU_SzPa4PrAggwpmVxf4cg7Jw"
        }
        else {
            // for existing user
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-dtkS6bRU_SzPa4PrAggwpmVxf4cg7Jw"
        }
        // api call
        const response = await axios.post(url, {
            data: JSON.stringify({
                email: [payload.email],
                password: [payload.password],
                returnSecureToken: true
            })
        })
        console.log(response.data)
        // storing data 
        responseData = await response.data
        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
        // logging response data
        console.log(responseData)
        // commiting the mutation 
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        })
    },
    // dispatching the actions for Email Auth
    async logIn(context, payload) {
        // for existing user
        return context.dispatch('authByEmail', {
            ...payload,
            mode: 'LogIn'
        })
    },

    async signIn(context, payload) {
        // for new user
        return context.dispatch('authByEmail', {
            ...payload,
            mode: 'signIn'
        })
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}