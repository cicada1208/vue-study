<template>
  <div class="test">
    <h4>v-bind:</h4>
    <span v-bind:title="msg">
      hover this
    </span>

    <h4>v-if:</h4>
    <span v-if="true">visible</span>

    <h4>v-for:</h4>
    <ol>
      <li v-for="(item, index) in list" v-bind:key="index">
        {{ item.text }}
      </li>
    </ol>

    <h4>v-on:</h4>
    <button v-on:click="reverseMsg">reverse msg</button>
    <p>{{ msgReverse }}</p>

    <!-- v-model: 實現表單輸入和應用狀態之間的雙向綁定 -->
    <h4>v-model:</h4>
    <input v-model="msg" />
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data: () => ({
    msg: `${new Date().toLocaleString()}`,
    msgReverse: '',
    list: [{ text: 'list1' }, { text: 'list2' }],
  }),
  methods: {
    reverseMsg: function() {
      this.msgReverse = this.msg
        .split('')
        .reverse()
        .join('');
    },
  },
  // lifecycle hook created: vm 實例被創建之後執行代碼
  created: function() {
    // `this` 指向 vm 實例
    console.log(`vm created, msg is ${this.msg}`);
  },
};
</script>

<style scoped lang="scss">
div {
  text-align: left;
}
</style>
