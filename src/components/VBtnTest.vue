<template>
  <v-container>
    <v-btn
      :loading="loading3"
      :disabled="loading3"
      @click="loader = 'loading3'"
      color="primary"
      outlined
    >
      Upload
      <v-icon right>
        mdi-cloud-upload
      </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loader: null,
      loading3: false,
    };
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>
