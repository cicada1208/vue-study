import mutationType from '../types/mutation.type';
import actionType from '../types/action.type';

let param = {
  state: { countState: 'countState' },
  getters: { countStateDesp: 'countStateDesp' },
  countStateIncrement: 'countStateIncrement',
  countStateDecrement: 'countStateDecrement',
};
console.log(param);

// state: 響應式資料
// mutation 若對 state 某個 object 加入新 property，
// 使用此方式 state.obj = { ...state.obj, newProp: 123 }。
// 該宣告方式，若 object 來自別處和別人共用，則會互相引響。
const state = {
  ['countState']: 0,
};
// 此宣告方式是 return new object。
// const state = () => ({
//   countState: 0,
// });

// getters: 相當於 store computed property，會緩存，依賴改變才重算，
// 可接受參數 (state, getters, rootState, rootGetters)，
// state: 模塊的局部狀態
// rootState: 根節點狀態
// rootGetters: 根節點 getters
const getters = {
  countStateDesp: (state) => {
    return state.countState + '次';
  },
  countStateDespFunc: (state) => (unit) => {
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
  [mutationType.countStateIncrement]: (state, amount = 1) => {
    state.countState += amount;
  },
  [mutationType.countStateDecrement](state, payload) {
    state.countState -= payload.amount;
  },
};

// actions: 透過 store.dispatch 觸發 action，commit mutation，不直接變更狀態，
// 可使用非同步函數，可接受參數 (context)，context 與 store 實例相仿，
// context.state: 模塊的局部狀態
// context.rootState: 根節點狀態
// context.rootGetters: 根節點 getters
const actions = {
  // countStateIncrement(context) {
  //   context.commit(mutationTypes.countStateIncrement);
  // },
  [actionType.countStateIncrement]({ commit }, amount = 1) {
    commit(mutationType.countStateIncrement, amount);
  },
  [actionType.countStateIncrementAsync]({ commit }, amount = 1) {
    // setTimeout(() => {
    //   commit(mutationTypes.countStateIncrement, amount);
    // }, 2000);
    return new Promise((resolve) => {
      setTimeout(() => {
        commit(mutationType.countStateIncrement, amount);
        let msg = 'increment done.';
        resolve(msg);
      }, 2000);
    });
  },
  async [actionType.countStateIncDecAsync]({ dispatch, commit }, amount = 1) {
    // await: 等 + 後，再 -
    await dispatch(actionType.countStateIncrementAsync, amount);
    commit(mutationType.countStateDecrement, { amount: amount / 2 });
  },
};

export default {
  // namespaced true: 使模塊具有更高的封裝度和複用性，
  // getter、mutation、action 會自動根據模塊註冊的路徑調整命名
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
