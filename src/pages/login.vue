<template>
  <f7-page name="login" login-screen :page-content="true">
    <f7-login-screen-title> Login </f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        type="email"
        name="email"
        placeholder="Email"
        :autofocus="true"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        type="text"
        name="password"
        placeholder="Password"
        :value="password"
        @keypress.native.enter.prevent="login()"
        @input="password = $event.target.value"
      >
        <f7-icon f7="cart" slot="content-end"></f7-icon>
      </f7-list-input>
    </f7-list>
    <f7-block>
      <p class="text-align-right text-color-gray">
        <f7-link popup-open="#resetPassword">Forgot password ?</f7-link>
      </p>
    </f7-block>
    <f7-block>
      <f7-button
        :loading="true"
        large
        fill
        color="primary"
        @click.prevent="login()"
        >Login</f7-button
      >
    </f7-block>
    <f7-block-footer class="margin-top">
      Don't have an account ?
      <f7-link href="/signup">Sign Up</f7-link>
    </f7-block-footer>
    <!-- RESET PASSWORD -->
    <f7-popup id="resetPassword" @popup:close="resetForm" tablet-fullscreen>
      <f7-view>
        <f7-page class="bg-color-white">
          <f7-link icon-f7="multiply" class="float-right padding popup-close">
          </f7-link>
          <f7-block>
            <h1>Reset Password</h1>
          </f7-block>
          <f7-list form no-hairlines>
            <f7-list-input
              label="Email"
              type="email"
              name="email"
              placeholder="Your email"
              :value="emailToReset"
              @input="emailToReset = $event.target.value"
              @keypress.enter.prevent="!showPasswordForm ? sendOtp() : ''"
              required
            >
            </f7-list-input>
            <template v-if="showPasswordForm == true">
              <f7-list-input
                label="OTP"
                type="number"
                name="otp"
                placeholder="OTP"
                :value="otpToReset"
                @input="otpToReset = $event.target.value"
              ></f7-list-input>
              <f7-list-input
                label="Password"
                type="password"
                name="password"
                placeholder="Your password"
                :value="passwordToReset"
                @input="passwordToReset = $event.target.value"
                @keypress.enter.prevent="resetPassword()"
              ></f7-list-input>
            </template>
          </f7-list>
          <f7-block>
            <f7-button
              :loading="true"
              large
              fill
              @click="showPasswordForm ? resetPassword() : sendOtp()"
            >
              {{ showPasswordForm ? "Reset Password" : "Send OTP" }}
            </f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>
  </f7-page>
</template>
<script>
// import { useStore } from "framework7-vue";
// import store from "../store/store";
import { f7 } from "framework7-vue";
export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data () {
    return {
      username: "",
      password: "",
      emailToReset: "",
      passwordToReset: "",
      otpToReset: "",
      showPasswordForm: false,
      isLoading: false,
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
      let userLogin = {
        username: this.username,
        password: this.password,
        device: "",
      };
      f7.preloader.show();
      this.axios
        .post("/customer/login", userLogin)
        .then((res) => {
          f7.preloader.hide();
          let token = res.data.content.token;
          this.axios
            .get("/customer/get", {
              headers: {
                "X-Auth-Token": token,
              },
            })
            .then((res) => {
              let dataLogin = {
                token: token,
                dataUser: res.data.content,
              };
              f7.toast
                .create({
                  text: "Login Success",
                  position: "bottom",
                  closeTimeout: 2000,
                  destroyOnClose: true,
                })
                .open();
              this.axios.defaults.headers.common["X-Auth-Token"] = token;
              this.$store.dispatch("login", dataLogin);
              this.f7router.navigate("/");
            });
        })
        .catch((error) => {
          f7.preloader.hide();
          if (!error.response || error.response.status === 500) {
            f7.toast
              .create({
                text: "Please check your network connection!",
                position: "bottom",
                closeTimeout: 2000,
                destroyOnClose: true,
              })
              .open();
          } else {
            f7.toast
              .create({
                text: error.response.data.error,
                position: "bottom",
                closeTimeout: 2000,
                destroyOnClose: true,
              })
              .open();
          }
        });
    },
    sendOtp () {
      let username = {
        username: this.emailToReset,
      };
      if (this.emailToReset) {
        f7.preloader.show();

        this.axios
          .post("customer/req_otp", username)
          .then((res) => {
            f7.toast
              .create({
                text: res.data.content + " Check your inbox!",
                position: "bottom",
                closeTimeout: 2000,
                destroyOnClose: true,
              })
              .open();
            this.showPasswordForm = true;
            f7.preloader.hide();
          })
          .catch((err) => {
            f7.preloader.hide();
          });
      }
    },
    resetPassword () {
      let resetData = {
        username: this.emailToReset,
        new_password: this.passwordToReset,
        otp: this.otpToReset,
      };
      if (this.emailToReset) {
        f7.preloader.show();
        this.axios
          .post("customer/forgot", resetData)
          .then((res) => {
            f7.toast
              .create({
                text: res.data.content + " Please login again!",
                position: "bottom",
                closeTimeout: 2000,
                destroyOnClose: true,
              })
              .open();
            f7.popup.close("#resetPassword");
            f7.preloader.hide();
          })
          .catch((err) => {
            f7.preloader.hide();
          });
      }
    },
    resetForm () {
      this.emailToReset = "";
      this.passwordToReset = "";
      this.otpToReset = "";
      this.showPasswordForm = false;
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