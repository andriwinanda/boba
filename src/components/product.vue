<template>
  <f7-card class="no-margin-horizontal margin-bottom product-thumb">
    <f7-card-content>
      <img :src="image" alt="" />
      <p class="no-margin-bottom">
        <b class="product-title">{{ title }}</b>
      </p>
      <p>
        Rp {{ fomatNumeric(itemPrice - itemPrice * (itemDiscount || 0)) }}
      </p>
      <p class="no-margin-vertical" v-if="itemDiscount">
        <del>Rp {{ fomatNumeric(itemPrice) }}</del> •
        <span class="text-color-red">{{ itemDiscount * 100 }}% OFF</span>
      </p>
    </f7-card-content>
  </f7-card>
</template>
<script>
import { numeric } from "../js/function-helper";
export default {
  props: ["title", "image", "itemPrice", "itemDiscount", "priceAfterDiscount"],
  methods: {
    fomatNumeric(val) {
      return numeric(val);
    },
  },
};
</script>
<style>
.product-thumb img {
  display: block;
  width: 100%;
  height: auto;
}
</style>