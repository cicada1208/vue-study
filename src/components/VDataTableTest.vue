<template>
  <!-- v-lazy: 默認情況下並不會顯示它的內容, 直到它與屏幕相交。 -->
  <v-lazy
    v-model="tableActive"
    :options="{
      threshold: 0.5
    }"
    transition="fade-transition"
  >
    <v-container fluid>
      <!-- custom-filter 會覆蓋 search 的默認過濾，
      若 header 有自定義 filter，custom-filter 不會應用於該 header。 -->
      <!-- v-data-table 使用 v-data-footer 渲染 footer。 -->
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="name"
        v-model="itemSelected"
        show-select
        :single-select="singleSelect"
        :search="search"
        :custom-filter="filterTextCol"
        multi-sort
        :sort-by="['calories', 'fat']"
        :sort-desc="[false, true]"
        group-by="category"
        group-desc
        show-group-by
        fixed-header
        height="500px"
        :footer-props="{
          showFirstLastPage: true
        }"
        class="elevation-2"
      >
        <template v-slot:top>
          <!-- table 上方添加內容 -->
          <v-toolbar color="primary" dark>
            <v-switch
              label="Single select"
              v-model="singleSelect"
              hide-details
            ></v-switch>
            <v-text-field
              label="Search"
              v-model="search"
              clearable
              hide-details
              prepend-inner-icon="mdi-magnify"
              class="mx-2"
            ></v-text-field>
            <v-text-field
              label="Calories less than"
              v-model="calories"
              type="number"
              clearable
              hide-details
              class="mx-2"
            ></v-text-field>
            <v-btn @click="log">log</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:header="{ props: { headers } }">
          <thead>
            <tr>
              <th :colspan="headers.length">
                This is a header
              </th>
            </tr>
          </thead>
        </template>
        <template v-slot:body.prepend="{ headers }">
          <!-- <tbody> 開頭添加內容 -->
          <tr>
            <td :colspan="headers.length">
              This is a prepended row
            </td>
          </tr>
        </template>
        <template v-slot:body.append="{ headers }">
          <!-- <tbody> 結尾添加內容 -->
          <tr>
            <td :colspan="headers.length">
              This is an appended row
            </td>
          </tr>
        </template>
        <template v-slot:footer>
          <div class="ml-4">
            This is a footer
          </div>
        </template>
      </v-data-table>
    </v-container>
  </v-lazy>
</template>

<script>
export default {
  data: () => ({
    tableActive: false,
    singleSelect: false,
    itemSelected: [],
    search: '',
    calories: '',
    items: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
        category: 'Ice cream'
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
        category: 'Ice cream'
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
        category: 'Cookie'
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
        category: 'Pastry'
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
        category: 'Cookie'
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
        category: 'Candy'
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
        category: 'Candy'
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
        category: 'Toffee'
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
        category: 'Pastry'
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
        category: 'Candy'
      }
    ]
  }),
  computed: {
    headers() {
      return [
        {
          text: 'Dessert (100g serving)',
          value: 'name',
          align: 'start',
          sortable: false,
          groupable: false
        },
        {
          text: 'Calories',
          value: 'calories',
          groupable: false,
          filter: value => {
            if (!this.calories) return true;
            return value < parseInt(this.calories);
          }
        },
        { text: 'Fat (g)', value: 'fat', groupable: false },
        { text: 'Carbs (g)', value: 'carbs', groupable: false },
        { text: 'Protein (g)', value: 'protein', groupable: false },
        {
          text: 'Iron (%)',
          value: 'iron',
          filterable: false,
          groupable: false
        },
        { text: 'Category', value: 'category' }
      ];
    }
  },
  methods: {
    filterTextCol(value, search, item) {
      console.log('value:', value);
      console.log('search:', search);
      console.log('item:', item);
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search.toLocaleUpperCase()) !== -1
      );
    },
    log() {
      console.log('itemSelected:', this.itemSelected);
    }
  }
};
</script>
