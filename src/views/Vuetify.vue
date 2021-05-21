<template>
  <v-container>
    <v-switch label="tableSelect" v-model="tableSelect" />
    <v-text-field
      label="tableSelect"
      v-model="tableSelect"
      readonly
      append-icon="mdi-menu"
    />
    <v-table :tableSelect="tableSelect" />
  </v-container>
</template>

<script>
export default {
  components: {
    VTable: () =>
      import(
        /* webpackChunkName: "vtable" */
        '@/components/VTable.vue'
      ),
  },
  data: () => ({
    tableSelect: false,
  }),
};
</script>
