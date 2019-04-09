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
import { getToken } from '@/utils/cookieUtils';
import { getUser, setUser } from '@/utils/userUtils';
Vue.config.productionTip = false;
import { Loading } from 'element-ui';
import apiUser from '@/api/base/apiUser';
new Vue({
    store,
    router,
    render: h => h(App),
    beforeCreate() {},
    data() {
        return {
            loadingInstance: {} as any
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
        //如果直接进入登陆
        if (window.location.pathname === '/login.html') {
            this.$store.dispatch('FedLogOut');
            window.location.href = window.location.pathname;
        }
        //判定是否登陆，token存在，说明，已经登陆过，不验证是否有效
        else if (getToken()) {
            console.log('检测到令牌');
            //如果token有效，获取跳转界面，然后跳转界面
            let user = getUser();
            this.loadSystem(user);
        } else {
            //如果token不存在，则跳转到登陆界面
            window.location.href = '/login.html';
        }
    },
    methods: {
        //获取系统信息
        async loadSystem(userData: any) {
            //获取系统列表
            console.log('加载用户系统列表');

            let systemList: any = await apiUser.checkSystem();
            if (systemList.length > 0) {
                //对默认系统进行排序
                systemList = systemList.sort((a: any, b: any) => {
                    return a.id - b.id;
                });
                //根据请求路径进行系统初始化跳转
                let currentSystem = this.decideSystem(
                    systemList,
                    userData.systemId,
                    window.location.href
                );
                userData.systemList = systemList;

                userData.index = currentSystem.entry;
                userData.systemId = currentSystem.id;
                setUser(userData);
                if (window.location.pathname !== userData.index) {
                    window.location.href = userData.index;
                } else {
                    this.$store.dispatch('FedLogOut');
                    this.loadingInstance.text =
                        '请确认权限是否正确，5秒后跳转到登陆界面';
                    console.log(this.$store);
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 5000);
                }
            } else {
                this.loadingInstance.text =
                    '未获取到用户信息，5秒后跳转到登陆界面';
                setTimeout(() => {
                    this.$store.dispatch('FedLogOut');
                    window.location.href = '/login.html';
                }, 5000);
            }
            return userData;
        },
        /**
         * 选择系统
         */
        decideSystem(
            systemList: Array<System>,
            rememberSysId: string,
            url?: string
        ) {
            let system = undefined;
            do {
                //1、先匹配URL
                if (util.isNullOrEmpty(url)) {
                    system = systemList.find(function(x: System) {
                        return x.entry === window.location.href;
                    });
                    //说明已经匹配成功
                    if (system !== undefined) {
                        break;
                    }
                }
                //2、然后匹配用户的历史系统ID
                if (util.isNullOrEmpty(rememberSysId)) {
                    system = systemList.find(function(x: System) {
                        return x.id === rememberSysId;
                    });
                    //说明已经匹配成功
                    if (system !== undefined) {
                        break;
                    }
                }
                //3、匹配默认系统id
                let systemId = util.isNullOrEmpty(
                    process.env.VUE_APP_DETAULT_SYSTEM_ID
                )
                    ? ''
                    : process.env.VUE_APP_DETAULT_SYSTEM_ID;
                //如果为空，就使用第一个系统信息
                if (!util.isNullOrEmpty(systemId)) {
                    system = systemList.find(function(x: System) {
                        return x.id === systemId;
                    });
                    //说明已经匹配成功
                    if (system !== undefined) {
                        break;
                    }
                }
                system = systemList[0];
            } while (false);
            return system;
        }
    },
    beforeDestroy() {
        this.loadingInstance = null;
    }
}).$mount('#app');
