/**
 * Number handling for the "no untraceable number" rule (BR-4).
 *
 * A number in an interviewer reply is allowed only if it appears in the
 * skeleton (facts, accepted assumptions, quant working) or in something the
 * candidate has typed. This module extracts numbers from text and normalises
 * them so "1,20,000", "120000" and "₹1,20,000" compare equal.
 *
 * Deliberately conservative: digits are always checked; number words are
 * checked only above ten, so "two reasons" or "three buckets" never trips it.
 */

const NUMBER_WORDS: Record<string, number> = {
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40,
  fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100,
  thousand: 1000, lakh: 100000, crore: 10000000, million: 1000000, billion: 1000000000,
};

/** Scale words that are units when they follow a digit ("5 lakh") and not numbers on their own. */
const SCALE_WORDS = new Set(["hundred", "thousand", "lakh", "crore", "million", "billion"]);

/** "1,20,000" -> "120000"; "8.750" -> "8.75"; "05" -> "5". */
export function normaliseNumber(raw: string): string {
  const cleaned = raw.replace(/,/g, "");
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return cleaned;
  return String(n);
}

/** Every number written in digits, normalised. Ranges like "100-120" give both ends. */
export function extractDigitNumbers(text: string): string[] {
  const out: string[] = [];
  // digits with optional Indian/Western comma grouping and optional decimal part
  const re = /\d[\d,]*(?:\.\d+)?/g;
  for (const m of text.matchAll(re)) {
    const token = m[0].replace(/,+$/, "");
    if (token.length === 0) continue;
    out.push(normaliseNumber(token));
  }
  return out;
}

/** Number words above ten ("fifty-fifty", "eighty local suppliers"), normalised to digits. */
export function extractWordNumbers(text: string): string[] {
  const out: string[] = [];
  const words = text.toLowerCase().match(/[a-z]+/g) ?? [];
  for (const w of words) {
    if (SCALE_WORDS.has(w)) continue; // "5 lakh", "₹6 crore": the digit carries the check
    const v = NUMBER_WORDS[w];
    if (v !== undefined) out.push(String(v));
  }
  return out;
}

export function extractNumbers(text: string): string[] {
  return [...extractDigitNumbers(text), ...extractWordNumbers(text)];
}

/** Build the allowed set from any number of source texts. */
export function allowedNumberSet(texts: readonly string[]): Set<string> {
  const set = new Set<string>();
  for (const t of texts) for (const n of extractNumbers(t)) set.add(n);
  return set;
}

export type NumberCheck = { ok: true } | { ok: false; untraceable: string[] };

/**
 * BR-4. `allowed` comes from the skeleton; `candidateTexts` are the candidate's
 * own messages so far (the interviewer may repeat a figure the candidate gave).
 */
export function checkReply(reply: string, allowed: ReadonlySet<string>, candidateTexts: readonly string[] = []): NumberCheck {
  const fromCandidate = allowedNumberSet(candidateTexts);
  const untraceable: string[] = [];
  for (const n of extractNumbers(reply)) {
    if (allowed.has(n) || fromCandidate.has(n)) continue;
    if (!untraceable.includes(n)) untraceable.push(n);
  }
  return untraceable.length === 0 ? { ok: true } : { ok: false, untraceable };
}
