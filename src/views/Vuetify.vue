<template>
  <v-container>
    <v-switch label="tableSelect" v-model="tableSelect" />
    <v-text-field
      label="tableSelect"
      v-model="tableSelect"
      readonly
      append-icon="mdi-menu"
      @click:append="showValue(tableSelect, $event)"
    />
    <v-table-test :tableSelect="tableSelect" />
  </v-container>
</template>

<script>
export default {
  components: {
    VTableTest: () =>
      import(
        /* webpackChunkName: "vtable.test" */
        '@/components/VTableTest.vue'
      ),
  },

  data: () => ({
    tableSelect: false,
  }),

  methods: {
    showValue(value, event) {
      alert(`tag name: ${event.target.tagName}, value: ${value}`);
    },
  },
};
</script>
