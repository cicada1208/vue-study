<template>
  <div class="test-comp">
    <!-- $emit: 被 v-on 監聽，觸發自定義事件 -->
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

    <p>
      v-model:
      <input
        type="checkbox"
        id="chkbox"
        :checked="checked"
        @change="$emit('change', $event.target.checked)"
      />
      <label for="chkbox">{{ checked }}</label>
    </p>

    <p>
      slot:
      <br />
      <!-- slot 若未指定 name 即為 <slot name="default"> -->
      <slot>default backup slot </slot>
      <br />

      <!-- slot prop user 傳遞至父級 -->
      <slot name="userName" :user="user">
        {{ user.lastName }}
      </slot>
    </p>

    <p>twoWayProp in comonent: {{ twoWayProp }}</p>
    <button @click="onUpdateTwowayProp">
      update two way prop
    </button>
  </div>
</template>

<script>
export default {
  name: 'PropSlotComp',
  model: {
    prop: 'checked',
    event: 'change',
  },
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
    checked: Boolean,
    twoWayProp: Number,
  },
  data: function() {
    return {
      // 以 prop 作為初始值，異動 num data property
      num: this.numProp,
      user: { firstName: 'H', lastName: 'W' },
    };
  },
  methods: {
    onUpdateTwowayProp: function() {
      this.$emit('update:twoWayProp', ++this.num);
    },
  },
};
</script>
