<template>
  <input type="text" :value="value" v-on="listeners" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input(不含.native修飾器)
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('input', event.target.value)
      };
    }
  }
};
</script>
