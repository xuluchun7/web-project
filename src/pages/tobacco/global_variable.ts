import moment from 'moment';

const globalVariable = {
  install: function (Vue: any, options: any) { }
}
globalVariable.install = function (Vue: any, options: any) {

  // 4. 添加实例方法
  Vue.prototype.GLOBAL = {
    //分页的选择范围
    pageSizeOpts: [10, 15, 20, 50, 100],
    dateoptions: {
      shortcuts: [
        {
          text: '今天',

          onClick: picker => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: '昨天',

          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: '过去三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          }
        }
      ]
    }
  }

};
export default globalVariable;
