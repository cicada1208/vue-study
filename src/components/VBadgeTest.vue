<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="auto">
        <v-btn color="primary" @click="messages++">
          Send Notifications
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="secondary" @click="messages = 0">
          Clear Notifications
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-badge
          :content="messages"
          :value="messages"
          color="success"
          overlap
          offset-x="10"
          offset-y="10"
        >
          <v-icon large>
            mdi-vuetify
          </v-icon>
        </v-badge>
      </v-col>
      <v-col cols="auto">
        <v-badge
          content="9999+"
          :value="hover"
          color="info"
          right
          transition="slide-x-transition"
        >
          <v-hover v-model="hover">
            <v-icon large>
              mdi-account
            </v-icon>
          </v-hover>
        </v-badge>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    messages: 0,
    hover: false,
  }),
};
</script>
