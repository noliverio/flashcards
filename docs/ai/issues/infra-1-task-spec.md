# Task specification

- **Problem statement**: The repo lacks a single centralized `eslint.config.ts` file, creating extra work when config changes to eslint are needed. Create this single centralized file in the repo root.
- **Why it matters**: this work will enable eslint to be run to ensure baseline of code quality. Creating this file will unblock future work of creating ci pipelines leveraging eslint.
- **Acceptance criteria**: 
  1. The patch is limited to the scope files.
  2. eslint can be run through bun for `apps/api` with appropriate config using `eslint.config.ts` in the repo root.
  3. eslint can be run through bun for `apps/cli` with appropriate config using `eslint.config.ts` in the repo root.
  4. eslint can be run through bun for `apps/web` with appropriate config using `eslint.config.ts` in the repo root.
  5. eslint can be run through bun for `packages/database` with appropriate config using `eslint.config.ts` in the repo root.
  6. Versions are pinned to the current most recent release. Avoid using `latest` version tags or equivalent for the given tool.
- **Repro steps / sample input**: run eslint through bun in each app using eslint.config.ts in the repo root.
- **Scope**: `eslint.config.ts`
- **Estimate & priority**: Small
- **Archive**: True
