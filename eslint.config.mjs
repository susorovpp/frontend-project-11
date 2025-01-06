import globals from 'globals';
import pluginJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import babelParser from '@babel/eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { __dirname } from './src/utils/pathHelpers.js';

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ['dist/'],
  },
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
          devDependencies: [
            '**/eslint.config.mjs',
            '**/babel.config.json',
            '**/webpack.config.js',
          ],
        },
      ],
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'prettier/prettier': 'error',
      'import/extensions': [
        'error',
        {
          js: 'always',
        },
      ],
    },
  },
];
