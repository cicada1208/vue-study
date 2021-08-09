<template>
  <v-container>
    <v-progress-linear :value="skill" color="blue-grey" height="20">
      <strong>{{ Math.ceil(skill) }}%</strong>
    </v-progress-linear>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    skill: 20
  })
};
</script>
