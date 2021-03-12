<!--
<template>
  <div>Archive component</div>
</template>
-->

<script>
export default {
  render: function(createElement) {
    // return createElement('h' + this.level, this.$slots.default);
    return createElement('div', [
      createElement('h' + this.level, this.$slots.default),
      createElement('h' + this.level, 'create muti element.'),
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
