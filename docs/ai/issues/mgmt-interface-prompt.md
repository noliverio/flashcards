# Prompt template

Use this template when creating a task for an AI agent. Fill every field — the clearer the context, the better the agent output.

- **Title**: FE-1: Create management interface. 
- **Goal**: Add an empty management interface page with placeholders for adding and deleting cards and for adding an deleting categories. This is not expected to be functional at this point.
- **Background**: The app currently does not support managing cards or categories through the web interface. 
- **Scope / Files**: `apps/web/src/App.tsx` `apps/web/src/ui/**`, `apps/web/src/**.css`
- **Constraints**:  Keep changes minimal and focused.
- **Acceptance criteria**:
  1. Applicable unit test have been created.
  2. `bun run lint` exits 0.
  3. The patch is limited to the scope files.
- **Commands to run**: 
  - `bun install`
  - `bun run lint`
  - `bun --filter ./apps/web dev` (manual verification)
- **Output format**: Unified diff (git-style), list of changed files, added tests, one-line changelog, 
