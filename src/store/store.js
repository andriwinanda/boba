import Vue from 'vue'
import Vuex from 'vuex'
import {
  setToken, getToken, removeToken, getDataUser, setDataUser, removeDataUser, getBag, addToBag, removeBag,
} from '../js/localstorage-helper'
import { f7 } from "framework7-vue";
Vue.use(Vuex)


const state = {
  isLoggedIn: !!(getToken()),
  dataUser: getDataUser() || null,
  bag: [],
}
if (state.isLoggedIn && getBag()) state.bag = getBag() || []

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
    removeBag()
  },

  addtobag (state, item) {
    let index = state.state.bag.findIndex(el => el.sku === item.sku);

    if (index >= 0) {
      state.state.bag[index].qty = item.qty
      // state.bag[index].stock = item.stock
      state.state.bag[index].totalPrice = state.state.bag[index].price * item.qty
    } else {
      state.state.bag.push(item)
    }
    // let data = [{ "id":"770","sku": "CMH08-GLD", "name": "roller type r (roda 4 s80)", "currency": "IDR", "min": 1, "stock": 5, "qty": 5, "price": 0, "totalPrice": 0 }, {  "id":"771","sku": "KRT07-DI", "name": "door bumper (stoper handle)", "currency": "IDR", "min": "2", "stock": 100, "qty": 13, "price": 15000, "totalPrice": 195000 }, {  "id":"236","sku": "CW5012-TW", "name": "TULANG SUDUT 135", "currency": "", "min": 1, "stock": 18, "qty": 9, "price": 0, "totalPrice": 0 }]
    addToBag(JSON.stringify(state.state.bag))
    f7.toast
      .create({
        text: "Added to bag",
        closeTimeout: 2000,
        destroyOnClose: true,
      })
      .open();

  },
  resetbag (state) {
    state.bag = []
    addToBag(state.dataUser.userid, JSON.stringify(state.bag))
  }
}

export default new Vuex.Store({
  state,
  actions
})