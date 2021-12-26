import Vue from 'vue'
import Vuex from 'vuex'
import {
  setToken, getToken, removeToken, getDataUser, setDataUser, removeDataUser
} from '../js/localstorage-helper'
import axios from '../js/axios-helper';
Vue.use(Vuex)


const state = {
  isLoggedIn: !!(getToken()),
  dataUser: getDataUser() || null,
}
const actions = {
  login ({ commit, state }, DATA_LOGIN) {
    state.dataUser = DATA_LOGIN.dataUser
    state.isLoggedIn = true
    setToken(DATA_LOGIN.token)
    setDataUser(JSON.stringify(DATA_LOGIN.dataUser))
  },
  logout ({ commit, state }) {
    state.dataUser = null
    state.isLoggedIn = false
    removeToken()
    removeDataUser()
    delete axios.defaults.headers['X-Auth-Token']
  },
}

export default new Vuex.Store({
  state,
  actions
})