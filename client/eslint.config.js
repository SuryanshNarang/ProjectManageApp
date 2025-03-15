import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import ts from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: { ts },
    rules: {
      "ts/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "ts/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
