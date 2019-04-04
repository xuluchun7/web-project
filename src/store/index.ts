import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// store.ts
export default new Vuex.Store({
    modules: {
        /* 其余的store */
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
