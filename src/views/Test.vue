<template>
  <div class="test">
    <!--
      v-bind: 能將 data property bind 在 html attribute
      直接書寫 v-bind:title 或可用動態參數(方括號括起來的 JavaScript 表達式作為一個指令的參數)
      完整語法: v-bind:[attributeName]
    -->
    <h4>v-bind:</h4>
    <span :[attributeName]="msg">
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
    <!--
      直接書寫 v-on:click 或可用動態參數
      完整語法: v-on:[eventName]
    -->
    <button @[eventName]="reverseMsg">reverse msg</button>
    <p>
      <!-- Mustache 語法: 僅能單個 JavaScript 表達式 -->
      {{ msgReverse }}
    </p>

    <!-- v-model: 實現表單輸入和應用狀態之間的雙向綁定 -->
    <h4>v-model:</h4>
    <input v-model="msg" />
    <p>{{ msg }}</p>

    <!-- v-html: span 內容會被替換成 data property rawHtml -->
    <h4>v-html:</h4>
    <span v-html="rawHtml">test</span>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data: () => ({
    msg: `${new Date().toLocaleString()}`,
    msgReverse: '',
    list: [{ text: 'list1' }, { text: 'list2' }],
    attributeName: 'title',
    eventName: 'click',
    rawHtml: '<span style="color: red">This shold be red.</span>',
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
