<template>
  <!-- v-container: 內容居中和水平填充。
  fluid: 將容器在所有設備 viewport 上完全擴展。 -->
  <v-container fluid>
    <v-card>
      <v-form v-model="valid" ref="form" @submit.prevent="submit">
        <v-card-text>
          <!-- v-row: flexbox，
          class="flex-column": column 方向排列。
          cols="auto": v-col 寬度會依內容展開，多筆 v-col 若超過 v-row 寬度會 wrap。 -->
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
                prepend-icon="mdi-form-textbox-password"
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
                @click:prepend="showNote(note, $event)"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="3">
              <v-menu
                ref="dateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-combobox
                    label="Date"
                    v-model="dates"
                    multiple
                    clearable
                    readonly
                    chips
                    small-chips
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    :rules="[ruleUtil.required()]"
                  ></v-combobox>
                </template>
                <v-date-picker
                  locale="zh-TW"
                  v-model="dates"
                  :min="minDate"
                  :allowed-dates="allowedDates"
                  :picker-date.sync="pickerDate"
                  multiple
                  no-title
                  scrollable
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="3">
              <v-radio-group
                label="v-radio-group"
                v-model="vRadioGroup"
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
              <!-- v-btn-toggle: 可單選、多選，
              但無法 form.validate() and form.reset() -->
              <span>v-btn-toggle</span>
              <v-btn-toggle
                v-model="vBtnToggle"
                multiple
                group
                active-class="primary--text"
              >
                <v-btn v-for="n in 3" :value="n" :key="n">
                  {{ `btn ${n}` }}
                </v-btn>
              </v-btn-toggle>
            </v-col>

            <v-col cols="12" md="3">
              <!-- v-chip-group: 可單選、多選，
              但無法 form.validate() and form.reset() -->
              <span>v-chip-group</span>
              <v-chip-group
                v-model="vChipGroup"
                multiple
                column
                active-class="primary--text"
              >
                <v-chip v-for="n in 3" :value="n" :key="n" filter outlined>
                  {{ `chip ${n}` }}
                </v-chip>
              </v-chip-group>
            </v-col>

            <v-col cols="12" md="3">
              <!-- v-list-item-group: 可單選、多選，
              但無法 form.validate() and form.reset() -->
              <span>v-list-item-group</span>
              <v-list>
                <v-list-item-group
                  v-model="vListItemGroup"
                  multiple
                  active-class="primary--text"
                >
                  <v-list-item
                    v-for="(item, i) in items"
                    :value="item.text"
                    :key="i"
                    v-slot="{ active }"
                  >
                    <!-- <template v-slot:default="{ active }"> -->
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text">
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox :input-value="active"></v-checkbox>
                    </v-list-item-action>
                    <!-- </template> -->
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>

            <v-col cols="12" md="3">
              <span>v-slide-group</span>
              <v-slide-group
                v-model="vSlideGroup"
                multiple
                show-arrows
                active-class="primary--text"
              >
                <v-slide-item
                  v-for="n in 10"
                  :value="n"
                  :key="n"
                  v-slot="{ active, toggle }"
                >
                  <v-chip
                    :input-value="active"
                    @click="toggle"
                    class="mx-2"
                    filter
                    outlined
                  >
                    slide {{ n }}
                  </v-chip>
                </v-slide-item>
              </v-slide-group>
            </v-col>

            <v-col cols="12" md="3" order="1" order-md="2">
              <v-checkbox
                v-model="vcheckbox"
                v-for="n in 3"
                :label="`checkbox ${n}`"
                :value="`checkbox ${n}`"
                :key="n"
                :rules="[ruleUtil.required()]"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="12" md="3" order="2" order-md="1">
              <v-switch
                v-model="vswitch"
                v-for="n in 3"
                :label="`switch ${n}`"
                :value="`switch ${n}`"
                :key="n"
              >
              </v-switch>
            </v-col>

            <!-- order: first = -1, last = 13 -->
            <v-col cols="12" md="3" offset-md="3" order="first" order-md="last">
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
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions class="sticky-bottom">
          <v-btn color="info" @click="log">log</v-btn>
          <v-btn color="error" @click="validate">validate</v-btn>
          <v-btn color="secondary" @click="$refs.form.reset()">
            clear
          </v-btn>
          <v-btn type="submit" :disabled="!valid" color="success">
            submit
          </v-btn>
        </v-card-actions>
      </v-form>

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
    </v-card>
  </v-container>
</template>

<script>
import ruleUtil from '../libs/rule.util';
import moment from 'moment';

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
    dates: [moment().format('YYYY-MM-DD')],
    minDate: moment().format('YYYY-MM-01'),
    pickerDate: null,
    vRadioGroup: null,
    vBtnToggle: [], // null,
    vChipGroup: [], // null,
    vListItemGroup: [],
    items: [
      {
        icon: 'mdi-star',
        text: 'Star',
      },
      {
        icon: 'mdi-email-open',
        text: 'Drafts',
      },
    ],
    vSlideGroup: [],
    vcheckbox: [],
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
      console.log('vRadioGroup:', this.vRadioGroup, typeof this.vRadioGroup);
      console.log('vBtnToggle:', this.vBtnToggle, typeof this.vBtnToggle);
      console.log('vChipGroup:', this.vChipGroup, typeof this.vChipGroup);
      console.log(
        'vListItemGroup:',
        this.vListItemGroup,
        typeof this.vListItemGroup
      );
      console.log('vSlideGroup:', this.vSlideGroup, typeof this.vSlideGroup);
      console.log('vcheckbox:', this.vcheckbox, typeof this.vcheckbox);
      console.log('vswitch:', this.vswitch, typeof this.vswitch);
      console.log('dates:', this.dates);
      console.log('pickerDate:', this.pickerDate);
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
    showNote(value, event) {
      alert(`tag name: ${event.target.tagName}, value: ${value}`);
    },
    allowedDates: (val) => parseInt(val.split('-')[2], 10) % 2 === 0,
  },
};
</script>
