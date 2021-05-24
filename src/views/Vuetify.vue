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
  </v-container>
</template>

<script>
export default {
  components: {
    VTableTest: () =>
      import(
        /* webpackChunkName: "vtable.test" */
        '@/components/VTableTest.vue'
      ),
  },

  data: () => ({
    tableSelect: false,
  }),

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
