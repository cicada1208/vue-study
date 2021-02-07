// webpack config 審查: vue inspect > webpack.output.js

const pkgJson = require('./package.json');

// 環境變量 BASE_URL: 與 vue.config.js 的 publicPath 相符，即應用部署的基礎路徑。
// 用法同 webpack 的 output.publicPath，但 Vue CLI 在其他地方也需用到此值，
// 所以請設定在 vue.config.js 的 publicPath。

// 環境變量 程式版本: VUE_APP_VERSION 為自定義變數
process.env.VUE_APP_VERSION = pkgJson.version;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `/${pkgJson.name}/` : '/',
};
