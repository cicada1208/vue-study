import type from './type';

// state: 響應式資料
// mutation 若對 state 某個 object 加入新 property，
// 使用此方式 state.obj = { ...state.obj, newProp: 123 }。
// 下列宣告方式，若 object 來自別處和別人共用，則會互相影響。
// const state = {
//   [type.state.countState]: 0, // countState: 0,
// };
// 下列宣告方式，return new object，各自獨立。
const state = () => ({
  [type.state.countState]: 0,
});

// getters: 相當於 store computed property，會緩存，依賴改變才重算，
// 可接受參數 (state, getters, rootState, rootGetters)，
// 若只取用 rootState，記得前兩參數也需帶入，不然 rootState 會判斷為 state，因參數是依序判斷的，
// state: 模塊的局部狀態
// rootState: 根節點狀態
// rootGetters: 根節點 getters
const getters = {
  [type.getters.countStateDesp]: (state) => {
    return state.countState + '次';
  },
  [type.getters.countStateDespFunc]: (state) => (unit) => {
    return state.countState + unit;
  },
};

// mutations: 改變 store state 唯一途徑，提交 store.commit mutation，記錄狀態變更，
// 不能使用非同步函數，可接受參數 (state, payload)，
// state: 模塊的局部狀態
const mutations = {
  // countStateIncrement: (state, amount = 1) => {
  //   state.countState += amount;
  // },
  // countStateDecrement(state, payload) {
  //   state.countState -= payload.amount;
  // },
  [type.mutations.countStateIncrement]: (state, amount = 1) => {
    state.countState += amount;
  },
  [type.mutations.countStateDecrement](state, payload) {
    state.countState -= payload.amount;
  },
};

// actions: 透過 store.dispatch 觸發 action，然後 commit mutation，不直接變更狀態，
// 可使用非同步函數，可接受參數 (context)，context 與 store 實例相仿，
// context.state: 模塊的局部狀態
// context.getters: 模塊的局部 getters
// context.commit: 模塊的局部 commit
// context.dispatch: 模塊的局部 dispatch
// context.rootState: 根節點狀態
// context.rootGetters: 根節點 getters
const actions = {
  // countStateIncrement(context) {
  //   context.commit(type.mutations.countStateIncrement);
  // },
  [type.actions.countStateIncrement]({ commit }, amount = 1) {
    commit(type.mutations.countStateIncrement, amount);
  },
  [type.actions.countStateIncrementAsync]({ commit }, amount = 1) {
    // setTimeout(() => {
    //   commit(type.mutations.countStateIncrement, amount);
    // }, 2000);
    return new Promise((resolve) => {
      setTimeout(() => {
        commit(type.mutations.countStateIncrement, amount);
        let msg = 'increment done.';
        resolve(msg);
      }, 2000);
    });
  },
  async [type.actions.countStateIncDecAsync]({ dispatch, commit }, amount = 1) {
    // await: 等 + 後，再 -
    await dispatch(type.actions.countStateIncrementAsync, amount);
    commit(type.mutations.countStateDecrement, { amount: amount / 2 });
  },
};

export default {
  // namespaced true: 使模塊具有更高的封裝度和複用性，
  // getters、mutations、actions 會自動根據模塊註冊的路徑調整命名。
  // namespaced false: getters、mutations、actions 都是全域共用，
  // 例如 moduleA 和 moduleB 都有 actions sayHi，
  // 那麼在 component dispatch sayHi，兩個 module 的 sayHi 都會執行。
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
