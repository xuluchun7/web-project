/* eslint-disable no-extend-native */
const moment = require('moment');
const axios = require('axios');
const ajaxUrl =
    process.env.NODE_ENV === 'development'
        ? process.env.VUE_APP_API_URL.isNullOrEmpty
            ? window.location.origin
            : process.env.VUE_APP_API_URL
        : window.location.origin;

class util {
    title(title: string) {
        title = title ? title + ' - Home' : 'CASIT';
        window.document.title = title;
    }
    dateFormat(date: Date | string, pattern: string) {
        return moment(date).format(pattern);
    }
    isNullOrEmpty = function(str: any) {
        return str === '' || str === null || str === undefined;
    };
    downloadWithStream = (response: any) => {
        var filename = moment(new Date()).format('YYYYMMDDhhmmss');
        //content-disposition 格式content-disposition  "attachment; filename=20180104154630_%E6%9C%BA%E8%80%95%E8%B7%AF.doc"
        if (response.headers['content-disposition'] !== undefined) {
            const cd = response.headers['content-disposition'].split(';');
            if (cd.length > 1) {
                const file = cd[1].split('moment=');
                filename = decodeURI(file[1]);
            }
        }
        require('downloadjs')(response.data, filename);
    };
    ajax = axios.create({
        baseURL: ajaxUrl,
        timeout: 30000
    });
}
export default new util();
