# Decisions

Decisions taken by Om on 12 Nov 2026 on the open points in section 20.2 of the Engineering
Edition, and build decisions taken since. Newest at the bottom.

| # | Question | Decision | Consequence |
| --- | --- | --- | --- |
| D1 | Launch set | All 16 pilot cases: SPJIMR (11), IIM-A (2) and IIM-L (3). Om's view: the casebooks are publicly released, so the cases can be used. | No case is swapped out. Each case shows its book, page and club. See the note below. |
| D2 | Hosting and visibility | A public GitHub repository. If it becomes a good product, deploy later, either privately on the SPJIMR intranet or publicly. | The skeletons are public from the first commit. |
| D3 | Usage counts | Open. Not needed for development; decide before the pilot. | No usage counting is built yet. |
| D4 | Who verifies | Claude verifies once against the source pages; if that passes, the build starts. | All 16 are `status: verified` with `verification.method: ai_second_pass`. The library labels them "AI-checked", not "human-verified". See VERIFICATION.md. |
| D5 | Google's terms | Development only for now. | No public launch decision is implied. Revisit the "developers, not consumer use" clause and the 18-plus rule before students use it. |
| D6 | Identity | Open. | Working name stays "Case Room". |

**Note on D1.** A publicly released casebook is not the same as permission to reuse it; the
clubs' copyright notices still apply. The skeletons lower the exposure because they paraphrase
facts and cite pages rather than reproduce text, and no PDF is hosted. Before a public launch,
ask the three clubs, and be ready to take a case down on request. This is not legal advice.

## Build decisions

| Date | Decision | Why |
| --- | --- | --- |
| 12 Nov 2026 | The number check allows only numbers in the prompt, the facts and the close prompt, plus anything the candidate has typed. Accepted assumptions and the quant working are **not** in the allowed set. | Stricter than section 12.2 of the spec. It stops the interviewer supplying an assumption or leaking the quant answer; it can still confirm a figure once the candidate has said it. |
| 12 Nov 2026 | `verification` record added to the skeleton schema, with `method: ai_second_pass or human`. | So an AI-checked case is never shown as human-verified. |
| 12 Nov 2026 | `answerKey` (grader only) and `quant.optional` added to the schema. | The drafts carry expected fixes and optional derived checks that fit no other field. |
| 12 Nov 2026 | The Vistara case is reset as an unnamed premium airline and run as a 10-minute drill. | Dated facts; its key figures are the candidate's assumptions. Four drills in all: three IIM-L write-ups plus this one. |
| 12 Nov 2026 | The probe sends the opening prompt in the system text and starts the conversation with the candidate's message. | Avoids relying on a conversation that opens with a model turn. |
