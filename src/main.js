import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import register from "./lib/register";
import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(register);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
