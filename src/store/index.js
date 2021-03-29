import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 每個應用將僅僅包含一個 store 實例
export default new Vuex.Store({
  // state: 響應式
  state: {
    count: 0,
  },
  // mutations: 改變 store state 唯一途徑，提交(commit) mutation
  mutations: {
    increment: (state) => state.count++,
    decrement(state) {
      state.count--;
    },
  },
  actions: {},
  modules: {},
});
