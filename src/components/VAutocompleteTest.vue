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
          @click:close="remove(item)"
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
        Explore hundreds of free API's ready for consumption! For more
        information visit
        <a
          class="grey--text text--lighten-3"
          href="https://github.com/toddmotto/public-apis"
          target="_blank"
          >the GitHub repository</a
        >.
      </v-card-text>
      <v-card-text>
        <v-autocomplete
          label="Public APIs"
          placeholder="Start typing to Search"
          v-model="model"
          :items="items"
          item-text="Description"
          item-value="API"
          :loading="isLoading"
          :search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model" class="red lighten-3">
          <v-list-item v-for="(field, i) in fields" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="field.value"></v-list-item-title>
              <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
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

    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || 'n/a',
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    },
  },

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
    remove(item) {
      this.aItemsSelected.splice(this.aItemsSelected.indexOf(item), 1);
    },
  },

  watch: {
    async search(text) {
      console.log('search:', text);

      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      const url = 'https://api.publicapis.org/entries';
      const data = await apiUtil.axiosPs({ url, method: 'GET' });
      this.entries = data.entries;
      this.isLoading = false;
    },
  },
};
</script>
