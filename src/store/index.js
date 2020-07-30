import Vue from 'vue'
import Vuex from 'vuex'
import login from "@/store/modules/login";
import adminMenuList from "@/store/modules/adminMenuList";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {


  },
  mutations: {



  },
  actions: {
  },
  modules: {
    login,
    adminMenuList
  }
})
