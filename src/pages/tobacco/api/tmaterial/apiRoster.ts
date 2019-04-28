import baseApi from '@/api/baseApi';
const baseUrl = 'material/api/tmaterial/roster';
export default new class extends baseApi {
  CONTROL_LIST = [{ key: 0, value: "编辑" }, { key: 1, value: "申请确认" }, { key: 3, value: "作废" }, { key: 5, value: "完成出库" }, { key: 7, value: "发放完成" }];
  
  constructor() {
    super(baseUrl);
  }
    /**
   * 作废单据
   * @param id 更新主键
   * @param params
   */
  voided(id: string) {
    return this.API.PUT(this.baseUrl+"/"+id + '/voided');
  }
};
