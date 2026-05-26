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
