<template>
  <v-container fluid>
    <v-sheet>
      <v-toolbar flat>
        <v-switch
          label="Open All"
          v-model="openAll"
          hide-details
          @click="$refs.treeview.updateAll(openAll)"
        ></v-switch>
        <v-text-field
          label="Search"
          v-model="search"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          class="mx-4"
        ></v-text-field>
      </v-toolbar>
    </v-sheet>
    <v-treeview
      ref="treeview"
      :items="items"
      item-disabled="locked"
      return-object
      v-model="selectedItems"
      selectable
      selected-color="basil"
      on-icon="mdi-bookmark"
      off-icon="mdi-bookmark-outline"
      indeterminate-icon="mdi-bookmark-minus"
      :active.sync="activedItems"
      activatable
      color="primary"
      :open.sync="openedItems"
      open-on-click
      open-all
      hoverable
      :search="search"
      transition
      expand-icon="mdi-chevron-down"
    >
      <template v-slot:prepend="{ open }">
        <v-icon>
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
      </template>
      <template v-slot:label="{ item }">
        <v-list-item :to="item.path" class="ml-n3">
          <v-list-item-title> {{ item.id }} {{ item.name }} </v-list-item-title>
        </v-list-item>
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
    activedItems: [],
    search: '',
    openAll: true
  })
};
</script>
