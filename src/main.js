import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import zhmf from "./lib/zhmf";
import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(zhmf);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
