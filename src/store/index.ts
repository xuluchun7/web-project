import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/core/app';
import errorLog from './modules/core/errorLog';
import permission from './modules/core/permission';
import tagsView from './modules/core/tagsView';
import user from './modules/core/user';
import getters from './getters';
Vue.use(Vuex);
// store.ts
export default new Vuex.Store({
  modules: {
    // /* 其余的store */
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters
});
