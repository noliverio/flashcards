# Task specification

Use this spec when you need a longer-form, human-reviewed task that an agent will attempt to complete.

Fields

- **Problem statement**: One paragraph describing the bug, feature, or improvement.
- **Why it matters**: 1–2 lines of user/business impact.
- **Acceptance criteria**: Numbered, binary checks (include exact commands and expected exit codes or outputs).
- **Repro steps / sample input**: Commands, test data, screenshots, stack traces.
- **Scope**: File globs or explicit list of files the agent may edit.
- **Edge cases**: Known corner cases to verify.
- **Risk & rollback**: How to revert, DB migration note, and expected migration path.
- **Estimate & priority**: Small/medium/large + priority tag.
- **Archive**: Whether to save the transcript and output artifacts.

Example

- **Problem statement**: `card` creation endpoint returns 500 when payload missing optional fields.
- **Why it matters**: Breaks CLI import workflow and blocks user testing.
- **Acceptance criteria**:
  1. `bun --filter ./apps/api test` exits 0 for `apps/api` tests.
  2. New unit test covers the missing-field case.
  3. No changes to `infrastructure/` or CI files.
- **Repro steps**: `bun --filter ./apps/api test -- -t "create card"`
- **Scope**: `apps/api/**`, `packages/database/**`
- **Estimate**: Small
- **Archive**: True