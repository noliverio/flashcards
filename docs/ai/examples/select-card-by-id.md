# Worked example: Add "select by cardID" option to the web UI

This worked example demonstrates an end-to-end AI-agent workflow for the task: "Add the option to select a card by `cardID` in the web interface." It includes the filled task spec/prompt to send to an agent, the commands to run, the files the agent should change, and a suggested patch the agent might produce.

Overview
- Goal: Let users enter a `cardID` in the web UI and load the matching card from the API.
- Why: The app currently always loads card `1` on startup — this change allows quick navigation to arbitrary cards by id.

Files that should be edited (scope)
- `apps/web/src/App.tsx` — Add an input and a fetch button and wire it to `getCard(cardID)`.
- `apps/web/src/lib/api-queries.ts` — Verify `getCard(cardID: number)` exists and behaves correctly (this repo already has it).
- `apps/web/src/ui/card.tsx` — No change required for basic behavior, but the agent should update if necessary for robustness.

Acceptance criteria (binary, testable)
1. The web UI shows an input labeled "Card ID" and a button "Fetch".
2. Entering a positive integer (e.g. `2`) and clicking "Fetch" calls the backend and displays that card via `CardUI`.
3. No changes are made to `infrastructure/`, `.github/workflows/`, or other forbidden paths.
4. `bun run lint` exits 0 and the workspace builds.

Commands to collect context (copy into the issue)
```bash
# current commit
git rev-parse --short HEAD

# run workspace lint and tests
bun install
bun run lint || true
bun run test || true

# run the web dev server for manual verification
bun --filter ./apps/web dev
```

Minimal code context to attach (include these snippets from the repo so the agent can reason about the change)

From `apps/web/src/lib/api-queries.ts`:

```ts
export async function getCard(cardID: number) {
    const path = `${baseAPIPath}/api/v1/card/${cardID}`
    const resp = await fetch(path)
    const cardJSON = await resp.json()
    if (( 300 <= resp.status) || (resp.status <= 199)){
        // TODO replace magic numbers
        return
    }
    const card = selectCardSchema.parse(cardJSON)
    return card
}
```

From `apps/web/src/App.tsx` (current behavior—the agent should see this):

```ts
  useEffect(()=>{
    async function _ (){
      const eCard = await getCard(1)
      
      if (! ignore) { 
        setCard(eCard)
      }
    }

    let ignore = false
    _()
    return ()=>{
      ignore = true
    }
  }, [])
```

Filled task-spec (paste into a new issue using `docs/ai/templates/task-spec.md`)

- **Problem statement**: The web app always loads the card with id `1` on start. Users need a fast way to load any card by `cardID` from the UI.
- **Why it matters**: Enables targeted testing and exploration of cards without changing code or DB.
- **Acceptance criteria**:
  1. `Card ID` input present with a `Fetch` button.
  2. Fetching `cardID` displays the card in `CardUI`.
  3. `bun run lint` exits 0 and no forbidden paths are modified.
- **Repro steps**: Start the web app, enter `2` in `Card ID`, click `Fetch` and verify the card displays.
- **Scope**: `apps/web/src/**` (preferably only `App.tsx` and `lib/api-queries.ts`).
- **Estimate**: Small

Filled agent prompt (use `docs/ai/templates/prompt-template.md` fields)

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

Agent instructions (attach `docs/ai/templates/agent-instructions.md` too)

Use the agent-instructions template but emphasize:
- Step plan: 1) run lint; 2) inspect `App.tsx`; 3) implement input + handler; 4) add minimal unit test if present; 5) run lint again and produce a unified diff.
- If more than 8 changed files are required, stop and return for human review.

Suggested change (example diff snippet)

The following is an example of the minimal changes the agent should produce. This is shown as a diff-like snippet for clarity — do not apply automatically without review.

```diff
@@
 -  useEffect(()=>{
 -    async function _ (){
 -      const eCard = await getCard(1)
 -      
 -      if (! ignore) { 
 -        setCard(eCard)
 -      }
 -    }
 -
 -    let ignore = false
 -    _()
 -    return ()=>{
 -      ignore = true
 -    }
 -  }, [])
 +  const [cardID, setCardID] = useState<string>('1')
 +
 +  async function fetchCardByID(id?: number | string){
 +    const idNum = id === undefined ? Number(cardID) : Number(id)
 +    if (!Number.isInteger(idNum) || idNum <= 0) return
 +    const eCard = await getCard(idNum)
 +    if (eCard) setCard(eCard)
 +  }
 +
 +  useEffect(()=>{
 +    let ignore = false
 +    ;(async ()=>{
 +      const eCard = await getCard(1)
 +      if (!ignore) setCard(eCard)
 +    })()
 +    return ()=>{ ignore = true }
 +  }, [])

@@
 -  return (
 -    <div>
 -    <CardUI card={card} startWithQuestion={true}></CardUI>
 -    </div>
 -  )
 +  return (
 +    <div>
 +      <div className="mb-4">
 +        <label className="mr-2">Card ID</label>
 +        <input
 +          value={cardID}
 +          onChange={(e)=>setCardID(e.target.value)}
 +          className="border px-2 py-1 mr-2"
 +          aria-label="Card ID"
 +        />
 +        <button onClick={()=>void fetchCardByID()} className="btn">
 +          Fetch
 +        </button>
 +      </div>
 +      <CardUI card={card} startWithQuestion={true} />
 +    </div>
 +  )
```

How to run and verify after receiving the agent patch
1. Save the agent's unified diff to `patch.diff`.
2. Inspect the changed files listed by the agent for correctness.
3. Apply the patch locally (human applies it):

```bash
git apply patch.diff
bun install
bun run lint
bun --filter ./apps/web dev
```

4. Manual verification: open the dev URL, enter `2` into the `Card ID` box, click `Fetch` and confirm the card changes.

5. If everything passes, create a human-authored branch and commit using the commit message convention: `ai: add cardID selector (#<issue>)` and open a PR with the agent's PR body.

Recording the run
- Save the original prompt, the agent transcript, the produced patch, and verification results to `docs/ai/examples/<issue>-ai-log.md` using `ai-log-template.md`.

Notes and extension ideas
- Add unit or integration tests that mock `getCard` to verify the UI behavior.
- Add validation UI for invalid ids and helpful error messages from errors returned by `getCard`.
