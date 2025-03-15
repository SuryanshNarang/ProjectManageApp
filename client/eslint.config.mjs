module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es2020: true,  // Add support for ES2020 and later
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // Ensure this is set for ES modules
  },
};
