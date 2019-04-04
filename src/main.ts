import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/utils/stringUtils';
Vue.use(Element, {
    size: screen.width > 1366 ? 'small' : 'mini', // set element-ui default size 'large' | 'medium' | 'small' | 'mini'
    zIndex: 3000
});
import { default as util } from '@/utils/util';
import { getToken, removeSystemId, setSystemId } from '@/utils/cookieUtils';
import { getUser, setUser } from '@/utils/userUtils';
Vue.config.productionTip = false;
import { Loading } from 'element-ui';
new Vue({
    store,
    router,
    render: h => h(App),
    beforeCreate() {},
    data() {
        return {
            loadingInstance: {}
        };
    },
    mounted() {
        this.loadingInstance = Loading.service({
            fullscreen: true,
            text: '正在加载系统，请稍等',
            background: 'rgba(0, 0, 0, 0.8)'
        });
        console.log(
            '当前系统时间:' + util.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        );
        //判定是否登陆，token存在，说明，已经登陆过，不验证是否有效
        if (getToken()) {
            console.log('检测到令牌');
            //如果token有效，获取跳转界面，然后跳转界面
            let user = getUser();
            //   this.loadSystem(user);
        } else {
            //如果token不存在，则跳转到登陆界面
            window.location.href = '/login.html';
        }
    }
}).$mount('#app');
