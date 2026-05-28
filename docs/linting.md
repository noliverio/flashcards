
# Running ESLint (apps/web and apps/api)

This document shows how to run ESLint for the `apps/web` and `apps/api` workspaces and includes verification output from this environment.

**apps/web**

- Command (recommended):

```bash
bun run -F web lint
```

- Verified result (run here):

```
web lint: Exited with code 0
```

This indicates the `apps/web` package's `lint` script runs successfully using the centralized `eslint.config.ts` in the repo root.

**apps/api**

- What I changed to make `apps/api` lintable without relying on the root config:
  - Added a local flat-format ESLint config at `apps/api/eslint.config.cjs` that uses the `@typescript-eslint` plugin rules directly (avoids `extends` and `env` keys which are incompatible with flat configs).
  - Kept a `lint` script in `apps/api/package.json` that invokes the workspace ESLint binary (the invocation sets `NODE_PATH` to `../web/node_modules` so it resolves the shared ESLint install).

- Command (recommended):

```bash
bun run -F api lint
```

- Verified result (run here):

```
/home/nick/Code/flashcards/apps/api/index.ts
  18:6   error  'createCardInput' is defined but never used  @typescript-eslint/no-unused-vars
  37:14  error  'e' is defined but never used                @typescript-eslint/no-unused-vars
  46:14  error  'e' is defined but never used                @typescript-eslint/no-unused-vars

/home/nick/Code/flashcards/apps/api/tester.ts
   5:7   error  'createCardPublicSchema' is assigned a value but only used as a type  @typescript-eslint/no-unused-vars
  26:17  error  Unexpected any. Specify a different type              @typescript-eslint/no-explicit-any

✖ 5 problems (5 errors, 0 warnings)

Exit code: 1 (lint errors present)
```

- Notes:
  - The `apps/api` lint run succeeds in executing ESLint with a project-aware TypeScript parser and the plugin rules, but reports linting errors in code (exit code 1). Fixing those errors or running an autofix where applicable will make the command exit with code 0.
  - The local flat config file is at: [apps/api/eslint.config.cjs](apps/api/eslint.config.cjs#L1-L200)

**Why this approach**

- We reverted hoisting of ESLint devDependencies to the repo root and instead used a combination of:
  - aligning the `apps/web` ESLint versions so its installed CLI can be invoked reliably across workspaces, and
  - adding a local flat ESLint config in `apps/api` so the API doesn't rely on the root `eslint.config.ts` (which previously caused cross-workspace resolution errors).

**Files added/changed**
- `apps/api/eslint.config.cjs` — local flat config used for `apps/api`.
- `apps/api/package.json` — `lint` script (invokes the web ESLint binary with NODE_PATH pointing to web node_modules).

If you'd like, I can instead:
- Pin ESLint and plugin versions in every workspace to a single set of versions (I partially aligned `apps/web` already), or
- Hoist ESLint devDependencies back to the repo root and make the root `eslint.config.ts` the single source of truth (I can revert the earlier change and do that).

---

Artifacts from verification are saved in the repo under `tmp/`:
- `tmp/web-lint.log` — web lint run
- `tmp/api-lint.log` — bunx attempt
- `tmp/api-via-web-cwd-lint.log` — web binary (cwd=apps/web) attempt
- `tmp/api-via-web-from-api-cwd.log` — web binary (invoked from apps/api) attempt
- `tmp/api-via-web-nodepath-lint.log` — NODE_PATH attempt
