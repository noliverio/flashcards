# Task specification

- **Problem statement**: The web app currently lacks any way to manage cards or categories. Users will need to be able to add, delete, and bulk review both cards and categories. Create a button labeled "Management" that takes the user to this new management page. Use hardcoded mock data to fill the place of the cards and categories at this stage. The preliminary management UI has an existing layout bug where the management interface visually overlaps the cards view; both are visible and interactable at the same time.
- **Why it matters**: Enables users to create and manage new cards and categories without directly interacting with the api or data access layer. Fixing the overlap avoids confusing UX and interaction bugs.
- **Acceptance criteria**: 
  1. New management interface page exists.
  2. Clicking "Management" on the home page loads the management interface and the cards view is hidden (no visual overlap).
  3. There is a clear way to return to the cards view (for example a "Back" or "Close" control).
  4. `bun run lint` exits 0 and no forbidden paths are modified.
  5. Unit tests for the new code are created and pass; tests include assertions that the management view replaces/hides the cards view.
  6. At least 80% test coverage on added code. 
  7. Docker container still builds successfully.
- **Repro steps / sample input**: Start the webapp, click `Management`, verify management mode replaces the cards view (cards are not visible or overlapped). Click back/close to return to cards.
- **Scope**: `apps/web/src/**` (preferably only `App.tsx`, `ui/**` and `*.css`).
- **Estimate & priority**: Small
- **Archive**: True
