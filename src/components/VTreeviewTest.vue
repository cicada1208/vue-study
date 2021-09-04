<template>
  <v-container fluid>
    <v-treeview
      :items="items"
      item-disabled="locked"
      return-object
      v-model="selectedItems"
      selectable
      selected-color="basil"
      :active.sync="activedItems"
      activatable
      color="primary"
      :open.sync="openedItems"
      open-on-click
      open-all
      hoverable
      transition
    >
      <template v-slot:prepend="{ open }">
        <v-icon>
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
      </template>
    </v-treeview>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        name: 'Applications :',
        locked: true,
        children: [
          { id: 2, name: 'Calendar : app' },
          { id: 3, name: 'Chrome : app' }
        ]
      },
      {
        id: 4,
        name: 'Documents :',
        children: [
          {
            id: 5,
            name: 'vuetify :',
            children: [
              { id: 6, name: 'index : ts' },
              { id: 7, name: 'bootstrap : ts' }
            ]
          }
        ]
      }
    ],
    selectedItems: [],
    openedItems: [],
    activedItems: []
  })
};
</script>
