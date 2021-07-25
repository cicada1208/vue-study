<template>
  <v-container fluid>
    <v-data-table
      item-key="id"
      :show-select="tableSelect"
      :headers="headers"
      :items="items"
    >
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  props: {
    tableSelect: { type: Boolean, default: false },
  },

  data: () => ({
    headers: [
      { text: '員工編號', value: 'id' },
      { text: '部門', value: 'dep' },
      { text: '姓名', value: 'name' },
    ],
    items: [
      { id: 1, dep: '部門a', name: 'apple' },
      { id: 2, dep: '部門b', name: 'banana' },
      { id: 3, dep: '部門c', name: 'melo' },
    ],
  }),
};
</script>
