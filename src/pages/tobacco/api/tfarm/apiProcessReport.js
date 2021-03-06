import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/processReport';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  save: (params) => {
    return API.POST(baseUrl, params);
  },
  update: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  delete: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  saveOrUpdate: (id, params) => {
    return API.POST(baseUrl + '/force', params);
  },
  softDelete: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  getListByProcess: (processId) => {
    return API.GET(baseUrl + "/getListByProcess/" + processId + "/list");
  }

};