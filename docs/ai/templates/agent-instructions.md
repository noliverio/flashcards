# Agent instructions template

This file describes what an AI agent is allowed to do and how it should report results. Copy into a prompt or attach alongside `prompt-template.md`.

1. High-level mission

- One-sentence description of the goal and why it matters.

2. Step plan (ordered)

1. Run the verification commands provided in the prompt. Report failures with full output.
2. Grep and inspect the files in `Scope / Files` for the likely root cause.
3. Propose a minimal change to fix the issue.
4. Add unit tests that reproduce and verify the fix.
5. Run tests and linters again.
6. Produce a unified diff, list changed files, a one-line changelog, and a PR body draft.

3. Allowed tools & actions

- Read any repository file under `apps/**`, `packages/**`, and `docs/**`.
- Run local commands listed in `Commands to run` (tests, linters, formatters).
- Produce code patches and test code. Do not push or create branches in the repository.

4. Forbidden actions

- Do not interact with git (no commits, pushes, merges).
- Do not modify `infrastructure/`, `.github/workflows/`, or system CI configs.
- Do not attempt to access or exfiltrate secrets or credentials.
- Do not modify `node_modules/` or vendor files.

5. Testing & verification

- Use the exact commands provided under `Commands to run` in the prompt.
- Report command outputs, exit codes, and include failing test stack traces when present.

6. Patch & PR conventions

- Output a unified diff (git-style), list of changed files, a one-line changelog, and a short PR body.
- If more than 10 files must be changed, stop and ask for a human to split the task.

7. Confidence threshold

- If any test fails after the proposed fix or if the change touches forbidden paths, return for human review.
