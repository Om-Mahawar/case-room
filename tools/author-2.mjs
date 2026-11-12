import { SPJ, facts, wrong, flags, save } from "./_common.mjs";

// 3.1 ------------------------------------------------------------------------------------
save({
  id: "spjimr-cough-syrup",
  title: "New Cough Syrup (BronchSure)",
  type: "pricing",
  source: { book: SPJ, pages: "148-150", firm: "Citibank" },
  confidence: "medium",
  runMode: "full",
  prompt: "Your client is a pharmaceutical company that has recently launched a new cough syrup called BronchSure, and they want your help in determining the appropriate pricing.",
  facts: facts([
    ["Company and geography", "A mid-sized Indian pharmaceutical company operating pan-India. Strong networks in Maharashtra, Gujarat, Delhi NCR and Karnataka; weaker in the East and South."],
    ["Launch plan", "A metro-first launch across chemists, modern trade and e-commerce."],
    ["Over the counter or prescription", "Over the counter in most states; in a few states it is behind the counter, dispensed by the pharmacist."],
    ["Competition and substitutes", "Four branded over-the-counter syrups dominate, with multiple private-label generics, Ayurvedic syrups and home remedies. Hospitals and bulk buyers purchase multi-pack tendered generics from distributors."],
    ["Competitor price, only if the candidate proposes a figure near it", "Yes, ₹100–120 per 100 ml is a fair estimate."],
    ["Pricing objective", "Capture meaningful market share within 18 months while ensuring sustainable margins. Secondary: sign hospital and school tenders in metros and build over-the-counter brand presence in urban pharmacies. Profitability matters but is secondary in the initial year."],
    ["What is different about the product", "Moderate but meaningful differentiation: a mixed formulation (an antitussive plus a mucolytic), lower sedation, a paediatric sugar-free variant, good shelf stability and no cold chain."],
    ["Regulation", "There are regulatory constraints; extremely high pricing is not practical."],
    ["Costs and volume", "Variable cost is about ₹30 per 100 ml bottle. Fixed cost is about ₹8 crore of marketing in the first year, of which ₹6 crore is for BronchSure. The forecast is 5 lakh bottles in year 1, subject to seasonal fluctuation."],
    ["Can volume go higher", "Yes. If early traction is strong, they can produce and distribute up to 10 lakh bottles in year 1."],
  ]),
  acceptedAssumptions: [
    "A 30–35% manufacturer margin on price",
    "Strong brands at ₹150–180; private-label generics below ₹90",
  ],
  outOfScope: ["Competitors' names", "Exact competitor prices beyond the confirmed band", "The regulatory price cap", "Channel margin percentages", "Demand elasticity"],
  crux: {
    statement: "At the base forecast, cost per bottle (₹150) sits above the mid-range market (₹100–120). The price only works if volume scales, so the share objective and the scale-up are the same lever. Value-based pricing is weak here because over-the-counter buyers cannot verify the clinical edge.",
    clue: "The share objective, then the question \"is the company open to scaling?\"",
  },
  paths: [
    "Cost-based with a competitor check (the source's route)",
    "Competitor-based first, with cost as the floor",
  ],
  wrongTurns: wrong([
    "Pure value pricing",
    "Cost-plus at ₹150 without noticing it is above the market",
    "Ignoring the tender segment",
  ]),
  quant: {
    kind: "single",
    working: "Base case: ₹6 crore ÷ 5 lakh bottles = ₹120 fixed + ₹30 variable = ₹150 a bottle. At 10 lakh bottles: ₹60 + ₹30 = ₹90. With a 30–35% margin on price: 90 ÷ 0.70 ≈ ₹128.6 and 90 ÷ 0.65 ≈ ₹138.5, so about ₹130.",
    answer: "₹150 a bottle at 5 lakh; ₹90 at 10 lakh; a launch price of about ₹130",
    inputs: ["₹30", "₹6 crore", "5 lakh", "10 lakh", "30–35%"],
  },
  answerKey: [
    "A launch price of about ₹130 per 100 ml: above the mid-range, below premium",
    "The price depends on reaching the 10 lakh volume; say what happens if it does not",
    "A review after 12–18 months",
  ],
  close: {
    condition: "The candidate has both per-unit costs and a price with a competitor check.",
    prompt: "What price do you recommend, and why?",
  },
  anchors: {
    s5: "Picks a method without data; arithmetic slips.",
    s7: "Works out both per-unit costs and lands a defensible price with a competitor check.",
    s9: "Sees that the base-case cost is above the market, ties the scale-up to the share goal, and raises channel margins and the tender segment.",
  },
  verifierFlags: flags([
    ["\"Mid-sized\" and \"one of the top 5\" appear in the same answer.", "Use \"mid-sized\"; the summary page says the same. \"Top 5\" is dropped."],
    ["The ₹150–180 strong-brand and below-₹90 generic bands come from the candidate, not the interviewer.", "Kept as accepted assumptions. The interviewer confirms only the ₹100–120 mid-range band."],
    ["The source treats manufacturer price as the retail price, though distributor and retailer margins would sit on top.", "Keep the book's logic: ₹130 is the retail price. Raising channel margins is credited at the top anchor."],
    ["The summary page carries an EV-pricing prompt, \"Battery longevity\" and the misspelling \"BranchSure\".", "Ignored. The skeleton is built from the transcript."],
  ]),
});

// 3.2 ------------------------------------------------------------------------------------
save({
  id: "spjimr-vistara-business",
  title: "Business-class fare on a domestic route (Vistara)",
  type: "pricing",
  source: { book: SPJ, pages: "153-154", note: "The book names Vistara, Air India and Jet. Reset here as an unnamed premium airline because Jet stopped flying in 2019 and Vistara merged into Air India in November 2024." },
  confidence: "low",
  runMode: "drill",
  prompt: "How should a premium full-service airline price its business-class ticket on a domestic route? Start wherever you think is appropriate.",
  facts: facts([
    ["Customer segment", "Mostly business travellers."],
    ["When the candidate first asks about the customer segment", "Why do you need to know that?", "probe"],
    ["Positioning", "A premium full-service airline: newer aircraft, more consistent business-class cabins, and higher service quality than most competitors on this route."],
    ["Competitors offering business class", "It depends on the flight timing: one full-service rival on some slots, another on others. Does that matter?"],
    ["Route", "Mumbai–Delhi."],
    ["Benchmark fare", "Economy is ₹10,000."],
    ["Seat configuration", "128 economy seats and 24 business seats."],
    ["When the candidate lists cost, value and competition as approaches", "Do all three apply here?", "probe"],
    ["After the candidate gives fares by time of day", "Is the time of day the only factor you would consider to determine demand?", "probe"],
  ]),
  acceptedAssumptions: [
    "Business class gives 2–3 productive hours, worth ₹3,000–5,000 to someone earning ₹20–30 lakh a year",
    "Competitor business fares of ₹20,000–25,000",
  ],
  outOfScope: ["Airline costs", "Load factors", "Actual competitor fares", "Booking-curve data", "Anything about real airlines beyond the facts given"],
  crux: {
    statement: "Cost cannot guide the price. Triangulate value and competition, and vary the fare by time slot and season, because competitive intensity depends on who flies that slot.",
    clue: "\"It depends on the flight timing.\" That signals slot-based pricing.",
  },
  paths: [
    "Rule out cost → value to a business traveller → competitive band → fare by slot and season",
  ],
  wrongTurns: wrong([
    "Cost-plus pricing",
    "One fare for every flight",
    "Ignoring the competitive band",
  ]),
  quant: {
    kind: "single",
    optional: true,
    working: "Rough check on the candidate's own inputs: ₹25 lakh a year over about 2,000 working hours ≈ ₹1,250 an hour; × 2.5 hours ≈ ₹3,100, the low end of the ₹3,000–5,000 range. Added to the ₹10,000 economy fare this supports about ₹13,000–15,000 on time value alone, so the competitive band, not time value, sets the fare.",
    answer: "Time value is roughly ₹3,100 a flight, or about ₹13,000–15,000 with the economy fare",
    inputs: ["₹10,000", "₹20–30 lakh", "2–3 productive hours"],
  },
  answerKey: [
    "A range, not one number, set inside the competitive band with a modest premium",
    "Higher fares on morning and evening peak slots than at mid-day, with the reason",
    "A seasonal lift at festivals, long weekends and year-end",
  ],
  close: {
    condition: "The candidate has ruled out cost and proposed a fare or range.",
    prompt: "So what fares would you set, and how would they vary?",
  },
  anchors: {
    s5: "One number, no method.",
    s7: "Rules out cost, uses value and competition, gives a range.",
    s9: "Prices by slot and season, explains why, and checks the value logic against the economy fare.",
  },
  verifierFlags: flags([
    ["Dated: Jet Airways stopped flying in 2019 and Vistara merged into Air India in November 2024.", "Reset as an unnamed premium full-service airline with two unnamed full-service rivals. The book's names stay in the source note only."],
    ["The book's ₹30,000 \"value ceiling\" does not follow from the inputs given.", "Dropped from the expected logic. No answer is graded against ₹30,000, and the book's ₹22,000–28,000 fares are not treated as the right answer."],
    ["Competitor fares of ₹20,000–25,000 are the candidate's assumption, listed as a fact on the summary page.", "Kept as an accepted assumption. The interviewer does not supply competitor fares."],
    ["The book's last probe asks whether \"day of the week\" is the only factor, though the candidate had priced by time of day.", "Reworded to \"time of day\" so the probe follows from the candidate's answer."],
  ]),
});

// 4.1 ------------------------------------------------------------------------------------
save({
  id: "spjimr-fire-extinguisher",
  title: "Fire Extinguisher Can Manufacturer",
  type: "growth",
  source: { book: SPJ, pages: "115-117", firm: "BCG" },
  confidence: "high",
  runMode: "full",
  prompt: "Your client is the CEO of a fire-extinguisher can manufacturing company. They want to grow only in India and are seeking your advice.",
  facts: facts([
    ["History and markets", "They have operated only in India for the past 20 years. They make the standard red extinguishers with black nozzles."],
    ["Growth target", "The CEO wants to triple the company's revenue, from X to 3X, in just 2 years."],
    ["Market share and competition", "The client holds 50% market share. Two other major competitors have 25% and 15%. The remaining 10% is fragmented among many small players."],
    ["Industry growth", "The industry is growing at around 10% a year."],
    ["Customer segments, once the candidate lists some", "You're missing two significant ones: petrol pumps and factories dealing with highly combustible materials."],
    ["When the candidate starts on a generic organic and inorganic framework", "Skip the generic framework for now. Focus on the numbers given. Do you think the client is missing something?", "probe"],
    ["After the candidate offers growth options", "Is there a way to increase the frequency of customer purchases? Most companies buy extinguishers once and forget about them.", "probe"],
    ["After the frequency discussion", "How can we address the fragmented 10% of the market?", "probe"],
  ]),
  acceptedAssumptions: [],
  outOfScope: ["Revenue in rupees", "Prices", "Margins", "Replacement-cycle data", "Named acquisition targets"],
  crux: {
    statement: "The target exceeds the market's ceiling. Say so plainly to the CEO, then go beyond the core: adjacent fire-safety products, recurring revenue (refills, maintenance contracts, subscriptions for high-risk sites), under-served segments, and a roll-up of the fragmented 10%.",
    clue: "\"Skip the generic framework. Focus on the numbers. Is the client missing something?\"",
    test: "Remove the 10% industry growth or the 50% share and the feasibility test cannot be done.",
  },
  paths: [
    "Test the target against the market first, then options beyond the core",
    "Revenue per customer (price, size, frequency) × customers, reaching the ceiling through the numbers",
  ],
  wrongTurns: wrong([
    "Listing organic and inorganic levers without testing whether 3X is feasible",
    "Assuming more share is enough",
  ]),
  quant: {
    kind: "single",
    working: "In 2 years the market is 1.1 × 1.1 = 1.21 times today's size. 3X revenue at a 50% share = 1.5 times today's market. Even a 100% share gives 1.21, which is less than 1.5, so 3X cannot happen inside extinguishers.",
    answer: "Market ceiling 1.21 against a need of 1.5: the 3X target is not reachable in the core market",
    inputs: ["10%", "50%", "3X", "2 years"],
  },
  answerKey: [
    "Tell the CEO directly that 3X is not achievable in the core market",
    "Expand into adjacent fire-safety products and services",
    "Build recurring revenue from the replacement cycle: maintenance, refills, subscriptions",
    "Acquire or partner with small regional players in the fragmented 10%",
  ],
  close: {
    condition: "The candidate has tested the target against the market and offered options beyond it.",
    prompt: "What are your final recommendations to the client?",
  },
  anchors: {
    s5: "Lists generic growth levers and never tests the target.",
    s7: "Does the 1.21 against 1.5 maths after the nudge, then gives sensible options.",
    s9: "Tests the target unprompted, tells the CEO directly, and leads with recurring revenue from the replacement cycle.",
  },
  verifierFlags: flags([
    ["The summary slide says the primary customers are petrol pumps and factories; the transcript says these were two segments the candidate missed.", "Follow the transcript."],
  ]),
});

// 4.2 ------------------------------------------------------------------------------------
save({
  id: "spjimr-sports-retailer",
  title: "Sports Retailer",
  type: "growth",
  source: { book: SPJ, pages: "126-127", firm: "Deloitte USI", note: "The book labels this \"Sports Manufacturer\"; the client is a retailer." },
  confidence: "medium",
  runMode: "full",
  prompt: "Your client is a sports retailer. They see strong opportunity in the post-COVID world and want growth recommendations. What would you do?",
  facts: facts([
    ["Formats", "Primarily offline physical stores, with limited online."],
    ["Categories", "Footwear and apparel make up most of sales; equipment is small but growing."],
    ["Footprint", "Mostly metros and some Tier 1."],
    ["Price positioning", "Mid-priced."],
    ["Competition", "Information on competition is irrelevant."],
    ["Growth target and appetite", "They want to double revenue in 18–24 months. Organic first; inorganic if it accelerates results."],
    ["Can prices rise", "Any increase in price would lead to customers shifting to competition."],
    ["Order value and repeat purchase", "Order value is quite low: about ₹850 on average, around the price of a dry-fit T-shirt. There aren't many customers coming back."],
    ["After basket and frequency", "Going back to acquiring new customers, how would you do that?", "probe"],
    ["After existing markets", "What about new markets? How would you scale there?", "probe"],
    ["After organic levers", "What other things can the client look at?", "probe"],
  ]),
  acceptedAssumptions: [],
  outOfScope: ["Competitors", "Revenue in rupees", "Store count", "Footfall", "Margins"],
  crux: {
    statement: "Price is locked, so doubling has to come first from basket size (₹850 is low) and frequency (few come back), then from new customers and places. The post-COVID fitness shift is why home fitness and athleisure are the right new categories.",
    clue: "\"Order value is quite low… there aren't many customers coming back.\"",
  },
  paths: [
    "Revenue per customer (price, basket, frequency) × number of customers (existing markets, new markets, new segments), then inorganic options",
  ],
  wrongTurns: wrong([
    "Raising prices",
    "Jumping straight to Tier 2 and 3 expansion",
    "Spending time on competitors",
  ]),
  quant: { kind: "none" },
  answerKey: [
    "Basket: bundles and kits, accessory zones at checkout",
    "Frequency: loyalty, seasonal category refreshes",
    "New customers: local events, gym partnerships, services, new categories, new segments (kids, women, corporates), compact stores in smaller cities",
    "Inorganic, last: a fitness app, a home-fitness maker, academy or school joint ventures",
  ],
  close: {
    condition: "The candidate has identified basket and frequency as the gap and covered customer acquisition.",
    prompt: "What are your final recommendations to the client?",
  },
  anchors: {
    s5: "A long, unprioritised list of ideas.",
    s7: "Structured levers, with basket and frequency identified as the gap.",
    s9: "Prioritises by the facts given, sequences organic before inorganic, and checks whether the levers can plausibly reach 2X.",
  },
  verifierFlags: flags([
    ["No quant moment in the source; an illustration (customers × basket × visits must multiply to 2) was suggested.", "No quant moment. The interviewer does not ask for one; a candidate who checks feasibility unprompted is credited at the top anchor."],
    ["The book labels the case \"Sports Manufacturer\".", "Titled Sports Retailer, as the prompt says."],
  ]),
});
