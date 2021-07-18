<template>
  <v-container>
    <v-file-input
      label="File input"
      placeholder="Pick a pic"
      accept="image/*"
      :rules="rules"
      counter
      show-size
      chips
    ></v-file-input>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: [
      (value) =>
        !value || value.size < 2000000 || 'size should be less than 2 MB!',
    ],
  }),
};
</script>
