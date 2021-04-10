import Vue from 'vue';
import Vuex from 'vuex';
import counter from './counter';

Vue.use(Vuex);

// 每個應用僅包含一個 store 實例
// 改成 modules
export default new Vuex.Store({
  modules: { counter },
});

// // 每個應用僅包含一個 store 實例
// export default new Vuex.Store({
//   // state: 響應式資料
//   state: {
//     countState: 0,
//   },
//   // getters: 相當於 store computed property，會緩存，依賴改變才重算，
//   // 可接受兩參數 (state, getters)
//   getters: {
//     countStateDesp: (state) => {
//       return state.countState + '次';
//     },
//     countStateDespFunc: (state) => (unit) => {
//       return state.countState + unit;
//     },
//   },
//   // mutations: 改變 store state 唯一途徑，提交 store.commit mutation，記錄狀態變更，
//   // 不能使用非同步函數，可接受兩參數 (state, payload)
//   mutations: {
//     // countStateIncrement: (state, amount = 1) => {
//     //   state.countState += amount;
//     // },
//     // countStateDecrement(state, payload) {
//     //   state.countState -= payload.amount;
//     // },
//     [type.mutations.countStateIncrement]: (state, amount = 1) => {
//       state.countState += amount;
//     },
//     [type.mutations.countStateDecrement](state, payload) {
//       state.countState -= payload.amount;
//     },
//   },
//   // actions: 透過 store.dispatch 觸發 action，commit mutation，不直接變更狀態，
//   // 可使用非同步函數，接受一參數 (context)，context 與 store 實例相仿
//   actions: {
//     // countStateIncrement(context) {
//     //   context.commit(type.mutations.countStateIncrement);
//     // },
//     [type.actions.countStateIncrement]({ commit }, amount = 1) {
//       commit(type.mutations.countStateIncrement, amount);
//     },
//     [type.actions.countStateIncrementAsync]({ commit }, amount = 1) {
//       // setTimeout(() => {
//       //   commit(type.mutations.countStateIncrement, amount);
//       // }, 2000);
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           commit(type.mutations.countStateIncrement, amount);
//           let msg = 'increment done.';
//           resolve(msg);
//         }, 2000);
//       });
//     },
//     async [type.actions.countStateIncDecAsync]({ dispatch, commit }, amount = 1) {
//       // await: 等 + 後，再 -
//       await dispatch(type.actions.countStateIncrementAsync, amount);
//       commit(type.mutations.countStateDecrement, { amount: amount / 2 });
//     },
//   },
//   modules: {},
// });
