import { BUSINESS, type Route, type City } from './data';

// ═══════════════════════════════════════════════════════════════
// ROUTE CONTENT GENERATION ENGINE
// Generates unique, keyword-rich content for every route page
// ═══════════════════════════════════════════════════════════════

interface RouteContentInput {
  route: Route;
  fromCity?: City;
  toCity?: City;
  fromStateName?: string;
  toStateName?: string;
  fromAlternateNames?: string[];
  toAlternateNames?: string[];
}

// ─── Distance-based travel tips — 5 pools, unique NK voice ───
function getTravelTips(distance: number, fromName: string, toName: string, via: string[]): string[] {
  const tips: string[] = [];
  const hash = (fromName + toName).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const v = hash % 5;

  if (distance < 100) {
    const shortTips = [
      [`Under 100 km — this is a quick, comfortable run. NK Cab & Taxi drivers cover the ${fromName}–${toName} stretch routinely; it's one of those trips where you blink and you're there.`, `Pack light. A small bag handles everything you need for a same-day trip like this.`, `A weekday morning departure avoids the school-run and market traffic on the fringes of both cities.`],
      [`${fromName} to ${toName} by road: roughly under 2 hours in normal traffic. Leave at 7 AM and you'll be there by 9, with the whole morning free.`, `Our sedans and SUVs handle this distance without a sweat — AC, clean cabin, and a driver who's done this stretch dozens of times.`, `If you need to be back the same day, ask us about a round-trip arrangement — same driver waits or we send one from ${toName}.`],
      [`Short enough to handle as a day trip, long enough to need a decent car and driver rather than an auto. NK Cab fills that gap well on this route.`, `Weekday afternoons can clog the final approach into ${toName} — leave by 2 PM or after 8 PM to avoid the worst of it.`, `Great for a hospital appointment, a court date, a family visit, or a business meeting you need to be fresh for.`],
      [`${fromName} to ${toName} is the kind of quick intercity trip that makes fixed-rate cabs look very good value. No surge, no meter anxiety — just a flat quote and you're off.`, `Traffic at the departure end (from ${fromName}) is usually the main variable. Leave before 8 AM on weekdays or after 7 PM to sail through.`, `Same-day return trips are popular on this route. Let us know upfront and we'll keep the driver on standby.`],
      [`At this distance you could technically do it on trains or buses — but a private cab from NK means door-to-door, no connection waiting, no luggage hassle.`, `Weather rarely causes major delays on sub-100 km runs, but monsoon afternoons can add 15–20 minutes. We'll mention it if it's relevant when you book.`, `Popular for medical trips, wedding venue visits, and short leisure drives — our most repeat-booked distance band.`],
    ];
    tips.push(...shortTips[v]);
  } else if (distance < 250) {
    const medTips = [
      [`A 100–250 km drive is NK Cab & Taxi's bread and butter. This is the distance where a private cab makes the most sense — no layovers, no fixed schedules, no luggage allowance fights.`, `Leaving ${fromName} before 7 AM puts you past city limits and onto open highway before the heat and traffic build up.`, `There are decent food stops on this route — our drivers know which dhabas are clean and which highway restaurants have reliable kitchens. Just ask.`],
      [`${fromName} to ${toName} at ${distance} km is a half-day drive if you start early. A 6 AM departure typically means arrival before lunch.`, `July–September monsoon can add 30–45 minutes depending on road conditions. Worth factoring in if you have a train or flight at ${toName}.`, `Water, phone charger, and any prescription medication are the only essentials. Our cars have comfortable seating for the whole stretch.`],
      [`A solid morning trip. Leave ${fromName} around 6:30–7 AM, take a 20-minute chai break midway, and arrive at ${toName} refreshed.`, `Our outstation drivers on this corridor know the quickest lanes through the towns en route — shaves 10–15 minutes over following the plain GPS.`, `For families with children or elderly passengers, let us know and we'll schedule the rest stop at a cleaner facility.`],
      [`${distance} km on Indian highways is about 3.5–5 hours depending on traffic. NK Cab's drivers plan their departure timings with this in mind — they'll tell you the best slot when you call.`, `Round-trip fares on this stretch are particularly economical — worth comparing with two one-way bookings before you decide.`, `Our FASTag-equipped vehicles mean no fumbling for cash at toll booths. Toll amounts are disclosed before the trip starts.`],
      [`This distance is comfortable in an AC sedan with a 10-minute break. In an SUV or Innova, you won't even notice the kilometres.`, `Weekends can see heavier tourist traffic into ${toName} depending on the destination. Our drivers know the alternate approach roads.`, `If you're headed back the same day, morning departure from ${fromName} and afternoon return works perfectly for most errands or visits.`],
    ];
    tips.push(...medTips[v]);
  } else if (distance < 500) {
    const longTips = [
      [`${distance} km is a genuine highway journey. NK Cab recommends a 5–6 AM start from ${fromName} — past city limits before peak traffic, onto the highway well before the sun gets uncomfortable.`, `We'll build in one good stop at around the halfway point — washroom, chai, stretch — without you having to ask. Our outstation drivers do this automatically.`, `If you're staying at ${toName} for a few days and need local cab support there, let us know and we'll connect you with options.`, `FASTag is standard on all NK Cab vehicles. Toll charges for this route will be shared when you confirm the booking.`],
      [`Leave ${fromName} by 5:30 AM at the latest for a ${distance} km trip. This puts you at ${toName} by early afternoon with daylight to spare.`, `Our highway fleet for this distance: Innova Crysta (best for long-haul comfort), Ertiga SUV (good legroom for families), Sedan Dzire (economical for individuals).`, `Round-trip fares include driver accommodation and night allowance — all transparently quoted before you confirm.`, `Monsoon travel on longer routes needs 45–60 minutes buffer. NK Cab will flag if your travel dates see historically heavy rainfall.`],
      [`At ${distance} km, you want a driver who's done this route multiple times, not someone following GPS blindly. NK Cab assigns route-familiar drivers to long-haul bookings.`, `Single rest stop at the midway point — 15–20 minutes is all it takes for refreshments and a stretch. Driver knows the cleanest facilities on this corridor.`, `Overnight stays? NK Cab drivers carry their own accommodation for multi-day trips — driver allowance ₹300/night, included in round-trip quotes.`, `Share your live location with family before you depart. All NK Cab vehicles are GPS-tracked; driver details are on WhatsApp before pickup.`],
      [`A pre-dawn start pays dividends on a ${distance} km trip. 5 AM from ${fromName} means you hit the best road conditions — cool air, low traffic, fresh driver.`, `Dhabas on this corridor: there are reliable options at the halfway mark where drivers regularly stop. Clean, established — not roadside stalls.`, `Toll charges on long routes add up — we quote them upfront so your total cost is known before you commit. No surprises at the plaza.`, `For solo travelers, the Sedan is most economical. For families of 4–6, the SUV or Innova gives breathing room without a significant price jump.`],
      [`${distance} km takes most cars 5–7 hours. NK Cab targets the earlier end of that range through route familiarity and good timing choices.`, `The best departure window from ${fromName}: 4:30–6 AM. Miss that window and mid-morning traffic can add an hour.`, `Food planning tip: a light breakfast before departure works better than a heavy one — easier on the stomach through longer highway stretches.`, `If your schedule at ${toName} is time-sensitive, let us know and we'll pad the departure to ensure you arrive with buffer.`],
    ];
    tips.push(...longTips[v]);
  } else {
    const veryLongTips = [
      [`${distance} km is a serious undertaking by road. NK Cab handles these routes with dedicated long-haul drivers — people who do 500+ km trips routinely, not occasionally.`, `4:30 AM start from ${fromName} is the NK recommendation for this distance. It's the one departure time that lets you arrive comfortably before nightfall.`, `Two scheduled stops: one at roughly 200 km for a proper food break, another at 350–400 km for fuel and a stretch. Driver manages this — you don't need to plan it.`, `Toll amounts on 500+ km routes are substantial. We quote them before you confirm so your budget is accurate.`],
      [`Very long routes need the right vehicle and the right driver. NK Cab assigns only our most experienced highway drivers to 500+ km bookings — people who know how to pace a long drive.`, `Start by 4–5 AM from ${fromName}. It's the difference between arriving at ${toName} at a reasonable hour or in the dark.`, `Carry essentials: water, snacks for the car, phone charger, and medication. Highway dhabas are available but spacing varies on this specific corridor.`, `Driver accommodation is included in round-trip fares. Night allowance ₹300 — stated clearly in your quote.`],
      [`At ${distance} km, this is one of our longer routes. The right car makes a difference — Innova Crysta is our most recommended for routes above 500 km, for its comfort over extended driving.`, `Pre-dawn departure: non-negotiable for this distance. 4:30–5 AM from ${fromName} puts you at ${toName} well before dusk.`, `Our drivers know the fuel stations on this corridor that have clean washrooms and reliable food — not just any highway stop.`, `Share your GPS location with someone before departure. Standard practice on very long routes, even if everything goes smoothly.`],
      [`${distance} km by road in India is a commitment. NK Cab drivers who do this route know it — the lane changes, the slower stretches, the towns where you lose 20 minutes if you're not careful.`, `Three stops typically work for this distance: 1.5 hrs in (stretch), halfway (food), and 4 hrs in (washroom + fuel). Our driver builds this in.`, `Consider overnight at a midway city if the destination trip is relaxed. Same driver continues the next morning — no rebooking, no hassle.`, `FASTag saves significant time on a 500+ km route — there can be 5–8 toll plazas. All NK Cab vehicles carry FASTag as standard.`],
      [`A ${distance} km journey is best treated as a deliberate trip, not an afterthought. Book the day before — this allows NK Cab to assign the best available highway driver for your corridor.`, `We recommend departing ${fromName} no later than 5 AM. Every hour you delay in the morning adds roughly 90 minutes to the journey by dusk.`, `Hydration and short-stop planning matter more on routes this long than any route under 300 km. Our drivers are trained to flag when a stop is needed.`, `For corporate travel on very long routes, NK Cab can arrange multi-leg journeys with different drivers at waypoints — ask when you call.`],
    ];
    tips.push(...veryLongTips[v]);
  }

  if (via.length > 0) {
    const viaOptions = [
      `The route passes through ${via.join(', ')} — useful places to stop for refreshments or a meal break.`,
      `Passing through ${via.join(', ')} en route. These towns have decent roadside food and fuel options.`,
      `Your journey takes you through ${via.join(', ')} — good landmarks for rest stops, and interesting towns in their own right.`,
    ];
    tips.push(viaOptions[hash % 3]);
  }

  return tips;
}

// ─── Road condition description — 3-pool variation ───
function getRoadDescription(distance: number, via: string[], fromName: string, toName: string): string {
  const highway = via.find(v => v.startsWith('NH')) || '';
  const hasHighway = highway.length > 0;
  const hash = (fromName + toName).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const v = hash % 3;

  if (distance < 50) {
    const urban = [
      `The ${fromName} to ${toName} drive is mostly city road. Morning peak (8–10 AM) and evening peak (5–8 PM) can slow things down. Our local drivers know the shortcuts.`,
      `Primarily urban roads from ${fromName} to ${toName}. Traffic is manageable outside peak hours. Our ${fromName} drivers know which routes to avoid during rush hour.`,
      `City roads the whole way from ${fromName} to ${toName}. Expect traffic during office hours. Driver will route around the known bottlenecks.`,
    ];
    return urban[v];
  }

  if (hasHighway) {
    const nhDesc = [
      `The ${fromName}–${toName} route runs mainly on ${highway}, a well-maintained national highway that's comfortable for our AC fleet. The highway is mostly 4-lane with good road surfaces.${via.length > 1 ? ` Passing through ${via.filter(v => !v.startsWith('NH')).join(', ')} along the way — good spots for a break.` : ''} Our drivers know this stretch well.`,
      `${highway} is the main corridor for the ${fromName} to ${toName} drive — generally in good condition with clear lane markings and regular toll plazas.${via.length > 1 ? ` The route cuts through ${via.filter(v => !v.startsWith('NH')).join(', ')}, where you can stop for food and fuel.` : ''} Travel time is consistent outside festival peak periods.`,
      `This route follows ${highway} for the majority of the journey from ${fromName} to ${toName}. National highway driving is considerably smoother than state roads, and our drivers are experienced on this specific corridor — they know the toll-free bypasses and best rest stops.${via.length > 1 ? ` Notable towns en route: ${via.filter(v => !v.startsWith('NH')).join(', ')}.` : ''}`,
    ];
    return nhDesc[v];
  }

  if (distance < 200) {
    const medRoad = [
      `The ${fromName} to ${toName} route mixes state and national highway sections. Road quality is generally good, with some construction patches that our drivers know to navigate around efficiently.`,
      `A mix of state and national highway roads for the ${fromName}–${toName} drive. Most sections are in good shape; a few stretches see ongoing road work. Our drivers have current route knowledge.`,
      `Road quality on the ${fromName} to ${toName} route is suitable for all vehicle types. State highway sections are generally smooth; we avoid known problem stretches through local driver knowledge.`,
    ];
    return medRoad[v];
  }

  const longRoad = [
    `The ${distance} km ${fromName}–${toName} corridor passes through a mix of national and state highways. Well-maintained on the NH sections; state roads vary by district. Our highway drivers are experienced on this route and maintain safety and pace appropriately.`,
    `Covering ${distance} km, this route combines national highway efficiency with state road character. Our drivers have driven this corridor many times — they know the road quality variations, the reliable fuel stops, and the sections that need careful driving.`,
    `The ${fromName} to ${toName} route at ${distance} km is a substantial highway journey. Most of it follows established NH corridors; a few state road sections add character to the drive. Driver experience on this specific route makes a difference — all our outstation drivers are assigned based on route familiarity.`,
  ];
  return longRoad[v];
}

// ─── Booking steps — 5 natural NK-voice variations ───
function getBookingSteps(fromName: string, toName: string): { step: number; title: string; description: string }[] {
  const rawHash = (fromName + toName).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const v = rawHash % 5;

  const step1 = [
    { step: 1, title: 'One Call to Start', description: `Ring ${BUSINESS.phone} — no app, no login, no queue. Tell us ${fromName} to ${toName} and we handle the rest.` },
    { step: 1, title: 'WhatsApp or Call', description: `Message or call ${BUSINESS.phone}. A real person picks up — no IVR, no bot. Just say ${fromName} to ${toName} and go from there.` },
    { step: 1, title: 'Reach Us Directly', description: `${BUSINESS.phone} — call or WhatsApp. We're on both 24/7. Start with your route: ${fromName} → ${toName}.` },
    { step: 1, title: 'Skip the App', description: `No download, no account. Call ${BUSINESS.phone} or send a WhatsApp and your ${fromName} to ${toName} booking starts immediately.` },
    { step: 1, title: 'Talk to a Human', description: `Dial ${BUSINESS.phone}. You'll speak to someone who books your ${fromName} to ${toName} cab on the spot — not a chatbot.` },
  ];
  const step2 = [
    { step: 2, title: 'Your Details in 60 Seconds', description: `Pickup address in ${fromName}, travel date, time, passenger count, and vehicle preference. That's all we need to give you a firm quote.` },
    { step: 2, title: 'Share the Basics', description: `Tell us: where in ${fromName} you're being picked up, when you need to leave, how many passengers, and what type of vehicle you want. Done.` },
    { step: 2, title: 'Quick Information Exchange', description: `We need four things: pickup location in ${fromName}, date, departure time, and number of passengers. You'll have a quote in the same conversation.` },
    { step: 2, title: 'Trip Specifics', description: `Pickup point in ${fromName}, date of travel, departure window, passengers travelling, and preferred vehicle type. WhatsApp is fastest for this step.` },
    { step: 2, title: 'Tell Us Your Plan', description: `Door address in ${fromName}, journey date, timing, headcount, and any preferences (luggage, child seat, etc.). We handle the rest.` },
  ];
  const step3 = [
    { step: 3, title: 'Pick Your Car', description: `Sedan Dzire/Amaze (4 pax, ₹12/km): solo or couples. SUV Ertiga/Innova (6 pax): families. Innova Crysta (7 pax, captain seats): premium comfort. Tempo Traveller: groups of 8+.` },
    { step: 3, title: 'Choose a Vehicle', description: `Sedan for small groups and budget trips, SUV for families with luggage, Innova Crysta for longer routes where comfort matters, Tempo for 8+ passengers. We'll suggest if you're unsure.` },
    { step: 3, title: 'Fleet Options for This Route', description: `AC Sedan (₹12/km, 4 pax) → practical. SUV Ertiga or Innova (₹16/km, 6 pax) → family-sized. Innova Crysta (₹18/km, 7 pax) → best for long haul. Tempo Traveller → groups.` },
    { step: 3, title: 'Select Your Vehicle Type', description: `Not sure which car suits your trip? We'll guide you based on group size, luggage, and distance. Most ${fromName}–${toName} bookings go with Sedan or SUV.` },
    { step: 3, title: 'Vehicle Selection', description: `4 vehicle types: Sedan (₹12/km), SUV (₹16/km), Innova Crysta (₹18/km), Tempo Traveller (₹22/km). All AC, all GPS-tracked, all clean. Pick what fits your group.` },
  ];
  const step4 = [
    { step: 4, title: 'Confirmed in 2 Minutes', description: `Driver name, vehicle number, contact, and fare breakdown sent to WhatsApp within 2 minutes of your call. No waiting, no uncertainty.` },
    { step: 4, title: 'Booking Lock-In', description: `Your ${fromName} to ${toName} booking is locked within 2 minutes. Driver details — name, phone, car number — arrive on WhatsApp immediately.` },
    { step: 4, title: 'Instant WhatsApp Confirmation', description: `Two minutes after you confirm: driver contact, vehicle registration, and final fare land on your phone. Screenshot it — that's your booking receipt.` },
    { step: 4, title: 'Fast Confirmation', description: `Expect driver assignment within 2 minutes. You'll get the driver's name, vehicle, and a contact number — everything needed for the day of travel.` },
    { step: 4, title: "You're Booked", description: `Booking confirmed and driver allocated in under 2 minutes. WhatsApp confirmation with all trip details follows immediately — no follow-up calls needed.` },
  ];
  const step5 = [
    { step: 5, title: 'Driver at Your Door', description: `Your NK Cab driver arrives in ${fromName} 15 minutes before pickup — so you're never rushing. AC on, clean cabin, route planned.` },
    { step: 5, title: 'On-Time Pickup, Comfortable Journey', description: `Driver reaches your ${fromName} address ahead of schedule. Settle in, AC adjusted to your preference, and head to ${toName} without a worry.` },
    { step: 5, title: 'Off You Go', description: `Driver arrives early in ${fromName}, helps with luggage, and gets you underway. Your job is just to sit back and arrive at ${toName} rested.` },
    { step: 5, title: 'The Ride Begins', description: `NK Cab driver at your door in ${fromName} — 15 minutes before you asked. Clean car, AC running, and an experienced hand on the wheel to ${toName}.` },
    { step: 5, title: 'Relax for the Journey', description: `Driver arrives in ${fromName} ahead of time. You board a clean, AC cab driven by someone who knows this ${fromName}–${toName} road personally.` },
  ];

  return [step1[v], step2[v], step3[v], step4[v], step5[v]];
}

function getSlugHash(slug: string): number {
  // NK_ROUTE_BRAND_SEED=11 — shifts template selection so NK Cab & Taxi pages
  // always pick different intro/FAQ variants than the source site for every route.
  const NK_ROUTE_BRAND_SEED = 11;
  let hash = NK_ROUTE_BRAND_SEED;
  for (let i = 0; i < slug.length; i++) {
    hash += slug.charCodeAt(i);
  }
  return hash;
}

/**
 * Detects if this is the "reverse" direction of a route pair.
 * A route is considered reverse if its fromCity slug comes after toCity slug alphabetically.
 * This ensures A→B and B→A get different template variants and content angles.
 */
function isReverseRoute(from: string, to: string): boolean {
  return from > to;
}

// ─── Generate unique "About" description for route ───
function getRouteAboutContent(input: RouteContentInput): string[] {
  const { route, fromCity, toCity, fromStateName, toStateName } = input;
  const paragraphs: string[] = [];
  const hash = getSlugHash(route.slug);
  // Fix #2: Reverse routes get +4 template offset to ensure structurally different content from forward route
  const reverseOffset = isReverseRoute(route.from, route.to) ? 4 : 0;
  const templateIndex = (hash + reverseOffset) % 8;

  // Paragraph 1: Route overview — 14-way unique NK voice
  const intros = [
    `${route.fromName} to ${route.toName} is ${route.distance} km by road — roughly ${route.duration} hours depending on traffic. NK Cab & Taxi covers this route daily, with fixed fares starting at ₹${route.priceSaloon} for a Sedan. No surge pricing, no surprise charges. If the fare is right, call ${BUSINESS.phone} and we'll confirm your booking in under two minutes.`,
    `If you're planning the ${route.fromName}–${route.toName} journey, here's what you need to know: it's ${route.distance} km, takes around ${route.duration} hours, and NK Cab & Taxi runs it with AC vehicles and police-verified drivers every single day. Sedan from ₹${route.priceSaloon}. Call or WhatsApp ${BUSINESS.phone} — we confirm instantly.`,
    `${route.distance} km separates ${route.fromName} and ${route.toName} by road — about ${route.duration} hours in a good car with an experienced driver. NK Cab & Taxi has been running outstation cabs on this route since ${BUSINESS.foundYear}. We know where the traffic builds, where to stop, and how to get you there on time. Sedan ₹${route.priceSaloon}. Book: ${BUSINESS.phone}.`,
    `The ${route.fromName} to ${route.toName} cab distance is ${route.distance} km, typically ${route.duration} hours. NK Cab & Taxi quotes a flat fare before you confirm — Sedan ₹${route.priceSaloon}, SUV ₹${route.priceSuv} — with no revision at pickup and no surge ever. One-way or round-trip, we handle both. ${BUSINESS.phone}.`,
    `NK Cab & Taxi's ${route.fromName}–${route.toName} cab fare: Sedan ₹${route.priceSaloon}${fromStateName && toStateName && fromStateName !== toStateName ? ` (cross-state from ${fromStateName} to ${toStateName})` : ''}, SUV ₹${route.priceSuv}, Innova Crysta ₹${Math.round(route.priceSuv * 1.12)}, Tempo Traveller ₹${route.priceTempo}. Distance: ${route.distance} km, estimated ${route.duration} hours. Fare locked before departure. Call ${BUSINESS.phone}.`,
    `Every day, NK Cab & Taxi runs private cab service from ${route.fromName} to ${route.toName} — ${route.distance} km, approximately ${route.duration} hours, Sedan starting at ₹${route.priceSaloon}. Our drivers on this corridor know the route well — not just GPS-following, but genuinely familiar with the road, the towns en route, and the best approach into ${route.toName}. ${BUSINESS.phone}.`,
    `Looking for a door-to-door cab from ${route.fromName} to ${route.toName}? The drive covers ${route.distance} km, roughly ${route.duration} hours. NK Cab & Taxi offers the straightforward model: call ${BUSINESS.phone}, get a fixed quote (Sedan from ₹${route.priceSaloon}), confirm, and your driver is dispatched. No app, no algorithm, no surge.`,
    `${route.fromName} to ${route.toName} by private cab with NK Cab & Taxi: ${route.distance} km, ${route.duration} hours, starting at ₹${route.priceSaloon} for a Sedan. We run this route regularly. Our drivers know the highway well — rest stop timing, toll payment, fastest lane choices — and they'll have you at ${route.toName} without unnecessary delays. Reach us: ${BUSINESS.phone}.`,
    `The ${route.fromName}–${route.toName} route is ${route.distance} km — and NK Cab & Taxi makes it comfortable, predictable, and fairly priced. Sedan from ₹${route.priceSaloon}, same rate at 3 AM as at noon, same rate on Durga Puja as on any Tuesday. Driver confirmed in 2 minutes. Pickup at your door. Call ${BUSINESS.phone}.`,
    `${route.fromName} to ${route.toName} — ${route.distance} km, about ${route.duration} hours by car. NK Cab & Taxi runs this as one of our regular outstation routes with AC vehicles, verified drivers, and a no-haggle policy on fares. Sedan ₹${route.priceSaloon}, SUV ₹${route.priceSuv}. Your total cost is quoted before you say yes. Call or WhatsApp ${BUSINESS.phone}.`,
    `Private cab from ${route.fromName} to ${route.toName} with NK Cab & Taxi: flat fare Sedan ₹${route.priceSaloon} for ${route.distance} km (approx ${route.duration} hours). Fuel included, driver included, toll quoted separately and transparently. No platform fees, no minimum booking, no download required. Just dial ${BUSINESS.phone} and you're booked in minutes.`,
    `${route.fromName} to ${route.toName}: the road covers ${route.distance} km and the best cars cover it in around ${route.duration} hours. NK Cab & Taxi assigns route-familiar drivers to this corridor — they've driven ${route.fromName}–${route.toName} enough times to know where to make up time and where to hold back. Sedan ₹${route.priceSaloon}. ${BUSINESS.phone}.`,
    `Need an outstation taxi from ${route.fromName} to ${route.toName}? NK Cab & Taxi quotes flat fares — Sedan ₹${route.priceSaloon}, SUV ₹${route.priceSuv} — for this ${route.distance} km, ${route.duration}-hour journey. No surprise additions on arrival. No cancellation after confirmation. Available 24/7 for all vehicle types. ${BUSINESS.phone}.`,
    `${route.distance} km. ${route.duration} hours. ₹${route.priceSaloon} for a Sedan. That's the ${route.fromName} to ${route.toName} cab in numbers. NK Cab & Taxi adds the non-numbers: a driver who knows the road, an AC cabin that's actually clean, and a confirmation message that arrives before you've hung up. ${BUSINESS.phone}.`,
  ];
  paragraphs.push(intros[templateIndex]);

  // Paragraph 2: Vehicle options — 8-way natural variation
  const vehicleParas = [
    `For this ${route.fromName}–${route.toName} trip, vehicle options: Sedan (Swift Dzire or Honda Amaze, up to 4 passengers) from ₹${route.priceSaloon} — best for solo travel or couples. SUV (Ertiga or Innova, 6 passengers) from ₹${route.priceSuv} — family choice. Innova Crysta (7 passengers, captain seats) a step above. Tempo Traveller (12 passengers) from ₹${route.priceTempo} for groups. All fares cover fuel and driver; toll is extra and disclosed upfront.`,
    `Vehicle prices for the ${route.fromName} to ${route.toName} cab: Sedan ₹${route.priceSaloon} (4 pax, 2 bags), SUV Ertiga/Innova ₹${route.priceSuv} (6 pax, 3 bags), Innova Crysta ₹${Math.round(route.priceSuv * 1.12)} (7 pax, captain seats), Tempo Traveller ₹${route.priceTempo} (12–17 pax). All AC, GPS-tracked. Driver and fuel included. Toll and parking extra — informed upfront.`,
    `Three practical choices for ${route.fromName} to ${route.toName}: (1) Sedan from ₹${route.priceSaloon} — economical, comfortable for 4; (2) SUV from ₹${route.priceSuv} — roomier, fits 6 with luggage; (3) Tempo Traveller from ₹${route.priceTempo} — for groups of 8 or more. Innova Crysta available as a mid-option for premium comfort. All fares include fuel and driver.`,
    `Cab fare options for ${route.fromName}–${route.toName}: The most booked is Sedan at ₹${route.priceSaloon} (Swift Dzire, good for 1–4 people with standard luggage). For families or groups of 5–6, our Ertiga or Innova at ₹${route.priceSuv} is the practical choice. Group travel of 8+ people? Tempo Traveller from ₹${route.priceTempo} offers the best per-person rate. All prices include fuel and driver charges.`,
    `For the ${route.fromName} to ${route.toName} journey, we offer: Swift Dzire / Honda Amaze (Sedan, 4 passengers) — ₹${route.priceSaloon}; Maruti Ertiga / Toyota Innova (SUV, 6 passengers) — ₹${route.priceSuv}; Toyota Innova Crysta (7 passengers, premium) — approx ₹${Math.round(route.priceSuv * 1.12)}; Tempo Traveller (12+ passengers) — ₹${route.priceTempo}. Fares cover fuel and driver; toll and parking paid separately.`,
    `Choosing a vehicle for ${route.fromName}–${route.toName}: Sedan (Dzire or Amaze) at ₹${route.priceSaloon} suits most travelers — 4 seats, decent boot space. SUV at ₹${route.priceSuv} for families needing more leg room or luggage space. Innova Crysta for a step-up in comfort. Tempo Traveller at ₹${route.priceTempo} for group tours, pilgrimages, and corporate outings. Flat rates — no surge on any vehicle.`,
    `${route.fromName} to ${route.toName} vehicle rates: Sedan ₹${route.priceSaloon} — clean, AC, 4 pax; SUV ₹${route.priceSuv} — Ertiga or Innova, 6 pax; Innova Crysta (premium SUV) — around ₹${Math.round(route.priceSuv * 1.12)}, 7 pax; Tempo Traveller ₹${route.priceTempo} — 12+ pax for larger groups. All fares include fuel and driver. Toll is additional and disclosed before departure.`,
    `For ${route.fromName} to ${route.toName}, pick from: Sedan (4 pax, ₹${route.priceSaloon}) for budget-conscious solo or duo travel; SUV (6 pax, ₹${route.priceSuv}) for families; Innova Crysta (7 pax, captain-seat comfort) for a slightly premium experience; Tempo Traveller (12–17 pax, ₹${route.priceTempo}) for group travel. Driver and fuel included in all fares. Toll charges advised upfront.`,
  ];
  paragraphs.push(vehicleParas[templateIndex % 8]);

  // Paragraph 3 & 4: City content — Fix #2 & #9
  // Forward routes: lead with destination (you're going TO it — tourist appeal)
  // Reverse routes: lead with source city (you're departing FROM it — departure context)
  const isReverse = isReverseRoute(route.from, route.to);

  if (!isReverse) {
    // Forward route — destination-first angle
    if (toCity && toCity.tourist && toCity.landmarks && toCity.landmarks.length > 0) {
      paragraphs.push(
        `${route.toName} is a wonderful destination${toStateName ? ` in ${toStateName}` : ''} known for its rich heritage and attractions. When you arrive by cab from ${route.fromName}, you can explore famous places like ${toCity.landmarks.join(', ')}. ${toCity.description} Our drivers are familiar with all tourist spots in ${route.toName} and can suggest the best itinerary for your visit.`
      );
    } else if (toCity) {
      paragraphs.push(
        `${route.toName} is ${toCity.tourist ? 'a popular destination' : 'an important city'} in ${toStateName || 'the region'}. ${toCity.description} Our cab service provides convenient door-to-door transfers from ${route.fromName} to any location within ${route.toName} including ${toCity.landmarks ? toCity.landmarks.slice(0, 3).join(', ') : 'all major areas'}, railway station, bus stand, and residential areas.`
      );
    }
    // Source city pickup context
    if (fromCity) {
      const pickupPoints = [];
      if (fromCity.airport) pickupPoints.push(fromCity.airport);
      if (fromCity.railway) pickupPoints.push(fromCity.railway);
      if (fromCity.landmarks) pickupPoints.push(...fromCity.landmarks.slice(0, 3));
      paragraphs.push(
        `Our cab picks you up from anywhere in ${route.fromName}${pickupPoints.length > 0 ? ` including ${pickupPoints.slice(0, 4).join(', ')}` : ''}. ${fromCity.airport ? `Arriving by flight at ${fromCity.airport}? Our driver tracks your flight and waits at the arrival gate — no extra charge for delays.` : ''} ${fromCity.railway ? `For pickups from ${fromCity.railway}, our driver will be at the exit gate at your scheduled time.` : ''}`
      );
    }
  } else {
    // Reverse route — departure-first angle (you're leaving FROM this city)
    if (fromCity) {
      const pickupPoints = [];
      if (fromCity.airport) pickupPoints.push(fromCity.airport);
      if (fromCity.railway) pickupPoints.push(fromCity.railway);
      if (fromCity.landmarks) pickupPoints.push(...fromCity.landmarks.slice(0, 4));
      const fromDesc = fromCity.tourist && fromCity.description
        ? `${route.fromName} — ${fromCity.description.split('.')[0]}. `
        : `${route.fromName} is a major city in ${fromStateName || 'the region'}. `;
      paragraphs.push(
        `${fromDesc}Our cab service departs from all areas of ${route.fromName}${pickupPoints.length > 0 ? ` including ${pickupPoints.join(', ')}` : ''}. ${fromCity.airport ? `Flight passengers at ${fromCity.airport} can book our airport-to-${route.toName} cab with meet-and-greet service.` : ''} ${fromCity.railway ? `Pickups from ${fromCity.railway} available 24/7 — our driver will meet you at the station exit.` : ''}`
      );
    }
    // Destination context for reverse route
    if (toCity) {
      const dropPoints = [];
      if (toCity.airport) dropPoints.push(toCity.airport);
      if (toCity.railway) dropPoints.push(toCity.railway);
      if (toCity.landmarks) dropPoints.push(...toCity.landmarks.slice(0, 3));
      paragraphs.push(
        `${route.toName} is your destination${toStateName ? ` in ${toStateName}` : ''}. ${toCity.description ? toCity.description.split('.')[0] + '.' : ''} We offer door-to-door drop to any location in ${route.toName}${dropPoints.length > 0 ? ` including ${dropPoints.join(', ')}` : ''}. ${toCity.tourist ? `If you plan to visit local tourist spots, let our driver know — they can guide you to the best routes.` : ''}`
      );
    }
  }

  // Paragraph 5: Service commitment — 8 natural variations
  const commitments = [
    `${BUSINESS.name} has been running ${route.fromName}–${route.toName} cab service since ${BUSINESS.foundYear}. On every trip: clean AC vehicle, verified driver, fixed fare with no surge, and booking confirmation in 2 minutes. Toll charges disclosed before departure. Cancel free up to 4 hours ahead. Book: ${BUSINESS.phone}.`,
    `Since ${BUSINESS.foundYear}, ${BUSINESS.name} has maintained one consistent standard on the ${route.fromName} to ${route.toName} route: honest pricing, reliable drivers, and clean cars. No last-minute cancellations from our end. Free cancellation policy up to 4 hours before departure. Pay by Cash, UPI, or Card. Call or WhatsApp: ${BUSINESS.phone}.`,
    `Why passengers choose ${BUSINESS.name} for ${route.fromName}–${route.toName}: operating since ${BUSINESS.foundYear}, verified highway drivers, AC fleet, flat rates with no surge on any day or time, and instant WhatsApp confirmation. Free cancellation if plans change (up to 4 hours before). UPI, Card, or Cash accepted. Dial ${BUSINESS.phone}.`,
    `${BUSINESS.name} on the ${route.fromName}–${route.toName} route since ${BUSINESS.foundYear}: police-verified drivers who know this highway well, AC cars that are sanitized and maintained, and transparent fares — no algorithms, no surge. Cancel free up to 4 hours before. Multiple payment options. Call ${BUSINESS.phone}.`,
    `Booking ${route.fromName} to ${route.toName} cab with ${BUSINESS.name} means: confirmation in 2 minutes, driver who's done this route before, fixed fare with no unpleasant surprises, and free cancellation if your plans change. Serving this route since ${BUSINESS.foundYear}. Call ${BUSINESS.phone} or WhatsApp us.`,
    `${BUSINESS.name} has operated the ${route.fromName}–${route.toName} route since ${BUSINESS.foundYear} and we do a few things consistently well: show up on time, charge what we quoted, and maintain our cars properly. Free cancellation 4 hours before. UPI, Cash, Card payments. ${BUSINESS.phone}.`,
    `Since ${BUSINESS.foundYear}, ${BUSINESS.name} has handled the ${route.fromName} to ${route.toName} corridor for thousands of passengers. Our commitment remains simple: clean car, experienced driver, honest fare, no surprise charges. Free cancellation up to 4 hours before pickup. Book via call or WhatsApp: ${BUSINESS.phone}.`,
    `Choosing ${BUSINESS.name} for ${route.fromName}–${route.toName} means a driver who's driven this route many times, an AC car that's been cleaned and checked, a fare that won't change at the end, and a company that's been operating since ${BUSINESS.foundYear}. Cancel anytime up to 4 hours before. Cash, UPI, or Card. ${BUSINESS.phone}.`,
  ];
  paragraphs.push(commitments[templateIndex % 8]);

  return paragraphs;
}

// ─── Extended FAQs for route pages — 3-variation answers ───
export function getRouteExtendedFAQs(input: RouteContentInput): { question: string; answer: string }[] {
  const { route, fromCity, toCity } = input;
  const hash = route.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const v = hash % 3;

  // Toll estimate helper
  function getTollEstimate(dist: number): string {
    let minToll = 0, maxToll = 0;
    if (dist < 100) { minToll = 0; maxToll = 100; }
    else if (dist < 200) { minToll = 80; maxToll = 220; }
    else if (dist < 350) { minToll = 150; maxToll = 380; }
    else if (dist < 500) { minToll = 300; maxToll = 600; }
    else { minToll = 500; maxToll = 900; }
    return `₹${minToll}–₹${maxToll}`;
  }

  const fareAnswers = [
    `${route.fromName} to ${route.toName} cab fare: Sedan ₹${route.priceSaloon} (Swift Dzire or Honda Amaze, 4 pax), SUV ₹${route.priceSuv} (Ertiga or Innova, 6 pax), Tempo Traveller ₹${route.priceTempo} (12+ pax). All fares include fuel and driver. Toll and parking extra, informed upfront. Call ${BUSINESS.phone}.`,
    `Cab fare from ${route.fromName} to ${route.toName}: Sedan starts at ₹${route.priceSaloon}, SUV at ₹${route.priceSuv}, Innova Crysta at ₹${Math.round(route.priceSuv * 1.12)}, Tempo Traveller at ₹${route.priceTempo}. Driver and fuel included. Toll charges are communicated before confirmation — no surprises.`,
    `${route.fromName}–${route.toName} cab prices: Sedan ₹${route.priceSaloon} (most booked for solo and couples), SUV ₹${route.priceSuv} (ideal for families of 5–6), Tempo Traveller ₹${route.priceTempo} (groups of 8+). Fares include fuel and driver. Toll extra. Call ${BUSINESS.phone} for confirmed quote.`,
  ];

  const distanceAnswers = [
    `Road distance from ${route.fromName} to ${route.toName} is approximately ${route.distance} km. Travel time is around ${route.duration} hours by car.${route.via.length > 0 ? ` Route via ${route.via.join(', ')}.` : ''} Actual travel time can vary by 15–30 minutes based on traffic and stops.`,
    `${route.fromName} to ${route.toName} by road: ${route.distance} km, approximately ${route.duration} hours.${route.via.length > 0 ? ` Passes through ${route.via.join(', ')}.` : ' Our drivers take the fastest available route.'} Early morning departures typically shave 20–30 minutes off the estimate.`,
    `The driving distance between ${route.fromName} and ${route.toName} is about ${route.distance} km. With a good driver and light traffic, the journey takes around ${route.duration} hours.${route.via.length > 0 ? ` Key towns en route: ${route.via.join(', ')}.` : ''}`,
  ];

  const oneWayAnswers = [
    `Yes. One-way cab from ${route.fromName} to ${route.toName} is available. You pay only for the single-direction journey — no return charges. Sedan starts at ₹${route.priceSaloon}. Best option when you're not returning the same day.`,
    `One-way is available on the ${route.fromName}–${route.toName} route. You're charged only for the distance you travel. Sedan from ₹${route.priceSaloon}. 40–50% cheaper than round-trip for single-direction travel. Call ${BUSINESS.phone}.`,
    `Yes, one-way cab from ${route.fromName} to ${route.toName}: you pay for the one-way distance only, not the driver's return. Sedan from ₹${route.priceSaloon}. Most economical option for intercity single-direction travel.`,
  ];

  const vehicleAnswers = [
    `Vehicle options for ${route.fromName}–${route.toName}: Sedan (Swift Dzire, Honda Amaze — 4 pax, 2 bags), SUV (Ertiga — 6 pax, 3 bags), Innova Crysta (7 pax, captain seats), Tempo Traveller (12–17 pax). All AC, clean, GPS-tracked.`,
    `For ${route.fromName} to ${route.toName}: Sedan (4 passengers, ₹${route.priceSaloon}) for individuals and couples; SUV Ertiga (6 passengers, ₹${route.priceSuv}) for families; Innova Crysta (7 passengers, premium option); Tempo Traveller (12+ passengers, ₹${route.priceTempo}) for groups. All AC.`,
    `Cars available from ${route.fromName} to ${route.toName}: Sedan (Dzire/Amaze, 4 pax, most affordable), Ertiga/Innova SUV (6 pax), Innova Crysta (7 pax, premium interiors), 12-seater Tempo Traveller (group trips). All vehicles have AC, seat belts, and GPS tracking.`,
  ];

  const bookingAnswers = [
    `Call ${BUSINESS.phone} or WhatsApp. Give us your pickup address in ${route.fromName}, travel date, time, and number of passengers. Confirmation in 2 minutes with driver details. No app required.`,
    `Booking ${route.fromName}–${route.toName} cab: WhatsApp or call ${BUSINESS.phone}. Share pickup address, destination, date, and time. Driver assigned in under 2 minutes with contact and vehicle details on WhatsApp.`,
    `Call ${BUSINESS.phone} or fill our online booking form. Provide pickup location in ${route.fromName}, date, time, and passenger count. 2-minute confirmation. No app download or advance payment required for most bookings.`,
  ];

  const nightAnswers = [
    `${route.distance < 200 ? `The ${route.fromName}–${route.toName} route is manageable for night travel. Our drivers are experienced with this route after dark.` : `For ${route.distance} km, early morning is preferable to night travel. That said, our highway drivers handle night journeys on this route regularly when needed.`} All vehicles are GPS-tracked; you can share your location with family.`,
    `${route.distance < 200 ? `Night travel from ${route.fromName} to ${route.toName} is fine — national highway sections are well-lit and our drivers know the route in all conditions.` : `For this distance (${route.distance} km), a 5–6 AM departure is recommended. Night travel is possible but requires proper planning — our drivers advise on rest stops.`} GPS tracking is standard on all vehicles.`,
    `${route.distance < 200 ? `Yes, the ${route.fromName}–${route.toName} drive is safe at night. The main highway sections are well-maintained and our drivers have done this route many times in the dark.` : `We recommend starting by 5 AM for the ${route.distance} km ${route.fromName}–${route.toName} route. Night driving for very long distances needs careful rest-stop planning — our drivers handle this well.`} Share live location with family for added peace of mind.`,
  ];

  const tollAnswers = [
    `Toll on the ${route.fromName}–${route.toName} route (${route.distance} km): estimate ${getTollEstimate(route.distance)} for a sedan across all plazas${route.via.length > 0 ? ` via ${route.via.join(', ')}` : ''}. SUVs pay slightly higher. FASTag on all our vehicles for smooth passage. Tolls are NOT included in the cab fare — paid separately at plazas.`,
    `Approximate toll for ${route.fromName} to ${route.toName} (sedan): ${getTollEstimate(route.distance)}. Commercial vehicles (SUV, Tempo) pay marginally more. Our drivers are FASTag-enabled. Exact amounts are informed before you confirm — no surprises.`,
    `Tolls from ${route.fromName} to ${route.toName}: sedan estimate ${getTollEstimate(route.distance)} depending on route taken${route.via.length > 0 ? ` via ${route.via.join(', ')}` : ''}. Paid at toll plazas; not included in the cab fare. FASTag on all vehicles for quick, cashless crossing.`,
  ];

  const roundTripAnswers = [
    `Yes. Round-trip from ${route.fromName} to ${route.toName} means the driver stays with you at the destination and brings you back. More economical than two separate one-way bookings. Driver's accommodation included. Call ${BUSINESS.phone} for pricing.`,
    `Round trip available. Same driver, same vehicle for the full journey — there and back. Driver available for local travel while at ${route.toName}. Call ${BUSINESS.phone} for round-trip fare.`,
    `Certainly. Round-trip cab from ${route.fromName} to ${route.toName}: driver stays at destination, available for sightseeing or local errands. Minimum 250 km/day. Driver allowance ₹300/night. Call ${BUSINESS.phone}.`,
  ];

  const groupAnswers = [
    `For groups and families from ${route.fromName} to ${route.toName}: SUV Ertiga or Innova (6 passengers) and Tempo Traveller (12–17 passengers) are available. Ample luggage space on all vehicles. Call ${BUSINESS.phone} for group quotes.`,
    `Group travel on ${route.fromName}–${route.toName}: SUV (6 pax, ₹${route.priceSuv}) for family groups; Tempo Traveller (12+ pax, ₹${route.priceTempo}) for larger groups. Special group rates possible for Tempo Traveller bookings. Contact ${BUSINESS.phone}.`,
    `We handle group travel from ${route.fromName} to ${route.toName} with SUV (6 passengers), Innova Crysta (7 passengers), and Tempo Traveller (12–17 passengers). All with AC and luggage space. Group discounts available. Call ${BUSINESS.phone}.`,
  ];

  const cancellationAnswers = [
    `Free cancellation up to 4 hours before your scheduled pickup time. Cancellations within 4 hours may incur a nominal fee. Prepaid refunds processed within 24 hours.`,
    `Cancel free up to 4 hours before departure. Within 4 hours, a cancellation fee may apply. We understand plans change — no questions asked for timely cancellations.`,
    `Our cancellation policy: free up to 4 hours before pickup. After that, a small charge may apply. Refunds for online prepayments within 24 hours. Call ${BUSINESS.phone} to cancel.`,
  ];

  const crystaAnswers = [
    `Yes. Innova Crysta available from ${route.fromName} to ${route.toName} at ₹${Math.round(route.priceSuv * 1.15)}. Captain seats, spacious interiors, powerful AC. Most popular for family outstation trips. Call ${BUSINESS.phone} to reserve.`,
    `Innova Crysta is available for this route at approximately ₹${Math.round(route.priceSuv * 1.15)}. 7 passengers, premium captain seats, more legroom and luggage space than a standard SUV. Highly recommended for family travel. Book: ${BUSINESS.phone}.`,
    `Yes. Toyota Innova Crysta (7 passengers) available for ${route.fromName}–${route.toName} at ₹${Math.round(route.priceSuv * 1.15)}. The most comfortable option for family groups — captain seats, strong AC, spacious boot. Reserve: ${BUSINESS.phone}.`,
  ];

  const faqs: { question: string; answer: string }[] = [
    { question: `What is the cab fare from ${route.fromName} to ${route.toName}?`, answer: fareAnswers[v] },
    { question: `What is the distance from ${route.fromName} to ${route.toName} by road?`, answer: distanceAnswers[v] },
    { question: `Is one-way cab available from ${route.fromName} to ${route.toName}?`, answer: oneWayAnswers[v] },
    { question: `What types of cars are available for ${route.fromName} to ${route.toName}?`, answer: vehicleAnswers[v] },
    { question: `How do I book a cab from ${route.fromName} to ${route.toName}?`, answer: bookingAnswers[v] },
    { question: `Is the ${route.fromName} to ${route.toName} road safe for night travel?`, answer: nightAnswers[v] },
    { question: `What are the toll charges from ${route.fromName} to ${route.toName}?`, answer: tollAnswers[v] },
    { question: `Can I book a round trip from ${route.fromName} to ${route.toName}?`, answer: roundTripAnswers[v] },
    { question: `Do you offer ${route.fromName} to ${route.toName} cab for groups and families?`, answer: groupAnswers[v] },
    { question: `What is the cancellation policy for ${route.fromName} to ${route.toName} cab?`, answer: cancellationAnswers[v] },
    { question: `Do you provide Innova Crysta for ${route.fromName} to ${route.toName}?`, answer: crystaAnswers[v] },
  ];

  if (fromCity?.airport || toCity?.airport) {
    const airportFaqs = [
      `${fromCity?.airport ? `Pickup from ${fromCity.airport} in ${route.fromName} — driver tracks flight, waits at arrival with name board, no extra charge for delays up to 45 minutes.` : ''} ${toCity?.airport ? `Drop at ${toCity.airport} in ${route.toName} also available.` : ''} 24/7 service.`,
      `${fromCity?.airport ? `${fromCity.airport} pickup in ${route.fromName}: driver monitors live flight status, at arrivals when you land. 45-minute free wait.` : ''} ${toCity?.airport ? `Can arrange drop at ${toCity.airport} in ${route.toName}.` : ''} Airport service 24/7.`,
      `${fromCity?.airport ? `Yes, we pick up from ${fromCity.airport}. Driver tracks your flight and holds your name at arrival gate.` : ''} ${toCity?.airport ? `Drop at ${toCity.airport} also available on this route.` : ''} No extra charge for airport pickups beyond the standard cab fare.`,
    ];
    faqs.push({ question: `Do you provide airport pickup for ${route.fromName} to ${route.toName}?`, answer: airportFaqs[v] });
  }

  if (fromCity?.railway || toCity?.railway) {
    const stationFaqs = [
      `${fromCity?.railway ? `Pickup from ${fromCity.railway} in ${route.fromName} — driver at station exit at your scheduled time.` : ''} ${toCity?.railway ? `Drop at ${toCity.railway} in ${route.toName} available.` : ''} Station pickups 24/7 at standard rates.`,
      `${fromCity?.railway ? `Yes, ${fromCity.railway} pickup in ${route.fromName} — driver coordinates with your arrival time.` : ''} ${toCity?.railway ? `Station drop in ${route.toName} also arranged.` : ''} Available any hour.`,
      `${fromCity?.railway ? `Station cab at ${fromCity.railway}: driver meets you at the main exit.` : ''} ${toCity?.railway ? `Drop at ${toCity.railway} in ${route.toName} included in the fare.` : ''} 24/7 station service.`,
    ];
    faqs.push({ question: `Can I get picked up from the railway station for ${route.fromName} to ${route.toName}?`, answer: stationFaqs[v] });
  }

  return faqs;
}

// ─── Hindi/Hinglish FAQs — 3-pool natural variation ───
export function getRouteHindiFAQs(input: RouteContentInput): { question: string; answer: string; lang: string }[] {
  const { route } = input;
  const hash = route.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const v = hash % 3;

  const hintiFaqSets = [
    [
      { question: `${route.fromName} se ${route.toName} cab ka kiraya kitna hai?`, answer: `Sedan (Swift Dzire) mein ₹${route.priceSaloon} se shuru hota hai. SUV mein ₹${route.priceSuv}, Tempo Traveller mein ₹${route.priceTempo}. Fuel aur driver include hai. Toll alag se. ${BUSINESS.phone} pe call karein.`, lang: 'hi' },
      { question: `${route.fromName} se ${route.toName} kitna dur hai?`, answer: `Road distance lagbhag ${route.distance} km hai. Car se ${route.duration} ghante lagte hain.${route.via.length > 0 ? ` Route ${route.via.join(', ')} se guzarta hai.` : ''} AC cab book karein ${BUSINESS.phone} pe.`, lang: 'hi' },
      { question: `${route.fromName} se ${route.toName} one-way cab milta hai?`, answer: `Haan, one-way cab available hai. Sirf ek taraf ka kiraya lagta hai — wapsi ka nahi. Sedan ₹${route.priceSaloon} se shuru. Call ${BUSINESS.phone}.`, lang: 'hi' },
    ],
    [
      { question: `${route.fromName} to ${route.toName} cab book kaise karein?`, answer: `${BUSINESS.phone} pe call ya WhatsApp karein. Pickup address, date, time, aur passengers batayein. 2 minute mein confirmation milega driver ke saath.`, lang: 'hi' },
      { question: `${route.fromName} se ${route.toName} ka safar kitne ghante ka hai?`, answer: `Lagbhag ${route.duration} ghante lagte hain ${route.distance} km ke liye.${route.via.length > 0 ? ` Rasta ${route.via.join(', ')} se guzarta hai.` : ''} Traffic ke hisaab se thoda farq ho sakta hai.`, lang: 'hi' },
      { question: `${route.fromName} se ${route.toName} cab kab milti hai?`, answer: `${BUSINESS.name} 24 ghante, 7 din available hai. Raat ko bhi, festive season mein bhi — same fixed rate. Call karein ${BUSINESS.phone}.`, lang: 'hi' },
    ],
    [
      { question: `${route.fromName} se ${route.toName} sabse sasta cab kaun sa hai?`, answer: `Sedan (Swift Dzire ya Honda Amaze) sabse sasta option hai — ₹${route.priceSaloon} se shuru. 4 log aram se travel kar sakte hain. Koi surge pricing nahi. Call karein ${BUSINESS.phone}.`, lang: 'hi' },
      { question: `${route.fromName} se ${route.toName} cab mein kitna toll lagta hai?`, answer: `Sedan ke liye approximate toll ${route.distance < 200 ? '₹80–₹220' : route.distance < 400 ? '₹150–₹380' : '₹300–₹600'} ke beech hota hai. Cab fare mein toll included nahi hai — alag se dena hota hai toll plaza pe. FASTag se cashless bhi ho jaata hai.`, lang: 'hi' },
      { question: `${route.fromName} se ${route.toName} AC cab milti hai?`, answer: `Haan, ${BUSINESS.name} ke saare cabs AC hain — Sedan, SUV, Innova Crysta, aur Tempo Traveller. Driver police-verified hain aur gaadi hamesha saaf hoti hai.`, lang: 'hi' },
    ],
  ];

  return hintiFaqSets[v];
}

// ─── Seasonal & Festival Travel Guide ───
function getSeasonalContent(fromName: string, toName: string): string | null {
  const fLower = fromName.toLowerCase();
  const tLower = toName.toLowerCase();

  // 1. Hills / Darjeeling/Sikkim (West Bengal Hills)
  if (tLower.includes('darjeeling') || tLower.includes('kalimpong') || tLower.includes('gangtok') || tLower.includes('siliguri')) {
    return `🌸 **Spring & Autumn Peak (March–May, October–November)**: This is the absolute best time to visit Darjeeling and Gangtok. The skies are clear, offering breathtaking views of Kanchenjunga. Cabs are in high demand, so early booking is recommended.\n\n☔ **Monsoon Advisory (July–September)**: The Himalayan hills receive heavy rainfall. While beautiful, please factor in extra travel time due to occasional road diversions or minor landslides. Our hill-certified drivers ensure safety first.\n\n❄️ **Winter Season (December–February)**: Beautifully cold, perfect for experiencing the chill and clear skies. Ensure you book your taxi from Siliguri to Darjeeling in advance as tourist numbers peak during Christmas and New Year.`;
  }

  // 2. Beach / Digha/Mandarmani/Puri
  if (tLower.includes('digha') || tLower.includes('mandarmani') || tLower.includes('puri') || tLower.includes('konark') || tLower.includes('bakkhali')) {
    return `☀️ **Best Time for Beaches (October to March)**: The weather is pleasant and cool, perfect for beach activities in Digha, Mandarmani, or Puri.\n\n🎡 **Rath Yatra Festival (June–July in Puri)**: Puri experiences a massive influx of devotees. If planning a cab trip to Puri during this time, we suggest booking at least 7 days in advance due to strict traffic diversions and high demand.\n\n🚗 **Weekend Getaways**: Kolkata to Digha/Mandarmani has high weekend traffic. Start early in the morning (around 5–6 AM) to enjoy a smooth highway drive on NH 16 and avoid weekend rush hour.`;
  }

  // 3. Pilgrimage / Mayapur/Nabadwip/Deoghar
  if (tLower.includes('mayapur') || tLower.includes('nabadwip') || tLower.includes('deoghar') || tLower.includes('tarapith')) {
    if (tLower.includes('deoghar')) {
      return `🔱 **Shravani Mela (July–August)**: Deoghar gets highly crowded during the holy month of Shravan. Police enforce one-way loops and bypass routes. Our drivers are local experts and navigate these redirections easily.\n\n❄️ **Winter Pilgrimage (October–February)**: Very comfortable weather for temple visits and religious tours.`;
    }
    return `🌸 **Festivals in Mayapur**: Gaura Purnima (Feb–March), Janmashtami (Aug–Sept), and Rash Yatra (November) are celebrated with grand celebrations. Book your cab from Kolkata to Mayapur in advance to secure your preferred Sedan or SUV.`;
  }

  // 4. Durga Puja / Festive Season (Kolkata connection)
  if (fLower.includes('kolkata') || tLower.includes('kolkata')) {
    return `🎉 **Durga Puja Festive Peak (September–October)**: Travel between Kolkata and nearby states/cities peaks as people return home. While other cab services apply heavy surge pricing, ${BUSINESS.name} guarantees flat, transparent fares. Book at least 3-5 days in advance.\n\n💼 **Chhath Puja Travel (November)**: Extremely high demand for routes connecting Kolkata to Ranchi, Patna, Dhanbad, and Jamshedpur. Devotees travel for rituals, making early taxi bookings essential.`;
  }

  return null;
}

// ─── Main export: Generate all route page content ───
export function generateRoutePageContent(input: RouteContentInput) {
  const { route, fromCity, toCity } = input;

  return {
    aboutContent: getRouteAboutContent(input),
    travelTips: getTravelTips(route.distance, route.fromName, route.toName, route.via),
    roadDescription: getRoadDescription(route.distance, route.via, route.fromName, route.toName),
    bookingSteps: getBookingSteps(route.fromName, route.toName),
    faqs: [...getRouteExtendedFAQs(input), ...getRouteHindiFAQs(input)],
    reverseRouteSlug: `${route.to}-to-${route.from}`,
    reverseRouteLabel: `${route.toName} to ${route.fromName}`,
    seasonalContent: getSeasonalContent(route.fromName, route.toName),
    keyHighlights: [
      { label: 'Distance', value: `${route.distance} km` },
      { label: 'Duration', value: `${route.duration} hours` },
      { label: 'Starting Fare', value: `₹${route.priceSaloon}` },
      { label: 'Vehicle Options', value: 'Sedan, SUV, Tempo' },
      { label: 'Availability', value: '24/7, 365 days' },
      { label: 'Payment', value: 'Cash, UPI, Card' },
    ],
    popularKeywords: [
      // ═══ Primary route keywords (highest volume) ═══
      `${route.fromName} to ${route.toName} cab`,
      `${route.fromName} to ${route.toName} taxi`,
      `${route.fromName} to ${route.toName} taxi fare`,
      `${route.fromName} to ${route.toName} cab fare`,
      `${route.fromName} to ${route.toName} one way cab`,
      `${route.fromName} to ${route.toName} cab booking`,
      `taxi from ${route.fromName} to ${route.toName}`,
      `cab from ${route.fromName} to ${route.toName}`,
      `${route.fromName} to ${route.toName} car rental`,
      `${route.fromName} to ${route.toName} cab service`,
      `${route.fromName} to ${route.toName} taxi service`,
      // ═══ Distance & travel keywords ═══
      `${route.fromName} to ${route.toName} distance`,
      `${route.fromName} to ${route.toName} distance by road`,
      `${route.fromName} to ${route.toName} by road`,
      `${route.fromName} to ${route.toName} by car`,
      `${route.fromName} to ${route.toName} travel by car`,
      `${route.fromName} to ${route.toName} road trip`,
      `${route.fromName} to ${route.toName} travel time`,
      `${route.fromName} to ${route.toName} km`,
      `how to go from ${route.fromName} to ${route.toName}`,
      `how to reach ${route.toName} from ${route.fromName}`,
      // ═══ Pricing & fare keywords ═══
      `${route.fromName} to ${route.toName} cab price`,
      `${route.fromName} to ${route.toName} taxi charges`,
      `${route.fromName} to ${route.toName} cab rate`,
      `${route.fromName} to ${route.toName} cab rate per km`,
      `${route.fromName} to ${route.toName} cab cost`,
      `${route.fromName} to ${route.toName} taxi rate`,
      `${route.fromName} to ${route.toName} fare`,
      `${route.fromName} to ${route.toName} fare chart`,
      `${route.fromName} to ${route.toName} taxi fare today`,
      `${route.fromName} to ${route.toName} cab charges per km`,
      `cheapest cab ${route.fromName} to ${route.toName}`,
      `best cab ${route.fromName} to ${route.toName}`,
      `affordable taxi ${route.fromName} to ${route.toName}`,
      `cheap taxi ${route.fromName} to ${route.toName}`,
      `lowest fare ${route.fromName} to ${route.toName}`,
      // ═══ Booking & action keywords ═══
      `book cab ${route.fromName} to ${route.toName}`,
      `book taxi ${route.fromName} to ${route.toName}`,
      `${route.fromName} to ${route.toName} cab online booking`,
      `${route.fromName} to ${route.toName} online cab booking`,
      `${route.fromName} to ${route.toName} cab booking online`,
      `hire cab ${route.fromName} to ${route.toName}`,
      `hire taxi ${route.fromName} to ${route.toName}`,
      `${route.fromName} to ${route.toName} car hire`,
      `${route.fromName} to ${route.toName} car booking`,
      // ═══ Trip type keywords ═══
      `${route.fromName} to ${route.toName} outstation cab`,
      `${route.fromName} to ${route.toName} round trip cab`,
      `${route.fromName} to ${route.toName} one way taxi`,
      `${route.fromName} to ${route.toName} drop taxi`,
      `${route.fromName} to ${route.toName} return cab`,
      `${route.fromName} to ${route.toName} round trip taxi`,
      `${route.fromName} to ${route.toName} day trip cab`,
      // ═══ Vehicle-specific keywords ═══
      `${route.fromName} to ${route.toName} innova cab`,
      `${route.fromName} to ${route.toName} innova crysta`,
      `${route.fromName} to ${route.toName} suv cab`,
      `${route.fromName} to ${route.toName} sedan cab`,
      `${route.fromName} to ${route.toName} ertiga cab`,
      `${route.fromName} to ${route.toName} crysta cab`,
      `${route.fromName} to ${route.toName} tempo traveller`,
      `${route.fromName} to ${route.toName} swift dzire`,
      `${route.fromName} to ${route.toName} ac cab`,
      `${route.fromName} to ${route.toName} luxury cab`,
      // ═══ Reverse route keywords ═══
      `${route.toName} to ${route.fromName} cab`,
      `${route.toName} to ${route.fromName} taxi`,
      `${route.toName} to ${route.fromName} one way cab`,
      `${route.toName} to ${route.fromName} taxi fare`,
      `${route.toName} to ${route.fromName} cab fare`,
      `${route.toName} to ${route.fromName} cab booking`,
      `${route.toName} to ${route.fromName} car rental`,
      // ═══ Time-specific keywords ═══
      `${route.fromName} to ${route.toName} cab 24/7`,
      `${route.fromName} to ${route.toName} night cab`,
      `${route.fromName} to ${route.toName} early morning cab`,
      `${route.fromName} to ${route.toName} midnight taxi`,
      `${route.fromName} to ${route.toName} cab today`,
      `${route.fromName} to ${route.toName} cab tomorrow`,
      // ═══ "Near me" & local keywords ═══
      `${route.fromName} to ${route.toName} cab near me`,
      `cab near me ${route.fromName}`,
      `taxi near me ${route.fromName} to ${route.toName}`,
      // ═══ Safety & comfort keywords ═══
      `safe cab ${route.fromName} to ${route.toName}`,
      `reliable taxi ${route.fromName} to ${route.toName}`,
      `comfortable cab ${route.fromName} to ${route.toName}`,
      `trusted cab ${route.fromName} to ${route.toName}`,
      // ═══ Comparison keywords ═══
      `${route.fromName} to ${route.toName} cab vs train`,
      `${route.fromName} to ${route.toName} cab vs bus`,
      `${route.fromName} to ${route.toName} cab vs ola`,
      `${route.fromName} to ${route.toName} no surge cab`,
      `${route.fromName} to ${route.toName} fixed rate cab`,
      // ═══ Purpose-specific keywords ═══
      `${route.fromName} to ${route.toName} cab for family`,
      `${route.fromName} to ${route.toName} cab for wedding`,
      `${route.fromName} to ${route.toName} cab for business`,
      `${route.fromName} to ${route.toName} airport cab`,
      `${route.fromName} to ${route.toName} station cab`,
      // ═══ Question-format keywords ═══
      `how much ${route.fromName} to ${route.toName} cab fare`,
      `what is taxi fare from ${route.fromName} to ${route.toName}`,
      `best way to go ${route.fromName} to ${route.toName}`,
      `${route.fromName} to ${route.toName} cab contact number`,
      `${route.fromName} to ${route.toName} cab phone number`,
      // ═══ Group & family travel ═══
      `${route.fromName} to ${route.toName} group cab`,
      `${route.fromName} to ${route.toName} family cab`,
      `${route.fromName} to ${route.toName} shared cab`,
      // ═══ Payment keywords ═══
      `${route.fromName} to ${route.toName} cab upi payment`,
      `${route.fromName} to ${route.toName} cab cash payment`,
      // ═══ ALTERNATE NAME KEYWORDS (misspellings & local names) ═══
      ...(input.fromAlternateNames || fromCity?.alternateNames || []).flatMap(alt => [
        `${alt} to ${route.toName} cab`,
        `${alt} to ${route.toName} taxi`,
        `${alt} to ${route.toName} taxi fare`,
        `${alt} to ${route.toName} cab fare`,
        `${alt} to ${route.toName} cab booking`,
        `${alt} to ${route.toName} distance`,
      ]),
      ...(input.toAlternateNames || toCity?.alternateNames || []).flatMap(alt => [
        `${route.fromName} to ${alt} cab`,
        `${route.fromName} to ${alt} taxi`,
        `${route.fromName} to ${alt} taxi fare`,
        `${route.fromName} to ${alt} cab fare`,
        `${route.fromName} to ${alt} cab booking`,
        `${route.fromName} to ${alt} distance`,
      ]),
      // ═══ HINDI / HINGLISH KEYWORDS ═══
      `${route.fromName} se ${route.toName} cab`,
      `${route.fromName} se ${route.toName} taxi`,
      `${route.fromName} se ${route.toName} cab kiraya`,
      `${route.fromName} se ${route.toName} kitna dur hai`,
      `${route.fromName} se ${route.toName} gaadi`,
      `${route.fromName} se ${route.toName} cab kitna lagta hai`,
      `${route.toName} se ${route.fromName} cab`,
      `${route.toName} se ${route.fromName} taxi kiraya`,
    ],
  };
}
