import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

// minify-css-string: Remove new lines and extra space from a string of css.
// 縮小生成的主題樣式
// npm install minify-css-string
import minifyTheme from 'minify-css-string';

Vue.use(Vuetify);

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
        success: '#81C784',
        error: '#E57373',
        // testcolor: '#B9B7B7', // 自定義顏色，可用於 component color="testcolor"
      },
      dark: {
        primary: '#455A64',
        secondary: '#757575',
        success: '#33691E',
        error: '#BF360C',
      },
    },
    options: {
      minifyTheme,
    },
  },
});
