<template>
  <!-- v-lazy: 默認情況下並不會顯示它的內容, 直到它與屏幕相交。 -->
  <v-lazy
    v-model="tableActive"
    :options="{
      threshold: 0.5,
    }"
    transition="fade-transition"
  >
    <v-container fluid>
      <v-switch label="tableSelect" v-model="tableSelect" />
      <v-data-table
        item-key="id"
        :show-select="tableSelect"
        :headers="headers"
        :items="items"
      >
      </v-data-table>
    </v-container>
  </v-lazy>
</template>

<script>
export default {
  data: () => ({
    tableActive: false,
    tableSelect: false,
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
