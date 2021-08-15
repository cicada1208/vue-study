<template>
  <v-container fluid>
    <v-switch label="Expand Single Item" v-model="singleExpand"></v-switch>
    <v-data-iterator
      :items="items"
      item-key="name"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      :single-expand="singleExpand"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="mb-3" color="primary" dark>
          <v-text-field
            label="Search"
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="mx-1"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.smAndUp">
            <v-spacer></v-spacer>
            <v-select
              label="Sort by"
              v-model="sortBy"
              :items="sortKeys"
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              class="mx-1"
            ></v-select>
            <v-btn-toggle v-model="sortDesc" mandatory tile>
              <v-btn :value="false" color="primary">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn :value="true" color="primary">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>
                <h4>{{ item.name }}</h4>
              </v-card-title>
              <v-switch
                :input-value="isExpanded(item)"
                :label="isExpanded(item) ? 'Expanded' : 'Closed'"
                class="pl-4 mt-0"
                @change="v => expand(item, v)"
              ></v-switch>
              <v-divider></v-divider>
              <v-list v-if="isExpanded(item)" dense>
                <v-list-item>
                  <v-list-item-content>Calories:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.calories }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text ml-3">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                class="ml-2"
                dark
                text
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    singleExpand: false,
    search: '',
    sortBy: 'name',
    sortDesc: false,
    itemsPerPage: 2,
    itemsPerPageArray: [1, 2, 4],
    page: 1,
    items: [
      {
        name: 'Frozen Yogurt',
        calories: 159
      },
      {
        name: 'Ice cream sandwich',
        calories: 237
      },
      {
        name: 'Eclair',
        calories: 262
      },
      {
        name: 'Cupcake',
        calories: 305
      }
    ]
  }),
  computed: {
    sortKeys() {
      return this.items.length > 0 ? Object.keys(this.items[0]) : [];
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    }
  }
};
</script>
