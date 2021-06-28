<template>
  <v-container>
    <h2>position</h2>
    <css-position />
  </v-container>
</template>

<script>
export default {
  components: {
    CssPosition: () =>
      import(
        /* webpackChunkName: "css.position" */
        '@/components/CssPosition.vue'
      ),
  },
};
</script>
