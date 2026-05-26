# Prompt template

Use this template when creating a task for an AI agent. Fill every field — the clearer the context, the better the agent output.

- **Title**: Short one-line summary.
- **Goal**: Measurable outcome the agent must achieve (tests passing, lint green, feature implemented).
- **Background**: 2–4 short bullets with links to design notes or related issues.
- **Scope / Files**: Glob or explicit file list the agent may edit (example: `apps/api/**`, `packages/database/**`).
- **Constraints**: Things agent must not change (infrastructure, CI, secrets) and coding style or performance bounds.
- **Acceptance criteria**: Numbered, testable items (exact commands + expected exit codes or outputs).
- **Commands to run**: Exact shell commands for local/CI verification (example: `bun run test`, `bun --filter ./packages/database test`).
- **Output format**: How the agent should return results (unified diff, list of changed files, added tests, changelog line, PR body draft).
- **Human checks**: What a reviewer must verify before merging.

Example (filled):

- **Title**: Fix failing `cards` query tests in `packages/database`.
- **Goal**: Make `bun --filter ./packages/database test` exit 0.
- **Background**: Tests started failing after schema refactor in #123; only `cards` queries affected.
- **Scope / Files**: `packages/database/**`, `packages/config/**`.
- **Constraints**: Do not change `infrastructure/` or `.github/workflows/`.
- **Acceptance criteria**:
  1. `bun --filter ./packages/database test` exits 0.
  2. New tests added that cover the regression.
  3. Lint stays green: `bun run lint` exits 0.
- **Commands to run**:
  - `bun --filter ./packages/database test`
  - `bun run lint`
- **Output format**: Unified git-style patch, list of files changed, one-line changelog, PR body draft with verification steps.
- **Human checks**: Ensure DB migration not required, review schema changes if any.
