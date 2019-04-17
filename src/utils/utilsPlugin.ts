import moment from 'moment';

const utilsPlugin = {
  install: function (Vue: any, options: any) { }
}
utilsPlugin.install = function (Vue: any, options: any) {
  // 1. 添加全局方法或属性
  Vue.dateFormat = function (date: any, pattern: any) {
    // 逻辑...
    return moment(date).format(pattern);
  };

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind(el: any, binding: any, vnode: any, oldVnode: any) {
      // 逻辑...
    }
  });

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
  });

  // 4. 添加实例方法
  Vue.prototype.dateFormat = function (date: any, pattern: any) {
    if (date === '' || date === undefined || date === null) {
      return '';
    }
    return moment(date).format(pattern);
  };
  /**
   * 获取每月第一天
   */
  Vue.prototype.getFirstDate = () => {
    let current = moment(new Date()).format('yyyy/mm/01');
    return new Date(current);
  };
  Vue.prototype.getLastDate = () => {
    let current = moment(new Date()).format('yyyy/mm/01');
    let cd = new Date(current);
    cd.setMonth(cd.getMonth() + 1);
    return new Date(cd.getFullYear(), cd.getMonth(), 0);
  };
};
export default utilsPlugin;
