import baseApi from '@/api/baseApi';
const baseUrl = 'material/api/tmaterial/purchasePlanItem';
export default new class extends baseApi {
  constructor() {
    super(baseUrl);
  }
};
