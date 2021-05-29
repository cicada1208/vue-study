<template>
  <v-container>
    <v-switch label="tableSelect" v-model="tableSelect" />
    <v-text-field
      label="tableSelect"
      v-model="tableSelect"
      readonly
      append-icon="mdi-menu"
      @click:append="showValue(tableSelect, $event)"
    />
    <v-table-test :tableSelect="tableSelect" />

    <!-- 滾動指令 $vuetify.goTo:
    target: 可以是從頁面頂部的像素偏移，也可是css選擇器，或是元素引用。 -->
    <!-- class="rounded-lg" 設定邊框半徑 -->
    <!-- class="blue-grey--text text--darken-3" 設定字體顏色 -->
    <v-btn
      @click="$vuetify.goTo(target, options)"
      color="secondary"
      block
      class="rounded-lg"
    >
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
