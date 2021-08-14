<template>
  <v-container fluid>
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
    <p>
      store.state v-model:
      <input type="number" v-model.number="countState" />
    </p>
  </v-container>
</template>

<script>
// import store from '@/store';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import counterStoreType from '../store/counter/type';

const counterStoreNS = 'counter/'; // store module counter namespaced: true

export default {
  name: 'vuex',

  computed: {
    // count() {
    //   // return store.state.countState;
    //   // return this.$store.state.countState;
    //   return this.$store.state.counter.countState; // store module counter
    // },
    //// mapState: 若要取得多個 store state 可透過 mapState 生成計算屬性，可少打幾個字，
    //// 當名稱相同不重命名，可直接映射 this.countState 為 store.state.countState
    // ...mapState(['countState']),
    //// 將 state 另取名字
    ...mapState(counterStoreNS, {
      countStateAlias: counterStoreType.state.countState
    }),
    // countDesp() {
    //   // return this.$store.getters.countStateDesp;
    //   return this.$store.getters['counter/countStateDesp']; // store module counter namespaced: true
    // },
    //// mapGetters: 輔助函數將 store getters 映射到局部計算屬性
    ...mapGetters(counterStoreNS, [
      counterStoreType.getters.countStateDesp,
      counterStoreType.getters.countStateDespFunc
    ]),
    //// 將 getters 另取名字
    // ...mapGetters({
    //   countStateDespAlias: 'countStateDesp',
    //   countStateDespFuncAlias: 'countStateDespFunc',
    // }),
    //// store.state v-model 雙向綁定的計算屬性
    countState: {
      get() {
        return this.$store.state.counter.countState;
      },
      set(value) {
        // this.$store.commit(
        //   counterStoreNS + counterStoreType.mutations.countStateSet,
        //   value
        // );
        this.countStateSet(value);
      }
    }
  },
  methods: {
    incrementCommit() {
      this.$store.commit(
        counterStoreNS + counterStoreType.mutations.countStateIncrement,
        2
      );
    },
    decrementCommit(num) {
      // this.$store.commit(
      //   counterStoreNS + counterStoreType.mutations.countStateDecrement,
      //   { amount: num }
      // );
      //// 也可改寫成如下，整個對像都作為 payload 傳給 mutation
      this.$store.commit({
        type: counterStoreNS + counterStoreType.mutations.countStateDecrement,
        amount: num
      });
    },
    ...mapMutations(counterStoreNS, [counterStoreType.mutations.countStateSet]),
    // incrementDispatch() {
    //   this.$store.dispatch(
    //     counterStoreNS + counterStoreType.actions.countStateIncrement,
    //     3
    //   );
    // },
    // incrementAsyncDispatch() {
    //   this.$store.dispatch(
    //     counterStoreNS + counterStoreType.actions.countStateIncrementAsync,
    //     4
    //   );
    // },
    ...mapActions(counterStoreNS, {
      incrementDispatch: counterStoreType.actions.countStateIncrement,
      incrementAsyncDispatch: counterStoreType.actions.countStateIncrementAsync,
      incDecAsyncDispatch: counterStoreType.actions.countStateIncDecAsync
    }),
    incrementAsyncDispatchPromise(num) {
      this.$store
        .dispatch(
          counterStoreNS + counterStoreType.actions.countStateIncrementAsync,
          num
        )
        .then(msg => console.log(msg));
    }
  }
};
</script>
