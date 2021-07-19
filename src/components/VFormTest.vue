<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="First name"
            v-model="firstName"
            :rules="nameRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Last name"
            v-model="lastName"
            :rules="nameRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn color="success" @click="save">save</v-btn>
        <v-btn color="error" @click="validate">validate</v-btn>
      </v-card-actions>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false, // v-form 內的驗證皆正確=true，否則＝false
    firstName: '',
    lastName: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    save() {
      console.log('valid:', this.valid);
    },
    validate() {
      // 頁面載入時雖然會執行 nameRules、emailRules 驗證，
      // 但需 focus 過才會顯示錯誤訊息，
      // 執行 validate() 可顯示錯誤訊息。
      this.$refs.form.validate();
    },
  },
};
</script>
