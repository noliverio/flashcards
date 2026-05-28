import { defineConfig } from "eslint/config";

const tsProjectPaths = [
  "./packages/database/tsconfig.json",
  "./apps/api/tsconfig.json",
  "./apps/cli/tsconfig.json",
  "./apps/web/tsconfig.json",
  "./tsconfig.json",
];

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
    ignores: ["node_modules/**", "dist/**"],
    extends: ["eslint:recommended"],
    env: { node: true },
  },
  {
    // TypeScript: enable recommended rules and type-aware linting
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: tsProjectPaths,
      },
    },
    env: { node: true },
  },
  {
    // apps/web runs in the browser and uses React; provide browser globals and react settings
    files: ["apps/web/**/*.{ts,tsx,js,jsx}"],
    env: { browser: true },
    settings: { react: { version: "detect" } },
  },
]);
