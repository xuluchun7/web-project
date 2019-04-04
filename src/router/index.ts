import Vue from 'vue';
import Router from 'vue-router';
import constantRouterMap from './constantRouter';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

export default new Router({
    // mode: 'history', // require service support
    routes: constantRouterMap
});
