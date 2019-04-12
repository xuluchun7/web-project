import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
@Module({
  name: 'tagsView'
})
export default class tagsView extends VuexModule {
  visitedViews: Array<any> = [];
  cachedViews: Array<any> = [];
  @Mutation
  ADD_VISITED_VIEWS(view: any) {
    if (this.visitedViews.some((v: any) => v.id === view.meta.id)) return;
    this.visitedViews.push({
      name: view.name === undefined ? view.meta.id : view.name,
      path: view.path,
      title: view.meta.title || 'no-name',
      fullpath: view.fullPath,
      id: view.meta.id === undefined ? view.name : view.meta.id
    });
    if (!view.meta.noCache) {
      this.cachedViews.push(
        view.meta.id === undefined ? view.name : view.meta.id
      );
    }
  }
  @Mutation
  DEL_VISITED_VIEWS(view: any) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i);
        this.cachedViews.splice(index, 1);
        break;
      }
    }
  }
  @Mutation
  DEL_OTHERS_VIEWS(view: any) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews = this.visitedViews.slice(i, i + 1);
        break;
      }
    }
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i);
        this.cachedViews = this.cachedViews.slice(index, i + 1);
        break;
      }
    }
  }
  @Mutation
  DEL_ALL_VIEWS() {
    this.visitedViews = [];
    this.cachedViews = [];
  }

  @Action({ commit: 'ADD_VISITED_VIEWS' })
  addVisitedViews(view: any) {
    return view;
  }
  @Action({ commit: 'DEL_VISITED_VIEWS' })
  delVisitedViews(view: any) {
    return view;
  }
  @Action({ commit: 'DEL_OTHERS_VIEWS' })
  delOthersViews(view: any) {
    return view;
  }
  @Action({ commit: 'DEL_ALL_VIEWS' })
  delAllViews() { }
}
