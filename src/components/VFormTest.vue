<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            label="First name"
            v-model="firstName"
            :rules="nameRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            label="Last name"
            v-model="lastName"
            :rules="nameRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field label="E-mail" v-model="email" :rules="emailRules">
            <v-icon slot="prepend" color="primary">
              mdi-email
            </v-icon>
          </v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-file-input
            label="File input"
            placeholder="Pick an image"
            v-model="files"
            accept="image/*"
            :rules="fileRules"
            multiple
            counter
            show-size
            chips
          ></v-file-input>
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
      (v) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) || 'E-mail must be valid';
      },
    ],
    files: [],
    fileRules: [
      (v) => {
        // when multiple: param v is an array of files
        // when not multiple: param v is a file
        // return false or error message 表示為錯誤狀態
        let result =
          !v.length ||
          !v.filter((f) => f.size > 2000000).length ||
          'Each size should be less than 2 MB!';
        return result;
      },
    ],
  }),
  methods: {
    save() {
      console.log('valid:', this.valid);
    },
    validate() {
      // 頁面載入時雖會執行 nameRules、emailRules 驗證，
      // 但需 focus 過欄位才會顯示錯誤訊息，
      // 執行 validate() 可驗證並顯示所有欄位錯誤訊息。
      this.$refs.form.validate();
    },
  },
};
</script>
