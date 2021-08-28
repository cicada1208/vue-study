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
        v-model="selectedItem"
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
          <v-toolbar color="secondary" dark>
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
            <v-btn @click="log" class="mx-2" icon>
              <v-row class="flex-column align-center">
                <v-icon>mdi-console</v-icon>
                Log
              </v-row>
            </v-btn>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" v-bind="attrs" class="mx-2" icon>
                  <v-row class="flex-column align-center">
                    <v-icon>mdi-pencil-plus</v-icon>
                    New
                  </v-row>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5 font-weight-regular">
                  {{ formTitle }}
                </v-card-title>

                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="primary" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5 grey lighten-3"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions class="justify-space-around">
                  <v-btn color="primary" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="primary" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
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
        <template v-slot:item.calories="{ item }">
          <v-chip :color="getCaloriesColor(item.calories)" dark>
            {{ item.calories }}
          </v-chip>
        </template>
        <template v-slot:item.glutenfree="{ item }">
          <v-simple-checkbox
            v-model="item.glutenfree"
            color="primary"
          ></v-simple-checkbox>
        </template>
        <template v-slot:item.name="{ item }">
          <!-- v-data-table 若設定 item-key="name"
          會影響 v-edit-dialog 使其鍵入一字便跳開 -->
          <v-edit-dialog
            :return-value.sync="item.name"
            @save="saveCol(item)"
            @cancel="cancelCol"
            @open="openCol"
            @close="closeCol"
          >
            {{ item.name }}
            <template v-slot:input>
              <v-text-field
                v-model="item.name"
                label="Edit"
                single-line
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.iron="{ item }">
          <v-edit-dialog
            :return-value.sync="item.iron"
            large
            persistent
            @save="saveCol(item)"
            @cancel="cancelCol"
            @open="openCol"
            @close="closeCol"
          >
            {{ item.iron }}
            <template v-slot:input>
              <div class="mt-4 text-h6">
                Update Iron
              </div>
              <v-text-field
                v-model="item.iron"
                label="Edit"
                single-line
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:footer>
          <div class="ml-4">
            This is a footer
          </div>
        </template>
      </v-data-table>

      <msg-snackbar v-model="msgShow" :msgType="msgType" :msg="msg" top />
    </v-container>
  </v-lazy>
</template>

<script>
import { dessert } from '../models/dessert';

export default {
  components: {
    MsgSnackbar: () =>
      import(
        /* webpackChunkName: "msg.snackbar" */
        '@/components/MsgSnackbar.vue'
      )
  },

  data: () => ({
    tableActive: false,
    singleSelect: false,
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
        category: 'Ice cream',
        glutenfree: true
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
        category: 'Ice cream',
        glutenfree: false
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
        category: 'Cookie',
        glutenfree: false
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
        category: 'Pastry',
        glutenfree: false
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
        category: 'Cookie',
        glutenfree: false
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
        category: 'Candy',
        glutenfree: false
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
        category: 'Candy',
        glutenfree: false
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
        category: 'Toffee',
        glutenfree: false
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
        category: 'Pastry',
        glutenfree: false
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
        category: 'Candy',
        glutenfree: false
      }
    ],
    selectedItem: [],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: dessert(),
    msgShow: false,
    msgType: false,
    msg: ''
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
        { text: 'Gluten-Free', value: 'glutenfree', groupable: false },
        { text: 'Category', value: 'category' },
        { text: 'Actions', value: 'actions', sortable: false, groupable: false }
      ];
    },

    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },

    dialogDelete(val) {
      val || this.closeDelete();
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
      console.log('selectedItem:', this.selectedItem);
      console.log('items:', this.items);
    },

    getCaloriesColor(calories) {
      if (calories > 400) return 'red';
      else if (calories > 200) return 'orange';
      else return 'green';
    },

    close() {
      this.dialog = false; // 先執行該函式 close 後面程式段，再執行 dialog watch
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // });
      this.editedItem = dessert();
      this.editedIndex = -1;
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },

    closeDelete() {
      this.dialogDelete = false;
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // });
      this.editedItem = dessert();
      this.editedIndex = -1;
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.editedItem = item;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.editedItem = item;
      this.dialogDelete = true;
    },

    saveCol(item) {
      this.msgShow = true;
      this.msgType = 'success';
      this.msg = 'Data edit saved';
      console.log('item:', item);
    },

    cancelCol() {
      this.msgShow = true;
      this.msgType = 'warning';
      this.msg = 'Data edit canceled';
    },

    openCol() {
      this.msgShow = true;
      this.msgType = 'info';
      this.msg = 'Dialog opened';
    },

    closeCol() {
      console.log('Dialog closed');
    }
  }
};
</script>
