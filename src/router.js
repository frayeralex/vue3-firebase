import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import(/* webpackChunkName: "auth" */ "./views/Auth.vue")
    },
    {
      path: "/upload",
      name: "upload",
      component: () =>
        import(/* webpackChunkName: "upload" */ "./views/Upload.vue")
    },
    {
      path: "/users/new",
      name: "newUser",
      component: () =>
        import(/* webpackChunkName: "newUser" */ "./views/NewUser.vue")
    },
    {
      path: "/user/:userId",
      name: "viewUser",
      component: () =>
        import(/* webpackChunkName: "viewUser" */ "./views/ViewUser.vue")
    },
    {
      path: "/user-edit/:userId",
      name: "editUser",
      component: () =>
        import(/* webpackChunkName: "editUser" */ "./views/EditUser.vue")
    }
  ]
});
