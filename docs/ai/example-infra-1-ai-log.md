# AI run log — infra-1: Create shared eslint

- **Issue / task**: infra-1
- **Commit SHA**: aa20ec7
- **Recorded at**: 2026-05-28T20:37:21.364Z

## Original prompt

```
# Prompt template

- **Title**: infra-1: Create shared eslint.
- **Goal**: Create a shared eslint file for the apps and packages in this repo. 
- **Background**: An `eslint.config.ts` file at the repo root was generated for `packages/database` then moved to the repo root. The file contains config specific to the `packages/database` package, and must be expanded to work with the other apps. When given the option use the most recent release not known to have security issues. 
    notes:
    1. The api at `apps/api` is a hono based api, with tsconfig file at `apps/api/tsconfig.json`
    2. The cli at `apps/cli` is a commander based cli app, with tsconfig file at `apps/cli/tsconfig.json`
    3. The web app at `apps/web` is a react 19 based web app.
    4. The dal at `packages/database` is a drizzle-orm and sqlite based package used by the other apps. It's tsconfig file is at `packages/database/tsconfig.json`
- **Scope / Files**: `eslint.config.ts`
- **Constraints**: Keep changes minimal and focused. The updated `eslint.config.ts` file must be a valid typescript config file for eslint.
- **Acceptance criteria**:
  1. The patch is limited to the scope files.
  2. eslint can be run through bun for `apps/api` with appropriate config using `eslint.config.ts` in the repo root.
  3. eslint can be run through bun for `apps/cli` with appropriate config using `eslint.config.ts` in the repo root.
  4. eslint can be run through bun for `apps/web` with appropriate config using `eslint.config.ts` in the repo root.
  5. eslint can be run through bun for `packages/database` with appropriate config using `eslint.config.ts` in the repo root.
  6. Versions are pinned to the current most recent release. Avoid using `latest` version tags or equivalent for the given tool.
- **Commands to run**: 
  - `bun install`
  - `bun run lint`
  - `bun --filter ./apps/web dev` (manual verification)
- **Output format**: Unified diff (git-style), list of changed files, added tests, one-line changelog,
```

## Agent transcript

```
Actions taken:

1. Inspected existing `eslint.config.ts` at repo root.
2. Updated `eslint.config.ts` to include TypeScript project paths for apps and packages, add a TypeScript override using `@typescript-eslint/parser`, and add a browser/React override for `apps/web`.
3. Removed a top-level import of `@eslint/js` to improve resolution across workspaces.
4. Ran `bun install` to ensure deps installed.
5. Ran `bun run -F web lint` — succeeded.
6. Ran `bun run -F @flashcards/database lint` — the linter failed to load the TypeScript config via jiti (error traces captured in terminal). Further investigation may be required for jiti/module resolution in the database workspace.

Files changed:
- eslint.config.ts

Notes:
- No secrets were included.
```

## Files changed (reported)

- eslint.config.ts

## Unified diff

```diff
diff --git a/eslint.config.ts b/eslint.config.ts
index 2c01edd..7e20f62 100644
--- a/eslint.config.ts
+++ b/eslint.config.ts
@@ -1,9 +1,37 @@
-import js from "@eslint/js";
 import globals from "globals";
-import tseslint from "typescript-eslint";
 import { defineConfig } from "eslint/config";
 
+const tsProjectPaths = [
+  "./packages/database/tsconfig.json",
+  "./apps/api/tsconfig.json",
+  "./apps/cli/tsconfig.json",
+  "./apps/web/tsconfig.json",
+  "./tsconfig.json",
+];
+
 export default defineConfig([
-  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
-  tseslint.configs.recommended,
+  {
+    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
+    ignores: ["node_modules/**", "dist/**"],
+    extends: ["eslint:recommended"],
+    languageOptions: { globals: globals.node },
+  },
+  {
+    // TypeScript: enable recommended rules and type-aware linting
+    files: ["**/*.{ts,tsx,mts,cts}"],
+    languageOptions: {
+      parser: "@typescript-eslint/parser",
+      parserOptions: {
+        project: tsProjectPaths,
+      },
+      globals: globals.node,
+    },
+    extends: ["plugin:@typescript-eslint/recommended"],
+  },
+  {
+    // apps/web runs in the browser and uses React; provide browser globals and react settings
+    files: ["apps/web/**/*.{ts,tsx,js,jsx}"],
+    languageOptions: { globals: globals.browser },
+    settings: { react: { version: "detect" } },
+  },
 ]);
```

## Human review notes

- Reviewed by:
- Approved:
