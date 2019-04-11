import Vue from 'vue';
import 'es6-promise/auto';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/scss/element-variables.scss';
import '@/styles/index.scss'; // global css
import '@/styles/font/iconfont.css'; // 引入ICONFONT图标

import App from '@/App.vue';
import router from '@/router/index';
import store from '@/store/index';
import i18n from '@/lang/index'; // 国际化
import '@/utils/stringUtils';
import '@/registerServiceWorker';
import '@/utils/util';
import '@/utils/polyfill.js';
import '@/icons/index'; // icon
import '@/errorLog'; // error log
import '@/router/routerGateway'; // permission control
import * as filters from '@/filters/index'; // global filters
import '@/directive/highlight';
import utilsPlugin from '@/utils/utilsPlugin';
import fullscreen from '@/directive/el-fullscreenDialog';
import center from '@/directive/el-centerDialog';
import * as langFilters from '../../filters/langFilters';
Vue.config.productionTip = false;
Vue.use(utilsPlugin);
Vue.use(fullscreen);
Vue.use(center);
Vue.use(Element, {
  size: screen.width > 1366 ? 'medium' : 'small', // set element-ui default size 'large' | 'medium' | 'small' | 'mini'
  i18n: (key: any, value: any) => {
    i18n.t(key, value);
  },
  zIndex: 3000
});
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Object.keys(langFilters).forEach(key => {
  Vue.filter(key, langFilters[key]);
});
i18n.mergeLocaleMessage('zh', require('./lang/rbac.js').default);
i18n.mergeLocaleMessage('zh', require('./lang/online.js').default);
i18n.mergeLocaleMessage('zh', require('./lang/oauth.js').default);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
