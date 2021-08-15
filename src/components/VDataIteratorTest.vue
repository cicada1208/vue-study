<template>
  <v-container fluid>
    <v-switch label="Expand Single Item" v-model="singleExpand"></v-switch>
    <v-data-iterator
      :items="desserts"
      item-key="name"
      :items-per-page="2"
      :single-expand="singleExpand"
    >
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
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    singleExpand: false,
    desserts: [
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
  })
};
</script>
