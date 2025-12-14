import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-console': 'off',
      'import/extensions': 'off',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    },
  },
  {
    ignores: ['node_modules/**', 'coverage/**'],
  },
]
