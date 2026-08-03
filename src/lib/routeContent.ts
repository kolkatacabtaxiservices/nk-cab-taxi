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

// ─── Distance-based travel tips — 3 pools for variety ───
function getTravelTips(distance: number, fromName: string, toName: string, via: string[]): string[] {
  const tips: string[] = [];
  const hash = (fromName + toName).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const v = hash % 3;

  if (distance < 100) {
    const shortTips = [
      [`${fromName} to ${toName} is a short drive — comfortable as a day trip with time to spare for sightseeing or errands.`, `Bring only what you need. A small backpack is more than enough for this distance.`, `Good for a quick business meeting, hospital visit, or a day with family in ${toName}.`],
      [`At under 100 km, this is one of the easiest intercity drives in the region. Traffic at the start or end of the route is usually the only variable.`, `Early morning departure (before 8 AM) means smooth sailing through city limits in both ${fromName} and ${toName}.`, `Our sedans handle this route in comfort — AC, clean interiors, and a driver who knows the road.`],
      [`${fromName} to ${toName} is a straightforward short trip. Even with a mid-trip stop, you'll be there in well under 2 hours.`, `Light traffic on weekday mornings makes this a particularly smooth drive. Weekends can get busy on the last 10–15 km into ${toName}.`, `Ideal if you need to be there and back the same day — we can arrange a round trip with the same driver.`],
    ];
    tips.push(...shortTips[v]);
  } else if (distance < 250) {
    const medTips = [
      [`Starting early is worth it for the ${fromName} to ${toName} drive — morning highway traffic is significantly lighter than afternoon.`, `There are good dhaba-style rest stops roughly halfway. Let the driver know if you'd like a break for chai and snacks.`, `Monsoon season (July–September) can add 30–45 minutes on some stretches. Factor that in if you have a flight or train to catch.`],
      [`A moderate distance, ${fromName} to ${toName} is best started before 7 AM if you want to arrive comfortable and without rushing.`, `Our drivers know the reliable dhabas and food joints on this route — just ask when you board if you'd like a stop.`, `Carry water and any medication you need. Phone charging cables are handy for longer highway sections.`],
      [`${fromName} to ${toName} at ${distance} km is a comfortable half-day drive. Leave by 6 AM and you'll arrive by late morning.`, `Highway stretches are generally smooth, though construction work can slow things down on certain patches — our drivers know the current diversions.`, `For monsoon travel on this route, plan for additional buffer time and carry a light jacket.`],
    ];
    tips.push(...medTips[v]);
  } else if (distance < 500) {
    const longTips = [
      [`A 5–6 AM departure from ${fromName} is strongly recommended for this journey. It gets you past city traffic early and into open highway before the midday heat.`, `Our driver will plan 1–2 rest breaks — typically around the halfway point for refreshments. You can also request an extra stop.`, `For overnight stays at ${toName}, let us know when booking — we can suggest budget hotels or rest houses near your destination.`, `Keep medicines, phone charger, and a bottle of water easily accessible during the drive.`],
      [`This is a proper highway journey — best enjoyed with an early start. Plan to leave ${fromName} by 5:30–6 AM.`, `Roadside food options are plentiful on this route — dhabas and highway restaurants have been there for years. Your driver knows the clean, reliable spots.`, `Round-trip option is worth considering for this distance — it's often more economical than two separate one-way bookings.`, `Toll charges will be communicated before the trip. Our drivers carry FASTag, so toll plazas are quick and cashless.`],
      [`For ${distance} km, a dawn departure from ${fromName} is ideal. Reach your destination before afternoon, with the whole day ahead.`, `One good rest stop halfway — for washroom, chai, and a stretch — makes the journey much more comfortable. Our drivers build this in.`, `If you're staying at ${toName}, our round-trip package keeps the same driver available for local travel throughout your visit.`, `Ensure your phone is charged before departure — GPS sharing with family is recommended for highway travel.`],
    ];
    tips.push(...longTips[v]);
  } else {
    const veryLongTips = [
      [`At ${distance} km, this is a full-day drive. Starting by 4:30–5 AM from ${fromName} gives you the best chance of arriving comfortably before nightfall.`, `For very long routes, our drivers are specifically selected for highway experience — calm, steady, and experienced with rest breaks.`, `Consider an overnight halt en route if you prefer a relaxed pace. We can suggest options based on your route.`, `Carry essential medicines, chargers, snacks, and sufficient UPI balance for toll payments. Toll charges on this route can be significant.`],
      [`A ${distance} km journey needs proper planning. We recommend a 4–5 AM start from ${fromName} and a scheduled rest stop at the midway point.`, `Our highway drivers know this corridor well — the best fuel stations, the most reliable food joints, and the stretches to drive carefully.`, `Round trip booking ensures the same driver stays with you — which matters on very long routes where continuity and familiarity help.`, `For safety, share your live location with a family member. All our vehicles are GPS-tracked by default.`],
      [`${distance} km is not to be taken lightly — but with a good driver and the right vehicle, it's very manageable. Start early (before 5 AM) from ${fromName}.`, `This route typically has 3–4 toll plazas. Our estimate for toll charges will be given when you book. FASTag is available on all our vehicles.`, `For overnight trips, driver accommodation is included in round-trip fares. Night allowance of ₹300 applies.`, `Keep snacks and water in the car. Highway dhabas are available but spacing can vary on this particular corridor.`],
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

// ─── Booking steps — 3 natural variations ───
function getBookingSteps(fromName: string, toName: string): { step: number; title: string; description: string }[] {
  // Add brand seed to booking steps hash so NK Cab & Taxi gets different step wording than source site
  const NK_BOOKING_SEED = 5;
  const rawHash = (fromName + toName).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const hash = rawHash + NK_BOOKING_SEED;
  const v = hash % 3;

  const step1 = [
    { step: 1, title: 'Call or WhatsApp', description: `Call ${BUSINESS.phone} or send a WhatsApp message. Let us know you need a cab from ${fromName} to ${toName}.` },
    { step: 1, title: 'Get in Touch', description: `Ring ${BUSINESS.phone} or drop us a WhatsApp. Just say — "${fromName} to ${toName} cab" and we'll take it from there.` },
    { step: 1, title: 'Contact Us', description: `Call or WhatsApp ${BUSINESS.phone}. Tell us you want a ${fromName} to ${toName} cab.` },
  ];
  const step2 = [
    { step: 2, title: 'Share Trip Details', description: `Tell us your exact pickup address in ${fromName}, travel date, departure time, number of passengers, and preferred vehicle. WhatsApp works great for this.` },
    { step: 2, title: 'Confirm Your Requirements', description: `Share your pickup point in ${fromName}, travel date and time, number of passengers, and any extras (extra luggage, child seat, etc.).` },
    { step: 2, title: 'Give Us the Details', description: `Pickup address in ${fromName}, travel date, time, number of passengers, vehicle preference. Takes about a minute.` },
  ];
  const step3 = [
    { step: 3, title: 'Choose Your Vehicle', description: `Pick from our fleet: Sedan (Dzire, Amaze — up to 4 pax), SUV (Ertiga, Innova — up to 6 pax), Innova Crysta (up to 7 pax), or Tempo Traveller for larger groups.` },
    { step: 3, title: 'Select a Vehicle', description: `Sedan for individuals and couples, SUV for families of 5–6, Innova Crysta for premium comfort, Tempo Traveller for groups of 8+. We'll advise if unsure.` },
    { step: 3, title: 'Pick the Right Car', description: `Sedan (4 pax), SUV Ertiga (6 pax), Innova Crysta (7 pax), or Tempo Traveller (12–17 pax). We'll suggest the best option based on your group.` },
  ];
  const step4 = [
    { step: 4, title: 'Instant Confirmation', description: `Booking confirmed in under 2 minutes. You'll receive the driver's name, phone number, vehicle details, and fare breakdown on WhatsApp.` },
    { step: 4, title: 'Get Your Booking Confirmed', description: `Within 2 minutes of sharing details, you'll have a confirmed booking with driver contact, vehicle number, and fare on WhatsApp.` },
    { step: 4, title: 'Confirmation in 2 Minutes', description: `Driver assigned and details sent to your phone within 2 minutes. Name, vehicle, contact number — all on WhatsApp before departure.` },
  ];
  const step5 = [
    { step: 5, title: 'Driver Picks You Up', description: `Your driver arrives at the pickup point in ${fromName} 15 minutes early. Board your clean AC cab and relax — they know the route to ${toName}.` },
    { step: 5, title: 'Travel Comfortably', description: `Driver reaches your ${fromName} pickup address before the scheduled time. Sit back, enjoy the AC, and arrive at ${toName} refreshed.` },
    { step: 5, title: 'Enjoy the Journey', description: `Driver at your door in ${fromName}, 15 minutes ahead of schedule. Comfortable AC cab, experienced highway driver, smooth ride to ${toName}.` },
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

  // Paragraph 1: Route overview — 12-way natural variation
  const intros = [
    `${route.fromName} to ${route.toName} by cab takes around ${route.duration} hours over ${route.distance} km. ${BUSINESS.name} runs this route daily — one-way and round-trip. Sedan starts at ₹${route.priceSaloon}${fromStateName && toStateName && fromStateName !== toStateName ? `, crossing from ${fromStateName} into ${toStateName}` : ''}. AC vehicle, verified driver, fixed fare. Book: ${BUSINESS.phone}.`,
    `Planning the ${route.fromName}–${route.toName} drive? It's ${route.distance} km, roughly ${route.duration} hours on the road. ${BUSINESS.name} covers this route with AC sedans from ₹${route.priceSaloon}, SUVs and Innova Crysta for larger groups. No surge pricing, no last-minute cancellations. Call ${BUSINESS.phone}.`,
    `The road distance from ${route.fromName} to ${route.toName} is approximately ${route.distance} km — about ${route.duration} hours by car. ${BUSINESS.name} provides daily cab service on this route starting at ₹${route.priceSaloon} for a clean, AC sedan. One-way, round-trip, or custom multi-day — we handle it. ${BUSINESS.phone}.`,
    `${route.fromName} to ${route.toName} outstation cab with ${BUSINESS.name}: ${route.distance} km, ${route.duration} hours, starting at ₹${route.priceSaloon}. Our drivers know this highway well — best timings, rest stops, and which lanes to use through major towns en route. Fixed fares, no drama. Call ${BUSINESS.phone}.`,
    `Looking for a taxi from ${route.fromName} to ${route.toName}? The drive is ${route.distance} km, typically ${route.duration} hours. ${BUSINESS.name} operates on this route with sedans from ₹${route.priceSaloon}, SUVs for families, and Tempo Travellers for groups. Drivers are verified; rates are fixed. Call ${BUSINESS.phone}.`,
    `${BUSINESS.name} runs ${route.fromName} to ${route.toName} cab service every day. Distance: ${route.distance} km. Travel time: approx ${route.duration} hours. Sedan from ₹${route.priceSaloon}. AC, police-verified drivers, no surge pricing. Available 24/7. Instant booking confirmation: ${BUSINESS.phone}.`,
    `A cab from ${route.fromName} to ${route.toName} covers ${route.distance} km in about ${route.duration} hours. ${BUSINESS.name} has been running this route since ${BUSINESS.foundYear} — our drivers know the road, the rest stops, and the fastest lanes. Sedan from ₹${route.priceSaloon}. Book by calling ${BUSINESS.phone}.`,
    `${route.fromName} to ${route.toName}: ${route.distance} km, ${route.duration} hours, sedan from ₹${route.priceSaloon}. ${BUSINESS.name} provides outstation cab service on this route with AC vehicles and verified highway drivers. One-way or round-trip — call ${BUSINESS.phone} for instant confirmation.`,
    `Need a cab from ${route.fromName} to ${route.toName}? ${BUSINESS.name} covers this ${route.distance} km, ${route.duration}-hour route daily. Flat fares — Sedan ₹${route.priceSaloon}, SUV ₹${route.priceSuv}, Innova ₹${Math.round(route.priceSuv * 1.12)}. Same fare at 3 AM as at noon. Driver details on WhatsApp in 2 minutes: ${BUSINESS.phone}.`,
    `Travelling from ${route.fromName} to ${route.toName}? The road distance is ${route.distance} km and the journey takes about ${route.duration} hours with our professional drivers. ${BUSINESS.name} offers AC cabs on this route from ₹${route.priceSaloon}. No surge, no hidden charges. 24/7 booking: ${BUSINESS.phone}.`,
    `${route.fromName}–${route.toName} cab fare starts at ₹${route.priceSaloon} (Sedan) with ${BUSINESS.name}. The trip is ${route.distance} km, taking around ${route.duration} hours. Our outstation drivers are specifically experienced on this highway corridor. Fixed rates, easy booking, instant confirmation on WhatsApp: ${BUSINESS.phone}.`,
    `Book a private cab from ${route.fromName} to ${route.toName} — ${route.distance} km, ${route.duration} hours in an AC vehicle. ${BUSINESS.name} operates this route with clean sedans from ₹${route.priceSaloon} and SUVs for larger groups. No minimum booking, no app download needed. Just call ${BUSINESS.phone}.`,
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
