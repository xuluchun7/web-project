const Cookies = require('js-cookie');

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
@Module({
  name: 'app'
})
export default class app extends VuexModule {
  sidebar = {
    opened: !+Cookies.get('sidebarStatus')
  };
  language = Cookies.get('language') || 'en';

  @Mutation
  TOGGLE_SIDEBAR() {
    if (this.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
    this.sidebar.opened = !this.sidebar.opened;
  }
  @Mutation
  SET_LANGUAGE(language: string) {
    this.language = language;
    Cookies.set('language', language);
  }
  @Action({ commit: 'TOGGLE_SIDEBAR' })
  toggleSideBar() { }
  /**
   * 采用自动提交，手动提交，则直接使用 this.context.commit("setLanguage",language)
   * @param language
   */
  @Action({ commit: 'setLanguage' })
  setLanguage(language: string) {
    return language;
  }
}
