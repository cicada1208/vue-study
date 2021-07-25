<template>
  <v-container fluid>
    <!-- <v-autocomplete
      label="v-autocomplete"
      v-model="aItemsSelected"
      :items="aItems"
      item-text="name"
      item-value="id"
      :filter="filterNameAbbr"
      multiple
      auto-select-first
      clearable
      chips
      deletable-chips
      outlined
    ></v-autocomplete> -->
    <v-autocomplete
      :label="`State — ${isEditing ? 'Editable' : 'Readonly'}`"
      :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'"
      persistent-hint
      :disabled="!isEditing"
      :readonly="!isEditing"
      v-model="aItemsSelected"
      :items="aItems"
      item-text="name"
      item-value="id"
      :filter="filterNameAbbr"
      multiple
      auto-select-first
      clearable
      chips
      deletable-chips
      outlined
    >
      <!-- v-slot:selection: 自定義 selection 樣式 -->
      <template v-slot:selection="{ attrs, item, select, selected, parent }">
        <!-- @click:close="removeAItem(item)" -->
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          @click="select"
          close
          @click:close="parent.selectItem(item)"
          color="primary"
          :disabled="!isEditing"
        >
          {{ item.name }}
        </v-chip>
      </template>
      <!-- v-slot:item: 自定義 item 樣式 -->
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="data.item.abbr"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            查無資料
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:append-outer>
        <v-slide-x-reverse-transition mode="out-in">
          <v-icon
            :key="`icon-${isEditing}`"
            @click="isEditing = !isEditing"
            :color="isEditing ? 'success' : 'info'"
            v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
          ></v-icon>
        </v-slide-x-reverse-transition>
      </template>
    </v-autocomplete>

    <v-card color="red lighten-2" dark>
      <v-card-title class="text-h5 red lighten-3">
        Search for Public APIs
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          label="Public APIs"
          placeholder="Start typing to Search"
          v-model="apiSelected"
          :items="apiRst.content.entries"
          item-text="Description"
          item-value="API"
          return-object
          :search-input.sync="apiSearch"
          :loading="apiRst.loading"
          hide-selected
          hide-no-data
          prepend-icon="mdi-database-search"
          color="white"
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="apiSelected" class="red lighten-3">
          <v-list-item v-for="(value, key, i) in apiSelected" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="value"></v-list-item-title>
              <v-list-item-subtitle v-text="key"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!apiSelected"
          @click="apiSelected = null"
          color="grey darken-3"
        >
          Clear
          <v-icon right>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import apiUtil from '../libs/api.util';
export default {
  data: () => ({
    aItems: [
      { header: 'Group 1' },
      { name: 'Florida', abbr: 'FL', id: 1, disabled: true },
      { name: 'Georgia', abbr: 'GA', id: 2 },
      { divider: true },
      { header: 'Group 2' },
      { name: 'New York', abbr: 'NY', id: 3 },
    ],
    aItemsSelected: [],
    isEditing: false,

    apiRst: { loading: false, content: {}, error: '' },
    apiSelected: null,
    apiSearch: null,
  }),

  methods: {
    filterNameAbbr(item, queryText, itemText) {
      // 自定義篩選：加入縮寫的篩選
      console.log('itemText:', itemText);
      if (itemText === '') return;
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.includes(searchText) || textTwo.includes(searchText);
    },
    removeAItem(item) {
      // aItemsSelected is [1,2, ...]
      this.aItemsSelected.splice(this.aItemsSelected.indexOf(item.id), 1);
    },
  },

  watch: {
    apiSearch(text) {
      console.log('apiSearch:', text);

      // Items have already been loaded
      if (this.apiRst.content.entries) return;

      // Items have already been requested
      if (this.apiRst.loading) return;

      // Lazily load input items
      apiUtil.axiosRs(this.apiRst, {
        url: 'https://api.publicapis.org/entries',
        method: 'GET',
      });
    },
  },
};
</script>
