<template>
  <v-container>
    <div class="align-center d-flex pb-2">
      <v-btn @click="expandAll">
        Expand All
      </v-btn>
      <v-btn @click="expandNone">
        Expand None
      </v-btn>
      <div>Expand Idxes:{{ expandIdxes }}</div>
    </div>
    <v-expansion-panels v-model="expandIdxes" multiple accordion focusable>
      <v-expansion-panel v-for="(panel, i) in panelCount" :key="i">
        <v-expansion-panel-header>{{ panel }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      expandIdxes: [],
      panelCount: 2,
    };
  },
  methods: {
    expandAll() {
      this.expandIdxes = [...Array(this.panelCount).keys()];
    },
    expandNone() {
      this.expandIdxes = [];
    },
  },
};
</script>
