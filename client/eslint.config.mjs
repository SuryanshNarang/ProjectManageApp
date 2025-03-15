module.exports = {
  parserOptions: {
    sourceType: 'module',  // Ensures that ESLint parses the code as an ES module
    ecmaVersion: 2021, // Allows the use of modern ECMAScript features
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing for React
    },
  },
  env: {
    node: true, // To handle Node.js specific code
    browser: true, // For browser-specific code
    es2021: true, // For modern ECMAScript features
    module: true,  
  },
  extends: [
    'eslint:recommended', // Basic linting rules
    'plugin:@typescript-eslint/recommended', // TypeScript linting rules
    'next/core-web-vitals', // Next.js specific linting rules
  ],
  parser: '@typescript-eslint/parser', // Use the TypeScript parser for ESLint
  plugins: [
    '@typescript-eslint', // TypeScript plugin for ESLint
  ],
  rules: {
    // You can add any custom rules here
    'react/react-in-jsx-scope': 'off', // Next.js automatically includes React in scope
    'no-unused-vars': 'warn', // Warn on unused variables
    'no-console': 'off', // Allow console statements (optional)
  },
};
