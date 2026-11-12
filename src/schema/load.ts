import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Skeleton } from "./skeleton";
import { allowedNumberSet } from "../engine/numbers";

export const SKELETON_DIR = join(process.cwd(), "skeletons");

export type Loaded = { file: string; raw: unknown };

/** Every skeleton file on disk (index.json is generated, not a skeleton). */
export function readSkeletonFiles(dir: string = SKELETON_DIR): Loaded[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .sort()
    .map((file) => ({ file, raw: JSON.parse(readFileSync(join(dir, file), "utf8")) as unknown }));
}

export function loadSkeletons(dir: string = SKELETON_DIR): Skeleton[] {
  return readSkeletonFiles(dir).map(({ file, raw }) => {
    const parsed = Skeleton.safeParse(raw);
    if (!parsed.success) throw new Error(`${file}: ${parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
    return parsed.data;
  });
}

/**
 * Every number the interviewer may say unprompted in this case: the prompt,
 * the facts and the close prompt.
 *
 * Accepted assumptions and the quant working are left out on purpose. They are
 * the candidate's to state; once the candidate has typed a figure, the engine
 * allows the interviewer to repeat it (see checkReply's candidateTexts). This
 * stops the interviewer supplying an assumption or leaking the quant answer.
 */
export function skeletonAllowedNumbers(s: Skeleton): Set<string> {
  return allowedNumberSet([s.prompt, ...s.facts.map((f) => f.reveal), s.close.prompt]);
}

/** Numbers the grader and the linter may rely on: everything in the skeleton. */
export function skeletonAllNumbers(s: Skeleton): Set<string> {
  return allowedNumberSet([
    s.prompt,
    ...s.facts.map((f) => f.reveal),
    ...s.acceptedAssumptions,
    s.quant.working ?? "",
    s.quant.answer ?? "",
    s.close.prompt,
  ]);
}
