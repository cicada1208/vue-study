<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="auto">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on: dig, attrs }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-bind="attrs"
                  v-on="{ ...tooltip, ...dig }"
                  color="error"
                >
                  Fullscreen dialog
                </v-btn>
              </template>
              <span>Im A ToolTip</span>
            </v-tooltip>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Privacy Policy
            </v-card-title>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <v-col cols="auto">
        <v-dialog
          persistent
          scrollable
          transition="dialog-top-transition"
          max-width="70%"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="primary"
              >v-slot:default</v-btn
            >
          </template>

          <template v-slot:default="dialog">
            <v-card>
              <v-card-title class="grey lighten-2"
                >opening from the top</v-card-title
              >
              <v-card-text style="height: 100px">
                <div class="text-h2 pa-12">Hello world!</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="auto">
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="success"
          @click.stop="loading = true"
        >
          Loading Dialog
        </v-btn>
        <loading-dialog v-model="loading" hide-overlay />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    LoadingDialog: () =>
      import(
        /* webpackChunkName: "loading.dialog" */
        '@/components/LoadingDialog.vue'
      )
  },

  data() {
    return {
      dialog: false,
      loading: false
    };
  },

  watch: {
    loading(newVal) {
      // if (!newVal) return;
      newVal && setTimeout(() => (this.loading = false), 3000);
    }
  }
};
</script>
