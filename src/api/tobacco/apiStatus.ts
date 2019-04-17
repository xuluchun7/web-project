
import baseApi from '@/api/baseApi';
const baseUrl = 'tobacco/api/basic/status';
export default new class extends baseApi {
  constructor() {
    super(baseUrl);
  }
};
