import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

// 7 Material Studies 可供選擇：
// https://vuetifyjs.com/zh-Hans/features/presets/
// 安裝 reply preset：vue add vuetify-preset-reply
// import { preset } from 'vue-cli-plugin-vuetify-preset-reply/preset';

Vue.use(Vuetify);

// const options = {
//   // theme: {
//   //   dark: false,
//   //   themes: {
//   //     light: {
//   //       primary: '#1976D2',
//   //       secondary: '#424242',
//   //       accent: '#82B1FF',
//   //       error: '#FF5252',
//   //       info: '#2196F3',
//   //       success: '#4CAF50',
//   //       warning: '#FB8C00',
//   //     },
//   //     dark: {
//   //       primary: '#2196F3',
//   //       secondary: '#424242',
//   //       accent: '#FF4081',
//   //       error: '#FF5252',
//   //       info: '#2196F3',
//   //       success: '#4CAF50',
//   //       warning: '#FB8C00',
//   //     },
//   //   },
//   // },
// };

export default new Vuetify({
  // vuetify 會有自己的 defaults
  // preset, // 再以 preset merge
  // options, // 再以 user options merge
});
