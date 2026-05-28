# Agent instructions template

This file describes what an AI agent is allowed to do and how it should report results. Copy into a prompt or attach alongside `prompt-template.md`.

1. High-level mission

- One-sentence description of the goal and why it matters.

2. Step plan (ordered)

1. Run the verification commands provided in the prompt. Report failures with full output.
1. Grep and inspect the files in `Scope / Files` for the likely root cause.
1. Propose a minimal change to fix the issue.
1. Add unit tests that reproduce and verify the fix.
1. Run tests and linters again.
1. Produce a unified diff, list changed files, a one-line changelog, and a PR body draft.

1. Allowed tools & actions

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

8. Archive run artifacts (optional)

- When the human user asks an exploratory question, that is any request for information that does not result in a code change write that question, and your response to `tmp/q-and-a.md`. Do this unless instructed not to. (for example a field `Archive: False`)

- When you have completed the Step plan and produced the unified diff, transcript, and file list, you SHOULD archive the prompt, agent transcript, diff, and files-changed list to `docs/ai/` using the project's save script. This is required when the human requester requests it or when you finish all tasks successfully.
- How to prepare files (recommended):
  - `tmp/prompt.md` — the full prompt you were given (redact any secrets).
  - `tmp/transcript.txt` — the full agent transcript (messages exchanged).
  - `tmp/patch.diff` — the unified diff you are returning.
  - `tmp/files.txt` — newline-separated list of changed files.
    - `tmp/q-and-a.md` — any exploratory questions asked by the user about the code.
- How to run the save script:
  - Node:
    - `node scripts/ai/save-ai-log.js --issue <id> --title "<short title>" --prompt-file tmp/prompt.md --transcript-file tmp/transcript.txt --diff-file tmp/patch.diff --files-changed-file tmp/files.txt`
  - Package script (bun/node):
    - `bun run ai:save-log -- --issue <id> --title "<short title>" --prompt-file tmp/prompt.md --transcript-file tmp/transcript.txt --diff-file tmp/patch.diff --files-changed-file tmp/files.txt`
- When to run the script:
  - Run automatically at the end of your Step plan only if the human requester granted permission in the prompt (for example a field `Archive: True`).
  - Otherwise, run only when explicitly instructed in the chat with a clear directive such as `save run log` or `archive ai-log`.
- Output and expectations:
  - The script writes a markdown log to `docs/ai/example-<issue>-ai-log.md` and creates a timestamped backup if the file exists.
  - DO NOT attempt to commit, push, or create branches in the repository — creating or editing files locally is allowed, but git operations are forbidden.
  - After running, include the path of the generated log in your final message to the user and paste the header section (Issue, Commit SHA, Recorded at) so reviewers can find the file.
- Safety & privacy:
  - Before saving, redact any secrets, credentials, or tokens. Replace them with placeholders like `REDACTED_TOKEN`.
  - If the run depended on private credentials or production data, STOP and request a human to run the archival script locally instead of saving sensitive artifacts.
