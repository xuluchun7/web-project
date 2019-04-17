import { default as util } from '@/utils/util';
import apiUser from '@/api/base/apiUser';
import {
  getToken,
  removeToken,
  getSystemId,
  removeSystemId,
  setSystemId
} from '@/utils/cookieUtils';
const searchTree = (item, id) => {
  if (item.id === id) {
    return item;
  } else if (item.child != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < item.child.length; i++) {
      result = searchTree(item.child[i], id);
    }
    return result;
  }
  return null;
};

import { setUser } from '@/utils/userUtils';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
@Module({
  // dynamic: true,
  name: 'user'
  // store
})
export default class user extends VuexModule {
  /**
   * 当前访问令牌
   */
  token = getToken(); //访问令牌
  /**
   * 页面访问令牌时效性
   */
  tokenExpireTime: number = 30; //时间有效期，
  /**
   *
   */
  titleList = ['首页']; //用于面包标题导航
  avatar = '';
  introduction = '';
  systemInfo: System = {} as System; //系统信息
  user: User = {} as User;
  @Mutation
  SET_SYSTEM(system: System) {
    this.systemInfo = system;
  }
  /**
   * 设置用户系统信息
   * @param systemList
   */
  @Mutation
  SET_SYSTEM_LIST(systemList: Array<System>) {
    this.user.systemList = systemList;
  }
  /**
   * 设置用户信息
   * @param userInfo
   */
  @Mutation
  SET_USER(userInfo: any) {
    this.user.userName = userInfo.user.name;
    this.user.loginName = userInfo.user.loginName;
    this.user.roles = userInfo.roles;
    this.user.menus = userInfo.menus;
    this.user.permissions = userInfo.permissions;
    if (
      userInfo.propertys !== undefined &&
      !util.isNullOrEmpty(userInfo.propertys.avatar)
    ) {
      this.user.avatar = userInfo.propertys.avatar;
    } else {
      this.user.avatar =
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
    }
    this.introduction = userInfo.introduction;
  }
  @Mutation
  SET_USER_DETAIL(userDetail: any) {
    this.user.organization = {} as Organization;
    if (userDetail !== undefined) {
      this.user.detail = userDetail;

      this.user.organization.id = userDetail.organizationId;
      this.user.organization.code = userDetail.organizationId;
      this.user.organization.name = userDetail.organizationName;
    } else {
      this.user.organization.id = '';
      this.user.organization.code = '';
      this.user.organization.name = '';
    }
  }
  @Mutation
  LOGOUT() {
    setUser(undefined);
    removeToken();
    removeSystemId();
  }
  @Action
  async loadEnv() {

    let systemList: any = await apiUser.checkSystem();
    if (systemList.length > 0) {
      //设置默认系统
      systemList = systemList.sort((a: any, b: any) => {
        return a.id - b.id;
      });
      var exsit = systemList.find(function (x: System) {
        return x.id === getSystemId();
      });
      if (exsit === undefined) {
        setSystemId(systemList[0].id);
        exsit = systemList[0];
      }
      this.context.commit('SET_SYSTEM', exsit);
      this.context.commit('SET_SYSTEM_LIST', systemList);

      let user = await apiUser.homeIndex(exsit.id);
      this.context.commit('SET_USER', user);

      let userDetail = await apiUser.getUserDetail(exsit.id);
      this.context.commit('SET_USER_DETAIL', userDetail);

      return new Promise((resolve, reject) => {
        resolve({ user: user, system: exsit });
      });
    } else {
      console.log('用户无信息');
      return new Promise((resolve, reject) => {
        reject('用户无信息');
      });
    }
  }

  @Action({ commit: 'LOGOUT' })
  LogOut() { }
  // 强制
  @Action({ commit: 'LOGOUT' })
  FedLogOut() { }
  @Action
  async getTitleList(path) {
    var item;
    for (var menu of this.user.menus) {
      item = searchTree(menu, path);
      if (item !== null) {
        break;
      }
    }
    const titleList = [];
    if (item !== undefined && item !== null) {
      if (item.ancestry !== undefined && item.ancestry.length > 0) {
        const ancestryArray = JSON.parse(item.ancestry);
        for (var it of ancestryArray) {
          titleList.push(it.title);
        }
      }
      titleList.push(item.title);
    }
    return titleList;
  }
  /**
   * 
   * @param permission 判定是否包含权限
   */
  async hasPermission(permission: string) {
    return this.user.permissions.includes(permission) ||
      this.user.roles.findIndex(t => {
        return t.code === permission
      }) > -1
  }

}
