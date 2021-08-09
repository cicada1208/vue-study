<template>
  <v-dialog
    v-model="loading"
    :hide-overlay="hideOverlay"
    persistent
    width="300"
  >
    <v-card color="primary" dark style="opacity:85%">
      <v-card-text class="pt-1">
        loading...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingDialog',

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    hideOverlay: {
      type: Boolean,
      default: false
    }
  }
};
</script>
