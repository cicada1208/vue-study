import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router, // 通過 router 配置參數注入路由
  store,
  render: (h) => h(App),
}).$mount('#app');
