import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router, // 通過 router 配置參數注入路由
  store, // 為了在 Vue 組件中訪問 this.$store property，需為 Vue 實例提供創建好的 store
  render: (h) => h(App),
}).$mount('#app');
