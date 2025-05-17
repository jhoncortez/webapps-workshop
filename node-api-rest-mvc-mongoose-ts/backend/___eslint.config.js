// filepath: /home/jonc-bastidas/Desktop/development/webapps-workshop/node-api-rest-mvc-mongoose-ts/backend/eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  files: ['**/*.{js,mjs,cjs,ts}'],
  plugins: { '@typescript-eslint': tseslint },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
    globals: globals.node,
  },
  rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    '@typescript-eslint/no-unused-vars': ['error'],
  },
});