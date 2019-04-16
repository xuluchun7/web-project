<template>
  <div class="app-wrapper"
       :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tabs />
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Navbar, Sidebar, AppMain, TagsView, Tabs } from "./components";
import { getModule } from "vuex-module-decorators";
import store from "@/store/index";
import App from "@/store/modules/core/app";
const app = getModule(App, store);
export default Vue.extend({
  name: "layout",
  components: {
    Tabs,
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return app.sidebar;
    }
  }
});
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
