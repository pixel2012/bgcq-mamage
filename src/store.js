import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let state = {
  userInfo: {}
};
let mutations = {
  updateUserInfo(state, payload) {
    state.userInfo = payload;
  }
};
let actions = {};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
