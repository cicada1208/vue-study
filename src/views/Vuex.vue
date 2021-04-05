<template>
  <div>
    <p>store.state: {{ countStateAlias }}</p>
    <p>store.getters: {{ countStateDesp }}</p>
    <p>store.getters: {{ countStateDespFunc('count') }}</p>
    <p>
      store.commit:
      <button @click="incrementCommit">+</button>
      <button @click="decrementCommit(2)">-</button>
    </p>
    <p>
      store.dispatch:
      <!-- <button @click="incrementDispatch">+</button> -->
      <button @click="incrementDispatch(5)">+</button>
    </p>
    <p>
      store.dispatch async:
      <button @click="incrementAsyncDispatch(10)">+</button>
    </p>
    <p>
      store.dispatch async and return promise:
      <button @click="incrementAsyncDispatchPromise(100)">+</button>
    </p>
    <p>
      store.dispatch async increment and then decrement:
      <button @click="incDecAsyncDispatch(200)">+</button>
    </p>
  </div>
</template>

<script>
// import store from '@/store';
import { mapState, mapGetters, mapActions } from 'vuex'; // mapMutations
import mutationTypes from '@/store/mutation.types.js';
import actionTypes from '@/store/action.types.js';

export default {
  computed: {
    // count() {
    //   // return store.state.countState;
    //   return this.$store.state.countState;
    // },
    //// mapState: 若要取得多個 store state 可透過 mapState 生成計算屬性，可少打幾個字，
    //// 當名稱相同不重命名，可直接映射 this.countState 為 store.state.countState
    // ...mapState(['countState']),
    //// 將 state 另取名字
    ...mapState({ countStateAlias: 'countState' }),
    // countStateDesp() {
    //   return this.$store.getters.countStateDesp;
    // },
    //// mapGetters: 輔助函數將 store getters 映射到局部計算屬性
    ...mapGetters(['countStateDesp', 'countStateDespFunc']),
    //// 將 getters 另取名字
    // ...mapGetters({
    //   countStateDespAlias: 'countStateDesp',
    //   countStateDespFuncAlias: 'countStateDespFunc',
    // }),
  },
  methods: {
    incrementCommit() {
      this.$store.commit(mutationTypes.countStateIncrement, 2);
    },
    decrementCommit(num) {
      // this.$store.commit('countStateDecrement', { amount: num });
      //// 也可改寫成如下，整個對像都作為 payload 傳給 mutation
      this.$store.commit({
        type: mutationTypes.countStateDecrement,
        amount: num,
      });
    },
    // incrementDispatch() {
    //   this.$store.dispatch(actionTypes.countStateIncrement, 3);
    // },
    // incrementAsyncDispatch() {
    //   this.$store.dispatch(actionTypes.countStateIncrementAsync, 4);
    // },
    ...mapActions({
      incrementDispatch: actionTypes.countStateIncrement,
      incrementAsyncDispatch: actionTypes.countStateIncrementAsync,
      incDecAsyncDispatch: actionTypes.countStateIncDecAsync,
    }),
    incrementAsyncDispatchPromise(num) {
      this.$store
        .dispatch(actionTypes.countStateIncrementAsync, num)
        .then((msg) => console.log(msg));
    },
  },
};
</script>
