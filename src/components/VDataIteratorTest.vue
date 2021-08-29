<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      item-key="name"
      :single-expand="singleExpand"
      :expanded.sync="expandedItems"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      hide-default-footer
      dark
    >
      <template v-slot:header>
        <v-toolbar class="mb-3" color="secondary" dark>
          <v-switch
            label="Single expand"
            v-model="singleExpand"
            hide-details
          ></v-switch>
          <v-text-field
            label="Search"
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="mx-2"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.smAndUp">
            <v-select
              label="Sort by"
              v-model="sortBy"
              :items="sortCols"
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              class="mx-2"
            ></v-select>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn :value="true">
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
      <template v-slot:footer="{ updateOptions }">
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text ml-3">Items per page</span>
          <v-menu offset-y open-on-hover>
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
              <!-- @click="updateItemsPerPage(number)" -->
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateOptions({ itemsPerPage: number })"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="grey--text mr-4">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn @click="formerPage" icon color="primary">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn @click="nextPage" icon color="primary">
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
    ],
    singleExpand: false,
    expandedItems: [],
    search: '',
    sortBy: 'name',
    sortDesc: false,
    itemsPerPage: 2,
    itemsPerPageArray: [1, 2, 4],
    page: 1
  }),
  computed: {
    sortCols() {
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
