<template>
  <v-container fluid>
    <h2>display & hidden & text:</h2>
    <!-- 設定背景顏色: class="blue-grey darken-1" -->
    <!-- 設定字體顏色: class="blue-grey--text text--darken-3" -->
    <!-- 設定字體大小: class="text-md-h4": md 至 xl 斷點，h4 大小。 -->
    <!-- 設定字體強調: class="font-weight-bold font-italic" -->
    <!-- 設定邊框半徑:
    class="rounded-lg": lg 與斷點無關，代表的是半徑大小。 -->
    <!-- 顯示輔助 display:
    class="d-inline": xs 至 xl 斷點，inline 顯示。
    class="d-md-block": md 至 xl 斷點，block 顯示。
    class="d-inline d-md-block": xs 至 sm 斷點，inline 顯示；md 至 xl 斷點，block 顯示。 -->
    <!-- 顯示輔助 hidden:
    class="hidden-sm-and-down: xs 至 sm 斷點，隱藏。 -->
    <div class="my-4">
      <div
        class="d-inline d-md-block pa-2
        black white--text text-md-h4 font-weight-bold font-italic"
      >
        {{ $vuetify.breakpoint.name }}
      </div>
      <div
        class="d-inline d-md-block pa-2
        black white--text text-md-h4"
      >
        {{ $vuetify.breakpoint.name }}
      </div>
      <div
        class="hidden-sm-and-down d-md-block pa-2
        black white--text text-md-h4"
      >
        {{ $vuetify.breakpoint.name }}
      </div>
    </div>

    <h2>margin & text alignment:</h2>
    <!-- mx-auto: 水平置中 -->
    <!-- class="text-justify text-md-right:
    xs 至 sm 斷點，文本左右貼齊；md 至 xl 斷點，文本靠右對齊。 -->
    <!-- text-decoration-underline: 底線 -->
    <v-card
      class="my-4 mx-auto text-justify text-md-right text-decoration-underline"
      width="300px"
    >
      <v-card-text>
        Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus
        non, euismod id, nulla.
      </v-card-text>
      <v-card-text class="text-no-wrap">
        Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus
        non, euismod id, nulla.
      </v-card-text>
      <v-card-text class="text-truncate">
        Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus
        non, euismod id, nulla.
      </v-card-text>
    </v-card>

    <h2>float:</h2>
    <v-card class="my-4 pa-2">
      +++++++++++++
      <div class="float-left">
        <!-- float-left: 元素浮動在容器左側 -->
        Float left on all viewport sizes.
      </div>
      -------------
      <br />
      *************
      <div class="float-right">
        Float right on all viewport sizes.
      </div>
      /////////////
      <br />
      ..............
      <div class="float-none">
        Don't float on all viewport sizes.
      </div>
      #############
    </v-card>

    <h2>flexbox:</h2>
    <!-- d-flex 代表啟用 flexbox，方向排列預設是 flex-row。 -->
    <!-- class="d-flex flex-column flex-md-row":
    xs 至 sm 斷點，flex-column column 方向排列；
    md 至 xl 斷點，flex-md-row row 方向排列。 -->
    <!-- class="d-flex flex-column justify-start flex-md-row justify-md-end":
    橫軸對齊 justify-content 預設為x軸對齊。
    xs 至 sm 斷點，flex-column 爲 column 方向，當 flex-direction: column，justify-start 改為y軸對齊；
    md 至 xl 斷點，flex-md-row 爲 row 方向，justify-md-end 預設x軸對齊。 -->
    <!-- class="d-flex flex-column align-start flex-md-row align-md-end":
    縱軸對齊 align-items 預設為y軸對齊。
    xs 至 sm 斷點，flex-column 爲 column 方向，當 flex-direction: column，align-start 改為x軸對齊；
    md 至 xl 斷點，flex-md-row 爲 row 方向，align-md-end 預設y軸對齊。 -->
    <!-- class="order-1": flex item 排序。 -->
    <v-card
      class="d-flex flex-column justify-start flex-md-row justify-md-end my-4"
      :height="$vuetify.breakpoint.smAndDown ? 200 : 'auto'"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2 ma-2"
        :class="`order-${3 - n + 1}`"
        outlined
        tile
      >
        flex item {{ n }}
      </v-card>
    </v-card>

    <h2>v-alert:</h2>
    <v-alert-test />

    <h2>v-btn:</h2>
    <v-btn-test />

    <h2>v-badge:</h2>
    <v-badge-test />

    <h2>v-chip:</h2>
    <v-chip-test />

    <h2>v-card & v-toolbar & v-hover & v-img:</h2>
    <v-card-toolbar-test />

    <h2>v-autocomplete:</h2>
    <v-autocomplete-test />

    <h2>v-combobox:</h2>
    <v-combobox-test />

    <h2>v-form:</h2>
    <v-form-test />

    <h2>v-dialog:</h2>
    <v-dialog-test />

    <h2>v-expansion-panel:</h2>
    <v-expansion-panel-test />

    <h2>v-window:</h2>
    <v-window-test />

    <h2>task list & transition:</h2>
    <v-task-list />

    <h2>v-data-table:</h2>
    <v-table-test />

    <h2>v-calendar:</h2>
    <v-calendar-test />
  </v-container>
</template>

<script>
export default {
  name: 'Vuetify',

  components: {
    VTableTest: () =>
      import(
        /* webpackChunkName: "vtable.test" */
        '@/components/VTableTest.vue'
      ),
    VTaskList: () =>
      import(
        /* webpackChunkName: "vtask.list" */
        '@/components/VTaskList.vue'
      ),
    VAlertTest: () =>
      import(
        /* webpackChunkName: "valert.test" */
        '@/components/VAlertTest.vue'
      ),
    VBadgeTest: () =>
      import(
        /* webpackChunkName: "vbadge.test" */
        '@/components/VBadgeTest.vue'
      ),
    VBtnTest: () =>
      import(
        /* webpackChunkName: "vbtn.test" */
        '@/components/VBtnTest.vue'
      ),
    VCalendarTest: () =>
      import(
        /* webpackChunkName: "vcalendar.test" */
        '@/components/VCalendarTest.vue'
      ),
    VCardToolbarTest: () =>
      import(
        /* webpackChunkName: "vcard.toolbar.test" */
        '@/components/VCardToolbarTest.vue'
      ),
    VChipTest: () =>
      import(
        /* webpackChunkName: "vchip.test" */
        '@/components/VChipTest.vue'
      ),
    VDialogTest: () =>
      import(
        /* webpackChunkName: "vdialog.test" */
        '@/components/VDialogTest.vue'
      ),
    VExpansionPanelTest: () =>
      import(
        /* webpackChunkName: "vexpansion.panel.test" */
        '@/components/VExpansionPanelTest.vue'
      ),
    VAutocompleteTest: () =>
      import(
        /* webpackChunkName: "vautocomplete.test" */
        '@/components/VAutocompleteTest.vue'
      ),
    VComboboxTest: () =>
      import(
        /* webpackChunkName: "vcombobox.test" */
        '@/components/VComboboxTest.vue'
      ),
    VFormTest: () =>
      import(
        /* webpackChunkName: "vform.test" */
        '@/components/VFormTest.vue'
      ),
    VWindowTest: () =>
      import(
        /* webpackChunkName: "vwindow.test" */
        '@/components/VWindowTest.vue'
      ),
  },

  data: () => ({}),

  methods: {
    winResize() {
      console.log('breakpoint name:', this.$vuetify.breakpoint.name);
      console.log('breakpoint width:', this.$vuetify.breakpoint.width);
      console.log('breakpoint height:', this.$vuetify.breakpoint.height);
    },
  },

  mounted() {
    this.winResize();
    // passive: 設定 true 表示 listener 永不調用 preventDefault()。
    // 像監聽滾屏事件時，頁面會有短暫的延遲來檢測是否要 preventDefault()，
    // 設定 true 表關掉可避免 mobile 端卡頓。
    window.addEventListener('resize', this.winResize, { passive: true });
  },

  beforeDestroy() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', this.winResize, { passive: true });
  },
};
</script>
