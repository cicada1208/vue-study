<template>
  <v-container fluid>
    <v-card class="mx-auto" width="300">
      <v-list dense>
        <template v-for="(item, i) in list">
          <v-list-group v-if="item.group" :key="i" :prepend-icon="item.icon">
            <template v-slot:activator>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </template>
            <template v-for="(sitem, i) in item.group">
              <v-list-group
                v-if="sitem.group"
                :key="i"
                no-action
                sub-group
                class="ml-2"
              >
                <template v-slot:activator>
                  <v-list-item-title v-text="sitem.text"></v-list-item-title>
                  <v-list-item-icon>
                    <v-icon v-text="sitem.icon"></v-icon>
                  </v-list-item-icon>
                </template>
                <v-list-item v-for="(ssitem, i) in sitem.group" :key="i" link>
                  <v-list-item-title v-text="ssitem.text"></v-list-item-title>
                  <v-list-item-icon>
                    <v-icon v-text="ssitem.icon"></v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>
              <v-list-item v-else :key="i" link>
                <v-list-item-title
                  v-text="sitem.text"
                  class="ml-14"
                ></v-list-item-title>
                <v-list-item-icon>
                  <v-icon v-text="sitem.icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </template>
          </v-list-group>
          <v-list-item v-else :key="i" link>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.text"></v-list-item-title>
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
        group: [
          {
            text: 'Admin',
            group: [
              { text: 'Management', icon: 'mdi-account-multiple' },
              { text: 'Settings', icon: 'mdi-cog' }
            ]
          },
          {
            text: 'Actions',
            group: [
              { text: 'Create', icon: 'mdi-plus' },
              { text: 'Read', icon: 'mdi-file' }
            ]
          },
          {
            text: 'Test',
            icon: 'mdi-close'
          }
        ]
      }
    ]
  })
};
</script>
