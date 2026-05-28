# Project Spec: Flashcards

## Objective

- Build an api, cli tool, and web app for a flashcard application.

## Tech Stack

- API: Bun runtime, Hono, Zod, Vitest
- Web: React 19+, TypeScript, Zod, Tailwind CSS
- CLI: Bun, Commander
- DAL: Bun, Sqlite, Drizzle ORM, Zod, Vitest,
- Testing: Vitest, vitest coverage-v8,
- Operations: Open telemetry, docker, helm, nginx

## Commands

Commands should be documented in the readme.md of the relevant directory.

## Project Structure

- `apps/` – Application source code
- `apps/api` – API source code
- `apps/cli` – CLI application source code
- `apps/web` – Web application source code
- `packages/` – Project specific shared package source code
- `packages/database` – Database access layer shared package source code.
- `docs/` – Documentation
- `docs/ai` – Documentation for ai agents
- `docs/ai/templates` – Templates for working with agents.
- `docs/ai/proposals` – Proposed changes to AI forbidden directories.
- `infrastructure/` – Code for the infrastructure to run the code in production.

## Boundaries

- ✅ Always:

1. Run tests before commits
2. Follow naming conventions,
3. Store the final prompt + agent transcript + diff in `docs/ai/examples/<issue>-ai-log.md`

### Allowed

Allowed paths: `apps/**`, `packages/**`

### Ask-first

Ask-first paths: `package.json`

Stop and ask if a fix touches >5 files or modifies forbidden paths. Attempt to to split into smaller tasks.

- ⚠️ Ask first tasks: Database schema changes, adding dependencies

### Forbiden

Forbidden paths: `infrastructure/**`, `.github/workflows/**`

- 🚫 Tasks to never perform : Interact with git, Commit secrets, edit node_modules/, modify CI config, make to the infrastructure/ directory

Never include secrets in prompts, never accept secrets as outputs, and require human approval for any token/credentials-related changes.
