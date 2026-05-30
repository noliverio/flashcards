import eslintConfigPrettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
// TODO: setup sec plugin
// import  from "eslint-plugin-security"

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/.next/**", "**/node_modules/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        // Correctly points type-aware linting to the monorepo root
        tsconfigRootDir: import.meta.dirname,
        project: [
          "./tsconfig.json",
          "./packages/*/tsconfig.json",
          "./apps/*/tsconfig.json",
        ],
      },
    },
    rules: {
      // "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "no-process-env": "off", //depracated rule
      "no-unused-vars": "off", //required to use typescript-eslint version
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      //   'react-hooks': hooksPlugin as unknown as Linter.Plugin, // Cast required until React Hooks plugin ships native v9 types
      "react-hooks": hooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "19.0",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Not needed in React 19
      "react/prop-types": "off",
    },
  },
  {
    files: ["packages/database/**/*.ts"],
    rules: {},
  },
  eslintConfigPrettier,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],
    },
  },
);
