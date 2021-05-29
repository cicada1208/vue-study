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
        primary: '#607d8b',
        // primary: '#1976D2',
        // secondary: '#424242',
        // accent: '#82B1FF',
        // error: '#FF5252',
        // info: '#2196F3',
        // success: '#4CAF50',
        // warning: '#FB8C00',
        // testcolor: '#b9b7b7', // 自定義顏色，可用於 component color="testcolor"
      },
      // dark: {
      //   primary: '#2196F3',
      //   secondary: '#424242',
      //   accent: '#FF4081',
      //   error: '#FF5252',
      //   info: '#2196F3',
      //   success: '#4CAF50',
      //   warning: '#FB8C00',
      // },
    },
    options: {
      minifyTheme,
    },
  },
});
