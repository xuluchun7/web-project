/**
 * 公用方法，包含登陆，菜单等等方法
 */
import * as API from '../index';
import Cookies from 'js-cookie';
import baseApi from '@/api/baseApi';
const baseUrl = 'user/rbac/user';

export class apiUser extends baseApi {
    constructor() {
        super(baseUrl);
    }
    loginByUserName(userName: string, password: string) {
        return API.POST(
            'auth/oauth/token?client_id={client_id}&client_secret={client_secret}&grant_type={grant_type}&username={username}&password={password}'.format(
                {
                    username: userName,
                    password: password,
                    grant_type: 'password',
                    client_id: process.env.VUE_APP_CLIENT_ID,
                    client_secret: process.env.VUE_APP_CLIENT_SECRET
                }
            )
        );
    }
    getUserDetail(systemId: string) {
        return API.GET('auth/userInfo?systemId=' + systemId, null);
    }
    logout() {
        Cookies.remove('user');
    }
    /**
     * 获取系统菜单
     * @param userName
     * @param systemId
     */
    checkMenu(userName: string, systemId: string) {
        return API.GET(
            baseUrl +
                '/{userName}/system/{systemId}/menu'.format({
                    userName: userName,
                    systemId: systemId
                })
        );
    }
    homeIndex(systemId: string) {
        return API.GET(
            baseUrl + '/system/{systemId}/index'.format({ systemId: systemId })
        );
    }
    /**
     * 获取所有的系统信息
     */
    checkSystem() {
        return API.GET(baseUrl + '/system/ids');
    }
    changePass(loginName: string, params: any) {
        return API.POST(
            'uaa/oauth/{loginName}/changePass'.format({ loginName: loginName }),
            params
        );
    }
}

export default new apiUser();
