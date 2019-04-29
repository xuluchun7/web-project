import baseApi from '@/api/baseApi';
const baseUrl = 'material/api/tmaterial/purchasePlan';
export default new class extends baseApi {
  CONTROL_LIST = [{ key: 0, value: "编辑" }, { key: 5, value: "已确认" }, { key: 7, value: "作废" }];
  constructor() {
    super(baseUrl);
  }

  saveAll (purchasePlanEntity, purchasePlanItemEntityList) {
    return this.API.POST(baseUrl + '/all', {
      purchasePlanEntity: purchasePlanEntity,
      purchasePlanItemEntityList: purchasePlanItemEntityList
    });
  };

  removeAll (purchasePlanEntity, purchasePlanItemEntityList) {
    return this.API.POST(baseUrl + '/remove', {
      purchasePlanEntity: purchasePlanEntity,
      purchasePlanItemEntityList: purchasePlanItemEntityList
    });
  };

};