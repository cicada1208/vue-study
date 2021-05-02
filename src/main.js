import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apiUtil from './libs/api.util.js';

Vue.config.productionTip = false;

// 通過在原型上定義 $appStartTime，使其在每個 Vue 的實例中可用，
// 甚至在實例生命週期 beforeCreate 中亦可用，
// Vue 實例中以 this.$appStartTime 叫用，
// 名稱以$開頭是在Vue所有實例中都可用的property的一個簡單約定，以避免衝突。
Vue.prototype.$appStartTime = new Date().toLocaleTimeString(); // 程式啟動時間
Vue.prototype.$apiUtil = apiUtil;

new Vue({
  router, // 通過 router 配置參數注入路由
  store, // 為了在 Vue 組件中訪問 this.$store property，需為 Vue 實例提供創建好的 store
  render: (h) => h(App),
}).$mount('#app');
