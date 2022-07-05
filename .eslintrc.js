module.exports = {
  extends: ['eslint-config-ali/typescript/react'],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'react/prop-types': [0],
    'arrow-parens': [2, 'as-needed'],
  },
}
