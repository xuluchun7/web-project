const Cookies = require('js-cookie');

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
@Module({})
export default class app extends VuexModule {
    sidebar = {
        opened: !+Cookies.get('sidebarStatus')
    };
    language = Cookies.get('language') || 'en';

    @Mutation
    TOGGLE_SIDEBAR(state: any) {
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1);
        } else {
            Cookies.set('sidebarStatus', 0);
        }
        state.sidebar.opened = !state.sidebar.opened;
    }
    @Mutation
    SET_LANGUAGE(state: any, language: string) {
        state.language = language;
        Cookies.set('language', language);
    }
    @Action({ commit: 'toggleSideBar' })
    toggleSideBar() {}
    /**
     * 采用自动提交，手动提交，则直接使用 this.context.commit("setLanguage",language)
     * @param language
     */
    @Action({ commit: 'setLanguage' })
    setLanguage(language: string) {
        return language;
    }
}
