<template>
  <div>
    <f7-page name="voucher">
      <f7-navbar title="Voucher Detail" back-link></f7-navbar>

      <f7-toolbar position="bottom">
        <f7-block style="width: 100%" padding>
          <f7-button
            fill
            :loading="showPreloader"
            @click="useVoucher(f7route.params.id)"
            >Di klik oleh kasir </f7-button
          >
        </f7-block>
      </f7-toolbar>
      <f7-card class="bg-color-primary">
        <f7-card-content text-color="white">
          <h2 class="no-margin">Diskon {{ voucher.percentage }} {{f7route.route.path}}</h2>
          <small> Minimal Order Rp {{ fomatNumeric(voucher.minimum) }}</small>
          <br />
          <small>Berlaku sampai dengan {{ voucher.period }}</small>
        </f7-card-content>
      </f7-card>
      <f7-block>
        <p class="text-color-gray">
          <small>
            Cara menggunakan kupon : <br />
            - Kupon berlaku untuk pembayaran menggunakan
            {{ voucher.payment_type }}.<br />
            - Tunjukkan kupon ini ke kasir.<br />
            - Berlaku sampai {{ voucher.period }} <br />
            - Tidak berlaku untuk minuman harga spesial.<br />
            - Tidak dapat digabungkan dengan promo lainnya.<br />
            - Minuman harus diambil saat transaksi.<br />
          </small>
        </p>
      </f7-block>
    </f7-page>
  </div>
</template>
<script>
import { f7 } from "framework7-vue";
import { numeric } from "../js/function-helper";
export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      voucher: {},
      showPreloader: false,
    };
  },
  methods: {
    fomatNumeric(val) {
      return numeric(val);
    },
    loadVoucherDetail(id) {
      f7.preloader.show();
      this.axios
        .get(`vdiscount/get/${id}`)
        .then((res) => {
          f7.preloader.hide();

          this.voucher = res.data.content;
        })
        .catch((err) => {
          f7.preloader.hide();
        });
    },
    useVoucher(id) {
      f7.dialog.prompt("Cashier PIN", (pin) => {
        f7.preloader.show();
        this.axios
          .get(`vdiscount/redeem/${id}/${pin}`)
          .then((res) => {
            f7.preloader.hide();
            f7.toast
              .create({
                text: res.data.content,
                position: "bottom",
                closeTimeout: 2000,
                destroyOnClose: true,
              })
              .open();
            this.f7router.navigate("/");
          })
          .catch((err) => {
            f7.preloader.hide();
          });
      });
    },
  },
  mounted() {
    this.loadVoucherDetail(this.f7route.params.id);
  },
};
</script>
