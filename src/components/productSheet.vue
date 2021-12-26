<template>
  <f7-sheet
    :opened="isOpened"
    @sheet:closed="closeProduct"
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
            fomatNumeric(
              product.price - product.price * (product.itemDiscount || 0)
            )
          }}
        </p>
        <p class="no-margin-vertical" v-if="product.itemDiscount">
          <del>Rp {{ fomatNumeric(product.price) }}</del> •
          <span class="text-color-red"
            >{{ product.itemDiscount * 100 }}% OFF</span
          >
        </p>
        <p class="text-color-gray">
          <strong>Description</strong> <br />
          {{ product.description || "-" }}
        </p>
      </f7-block>
    </f7-page-content>
  </f7-sheet>
</template>
<script>
import { numeric } from "../js/function-helper";

export default {
  props: ["isOpened", "product", "closeProduct"],
  methods: {
    fomatNumeric(val) {
      return numeric(val);
    },
  },
};
</script>