import { SPJ, IIMA, facts, wrong, flags, save } from "./_common.mjs";

// 7.1 ------------------------------------------------------------------------------------
save({
  id: "spjimr-elevator",
  title: "Elevator Manufacturer",
  type: "operations",
  source: { book: SPJ, pages: "199-201", firm: "Kearney" },
  confidence: "high",
  runMode: "full",
  prompt: "Your client is a 40-year-old elevator manufacturer in India. Historically they make almost everything in-house: cabins, doors, rails and so on. Over the last couple of years they have started facing manufacturing-related challenges, and the CEO has asked for your help.",
  facts: facts([
    ["Demand side, or supply and internal operations", "Demand has been stable and customer satisfaction on quality remains strong."],
    ["Industry-wide or specific to the client", "The issues are internal and specific to the company."],
    ["What the problem looks like", "Over the last two years procurement costs have gone up by roughly 20%, and factory utilisation has become uneven: some processes are heavily bottlenecked while some lines are underused."],
    ["Components used", "Mechanical assemblies (rails, guide systems, pulleys, drive mechanisms); electrical and electronics (control panels, PCB boards, wiring assemblies, sensors); and metal structures (cabin bodies, doors, frames, safety enclosures)."],
    ["Share made in-house", "Currently 90% of these are manufactured in-house, because \"we always did it that way\"."],
    ["Internal cost against outside vendors", "For metal frames and cabins, external suppliers are 25% cheaper at the same quality. For control systems and safety assemblies, vendors exist but supply is concentrated and expensive; internal production is already competitive."],
    ["After the candidate proposes a make-or-buy split", "It looks fine, but can you please elaborate your approach?", "probe"],
    ["After the procurement approach", "Can you quantify the potential savings, for example for metal fabrication? Make genuine assumptions as required.", "probe"],
    ["In-house operations and where the bottlenecks are", "There are bottlenecks at two main places: the motor assembly line, which is slower and requires skilled labour, and the final testing station, where testing takes a long time. Meanwhile cabins are being produced faster and piling up in inventory."],
    ["Anything else, after the bottleneck fixes", "There is one additional problem: the inventory sitting period is high. What are your suggestions for it?"],
  ]),
  acceptedAssumptions: [
    "Metal fabrication is about 35% of material cost",
    "Material cost is about 50% of revenue",
  ],
  outOfScope: ["Revenue", "Margins", "Volumes", "Headcount", "Inventory days", "Capex figures", "Vendor names"],
  crux: {
    statement: "One legacy habit causes two problems. Make or buy: outsource high-volume, non-differentiating metal fabrication and keep safety and control systems in-house; segment categories, judge total cost rather than unit price, and move from spot buying to performance-linked contracts. Line imbalance: cabins outrun the motor and testing constraints, so faster cabin output only builds inventory.",
    clue: "\"Cabins are being produced faster and piling up in inventory.\"",
    test: "Remove \"25% cheaper, same quality\" and the make-or-buy call has no basis. Remove the cabin pile-up and the bottleneck reads as a capacity shortage.",
  },
  paths: [
    "Procurement optimisation → production and factory efficiency → inventory (the source's route)",
    "Start from the shop floor, then reach make-or-buy",
  ],
  wrongTurns: wrong([
    "Hunting on the demand side",
    "Outsourcing everything, including safety",
    "Building a new plant or adding capacity",
  ]),
  quant: {
    kind: "single",
    working: "0.25 × 0.35 = 8.75% off material cost. Material is about 50% of revenue, so 8.75% × 0.5 = about 4.4 percentage points of margin. The source says 4–5 points.",
    answer: "About 8.75% of material cost, or about 4.4 percentage points of margin",
    inputs: ["25%", "35%", "50%"],
  },
  answerKey: [
    "Outsource metal cabins and frames selectively; keep strategic and supply-risky items in-house",
    "Bottlenecks: schedule cabins to the motor and testing constraint, add test rigs, cross-train labour, preventive maintenance on the motor line",
    "Inventory: segment by criticality, sales and operations planning, forecast-based buying, vendor-managed inventory for standard parts, which frees working capital",
  ],
  close: {
    condition: "The candidate has addressed both procurement and the line imbalance.",
    prompt: "What are your final recommendations for the owner?",
  },
  anchors: {
    s5: "Generic cost-cutting.",
    s7: "The make-or-buy split plus the savings maths.",
    s9: "Both problems, with the bottleneck logic stated (throughput is set by the constraint), the saving quantified, and the inventory and working-capital link made.",
  },
  verifierFlags: flags([
    ["The summary page (p201) opens with a Domino's revenue prompt.", "Ignored; it belongs to another case."],
  ]),
});

// 7.2 ------------------------------------------------------------------------------------
save({
  id: "spjimr-pharma-stockouts",
  title: "Pharmaceuticals Stockouts",
  type: "operations",
  source: { book: SPJ, pages: "209-211" },
  confidence: "high",
  runMode: "full",
  prompt: "A leading pharmaceutical manufacturer is facing frequent stockouts across key domestic markets despite having adequate annual production capacity. The CEO wants you to diagnose the issue and recommend solutions, without investing in new plants.",
  facts: facts([
    ["Is demand strong, and does capacity on paper exceed it", "Correct."],
    ["Is demand volatile or declining", "No, demand is stable and predictable."],
    ["Plant utilisation", "Around 85%."],
    ["Breakdowns or labour disruptions", "No major disruptions."],
    ["Transport delays", "Transportation is fairly reliable."],
    ["Inventory in the system", "Overall inventory is slightly higher than last year."],
    ["Are stockouts uniform across products", "No. Some SKUs are overstocked, others out of stock."],
    ["Push model based on forecast", "Yes."],
    ["Change in forecast accuracy", "It dropped from 88% to 70%."],
    ["Raw-material shortages", "Only occasional API delays."],
    ["Are those delays enough to halt high-demand products", "Occasionally, yes."],
    ["Single-sourced APIs", "For many products, yes."],
    ["Are production plans revised often", "Yes. Almost weekly."],
    ["What drives the revisions", "Sales keeps adjusting forecasts."],
    ["Multiple products on shared lines", "Yes, multiple SKUs run on shared lines."],
    ["After the recommendations", "Why not recommend adding more capacity?", "probe"],
  ]),
  acceptedAssumptions: [],
  outOfScope: ["Capacity in units", "Number of products", "Inventory value or days", "Plant count", "API names or suppliers", "Cost figures"],
  crux: {
    statement: "Inventory up yet stockouts means stock is in the wrong place, not short. Forecast drift drives both product-level misallocation under the push model and weekly rescheduling, which means more changeovers on shared lines and lower effective output for fast movers. Single-sourced APIs are the second cause.",
    clue: "\"Overall inventory is slightly higher than last year\", followed by \"some SKUs are overstocked, others out of stock\".",
    test: "Remove the inventory rise and the case reads as a supply shortage. Remove the forecast drop and the candidate has no reason for the misallocation.",
  },
  paths: [
    "Demand → supply capacity → distribution (transport, positioning, replenishment logic) → upstream planning (raw materials, schedule stability, yield)",
  ],
  wrongTurns: wrong([
    "Demand volatility (ruled out)",
    "Capacity expansion",
    "Transport",
  ]),
  quant: {
    kind: "single",
    optional: true,
    working: "Derived: forecast error rose from 100 − 88 = 12% to 100 − 70 = 30%, which is 2.5 times.",
    answer: "Forecast error rose from 12% to 30%, 2.5 times",
    inputs: ["88%", "70%"],
  },
  answerKey: [
    "Forecasting: a planning cadence with monthly demand lock-in, product-level analytics for fast movers, frozen production windows",
    "Sourcing: dual sourcing for critical APIs, safety stock for fast movers, secured contracts for the top 20% revenue products",
    "No new capacity: the problem is instability and misallocation, not total output",
  ],
  close: {
    condition: "The candidate has found the forecast issue and looked upstream.",
    prompt: "Move to your recommendations.",
  },
  anchors: {
    s5: "Asks for capacity or capex.",
    s7: "Finds the forecast issue.",
    s9: "Links \"inventory up yet stockouts\" to misallocation unprompted, finds both causes, and defends no-capex.",
  },
  verifierFlags: flags([
    ["p209–210 repeat a block of questions; in the first copy \"Are multiple SKUs run on shared lines?\" is answered \"Only occasional API delays\".", "Use the second copy: the answer is \"Yes\"."],
  ]),
});

// 8.1 ------------------------------------------------------------------------------------
save({
  id: "iima-post-merger-workforce",
  title: "Post-Merger Workforce Integration",
  type: "unconventional",
  source: { book: IIMA, pages: "256-257", note: "Transcript on p256, approach page on p257" },
  confidence: "medium",
  runMode: "full",
  prompt: "The client is a legacy newspaper player that has recently acquired a digital media firm. They seek your advice on the integration of both companies.",
  facts: facts([
    ["Each firm's offering and the goal of the acquisition", "The client prints a national daily with a pan-India presence. Because readership growth is stagnant at 1–2%, they wanted to move into the digital space. The acquired firm mainly covers entertainment news for a younger internet audience and has a mobile application. Its revenue is about 50% of the client's, and it is poised to grow at 10% a year, compounded, over the next 10 years."],
    ["Which problem to work on, once the candidate has laid out the areas of integration", "This seems comprehensive. Focus on people-related and systems-related issues. The client wants to know how to allocate the workforce in the combined entity."],
    ["Current organisation structure", "Both firms have marketing, legal, finance and HR consolidated at their headquarters. The legacy firm lacks a digital-strategy function, which the newer firm has, but it has distributor-relations and publishing functions. The legacy firm has a geographic divisional structure, with each region a distinct profit centre and content generated at the regional level. The digital firm's content generation is split by type: entertainment, tech, business and so on."],
    ["After the organisation facts", "Based on this, how would you integrate the workforce?", "probe"],
    ["After the candidate proposes a separate digital division", "Why do you recommend a separate division for it? What else do you suggest with the organisational structure?", "probe"],
    ["Size of the overlap, when the candidate raises redundancy", "Assume 60% of roles in overlapping functions are redundant post-integration. How would you proceed?"],
    ["After the candidate proposes a fitment test", "How do you assess who will be better suited for each role? What should be done with those in redundant roles who don't clear the fitment test?", "probe"],
    ["After redundancy", "Highlight briefly a few initiatives to improve the integration of employees in the merged entity.", "probe"],
  ]),
  acceptedAssumptions: [
    "Digital at 10% a year for 10 years becomes about 2.5 times its size; print grows about 15% in total",
  ],
  outOfScope: ["Headcounts", "Salaries", "Revenue in rupees", "Severance costs", "Labour-law specifics", "The names of either firm"],
  crux: {
    statement: "Structure follows growth. Digital gets its own division (autonomy, accountability, authority) next to a Traditional division that keeps its regional structure. A unified content-strategy team spans both, headquarters functions are consolidated, and digital reuses regional content.",
    clue: "The growth gap: 10% a year for digital against 1–2% for print.",
  },
  paths: [
    "New structure → redundancy elimination → integration initiatives (the source's route)",
    "Any sequence that settles structure before cutting roles",
  ],
  wrongTurns: wrong([
    "Folding both firms into one structure",
    "Immediate layoffs",
    "Ignoring the growth differential",
  ]),
  quant: {
    kind: "single",
    working: "Derived: 1.1 to the power 10 is about 2.6 times for digital; print at 1–2% for 10 years is about 1.10 to 1.22 times. With digital starting at 50% of print's revenue: 0.5 × 2.6 = 1.3 against about 1.1 to 1.2, so digital overtakes print within the decade.",
    answer: "Digital grows about 2.6 times and overtakes print within the decade",
    inputs: ["10%", "1–2%", "50%", "10 years"],
  },
  answerKey: [
    "Redundancy: a fitment test by seniority (junior roles on technical skills, middle managers on interpersonal skills, leadership on conceptual skills)",
    "Evidence from external feedback (peers, superiors, subordinates, panels) and internal records (ratings, trajectory, situational or technical tests)",
    "Those who do not clear it: an alternative role at the same level, the option to step down a level, or temporary roles; layoffs last",
    "Employee level: training and development (equal pay and incentives across divisions, cross-training, access to management, knowledge sharing) and redressal (personal channels, cross-firm engagement sessions)",
    "Organisation level: resource symmetry (systems, technology, processes) and culture symmetry (working styles, norms)",
  ],
  close: {
    condition: "The candidate has proposed a structure and a way to handle redundant roles.",
    prompt: "Summarise your recommendation on structure, redundancy and integration.",
  },
  anchors: {
    s5: "A generic HR integration list.",
    s7: "A sensible structure and a fitment process.",
    s9: "Uses the growth maths to justify the separate division, gives a humane redundancy sequence, and names specific integration initiatives.",
  },
  verifierFlags: flags([
    ["60% of overlapping roles redundant in the transcript (p256); 50% on the approach page (p257).", "Use 60%, the transcript's figure."],
    ["\"Bringing in 50% of the client's revenue\" is ambiguous.", "Read as: the digital firm's revenue is about half of the print firm's. The candidate's maths (digital overtakes print within a decade) only works on this reading."],
    ["In the transcript the candidate, not the interviewer, lists the four integration areas.", "The interviewer does not list them. A correction to the BRD's section 4 is already proposed there."],
  ]),
});

// 8.2 ------------------------------------------------------------------------------------
save({
  id: "spjimr-ev-bike",
  title: "Should your uncle buy an EV bike?",
  type: "unconventional",
  source: { book: SPJ, pages: "187-188", firm: "Alvarez & Marsal" },
  confidence: "high",
  runMode: "full",
  prompt: "Your uncle needs advice on whether to buy an EV bike that costs more than a conventional motorcycle. You can begin.",
  facts: facts([
    ["How long he will keep the bike", "He plans to keep it for 5 years."],
    ["Purchase prices", "An EV costs ₹1,20,000, while a comparable petrol bike costs ₹80,000."],
    ["Distance ridden", "He rides 6,000 km a year."],
    ["Fuel cost and mileage", "Petrol is ₹100 a litre and the bike does 50 km per litre."],
    ["Electricity cost and efficiency", "Electricity is ₹8 per kWh and the EV does 60 km per kWh."],
    ["Maintenance", "Maintenance per year: petrol ₹5,000, EV ₹2,000."],
    ["Resale after 5 years", "Scrap value after 5 years: petrol ₹8,000, EV ₹20,000."],
    ["Battery", "The battery is 40% of the EV's cost."],
    ["If the candidate gives an undiscounted total", "You didn't discount future savings.", "probe"],
    ["After the discounted figure", "Any cash flows you might have missed?", "probe"],
    ["After the battery point", "What about the risk of battery failure? What would you recommend?", "probe"],
    ["Before closing", "Explore the other side briefly: what specific considerations might actually make you suggest a petrol bike?", "probe"],
  ]),
  acceptedAssumptions: [
    "A discount rate of about 8%",
    "A partial battery replacement of about ₹30,000",
    "Electricity rising to ₹12–14 per kWh as a sensitivity",
  ],
  outOfScope: ["Subsidies", "Warranty terms", "Battery degradation curves", "Insurance", "Loan rates", "Specific models"],
  crux: {
    statement: "The EV wins on paper, but the whole margin is about the size of one battery. So the decision hinges on battery warranty and life, plus sensitivity to distance ridden, the electricity tariff, the petrol price and access to charging.",
    clue: "\"Any cash flows you might have missed?\"",
  },
  paths: [
    "Five-year total cost of ownership: upfront premium, running-cost saving, resale, then risks",
    "A payback-period framing that reaches the same risks",
  ],
  wrongTurns: wrong([
    "Comparing sticker prices only",
    "Ignoring resale",
    "No discounting",
    "Missing the battery",
  ]),
  quant: {
    kind: "chain",
    working: "Petrol: 6,000 ÷ 50 = 120 litres × ₹100 = ₹12,000 + ₹5,000 = ₹17,000 a year. EV: 6,000 ÷ 60 = 100 kWh × ₹8 = ₹800 + ₹2,000 = ₹2,800 a year. Saving ₹14,200 a year, ₹71,000 over 5 years. Resale advantage ₹20,000 − ₹8,000 = ₹12,000. Less the ₹1,20,000 − ₹80,000 = ₹40,000 premium: +₹43,000 for the EV. Discounted at 8%: annuity factor 3.993 gives ₹56,700; resale gap at present value about ₹8,200; net about +₹24,900 (the source rounds to ₹24,700). Battery = 40% × ₹1,20,000 = ₹48,000, so one full replacement turns +₹43,000 into about −₹5,000.",
    answer: "+₹43,000 undiscounted; about +₹24,900 at 8%; a ₹48,000 battery replacement removes the advantage",
    inputs: ["₹1,20,000", "₹80,000", "6,000 km", "₹100", "50 km", "₹8", "60 km", "₹5,000", "₹2,000", "₹8,000", "₹20,000", "40%", "5 years"],
  },
  answerKey: [
    "A conditional recommendation: buy the EV if the battery warranty covers 5 years or replacement is cheap; otherwise the petrol bike",
    "What would flip it: lower distance ridden, a higher electricity tariff, a lower petrol price, poor charging access",
    "Non-financial factors: range anxiety, charging time, resale-market maturity",
    "The book's feedback: discounting without the interviewer's nudge would have given a better impression",
  ],
  close: {
    condition: "The candidate has a total cost of ownership and has addressed the battery.",
    prompt: "So, should he buy it? Give me your recommendation.",
  },
  anchors: {
    s5: "Compares sticker prices only.",
    s7: "A correct 5-year total cost of ownership.",
    s9: "Discounts unprompted, finds the battery risk, gives a conditional recommendation (buy if the warranty is 5 years or more), and states the conditions for petrol.",
  },
  verifierFlags: flags([
    ["60 km per kWh is optimistic for real two-wheelers (roughly 25–40).", "Kept as written: it is the interviewer's figure in the book. At 30 km per kWh charging is ₹1,600 a year and the conclusion does not change."],
  ]),
});
