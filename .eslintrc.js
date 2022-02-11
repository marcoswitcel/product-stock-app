module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'no-labels': 'off',
    'no-unused-labels': 'off',
    'no-unused-vars': 'warn'
  }
}
