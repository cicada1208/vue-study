import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import goTo from 'vuetify/es5/services/goto';

// 使用插件，需要在調用 new Vue() 啟動應用前完成
Vue.use(VueRouter);

const UserHome = { template: '<div>home</div>' };
const UserProfile = {
  template:
    '<div>profile, $route.params.userName: {{$route.params.userName}}</div>'
};
const UserNote = {
  props: ['userName'],
  template: '<div>note, props.userName: {{userName}}</div>'
};

// 定義路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vue.core',
    name: 'VueCore', // name: 命名路由
    // route level code-splitting
    // this generates a separate chunk (vue.core.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "vue.core" */ '@/views/VueCore.vue')
  },
  {
    // 動態路徑參數(dynamic segment)
    // path: '/user/:userName/post/:postId', // 此路由路徑需完整才能匹配，如: /user/cicada/post/123
    // vue-router 使用 path-to-regexp
    // (post)?: make part of the path optional by wrapping with parens and add "?"
    // :postId(\\d+): this route will only be matched if :postId is all numbers
    path: '/user/:userName/(post)?/:postId(\\d+)?', // 此路由路徑即使無 post 也能匹配，如: /user/cicada
    component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue'),
    // children: 嵌套路由配置
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:userName is matched
      { path: '', name: 'UserHome', component: UserHome },
      // UserProfile will be rendered inside User's <router-view>
      // when /user/:userName/profile is matched
      { path: 'profile', name: 'UserProfile', component: UserProfile },
      // 通過 props 解耦，取代 $route.params.userName
      // 即 props 設置為 true，$route.params.userName 將會被設置為組件屬性
      { path: 'note', name: 'UserNote', component: UserNote, props: true },
      {
        path: 'all',
        name: 'UserAll',
        // 一個視圖(router-view)由一組件(component)渲染
        components: { default: UserHome, profile: UserProfile, note: UserNote }
      }
    ]
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: () => import(/* webpackChunkName: "vuex" */ '@/views/Vuex.vue')
  },
  {
    path: '/api.query',
    name: 'ApiQuery',
    component: () =>
      import(/* webpackChunkName: "api.query" */ '@/views/ApiQuery.vue')
  },
  {
    path: '/vuetify',
    name: 'Vuetify',
    component: () =>
      import(/* webpackChunkName: "vuetify" */ '@/views/Vuetify.vue')
  },
  {
    path: '/css.test',
    name: 'CssTest',
    component: () =>
      import(/* webpackChunkName: "css.test" */ '@/views/CssTest.vue')
  },
  {
    path: '/file.test',
    name: 'FileTest',
    component: () =>
      import(/* webpackChunkName: "file.test" */ '@/views/FileTest.vue')
  },
  {
    path: '*', // 通配符，常用於客戶端404錯誤
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "notfound" */ '@/components/NotFound.vue')
  }
];

// 創建 router 實例
const router = new VueRouter({
  mode: 'history', // 利用 history.pushState API 來完成 URL 跳轉而無須重新加載頁面。
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    // 此功能只在支持 history.pushState 的瀏覽器中可用。
    // savedPosition: 僅當 popstate 導航（通過瀏覽器的前進/後退按鈕觸發）時才可用。
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }
    // return 期望滾動到哪個位置
    return goTo(scrollTo);
  }
});

export default router;
