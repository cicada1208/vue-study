<template>
  <v-container fluid>
    <v-treeview
      :items="items"
      color="primary"
      activatable
      hoverable
      open-on-click
      item-disabled="locked"
      selectable
    ></v-treeview>
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
        id: 5,
        name: 'Documents :',
        children: [
          {
            id: 6,
            name: 'vuetify :',
            children: [
              { id: 8, name: 'index : ts' },
              { id: 9, name: 'bootstrap : ts', locked: true }
            ]
          }
        ]
      }
    ]
  })
};
</script>
