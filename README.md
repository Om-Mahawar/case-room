# Case Room

AI case-interview practice on **Case Skeletons**: an interviewer's guide per case, so the AI
interviewer reveals only what the case contains, never invents data, and ends on time. It runs in
the browser on the student's own free Gemini API key. There is no backend.

**Status: development.** Milestone 1 (the skeleton library) is built. Milestone 0 (the Gemini
probe) is built but has not been run against Google's API yet; it needs a key.

## What is here

| Path | What it is |
| --- | --- |
| `skeletons/` | 16 pilot cases, two for each of eight consulting case types |
| `src/schema/skeleton.ts` | The Skeleton shape (zod) |
| `src/engine/numbers.ts` | The "no untraceable number" check (BR-4) |
| `src/engine/skeletonView.ts` | What the interviewer model is shown; the reply schema |
| `prompts/interviewer.md` | Interviewer rules, version 0 |
| `m0/` | A one-page probe: runs three interviewer turns on your key and reports what Gemini allows |
| `scripts/` | Validator, linter and generators |
| `docs/` | The specification, the staged build plan with Claude Code prompts, decisions, the verification record, M0 instructions |

## Run it

    npm install
    npm run check

Then open `m0/index.html` in Chrome and follow `docs/M0.md`.

## The cases and their sources

The skeletons are paraphrased from three publicly released casebooks, with page references on
every case. No casebook text or PDF is included.

- SPJIMR Consulting Casebook 2026-27 (Consulting Club, SPJIMR): 11 cases
- IIM Ahmedabad Consult Club Casebook 2025-26: 2 cases
- IIM Lucknow Casebook 2025-26, EY-Parthenon interview experiences: 3 cases

The rights to the casebooks remain with their clubs. If you represent one of them and want a case
changed or removed, open an issue and it will be taken down.

Every skeleton here is **AI-checked**: drafted and then re-checked against its source page by an
AI model, not yet by a person. See `docs/VERIFICATION.md`.

## Not affiliated

Case Room is a student project. It is not affiliated with Google, with any consulting firm named
in a case, or with the clubs whose casebooks it draws on.
