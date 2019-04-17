import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
@Module({
  name: 'errorLog'
})
export default class errorLog extends VuexModule {
  logs: Array<any> = [];

  @Mutation
  ADD_ERROR_LOG(log: Array<any>) {
    this.logs.push(log);
  }

  @Action({ commit: 'ADD_ERROR_LOG' })
  addErrorLog(log: string) {
    return log;
  }
}
