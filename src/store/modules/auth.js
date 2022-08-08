// import axios from "axios";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-dtkS6bRU_SzPa4PrAggwpmVxf4cg7Jw",
    authDomain: "paperless-29809.firebaseapp.com",
    projectId: "paperless-29809",
    storageBucket: "paperless-29809.appspot.com",
    messagingSenderId: "179600602377",
    appId: "1:179600602377:web:a535345e21316275c84fd8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const state = {
    userId: null,
    idToken: null,
}

const getters = {
    userId(state) {
        return state.userId
    },
    token(state) {
        return state.idToken
    }
}

const mutations = {
    setUser(state, payload) {
        state.userId = payload.userId
        state.idToken = payload.idToken
        console.log(state)
    }
}

const actions = {
    // Email Authentication
    signUpByEmail(context, payload) {
        createUserWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // commmiting the setUser to update state
                context.commit('setUser', {
                    userId: user.uid,
                    idToken: user.accessToken
                })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage)
            });
    },
    signInByEmail(context, payload) {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // commmiting the setUser to update state
                context.commit('setUser', {
                    userId: user.uid,
                    idToken: user.accessToken
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage)
            });
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}