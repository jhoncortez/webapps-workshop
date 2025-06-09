import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser, // Merge browser globals here
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "semi": ["error", "never"], // Enforce No semicolons as errors
      "@typescript-eslint/semi": ["error", "never"], // ← For TypeScript files
    },
  },
  ...tseslint.configs.recommended, // TypeScript recommended rules
  ...pluginReact.configs.flat.recommended, // React recommended rules
]);