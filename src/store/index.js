import Vue from 'vue';
import Vuex from 'vuex';
import mutationTypes from './mutation.types';

Vue.use(Vuex);

// 每個應用僅包含一個 store 實例
export default new Vuex.Store({
  // state: 響應式資料
  state: {
    countStore: 0,
  },
  // getters: 相當於 store computed property，會緩存，依賴改變才重算，
  // 可接受兩參數 (state, getters)
  getters: {
    countStoreDesp: (state) => {
      return state.countStore + '次';
    },
    countStoreDespFunc: (state) => (unit) => {
      return state.countStore + unit;
    },
  },
  // mutations: 改變 store state 唯一途徑，提交(commit) mutation，不能使用非同步函數，
  // 可接受兩參數 (state, payload)
  mutations: {
    // countStoreIncrement: (state, amount = 1) => {
    //   state.countStore += amount;
    // },
    // countStoreDecrement(state, payload) {
    //   state.countStore -= payload.amount;
    // },
    [mutationTypes.countStoreIncrement]: (state, amount = 1) => {
      state.countStore += amount;
    },
    [mutationTypes.countStoreDecrement](state, payload) {
      state.countStore -= payload.amount;
    },
  },
  actions: {},
  modules: {},
});
