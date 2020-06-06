import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        nama: "farid lagi nginep di rumah nenek",
        login_status: "logout",
        user_name: null,
        user_id: null,
        user_role: null,
        queriesResult: null
    },
    mutations:{
        userLogin(state){
            state.login_status = "login"
        },
        userLogout(state){
            state.login_status = "logout"
        }
    },
    getters:{

    }
})