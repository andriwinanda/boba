import axios from 'axios'
import { f7 } from "framework7-vue";
import { getToken } from './localstorage-helper'


let myAxios = axios.create();
let url = "https://api.geelaboba.com/"

if (getToken()) {
  myAxios.defaults.headers.common["X-Auth-Token"] = getToken();
}
if (url) {
  myAxios.defaults.baseURL = url
}


myAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error) {
    if (!error.response || error.response.status === 500) {
      console.log("Connection Lost!", "Please check your network connection!");
    }
    else{
      f7.toast
      .create({
        text: error.response.data.error,
        position: "bottom",
        closeTimeout: 2000,
        destroyOnClose: true,
      })
      .open();
    }
  }
  return Promise.reject(error)
})

export default myAxios
