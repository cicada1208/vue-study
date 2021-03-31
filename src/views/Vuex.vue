<template>
  <div>
    <p>{{ countStore }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <p>{{ localComputed }}</p>
  </div>
</template>

<script>
// import store from '@/store';
import { mapState } from 'vuex';

export default {
  // computed: {
  //   count() {
  //     // return store.state.countStore;
  //     return this.$store.state.countStore;
  //   },
  // },
  // mapState: 若要取得多個 store state 可透過 mapState 生成計算屬性，讓你少打幾個字
  computed: {
    localComputed() {
      return 'local computed';
    },
    ...mapState([
      // 當名稱相同不重命名，映射 this.countStore 為 store.state.countStore
      'countStore',
    ]),
  },
  methods: {
    increment() {
      this.$store.commit('incrementCountStore');
    },
    decrement() {
      this.$store.commit('decrementCountStore');
    },
  },
};
</script>
