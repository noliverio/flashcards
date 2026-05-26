# AI verification runbook

Use this runbook to locally verify agent output before applying changes.

Core verification

1. Install dependencies (if needed):

```bash
bun install
```

2. Run workspace lint and tests:

```bash
bun run lint
bun run test
```

3. Run package-level tests for changed packages (replace `<pkg>`):

```bash
bun --filter ./packages/<pkg> test
```

4. Run a quick smoke start (where applicable):

```bash
# run the web app dev server
bun --filter ./apps/web dev

# run the API locally
bun --filter ./apps/api dev
```

Checks to fail the agent PR automatically

- Failing tests or linters.
- Changes to forbidden paths (`infrastructure/`, `.github/`, `node_modules/`).
- More than 10 files changed without human approval.
