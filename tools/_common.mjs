// Authoring helper: the skeleton objects in tools/author-*.mjs are converted from the
// "Pilot skeletons" tab of the BRD. The JSON files in skeletons/ are the source of truth
// once written; these scripts are kept only so the conversion can be re-run and reviewed.
import { writeFileSync } from "node:fs";
import { join } from "node:path";

export const IIMA = "IIM Ahmedabad Consult Club Casebook 2025-26";
export const SPJ = "SPJIMR Consulting Casebook 2026-27";
export const IIML = "IIM Lucknow Casebook 2025-26, EY-Parthenon interview experiences";

export const CHECKED = {
  method: "ai_second_pass",
  by: "Claude",
  on: "2026-11-12",
  note: "Second pass against the source pages. Not yet checked by a person; shown to students as AI-checked.",
};

const fid = (i) => `f${String(i + 1).padStart(2, "0")}`;
const wid = (i) => `w${String(i + 1).padStart(2, "0")}`;

/** facts: [asks, reveal] | [asks, reveal, "clue", condition] | [asks, reveal, "probe"] */
export function facts(rows) {
  return rows.map(([asks, reveal, kind = "fact", condition], i) => {
    const f = { id: fid(i), asks, reveal, kind };
    if (condition) f.condition = condition;
    return f;
  });
}
export const wrong = (rows) => rows.map((text, i) => ({ id: wid(i), text }));
export const flags = (rows) => rows.map(([text, decision]) => ({ text, resolved: true, decision }));

export function save(s) {
  const full = { version: 1, status: "verified", verification: CHECKED, ...s };
  // stable key order for readable diffs
  const order = ["id", "version", "status", "verification", "title", "type", "source", "confidence", "runMode", "prompt", "facts", "acceptedAssumptions", "outOfScope", "crux", "paths", "wrongTurns", "quant", "answerKey", "close", "anchors", "verifierFlags"];
  const out = {};
  for (const k of order) if (full[k] !== undefined) out[k] = full[k];
  for (const k of Object.keys(full)) if (!(k in out)) throw new Error(`unknown key ${k} in ${s.id}`);
  writeFileSync(join(process.cwd(), "skeletons", `${s.id}.json`), JSON.stringify(out, null, 2) + "\n");
  console.log("wrote", s.id);
}
