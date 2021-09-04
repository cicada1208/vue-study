import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { Ripple, VList } from 'vuetify/lib';
// Translation provided by Vuetify (javascript)
import zhHant from 'vuetify/lib/locale/zh-Hant';
import DatetimePicker from 'vuetify-datetime-picker';
// minify-css-string: Remove new lines and extra space from a string of css.
// 縮小生成的主題樣式
// npm install minify-css-string
import minifyTheme from 'minify-css-string';

Vue.use(Vuetify, {
  // [Vue warn]: Failed to resolve directive: ripple
  // issue: https://github.com/vuetifyjs/vuetify/issues/12224
  directives: {
    Ripple
  },
  // 若有使用動態組件例如 tag="v-list"，該組件需全局註冊。
  // 但動態組件 <component :is="my-component">，可在 local 註冊即可。
  // https://vuetifyjs.com/zh-Hans/features/treeshaking/
  components: { VList }
});

Vue.use(DatetimePicker);

// 可再自定更改主題: this.$vuetify.theme.dark = true;
export default new Vuetify({
  // vuetify 預設會有 defaults
  // 可再以下列 user options merge
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#90A4AE',
        secondary: '#9E9E9E',
        accent: '#B0BEC5',
        success: '#81C784',
        error: '#E57373',
        info: '#64B5F6',
        warning: '#FFB74D',
        basil: '#356859', // 自定義顏色
        cornsilk: 'FFF8DC'
      },
      dark: {
        primary: '#455A64',
        secondary: '#757575',
        success: '#33691E',
        error: '#BF360C'
      }
    },
    options: {
      minifyTheme
    }
  },
  lang: {
    locales: { zhHant },
    current: 'zhHant'
  }
});
