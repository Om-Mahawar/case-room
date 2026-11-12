# Progress

One line per stage of `docs/BUILD_PLAN.md`. Each stage adds its result below when it ends.

| Stage | Builds | Status | Date |
| --- | --- | --- | --- |
| 0 | Repository on GitHub, checks green | Done | 12 Nov 2026 |
| 1 | M0 findings recorded, model config | Not started | |
| 2 | App shell and the model client | Not started | |
| 3 | Interview engine (logic only) | Not started | |
| 4 | Interview screen, saving and resuming | Not started | |
| 5 | Live rule tests and prompt tuning | Not started | |
| 6 | Grader, scorecard, history | Not started | |
| 7 | Calibration runs | Not started | |
| 8 | Student screens: welcome, key, library, progress, settings | Not started | |
| 9 | Drills | Not started | |
| 10 | Quality pass and deployment | Not started | |
| 11 | Pilot readiness | Not started | |

## Stage 0: repository (12 Nov 2026)

**Built:** the folder is under git on `main` and published as the public repository
https://github.com/Om-Mahawar/case-room. No code was changed.

**Gate:** passed. `npm run check` passes locally (16 of 16 skeletons valid, 25 of 25 tests) and
in CI on the initial commit `e19b443`
(https://github.com/Om-Mahawar/case-room/actions/runs/43267306765).

**Checked before publishing:** no key, token, `.env` file or PDF in the folder; no text in the
skeletons, prompts, tests or tools that reads as a pasted casebook page or transcript. The
casebooks themselves were not available, so this was a check for verbatim-looking prose, not a
comparison against the sources.

**Assumed:**

- Commits use the GitHub no-reply address, set for this repository only.
- `prompt.txt` (the stage prompts, duplicating `docs/BUILD_PLAN.md`) was published as found.
- This file went in as a second commit, after CI passed on the first.

**Noticed, not fixed:**

- The linter warns that `iiml-paracetamol` and `iiml-paytm-tech-dd` have fewer than three facts.
- `npm install` reports 7 known vulnerabilities in the dev dependencies (3 moderate, 2 high,
  2 critical).
- Local Node is 24; CI and the build plan use 22. Both pass.
- CI annotations: `actions/checkout@v4` and `actions/setup-node@v4` target the deprecated
  Node 20 runtime, and `ubuntu-latest` is moving to Ubuntu 26.
