/** Writes skeletons/index.json: the cards the library screen shows (LIB-1). Only verified skeletons are listed (LIB-3). */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadSkeletons, SKELETON_DIR } from "../src/schema/load";

const order = ["profitability", "market_entry", "pricing", "growth", "m_and_a", "guesstimate", "operations", "unconventional"];
const cards = loadSkeletons()
  .filter((s) => s.status === "verified")
  .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type) || a.id.localeCompare(b.id))
  .map((s) => ({
    id: s.id,
    version: s.version,
    title: s.title,
    type: s.type,
    source: `${s.source.book}, p${s.source.pages}`,
    firm: s.source.firm ?? null,
    confidence: s.confidence,
    runMode: s.runMode,
    checkedBy: s.verification?.method === "human" ? "human-verified" : "AI-checked",
  }));
writeFileSync(join(SKELETON_DIR, "index.json"), JSON.stringify(cards, null, 2) + "\n");
console.log(`index.json: ${cards.length} published skeletons`);
