import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import app from './modules/core/app';
import errorLog from './modules/core/errorLog';
import permission from './modules/core/permission';
import tagsView from './modules/core/tagsView';
import user from './modules/core/user';
Vue.use(Vuex);
import { getModule } from 'vuex-module-decorators';
// store.ts
export default new Vuex.Store({
    modules: {
        // /* 其余的store */
        // app: getModule(app),
        // errorLog: getModule(errorLog),
        // permission: getModule(permission),
        // tagsView: getModule(tagsView),
        // user: getModule(user)
    }
});

// const store = new Vuex.Store({
//     state: {
//         router: {}
//     },
//     modules: {
//         app,
//         errorLog,
//         permission,
//         tagsView,
//         user
//     },
//     getters,
//     mutations: {
//         SET_ROUTER: (state, router) => {
//             state.router = router;
//         }
//     },
//     actions: {
//         setRouter({ commit }, router) {
//             commit('SET_ROUTER', router);
//         }
//     }
// });

// export default store;
