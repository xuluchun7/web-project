import * as API from '@/api/index';
const baseUrl = 'user/org/area';
import baseApi from '@/api/baseApi';

export default new class extends baseApi {
  constructor() {
    super(baseUrl);
  }

};
