/**
 * 公用方法，包含登陆，菜单等等方法
 */
import * as API from '@/api/index';
const baseUrl = 'user/rbac/user';
import baseApi from '@/api/baseApi';
export default new class apiUser extends baseApi {
  constructor() {
    super(baseUrl);
  }
  findAllByOrgId(orgId, params) {
    return API.GET(baseUrl + '/orgid/' + orgId, params);
  }
  findAllWithOrgId(orgId, params) {
    return API.GET(baseUrl + '/organization/' + orgId, params);
  }
  findAllWithDistrictId(districtId, params) {
    return API.GET(baseUrl + '/district/' + districtId, params);
  }

  /**
   * 获取系统菜单
   * @param userName
   * @param systemId
   */
  checkMenu(userName, systemId) {
    return API.GET(
      baseUrl + '/{userName}/system/{systemId}/menu'.format({ userName: userName, systemId: systemId })
    );
  }
  homeIndex(systemId) {
    return API.GET(baseUrl + '/system/{0}/index'.format(systemId));
  }
  /**
   * 获取所有的系统信息
   */
  checkSystem() {
    return API.GET(baseUrl + '/system/ids');
  }
  /**
   * 根据角色编码，和角色类型获取菜单权限
   * @param roleId
   * @param roleType
   */
  getMenuPrivilege(roleId, roleType) {
    return API.GET(
      'user/rbac/privilege/role/{roleId}/{roleType}/MENU'.format({ roleId: roleId, roleType: roleType })
    );
  }
  getElementPrivilege(roleId, roleType, menuId) {
    return API.GET(
      'user/rbac/privilege/role/{roleId}/{roleType}/menu/{menuId}/ELEMENT'.format(
        {
          roleId,
          roleType,
          menuId
        }
      )
    );
  }
  saveElementPrivilege(roleId, roleType, systemId, menuId, resourceIds) {
    return API.POST(
      'user/rbac/privilege/role/{roleId}/{roleType}/system/{systemId}/menu/{menuId}/ELEMENT'.format({
        roleId,
        roleType,
        systemId,
        menuId
      }
      ),
      resourceIds
    );
  }
  savePrivilege(roleId, roleType, systemId, resourceType, resourceIds) {
    return API.POST(
      'user/rbac/privilege/role/{roleId}/{roleType}/system/{systemId}/{resourceType}'.format(
        {
          roleId,
          roleType,
          systemId,
          resourceType
        }
      ),
      resourceIds
    );
  }
  getRoles(userId) {
    return API.GET(baseUrl + '/{userId}/roles'.format({ userId }));
  }
  updateRoles(loginName, op, roleIds) {
    var url = '';
    if (op === 'left') {
      // 移除
      url = baseUrl + '/{loginName}/remove/role'.format({ loginName });
    } else {
      // 增加
      url = baseUrl + '/{loginName}/role'.format({ loginName });
    }
    return API.POST(url, roleIds);
  }
  getOrganization(loginName) {
    return API.GET(baseUrl + '/{loginName}/organization'.format({ loginName }));
  }
  getOrgByLoginName(loginName, systemId, stationId) {
    return API.GET(
      baseUrl +
      '/{loginName}/organization?systemId={systemId}&stationId={stationId}'.format(
        {
          loginName,
          systemId,
          stationId
        }
      )
    );
  }
  updateOrganization(org) {
    return API.POST(baseUrl + '/organization', org);
  }
  removeOrganization(id) {
    return API.DELETE(baseUrl + '/organization/' + id);
  }
  getProperty(loginName) {
    return API.GET(baseUrl + '/{loginName}/property'.format({ loginName }));
  }
  updateProperty(property) {
    return API.POST(baseUrl + '/property', property);
  }
  saveUser(params) {
    return API.POST(baseUrl, params);
  }
  save(params) {
    return API.POST(baseUrl + '/district', params);
  }
  updateUser(id, params) {
    return API.PUT(baseUrl + '/' + id, params);
  }
  deleteRole(id) {
    return API.POST('user/rbac/user/remove/' + id);
  }
  changePass(loginName, params) {
    return API.POST(
      'uaa/oauth/{loginName}/changePass'.format({ loginName: loginName }),
      params
    );
  }
}
