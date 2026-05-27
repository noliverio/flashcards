# Task specification

- **Problem statement**: The web app currently lacks any way to manage cards or categories. Users will need to be able to add, delete, and bulk review both cards and categories containing the cards. Create a button labeled "Management" that takes the user to this new management page. Use hardcoded mock data to fill the place of the cards and categories at this stage.
- **Why it matters**: Enables users to create create and manage new cards and categories without directly interacting with the api or data access layer.
- **Acceptance criteria**: 
  1. New management interface page exists.
  2. Clicking "Management" on the home page loads the management interface..
  3. `bun run lint` exits 0 and no forbidden paths are modified.
  4. Unit tests for the new code are created and pass.
  5. At least 80% test coverage on added code. 
- **Repro steps / sample input**: Start the webapp, click `Management`, and the empty management mode is displayed.
- **Scope**: `apps/web/src/**` (preferably only `App.tsx`, `ui/**` and `*.css`).
- **Estimate & priority**: Small
- **Archive**: True