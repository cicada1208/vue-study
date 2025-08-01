<template>
  <v-container fluid>
    <v-row justify="space-around" align="center" class="mb-1">
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

    <v-card class="mx-auto" max-width="500">
      <v-toolbar flat color="transparent">
        <v-toolbar-title>v-chip</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-if="!allSelected" @click="$refs.search.focus()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-container fluid class="py-0">
        <v-row justify="start" align="center">
          <v-col
            v-for="(selection, i) in itemsSelected"
            :key="selection.text"
            class="shrink"
          >
            <v-menu
              v-model="selection.showMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              bottom
              right
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

      <v-card-actions class="justify-end">
        <v-btn
          :disabled="!itemsSelected.length"
          :loading="loading"
          color="primary"
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

    items: [
      {
        text: 'Nature',
        icon: 'mdi-nature',
        showMenu: false
      },
      {
        text: 'Nightlife',
        icon: 'mdi-glass-wine',
        showMenu: false
      },
      {
        text: 'November',
        icon: 'mdi-calendar-range',
        showMenu: false
      },
      {
        text: 'Portland',
        icon: 'mdi-map-marker',
        showMenu: false
      },
      {
        text: 'Biking',
        icon: 'mdi-bike',
        showMenu: false
      }
    ],
    itemsSelected: [],
    loading: false,
    search: ''
  }),

  computed: {
    allSelected() {
      return this.itemsSelected.length === this.items.length;
    },
    itemsFiltered() {
      const search = this.search.toLowerCase();

      if (!search) return this.items;

      return this.items.filter(item => {
        const text = item.text.toLowerCase();
        return text.indexOf(search) > -1;
      });
    }
  },

  watch: {
    itemsSelected() {
      this.search = '';
    }
  },

  methods: {
    next() {
      this.loading = true;

      setTimeout(() => {
        this.search = '';
        this.itemsSelected = [];
        this.loading = false;
      }, 2000);
    }
  }
};
</script>
