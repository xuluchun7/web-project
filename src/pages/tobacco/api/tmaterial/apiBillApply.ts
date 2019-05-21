import baseApi from '@/api/baseApi';
import * as API from "@/api";
const baseUrl = 'material/api/tmaterial/billApply';
export default new (class extends baseApi {
    constructor() {
        super(baseUrl);
    }
    getByLead(id: string,userName: string) {
        return API.POST(baseUrl + '/submit/'+id+ '/' + userName);
    }
})();
