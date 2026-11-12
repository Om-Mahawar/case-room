/**
 * SKL-2: quality rules the schema cannot express.
 * Errors fail the build (NFR-13); warnings are printed for the verifier.
 */
import { loadSkeletons, skeletonAllNumbers } from "../src/schema/load";
import { allowedNumberSet, extractNumbers } from "../src/engine/numbers";
import type { Skeleton } from "../src/schema/skeleton";

type Finding = { level: "error" | "warn"; id: string; msg: string };

export function lint(s: Skeleton): Finding[] {
  const out: Finding[] = [];
  const err = (msg: string) => out.push({ level: "error", id: s.id, msg });
  const warn = (msg: string) => out.push({ level: "warn", id: s.id, msg });

  // fact ids unique and in order
  const ids = s.facts.map((f) => f.id);
  if (new Set(ids).size !== ids.length) err("duplicate fact ids");
  ids.forEach((id, i) => {
    const want = `f${String(i + 1).padStart(2, "0")}`;
    if (id !== want) err(`fact ${id} should be ${want} (ids run in order with no gaps)`);
  });

  // no fact says the same thing twice
  const reveals = s.facts.map((f) => f.reveal.trim().toLowerCase());
  if (new Set(reveals).size !== reveals.length) err("two facts have the same reveal text");

  // clues are conditional; plain facts are not
  for (const f of s.facts) {
    if (f.kind === "clue" && !f.condition) err(`${f.id} is a clue and needs a condition`);
  }

  // wrong-turn ids unique
  const wids = s.wrongTurns.map((w) => w.id);
  if (new Set(wids).size !== wids.length) err("duplicate wrong-turn ids");

  // a published skeleton has every flag settled and says who checked it
  if (s.status === "verified") {
    if (!s.verification) err("status is verified but there is no verification record");
    for (const fl of s.verifierFlags) {
      if (!fl.resolved || !fl.decision) err(`unresolved verifier flag: "${fl.text.slice(0, 60)}"`);
    }
  }

  // quant: inputs trace to the case; the answer appears in the working
  const q = s.quant;
  if (q.kind === "none") {
    if (q.answer) err("quant.kind is none but an answer is given");
  } else {
    if (!q.working) err(`quant.kind is ${q.kind} but there is no working`);
    if (!q.answer) err(`quant.kind is ${q.kind} but there is no answer`);
    if (q.working && q.answer) {
      const inWorking = allowedNumberSet([q.working]);
      for (const n of extractNumbers(q.answer)) {
        if (!inWorking.has(n)) err(`quant answer number ${n} does not appear in the working`);
      }
    }
    const source = allowedNumberSet([s.prompt, ...s.facts.map((f) => f.reveal), ...s.acceptedAssumptions]);
    for (const input of q.inputs ?? []) {
      for (const n of extractNumbers(input)) {
        if (!source.has(n)) err(`quant input ${n} is not in the facts or accepted assumptions`);
      }
    }
  }
  if (s.type === "guesstimate" && q.kind !== "chain") err("a guesstimate needs quant.kind chain (BR-9)");

  // the prompt must not give away the crux clue facts
  for (const f of s.facts) {
    if (f.kind === "clue" && s.prompt.toLowerCase().includes(f.reveal.toLowerCase())) err(`${f.id}: clue text appears in the prompt`);
  }

  // the anchors must not lean on numbers the case does not contain
  const all = skeletonAllNumbers(s);
  for (const [k, text] of Object.entries(s.anchors)) {
    for (const n of extractNumbers(text)) {
      if (!all.has(n) && Number(n) > 10) warn(`anchor ${k} mentions ${n}, which is not in the case`);
    }
  }

  // conventions
  if (s.confidence === "low" && s.runMode !== "drill") warn("low confidence but not run as a drill");
  if (s.runMode === "drill" && s.confidence !== "low") warn("run as a drill but confidence is not low");
  if (s.facts.filter((f) => f.kind !== "probe").length < 3) warn("fewer than three facts: the interviewer has little to reveal");

  return out;
}

const isMain = process.argv[1]?.endsWith("lint-skeletons.ts");
if (isMain) {
  const findings = loadSkeletons().flatMap(lint);
  for (const f of findings) console.log(`${f.level.toUpperCase().padEnd(5)} ${f.id}: ${f.msg}`);
  const errors = findings.filter((f) => f.level === "error").length;
  console.log(`${errors} errors, ${findings.length - errors} warnings`);
  process.exit(errors === 0 ? 0 : 1);
}
