# Case Room: rules for anyone (or any agent) working in this repository

Case Room is an AI case-interview practice tool. A student picks a case, an AI interviewer runs it
from a **Case Skeleton**, and an AI grader scores the transcript against that case's own anchors.
It is a static web app with no backend; model calls go from the student's browser to Google's
Gemini API on the student's own key.

The specification is the *Case Room BRD (Engineering Edition)*. Requirement ids below (BR-, INT-,
GRD-, NFR-, T-) refer to it. `docs/DECISIONS.md` records what has been decided since.

## Hard rules

1. **No casebook text.** Skeletons hold paraphrased facts with page references. Never paste a
   casebook page, a transcript or the v1 `CASEBANK` material into this repository, a prompt, a
   test or sample data.
2. **No invented case data.** Every fact, number and name in a skeleton traces to its source
   page. If something is not in the source, it is out of scope; it is never filled in. This holds
   for tests, fixtures and drills too.
3. **Interviewer statements only in `facts`.** A figure the *candidate* proposed in the book goes
   in `acceptedAssumptions`. The interviewer may accept such a figure but never supplies it.
4. **The app enforces the hard rules in code, not in the prompt:** the turn budget, the closing
   prompt, the number check (BR-4), the sign-off and the anchor-band clamp.
5. **The key is the student's.** It stays on the device, goes only to
   `generativelanguage.googleapis.com`, and never appears in a URL, a log, an export or an error
   message. No third-party scripts, fonts or analytics.
6. **Do not work around Google's limits or terms.** If a requirement conflicts with what the M0
   probe finds, stop and report.
7. **A change to a published skeleton bumps its `version`.**

## Layout

    skeletons/     one JSON file per case; index.json is generated
    prompts/       interviewer.md (v0); grader and simulated candidates come in M3
    src/schema/    zod schema (source of truth for the Skeleton shape) and loaders
    src/engine/    numbers.ts (BR-4), skeletonView.ts (what the interviewer sees)
    scripts/       validate-skeletons, lint-skeletons, build-index, build-m0
    m0/            the Gemini probe page (plain HTML and JS, no build step)
    tools/         the scripts that converted the BRD's skeleton drafts to JSON
    tests/         vitest
    docs/          decisions, verification record, M0 instructions

## Commands

    npm install
    npm run check      # type-check, validate, lint, regenerate index and m0 data, run tests

`skeletons/index.json`, `m0/data.js` and `docs/VERIFICATION.md` are generated but committed; CI fails if they are stale.

## How to work a stage

The build is split into stages in `docs/BUILD_PLAN.md`; `docs/PROGRESS.md` says which are done.
The specification is `docs/BRD-engineering.md` (its three diagrams did not export; the text
carries the same content).

1. Read the files the stage prompt names before planning.
2. Show a plan and wait for a go-ahead before writing code.
3. Write tests first where the stage says so. Never relax a pass mark to make a test pass.
4. Stay inside the stage. Note anything else you notice in `docs/PROGRESS.md` instead of fixing it.
5. End with `npm run check` passing, one commit, and `docs/PROGRESS.md` updated with: what was
   built, gate result, measured requests and tokens where relevant, and anything assumed.
6. If the specification is wrong or unclear, stop and ask. If it is corrected, change
   `docs/BRD-engineering.md` in the same commit and add a line to `docs/DECISIONS.md`.

Scripts that call Gemini read `GEMINI_API_KEY` from `.env.local`, which git ignores. Never print it.
