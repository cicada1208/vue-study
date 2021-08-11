<template>
  <v-container fluid>
    <v-row>
      <v-rating
        v-model="rating"
        length="10"
        half-increments
        hover
        small
        dense
        color="warning"
        background-color="warning lighten-1"
        @input="ratingChange"
      ></v-rating>
      <span class="mt-1 grey--text text--lighten-1 text-caption">
        ({{ rating }})
      </span>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rating: 6.5
  }),
  methods: {
    ratingChange(num) {
      console.log('rating:', num);
    }
  }
};
</script>
