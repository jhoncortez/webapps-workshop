import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser, // Use the TypeScript parser
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // ESLint's recommended rules
      'no-unused-vars': 'warn',
      'no-undef': 'error',

      // TypeScript-ESLint's recommended rules
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Custom rules
      'semi': ['error', 'never'],
      
      // 'no-extra-semi': ['error', 'always'],
      // 'no-whitespace-before-property': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  },
]