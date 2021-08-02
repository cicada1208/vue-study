<template>
  <v-container fluid>
    <v-card>
      <v-list>
        <template v-for="(grp, i) in list">
          <v-list-group v-if="grp.subgroup" :key="i" :prepend-icon="grp.icon">
            <template v-slot:activator>
              <v-list-item-title v-text="grp.text"></v-list-item-title>
            </template>
            <v-list-group
              v-for="(subg, i) in grp.subgroup"
              :key="i"
              no-action
              sub-group
            >
              <template v-slot:activator>
                <v-list-item-title v-text="subg.text"></v-list-item-title>
              </template>
              <v-list-item v-for="(subi, i) in subg.subitem" :key="i" link>
                <v-list-item-title v-text="subi.text"></v-list-item-title>
                <v-list-item-icon>
                  <v-icon v-text="subi.icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>
          </v-list-group>
          <v-list-item v-else :key="i" link>
            <v-list-item-icon>
              <v-icon v-text="grp.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="grp.text"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    list: [
      { text: 'Home', icon: 'mdi-home' },
      {
        text: 'Users',
        icon: 'mdi-account-circle',
        subgroup: [
          {
            text: 'Admin',
            subitem: [
              { text: 'Management', icon: 'mdi-account-multiple-outline' },
              { text: 'Settings', icon: 'mdi-cog-outline' },
            ],
          },
          {
            text: 'Actions',
            subitem: [
              { text: 'Create', icon: 'mdi-plus-outline' },
              { text: 'Read', icon: 'mdi-file-outline' },
            ],
          },
        ],
      },
    ],
  }),
};
</script>
