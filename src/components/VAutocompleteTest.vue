<template>
  <v-container>
    <v-autocomplete
      v-model="itemsSelected"
      :items="items"
      label="v-autocomplete"
      multiple
      auto-select-first
      clearable
      chips
      deletable-chips
      outlined
    ></v-autocomplete>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ['foo', 'bar', 'fizz', 'buzz'],
    itemsSelected: [],
  }),
};
</script>

<style></style>
