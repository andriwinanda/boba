<template>
  <f7-sheet
    :opened="isOpened"
    @sheet:closed="$emit('closeProduct')"
    swipe-to-close
    tablet-fullscreen
    backdrop
    style="height: auto"
  >
    <f7-page-content>
      <f7-block>
        <img style="width: 100%" :src="product.image" alt="" />
        <h2 class="no-margin-bottom">
          <b class="product-title">{{ product.name }}</b>
        </h2>
        <p>
          Rp
          {{
            formatNumeric(
              product.price - product.price * (product.itemDiscount || 0)
            )
          }}
        </p>
        <p class="no-margin-vertical" v-if="product.itemDiscount">
          <del>Rp {{ formatNumeric(product.price) }}</del> •
          <span class="text-color-red"
            >{{ product.itemDiscount * 100 }}% OFF</span
          >
        </p>
        <p class="text-color-gray">
          <strong>Description</strong> <br />
          {{ product.description || "-" }}
        </p>
        <f7-row>
          <f7-col>
            <f7-stepper
              :min="1"
              @stepper:change="qty = $event"
              :value="qty"
              raised
              large
            ></f7-stepper>
          </f7-col>
          <f7-col>
            <f7-button large fill @click="addToBag(product)"
              >Add To Bag</f7-button
            >
          </f7-col>
        </f7-row>
      </f7-block>
    </f7-page-content>
  </f7-sheet>
</template>
<script>
import { numeric } from "../js/function-helper";

export default {
  props: ["isOpened", "product"],
  data () {
    return {
      qty: 1
    }
  },
  methods: {
    formatNumeric (val) {
      return numeric(val);
    },
    addToBag (product) {
      let data = {
        // id: product.item.id,
        sku: product.sku,
        name: product.name,
        tax: product.tax || 0,
        currency: product.currency,
        min: product.min ? product.min : 1,
        qty: parseInt(this.qty),
        price: product.price,
        totalPrice: product.price * product.qty,
      };
      this.$store.dispatch("addtobag", data);
      this.beforeAddSheet = false;
      this.qty = 1
    },
  },
};
</script>