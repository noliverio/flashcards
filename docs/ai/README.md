# AI workflow

This folder contains templates, guidelines, and examples for using an AI agent safely and productively in this repository.

Quick start
- Use the templates in `docs/ai/templates/` to create a task or issue for an agent.
- Attach context per `docs/ai/context-capture.md` so the agent has reproducible information.
- Ask the agent using the `prompt-template.md` + `agent-instructions.md` files. Require the agent to return a patch and verification commands.

Where things live
- Templates: docs/ai/templates/
- Context guide: docs/ai/context-capture.md
- Runbook & verification: docs/ai/runbook.md
- Security guidance: docs/ai/security.md
- Examples and audit logs: docs/ai/examples/
- Proposed changes to Agent forbidden directories can be made in docs/ai/proposals

Conventions
- Branch/patch output: agents should not push directly; provide a patch/diff and a PR body draft.
- Commit message format (for humans applying agent output): `ai: <short summary> (#<issue>)`.
- Branch name template (when human applies changes): `ai/<issue>-short-desc`.

If you are unsure about scope or any change touches `infrastructure/`, CI, or secrets, require a human review first.

Saving agent runs (automation)
- Use the included script to save the prompt, agent transcript and unified diff into a markdown log under `docs/ai/`.

Example (node):

```bash
# save artifacts to docs/ai/example-123-ai-log.md
node scripts/ai/save-ai-log.js --issue 123 --title "Select card by id" \
	--prompt-file ./tmp/prompt.md --transcript-file ./tmp/transcript.txt --diff-file ./tmp/patch.diff \
	--files-changed-file ./tmp/files.txt --commit $(git rev-parse --short HEAD)
```

Example (via package script / bun):

```bash
# using the package script (works with bun or node)
bun run ai:save-log -- --issue 123 --prompt-file ./tmp/prompt.md --transcript-file ./tmp/transcript.txt --diff-file ./tmp/patch.diff
```

If a file `docs/ai/example-<issue>-ai-log.md` already exists, the script will create a timestamped backup before writing the new file. Use `--force` to overwrite.

VS Code: run as a Task

You can run the save script directly from VS Code using the included task. Open the Command Palette and run `Tasks: Run Task` → `Save AI run log`.

The task will prompt for the issue id, title and paths for the prompt/transcript/diff/files-changed. The script will auto-detect the current git commit if you don't pass one.

Tips:
- Save the prompt/transcript/diff to temporary files (for example `tmp/prompt.md`, `tmp/transcript.txt`, `tmp/patch.diff`) before running the task.
- After the task runs, the generated log will be written to `docs/ai/example-<issue>-ai-log.md`.

