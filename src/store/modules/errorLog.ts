import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '../index';
const Cookies = require('js-cookie');
@Module({
    dynamic: true,
    name: 'app',
    store
})
export default class errorLog extends VuexModule {
    state = {
        logs: []
    };

    @Mutation
    ADD_ERROR_LOG(state: any, log: Array<any>) {
        state.logs.push(log);
    }

    @Action({ commit: 'ADD_ERROR_LOG' })
    addErrorLog(log: string) {
        return log;
    }
}
