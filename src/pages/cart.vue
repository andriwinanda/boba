<template>
  <f7-page name="cart">
    <f7-navbar title="Cart"></f7-navbar>
    <tabbar :activeRoute="f7route.path" />
    <div
      v-for="item in bag"
      :key="item.sku"
      class="
        display-flex
        padding
        justify-content-space-between
        align-items-center
      "
    >
      <div>
        <b style="font-size: 16px" class="capitalized">{{ item.name || "" }}</b>
        <p>
          {{ item.currency }}
          <numeric :value="item.price" />
        </p>
      </div>
      <div>
        <f7-stepper
          :min="1"
          :value="item.qty"
          @stepper:change="updateBag(item.sku, $event, item.stock)"
          raised
          large
        ></f7-stepper>
      </div>
    </div>
    <f7-block>
      <f7-row class="padding-bottom">
        <f7-col>
          <div style="font-size: 18px">
              <b>Total:</b>
            </div>
        </f7-col>
        <f7-col class="text-align-right">
            Rp
            <b style="font-size: 22px">
              <numeric :value="totalPrice" />
            </b>
        </f7-col>
      </f7-row>
      <f7-button large fill @click="pay()">
        Make Payment
        </f7-button>
    </div>
    </f7-block>
  </f7-page>
</template>
<script>
import { numeric } from "../js/function-helper";
import tabbar from '../components/Tabbar.vue'
import { mapState } from "vuex";

export default {
  components: {
    tabbar
  },
  props: {
    f7route: Object,
  },
  data () {
    return {
    };
  },
  methods: {
    updateBag (sku, qty) {
      let data = {
        sku: sku,
        qty: qty,
      };
      this.$store.dispatch("addtobag", data);
    },
     pay (id, val) {
      let data = {};
      data.orderid = "";
      data.log = this.log;
      data.payment = id;
      data.items = this.bag;
      this.$f7.dialog.preloader();
      this.axios
        .post("/pos/add_multiple", data)
        .then((res) => {
          this.$store.commit("login/resetbag");
          this.$f7.dialog.close();
          this.$f7.dialog.alert("Payment success", "Success");
          this.beforeAddSheet = false;
          this.bagSheet = false;
        })
        .catch((err) => {
          this.$f7.dialog.close();
          this.$f7.dialog.alert(err, "Error");
        });
    },
  },
  mounted () {
  },
  computed: {
    ...mapState({
      bag: (state) => state.bag,
    }),
    totalPrice () {
      let total = 0;
      if (this.bag) {
        this.bag.map((el) => {
          total += el.totalPrice;
        });
      }
      return total;
    },
   
  }
};
</script>
