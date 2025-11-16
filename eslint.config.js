import path from 'path'
import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import { includeIgnoreFile } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'

const gitignore = path.join(process.cwd(), '.gitignore')

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
})

export default defineConfig([
  includeIgnoreFile(gitignore),
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
])
