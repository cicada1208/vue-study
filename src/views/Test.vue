<template>
  <div class="test">
    <!--
      v-bind: 後接參數 html attribute 能綁定 data property
      直接書寫 v-bind:title 或可用動態參數(方括號括起來的 JavaScript 表達式作為一個指令的參數)
      完整語法: v-bind:[attributeName]
    -->
    <h4>v-bind:</h4>
    <span :[attributeName]="msg">
      hover this show msg
    </span>

    <h4>v-if:</h4>
    <span v-if="Math.random() > 0.5">if >0.5 visible</span>
    <span v-else-if="Math.random() === 0.5">elseif =0.5 visible</span>
    <span v-else>else &lt;0.5 visible</span>

    <h4>v-for:</h4>
    <ol>
      <li v-for="(item, index) in list" v-bind:key="index">
        {{ item.text }}
      </li>
    </ol>
    <div v-for="(value, name, index) in textClass" :key="index">
      {{ index }}. {{ name }}: {{ value }}
    </div>

    <!--
      v-on: 後接參數 eventName
      直接書寫 v-on:click 或可用動態參數
      完整語法: v-on:[eventName]
    -->
    <h4>v-on:</h4>
    <button @[eventName]="reverseMsg('自定義參數', $event)">
      reverse msg
    </button>
    <button @[eventName]="clearMsg">clear msg</button>
    <p id="debounceId">
      <!-- Mustache 語法: 僅能單個 JavaScript 表達式 -->
      msgReverse: {{ msgReverse }}
    </p>

    <!-- v-model: 實現表單輸入和應用狀態之間的雙向綁定 -->
    <h4>v-model:</h4>
    <input v-model="msg" placeholder="edit me" />
    <p>msg: {{ msg }}</p>
    <p>msgReverseGetter: {{ msgReverseGetter }}</p>
    <p>msgGetter: {{ msgGetterAndSetter }}</p>

    <!-- v-html: span 內容會被替換成 data property rawHtml -->
    <h4>v-html:</h4>
    <span v-html="rawHtml">test</span>

    <!--
      若都啟用 {'text-bold': true, 'text-red': true}
      相當於 class="text-size text-bold text-red"
    -->
    <h4>class and style:</h4>
    <p class="text-size" v-bind:class="textClass">class style test</p>
    <p v-bind:class="['text-size', { 'text-bold': true, 'text-red': false }]">
      class style test2
    </p>
    <p v-bind:style="{ color: 'blue', 'font-weight': 'bold' }">
      class style test3
    </p>
  </div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';

export default {
  name: 'Test',
  data: () => ({
    // data property 才會是響應式
    // Vue 會在初始化實例時對 property 執行 getter/setter 轉化
    msg: `${new Date().toLocaleString()}`,
    msgReverse: '',
    list: [{ text: 'list1' }, { text: 'list2' }],
    attributeName: 'title',
    eventName: 'click',
    rawHtml: '<span style="color: red">This shold be red.</span>',
  }),
  computed: {
    // msgReverseGetter is a computed property getter
    // msgReverseGetter 依賴 msg，當響應式 msg 改變，
    // 所有依賴 msgReverseGetter 的綁定也會更新；
    // 當響應式 msg 沒變，msgReverseGetter 會返回之前的緩存而不重算
    msgReverseGetter: function() {
      return this.msg
        .split('')
        .reverse()
        .join('');
    },
    msgGetterAndSetter: {
      get: function() {
        return this.msg;
      },
      set: function(value) {
        this.msg = value;
      },
    },
    textClass: function() {
      return {
        'text-bold': true,
        'text-red': true,
      };
    },
  },
  methods: {
    // 方法每次都會重算，不會緩存
    reverseMsg: function(param, event) {
      this.msgReverse = this.msg
        .split('')
        .reverse()
        .join('');
      alert(`tag name: ${event.target.tagName}, param: ${param}`);
    },
    clearMsg: function(event) {
      // 延遲一秒清空
      var debounce = _.debounce(() => $('#debounceId').html(''), 1000);
      debounce();
      alert(`tag name: ${event.target.tagName}`);
    },
  },
  created: function() {
    // lifecycle hook created: vm 實例被創建之後執行此代碼
    // `this` 指向 vm 實例
    console.log(`vm created, msg is ${this.msg}`);
  },
};
</script>

<style scoped lang="scss">
div {
  text-align: left;
}

.text-bold {
  font-weight: bold;
}

.text-red {
  color: red;
}

.text-size {
  font-size: 20px;
}
</style>
