# Context capture guide

When creating a task for an AI agent, include reproducible context. Attach logs, failing tests, and a short file list.

Essential items to include

- **Commit SHA**: `git rev-parse --short HEAD` (copy into the issue).
- **Failing test output**: Run the failing tests and paste the full failure trace.
- **Exact commands**: Provide the exact verification commands (see `prompt-template.md`).
- **List of relevant files**: `git diff --name-only origin/main...HEAD` or a short glob list.
- **Minimal reproduction**: Small script or sample input that reproduces the error.

Helpful commands

```bash
# copy current commit
git rev-parse --short HEAD

# list changed files against main
git fetch origin main --depth=1
git diff --name-only origin/main...HEAD

# run package-specific tests
bun --filter ./packages/database test

# run workspace-wide tests
bun run test

# capture test output to a file for attachment
bun --filter ./packages/database test > packages-database-test.txt 2>&1 || true
```

Notes
- Redact any secrets or environment values before attaching logs.
- If the problem depends on environment vars, provide a sanitized env file and sample values.
