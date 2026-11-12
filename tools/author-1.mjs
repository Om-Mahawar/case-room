import { IIMA, SPJ, IIML, facts, wrong, flags, save } from "./_common.mjs";

// 1.1 ------------------------------------------------------------------------------------
save({
  id: "iima-abc-batteries",
  title: "ABC Batteries",
  type: "profitability",
  source: { book: IIMA, pages: "57", note: "Transcript and approach page" },
  confidence: "high",
  runMode: "full",
  prompt: "Our client ABC Batteries is an Indian battery manufacturer whose profits have been declining for the past 6 months. Identify the core issue and suggest recommendations.",
  facts: facts([
    ["Products", "Two kinds: AA/AAA for remotes and electronic appliances, and D-cell for torches."],
    ["Which product is declining", "D-cell battery sales have been declining."],
    ["Value chain and distribution", "ABC manufactures. Its sales executives reach regional distributors and wholesalers, who supply the retailers: local electrical shops."],
    ["Which markets ABC sells in", "India only. If the candidate infers that D-cell buyers are mainly in Tier-II cities and rural areas, confirm it."],
    ["Industry-wide or just us; the competitive landscape", "Just ABC. Two major players in D-cells: ABC has 30% share, XYZ has 50%, and the rest is fragmented. XYZ's profits have risen over the same period."],
    ["Geography of the decline", "The decline is across India; some geographies are more affected than others."],
    ["Revenue or cost", "Costs are constant; D-cell revenue has declined."],
    ["Price or volume", "The number of units sold has decreased."],
    ["Demand or supply", "Customer demand has decreased."],
    ["Our product and price compared with XYZ", "Comparable product specifications and post-purchase benefits. ABC sells at a 5% lower retail price, and always has."],
    ["Where to focus, once the candidate has laid out the customer's purchase journey", "Focus mainly on awareness of the product.", "probe"],
    ["Awareness, the point of sale, retailers or the sales team", "In one of the major markets ABC's sales executives left the company. The new ones lack the retailers' trust, so retailers push XYZ to customers who do not ask for a brand.", "clue", "Only once the candidate looks at awareness or the point of sale"],
    ["What XYZ has done differently, or why buyers keep choosing XYZ", "In the past year XYZ launched torches pan-India, sold bundled with its D-cell batteries. Customers repurchase the same brand of cells when they run out.", "clue", "Only once the candidate looks at awareness or the point of sale"],
  ]),
  acceptedAssumptions: [],
  outOfScope: [
    "Any rupee figure: sales, profit, or the size of the decline",
    "Market size",
    "Retailer count",
    "Advertising spend",
    "Leakage or failure rates",
    "Recent product changes",
  ],
  crux: {
    statement: "The switch happens at the shop counter, not in the product. Two causes: lost retailer push after sales-team churn, and XYZ's torch bundle locking in repeat purchases.",
    clue: "XYZ grows while ABC falls, though ABC's product is comparable and cheaper. So the gap is in how the battery reaches the buyer.",
    test: "Remove \"XYZ's profits rose\" and the candidate can blame a shrinking market. Remove \"comparable and 5% cheaper\" and they chase price or quality. Both facts are load-bearing.",
  },
  paths: [
    "Profit → revenue → volume → demand → customer journey (need, awareness, purchase) → awareness of a low-involvement buyer",
    "Down the distribution chain: sales executive → distributor → retailer",
  ],
  wrongTurns: wrong([
    "Product quality or leakage (no data, and flat costs argue against it)",
    "Electrification killing torch demand (that would hit XYZ too)",
  ]),
  quant: { kind: "none" },
  answerKey: [
    "Answer the torch bundle: launch a torch line if feasible, or partner with torch brands; advertise the D-cell as price-competitive and compatible with every torch",
    "Rebuild retailer trust: experienced local sales hires, key opinion leaders, cash or trade discount schemes, trust-building workshops",
  ],
  close: {
    condition: "The candidate names both causes, or finds the second after one nudge.",
    prompt: "Now suggest some recommendations on how to resolve this.",
  },
  anchors: {
    s5: "Stays on product or generic marketing. The interviewer has to reveal both causes.",
    s7: "Uses the competitor comparison to reach the retailer. Finds one cause; recommendations are generic.",
    s9: "Goes to the point of sale unprompted, finds both causes, and ties a fix to each. Checks whether a torch launch is feasible before recommending it.",
  },
  verifierFlags: flags([
    ["No quant moment in the source: add one or keep the case qualitative?", "Keep it qualitative. Nothing is added."],
    ["The transcript says some geographies are hit harder; the approach page says very little geography-related impact.", "Follow the transcript."],
  ]),
});

// 1.2 ------------------------------------------------------------------------------------
save({
  id: "spjimr-potato-chips",
  title: "Potato Chips Manufacturer",
  type: "profitability",
  source: { book: SPJ, pages: "39-41", firm: "Kearney" },
  confidence: "high",
  runMode: "full",
  prompt: "Your client is a national potato chips manufacturer. Their profitability has declined in the last three years. Diagnose the issue.",
  facts: facts([
    ["Revenue or cost", "Costs have been rising."],
    ["Where in the value chain", "Largely on the procurement side."],
    ["Potatoes specifically", "Yes, potato procurement cost has been rising."],
    ["Market price of potatoes", "Market prices have gone down over the same period."],
    ["Plants", "Four plants: one each in the North, South, East and West."],
    ["How buying is organised", "Mostly plant by plant, with some coordination."],
    ["Number of suppliers", "Around a hundred."],
    ["Where the suppliers are", "About eighty operate locally near individual plants; twenty supply nationally."],
    ["Spend split", "Roughly fifty-fifty between local and national suppliers."],
    ["Has the sourcing mix changed", "Not materially."],
    ["Spoilage or quality rejects", "That's possible, but not the primary concern."],
    ["Supplier margins", "Hard to say directly."],
    ["Variation by plant", "Yes. One plant shows a particularly sharp rise: the East plant."],
    ["Contract type", "Mostly short-term contracting."],
    ["Quality specifications", "Yes, the client introduced stricter quality grading two years ago."],
    ["When the candidate says suppliers have location-specific bargaining power", "Location-specific bargaining power? Explain.", "probe"],
  ]),
  acceptedAssumptions: [],
  outOfScope: ["Any rupee cost", "Margins", "Volumes", "Potato prices in rupees", "Plant-level spend"],
  crux: {
    statement: "The client pays more while the market pays less, so the problem is how it buys, not what it buys. Many small local suppliers with no scale, short-term contracts that never pass on falling prices, location power at the East plant, and stricter grading passed through as price.",
    clue: "\"Market prices have gone down.\" The contradiction should stop the candidate from blaming the commodity.",
    test: "Remove the falling market price and the case collapses into \"potatoes got expensive\". Remove the 80/20 supplier split and the scale argument has no support.",
  },
  paths: [
    "Value chain → procurement → parts of procurement cost (base price, transport, losses, rejects, supplier margin) → supplier structure and contracts",
    "Start from the plant-level variance and work back to supplier structure",
  ],
  wrongTurns: wrong([
    "Weather or crop prices",
    "Transport (the sourcing mix has not changed)",
    "Spoilage (not the main driver)",
  ]),
  quant: {
    kind: "single",
    optional: true,
    working: "Derived from the given facts: each local supplier gets on average 50% ÷ 80 of spend and each national one 50% ÷ 20, so national orders are 4 times larger.",
    answer: "National orders are 4 times larger on average",
    inputs: ["eighty", "twenty", "fifty"],
  },
  answerKey: [
    "Consolidate suppliers toward fewer, scalable aggregators",
    "Sign longer contracts to lock in falling prices",
    "Run competitive bids across plants",
    "Realign the grading standard with its cost",
    "Act on the East plant specifically",
  ],
  close: {
    condition: "The candidate has linked at least two of the four drivers to the rising cost.",
    prompt: "Pull this all together for me.",
  },
  anchors: {
    s5: "Spots procurement but explains it with the commodity price. Needs the contradiction pointed out.",
    s7: "Uses the contradiction and finds two drivers, such as supplier fragmentation and short contracts.",
    s9: "Spots from the 80/50 split that orders are small, asks about plant variance and contracts without prompting, and links each fix to a driver.",
  },
  verifierFlags: flags([
    ["The 4-times order-size check is derived, not in the source: keep or drop?", "Keep it as an optional check the grader may reward. The interviewer does not ask for it."],
    ["The source interviewer says \"you're thinking along the right lines\" before it is earned.", "Dropped. The supplier-margin fact is only \"hard to say directly\"."],
  ]),
});

// 2.1 ------------------------------------------------------------------------------------
save({
  id: "spjimr-pet-food",
  title: "Pet-Food Manufacturer",
  type: "market_entry",
  source: { book: SPJ, pages: "90-92", firm: "BCG" },
  confidence: "medium",
  runMode: "full",
  prompt: "Your client is a Switzerland-based pet-food manufacturer with a strong presence in Europe and China. They now want to enter India. What would you recommend?",
  facts: facts([
    ["Objective", "To expand reach and grow the business."],
    ["Portfolio", "Dog and cat food across price tiers."],
    ["Constraints on capital, timeline or capacity", "None. They are a large company with deep pockets."],
    ["Competition in India", "Two large players hold about 65% of the market; the remaining 35% is fragmented across small start-ups and local brands."],
    ["After the candidate sizes the market", "Does that look attractive enough?", "probe"],
    ["After market attractiveness", "Let's talk about financial viability.", "probe"],
    ["After financial viability", "Now discuss the operational aspects. How do they build credibility?", "probe"],
    ["After operations", "Let's talk about modes of entry.", "probe"],
  ]),
  acceptedAssumptions: [
    "1.4 bn people; 35% urban; about 100 m urban households",
    "10% of urban households own pets, so about 10 m pet-owning homes: 8 m dog and 2 m cat",
    "₹1,000 per pet per month on packaged food",
    "5% share within three years",
    "About 35% gross margin when importing; 15–18% marketing and distribution; about 5% overheads",
    "₹40–60 Cr set-up cost",
    "Local manufacturing once revenue passes ₹300–400 Cr",
  ],
  outOfScope: ["Market-size data", "Pet-ownership statistics", "Competitor names", "Import duty rates", "Regulations"],
  crux: {
    statement: "With no constraints, the question is sequencing, not go or no-go. Enter by importing to test fit and price points, manufacture locally once revenue reaches about ₹300–400 Cr, then consider a joint venture for Tier 2 and 3. In an emotional, high-trust category, credibility (vets, sampling, shelters) is the operational crux.",
    clue: "\"No constraints\" tempts a plant on day one. A strong candidate still phases, because Indian price sensitivity and product fit are unknown.",
  },
  paths: [
    "Market attractiveness → financial viability → operational feasibility → mode of entry",
    "A customer-first or 3C structure that reaches the same four questions",
  ],
  wrongTurns: wrong([
    "Local manufacturing from day one \"because money is no object\"",
    "Ignoring that two players hold 65%",
  ]),
  quant: {
    kind: "chain",
    working: "Candidate-driven sizing: 10 m pet-owning homes × ₹12,000 a year = ₹12,000 Cr. A 5% share = ₹600 Cr revenue. A 12–15% operating margin gives ₹72–90 Cr.",
    answer: "About ₹12,000 Cr market; ₹600 Cr revenue at a 5% share",
    inputs: ["10 m pet-owning homes", "₹1,000 per pet per month", "5% share"],
  },
  answerKey: [
    "A clear go",
    "Phased mode: import and distribute first, local manufacturing at scale, a joint venture later for smaller cities",
    "A trust-building plan: vet endorsements, sampling, breeders and shelters",
    "Hybrid distribution: offline retail and clinics for credibility, online for convenience",
  ],
  close: {
    condition: "The candidate has covered attractiveness, viability and mode of entry.",
    prompt: "What would be your final recommendation?",
  },
  anchors: {
    s5: "Lists entry modes without choosing; no sizing.",
    s7: "Sizes the market sensibly and picks a mode with reasons.",
    s9: "Sizes and sanity-checks, phases the entry with explicit triggers, and names trust as the binding operational risk.",
  },
  verifierFlags: flags([
    ["The case-facts box on p92 belongs to a technical-textiles case.", "Not loaded. The skeleton is built from the transcript on p90–91."],
    ["The source converts ₹12,000 Cr to about USD 1.5 bn at roughly ₹80 to the dollar, which is out of date.", "The dollar figure is dropped; the case runs in rupees only."],
    ["Going from 490 m urban people to 100 m households assumes about 4.9 people per household, never stated.", "Accept either route. A top answer states its household size."],
    ["Grade the method, not the figures.", "Confirmed: all sizing numbers are the candidate's assumptions; the interviewer supplies none."],
  ]),
});

// 2.2 ------------------------------------------------------------------------------------
save({
  id: "iiml-tech-us-entry",
  title: "Tech company enters the US",
  type: "market_entry",
  source: { book: IIML, pages: "134-135", firm: "EY-Parthenon", note: "Real interview write-up" },
  confidence: "low",
  runMode: "drill",
  prompt: "A tech-based company wants to enter the US market. Give a framework for entry.",
  facts: facts([
    ["The company", "A tech-based company that develops apps."],
    ["Target country", "USA."],
    ["Scale of operations in India", "A small-sized company."],
    ["Limits on time or money", "No such restrictions."],
    ["Which part of the framework to focus on", "No, go ahead and tell me the important points."],
  ]),
  acceptedAssumptions: [],
  outOfScope: ["Revenue", "Products in detail", "Competitors", "Budget figures", "US regulation"],
  crux: {
    statement: "A small app firm cannot take on the US market head-on. The stronger answer enters through backend support or services for US firms rather than independently, and says why that fits a small company.",
    clue: "The interviewer wants \"the important points\", not a full framework: the round tests whether the candidate prioritises quickly.",
  },
  paths: [
    "Why enter → where and whom to serve → how to enter (services or business-to-business, partnership, own product)",
    "Any short, prioritised structure that uses the fact that the company is small",
  ],
  wrongTurns: wrong([
    "Reciting a long generic framework",
    "Proposing a direct consumer launch with heavy marketing spend",
  ]),
  quant: { kind: "none" },
  close: {
    condition: "The candidate has named a mode of entry.",
    prompt: "Summarise your recommended mode of entry, your reasons and the main risk.",
  },
  anchors: {
    s5: "Generic framework that never uses the facts.",
    s7: "Clear structure and a mode, with some link to size.",
    s9: "Brief and prioritised; a low-risk entry justified by small scale; names what would need checking before going further.",
  },
  verifierFlags: flags([
    ["The write-up does not record the interviewer's reaction to the answer, and the same interview went on to an ATM guesstimate and a kulfi-stall case.", "Run as a 10-minute framework drill. The follow-on cases are not built for the pilot."],
  ]),
});
