import baseApi from '@/api/baseApi';
const baseUrl = 'material/api/tmaterial/rosterDetails';
export default new class extends baseApi {
  CONTROL_LIST = [{ key: 0, value: "通过申请" }, { key: 5, value: "已确认" }, { key: 7, value: "作废" }];
  constructor() {
    super(baseUrl);
  }
};
