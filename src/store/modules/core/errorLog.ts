import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
@Module({})
export default class errorLog extends VuexModule {
    logs: Array<any>;

    @Mutation
    ADD_ERROR_LOG(state: any, log: Array<any>) {
        state.logs.push(log);
    }

    @Action({ commit: 'ADD_ERROR_LOG' })
    addErrorLog(log: string) {
        return log;
    }
}
