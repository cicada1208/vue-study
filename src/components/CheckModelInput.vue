<template>
  <div>
    <input
      id="chkboxmi"
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    <label for="chkboxmi">{{ checked }}</label>
  </div>
</template>

<script>
export default {
  name: 'CheckModelInput',

  // 組件上的 v-model 默認會利用名為 value prop 和 input event，
  // 但像單選框、複選框等類型的輸入控件可能會將 value attribute 用於不同的目的，
  // model 選項可用來避免這樣的衝突。
  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    checked: Boolean,
  },
};
</script>
