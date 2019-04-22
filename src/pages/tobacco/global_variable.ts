import moment from 'moment';

const globalVariable = {
  install: function (Vue: any, options: any) { }
}
globalVariable.install = function (Vue: any, options: any) {

  // 4. 添加实例方法
  Vue.prototype.GLOBAL = {
    //分页的选择范围
    pageSizeOpts: [10, 15, 20, 50, 100]
  }

};
export default globalVariable;
