/**
 * 功能菜单
 */
interface Menu {
    /**
     * 节点
     */
    leaf: boolean;
    /**
     * 文件路径
     */
    path: string;
    /**
     * 访问URL
     */
    url: string;
    /**
     * 显示名
     */
    title: string;
    /**
     * 图标
     */
    icon: string;
    /**
     * 菜单编码
     */
    id: string;
    /**
     * 是否缓存
     */
    cacheMenu: boolean;
    /**
     * 是否还有子级，当leaf为true时，此时为空
     */
    child: Array<Menu>;
}
/**
 * 路由
 */
interface Route {
    path: string;
    name: string;
    meta: {
        title: string;
        icon: string;
        id: string;
        noCache: boolean;
        file: string;
        roles: Array<string>;
    };
    component: any;
}

interface User {
    /**
     * 用户惟一编码
     */

    id: string;
    /**
     * 用户的登陆名
     */
    loginName: string;
    /**
     * 用户我的名称，中文
     */
    userName: string; //用户名称
    /**
     * 用户的角色列表
     */
    roles: Array<Role>; //角色
    /**
     * 用户的权限列表
     */
    permissions: Array<string>; //权限
    /**
     * 用户拥有的菜单列表
     */
    menus: Array<Menu>; //菜单
    /**
     * 用户所属组织单位
     */

    organization: Organization; //组织单位,
    /**
     * 用户的详细信息
     */
    detail: {}; //用户的详细信息
    /**
     * 用户的所有属性
     */
    property: Array<KeyValue>; //用户属性
    /**
     * 用户的状态
     */
    status: string;

    /**
     * 用户拥有的系统列表
     */
    systemList: Array<System>; //系统列表，一个用户可能存在多个系统
    /**
     * 显示头像
     */
    avatar: string;
}

interface Role {
    /**
     * 主键编码
     */
    id: string;
    /**
     * 可识别编码，惟一
     */
    code: string;
    /**
     * 角色英文名称
     */
    name: string;
    /**
     * 角色名称
     */
    title: string;
    /**
     * 角色上级
     */
    parentId: string;
}
/**
 * 系统信息
 */
interface System {
    id: string;
    /**
     * 编码
     */
    code: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 系统显示名称
     */

    title: string;
    /**
     * 系统入口
     */
    entry: string;
    /**
     * 系统图标
     */
    icon: string;
}
/**
 * 组织单位约定，适用于行政单位
 */
interface Organization {
    /**
     * 惟一
     */
    id: string;
    /**
     * 编码，暂时与id一致
     */
    code: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 排序
     */
    order: number;
    /**
     * 包含所有上级的编码
     */
    ids: Array<string>;
    /**
     * 包括所有上级的名称
     */
    names: Array<string>;
}
/**
 * 键值对象，适用所有的key-value类型
 */
interface KeyValue {
    key: any;
    value: any;
}
interface JsonResult {
    code: number;
    message: string;
    data: any;
}
