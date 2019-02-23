import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import { localStore } from "./lib/store";

Vue.use(Vuex);

let state = {
  navActive: "",
  tabMenusActive: "",
  tabMenus: [],
  routeLists: ""
};
let mutations = {
  addTabMenus(state, payload) {
    let tabs = state.tabMenus;
    let isExist = false;
    tabs.forEach(tab => {
      if (tab.name === payload.name) {
        isExist = true;
      }
    });
    if (!isExist) {
      state.tabMenus.push(payload);
    }
    state.navActive = payload.index;
    state.tabMenusActive = payload.name;
    saveState(state);
  },
  activeTabMenus(state, payload) {
    state.navActive = state.tabMenus[payload.index].index;
    saveState(state);
    router.push({
      path: state.tabMenus[payload.index].route
    });
  },
  removeTabMenus(state, payload) {
    let tabs = state.tabMenus;
    let activeName = state.tabMenusActive;
    tabs.forEach((tab, index) => {
      if (tab.name === payload.targetName) {
        let nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
          state.navActive = nextTab.index;
          router.push({
            path: nextTab.route
          });
        }
      }
    });
    state.tabMenusActive = activeName;
    state.tabMenus = tabs.filter(tab => tab.name !== payload.targetName);
    if (state.tabMenus.length === 0) {
      state.navActive = "";
      state.tabMenusActive = "";
      router.push({
        path: "/"
      });
    }
    saveState(state);
  },
  recoverTabMenus(state, payload) {
    for (let item in payload) {
      if (payload[item]) {
        state[item] = payload[item];
      }
    }
  }
};
let actions = {};

let saveState = state => {
  console.log("执行删除了");
  localStore.set("navActive", state.navActive);
  localStore.set("tabMenusActive", state.tabMenusActive);
  localStore.set("tabMenus", state.tabMenus);
  let result = [];
  state.tabMenus.forEach(item => {
    result.push(item.route);
  });
  state.routeLists = result.join(",");
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
