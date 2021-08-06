<template>
  <v-container fluid>
    <v-card>
      <v-card-actions class="justify-space-between">
        <v-btn :disabled="step === 1" @click="step--" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-item-group v-model="step" class="text-center" mandatory>
          <v-item
            v-for="n in list.length"
            :value="n"
            :key="n"
            v-slot="{ active, toggle }"
          >
            <v-btn :input-value="active" @click="toggle" icon>
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn :disabled="step === list.length" @click="step++" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>

      <v-divider></v-divider>

      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ list[step - 1] }}</span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="30"
          v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item v-for="n in list.length" :value="n" :key="n">
          <v-card-text v-if="n === 1">
            <v-text-field
              :label="list[step - 1]"
              v-model="email"
            ></v-text-field>
          </v-card-text>
          <v-card-text v-else-if="n === 2">
            <v-text-field
              :label="list[step - 1]"
              v-model="password"
              type="password"
            ></v-text-field>
          </v-card-text>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-pagination v-model="step" :length="list.length"></v-pagination>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    list: ['Email', 'Password'],
    email: '',
    password: '',
  }),
};
</script>
