import globals from 'globals';
import pluginJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import babelParser from '@babel/eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser, parser: babelParser },
    plugins: {
      prettier: prettierPlugin,
    },
  },
  pluginJs.configs.recommended,
  // mimic ESLintRC-style extends
  ...compat.extends('airbnb-base'),
  prettierConfig,
  {
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/eslint.config.mjs', '**/babel.config.json'],
        },
      ],
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'prettier/prettier': 'error',
    },
  },
];
