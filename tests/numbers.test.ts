import { describe, expect, it } from "vitest";
import { checkReply, extractNumbers, normaliseNumber, allowedNumberSet } from "../src/engine/numbers";

describe("normaliseNumber", () => {
  it("treats Indian and Western grouping alike", () => {
    expect(normaliseNumber("1,20,000")).toBe("120000");
    expect(normaliseNumber("120,000")).toBe("120000");
    expect(normaliseNumber("8.750")).toBe("8.75");
  });
});

describe("extractNumbers", () => {
  it("reads rupees, percentages, decimals and ranges", () => {
    expect(extractNumbers("EV costs ₹1,20,000; petrol ₹80,000.")).toEqual(["120000", "80000"]);
    expect(extractNumbers("₹100–120 per 100 ml")).toEqual(["100", "120", "100"]);
    expect(extractNumbers("0.25 × 0.35 = 8.75%")).toEqual(["0.25", "0.35", "8.75"]);
  });
  it("reads number words above ten but not small counts", () => {
    expect(extractNumbers("About eighty local and twenty national suppliers")).toEqual(["80", "20"]);
    expect(extractNumbers("I see two reasons and three risks")).toEqual([]);
  });
  it("does not treat a scale word after a digit as a separate number", () => {
    expect(extractNumbers("₹6 crore over 5 lakh bottles")).toEqual(["6", "5"]);
  });
  it("ignores a trailing comma after a number", () => {
    expect(extractNumbers("in 2019, then")).toEqual(["2019"]);
  });
});

describe("checkReply (BR-4)", () => {
  const allowed = allowedNumberSet(["ABC has 30% share, XYZ has 50%.", "ABC sells at a 5% lower retail price."]);
  it("passes a reply that uses only the case's numbers", () => {
    expect(checkReply("XYZ holds 50% and ABC 30%.", allowed)).toEqual({ ok: true });
  });
  it("catches an invented figure", () => {
    expect(checkReply("Profits fell by about 40% last quarter.", allowed)).toEqual({ ok: false, untraceable: ["40"] });
  });
  it("lets the interviewer repeat a figure the candidate gave", () => {
    expect(checkReply("Fine, go ahead with 1.4 billion.", allowed, ["I'll assume 1.4 billion people"])).toEqual({ ok: true });
  });
  it("reports each untraceable number once", () => {
    const r = checkReply("₹1,500 now and ₹1,500 later, at a 40% margin.", allowed);
    expect(r).toEqual({ ok: false, untraceable: ["1500", "40"] });
  });
  it("passes a reply with no numbers", () => {
    expect(checkReply("That's not available for this case. How would you proceed without it?", allowed)).toEqual({ ok: true });
  });
});
