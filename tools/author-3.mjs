import { SPJ, IIML, facts, wrong, flags, save } from "./_common.mjs";

// 5.1 ------------------------------------------------------------------------------------
save({
  id: "spjimr-gym-nutrition",
  title: "Gym chain buys a nutrition firm",
  type: "m_and_a",
  source: { book: SPJ, pages: "160-161", firm: "Deloitte USI" },
  confidence: "medium",
  runMode: "full",
  prompt: "Your client is a premium chain of gyms operating across India. It is considering acquiring a nutrition-focused food manufacturer and retailer that offers pre-cooked and semi-cooked meals. The client believes there are synergies in this acquisition. Should it go ahead? Why or why not?",
  facts: facts([
    ["Client's geography", "The client operates only in India."],
    ["Client's customers", "The gyms are premium and cater largely to high-income customers."],
    ["Target's geography", "The target operates in India."],
    ["Target's place in the value chain", "It manufactures and retails nutrition-focused food products, mainly pre-cooked and semi-cooked meals."],
    ["Industry growth and competition", "You can assume the industry is growing and there is no immediate competitive threat."],
    ["After the candidate covers cost synergies", "Where do you see the bigger upside: cost or revenue?", "probe"],
    ["After revenue synergies", "Would expansion into new geographies be part of the synergy story?", "probe"],
    ["After financial synergies", "How are these financial synergies different from cost synergies?", "probe"],
    ["After that distinction", "And how does this translate into valuation?", "probe"],
    ["After a go or no-go", "What execution risks could prevent value capture?", "probe"],
  ]),
  acceptedAssumptions: [],
  outOfScope: ["Deal price", "Revenue or EBITDA of either firm", "Member count", "Store or gym count", "Valuation multiples"],
  crux: {
    statement: "The deal rests on revenue synergies from a captive, high-income, health-conscious member base: meal subscriptions upsold to members, gym-plus-nutrition bundles that lift retention and lifetime value, nutrition outlets as an acquisition channel for gyms, and in-gym counters or cafés. Cost synergies (no capex to build kitchens, shared finance, HR and procurement, raw-material bargaining) are secondary.",
    clue: "\"Where do you see the bigger upside: cost or revenue?\"",
    test: "Remove \"premium gyms, high-income customers\" and the cross-sell thesis loses its base. Remove \"no immediate competitive threat\" and the candidate has to defend the market first.",
  },
  paths: [
    "Three layers: operating synergies (cost, then revenue) → financial synergies (cost of capital) → valuation impact → go or no-go",
    "Strategic fit first, reaching the same three layers",
  ],
  wrongTurns: wrong([
    "Anchoring the thesis on new geographies (opening gyms is capital-heavy; the source treats it as secondary)",
    "Treating financial synergies as cost synergies",
    "A synergy list with no ranking",
  ]),
  quant: { kind: "none" },
  answerKey: [
    "Financial synergies leave operations alone: more stable, diversified cash flows lower the cost of debt and, over time, the cost of equity",
    "Valuation: higher, steadier cash flows plus a lower cost of capital raise enterprise value; an integrated wellness platform can support a higher multiple",
    "Go, with conditions",
    "Execution risks: poor in-gym integration, weak cross-selling by staff, wrong pricing or bundling",
    "Mitigations: phased rollout, staff training, pilot bundles, a clear owner for synergy capture",
  ],
  close: {
    condition: "The candidate has ranked the synergies and given a go or no-go.",
    prompt: "Can you summarise your recommendation?",
  },
  anchors: {
    s5: "A generic synergy list with no ranking and no recommendation.",
    s7: "Ranks revenue over cost with reasons and gives a go or no-go.",
    s9: "Ties every synergy to the captive member base, separates the operating, financial and valuation layers, and gives conditions and risks with the recommendation.",
  },
  verifierFlags: flags([
    ["No numbers in the source: add a member count and attach rate to size the revenue synergy?", "No. Nothing is added without a source; the case stays qualitative and the quantitative dimension is not assessed."],
    ["The interviewer reveals very little; most of the content is the candidate's thesis.", "Kept as a full case driven by the five probes. Confidence stays medium."],
  ]),
});

// 5.2 ------------------------------------------------------------------------------------
save({
  id: "iiml-paytm-tech-dd",
  title: "Paytm technical due diligence",
  type: "m_and_a",
  source: { book: IIML, pages: "137-138", firm: "EY-Parthenon", note: "Real interview write-up; the case was built on the candidate's 45 months at Paytm. Best for users with a tech or fintech background." },
  confidence: "low",
  runMode: "drill",
  prompt: "Suppose a company wants to acquire Paytm. Perform technical due diligence for the same.",
  facts: facts([
    ["Anything about the acquirer, the deal or Paytm", "Nothing beyond the prompt. Sounds good, go ahead."],
    ["After the candidate lists the heads", "How would you prioritise these findings?", "probe"],
    ["After the priorities", "Any final thoughts?", "probe"],
  ]),
  acceptedAssumptions: [],
  outOfScope: [
    "Any number",
    "The acquirer's identity and goals",
    "Any real-world claim about Paytm's systems, regulators, licences or history",
  ],
  crux: {
    statement: "Structure and prioritisation for a fintech target, in business language. The round tests whether the candidate can turn a technical topic into a prioritised, decision-ready list for an acquirer.",
    clue: "\"How would you prioritise these findings?\"",
  },
  paths: [
    "Any mutually exclusive set of heads (systems, processes, integration, security, intellectual property, compliance) followed by a priority order tied to the acquirer's goal",
  ],
  wrongTurns: wrong([
    "Going deep into technical detail",
    "Listing heads with no priority",
    "Inventing facts about Paytm",
  ]),
  quant: { kind: "none" },
  answerKey: [
    "IT systems: scalability, reliability and security of the payments, wallet, UPI and financial-product backends; cloud and disaster recovery",
    "Processes: integration with banks, merchants and gateways; compliance for financial data; redundant workflows",
    "Integration capabilities: interfaces, fit with the acquirer's ecosystem, data-migration feasibility",
    "Cybersecurity: penetration tests, incident response, encryption, breach history",
    "Innovation and research: for example fraud detection, patents",
    "Compliance and regulation: data protection, wallet and financial-services norms, pending technology-related legal issues",
    "The source's priority order: IT systems and integration first, then cybersecurity and compliance, then innovation and scalability",
  ],
  close: {
    condition: "The candidate has listed heads and a priority order.",
    prompt: "Summarise your priorities and name the one finding that would stop the deal.",
  },
  anchors: {
    s5: "A list of jargon with no priorities.",
    s7: "Mutually exclusive heads plus a priority order.",
    s9: "Priorities tied to the acquirer's goal (integration and risk), plain business language, and a split between deal-breakers and fixable issues.",
  },
  verifierFlags: flags([
    ["The case was built on the candidate's own work experience.", "Offered to everyone as a drill, with a note that it suits a tech or fintech background. Swapping in another company is not built for the pilot."],
    ["It names a real company.", "Kept, with a strict out-of-scope rule: the interviewer adds no real-world fact about Paytm."],
    ["The same interview began with a flights-over-Lucknow guesstimate.", "Not built for the pilot."],
  ]),
});

// 6.1 ------------------------------------------------------------------------------------
save({
  id: "iiml-paracetamol",
  title: "Paracetamol tablets in India",
  type: "guesstimate",
  source: { book: IIML, pages: "136-137", firm: "EY-Parthenon", note: "Real interview write-up" },
  confidence: "medium",
  runMode: "full",
  prompt: "Estimate the number of paracetamol tablets consumed in India in a year, then the market size.",
  facts: facts([
    ["Retail only, or hospital use as well", "Consider both retail and hospital use."],
    ["Population as the baseline with average consumption per person", "Yes, that's a good approach."],
    ["After the candidate reaches a tablet count", "How would you calculate the market size?", "probe"],
    ["After the market size", "Would you validate these numbers?", "probe"],
    ["After the check", "So, what's your final estimate?", "probe"],
  ]),
  acceptedAssumptions: [
    "India's population is about 1.4 billion",
    "60% of the population takes paracetamol in a year",
    "10 tablets per user per year",
    "₹1 per tablet",
  ],
  outOfScope: ["Real sales data", "Brand shares", "Hospital consumption figures", "Pack prices", "Prevalence statistics"],
  crux: {
    statement: "The segmentation decides the grade. The source uses one average; a stronger answer splits by need (fever, pain, post-operative) or by age band, and treats the hospital channel separately, since the interviewer asked for it to be included.",
    clue: "\"Consider both retail and hospital use.\"",
  },
  paths: [
    "Demand side: population → users → episodes → tablets per episode, split by retail and hospital",
    "A supply-side cross-check as a bonus, not the main route",
  ],
  wrongTurns: wrong([
    "Starting from the supply side with no data",
    "Dropping the hospital channel",
    "Agonising over the exact population",
  ]),
  quant: {
    kind: "chain",
    working: "The source's chain: 60% of 1.4 billion = 840 million users × 10 tablets = 8.4 billion tablets a year. At ₹1 a tablet that is ₹8.4 billion, about ₹840 crore. Sanity check, derived: 8.4 billion ÷ 1.4 billion = 6 tablets per person per year.",
    answer: "One reasonable result: 8.4 billion tablets and about ₹840 crore. Grade the approach, never the distance from this figure.",
    inputs: ["1.4 billion", "60%", "10 tablets", "₹1"],
  },
  answerKey: [
    "A tablet estimate, a market size and one real sanity check",
    "The sensitivity of the answer to its biggest assumption",
  ],
  close: {
    condition: "The candidate has a tablet count and a market size.",
    prompt: "So, what's your final estimate?",
  },
  anchors: {
    s5: "One-line multiplication, no segments, no sanity check.",
    s7: "A clear chain that covers both retail and hospital use, with a sanity check attempted.",
    s9: "Segmented by need or age, hospital use separated, a sanity check by triangulation, and the sensitivity to the biggest assumption stated.",
  },
  verifierFlags: flags([
    ["The same page holds a second guesstimate (government MBA admissions, approach only).", "Not built for the pilot."],
  ]),
});

// 6.2 ------------------------------------------------------------------------------------
save({
  id: "spjimr-water-bottles",
  title: "Water bottles in a 5-star hotel",
  type: "guesstimate",
  source: { book: SPJ, pages: "27-28", firm: "General Electric" },
  confidence: "high",
  runMode: "full",
  prompt: "Please estimate the number of water bottles used in a 5-star hotel in a day.",
  facts: facts([
    ["Hotel size, before the candidate has named a proxy", "How do you generally estimate the size of a hotel?", "probe"],
    ["Hotel size, once the candidate proposes rooms as the proxy", "Yes. Assume the hotel has 100 rooms."],
    ["Occupancy, when first raised", "Do you think occupancy would be constant throughout the year? What factors influence seasonality?", "probe"],
    ["Occupancy, after the candidate has discussed seasonality", "Assume an average occupancy of 70% over the year."],
    ["Guests per occupied room, if the candidate proposes 2", "That sounds reasonable."],
    ["Bottles per guest per day, if the candidate proposes a figure", "Alright, go ahead with that."],
    ["Restaurant footfall", "Assume the hotel has 2 restaurants. Estimate the rest."],
    ["Conferences", "Yes. Assume the hotel has conference facilities."],
  ]),
  acceptedAssumptions: [
    "2 guests per occupied room; 2 bottles per guest per day",
    "25 tables per restaurant, 2 turns a day, 2 guests per table, 1 bottle per cover",
    "3 conference rooms, 2 in use a day, 40 attendees per event, 1 bottle each",
    "1.5 staff per room, so 150 staff; 1 bottle per staff member per shift",
  ],
  outOfScope: ["Real hotel data", "Staff counts", "Minibar policy", "Event calendars"],
  crux: {
    statement: "Demand-centre segmentation decides the grade: direct (rooms), indirect (restaurants and events) and internal (staff), with rooms as the size proxy and awareness that occupancy moves with the season.",
    clue: "\"How do you generally estimate the size of a hotel?\"",
  },
  paths: [
    "Bottom-up by demand centre: rooms, restaurants, conferences, staff",
    "Any structure that covers guests, food and beverage, events and staff",
  ],
  wrongTurns: wrong([
    "A population-down approach",
    "Forgetting staff or events",
    "Ignoring occupancy",
  ]),
  quant: {
    kind: "chain",
    working: "The source's chain: rooms 100 × 70% × 2 × 2 = 280. Restaurants 2 × 25 × 2 × 2 = 200. Conferences 2 × 40 = 80. Staff 150 × 1 = 150. Total 710 bottles a day. Sanity check, derived: 710 ÷ 100 rooms is about 7 bottles per room, or about 10 per occupied room.",
    answer: "One reasonable result: 710 bottles a day. Grade the approach, never the distance from this figure.",
    inputs: ["100 rooms", "70%", "2 restaurants"],
  },
  answerKey: [
    "A total with its four buckets",
    "The biggest assumption named",
    "How the figure moves in peak and lean seasons",
  ],
  close: {
    condition: "The candidate has totalled at least three demand buckets.",
    prompt: "What's your final estimate, and which assumption matters most?",
  },
  anchors: {
    s5: "Rooms only.",
    s7: "All four buckets with clean maths.",
    s9: "All buckets plus occupancy and seasonality reasoning, a sanity check, and a note on the biggest assumption.",
  },
  verifierFlags: flags([
    ["The summary slide lists the candidate's 1.5 staff per room as a case fact.", "Only 100 rooms, 70% occupancy, 2 restaurants and the conference facilities are interviewer facts. Everything else is an accepted assumption."],
    ["\"1 bottle per shift\" × 150 staff assumes 150 is total staff across all shifts.", "Accepted as it stands. A top answer says so."],
  ]),
});
