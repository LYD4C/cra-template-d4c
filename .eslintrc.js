module.exports = {
  extends: ['eslint-config-ali/typescript/react'],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'react/prop-types': [0],
    'arrow-parens': [2, 'as-needed'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/consistent-type-assertions': ['warn', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter'}],
  },
}
