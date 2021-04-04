<template>
  <div>
    <p>
      {{ countStoreAlias }} {{ countStoreDesp }}
      {{ countStoreDespFunc('count') }}
    </p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement(3)">-</button>
    </p>
  </div>
</template>

<script>
// import store from '@/store';
import { mapState, mapGetters } from 'vuex'; // mapMutations
import mutationTypes from '@/store/mutation.types.js';

export default {
  // computed: {
  //   count() {
  //     // return store.state.countStore;
  //     return this.$store.state.countStore;
  //   },
  // },
  //// mapState: 若要取得多個 store state 可透過 mapState 生成計算屬性，讓你少打幾個字
  computed: {
    //// mapState: 當名稱相同不重命名，可直接映射 this.countStore 為 store.state.countStore
    // ...mapState(['countStore']),
    //// 將 state 另取名字
    ...mapState({ countStoreAlias: 'countStore' }),
    // countStoreDesp() {
    //   return this.$store.getters.countStoreDesp;
    // },
    //// mapGetters: 輔助函數僅將 store getter 映射到局部計算屬性
    ...mapGetters(['countStoreDesp', 'countStoreDespFunc']),
    //// 將 getter 另取名字
    // ...mapGetters({
    //   countStoreDespAlias: 'countStoreDesp',
    //   countStoreDespFuncAlias: 'countStoreDespFunc',
    // }),
  },
  methods: {
    increment() {
      this.$store.commit(mutationTypes.countStoreIncrement, 2);
    },
    decrement(num) {
      // this.$store.commit('countStoreDecrement', { amount: num });
      //// 也可改寫成如下，整個對像都作為 payload 傳給 mutation
      this.$store.commit({
        type: mutationTypes.countStoreDecrement,
        amount: num,
      });
    },
  },
};
</script>
