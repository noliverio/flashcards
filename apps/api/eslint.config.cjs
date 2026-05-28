const { globalIgnores } = require('eslint/config');
const tseslint = require('@typescript-eslint/eslint-plugin');

const recommended = tseslint.configs && tseslint.configs.recommended ? tseslint.configs.recommended : {};
const recommendedRules = (recommended && recommended.rules) || {};

const config = {
  files: ['**/*.{ts,tsx}'],
    languageOptions: {
    globals: require('globals').node,
    parser: require('@typescript-eslint/parser'),
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: __dirname,
    },
  },
  plugins: { '@typescript-eslint': tseslint },
  rules: recommendedRules,
};

module.exports = [globalIgnores(['dist', 'node_modules']), config];
