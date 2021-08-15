<template>
  <v-container fluid>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :step="1" :complete="step > 1" editable>
        Select an app
        <small>Summarize if needed</small>
      </v-stepper-step>
      <!--v-stepper-content: 未展開的 v-stepper-content 其內容也會 render -->
      <v-stepper-content :step="1">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="step = step + 1">
          Continue
        </v-btn>
        <v-btn text @click="step = 3">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-step :step="2" :complete="step > 2" editable>
        Configure analytics for this app
      </v-stepper-step>
      <v-stepper-content :step="2">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="step = step + 1">
          Continue
        </v-btn>
        <v-btn text @click="step = step - 1">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-step :step="3" editable>
        Select an ad format and name ad unit
      </v-stepper-step>
      <v-stepper-content :step="3">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="step = 1">
          Continue
        </v-btn>
        <v-btn text @click="step = step - 1">
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    step: 1
  })
};
</script>
