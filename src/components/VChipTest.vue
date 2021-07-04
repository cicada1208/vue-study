<template>
  <v-container>
    <v-row justify="space-around" align="center">
      <v-switch v-model="active" label="Active"></v-switch>
      <v-chip :input-value="active" filter>
        I'm v-chip
      </v-chip>

      <v-chip :input-value="active" filter filter-icon="mdi-plus">
        I'm v-chip
      </v-chip>

      <v-chip :input-value="active" filter filter-icon="mdi-minus">
        I'm v-chip
      </v-chip>
    </v-row>

    <v-combobox
      v-model="comboItemsSelected"
      :items="comboItems"
      label="Your favorite hobbies"
      multiple
      clearable
      prepend-icon="mdi-filter-variant"
      chips
      solo
      class="mt-4 mx-auto"
      style="width: 500px"
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          @click="select"
          close
          @click:close="remove(item)"
          color="primary"
        >
          <strong>{{ item }}</strong>
        </v-chip>
      </template>
    </v-combobox>

    <v-card class="mx-auto" max-width="500">
      <v-toolbar flat color="transparent">
        <v-toolbar-title>v-chip</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-if="!allSelected" @click="$refs.search.focus()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-container class="py-0">
        <v-row align="center" justify="start">
          <v-col
            v-for="(selection, i) in itemsSelected"
            :key="selection.text"
            class="shrink"
          >
            <v-menu
              v-model="selection.showMenu"
              :close-on-content-click="false"
              bottom
              right
              transition="scale-transition"
              origin="top left"
            >
              <template v-slot:activator="{ on }">
                <v-chip
                  v-on="on"
                  :disabled="loading"
                  close
                  @click:close="itemsSelected.splice(i, 1)"
                >
                  <v-icon left v-text="selection.icon"></v-icon>
                  {{ selection.text }}
                </v-chip>
              </template>
              <v-card>
                <v-card-actions>
                  <v-card-text>
                    {{ selection.text }}
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="selection.showMenu = false">
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-col>

          <v-col v-if="!allSelected" cols="12">
            <v-text-field
              ref="search"
              v-model="search"
              full-width
              hide-details
              label="Search"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-list>
        <template v-for="item in itemsFiltered">
          <v-list-item
            v-if="!itemsSelected.includes(item)"
            :key="item.text"
            :disabled="loading"
            @click="itemsSelected.push(item)"
          >
            <v-list-item-avatar>
              <v-icon :disabled="loading" v-text="item.icon"></v-icon>
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!itemsSelected.length"
          :loading="loading"
          color="purple"
          text
          @click="next"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    active: false,
    comboItems: ['Streaming', 'Eating'],
    comboItemsSelected: [],
    items: [
      {
        text: 'Nature',
        icon: 'mdi-nature',
        showMenu: false,
      },
      {
        text: 'Nightlife',
        icon: 'mdi-glass-wine',
        showMenu: false,
      },
      {
        text: 'November',
        icon: 'mdi-calendar-range',
        showMenu: false,
      },
      {
        text: 'Portland',
        icon: 'mdi-map-marker',
        showMenu: false,
      },
      {
        text: 'Biking',
        icon: 'mdi-bike',
        showMenu: false,
      },
    ],
    itemsSelected: [],
    loading: false,
    search: '',
  }),

  computed: {
    allSelected() {
      return this.itemsSelected.length === this.items.length;
    },
    itemsFiltered() {
      const search = this.search.toLowerCase();

      if (!search) return this.items;

      return this.items.filter((item) => {
        const text = item.text.toLowerCase();
        return text.indexOf(search) > -1;
      });
    },
  },

  watch: {
    itemsSelected() {
      this.search = '';
    },
  },

  methods: {
    remove(item) {
      this.comboItemsSelected.splice(this.comboItemsSelected.indexOf(item), 1);
    },
    next() {
      this.loading = true;

      setTimeout(() => {
        this.search = '';
        this.itemsSelected = [];
        this.loading = false;
      }, 2000);
    },
  },
};
</script>
