<template>
  <v-container fluid>
    <v-progress-linear :value="progress" buffer-value="0" stream height="13">
      <strong>{{ Math.ceil(progress) }}%</strong>
    </v-progress-linear>

    <br />

    <!-- 使用 v-model 可於 view 中拉動 -->
    <v-progress-linear v-model="progress" buffer-value="0" stream height="13">
      <strong>{{ Math.ceil(progress) }}%</strong>
    </v-progress-linear>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    progress: 40
  })
};
</script>
