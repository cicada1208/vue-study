// webpack config 審查: vue inspect > webpack.output.js
// BASE_URL: 與 vue.config.js 的 publicPath 相符，即應用部署的基礎路徑。

// 設定環境變量: 程式版本
process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  // config
};
