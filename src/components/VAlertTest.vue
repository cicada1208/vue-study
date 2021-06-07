<template>
  <v-container>
    <v-alert
      v-model="alert"
      type="error"
      color="error"
      dismissible
      dense
      outlined
      text
      transition="slide-x-transition"
    >
      alert msg...
    </v-alert>
    <v-btn v-if="!alert" @click="alert = true" dark>
      reset alert
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    alert: true,
  }),
};
</script>
