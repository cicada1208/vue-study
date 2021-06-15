<template>
  <div>
    <!-- $emit: 觸發自定義事件 -->
    <v-btn @click="$emit('enlarge-text')" color="primary" class="mx-1">
      enlarge text
    </v-btn>
    <v-btn @click="$emit('enlarge-text2', 1)" color="primary" class="mx-1">
      enlarge text2
    </v-btn>
    <v-btn @click="$emit('decrease-text', -0.1)" color="primary" class="mx-1">
      decrease text
    </v-btn>

    <p>staticProp: {{ staticProp }}</p>
    <p>dynamicProp: {{ dynamicProp }}</p>
    <p>numProp: {{ numProp }} num: {{ num }}</p>
    <p>boolPropDef: {{ boolPropDef }}</p>
    <p>boolProp: {{ boolProp }}</p>
    <p>arrayProp: {{ arrayProp }}</p>
    <p>objectProp: {{ objectProp }}</p>
    <p>id: {{ id }}, title: {{ title }}</p>

    <p>
      slot:
      <br />
      <!-- slot 若未指定 name 即為 <slot name="default"> -->
      <slot>child: default backup slot</slot>
      <br />

      <!-- slot prop user 傳遞至父級 -->
      <slot name="userName" :user="user">child: {{ user.lastName }}</slot>
    </p>

    <p>twoWayProp in comonent: {{ twoWayProp }}</p>
    <v-btn @click="updateTwowayProp" color="primary">
      update two way prop
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'PropSlot',

  props: {
    // prop 會在組件實例創建前進行驗證
    // 故 data、computed property 在 default 或 validator 中不可用
    staticProp: {
      type: String,
      required: true, // 必填驗證
      validator: function(value) {
        // 自定義驗證函式: 值必須匹配下列之一，return falsy 值就是驗證失敗
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
    twoWayProp: Number,
  },

  // data: 透過 function return new object，各自獨立，避免共用。
  data() {
    return {
      // 以 prop 作為初始值，異動 num data property
      num: this.numProp,
      user: { firstName: 'H', lastName: 'W' },
    };
  },
  // 若使用 arrow function，則 this 不會指向組件實例，不過仍可將實例作為函數的第一個參數來訪問。
  // data: (vm) => ({
  //   // 以 prop 作為初始值，異動 num data property
  //   num: vm.numProp,
  //   user: { firstName: 'H', lastName: 'W' },
  // }),

  methods: {
    updateTwowayProp: function() {
      this.$emit('update:twoWayProp', ++this.num);
    },
  },
};
</script>
