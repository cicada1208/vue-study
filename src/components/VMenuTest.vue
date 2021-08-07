<template>
  <v-container fluid>
    <v-menu min-width="auto" offset-x>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
              color="primary"
            >
              Dropdown w/ Tooltip
            </v-btn>
          </template>
          <span>Im A ToolTip</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [{ title: 'Click Me1' }, { title: 'Click Me2' }],
  }),
};
</script>
