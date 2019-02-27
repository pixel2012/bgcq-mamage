/*集成对象方法集*/
import config from "./config";
import api from "./api";
import utils from "./utils";
import ajax from "./ajax";
import { sessionStore, localStore } from "./store";
import _ from "lodash";
import cookie from "js-cookie";
import moment from "moment";
import breadcrumb from "../components/breadcrumb";

let register = {};
register.install = Vue => {
  // 1. 添加全局方法或属性
  // Vue.myGlobalMethod = function() {};
  // 2. 添加全局资源
  // Vue.directive("my-directive", {
  //   bind(el, binding, vnode, oldVnode) {
  //   }
  // });

  // 3. 注入组件
  // Vue.mixin({
  //   created: function() {
  //   }
  // });
  Vue.component("breadcrumb", breadcrumb);

  //4.添加过滤器
  Vue.filter("dateFormate", value => {
    if (value == 0) {
      return "暂无";
    } else {
      return moment.unix(value).format("YYYY-MM-DD HH:mm"); // 这是时间戳转时间
    }
  });
  Vue.filter("numToMoney", utils.numToMoney);

  // 5. 添加实例方法
  // Vue.prototype.$myMethod = function (methodOptions) {
  // }
  Vue.prototype.$config = config;
  Vue.prototype.$api = api;
  Vue.prototype.$ajax = ajax;
  Vue.prototype.$utils = utils;
  Vue.prototype.$sessionStore = sessionStore;
  Vue.prototype.$localStore = localStore;
  Vue.prototype.$_ = _;
  Vue.prototype.$cookie = cookie;
  Vue.prototype.$moment = moment;
};
export default register;
