module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    // add more generic rulesets here
    'eslint:recommended',
    'plugin:vue/essential',
    // 'plugin:prettier/recommended',
  ],
  rules: {
    // override/add rules settings here
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['off', 'windows'], // 關閉 win os 對換行的 lint
  },
};
