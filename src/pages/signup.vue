<template>
  <f7-page name="signup" login-screen :page-content="true">
    <f7-login-screen-title> Sign Up </f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        type="text"
        name="Name"
        placeholder="Name"
        :autofocus="true"
        :value="userData.tname"
        @input="userData.tname = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        type="email"
        name="Email"
        placeholder="Email"
        :autofocus="true"
        :value="userData.temail"
        @input="userData.temail = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        type="password"
        name="password"
        placeholder="Password"
        :value="userData.tpassword"
        @keypress.enter.prevent="login()"
        @input="userData.tpassword = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        type="number"
        name="Phone Number"
        placeholder="Phone Number"
        :autofocus="true"
        :value="userData.tphone1"
        @input="userData.tphone1 = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        type="text"
        name="Address"
        placeholder="Address"
        :autofocus="true"
        :value="userData.taddress"
        @input="userData.taddress = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        type="text"
        name="Zip"
        placeholder="Zip"
        :autofocus="true"
        :value="userData.tzip"
        @input="userData.tzip = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        type="text"
        name="City"
        placeholder="City"
        :autofocus="true"
        :value="userData.ccity"
        @input="userData.ccity = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        type="text"
        name="District"
        placeholder="District"
        :autofocus="true"
        :value="userData.cdistrict"
        @input="userData.cdistrict = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-block>
      <f7-button large fill color="primary" @click.prevent="login()">
        Sign Up
      </f7-button>
    </f7-block>
    <f7-block-footer class="margin-top">
      Already have an account ?
      <f7-link href="/login">Login</f7-link>
    </f7-block-footer>
  </f7-page>
</template>
<script>
import { useStore } from "framework7-vue";
import { urlEncoded } from "../js/function-helper";
import { f7 } from "framework7-vue";
export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data () {
    return {
      userData: {
        tname: "",
        temail: "",
        tphone1: "08",
        tpassword: "",

        taddress: "",
        tzip: '',
        ccity: "",
        cdistrict: "",
      }
    };
  },
  setup () {
    // const login = () => {
    //   store.dispatch("addProduct", {
    //     id: "4",
    //     title: "Apple iPhone 12",
    //     description:
    //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
    //   });
    // };
    // return {
    //   login,
    // };
  },
  methods: {
    login () {
      console.log(urlEncoded(this.userData))
      f7.dialog.preloader();
      this.axios
        .post("/customer/add", urlEncoded(this.userData), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then((res) => {
          f7.dialog.close();
          let token = res.data.content.token;
          // this.axios
          //   .get("/customer/get", {
          //     headers: {
          //       "X-Auth-Token": token,
          //     },
          //   })
          //   .then((res) => {
          let dataLogin = {
            token: token,
            // dataUser: res.data.content,
          };
          f7.toast
            .create({
              text: "Register Success, Please Login!!",
              position: "bottom",
              closeTimeout: 2000,
              destroyOnClose: true,
            })
            .open();
          // });
        })
        .catch((error) => {
          f7.dialog.close();
          if (!error.response || error.response.status === 500) {
            f7.dialog.alert(
              "Please check your network connection!",
              "Connection Lost!"
            );
          } else if (error.response.status === 404) {
            f7.dialog.alert("Username/password incorrect", "Incorrect");
          }
        });
    },
  },
};
</script>
<style>
.center-wrapper {
  height: 80vh;
  display: flex;
}
</style>