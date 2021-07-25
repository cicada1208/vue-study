<template>
  <v-container fluid>
    <v-card>
      <v-snackbar
        v-model="snackbar"
        timeout="3000"
        color="success"
        fixed
        centered
      >
        <span class="mx-4">submit successful!</span>
        <v-icon dark @click="snackbar = !snackbar">
          mdi-checkbox-marked-circle
        </v-icon>
      </v-snackbar>
      <v-form v-model="valid" ref="form" @submit.prevent="submit">
        <!-- v-container: 內容居中和水平填充。
        fluid: 將容器在所有設備 viewport 上完全擴展。 -->
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                label="Name"
                v-model="name"
                :rules="[ruleUtil.required(), ruleUtil.maxLen(10)]"
                clearable
                clear-icon="mdi-close-circle"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                label="E-mail"
                v-model="email"
                :rules="[ruleUtil.required(), ruleUtil.email()]"
                clearable
                clear-icon="mdi-close-circle"
              >
                <v-icon slot="prepend" color="primary">
                  mdi-email
                </v-icon>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                label="Password"
                v-model="password"
                :rules="[ruleUtil.required()]"
                :type="showPw ? 'text' : 'password'"
                :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPw = !showPw"
                clearable
                clear-icon="mdi-close-circle"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-file-input
                label="File"
                placeholder="Pick an image"
                v-model="files"
                :rules="[ruleUtil.file(2)]"
                accept="image/*"
                multiple
                counter
                show-size
                chips
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="3">
              <v-textarea
                label="Note"
                v-model="note"
                :rules="[ruleUtil.required()]"
                auto-grow
                rows="2"
                clearable
                clear-icon="mdi-close-circle"
                prepend-icon="mdi-comment"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="3">
              <v-radio-group
                label="v-radio-group"
                v-model="radioGroup"
                :rules="[ruleUtil.required()]"
              >
                <v-radio
                  v-for="n in 3"
                  :label="`radio ${n}`"
                  :value="n"
                  :key="n"
                ></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="12" md="3">
              <v-checkbox
                v-model="checkbox"
                v-for="n in 3"
                :label="`checkbox ${n}`"
                :value="`checkbox ${n}`"
                :key="n"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" md="3">
              <v-switch
                v-model="vswitch"
                v-for="n in 3"
                :label="`switch ${n}`"
                :value="`switch ${n}`"
                :key="n"
              >
              </v-switch>
            </v-col>

            <v-col cols="12" md="3">
              <v-slider
                :label="slider.label"
                v-model="slider.val"
                :min="slider.min"
                :max="slider.max"
                :step="slider.step"
                :thumb-color="slider.thumbColor"
                thumb-label="always"
                append-icon="mdi-magnify-plus-outline"
                prepend-icon="mdi-magnify-minus-outline"
                @click:append="zoomIn"
                @click:prepend="zoomOut"
                ticks
              ></v-slider>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn color="info" @click="log">log</v-btn>
            <v-btn color="error" @click="validate">validate</v-btn>
            <v-btn color="secondary" @click="$refs.form.reset()">
              clear
            </v-btn>
            <v-btn type="submit" :disabled="!valid" color="success">
              submit
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import ruleUtil from '../libs/rule.util';

export default {
  data: () => ({
    ruleUtil,
    valid: false, // v-form 內的驗證皆正確=true，否則＝false
    name: '',
    email: '',
    password: '',
    showPw: false,
    files: [],
    note: '',
    radioGroup: null,
    checkbox: [],
    vswitch: [],
    slider: {
      label: 'v-slider',
      val: 50,
      min: 0,
      max: 100,
      step: 10,
      thumbColor: 'info',
    },
    snackbar: false,
  }),
  methods: {
    log() {
      console.log('valid:', this.valid);
      console.log('radioGroup:', this.radioGroup);
      console.log('checkbox:', this.checkbox);
      console.log('vswitch:', this.vswitch);
    },
    validate() {
      // 頁面載入時雖會執行 nameRules、emailRules 驗證，
      // 但需 focus 過欄位才會顯示錯誤訊息，
      // 執行 validate() 可驗證並顯示所有欄位錯誤訊息。
      this.$refs.form.validate();
    },
    submit() {
      this.snackbar = true;
    },
    zoomOut() {
      this.slider.val = this.slider.val - this.slider.step || this.slider.min;
    },
    zoomIn() {
      this.slider.val = this.slider.val + this.slider.step || this.slider.max;
    },
  },
};
</script>
