import eslint from '@eslint/js'
import globals from 'globals'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
})

export default [
  eslint.configs.recommended,
  ...compat.extends('airbnb-base'),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        chrome: 'readonly',
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    rules: {
      semi: ['error', 'never'],
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: true,
      }],
      'comma-dangle': ['error', 'always-multiline'],
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: true,
      }],
      'no-console': 'error',
      'func-names': 'error',
    },
  },
]
