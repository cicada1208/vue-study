<template>
  <v-container fluid>
    <v-slide-y-transition>
      <v-btn v-if="!alert" @click="alert = true" dark>
        reset alert
      </v-btn>
    </v-slide-y-transition>
    <v-alert
      v-model="alert"
      type="error"
      color="error"
      dismissible
      dense
      outlined
      text
      transition="slide-y-reverse-transition"
    >
      alert msg...
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    alert: true,
  }),
};
</script>
