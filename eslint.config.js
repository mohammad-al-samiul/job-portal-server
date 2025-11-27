import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },

    languageOptions: { globals: globals.browser },
    env: {
      node: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
    parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "import/no-unresolved": "off",
    },
  },
]);
