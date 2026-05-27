# AI run log — VSCode session capture

- **Issue / task**: 116dbe0
- **Commit SHA**: 116dbe0
- **Recorded at**: 2026-05-27T01:35:42.918Z

## Original prompt

```
Request: Archive current VS Code AI session and workspace.

Action: Save the full conversation transcript and the current repository working tree (diff and changed-files) into the project's AI run log using `scripts/ai/save-ai-log.js`.

Reason: User requested "Capture this conversation and the work container therein with the save-ai-log.js script." Archive for audit and reproducibility.

Date: 2026-05-26

Notes:
- Redact secrets if any before saving.
```

## Agent transcript

```
Conversation transcript (abridged) — captured by assistant on 2026-05-26

User: Explain how to adopt a more ai agent forward approach to this repo.
Assistant: Created plan and scaffolding; proposed templates and docs under `docs/ai/`.

User: Create the scaffold templates.
Assistant: Scaffolded many files under `docs/ai/` including templates, runbook, security, examples.

Files created/updated (high level):
- docs/ai/README.md
- docs/ai/templates/prompt-template.md
- docs/ai/templates/task-spec.md
- docs/ai/templates/agent-instructions.md
- docs/ai/context-capture.md
- docs/ai/examples/select-card-by-id.md
- docs/ai/runbook.md
- docs/ai/security.md
- scripts/ai/save-ai-log.js
- .github/workflows/ai-save-log.yml
- .vscode/tasks.json
- package.json (added ai:save-log)

Assistant: Replaced pnpm examples with bun in docs where requested.
Assistant: Added VS Code task and instructions to run save-ai-log.js.

User: Create a worked example to add select-by-cardID UI.
Assistant: Added worked example at docs/ai/examples/select-card-by-id.md and suggested patch.

User: Create automation to save transcripts + diffs to docs/ai/example-<issue>-ai-log.md
Assistant: Implemented scripts/ai/save-ai-log.js and package.json script, documented usage.

User: Wire save-ai-log to VS Code tasks and GitHub Actions
Assistant: Added .vscode/tasks.json and .github/workflows/ai-save-log.yml; documented usage and guardrails.

User: Update agent instructions to run save script when finished
Assistant: Updated docs/ai/templates/agent-instructions.md to include optional archival step and commands.

User: Final request: "Capture this conversation and the work container therein with the save-ai-log.js script."

Assistant: (Executing a local capture now) — creating tmp files, capturing git diff and changed-file list, running the save script to write docs/ai/example-<issue>-ai-log.md

Exploratory Q&A (user questions that did not directly produce code changes)

- Q: Would I create new files based on the templates with the information you populated? Something else? Where would these files generally go?
	A: Create a filled task using `docs/ai/templates/prompt-template.md` or `task-spec.md` and save it under `docs/ai/proposals/<issue>-task.md` or paste it into an issue body. Store agent logs and transcripts in `docs/ai/examples/` (use `ai-log-template.md`). Keep templates in `docs/ai/templates/` and runbook/docs in `docs/ai/`.

- Q: This seems to assume that I will be working with the ai agent through GitHub. Assume for now that I want this automation to work in VS Code.
	A: Use the included VS Code task (`.vscode/tasks.json`) which runs `scripts/ai/save-ai-log.js`, or run the Node script directly. For tighter integration, implement Code Actions or an extension. The GitHub workflow variant was provided as an optional remote automation.

- Q: What additional automation is typical in agentic AI-forward workflows?
	A: Common automations include context capture, preflight checks (lint/tests), archive provenance (save prompts/transcripts/diffs), patch sanity checks (`git apply --check`), change-size guardrails, CI validation for `ai-generated` PRs, secret scanning, dependency SCA, ephemeral test environments, and auto-PR/labeling bots. These are largely orchestration/documentation tasks rather than single code edits.

- Q: Explain how, when and where `context-capture.md` fits into the workflow. Include if/how I would invoke it.
	A: Run it before creating a task/issue and before sending to the AI. It collects commit SHA, failing test output, exact commands, files list, and a minimal repro. Invoke via the suggested shell commands in the doc (the `tmp/` collection commands), save outputs in `tmp/` and attach them to the issue or proposal.

- Q: Will the save script archive the conversation?
	A: Yes — the script writes the provided prompt and transcript files into `docs/ai/example-<issue>-ai-log.md`. The agent-instructions template was updated to allow optional archival when permitted.

- Q: Can this be wired fully into VS Code for one-click archive?
	A: Yes. A simple task is present; you can extend to a Code Action or VS Code extension to auto-generate `tmp/*` files from the active editor selection and run the task.

End of transcript.
```

## Files changed (reported)

- docs/ai/README.md
- docs/ai/templates/agent-instructions.md
- docs/ai/templates/task-spec.md
- package.json

## Unified diff

```diff
diff --git a/docs/ai/README.md b/docs/ai/README.md
index 4ed4492..99afaf5 100644
--- a/docs/ai/README.md
+++ b/docs/ai/README.md
@@ -21,3 +21,35 @@ Conventions
 - Branch name template (when human applies changes): `ai/<issue>-short-desc`.
 
 If you are unsure about scope or any change touches `infrastructure/`, CI, or secrets, require a human review first.
+
+Saving agent runs (automation)
+- Use the included script to save the prompt, agent transcript and unified diff into a markdown log under `docs/ai/`.
+
+Example (node):
+
+```bash
+# save artifacts to docs/ai/example-123-ai-log.md
+node scripts/ai/save-ai-log.js --issue 123 --title "Select card by id" \
+	--prompt-file ./tmp/prompt.md --transcript-file ./tmp/transcript.txt --diff-file ./tmp/patch.diff \
+	--files-changed-file ./tmp/files.txt --commit $(git rev-parse --short HEAD)
+```
+
+Example (via package script / bun):
+
+```bash
+# using the package script (works with bun or node)
+bun run ai:save-log -- --issue 123 --prompt-file ./tmp/prompt.md --transcript-file ./tmp/transcript.txt --diff-file ./tmp/patch.diff
+```
+
+If a file `docs/ai/example-<issue>-ai-log.md` already exists, the script will create a timestamped backup before writing the new file. Use `--force` to overwrite.
+
+VS Code: run as a Task
+
+You can run the save script directly from VS Code using the included task. Open the Command Palette and run `Tasks: Run Task` → `Save AI run log`.
+
+The task will prompt for the issue id, title and paths for the prompt/transcript/diff/files-changed. The script will auto-detect the current git commit if you don't pass one.
+
+Tips:
+- Save the prompt/transcript/diff to temporary files (for example `tmp/prompt.md`, `tmp/transcript.txt`, `tmp/patch.diff`) before running the task.
+- After the task runs, the generated log will be written to `docs/ai/example-<issue>-ai-log.md`.
+
diff --git a/docs/ai/templates/agent-instructions.md b/docs/ai/templates/agent-instructions.md
index 538f47f..726c359 100644
--- a/docs/ai/templates/agent-instructions.md
+++ b/docs/ai/templates/agent-instructions.md
@@ -41,3 +41,28 @@ This file describes what an AI agent is allowed to do and how it should report r
 7. Confidence threshold
 
 - If any test fails after the proposed fix or if the change touches forbidden paths, return for human review.
+
+8. Archive run artifacts (optional)
+
+- When you have completed the Step plan and produced the unified diff, transcript, and file list, you SHOULD archive the prompt, agent transcript, diff, and files-changed list to `docs/ai/` using the project's save script. This is required when the human requester requests it or when you finish all tasks successfully.
+- How to prepare files (recommended):
+	- `tmp/prompt.md` — the full prompt you were given (redact any secrets).
+	- `tmp/transcript.txt` — the full agent transcript (messages exchanged).
+	- `tmp/patch.diff` — the unified diff you are returning.
+	- `tmp/files.txt` — newline-separated list of changed files.
+- How to run the save script:
+	- Node:
+		- `node scripts/ai/save-ai-log.js --issue <id> --title "<short title>" --prompt-file tmp/prompt.md --transcript-file tmp/transcript.txt --diff-file tmp/patch.diff --files-changed-file tmp/files.txt`
+	- Package script (bun/node):
+		- `bun run ai:save-log -- --issue <id> --title "<short title>" --prompt-file tmp/prompt.md --transcript-file tmp/transcript.txt --diff-file tmp/patch.diff --files-changed-file tmp/files.txt`
+- When to run the script:
+	- Run automatically at the end of your Step plan only if the human requester granted permission in the prompt (for example a field `Archive: yes`).
+	- Otherwise, run only when explicitly instructed in the chat with a clear directive such as `save run log` or `archive ai-log`.
+- Output and expectations:
+	- The script writes a markdown log to `docs/ai/example-<issue>-ai-log.md` and creates a timestamped backup if the file exists.
+	- DO NOT attempt to commit, push, or create branches in the repository — creating or editing files locally is allowed, but git operations are forbidden.
+	- After running, include the path of the generated log in your final message to the user and paste the header section (Issue, Commit SHA, Recorded at) so reviewers can find the file.
+- Safety & privacy:
+	- Before saving, redact any secrets, credentials, or tokens. Replace them with placeholders like `REDACTED_TOKEN`.
+	- If the run depended on private credentials or production data, STOP and request a human to run the archival script locally instead of saving sensitive artifacts.
+
diff --git a/docs/ai/templates/task-spec.md b/docs/ai/templates/task-spec.md
index f9fad80..b05fdcc 100644
--- a/docs/ai/templates/task-spec.md
+++ b/docs/ai/templates/task-spec.md
@@ -12,6 +12,7 @@ Fields
 - **Edge cases**: Known corner cases to verify.
 - **Risk & rollback**: How to revert, DB migration note, and expected migration path.
 - **Estimate & priority**: Small/medium/large + priority tag.
+- **Archive**: Whether to save the transcript and output artifacts.
 
 Example
 
@@ -24,3 +25,4 @@ Example
 - **Repro steps**: `bun --filter ./apps/api test -- -t "create card"`
 - **Scope**: `apps/api/**`, `packages/database/**`
 - **Estimate**: Small
+- **Archive**: True
\ No newline at end of file
diff --git a/package.json b/package.json
index dbc09e4..08234a3 100644
--- a/package.json
+++ b/package.json
@@ -2,6 +2,9 @@
   "name": "flashcards-monorepo",
   "module": "index.ts",
   "type": "module",
+  "scripts": {
+    "ai:save-log": "node ./scripts/ai/save-ai-log.js"
+  },
   "private": true,
   "devDependencies": {
     "@types/bun": "latest"
```

## Human review notes

- Reviewed by:
- Approved:

## QandA
I'll create a concise TODO plan for adopting an AI-agent workflow in this repo.

Created 10 todos

Progress: Planned 10 steps for an AI-agent workflow; next I'll outline concrete templates and where to put them.

**Overview**
- **Goal:** Move from ad-hoc one-line prompts to reproducible, verifiable AI tasks that an agent can complete and you can review.
- **Benefits:** faster, safer automation; smaller, testable PRs; consistent prompt hygiene; easier audits and rollbacks.

**Core principles**
- **Small, scoped tasks:** Prefer single-responsibility tasks (one bugfix, one feature, one doc).
- **Deterministic outputs:** Require the agent to produce code + tests + verification commands.
- **Explicit context:** Always include commit SHA, relevant files, and test commands.
- **Acceptance criteria:** Make outcomes binary (pass/fail) with concrete checks.
- **Guardrails:** Limit permissions, avoid secrets, require human approval for risky changes.

**Where to keep files**
- **Repo docs:** Put human-readable guides under `docs/ai/` (create this directory).
- **Templates:** Keep prompt and task templates in `docs/ai/templates/`.
- **Examples:** Store example interactions and accepted PR diffs in `docs/ai/examples/`.
- **Automation:** Add CI/validation workflows under `.github/workflows/ai-validation.yml` (optional).

**Recommended markdown files (what to create)**
- **AI workflow overview:** docs/ai/README.md — short process, who approves, and quickstart.
- **Prompt templates:** docs/ai/templates/prompt-template.md — canonical fields for agent prompts.
- **Task spec template:** docs/ai/templates/task-spec.md — the long-form issue template for AI tasks.
- **Agent instructions template:** docs/ai/templates/agent-instructions.md — what the agent is allowed to do.
- **Context capture guide:** docs/ai/context.md — how to gather and include logs, tests, and relevant files.
- **Examples & playbook:** docs/ai/examples/ — annotated Q&A -> PR sequences.
- **Runbook for CI verification:** docs/ai/runbook.md — commands to run locally and in CI.
- **Security & privacy:** docs/ai/security.md — data handling, secrets, and review rules.

**Fields to include in a prompt-template (minimal required)**
- **Title:** one-line summary.
- **Goal:** measurable outcome (e.g., "Add validation to X so tests pass and CLI returns exit code 0").
- **Background:** 2–3 short bullets of context or links to design notes.
- **Scope/Files:** glob or explicit file list the agent may change.
- **Constraints:** style, performance, no external API keys, do not change config X.
- **Acceptance criteria:** tests that must pass, lint rules, behavior examples.
- **Commands to run:** exact commands to run locally/CI (e.g., `pnpm test`, `pnpm build`).
- **Output format:** patch/PR with changelog entry, tests added, short description.
- **Human checks:** what reviewer must verify before merge.

**Task-spec template (what goes into an AI task or issue)**
- **Problem statement:** one paragraph describing the user-visible problem.
- **Why it matters:** 1–2 lines of impact.
- **Acceptance criteria:** numbered, testable items (e.g., "1) `pnpm test` passes; 2) new unit covers X with 95% clarity").
- **Repro steps / sample input:** commands, sample data.
- **Edge cases / constraints:** performance bounds, backwards compatibility.
- **Risk & rollback:** how to revert (branch name, db migration notes).
- **Estimate & priority:** small/medium/large + priority.

**Agent-instructions template (what you give to the AI agent)**
- **High-level mission:** why this task exists.
- **Step plan:** explicit ordered steps the agent should attempt (e.g., "1. run tests; 2. run grep for foo; 3. implement fix; 4. add tests; 5. run tests again; 6. produce patch").
- **Allowed tools:** list of local commands and scripts allowed.
- **Forbidden actions:** e.g., "Do not modify infrastructure files", "Do not push secrets".
- **Testing & verification:** exact commands and expected success criteria.
- **Commit / PR conventions:** branch name pattern, commit message format, PR description template.
- **Confidence threshold:** when to return for human review (e.g., if any test fails or >5 changed files).

**Suggested workflow (how a human + agent will use these files)**
- **1) Create task:** Open an issue from `docs/ai/templates/task-spec.md`.
- **2) Collect context:** Attach failing test output, relevant file list, and commit SHA.
- **3) Run an agent:** Provide the `prompt-template.md` + `agent-instructions.md` + context to the AI assistant.
- **4) Agent returns patch/PR:** Should include tests and a clear changelog line.
- **5) Automated checks:** Run CI job `ai-validation.yml` with the provided commands.
- **6) Human review:** Verify acceptance criteria and run local smoke checks.
- **7) Merge & monitor:** Merge after approval and monitor for regressions.

**CI & automation recommendations**
- **Validate PRs:** Add `.github/workflows/ai-validation.yml` that runs `pnpm test`, `pnpm lint`, and a small smoke check on PRs authored by agents.
- **PR meta-check:** Fail if agent PR changes more than N files or touches forbidden paths.
- **Bot label automation:** Auto-label `ai-generated` and require at least one human approval for that label.

**Guardrails & compliance**
- **Secrets:** Agents must never receive secret values; use placeholders.
- **Scope limits:** Disallow edits to infra, deployment, or credentials by default.
- **Audit trail:** Keep conversation + final prompt + agent output in `docs/ai/examples/` for audits.

**Short example: minimal prompt-template (summary)**
- **Title:** Fix failing tests for cards queries
- **Goal:** Make `pnpm test` pass for database on main.
- **Scope:** packages/database/**, packages/config/**
- **Commands:** `pnpm --filter @flashcards/database test -- -w`
- **Acceptance:** All tests in tests pass locally.
- **Output:** Patch with changes + tests + changelog entry.

**Next steps (pick one)**
- **Scaffold files now:** I can create the `docs/ai/` templates and an example task in this repo.
- **Workshop one template:** I can draft the `prompt-template.md` and `task-spec.md` for review.
- **Help integrate CI:** I can draft the `ai-validation.yml` for workflows.

Which would you like me to do next?




Elaborate on how I would pass this information to the ai. For example Would this I create new files based on the templates with the information you populated? Something else? Where would these files generally go?


**How to pass tasks to the AI (short answer)**  
- Best practice: create a filled task from the templates and give that (plus minimal context) to the agent. Store the filled task in the repo (or paste it into the issue/assistant UI) and keep the transcript + patch in examples for audit.

**Step-by-step workflow**
- **Create the task**: Fill task-spec.md or prompt-template.md with Title, Goal, Scope, Constraints, Acceptance criteria, and exact commands to run. (Example file: prompt-template.md)
- **Collect context**: Run the commands in context-capture.md and attach only the minimal failing test logs and relevant file snippets. Include the short commit SHA. (Guide: context-capture.md)
- **Where to place files**: save the filled task as a repo file under `docs/ai/proposals/<issue>-task.md` (or a new issue body). Keep agent logs in `docs/ai/examples/<issue>-ai-log.md`. Use ai-log-template.md as the record format. (examples)
- **Send to the AI**:
  - Chat UI: paste the filled prompt + a short list of file snippets and the agent instructions (agent-instructions.md) into the conversation.
  - API: send a `system` message with the agent instructions and a `user` message containing the filled prompt + attachments (snippets/logs). Ask for a unified diff, changed-file list, and PR body.
- **What to include in the AI input (checklist)**:
  - Commit SHA and exact verification commands.
  - Minimal failing test output or reproduction steps.
  - Exact file scope (globs or list) and constraints (forbidden paths).
  - Acceptance criteria (pass/fail checks) and output format expectations (unified diff, PR body).
  - Redact secrets — never include tokens.

**After the AI returns**
- Save the transcript + diff to `docs/ai/examples/<issue>-ai-log.md`.
- Human applies/inspects the patch, runs the verification commands (examples):
```bash
bun install
bun run lint
bun --filter ./apps/web dev
```
- Open a PR with the agent-provided PR draft, mark it `ai-generated`, require human review.

Would you like me to create a sample filled file for the worked example at `docs/ai/proposals/select-card-by-id.md` now?





What additional automation is typical in agentic ai forward workflows?

**Overview**  
Concrete automations make agentic workflows safe, repeatable, and fast. Below are the typical automations teams add, grouped by priority.

**Essential automations**
- **Context capture**: Auto-collect commit SHA, failing-test output, and file list and attach them to the task (see context-capture.md).  
- **Preflight checks**: Run `bun install`, `bun run lint`, `bun run test` (or package-scoped tests) before accepting an agent patch.  
- **Archive provenance**: Auto-save prompt + transcript + diff to ai using the script (save-ai-log.js) or `bun run ai:save-log`.  
- **Patch sanity check**: Run `git apply --check patch.diff`, static type checks, and formatting (`bun run format`) before applying.  
- **Change-size guardrail**: Block or require human review if >N files or touching forbidden paths.

**CI / PR automation**
- **ai-validation CI**: A workflow that runs preflight checks for PRs labeled `ai-generated`, enforces forbidden-path blocking, and requires at least one human approval.  
- **Auto-PR/labels**: Bot drafts PRs from agent patches, adds `ai-generated` and `needs-review` labels, and posts verification summary.  
- **Auto-checks on merge**: Prevent merges that fail tests or security scans.

**Security / compliance**
- **Secret scanning**: Run `gitleaks`/`truffleHog` on agent outputs and logs (fail if secrets found).  
- **Dependency scanning & SCA**: Run vulnerability scans on dependency changes (Snyk/Dependabot-equivalent).  
- **SAST/fast SCA**: Integrate quick static analysis for risky changes.

**Observability, deploy & rollback**
- **Ephemeral test environments**: Spin up ephemeral DB/dev server for integration tests on large changes.  
- **Smoke deploys**: Run a canary/smoke test in staging for UI or API changes.  
- **Auto-rollback hooks**: If smoke tests fail, automatically revert and notify owners.

**Developer ergonomics / integrations**
- **CLI wrappers**: `scripts/ai/create-prompt` + `scripts/ai/save-ai-log` to create and archive artifacts locally.  
- **IDE snippets**: Templates to create filled prompts from current editor context.  
- **Human-in-loop prompts**: Staged approval steps surfaced in PR checklist and a Slack/Teams notification flow.

**Advanced / orchestration**
- **Agent orchestration**: Multi-agent pipelines (one agent writes code, one runs tests, one produces PR notes).  
- **Automated changelogs & release notes**: Generate changelog entries from diffs and attach to PR.  
- **Audit indexing**: Index logs + diffs for searchable audit (Elastic/SQLite index).

**Concrete small next steps you can add immediately**
- Add a CI workflow `.github/workflows/ai-validation.yml` to run `bun run lint` + `bun run test` on `ai-generated` PRs.  
- Add a pre-apply script to run `git apply --check` and `bun run test` on `patch.diff`.  
- Wire save-ai-log.js into your agent pipeline to auto-save artifacts.

Quick example: save a run locally
```bash
node scripts/ai/save-ai-log.js --issue 123 --title "Select card by id" \
  --prompt-file ./tmp/prompt.md --transcript-file ./tmp/transcript.txt \
  --diff-file ./tmp/patch.diff --files-changed-file ./tmp/files.txt \
  --commit $(git rev-parse --short HEAD)
```

If you want, I can scaffold `.github/workflows/ai-validation.yml` next or add a small pre-apply script that enforces change-size and forbidden-path checks. Which should I do?









Explain how, when and where context-capture.md fits into the workflow. Include if/how I would invoke it.



I'll show when to run context-capture.md, what it collects, exactly how to invoke it, and where to store the outputs.

**When To Run**
- **Before creating a task/issue:** capture the exact failing state so an agent can reproduce it.  
- **Before sending to the AI:** include these artifacts with the prompt so the agent can run the same commands.  
- **After an agent attempt fails:** rerun to capture new failures and updated logs.  
- **Before accepting/applying a patch:** record the baseline commit SHA and test outputs.

**What To Capture**
- **Commit SHA:** reproducible baseline (`git rev-parse --short HEAD`).  
- **Failing test output:** full failing trace(s) for the package(s) involved.  
- **Exact commands:** the precise commands to reproduce and verify (lint, unit, package filters).  
- **Files list / diff:** affected files (`git diff --name-only origin/main...HEAD`) or a small explicit glob.  
- **Minimal repro:** small script or sample input that reproduces the issue.  
- **Environment notes:** Bun/node version, OS, and any redacted env vars required.

**How to invoke (commands — run in repo root)**
- Quick capture (copies to `tmp/` files you can attach):
```bash
git rev-parse --short HEAD > tmp/commit.txt

git fetch origin main --depth=1
git diff --name-only origin/main...HEAD > tmp/files.txt

# package-level test (captures stdout+stderr)
bun --filter ./packages/database test > tmp/packages-database-test.txt 2>&1 || true

# workspace tests
bun run test > tmp/workspace-tests.txt 2>&1 || true

# capture a targeted failing test (example)
bun --filter ./apps/api test -- -t "create card" > tmp/api-fail.txt 2>&1 || true
```
- Create a minimal repro file if needed (example `tmp/repro.sh`) and record exact `bun`/shell commands used.

**Where to save / attach**
- **Issue or prompt:** paste small outputs or attach the `tmp/*.txt` files to the issue or chat thread.  
- **Repo (optional):** save as `docs/ai/proposals/<issue>-context.md` or add the `tmp/*` files into a `docs/ai/proposals/<issue>/` folder for reproducibility.  
- **Archive step:** after an agent run you can use the save tool (save-ai-log.js) or the VS Code task (`Tasks: Run Task → Save AI run log`) to create a canonical `docs/ai/example-<issue>-ai-log.md`.

**How to include these in the agent input**
- Use the `prompt-template` fields: include `Commit SHA`, `Commands to run`, `Scope/Files`, and paste a short failing trace inline. For long outputs, say “see attached file: `docs/ai/proposals/<issue>-context.md`” and include the path. Reference the exact verification commands the agent should run. See prompt-template.md.

**VS Code ergonomics**
- Run the commands in the integrated terminal and save outputs to `tmp/` as shown.  
- Use the existing VS Code task `Save AI run log` to archive artifacts after a run (Command Palette → `Tasks: Run Task` → `Save AI run log`). That task runs save-ai-log.js to write `docs/ai/example-<issue>-ai-log.md`.

**Practical checklist before sending to the AI**
- **Commit SHA:** recorded.  
- **Commands:** exact commands included in the prompt.  
- **Failing output:** full trace saved (or pasted) and trimmed to relevant parts.  
- **Files list:** changed files or target globs included.  
- **Secrets:** redacted or omitted.

If you want, I can:
- Add a ready-made VS Code task that runs the capture commands and writes the `tmp/` files automatically, or
- Create a small `docs/ai/proposals/<issue>-context.md` template generator you can invoke from the terminal. Which would you prefer?
