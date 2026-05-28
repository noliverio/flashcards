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
