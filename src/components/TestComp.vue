<template>
  <div class="test-comp">
    <!-- $emit: 觸發自定義事件 -->
    <button @click="$emit('enlarge-text')">
      enlarge text
    </button>
    <button @click="$emit('enlarge-text2', 1)">
      enlarge text2
    </button>
    <button @click="$emit('decrease-text', -0.1)">
      decrease text
    </button>
    <p>staticProp: {{ staticProp }}</p>
    <p>dynamicProp: {{ dynamicProp }}</p>
    <p>numProp: {{ numProp }} num: {{ num }}</p>
    <p>boolPropDef: {{ boolPropDef }}</p>
    <p>boolProp: {{ boolProp }}</p>
    <p>arrayProp: {{ arrayProp }}</p>
    <p>objectProp: {{ objectProp }}</p>
    <p>id: {{ id }}, title: {{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'TestComp',
  props: {
    // prop 會在組件實例創建前進行驗證
    // 故 data、computed property 在 default 或 validator 中不可用
    staticProp: {
      type: String,
      required: true, // 必填驗證
      validator: function(value) {
        // 自定義驗證函式: 值必須匹配下列之一
        return ['success', 'warning', 'danger'].indexOf(value) !== -1;
      },
    },
    dynamicProp: String,
    numProp: {
      type: Number,
      default: 1, // 預設值
    },
    boolPropDef: Boolean,
    boolProp: Boolean,
    arrayProp: {
      type: Array,
      // object、array 預設值須以 function 獲取
      default: function() {
        return [9, 8, 7];
      },
    },
    objectProp: Object,
    id: Number,
    title: String,
  },
  data: function() {
    return {
      // 以 prop 作為初始值，異動 num data property
      num: this.numProp,
    };
  },
};
</script>
