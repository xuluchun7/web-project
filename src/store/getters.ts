import util from '@/utils/util';

const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  loginName: state => state.user.user.loginName,
  userName: state => state.user.user.userName,
  introduction: state => state.user.introduction,
  status: state => state.user.user.status,
  roles: state => state.user.user.roles,
  permissions: state => state.user.user.permissions,
  user: state => state.user.user, // 当前用户信息
  menus: state => state.user.user.menus, // 系统功能菜单
  system: state => state.user.systemInfo, // 当前系统信息
  systemList: state => state.user.user.systemList, // 当前系统信息
  property: state => state.user.user.property, //用户的额外属性
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  districtId: (state) => {
    if (state.user.user === undefined || state.user.user === null || state.user.user.detail === undefined || state.user.user.detail === null || util.isNullOrEmpty(state.user.user.detail.districtId)) {
      return '';
    }
    else {
      return state.user.user.detail.districtId;
    }
  },
  districtName: (state) => {
    if (state.user.user === undefined || state.user.user === null || state.user.user.detail === undefined || state.user.user.detail === null || util.isNullOrEmpty(state.user.user.detail.districtName)) {
      return '未设置';
    }
    else {
      return state.user.user.detail.districtName;
    }
  },
  organizationId: (state) => {

    if (state.user.user === undefined || state.user.user === null || state.user.user.detail === undefined || state.user.user.detail === null || util.isNullOrEmpty(state.user.user.detail.organizationId)) {
      return '';
    }
    else {
      return state.user.user.detail.organizationId;
    }
  },
  organizationName: (state) => {
    if (state.user.user === undefined || state.user.user === null || state.user.user.detail === undefined || state.user.user.detail === null || util.isNullOrEmpty(state.user.user.detail.organizationName)) {
      return '未设置';
    }
    else {
      return state.user.user.detail.organizationName;
    }
  }
};
export default getters;
