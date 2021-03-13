<!--
<template>
  <div>render function component</div>
</template>
-->

<script>
export default {
  name: 'RenderFuncComp',
  render: function(createElement) {
    // createElement: 回傳 virtual node(VNode)
    // return createElement('h' + this.level, this.$slots.default);
    return createElement('div', [
      createElement('h' + this.level, this.$slots.default),
      createElement('h' + this.level, 'create multi element.'),
    ]);
  },
  props: {
    level: {
      type: Number,
      default: 2,
    },
  },
};
</script>
