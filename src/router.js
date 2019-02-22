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
            keepAlive: true
          }
        },
        {
          path: "carts",
          component: () =>
            import(/* webpackChunkName: "carts" */ "./views/carts.vue"),
          meta: {
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
