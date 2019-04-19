<template>
  <section class="app-main"
           style="min-height: 100%">
    <transition name="fade"
                mode="out-in">
      <template>
        <keep-alive v-if="!$route.meta.noCache">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
      </template>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppMain",
  computed: {
     ...mapGetters({ cachedViews:'cachedViews'}),
  }
};
</script>
