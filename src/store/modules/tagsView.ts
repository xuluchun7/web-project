import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'tagsView',
    store
})
export default class tagsView extends VuexModule {
    visitedViews = [];
    cachedViews = [];
    @Mutation
    ADD_VISITED_VIEWS(state: any, view: any) {
        if (state.visitedViews.some((v: any) => v.id === view.meta.id)) return;
        state.visitedViews.push({
            name: view.name === undefined ? view.meta.id : view.name,
            path: view.path,
            title: view.meta.title || 'no-name',
            fullpath: view.fullPath,
            id: view.meta.id === undefined ? view.name : view.meta.id
        });
        if (!view.meta.noCache) {
            state.cachedViews.push(
                view.meta.id === undefined ? view.name : view.meta.id
            );
        }
    }
    @Mutation
    DEL_VISITED_VIEWS(state: any, view: any) {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1);
                break;
            }
        }
        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i);
                state.cachedViews.splice(index, 1);
                break;
            }
        }
    }
    @Mutation
    DEL_OTHERS_VIEWS(state: any, view: any) {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews = state.visitedViews.slice(i, i + 1);
                break;
            }
        }
        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i);
                state.cachedViews = state.cachedViews.slice(index, i + 1);
                break;
            }
        }
    }
    @Mutation
    DEL_ALL_VIEWS(state: any) {
        state.visitedViews = [];
        state.cachedViews = [];
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
    delAllViews() {}
}
