import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// 使用插件，需要在調用 new Vue() 啟動應用前完成
Vue.use(VueRouter);

const UserHome = { template: '<div>home</div>' };
const UserProfile = { template: '<div>{{$route.path}}</div>' };
const UserNote = { template: '<div>{{$route.path}}</div>' };

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
  {
    // 動態路徑參數(dynamic segment)
    // path: '/user/:userName/post/:postId', // 此路由路徑需完整才能匹配 /user/cicada/post/123
    // vue-router 使用 path-to-regexp
    // (post)?: make part of the path optional by wrapping with parens and add "?"
    // :postId(\\d+): this route will only be matched if :postId is all numbers
    path: '/user/:userName/(post)?/:postId(\\d+)?', // 此路由路徑即使無 post 也能匹配 /user/cicada
    // name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    // children: 嵌套路由配置
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:userName is matched
      { path: '', component: UserHome },
      // UserProfile will be rendered inside User's <router-view>
      // when /user/:userName/profile is matched
      { path: 'profile', component: UserProfile },
      { path: 'note', component: UserNote },
    ],
  },
  {
    path: '*', // 通配符，常用於客戶端404錯誤
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
  },
];

// 創建 router 實例
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
