<template>
  <v-container>
    <v-switch label="tableSelect" v-model="tableSelect"> </v-switch>
    <v-table :tableSelect="tableSelect" />
  </v-container>
</template>
<script>
import VTable from '../components/VTable.vue';
export default {
  components: { VTable },
  data: () => ({
    tableSelect: false,
  }),
};
</script>
