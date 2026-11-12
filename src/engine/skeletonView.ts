import { OUT_OF_SCOPE_REPLY, TURN_BUDGET, type Skeleton } from "../schema/skeleton";

/**
 * The skeleton as the interviewer sees it (section 10.1, part 2).
 * The grading anchors and the answer key are left out: they are for the grader.
 */
export function interviewerView(s: Skeleton): string {
  const lines: string[] = [];
  lines.push("SKELETON");
  lines.push(`Case: ${s.title} (${s.type.replace(/_/g, " ")}; ${s.runMode === "drill" ? "10-minute framework drill" : "full case"})`);
  lines.push(`Prompt already read to the candidate: ${s.prompt}`);
  lines.push("");
  lines.push("FACTS");
  for (const f of s.facts) {
    const tag = f.kind === "fact" ? "" : ` [${f.kind}${f.condition ? `: ${f.condition}` : ""}]`;
    lines.push(`${f.id}${tag} | asks: ${f.asks} | say: ${f.reveal}`);
  }
  lines.push("");
  lines.push(`ACCEPTED ASSUMPTIONS (the candidate's to state; accept them, never supply them): ${s.acceptedAssumptions.length ? s.acceptedAssumptions.join("; ") : "none"}`);
  lines.push(`OUT OF SCOPE (reply "${OUT_OF_SCOPE_REPLY}"): ${s.outOfScope.join("; ")}`);
  lines.push(`CRUX (never reveal): ${s.crux.statement}`);
  lines.push(`CRUX CLUE (for the first nudge, put as a question): ${s.crux.clue}`);
  lines.push(`PATHS (any of these is valid): ${s.paths.join(" || ")}`);
  lines.push(`WRONG TURNS: ${s.wrongTurns.map((w) => `${w.id} ${w.text}`).join("; ") || "none listed"}`);
  const q = s.quant;
  lines.push(
    q.kind === "none"
      ? "QUANT: none. Do not introduce a calculation."
      : `QUANT (${q.kind}${q.optional ? ", optional: do not ask for it" : ""}; never reveal): ${q.working ?? ""} Answer: ${q.answer ?? ""}`,
  );
  lines.push(`CLOSE condition: ${s.close.condition}`);
  lines.push(`CLOSE prompt: ${s.close.prompt}`);
  lines.push(`Turn budget: ${TURN_BUDGET[s.runMode]} candidate turns.`);
  return lines.join("\n");
}

/** JSON schema for the interviewer's reply, in the form Gemini's responseSchema takes. */
export const INTERVIEWER_TURN_SCHEMA = {
  type: "OBJECT",
  properties: {
    reply: { type: "STRING" },
    revealed: { type: "ARRAY", items: { type: "STRING" } },
    outOfScope: { type: "BOOLEAN" },
    nudge: { type: "STRING", enum: ["none", "clue", "fact"] },
    wrongTurn: { type: "STRING" },
    cruxReached: { type: "STRING", enum: ["no", "partly", "yes"] },
    closeReady: { type: "BOOLEAN" },
    note: { type: "STRING" },
  },
  required: ["reply", "revealed", "outOfScope", "nudge", "wrongTurn", "cruxReached", "closeReady", "note"],
  propertyOrdering: ["reply", "revealed", "outOfScope", "nudge", "wrongTurn", "cruxReached", "closeReady", "note"],
} as const;
