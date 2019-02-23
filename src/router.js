import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "frame" */ "./views/frame.vue"),
      children: [
        {
          path: "",
          component: () =>
            import(/* webpackChunkName: "default" */ "./views/index.vue"),
          meta: {
            name: "",
            keepAlive: true
          }
        },
        {
          path: "modified",
          component: () =>
            import(/* webpackChunkName: "modified" */ "./views/modified.vue"),
          meta: {
            name: "修改资料",
            keepAlive: true
          }
        },
        {
          path: "safety",
          component: () =>
            import(/* webpackChunkName: "safety" */ "./views/safety.vue"),
          meta: {
            name: "安全信息",
            keepAlive: true
          }
        },
        {
          path: "like",
          component: () =>
            import(/* webpackChunkName: "like" */ "./views/like.vue"),
          meta: {
            name: "我的收藏",
            keepAlive: true
          }
        },
        {
          path: "pay",
          component: () =>
            import(/* webpackChunkName: "pay" */ "./views/pay.vue"),
          meta: {
            name: "在线支付",
            keepAlive: true
          }
        },
        {
          path: "carts",
          component: () =>
            import(/* webpackChunkName: "carts" */ "./views/carts.vue"),
          meta: {
            name: "我的购物车",
            keepAlive: true
          }
        },
        {
          path: "order",
          component: () =>
            import(/* webpackChunkName: "order" */ "./views/order.vue"),
          meta: {
            name: "我的订单",
            keepAlive: true
          }
        },
        {
          path: "carts",
          component: () =>
            import(/* webpackChunkName: "carts" */ "./views/carts.vue"),
          meta: {
            name: "我的购物车",
            keepAlive: true
          }
        },
        {
          path: "location",
          component: () =>
            import(/* webpackChunkName: "location" */ "./views/location.vue"),
          meta: {
            name: "我的收获地址",
            keepAlive: true
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/login.vue")
    }
  ]
});
