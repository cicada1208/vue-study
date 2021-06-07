<template>
  <v-container>
    <v-row justify="space-around">
      <div>
        <v-btn class="mx-1" color="primary" @click="messages++">
          Send Notifications
        </v-btn>

        <v-btn class="mx-1" color="secondary" @click="messages = 0">
          Clear Notifications
        </v-btn>
      </div>

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

      <v-badge
        content="9999+"
        :value="hover"
        color="info"
        left
        transition="slide-x-transition"
      >
        <v-hover v-model="hover">
          <v-icon large>
            mdi-account
          </v-icon>
        </v-hover>
      </v-badge>
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
