import { z } from "zod";

/**
 * Case Skeleton: the interviewer's guide for one case.
 * Mirrors the "Pilot skeletons" tab of the Case Room BRD and section 12.1 of the
 * Engineering Edition. The interviewer never sees casebook text, only this.
 */

export const CaseType = z.enum([
  "profitability",
  "market_entry",
  "pricing",
  "growth",
  "m_and_a",
  "guesstimate",
  "operations",
  "unconventional",
]);
export type CaseType = z.infer<typeof CaseType>;

export const Fact = z
  .object({
    /** "f01", "f02", ... unique within the skeleton */
    id: z.string().regex(/^f\d{2}$/),
    /** What the candidate must ask about before this is revealed */
    asks: z.string().min(3),
    /** What the interviewer says. Interviewer statements only, never candidate guesses */
    reveal: z.string().min(3),
    /**
     * fact  = revealed when asked.
     * clue  = conditional fact that points at the crux; needs `condition`.
     * probe = a question the interviewer asks at the point described in `asks`.
     */
    kind: z.enum(["fact", "clue", "probe"]),
    condition: z.string().min(3).optional(),
    page: z.string().optional(),
  })
  .strict();
export type Fact = z.infer<typeof Fact>;

export const VerifierFlag = z
  .object({
    text: z.string().min(3),
    resolved: z.boolean(),
    decision: z.string().min(3).optional(),
  })
  .strict();

export const Skeleton = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)+$/),
    /** Bump on any change after publishing */
    version: z.number().int().positive(),
    status: z.enum(["draft", "verified", "under_review"]),
    /**
     * Who checked the skeleton against its source page.
     * "ai_second_pass" is enough for development; a student-facing release
     * shows it as "AI-checked", distinct from "human-verified".
     */
    verification: z
      .object({
        method: z.enum(["ai_second_pass", "human"]),
        by: z.string().min(2),
        on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        note: z.string().optional(),
      })
      .strict()
      .optional(),
    title: z.string().min(3),
    type: CaseType,
    source: z
      .object({
        book: z.string().min(3),
        pages: z.string().min(1),
        firm: z.string().optional(),
        note: z.string().optional(),
      })
      .strict(),
    confidence: z.enum(["high", "medium", "low"]),
    /** full = up to 14 candidate turns; drill = 10-minute framework drill, 6 turns */
    runMode: z.enum(["full", "drill"]),
    /** Read to the candidate word for word. No model call */
    prompt: z.string().min(10),
    facts: z.array(Fact).min(1),
    /** Candidate figures the interviewer may accept but never supplies */
    acceptedAssumptions: z.array(z.string()),
    /** What the interviewer must refuse rather than invent */
    outOfScope: z.array(z.string()).min(1),
    crux: z
      .object({
        statement: z.string().min(10),
        clue: z.string().min(3),
        test: z.string().optional(),
      })
      .strict(),
    paths: z.array(z.string()).min(1),
    wrongTurns: z.array(z.object({ id: z.string().regex(/^w\d{2}$/), text: z.string().min(3) }).strict()),
    quant: z
      .object({
        kind: z.enum(["none", "single", "chain"]),
        working: z.string().optional(),
        answer: z.string().optional(),
        /** Numbers the working starts from; each must appear in facts or accepted assumptions */
        inputs: z.array(z.string()).optional(),
        /** true = a check the grader may reward, not something the interviewer asks for */
        optional: z.boolean().optional(),
      })
      .strict(),
    /** What a complete answer contains beyond the crux. Grader only, never the interviewer */
    answerKey: z.array(z.string()).optional(),
    close: z
      .object({
        condition: z.string().min(5),
        prompt: z.string().min(5),
      })
      .strict(),
    anchors: z.object({ s5: z.string().min(5), s7: z.string().min(5), s9: z.string().min(5) }).strict(),
    verifierFlags: z.array(VerifierFlag),
  })
  .strict();
export type Skeleton = z.infer<typeof Skeleton>;

/** The same sentence in every case (BR-3). */
export const OUT_OF_SCOPE_REPLY = "That's not available for this case. How would you proceed without it?";

/** Turn budgets (BR-12). */
export const TURN_BUDGET = { full: 14, drill: 6 } as const;
