import { describe, expect, it } from "vitest";
import { loadSkeletons, skeletonAllowedNumbers } from "../src/schema/load";
import { OUT_OF_SCOPE_REPLY, Skeleton } from "../src/schema/skeleton";
import { checkReply } from "../src/engine/numbers";
import { lint } from "../scripts/lint-skeletons";

const all = loadSkeletons();
const byId = (id: string) => {
  const s = all.find((x) => x.id === id);
  if (!s) throw new Error(`no skeleton ${id}`);
  return s;
};

describe("pilot library (T-SCH)", () => {
  it("has 16 skeletons, two per case type", () => {
    expect(all).toHaveLength(16);
    const counts = new Map<string, number>();
    for (const s of all) counts.set(s.type, (counts.get(s.type) ?? 0) + 1);
    expect([...counts.values()]).toEqual(Array(8).fill(2));
  });
  it("has no lint errors", () => {
    const errors = all.flatMap(lint).filter((f) => f.level === "error");
    expect(errors).toEqual([]);
  });
  it("says who checked every published skeleton, with every flag settled", () => {
    for (const s of all.filter((x) => x.status === "verified")) {
      expect(s.verification, s.id).toBeDefined();
      expect(s.verifierFlags.every((f) => f.resolved && f.decision), s.id).toBe(true);
    }
  });
  it("opens every case with a prompt that makes no number check fail", () => {
    for (const s of all) expect(checkReply(s.prompt, skeletonAllowedNumbers(s)), s.id).toEqual({ ok: true });
  });
  it("lets every fact through its own case's number check", () => {
    for (const s of all) for (const f of s.facts) expect(checkReply(f.reveal, skeletonAllowedNumbers(s)), `${s.id} ${f.id}`).toEqual({ ok: true });
  });
  it("keeps the out-of-scope reply free of numbers", () => {
    for (const s of all) expect(checkReply(OUT_OF_SCOPE_REPLY, skeletonAllowedNumbers(s))).toEqual({ ok: true });
  });
});

describe("the number check on real cases", () => {
  it("ABC Batteries: the price fact passes, an invented decline does not (T-V1, v1 failure)", () => {
    const allowed = skeletonAllowedNumbers(byId("iima-abc-batteries"));
    expect(checkReply("Comparable specifications; ABC is 5% cheaper and always has been.", allowed).ok).toBe(true);
    expect(checkReply("Profits are down about 40% over the 6 months.", allowed)).toEqual({ ok: false, untraceable: ["40"] });
  });
  it("Cough Syrup: the interviewer cannot supply the answer or the candidate's price bands", () => {
    const allowed = skeletonAllowedNumbers(byId("spjimr-cough-syrup"));
    expect(checkReply("A price near ₹130 would be sensible.", allowed).ok).toBe(false);
    expect(checkReply("Strong brands sell at ₹150–180.", allowed).ok).toBe(false);
    expect(checkReply("₹130 seems like a fair price.", allowed, ["I would launch at ₹130"]).ok).toBe(true);
  });
  it("Water bottles: interviewer facts pass, the candidate's staff ratio does not until they say it", () => {
    const allowed = skeletonAllowedNumbers(byId("spjimr-water-bottles"));
    expect(checkReply("Assume 100 rooms at 70% occupancy.", allowed).ok).toBe(true);
    expect(checkReply("Take 1.5 staff per room.", allowed).ok).toBe(false);
    expect(checkReply("So 710 bottles. Good.", allowed, ["That gives 710 bottles a day"]).ok).toBe(true);
  });
  it("EV bike: the stored answer cannot leak", () => {
    const allowed = skeletonAllowedNumbers(byId("spjimr-ev-bike"));
    expect(checkReply("The EV costs ₹1,20,000 and the petrol bike ₹80,000.", allowed).ok).toBe(true);
    expect(checkReply("You should get about ₹43,000.", allowed).ok).toBe(false);
  });
});

describe("linter (SKL-2)", () => {
  const base = byId("spjimr-fire-extinguisher");
  const broken = (patch: Partial<Skeleton>) => lint({ ...base, ...patch }).filter((f) => f.level === "error").map((f) => f.msg);
  it("rejects an unresolved flag on a verified skeleton", () => {
    expect(broken({ verifierFlags: [{ text: "pick one value", resolved: false }] }).join()).toMatch(/unresolved verifier flag/);
  });
  it("rejects a quant answer that is not in its working", () => {
    expect(broken({ quant: { kind: "single", working: "1.1 × 1.1 = 1.21", answer: "ceiling 1.3" } }).join()).toMatch(/1\.3 does not appear/);
  });
  it("rejects a quant input the case never gives", () => {
    expect(broken({ quant: { kind: "single", working: "0.4 × 2 = 0.8", answer: "0.8", inputs: ["40%"] } }).join()).toMatch(/quant input 40/);
  });
  it("rejects a clue with no condition", () => {
    const facts = [...base.facts, { id: "f09", asks: "x y z", reveal: "something new", kind: "clue" as const }];
    expect(broken({ facts }).join()).toMatch(/needs a condition/);
  });
  it("rejects a guesstimate without an estimation chain", () => {
    expect(lint({ ...byId("iiml-paracetamol"), quant: { kind: "none" } }).some((f) => /needs quant.kind chain/.test(f.msg))).toBe(true);
  });
});
