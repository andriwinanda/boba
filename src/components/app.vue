<template>
  <f7-app :params="f7params">

    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="safe-areas" url="/" :push-state="true" :reloadCurrent="true" push-state-separator></f7-view>
  </f7-app>
</template>
<script>
import routes from "../js/routes.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        name: "Geela Boba", // App name
        theme: "md", // Automatic theme detection

        // App routes
        routes: routes,
        // Register service worker
        serviceWorker: {
          path: "/service-worker.js"
        }
      }
    };
  },
  methods: {
  },
  mounted() {
    this.$f7ready(f7 => {
      // Call F7 APIs here
    });
  },
  computed: {
    ...mapState({
    })
  },
  beforeMount() {
  }
};
</script>
<style >
html {
  background-color: #000000;
}
body {
  max-width: 30rem !important;
  margin: 0 auto !important;
}

.circle {
  border-radius: 50%;
}
.page {
  background-color: white;
}
.pointer {
  cursor: pointer;
}
.capitalized {
  text-transform: capitalize;
}
.no-margin {
  margin: 0 !important;
}
.bottom-bar {
  border-radius: 50px;
  width: 90%;
  margin: 0 5% 15px 5%;
  --f7-tabbar-link-active-bg-color: var(--f7-theme-color);
  --f7-toolbar-bg-color-rgb: rgb(255, 255, 255);
  --f7-tabbar-link-inactive-bg-color: #ffffff;
  --f7-tabbar-link-active-color: #ffffff;
  --f7-toolbar-inner-padding-left: 0px;
  --f7-toolbar-inner-padding-right: 0px;
  box-shadow: 0 4px 4px 0 rgba(165, 169, 172, 0.651);
}
.tabbar .tab-link-active {
  border-radius: 50px;
}
.toolbar-inner {
  background-color: #ffffff;
}
.toolbar-bottom.toolbar-hidden,
.ios .toolbar-bottom-ios.toolbar-hidden,
.md .toolbar-bottom-md.toolbar-hidden,
.aurora .toolbar-bottom-aurora.toolbar-hidden {
  transform: translate3d(0, 150%, 0);
}
</style>