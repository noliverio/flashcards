# Task specification

- **Problem statement**: The web app always loads the card with id `1` on start. Users need a fast way to load any card by `cardID` from the UI.
- **Why it matters**: Enables targeted testing and exploration of cards without changing code or DB.
- **Acceptance criteria**:
  1. `Card ID` input present with a `Fetch` button.
  2. Fetching `cardID` displays the card in `CardUI`.
  3. `bun run lint` exits 0 and no forbidden paths are modified.
- **Repro steps**: Start the web app, enter `2` in `Card ID`, click `Fetch` and verify the card displays.
- **Scope**: `apps/web/src/**` (preferably only `App.tsx` and `lib/api-queries.ts`).
- **Estimate**: Small