
import baseApi from '@/api/baseApi';
const baseUrl = 'material/api/tmaterial/stock';
export default new class extends baseApi {
  constructor() {
    super(baseUrl);
  }
  /**
 * 查询列表数据
 * @param params
 */
  getStock(bookId: string, accountPeriod: string, warehouseId: string, materialId: string) {
    return this.API.GET(this.baseUrl + "/warehouse/{warehouseId}/material/{materialId}?bookId={bookId}&accountPeriod={accountPeriod}".format({
      bookId: bookId, accountPeriod: accountPeriod, warehouseId: warehouseId, materialId: materialId
    }));
  }
};
