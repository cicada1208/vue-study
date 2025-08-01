<template>
  <v-container fluid>
    <v-card :loading="loading" max-width="500" class="mx-auto">
      <template slot="progress">
        <v-progress-linear
          indeterminate
          color="primary"
          height="4"
        ></v-progress-linear>
      </template>

      <v-toolbar :color="selection.length ? 'primary' : 'secondary'" dark>
        <v-app-bar-nav-icon v-if="!selection.length"></v-app-bar-nav-icon>
        <v-btn v-else icon @click="selection = []">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>
          {{ selection.length ? `${selection.length} selected` : 'v-card' }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-scale-transition>
          <v-btn v-if="selection.length" @click="itemsLoading" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-scale-transition>
        <v-scale-transition>
          <v-btn v-if="selection.length" @click="itemsLoading" icon>
            <v-icon>mdi-export-variant</v-icon>
          </v-btn>
        </v-scale-transition>

        <v-btn @click="reveal = true" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-select
          :items="items"
          v-model="selection"
          multiple
          label="select items"
        ></v-select>
      </v-card-text>

      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 6 : 1"
                :class="{ 'v-card--hover': true, 'on-hover': hover }"
              >
                <v-img
                  :src="card.src"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)"
                  :aspect-ratio="16 / 9"
                >
                  <v-card-title v-text="card.title"></v-card-title>
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5">
                      </v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

                <v-card-actions class="justify-end">
                  <!-- <v-spacer></v-spacer> -->
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-bookmark</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="justify-end">
        <!-- <v-spacer></v-spacer> -->
        <v-btn @click="expand = !expand" icon>
          <v-icon>{{ expand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="v-card--reveal transition-fast-in-fast-out"
        >
          <v-card-title class="text-h5 grey lighten-2">reveal</v-card-title>
          <v-card-text>
            select items and test btn
            .......................................................................................................................................................................................................................................................................
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn @click="reveal = false" color="warning" text>
              CLOSE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>

      <v-expand-transition>
        <div v-if="expand">
          <v-divider></v-divider>
          <v-card-text>
            expand message.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    selection: [],
    loading: false,
    reveal: false,
    expand: false,
    cards: [
      {
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        flex: 12
      },
      {
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 6
      },
      {
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6
      }
    ]
  }),
  methods: {
    itemsLoading() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 5000);
    }
  }
};
</script>

<style scoped>
.v-card--hover {
  transition: opacity 0.2s ease-in-out;
}

.v-card--hover:not(.on-hover) {
  opacity: 0.9;
}

.v-card--reveal {
  position: absolute;
  bottom: 0;
  opacity: 1 !important;
  width: 100%;
  height: 100%;
}
</style>
