# Prompt template

Use this template when creating a task for an AI agent. Fill every field — the clearer the context, the better the agent output.

- **Title**: FE-2: Bugfix management interface.
- **Goal**: Add an empty management interface page with placeholders for adding and deleting cards and for adding and deleting categories. This is not expected to be functional at this point. Fix an existing layout bug where the management interface overlaps the cards view: ensure there is clear separation between the cards + card selector and the management interface, and that only one of the two views is visible at a time (for example by routing or replacing the view rather than overlaying it).
- **Background**: The app currently does not support managing cards or categories through the web interface. Some implementations show the management UI and the cards simultaneously, causing visual overlap and interaction issues.
- **Scope / Files**: `apps/web/src/App.tsx` `apps/web/src/ui/**`, `apps/web/src/**.css`
- **Constraints**: Keep changes minimal and focused; prefer simple route- or state-based solutions that replace the cards view with the management view rather than overlaying it.
- **Acceptance criteria**:
  1. Applicable unit tests have been created.
  2. `bun run lint` exits 0.
  3. The patch is limited to the scope files.
  4. Visual/behavior acceptance: the management interface and cards do not overlap; only one is visible at a time; there is an obvious way to return to the cards view (e.g., "Back" or "Close").
  5. Tests verify that showing the management view hides the cards view.
- **Commands to run**: 
  - `bun install`
  - `bun run lint`
  - `bun --filter ./apps/web dev` (manual verification)
- **Output format**: Unified diff (git-style), list of changed files, added tests, one-line changelog,
