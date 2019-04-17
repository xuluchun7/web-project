
<template>
  <div>
    <router-link to="/dashboard"
                 v-show="!isCollapse">
      <h1 class="banner">
        <img src="@/styles/image/logo.png"
             alt="systemLogo"
             style="width: auto;	height: auto;	max-width: 100%;	max-height: 100%;">
      </h1>
    </router-link>
    <div class="userPart"
         v-show="!isCollapse">
      <div class="user-wrapper">
        <div class="profile-image">
          <img :src="avatar"
               style="width:40px;height:40px"
               alt="profile image">
        </div>
        <div class="text-wrapper">
          <p class="profile-name"
             v-text="username"></p>
          <div>
            <el-tooltip :content="organization2"
                        placement="top">
              <small class="designation text-muted"
                     v-text="organization"></small>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <scroll-bar>

      <el-menu mode="vertical"
               class="el-menu-vertical-demo"
               :default-active="$route.path"
               :collapse="isCollapse">
        <div class="menu-wrapper">

          <template v-for="item in menus">
            <sidebar-item :routes="item"
                          :key="item.id" />
          </template>
          <div>
            <el-submenu index="1"
                        v-if="systemList.length>1">
              <template slot="title">
                <template>
                  <i class="icon-cus iconfont el-iconfont-manage"></i>
                </template>
                <span slot="title">更多系统</span>
              </template>
              <template v-for=" item in systemList">
                <router-link :key="item.id "
                             to="/"
                             @click.native='redirect(item)'>

                  <el-menu-item :index="item.id">
                    <template>
                      <i class="icon-cus iconfont el-iconfont-manage"></i>
                    </template>
                    <span>{{ item.title}}</span>
                  </el-menu-item>
                </router-link>
              </template>

            </el-submenu>
          </div>
        </div>
      </el-menu>
    </scroll-bar>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";
import API from "@/api/base/apiUser";
import { getUser, setUser } from "@/utils/userUtils";
import { setSystemId } from "@/utils/cookieUtils";
import store from "@/store/index";
import App from "@/store/modules/core/app";
import User from "@/store/modules/core/user";
import { getModule } from "vuex-module-decorators";
import util from "../../../../utils/util";
const app = getModule(App, store);
const user = getModule(User, store);
export default {
  data() {
    return {
      systemList: [] // 系统列表
    };
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    isCollapse() {
      return !app.sidebar.opened;
    },
    menus() {
      return user.user.menus;
    },
    systemName() {
      return this.$store.getters.system.title;
    },
    username() {
      let length = user.user.userName.length;
      if (length <= 7) {
        return user.user.userName;
      } else {
        return user.user.userName.slice(0, 6) + "...";
      }
    },
    organization() {
      if (!user.user.organization) {
        return "未设置组织单位";
      }
      let length = user.user.organization.name.length;
      if (length <= 7) {
        return user.user.organization.name;
      } else {
        return user.user.organization.name.slice(0, 8) + "...";
      }
    },
    organization2() {
      if (!user.user.organization) {
        return "未设置组织单位";
      }
      return user.user.organization.name;
    },
    banner() {
      return this.$store.state.user.system.banner;
    },
    avatar() {
      user.user.avatar;

      if (util.isNullOrEmpty(user.user.avatar)) {
        return "@/styles/image/head.jpg";
      } else {
        return user.user.avatar;
      }
    }
  },
  created() {
    Promise.all([API.checkSystem()])
      .then(([response]) => {
        this.systemList = response; //设置系统列表
      })
      .catch(error => {
        // 自定义错误处理
      });
  },
  methods: {
    redirect(system) {
      let user = getUser();
      user.systemId = system.id;
      user.index = system.entry;
      setUser(user);
      setSystemId(system.id);
      window.location.href = system.entry;
    }
  }
};
</script>
<style  >
.icon-cus {
  margin-right: 5px;
  font-size: 16px;
  text-align: center;
  font-family: element-icons;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
</style>
