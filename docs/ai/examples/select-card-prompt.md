# Select-card Prompt

- **Title**: Add "Card ID" input + fetch to web UI
- **Goal**: Add a `Card ID` input box and `Fetch` button to `apps/web/src/App.tsx`. The UI should call `getCard(<id>)` and render the result in `CardUI`.
- **Background**: The app currently uses `getCard(1)` on load; `getCard(cardID)` already exists in `apps/web/src/lib/api-queries.ts`.
- **Scope / Files**: `apps/web/src/App.tsx`, `apps/web/src/lib/api-queries.ts`, `apps/web/src/ui/card.tsx` (read-only unless fix required).
- **Constraints**: Do not modify `infrastructure/`, `.github/workflows/`, `node_modules/`, or CI config. Keep changes minimal and focused.
- **Acceptance criteria**:
  1. Manual flow: start web dev server, input `2`, click `Fetch`, and the UI shows that card.
  2. `bun run lint` exits 0.
  3. The patch is limited to the scope files (preferably just `App.tsx`).
- **Commands to run**:
  - `bun install`
  - `bun run lint`
  - `bun --filter ./apps/web dev` (manual verification)
- **Output format**: Unified diff (git-style), list of changed files, one-line changelog, and a PR body draft with verification steps.
