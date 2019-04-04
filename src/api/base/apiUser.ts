/**
 * 公用方法，包含登陆，菜单等等方法
 */
import * as API from '../index';
import Cookies from 'js-cookie';

const baseUrl = 'user/rbac/user';
export default {
    findAll: (params: any) => {
        return API.GET(baseUrl, params);
    },
    deleteUser: (userId: string) => {
        return API.POST(baseUrl + '/remove/' + userId);
    },
    getAll: (state: number, params: any) => {
        return API.GET(baseUrl + '/state/' + state, params);
    },
    findAllByOrgId: (orgId: string, params: any) => {
        return API.GET(baseUrl + '/orgid/' + orgId, params);
    },
    findAllWithOrgId: (orgId: string, params: any) => {
        return API.GET(baseUrl + '/organization/' + orgId, params);
    },
    findAllWithDistrictId: (districtId: string, params: any) => {
        return API.GET(baseUrl + '/district/' + districtId, params);
    },
    loginByUserName: (userName: string, password: string) => {
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
    },
    getUserDetail: (systemId: string) => {
        return API.GET('auth/userInfo?systemId=' + systemId, null);
    },
    logout: () => {
        Cookies.remove('user');
    },
    /**
     * 获取系统菜单
     * @param userName
     * @param systemId
     */
    checkMenu: (userName: string, systemId: string) => {
        return API.GET(
            baseUrl +
                '/{userName}/system/{systemId}/menu'.format({
                    userName: userName,
                    systemId: systemId
                })
        );
    },
    homeIndex: (systemId: string) => {
        return API.GET(
            baseUrl + '/system/{systemId}/index'.format({ systemId: systemId })
        );
    },
    /**
     * 获取所有的系统信息
     */
    checkSystem: () => {
        return API.GET(baseUrl + '/system/ids');
    },
    /**
     * 根据角色编码，和角色类型获取菜单权限
     * @param roleId
     * @param roleType
     */
    getMenuPrivilege: (roleId: string, roleType: string) => {
        return API.GET(
            'user/rbac/privilege/role/{roleId}/{roleType}/MENU'.format({
                roleId: roleId,
                roleType: roleType
            })
        );
    },
    getElementPrivilege: (roleId: string, roleType: string, menuId: string) => {
        return API.GET(
            'user/rbac/privilege/role/{roleId}/{roleType}/menu/{menuId}/ELEMENT'.format(
                {
                    roleId: roleId,
                    roleType: roleType,
                    menuId: menuId
                }
            )
        );
    },
    saveElementPrivilege: (
        roleId: string,
        roleType: string,
        systemId: string,
        menuId: string,
        resourceIds: Array<string>
    ) => {
        return API.POST(
            'user/rbac/privilege/role/{roleId}/{roleType}/system/{systemId}/menu/{menuId}/ELEMENT'.format(
                {
                    roleId: roleId,
                    roleType: roleType,
                    systemId: systemId,
                    menuId: menuId
                }
            ),
            resourceIds
        );
    },
    savePrivilege: (
        roleId: string,
        roleType: string,
        systemId: string,
        resourceType: string,
        resourceIds: Array<string>
    ) => {
        return API.POST(
            'user/rbac/privilege/role/{roleId}/{roleType}/system/{systemId}/{resourceType}'.format(
                {
                    roleId: roleId,
                    roleType: roleType,
                    systemId: systemId,
                    resourceType: resourceType
                }
            ),
            resourceIds
        );
    },
    getRoles: (userId: string) => {
        return API.GET(baseUrl + '/{0}/roles'.format(userId));
    },
    updateRoles: (loginName: string, op: string, roleIds: any) => {
        var url = '';
        if (op === 'left') {
            // 移除
            url = baseUrl + '/{0}/remove/role'.format(loginName);
        } else {
            // 增加
            url = baseUrl + '/{0}/role'.format(loginName);
        }
        return API.POST(url, roleIds);
    },
    getOrganization: (loginName: string) => {
        return API.GET(baseUrl + '/{0}/organization'.format(loginName));
    },
    getOrgByLoginName: (
        loginName: string,
        systemId: string,
        stationId: string
    ) => {
        return API.GET(
            baseUrl +
                '/{loginName}/organization?systemId={systemId}&stationId={stationId}'.format(
                    {
                        loginName: loginName,
                        systemId: loginName,
                        stationId: stationId
                    }
                )
        );
    },
    updateOrganization: (org: any) => {
        return API.POST(baseUrl + '/organization', org);
    },
    removeOrganization: (id: string) => {
        return API.DELETE(baseUrl + '/organization/' + id);
    },
    getProperty: (loginName: string) => {
        return API.GET(baseUrl + '/{0}/property'.format(loginName));
    },
    updateProperty: (property: any) => {
        return API.POST(baseUrl + '/property', property);
    },
    saveUser: (params: any) => {
        return API.POST(baseUrl, params);
    },
    save: (params: any) => {
        return API.POST(baseUrl + '/district', params);
    },
    updateUser: (id: string, params: any) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteRole: (id: string) => {
        return API.POST('user/rbac/user/remove/' + id);
    },
    changePass: (loginName: string, params: any) => {
        return API.POST(
            'uaa/oauth/{loginName}/changePass'.format({ loginName: loginName }),
            params
        );
    }
};
