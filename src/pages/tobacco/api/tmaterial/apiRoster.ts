import baseApi from '@/api/baseApi';
const baseUrl = 'material/api/tmaterial/roster';
export default new class extends baseApi {
  CONTROL_LIST = [{ key: 0, value: "编辑" }, { key: 1, value: "已确认" }, { key: 3, value: "正在出库" }, { key: 5, value: "正在发放" }, { key: 7, value: "作废" }];
  
  constructor() {
    super(baseUrl);
  }
};
