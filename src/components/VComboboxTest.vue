<template>
  <v-container>
    <!-- v-combobox 允許輸入不存在於 items 的項目 -->
    <v-combobox
      label="Favorite hobbies"
      v-model="comboItemsSelected"
      :items="comboItems"
      :search-input.sync="comboSearch"
      multiple
      hide-selected
      clearable
      chips
    >
      <template v-slot:selection="{ attrs, item, select, selected, parent }">
        <!-- @click:close="removeComboItem(item)" -->
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          @click="select"
          close
          @click:close="parent.selectItem(item)"
          color="primary"
        >
          <strong>{{ item }}</strong>
        </v-chip>
      </template>
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "<strong>{{ comboSearch }}</strong
              >". Press <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>

    <v-combobox
      label="Search for options"
      v-model="itemsSelected"
      :items="items"
      :search-input.sync="search"
      :hide-no-data="!search"
      multiple
      hide-selected
      small-chips
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <span>Create</span>
          <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :input-value="selected"
          :color="`${item.color} lighten-3`"
          dark
          label
          small
        >
          <span class="pr-2">
            {{ item.text }}
          </span>
          <v-icon small @click="parent.selectItem(item)">
            $delete
          </v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-text-field
          v-if="itemEditing === item"
          v-model="itemEditing.text"
          @keyup.enter="editItem(item)"
          autofocus
          hide-details
          background-color="transparent"
          flat
          solo
        ></v-text-field>
        <v-chip v-else :color="`${item.color} lighten-3`" dark label small>
          {{ item.text }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="editItem(item)">
            <v-icon>{{
              itemEditing !== item ? 'mdi-pencil' : 'mdi-check'
            }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    comboItems: ['Streaming', 'Eating'],
    comboItemsSelected: [],
    comboSearch: null,

    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    items: [
      { header: 'Select an option or create one' },
      {
        text: 'Foo',
        color: 'blue',
      },
      {
        text: 'Bar',
        color: 'red',
      },
    ],
    itemsSelected: [
      {
        text: 'Foo',
        color: 'blue',
      },
    ],
    search: null,
    itemEditing: null,
    nonce: 1,
  }),

  methods: {
    removeComboItem(item) {
      this.comboItemsSelected.splice(this.comboItemsSelected.indexOf(item), 1);
    },
    editItem(item) {
      if (!this.itemEditing) this.itemEditing = item;
      else this.itemEditing = null;
    },
  },

  watch: {
    itemsSelected(val, prev) {
      if (val.length === prev.length) return;

      this.itemsSelected = val.map((v) => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          };

          this.items.push(v);
          this.nonce++;
        }

        return v;
      });
    },
  },
};
</script>
