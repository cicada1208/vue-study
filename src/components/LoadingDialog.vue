<template>
  <v-dialog v-model="loading" persistent hide-overlay width="300">
    <v-card color="primary" dark>
      <v-card-text>
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
      default: false,
    },
  },
};
</script>
