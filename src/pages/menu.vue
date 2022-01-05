<template>
  <div>
    <f7-page name="Menu">
      <tabbar :activeRoute="f7route.path" />
      <f7-navbar>
        <f7-nav-left>
          <div class="display-flex padding align-items-center">
            <f7-icon f7="placemark" color="gray"></f7-icon>
            <div class="padding-left" @click="changeLocation()">
              <p class="no-margin is-capitalized" style="font-size: 8pt">
                {{ dropPointSelected.name }} &#8964;
              </p>
              <p
                class="no-margin"
                style="
                  font-size: 10pt;
                  width: 200px
                  display: block;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ dropPointSelected.address }}
              </p>
            </div>
          </div>
        </f7-nav-left>
        <f7-nav-right :inner="false">
          <f7-link
            class="searchbar-enable"
            data-searchbar=".searchbar-menu"
            icon-ios="f7:search"
            icon-aurora="f7:search"
            icon-md="material:search"
          ></f7-link>
        </f7-nav-right>
        <f7-searchbar
          disable-button-text="Cancel"
          :expandable="true"
          v-model="search"
          class="searchbar-menu"
          @input="
            search = $event.target.value;
            searchProduct();
          "
          @keypress.enter.prevent="searchProduct()"
          search-container=".search-list"
          search-in=".item-title"
        ></f7-searchbar>
      </f7-navbar>
      
      <!-- Product -->
      <template v-if="!showPreloader">
        <div v-for="(product, key) in productList" :key="key">
          <f7-block-title class="is-capitalized">
            {{ key }}
          </f7-block-title>
          <f7-block>
            <f7-row>
              <f7-col width="50" v-for="item in product" :key="item.id">
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
        </div>
      </template>

      <!-- PRODUCT DETAL -->
      <product-sheet
        :isOpened="isProductOpened"
        :product="productDetail"
        @closeProduct="closeProduct()"
      />
      <!-- Drop Point -->
      <f7-sheet
        swipe-to-close
        :opened="changeLocationSheet"
        @sheet:closed="changeLocationSheet = false"
      >
        <f7-toolbar>
          <div class="left"></div>
          <div class="right">
            <f7-link sheet-close>Close</f7-link>
          </div>
        </f7-toolbar>
        <!-- Scrollable sheet content -->
        <f7-page-content>
          <f7-list class="no-margin">
            <f7-list-item
              v-for="(item, i) in dropPoint"
              :key="i"
              link="#"
              @click="selectLocation(item)"
              :title="item.address"
              after="Select"
            >
              <template #header>
                <span class="is-capitalized">{{ item.name }}</span>
              </template>
              <template #media>
                <f7-icon class="text-color-gray" f7="placemark"></f7-icon>
              </template>
            </f7-list-item>
          </f7-list>
        </f7-page-content>
      </f7-sheet>
    </f7-page>
  </div>
</template>
<script>
const limit = 10;
import product from "../components/product.vue";
import productSheet from "../components/productSheet.vue";
import { f7 } from "framework7-vue";
import debounce from "debounce";
import tabbar from '../components/Tabbar.vue'
export default {
  props: {
    f7router: Object,
    f7route: Object,
  },
  components: { product, productSheet, tabbar },
  data () {
    return {
      showPreloader: true,
      productList: {},
      productOffset: 0,
      productRecord: 0,
      isProductOpened: false,
      productDetail: {},
      category: [],
      search: "",
      dropPoint: [],
      dropPointSelected: {},
      changeLocationSheet: false,
    };
  },
  methods: {
    async loadProduct (category, recommend) {
      let dataReq = {
        // limit: limit,
        offset: this.productOffset,
      };
      this.showPreloader = true
      f7.preloader.show();;
      if (category) {
        dataReq.category = category;
      }
      if (recommend) dataReq.recommend = recommend;
      let ajax;
      if (this.search) {
        dataReq.filter = this.search;
        ajax = this.axios.post("/product/search", dataReq);
      } else {
        ajax = this.axios.post("/product", dataReq);
      }
      ajax
        .then((res) => {
          let data = res.data.content;
          data.result.map((el) => {
            if (!this.productList[el.category]) this.productList[el.category] = []
            this.productList[el.category].push(el)
          })

          this.productRecord = data.record;
          f7.preloader.hide();
          this.showPreloader = false

        })
        .catch((err) => {
          f7.preloader.hide();
          this.showPreloader = false

        });
    },
    searchProduct: debounce(function (event) {
      this.productList = {};
      this.productOffset = 0;
      this.productRecord = 0;
      this.loadProduct();
    }, 500),
    async loadMoreProduct () {
      if (!this.showPreloader && this.productList.length < this.productRecord) {
        this.productOffset += limit;
        await this.loadProduct();
      }
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
    loadCategory () {
      this.axios
        .get(`category`)
        .then((res) => {
          res.data.content.result.map((el) => {
            this.category.push(el.id)
            this.loadProduct(el.id, 0);
          });
        })
        .catch((err) => { });
    },
    loadDropPoint () {
      this.axios
        .get(`droppoint`)
        .then((res) => {
          this.dropPoint = res.data.content.result;
          this.dropPointSelected = this.dropPoint[0];
        })
        .catch((err) => { });
    },
    changeLocation () {
      this.changeLocationSheet = true;
    },
    selectLocation (item) {
      this.dropPointSelected = item;
      this.changeLocationSheet = false;
    },

  },
  created () {
    this.loadDropPoint();
    this.loadProduct();
  },
};
</script>
