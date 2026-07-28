// Shared ESLint flat config base for Angular 22 sub-projects.
// NOTE: This is an OPTIONAL shared reference config — it is not currently
// imported/extended by any sub-project's eslint.config.js. Kept for reference only.
//
// Sub-projects install: eslint, @angular-eslint/eslint-plugin,
// @angular-eslint/eslint-plugin-template, @angular-eslint/template-parser,
// typescript-eslint, and may extend this via customConfig.
//
// This root config provides the common rules; each project's eslint.config.js
// could import and merge `baseConfig` from here, then add its own files/globs.
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export const baseConfig = tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.angular/**', '**/coverage/**'],
  },
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...angular.configs.tsRecommended,
  ...angular.configs.templateRecommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
);