<template>
  <el-menu class="navbar"
           mode="horizontal">
    <hamburger class="hamburger-container"
               :toggleClick="toggleSideBar"
               :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <div id="clock">
        <span class="date">{{ date }}</span>
        <span class="time">{{ time }}</span>
      </div>
      <error-log class="errLog-container right-menu-item"></error-log>

      <el-tooltip effect="dark"
                  :content="$t('navbar.screenfull')"
                  placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <el-dropdown @command="systemCommand"
                   v-if="systemList.length>1"
                   v-show="false">
        <span class="el-dropdown-link"
              style="cursor: pointer;color:black">
          {{ formateSystemTitle() }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for=" item in systemList"
                            :command="item.id"
                            :key="item.id">
            {{ item.title}}
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown class="avatar-container right-menu-item"
                   trigger="click">
        <div class="avatar-wrapper">
          <span class="el-dropdown-link userinfo-inner"
                style="color:black">
            {{username}}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button plain
                       type="text"
                       @click="changePassForm=true">{{ $t('user.changePassword') }}
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;"
                  @click="personalForm=true">{{$t('navbar.personal')}}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout"
                  style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <template>
      <el-dialog :title="$t('user.changePassword')"
                 :visible.sync="changePassForm"
                 width="400px">
        <change-password :visible.sync="changePassForm" />
      </el-dialog>
    </template>
    <el-dialog :title="$t('navbar.personal')"
               :visible.sync="personalForm"
               width="400px">
      <personal :visible.sync="personalForm" />
    </el-dialog>
  </el-menu>

</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull/index.vue";
import API from "@/api/base/apiUser";
import ChangePassword from "@/components/Profile/changePassword.vue";
import personal from "@/components/Profile/personal.vue";
import { getSystemId, setSystemId } from "@/utils/cookieUtils";
import store from "@/store/index";
import App from "@/store/modules/core/app";
import User from "@/store/modules/core/user";
import { getModule } from "vuex-module-decorators";
const app = getModule(App, store);
const user = getModule(User, store);
export default {
  data() {
    return {
      changePassForm: false,
      personalForm: false,
      time: "",
      date: "",
      systemList: [] // 系统列表
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    "change-password": ChangePassword,
    personal
  },
  computed: {
    sidebar() {
      return app.sidebar;
    },
    avatar() {
      user.user.avatar;

      if (util.isNullOrEmpty(user.user.avatar)) {
        return "@/styles/image/head.jpg";
      } else {
        return user.user.avatar;
      }
    },
    username() {
      let length = user.user.userName.length;
      if (length <= 7) {
        return user.user.userName;
      } else {
        return user.user.userName.slice(0, 6) + "...";
      }
    }
  },
  created() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
    Promise.all([API.checkSystem()])
      .then(([response]) => {
        this.systemList = response; //设置系统列表
      })
      .catch(error => {
        // 自定义错误处理
      });
  },
  methods: {
    toggleSideBar() {
      console.log(this.$store);
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    updateTime() {
      var week = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];

      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    systemCommand(sid) {
      setSystemId(sid);
      this.$router.push("/");
      location.reload();
    },
    formateSystemTitle() {
      var system = this.systemList.find(function(x) {
        return x.id === getSystemId();
      });
      return system.title;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
