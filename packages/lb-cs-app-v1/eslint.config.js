import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["frontend/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: { ecmaVersion: 2023, sourceType: "module", ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser }
    },
    plugins: { react: reactPlugin },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    },
    settings: { react: { version: "detect" } }
  },
  {
    files: ["backend/**/*.ts"],
    languageOptions: {
      parserOptions: { ecmaVersion: 2023, sourceType: "module" },
      globals: { ...globals.node }
    },
    rules: {}
  }
];
