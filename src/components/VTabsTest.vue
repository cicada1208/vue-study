<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="secondary" dark>
        <v-toolbar-title>Your Dashboard</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            center-active
            show-arrows
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            icons-and-text
            grow
            slider-color="yellow"
          >
            <!-- v-tabs property: align-with-title、centered、right、grow 可擇一配置-->
            <v-tab v-for="item in items" :key="item">
              {{ item }}
              <v-icon>mdi-heart</v-icon>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs v-model="tab" vertical>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item" class="justify-start">
          <v-icon left>mdi-heart</v-icon>
          {{ item }}
        </v-tab>

        <v-tabs-items v-model="tab">
          <!-- v-tab-item: 展開過的 v-tab-item 其內容才會 render -->
          <v-tab-item v-for="item in items" :key="item">
            <v-card flat>
              <v-card-text v-text="text"></v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: ['web', 'shopping', 'videos', 'images', 'news'],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };
  }
};
</script>
