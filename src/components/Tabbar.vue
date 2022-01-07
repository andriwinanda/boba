<template>
  <f7-toolbar tabbar labels bottom>
    <f7-link
    v-if="item.link != '/voucher' || user"
      v-for="(item, i) in menu"
      :key="i"
      tab-link
      :tab-link-active="item.link === activeRoute"
      icon-size="24"
      :icon-f7="item.icon"
      :href="item.link"
      :text="item.title"
    ></f7-link>
  </f7-toolbar>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    f7route: Object,
    f7router: Object,
    activeRoute: String
  },
  data () {
    return {
      menu: [
        {
          title: "Home",
          icon: "house",
          link: "/",
        },
        {
          title: "Menu",
          icon: "square_list",
          link: "/menu",
          active: true
        },
        {
          title: "Voucher",
          icon: "ticket",
          link: "/voucher",
        },
        {
          title: "Profile",
          icon: "person_fill",
          link: "/profile",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.dataUser,
    }),
  }
};
</script>