<template>
    <f7-page name="voucher">
      <f7-navbar title="Voucher"></f7-navbar>
      <tabbar :activeRoute="f7route.path" />
      <div v-for="item in voucher" :key="item.id">
        <f7-card @click.native="detailVoucher(item.id)">
          <f7-card-content>
            <f7-row class="align-items-center">
              <f7-col width="20">
                <f7-icon
                  class="text-color-gray"
                  size="35"
                  f7="ticket"
                ></f7-icon>
              </f7-col>
              <f7-col width="60">
                <strong class="text-color-primary"
                  >Diskon {{ item.percentage }}%</strong
                >
                <br />
                <small class="text-color-gray">
                  Min. Order Rp {{ formatNumeric(item.minimum) }}
                </small>
              </f7-col>
              <f7-col width="20" class="text-align-center">
                <f7-link>Redeem</f7-link>
              </f7-col>
            </f7-row>
          </f7-card-content>
        </f7-card>
      </div>
    </f7-page>
</template>
<script>
import { numeric } from "../js/function-helper";
import tabbar from '../components/Tabbar.vue'
export default {
  components: {
    tabbar
  },
  props: {
    f7route: Object,
  },
  data () {
    return {
      voucher: [],
    };
  },
  methods: {
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
    detailVoucher (id) {
      this.$f7router.navigate(`/voucher/${id}`)
    },
    formatNumeric (val) {
      return numeric(val);
    },
  },
  mounted () {
    this.loadVoucher();
  },
};
</script>
