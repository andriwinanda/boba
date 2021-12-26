<template>
  <f7-page name="product" 
    infinite
    :infinite-distance="50"
    :infinite-preloader="showPreloader"
    @infinite="loadMoreProduct"
  >>
    <f7-navbar :title="product.title" back-link="Back"></f7-navbar>
    <f7-block-title>About {{product.title}}</f7-block-title>
    <f7-block strong>
      {{product.description}}
    </f7-block>
  </f7-page>
</template>
<script>
const limit = 10;
import product from "../components/product.vue";
export default {
  components: { product },
  data() {
    return {
      showPreloader: true,
      productList: [],
      productOffset: 0,
      productRecord: 0,
    };
  },
  methods: {
    loadProduct() {
      let data = {
        limit: limit,
        offset: this.productOffset,
      };
      this.showPreloader = true;
      this.axios
        .post(`product`,data)
        .then((res) => {
          this.showPreloader = false;
           let productItem = res.data.content;
          if (productItem.result) {
            productItem.result.map(el => {
              this.productList.push(el);
            });
          } else this.productList = [];
          this.productRecord = productItem.record;
        })
        .catch((err) => {
          this.showPreloader = false;
        });
    },
    loadMoreProduct() {
      if (!this.showPreloader && this.productList.length < this.productRecord) {
        this.productOffset += limit;
        this.loadProduct();
      }
    },
  },
  created() {
    this.loadProduct();
  },
};
</script>
