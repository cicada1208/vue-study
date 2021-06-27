<template>
  <v-container>
    <v-card :loading="loading" max-width="500" class="mx-auto">
      <template slot="progress">
        <v-progress-linear
          color="primary"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-toolbar :color="selection.length ? 'secondary' : 'primary'" dark>
        <v-app-bar-nav-icon v-if="!selection.length"></v-app-bar-nav-icon>
        <v-btn v-else icon @click="selection = []">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>
          {{ selection.length ? `${selection.length} selected` : 'Items' }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-scale-transition>
          <v-btn v-if="selection.length" @click="delAndload" key="delete" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-scale-transition>
        <v-scale-transition>
          <v-btn v-if="selection.length" key="export" icon>
            <v-icon>mdi-export-variant</v-icon>
          </v-btn>
        </v-scale-transition>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-select
          :items="items"
          v-model="selection"
          multiple
          label="Select an option"
        ></v-select>
      </v-card-text>
    </v-card>

    <v-card class="mx-auto" max-width="344">
      <v-card-text>
        <div>Word of the Day</div>
        <p class="text-h4 text--primary">
          el·ee·mos·y·nar·y
        </p>
        <p>adjective</p>
        <div class="text--primary">
          relating to or dependent on charity; charitable.<br />
          "an eleemosynary educational institution."
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" @click="reveal = true">
          Learn More
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%;"
        >
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary">
              Origin
            </p>
            <p>
              late 16th century (as a noun denoting a place where alms were
              distributed): from medieval Latin eleemosynarius, from late Latin
              eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
            </p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text color="teal accent-4" @click="reveal = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
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
  }),
  methods: {
    delAndload() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 5000);
    },
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
