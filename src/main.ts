import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import '@/utils/StringUtils';
import { default as util } from '@/utils/util';
Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App),
    mounted() {
        console.log(
            '当前系统时间:' + util.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        );
    }
}).$mount('#app');
