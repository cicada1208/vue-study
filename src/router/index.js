import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// 使用插件，需要在調用 new Vue() 啟動應用前完成
Vue.use(VueRouter);

// 定義路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/study',
    name: 'Study',
    // route level code-splitting
    // this generates a separate chunk (study.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "study" */ '../views/Study.vue'),
  },
];

// 創建 router 實例
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
