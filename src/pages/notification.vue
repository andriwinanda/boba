<template>
  <div>
    <f7-page name="voucher">
      <f7-navbar title="Notification" back-link></f7-navbar>

      <f7-card @click="detailNotif()">
        <f7-card-content>
          <h3 class="no-margin">
            <strong class="text-color-primary">Dapatkan Promo Terbaik </strong>
          </h3>
          <small class="text-color-gray"> 2 Hours ago</small>
        </f7-card-content>
      </f7-card>

      <!-- Popup -->
      <f7-popup
        class="demo-popup"
        tablet-fullscreen
        :opened="popupOpened"
        @popup:closed="popupOpened = false"
      >
        <f7-page>
          <f7-navbar title="Detail Notification" no-hairline no-shadow>
            <f7-nav-right>
              <f7-link popup-close icon-f7="multiply" />
            </f7-nav-right>
          </f7-navbar>
          <f7-toolbar position="bottom">
            <f7-block style="width: 100%" padding>
              <f7-button fill @click="popupOpened = false"> Close </f7-button>
            </f7-block>
          </f7-toolbar>
          <f7-block>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
              optio architecto repudiandae quam quo sint, harum, odit
              consequuntur dignissimos voluptates maiores? Officia rem animi
              maiores! Doloremque facilis voluptatem totam ullam!
            </p>
          </f7-block>
        </f7-page>
      </f7-popup>
    </f7-page>
  </div>
</template>
<script>
export default {
  data() {
    return {
      voucher: [],
      popupOpened: false,
    };
  },
  methods: {
    loadNotif() {
      this.axios
        .post(`vdiscount`, {
          limit: "10",
          publish: "1",
        })
        .then((res) => {
          this.voucher = res.data.content.result;
        })
        .catch((err) => {});
    },
    detailNotif() {
      this.popupOpened = true;
    },
  },
  mounted() {
    this.loadNotif();
  },
};
</script>
