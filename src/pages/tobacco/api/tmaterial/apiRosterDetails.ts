import baseApi from '@/api/baseApi';
const baseUrl = 'material/api/tmaterial/rosterDetails';
export default new class extends baseApi {
  CONTROL_LIST = [{ key: 1, value: "通过申请" }, { key: 3, value: "作废" }, { key:5, value: "领用确认" }];
  constructor() {
    super(baseUrl);
  }
};
