module.exports = {
  extends: [
    'eslint-config-ali/typescript/react',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    'no-console': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'react/prop-types': [0],
    'arrow-parens': [2, 'as-needed'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/consistent-type-assertions': [
      'warn',
      { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
    ],
    'no-debugger': 'off',
  },
}
