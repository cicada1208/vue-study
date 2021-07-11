<template>
  <v-container>
    <!-- <v-autocomplete
      label="v-autocomplete"
      v-model="aItemsSelected"
      :items="aItems"
      item-text="name"
      item-value="id"
      :filter="nameAbbrFilter"
      multiple
      auto-select-first
      clearable
      chips
      deletable-chips
      outlined
    ></v-autocomplete> -->
    <v-autocomplete
      label="v-autocomplete"
      v-model="aItemsSelected"
      :items="aItems"
      item-text="name"
      item-value="id"
      :filter="nameAbbrFilter"
      multiple
      auto-select-first
      clearable
      chips
      deletable-chips
      outlined
    >
      <!-- v-slot:selection: 自定義 selection 樣式 -->
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          @click="select"
          close
          @click:close="removeAItem(item)"
          color="primary"
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
          :items="apiRst.result.entries"
          item-text="Description"
          item-value="API"
          return-object
          :search-input.sync="apiSearch"
          :loading="apiRst.loading"
          hide-no-data
          hide-selected
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
      { name: 'Florida', abbr: 'FL', id: 1 },
      { name: 'Georgia', abbr: 'GA', id: 2 },
      { divider: true },
      { header: 'Group 2' },
      { name: 'New York', abbr: 'NY', id: 3 },
    ],
    aItemsSelected: [],

    apiRst: { loading: false, result: {}, error: '' },
    apiSelected: null,
    apiSearch: null,
  }),

  methods: {
    nameAbbrFilter(item, queryText, itemText) {
      // 自定義篩選：加入縮寫的篩選
      console.log('itemText:', itemText);
      if (itemText === '') return;
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.includes(searchText) || textTwo.includes(searchText);
    },
    removeAItem(item) {
      this.aItemsSelected.splice(this.aItemsSelected.indexOf(item), 1);
    },
  },

  watch: {
    apiSearch(text) {
      console.log('apiSearch:', text);

      // Items have already been loaded
      if (this.apiRst.result.entries) return;

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
