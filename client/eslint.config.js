import js from "@eslint/js";
import ts from "typescript-eslint";
import next from "@next/eslint-plugin-next/config";

export default [
  js.configs.recommended,
  ts.configs.recommended,
  next.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn", // Change from 'error' to 'warn' if needed
    },
  },
];
