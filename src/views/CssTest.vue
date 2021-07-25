<template>
  <v-container fluid>
    <h2>position: sticky</h2>
    <css-position />
    <h2>z-index:</h2>
    <css-zindex />
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
    CssZindex: () =>
      import(
        /* webpackChunkName: "css.zindex" */
        '@/components/CssZindex.vue'
      ),
  },
};
</script>
