// import axios from 'axios';

const state = {
    templates: [
        {
            "name": "test",
            "imageUrl": "https://picsum.photos/200/300",
            "createdOn": "2022-06-18T07:28:40.218Z",
            "updatedOn": "2022-06-18T07:28:40.218Z",
        },
        {
            "name": "test",
            "imageUrl": "https://picsum.photos/200/300",
            "createdOn": "2022-06-18T07:28:40.218Z",
            "updatedOn": "2022-06-18T07:28:40.218Z",
        },
        {
            "name": "test",
            "imageUrl": "https://picsum.photos/200/300",
            "createdOn": "2022-06-18T07:28:40.218Z",
            "updatedOn": "2022-06-18T07:28:40.218Z",
        },
        {
            "name": "test",
            "imageUrl": "https://picsum.photos/200/300",
            "createdOn": "2022-06-18T07:28:40.218Z",
            "updatedOn": "2022-06-18T07:28:40.218Z",
        },
        {
            "name": "test",
            "imageUrl": "https://picsum.photos/200/300",
            "createdOn": "2022-06-18T07:28:40.218Z",
            "updatedOn": "2022-06-18T07:28:40.218Z",
        },


    ]

}

const getters = {
    templates(state) {
        return state.templates
    }

}

const mutations = {
    // setTemplates(state, payload) {
    //     state.templates = payload
    // }

}

const actions = {
    // apiCall(context, payload) {
    //     let response = await axios(...payload)
    //     let data = response.data
    //     console.log(data)
    // },
    // getTemplates(context) {
    //     const payload={
    //         methods:'GET',
    //         url:'https://paperless-clone.herokuapp.com/v1/templates/?pageNo=1&pageSize=10&searchText=temp'
    //     }
    // }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}