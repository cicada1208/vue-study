import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 每個應用將僅僅包含一個 store 實例
export default new Vuex.Store({
  // state: 響應式
  state: {
    countStore: 0,
  },
  // mutations: 改變 store state 唯一途徑，提交(commit) mutation
  mutations: {
    countStoreIncrement: (state) => state.countStore++,
    countStoreDecrement(state) {
      state.countStore--;
    },
  },
  // getters: 相當於 store state computed property，會緩存依賴改變才重算
  // 可接受兩參數 (state, getters)
  getters: {
    countStoreDesp: (state) => {
      return state.countStore + '次';
    },
    countStoreDespFunc: (state) => (unit) => {
      return state.countStore + unit;
    },
  },
  actions: {},
  modules: {},
});
