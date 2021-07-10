<template>
  <v-container>
    <v-autocomplete
      label="v-autocomplete"
      v-model="itemsSelected"
      :items="items"
      item-text="name"
      item-value="id"
      :filter="nameAbbrFilter"
      multiple
      auto-select-first
      clearable
      chips
      deletable-chips
      outlined
    ></v-autocomplete>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      { name: 'Florida', abbr: 'FL', id: 1 },
      { name: 'Georgia', abbr: 'GA', id: 2 },
      { name: 'New York', abbr: 'NY', id: 3 },
    ],
    itemsSelected: [],
  }),

  methods: {
    nameAbbrFilter(item, queryText, itemText) {
      // 自定義篩選：加入縮寫的篩選
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      console.log(itemText);
      return textOne.includes(searchText) || textTwo.includes(searchText);
    },
  },
};
</script>

<style></style>
