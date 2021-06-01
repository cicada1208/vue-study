<template>
  <v-container>
    <h4>v-data-table:</h4>
    <v-switch label="tableSelect" v-model="tableSelect" />
    <v-text-field
      label="tableSelect"
      v-model="tableSelect"
      readonly
      append-icon="mdi-menu"
      @click:append="showValue(tableSelect, $event)"
    />
    <v-table-test :tableSelect="tableSelect" />

    <h4>display & hidden:</h4>
    <!-- 設定字體顏色: class="blue-grey--text text--darken-3" -->
    <!-- 設定背景顏色: class="blue-grey darken-1" -->
    <!-- 設定邊框半徑:
    class="rounded-lg": lg 與斷點無關，代表的是半徑大小。 -->
    <!-- 顯示輔助 display:
    class="d-inline": xs 至 xl 斷點，inline 顯示。
    class="d-md-block": md 至 xl 斷點，block 顯示。
    class="d-inline d-md-block": xs 至 sm 斷點，inline 顯示；md 至 xl 斷點，block 顯示。 -->
    <!-- 顯示輔助 hidden:
    class="hidden-sm-and-down: xs 至 sm 斷點，隱藏。 -->
    <div class="my-4">
      <div class="d-inline d-md-block pa-2 black white--text">
        {{ $vuetify.breakpoint.name }}
      </div>
      <div class="d-inline d-md-block pa-2 black white--text">
        {{ $vuetify.breakpoint.name }}
      </div>
      <div class="hidden-sm-and-down d-md-block pa-2 black white--text">
        {{ $vuetify.breakpoint.name }}
      </div>
    </div>

    <h4>flexbox:</h4>
    <!-- d-flex 代表啟用 flexbox，方向排列預設是 flex-row。 -->
    <!-- class="d-flex flex-column flex-md-row":
    xs 至 sm 斷點，flex-column column 方向排列；
    md 至 xl 斷點，flex-md-row row 方向排列。 -->
    <!-- class="d-flex flex-column justify-start flex-md-row justify-md-end":
    橫軸對齊 justify-content 預設為x軸對齊。
    xs 至 sm 斷點，flex-column 爲 column 方向，justify-start 改為y軸對齊；
    md 至 xl 斷點，flex-md-row 爲 row 方向，justify-md-end 預設x軸對齊。 -->
    <!-- class="d-flex flex-column align-start flex-md-row align-md-end":
    縱軸對齊 align-items 預設為y軸對齊。
    xs 至 sm 斷點，flex-column 爲 column 方向，align-start 改為x軸對齊；
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
        class="pa-2 ma-1"
        :class="`order-${3 - n + 1}`"
        outlined
        tile
      >
        flex item {{ n }}
      </v-card>
    </v-card>

    <h4>float:</h4>
    <v-card
      class="my-4"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
    >
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

    <h4>margin:</h4>
    <!-- mx-auto: 水平置中 -->
    <v-card class="mx-auto my-4" width="160px">
      <v-card-text>
        mx-auto: 水平置中
      </v-card-text>
    </v-card>

    <!-- 滾動指令 $vuetify.goTo:
    target: 可以是從頁面頂部的像素偏移，也可是css選擇器，或是元素引用。 -->
    <v-btn @click="$vuetify.goTo(target, options)" color="primary" block>
      scroll top
    </v-btn>
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
  },

  data: () => ({
    tableSelect: false,
    type: 'number',
    number: -9999,
  }),

  computed: {
    target() {
      const value = this[this.type];
      if (!isNaN(value)) return Number(value);
      else return value;
    },

    options() {
      return {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',
      };
    },
  },

  methods: {
    showValue(value, event) {
      alert(`tag name: ${event.target.tagName}, value: ${value}`);
    },

    winResize() {
      console.log('breakpoint name:', this.$vuetify.breakpoint.name);
      console.log('breakpoint width:', this.$vuetify.breakpoint.width);
      console.log('breakpoint height:', this.$vuetify.breakpoint.height);
    },
  },

  mounted() {
    this.winResize();
    // passive: true 表示 listener 永遠不會調用 preventDefault()，
    // 設定 true 的原因爲像監聽滾屏事件時，頁面會有短暫的延遲來檢測是否要 preventDefault()，
    // 關掉可避免 mobile 端卡頓。
    window.addEventListener('resize', this.winResize, { passive: true });
  },

  beforeDestroy() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', this.winResize, { passive: true });
  },
};
</script>
