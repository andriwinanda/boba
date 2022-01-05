<template>
  <f7-page>
    <tabbar :activeRoute="f7route.path" />
    <f7-popup
      class="flash-banner"
      :opened="popupOpened"
      @popup:closed="popupOpened = false"
      backdrop
      no-navbar
      close-by-backdrop-click
      :tablet-fullscreen="false"
    >
      <f7-block class="text-align-center banner-wrapper">
        <f7-link popup-close class="close-banner">
          <f7-chip outline class="no-padding-right" media-bg-color="primary">
            <f7-icon slot="media" f7="multiply"></f7-icon>
          </f7-chip>
        </f7-link>
        <img :src="photo" alt="" />
      </f7-block>
    </f7-popup>

    <!-- Page content-->
    <f7-swiper pagination :speed="500">
      <f7-swiper-slide v-for="slide in slider" :key="slide.id">
        <img class="slider-image" :src="slide.image" alt="" />
      </f7-swiper-slide>
    </f7-swiper>

    <template v-if="voucher">
      <f7-block-title class="no-margin-bottom margin-top">
        Voucher
        <f7-link class="float-right text-color-gray" href="/voucher">
          <small>lihat semua</small>
        </f7-link>
      </f7-block-title>
      <f7-swiper
        class="voucher-slide"
        data-pagination='{"el": ".swiper-pagination"}'
        slidesPerView="auto"
        data-centered-slides
        :spaceBetween="0"
      >
        <f7-swiper-slide v-for="item in voucher" :key="item.id">
          <f7-card
            @click.native="$f7router.navigate('/voucher', { history: true })"
          >
            <f7-card-content>
              <f7-row class="align-items-center">
                <f7-col width="70">
                  <strong class="text-color-primary"
                    >Diskon {{ item.percentage }}%</strong
                  >
                  <br />
                  <small class="text-color-gray">
                    Min. Order Rp {{ formatNumeric(item.minimum) }}
                  </small>
                </f7-col>
                <f7-col width="30" class="text-align-center">
                  <f7-icon
                    class="text-color-gray"
                    size="35"
                    f7="ticket"
                  ></f7-icon>
                </f7-col>
              </f7-row>
            </f7-card-content>
          </f7-card>
        </f7-swiper-slide>
      </f7-swiper>
    </template>

    <f7-block-title class="align-items-center display-flex">
      <p class="padding-right">Promo Hari Ini</p>

      <Timer
        v-if="timer"
        :seconds="timer.seconds"
        :minutes="timer.minutes"
        :hours="timer.hours"
        :days="timer.days"
      />
    </f7-block-title>

    <f7-block>
      <f7-row class="align-items-stretch">
        <f7-col width="50" v-for="item in productList" :key="item.id">
          <product
            @click.native="loadProductDetail(item.id)"
            :title="item.name"
            :image="item.image"
            :itemPrice="item.price"
            :itemDiscount="item.discount || 0"
          />
        </f7-col>
      </f7-row>
    </f7-block>

    <!-- PRODUCT DETAIL -->
    <product-sheet
      :isOpened="isProductOpened"
      :product="productDetail"
      @closeProduct="closeProduct()"
    />
  </f7-page>
</template>
<script>
const limit = 10;
import product from "../components/product.vue";
import { numeric } from "../js/function-helper";
import productSheet from "../components/productSheet.vue";
import Timer from "../components/timer.vue";
import Digit from "../components/digit.vue";
import { f7 } from "framework7-vue";
import tabbar from "../components/Tabbar.vue";
import countdown from "countdown";

// import { useTimer } from "vue-timer-hook";
export default {
  components: { product, productSheet, Timer, Digit, tabbar, countdown },
  props: {
    f7route: Object,
    f7router: Object,
  },
  data () {
    return {
      popupOpened: false,
      showPreloader: true,
      slider: [],
      voucher: [],
      productList: [],
      productOffset: 0,
      productRecord: 0,
      isProductOpened: false,
      productDetail: {},
      timer: null,
      activeRoute: "",
      photo: "https://static.disqonin.com/uploads/img/8-2021/1630370794869-promo-kopi-kenangan-promo-kenangan-hanya-rp-.jpg",
    };
  },
  methods: {
    loadSlider () {
      this.axios
        .get(`slider`)
        .then((res) => {
          this.slider = res.data.content.result;
          // this.$refs.standalone.open()
        })
        .catch((err) => { });
    },
    loadVoucher () {
      this.axios
        .post(`vdiscount`, {
          limit: "10",
          publish: "1",
        })
        .then((res) => {
          this.voucher = res.data.content.result;
        })
        .catch((err) => { });
    },
    loadProduct () {
      let data = {
        limit: limit,
        offset: this.productOffset,
        publish: 1,
        recommend: 1,
      };
      this.showPreloader = true;
      this.axios
        .post(`product`, data)
        .then((res) => {
          this.showPreloader = false;
          let productItem = res.data.content;
          if (productItem.result) {
            productItem.result.map((el) => {
              this.productList.push(el);
            });
          } else this.productList = [];
          this.productRecord = productItem.record;
        })
        .catch((err) => {
          this.showPreloader = false;
        });
    },
    loadProductDetail (id) {
      f7.preloader.show();
      this.axios
        .get(`product/get/${id}`)
        .then((res) => {
          f7.preloader.hide();

          this.productDetail = res.data.content;
          this.isProductOpened = true;
        })
        .catch((err) => {
          f7.preloader.hide();
        });
    },
    closeProduct () {
      this.productDetail = {};
      this.isProductOpened = false;
    },
    formatNumeric (val) {
      return numeric(val);
    },
  },
  mounted () {
    this.loadSlider();
    this.loadProduct();
    this.loadVoucher();
    var time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    var timespan = countdown(time,
      (ts) => {
        this.timer = ts
      },
    );
    this.popupOpened = true;
  },
};
</script>
<style>
.flash-banner {
  background: none;
}
.flash-banner .banner-wrapper {
  margin-top: 20vh;
  position: relative;
}
.flash-banner img {
  width: 300px;
  margin: 0 auto;
}
.flash-banner .close-banner {
  position: absolute;
  right: 0;
  top: -25px;
  left: 310px;
  float: right;
}
</style>