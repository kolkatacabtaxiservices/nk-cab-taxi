import { BUSINESS, getStatePriceLabels } from './data';

interface ServiceContentInput {
  cityName: string;
  stateName: string;
  stateSlug: string;
  citySlug: string;
  landmarks?: string[];
  airport?: string;
  railway?: string;
}

function getHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h += s.charCodeAt(i);
  return h;
}

// ─────────────────────────────────────────────────────────────
// LOCAL TAXI SERVICE
// ─────────────────────────────────────────────────────────────
export function generateLocalServiceContent(input: ServiceContentInput) {
  const { cityName, stateName, stateSlug, landmarks, airport, railway } = input;
  const prices = getStatePriceLabels(stateSlug || 'west-bengal');
  const landmarkList = landmarks?.slice(0, 6).join(', ') || 'railway station, bus stand, major markets';
  const h = getHash(cityName + 'local');
  const v = h % 4;

  const aboutVariants = [
    // Variant 0 — Conversational, problem-first
    [
      `Getting around ${cityName} on a busy weekday — hospital appointment in the morning, school pickup in the afternoon, grocery run in the evening — is exactly the kind of situation our local taxi service was built for. ${BUSINESS.name} runs local cab service in ${cityName} with AC cars, honest pricing, and no surge pricing whatsoever. Call ${BUSINESS.phone} and we'll have a driver confirmed in under 2 minutes.`,
      `Our local packages in ${cityName} are built around how people actually use a cab. The 4-hour / 40-km package (Sedan ${prices.localPkgSedan}) covers a handful of errands, a hospital visit, or a few meetings. The 8-hour / 80-km package covers a full day of city travel — perfect for business calls across town, sightseeing, or when you need a cab on standby. SUV and Innova packages available for groups.`,
      `What sets our local cab apart from apps in ${cityName}: fixed rates, no cancellations after you confirm, the same driver for your entire trip, and drivers who actually know ${cityName}'s one-ways and shortcuts. Our local cab customers include hospital patients, corporate executives, school parents, and tourists — they stay because the service is dependable.`,
      `Our drivers know ${cityName} well — from the quickest route from the station to a particular mohalla, to which hospital gate to use for outpatient visits. That local knowledge saves you time and frustration. All cars are AC, sanitized, and GPS-tracked. Payment is at trip end — Cash, UPI, or Card. No advance required.`,
      `Book local taxi in ${cityName}: call ${BUSINESS.phone} or WhatsApp. Tell us your pickup address, first destination, and how long you roughly need the cab. We assign a driver who stays with you for the duration. Available 24/7, 365 days — including Durga Puja, Diwali, and public holidays at the same fixed rate.`,
      `${BUSINESS.name} covers all areas in ${cityName} for local taxi: ${landmarkList}${railway ? `, ${railway}` : ''}. Whether you live in a main locality or a residential colony on the outskirts — our drivers know the way. For office-goers who need daily morning-evening service, ask us about monthly packages with a 15–20% discount.`,
    ],
    // Variant 1 — Feature-led
    [
      `${BUSINESS.name} has been providing local taxi service in ${cityName}, ${stateName} since ${BUSINESS.foundYear}. If you need a cab for a short trip or an all-day booking, our local packages have you covered. What makes the difference: police-verified drivers, AC cars, and the same fixed rate regardless of time of day or festival season. Call ${BUSINESS.phone} to book.`,
      `Local packages in ${cityName} — 4-hour/40-km (Sedan ${prices.localPkgSedan}): ideal for hospital visits, bank work, or 2–3 short stops. 8-hour/80-km (Sedan ₹2,000): suitable for full-day city travel, corporate meetings, or guided sightseeing. SUV and Innova Crysta packages for larger groups. Extra km at ₹${prices.sedanRate}/km, extra hour at ₹150/hr.`,
      `Unlike app cabs, ${BUSINESS.name} local taxi in ${cityName} doesn't cancel after accepting, doesn't surge during peak hours, and doesn't ask you to walk 200 metres to the 'closest point.' The driver comes to your door, waits while you finish an errand, and takes you where you need to go — without drama.`,
      `Our vehicles are AC, sanitized after each trip, and maintained at authorised service centres. We use Sedan (Swift Dzire, Honda Amaze), SUV (Ertiga, Innova), Innova Crysta, and Tempo Traveller for groups. GPS tracking on all vehicles. All drivers hold valid commercial licences and have passed police background checks.`,
      `To book a local cab in ${cityName}, call ${BUSINESS.phone} or send a WhatsApp. Share your pickup address and itinerary. We confirm in 2 minutes and the driver reaches you 10–15 minutes before the scheduled time. Payment at trip end — Cash, UPI, or Card. No advance payment needed for regular local bookings.`,
      `We cover all areas of ${cityName} for local pick-up including ${landmarkList}${airport ? `, ${airport}` : ''}${railway ? `, and ${railway}` : ''}. Corporate accounts with GST invoicing are available for regular business users. Monthly contracts save 15–20% on local taxi costs in ${cityName}.`,
    ],
    // Variant 2 — Specific and factual
    [
      `Local taxi in ${cityName} from ${BUSINESS.name}: fixed-rate AC cab service for city travel. Whether it's a morning commute, medical appointment, school run, or an all-day sightseeing trip — we're available round the clock. No app download needed. One call to ${BUSINESS.phone} and your cab is confirmed in 2 minutes.`,
      `Two main local packages in ${cityName}: 4-hour / 40-km (Sedan ${prices.localPkgSedan}, SUV ₹1,800) — enough for a hospital visit, shopping, or 2–3 errands. 8-hour / 80-km (Sedan ₹2,000, SUV ₹2,500, Innova Crysta ₹3,100) — full-day travel for business or leisure. Extra km: Sedan ₹${prices.sedanRate}/km; extra hour: ₹150.`,
      `Why passengers in ${cityName} prefer ${BUSINESS.name} for local taxi: same driver for the whole trip (no mid-trip changes), no cancellations after confirmation, driver knows the city well, and fixed pricing even on festival days. We've been operating in this region since ${BUSINESS.foundYear} — long enough to understand what local commuters actually need.`,
      `All vehicles in our ${cityName} local fleet: Sedan (Swift Dzire, Honda Amaze — 4 passengers), SUV (Ertiga, Innova — 6 passengers), Innova Crysta (7 passengers), Tempo Traveller (12–17 passengers). Every vehicle is AC, cleaned before each trip, and GPS-tracked for your safety.`,
      `Booking: call or WhatsApp ${BUSINESS.phone}. Share pickup location, destinations, date and time. Receive confirmation within 2 minutes — driver name, contact number, vehicle details sent to your phone. Driver arrives 10 minutes before pickup. Payment by Cash, UPI, or Card at trip end.`,
      `Coverage in ${cityName}: all residential areas, hospitals, markets, offices, ${landmarkList}${railway ? `, ${railway}` : ''}${airport ? `, and ${airport}` : ''}. For working professionals who commute daily, monthly local packages offer significant savings — ask when you call.`,
    ],
    // Variant 3 — Trust and local knowledge
    [
      `When you need a local cab in ${cityName}, you want someone who knows the city — not an algorithm routing you through the longest possible path. ${BUSINESS.name} local drivers have been navigating ${cityName} for years. They know the traffic patterns, the one-way streets, and the shortcut that saves 15 minutes during school hours. Fixed fares from ${prices.localPkgSedan} (4hr). Call ${BUSINESS.phone}.`,
      `Our local packages in ${cityName} are priced to make sense: 4-hour/40-km at ${prices.localPkgSedan} for quick trips; 8-hour/80-km at ₹2,000 for a full day's travel. If your trip exceeds the package, extra km are charged at ₹${prices.sedanRate}/km and extra hours at ₹150/hr — nothing hidden, nothing unexpected. SUVs and Innova Crysta packages available for families.`,
      `Festival days are when most cab apps fail in ${cityName} — drivers unavailable, surge pricing tripling fares, cancellations. We've built our service precisely for those days. Same fixed fare on Durga Puja evening as on a quiet Tuesday morning. 24/7, 365 days. If you've had trouble with apps during peak times, give us a try: ${BUSINESS.phone}.`,
      `AC, GPS-tracked, sanitized — those are the baseline for any car in our local fleet. Beyond that: drivers who are police-verified, courteous, and experienced in ${cityName}'s roads. They wait while you're inside a hospital or bank without extra charges (within package time).`,
      `To hire a local cab in ${cityName}: call or WhatsApp ${BUSINESS.phone}. Tell us where you are, where you need to go, and for how long. We'll confirm your booking in minutes and ensure the driver reaches you on time. Cash, UPI, or Card — pay at the end.`,
      `Serving all of ${cityName} including ${landmarkList}${airport ? `, ${airport}` : ''}. Daily commuters, corporate travelers, tourists, patients, students — we've served them all in ${cityName}. Our local cab service is designed to be the most reliable option in the city.`,
    ],
  ];

  const content = aboutVariants[v];

  return {
    aboutContent: content,
    useCases: [
      { icon: '🏥', title: 'Hospital & Medical', desc: `Appointments, emergency drops, discharge pickups across ${cityName}` },
      { icon: '🛍️', title: 'Shopping Trips', desc: `Malls, markets, and wholesale areas across ${cityName}` },
      { icon: '🏢', title: 'Office & Corporate', desc: `Daily commute, client visits, IT park and business district travel` },
      { icon: '🎓', title: 'School & College', desc: `Exam centres, admissions, coaching classes and institutions` },
      { icon: '✈️', title: 'Airport Transfer', desc: airport ? `Pickup and drop at ${airport}` : `Airport pickup and drop service` },
      { icon: '🚂', title: 'Railway Station', desc: railway ? `${railway} pickup and drop — any train, any time` : `Station pickups and drops, all hours` },
      { icon: '🎊', title: 'Events & Functions', desc: `Weddings, Puja pandals, parties, family gatherings` },
      { icon: '🏛️', title: 'City Sightseeing', desc: `Local tour packages, tourist spots, day trips from ${cityName}` },
    ],
    whyChooseUs: [
      `24/7 cab availability in ${cityName} — including 3 AM, public holidays, and major festivals`,
      'Police-verified drivers with 5+ years of local driving experience',
      'Fixed rates with zero surge pricing — same fare during Durga Puja, Diwali, and peak hours',
      'AC, GPS-tracked, and sanitized vehicles — Sedan, SUV, Innova Crysta, Tempo Traveller',
      'Booking confirmed in 2 minutes on WhatsApp with driver name, number, and vehicle details',
      `Doorstep pickup from anywhere in ${cityName} — home, office, hotel, hospital`,
      'Pay at trip end — Cash, UPI, or Card. No advance payment required',
      'Free cancellation up to 2 hours before pickup',
    ],
    faqs: [
      {
        question: `What is the local taxi fare in ${cityName}?`,
        answer: `Local packages in ${cityName}: 4hr/40km — Sedan ${prices.localPkgSedan}, SUV ₹1,800. 8hr/80km — Sedan ₹2,000, SUV ₹2,500, Innova Crysta ₹3,100, Tempo ₹3,700. Extra km: ₹${prices.sedanRate} (Sedan), ₹${prices.suvRate} (SUV). Extra hour: ₹150. Call ${BUSINESS.phone} for exact quotes.`,
      },
      {
        question: `What areas are covered for local taxi in ${cityName}?`,
        answer: `We cover all of ${cityName} including ${landmarkList}${airport ? `, ${airport}` : ''}${railway ? `, ${railway}` : ''}. Every locality, residential colony, hospital, office, and commercial area. If you're unsure whether we cover your area — just call ${BUSINESS.phone}.`,
      },
      {
        question: `Can I book a local cab for half day in ${cityName}?`,
        answer: `Yes. Our 4-hour / 40-km package (Sedan ${prices.localPkgSedan}) is perfect for a half-day in ${cityName} — hospital visit, a few meetings, shopping, or a short sightseeing trip. Call ${BUSINESS.phone}.`,
      },
      {
        question: `Do you provide AC local cabs in ${cityName}?`,
        answer: `Every vehicle we operate in ${cityName} is AC — Sedan (Swift Dzire, Honda Amaze), SUV (Ertiga, Innova), Innova Crysta, and Tempo Traveller. AC is always on.`,
      },
      {
        question: `Is there surge pricing for local taxi in ${cityName}?`,
        answer: `Never. ${BUSINESS.name} charges fixed rates in ${cityName}. The same rate at 3 AM, during Durga Puja, Diwali, New Year, and peak hours. No dynamic pricing — ever.`,
      },
      {
        question: `How can I book a local cab in ${cityName}?`,
        answer: `Call ${BUSINESS.phone} or send a WhatsApp. Tell us: pickup address, destination(s), date, time, vehicle type. Confirmation in 2 minutes. Driver arrives 10–15 minutes early. Pay at trip end.`,
      },
      {
        question: `Do you provide corporate cab service in ${cityName}?`,
        answer: `Yes. Monthly cab contracts for companies in ${cityName} with 15–20% discount, GST invoices, and dedicated account management. Call ${BUSINESS.phone} for corporate enquiries.`,
      },
      {
        question: `Can I use local taxi for wedding functions in ${cityName}?`,
        answer: `Yes. We provide decorated baraat cars, vidaai cars, and guest shuttles for wedding functions in ${cityName}. Sedan, Innova Crysta, and Fortuner — all can be decorated with flowers and ribbons.`,
      },
      {
        question: `What payment methods do you accept in ${cityName}?`,
        answer: `Cash (at trip end), UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Card, Bank Transfer. No advance for regular bookings. Corporate clients get monthly billing with GST invoices.`,
      },
      {
        question: `Can I book local taxi for outstation from ${cityName}?`,
        answer: `Yes. Beyond local taxi, we run outstation one-way and round-trip cab from ${cityName} to cities across ${stateName} and neighbouring states. Call ${BUSINESS.phone} for outstation quotes.`,
      },
    ],
    popularSearches: [
      `local taxi ${cityName}`, `cab service ${cityName}`, `taxi in ${cityName}`,
      `hourly cab ${cityName}`, `local cab booking ${cityName}`, `cheap taxi ${cityName}`,
      `${cityName} taxi service`, `${cityName} cab booking`, `taxi near me ${cityName}`,
      `cab for hospital ${cityName}`, `${cityName} airport taxi`, `best cab service ${cityName}`,
      `${cityName} local taxi fare`, `taxi rental ${cityName}`, `car rental ${cityName}`,
    ],
  };
}

// ─────────────────────────────────────────────────────────────
// OUTSTATION SERVICE
// ─────────────────────────────────────────────────────────────
export function generateOutstationServiceContent(input: ServiceContentInput) {
  const { cityName, stateName, stateSlug } = input;
  const prices = getStatePriceLabels(stateSlug || 'west-bengal');
  const h = getHash(cityName + 'outstation');
  const v = h % 3;

  const aboutVariants = [
    [
      `Planning a trip out of ${cityName}? ${BUSINESS.name} runs outstation cab service from ${cityName}, ${stateName} to all major cities across West Bengal, Jharkhand, Odisha, Bihar, and beyond. Our intercity taxis are AC, driven by highway-experienced professionals, and priced at flat rates — no surge, no surprise billing. Sedan from ${prices.sedanPerKm}. Call ${BUSINESS.phone} for instant booking.`,
      `Fleet options for outstation from ${cityName}: Sedan (Swift Dzire, Honda Amaze) at ${prices.sedanPerKm} — most popular for individuals and couples. SUV (Ertiga, Innova) at ${prices.suvPerKm} for families of 5–6. Innova Crysta at ${prices.crystaPerKm} for premium comfort. Tempo Traveller (12+ seats) at ${prices.tempoPerKm} for tour groups. All fares include fuel and driver; toll and parking are additional.`,
      `One-way or round trip? If you're travelling one direction and not returning the same way, one-way cab is 40–50% cheaper than a round-trip booking. For multi-day trips where you need a driver to stay with you, round trip is the smarter choice. Both options available from ${cityName} — call ${BUSINESS.phone} for advice on which suits your trip.`,
      `Our outstation drivers from ${cityName} are specifically selected for intercity routes. They know the national highways — when traffic builds, which fuel stations are reliable, and the best spots to stop for a meal. Each driver carries a valid commercial licence, has passed police verification, and is experienced on routes connecting ${cityName} to the surrounding region.`,
      `Booking outstation cab from ${cityName}: call or WhatsApp ${BUSINESS.phone}. Share your pickup address, destination, travel date and time, and number of passengers. We send you a fare quote and confirm in 2 minutes. Driver arrives 15 minutes before departure. Free cancellation up to 4 hours before the trip.`,
      `${BUSINESS.name} also handles corporate outstation travel from ${cityName} — monthly billing, GST invoices, multi-city booking support. Need a one-way airport cab, a multi-city business tour, or a large-group Tempo Traveller? We have it covered. Call ${BUSINESS.phone}.`,
    ],
    [
      `Outstation cab from ${cityName} by ${BUSINESS.name}: reliable, fixed-fare intercity taxi to all destinations across the East India region. Whether you're heading for a family vacation, business trip, pilgrimage tour, or wedding function — our outstation service gives you the comfort of a private cab without the unpredictability of app-based booking. From ${prices.sedanPerKm}. Book: ${BUSINESS.phone}.`,
      `Vehicle breakdown for outstation from ${cityName}: AC Sedan starts at ${prices.sedanPerKm} (ideal up to 3 passengers with moderate luggage); SUV at ${prices.suvPerKm} fits a family comfortably; Innova Crysta at ${prices.crystaPerKm} is the premium pick for 6–7 passengers; Tempo Traveller at ${prices.tempoPerKm} handles large groups and group tours. All fares are all-inclusive of fuel and driver charge.`,
      `Both one-way and round-trip outstation available from ${cityName}. One-way: you pay for the distance you travel, nothing more. Round-trip: driver stays with you throughout, useful when you'll be sightseeing or need flexibility. Minimum 250 km/day applies for round trips. Driver allowance of ₹300/night for multi-day trips.`,
      `Drivers for our outstation routes from ${cityName} are not the same as local city drivers — they're experienced highway professionals who know how to pace long-distance journeys. They carry everything needed: emergency toolkit, valid documents, rest break knowledge, and a professional attitude for the road.`,
      `To book your outstation cab from ${cityName}: call ${BUSINESS.phone} or WhatsApp us. You'll get a clear fare quote before you confirm — no guesswork. Booking confirmation with driver details arrives in 2 minutes. Pay at trip end. Free cancellation available up to 4 hours before pickup.`,
      `Special outstation services from ${cityName}: corporate travel with monthly invoicing, wedding group transport in Tempo Traveller, pilgrimage tours to Puri, Varanasi, Gaya, and temple circuits. Multi-day customised itineraries available. Call ${BUSINESS.phone} for custom quotes.`,
    ],
    [
      `Need a cab from ${cityName} to another city? ${BUSINESS.name} covers outstation routes from ${cityName} across ${stateName} and beyond — at fixed, transparent rates. No last-minute cancellations, no surge pricing, no hidden toll charges. Sedan from ${prices.sedanPerKm}. Available 24/7. Call ${BUSINESS.phone}.`,
      `Our outstation vehicle options from ${cityName}: Sedan (${prices.sedanPerKm}), SUV Ertiga/Innova (${prices.suvPerKm}), premium Innova Crysta (${prices.crystaPerKm}), and 12-seater Tempo Traveller (${prices.tempoPerKm}). All fares include the driver's charges and fuel. Toll, parking, and state permit are additional — we inform you of these before confirmation so there are no surprises.`,
      `One-way outstation from ${cityName}: you pay only for the kilometres you actually travel. This is the most economical option when you're not returning the same way. Round-trip: same driver stays with you for the full duration — includes sightseeing at the destination if you need it. Our team helps you choose based on your travel plan. Call ${BUSINESS.phone}.`,
      `Long-distance driving requires a different kind of skill and awareness. Our outstation drivers from ${cityName} are selected for highway experience, calm temperament, and familiarity with the key routes — NH-16, NH-6, NH-2, and state highways across this region. Each has a valid commercial driving licence and a clean background check.`,
      `Booking is quick. Call ${BUSINESS.phone} or WhatsApp us. Give us your trip details and get a fare quote within minutes. Confirmation arrives with driver details before your trip. Cancel for free up to 4 hours before departure. Payment at trip end — Cash, UPI, or Card.`,
      `We also run specialised outstation services from ${cityName}: airport cab (one-way outstation drop to nearby airports), group Tempo Traveller tours, wedding transport for destination weddings, and corporate multi-city booking. ${BUSINESS.name} has been operating since ${BUSINESS.foundYear} — experience matters on the highway.`,
    ],
  ];

  return {
    aboutContent: aboutVariants[v],
    faqs: [
      { question: `What is the outstation cab fare from ${cityName}?`, answer: `Outstation fares from ${cityName}: Sedan ${prices.sedanPerKm}, SUV ${prices.suvPerKm}, Innova Crysta ${prices.crystaPerKm}, Tempo ${prices.tempoPerKm}. Minimum 150 km/day (one-way), 250 km/day (round trip). Toll and parking extra. Call ${BUSINESS.phone} for exact quote.` },
      { question: `Can I book one-way outstation cab from ${cityName}?`, answer: `Yes. One-way cab from ${cityName} means you pay only for your direction — no return-leg charges. Most affordable for single-direction intercity travel. Available to all destinations.` },
      { question: `What is included in the outstation fare from ${cityName}?`, answer: `Our outstation fares from ${cityName} include fuel, driver charges, and GST. Toll, parking, state permit, and driver night allowance (₹300/night for overnight trips) are extra and paid directly at the point.` },
      { question: `How far in advance should I book outstation cab from ${cityName}?`, answer: `2–4 hours is usually sufficient for same-day bookings. For festival days (Durga Puja, Diwali, Eid) and peak travel periods, book 24 hours in advance to ensure your preferred vehicle is available.` },
      { question: `Do you provide multi-day outstation from ${cityName}?`, answer: `Yes. Multi-day outstation packages from ${cityName} — 2, 3, 5, or more days. Minimum 250 km/day charged. Driver accommodation and allowance included. Ideal for week-long tours or extended business travel. Call ${BUSINESS.phone}.` },
      { question: `Is overnight outstation available from ${cityName}?`, answer: `Yes, 24/7. Early morning departures, overnight journeys, late-night returns — all available at the same fixed rate. Night allowance of ₹300 applies for driver accommodation during 10 PM–6 AM travel.` },
      { question: `What vehicles are available for outstation from ${cityName}?`, answer: `Sedan (Swift Dzire, Honda Amaze — 4 pax), SUV (Ertiga, Innova — 6 pax), Innova Crysta (7 pax), Tempo Traveller (12–17 pax). All AC, GPS-tracked, sanitized. Choice depends on group size and budget.` },
      { question: `Can I get corporate outstation from ${cityName}?`, answer: `Yes. Corporate outstation accounts from ${cityName} with 15–20% bulk discount, monthly billing, GST invoices, and dedicated fleet. Ideal for business travel, client transport, and employee logistics. Call ${BUSINESS.phone}.` },
    ],
    popularSearches: [
      `outstation cab from ${cityName}`, `outstation taxi ${cityName}`, `intercity cab ${cityName}`,
      `${cityName} outstation cab service`, `cab from ${cityName}`, `${cityName} to kolkata cab`,
      `long distance cab ${cityName}`, `cheap outstation cab ${cityName}`, `book outstation cab ${cityName}`,
    ],
  };
}

// ─────────────────────────────────────────────────────────────
// ONE-WAY SERVICE
// ─────────────────────────────────────────────────────────────
export function generateOneWayServiceContent(input: ServiceContentInput) {
  const { cityName, stateName, stateSlug } = input;
  const prices = getStatePriceLabels(stateSlug || 'west-bengal');
  const h = getHash(cityName + 'oneway');
  const v = h % 3;

  const aboutVariants = [
    [
      `One-way cab from ${cityName} is one of the most searched and most misunderstood cab categories. Here's how it actually works with ${BUSINESS.name}: you pay only for the distance from ${cityName} to your destination. The driver's return journey is not your concern. This makes it 40–50% cheaper than a round-trip booking when you don't need the cab coming back. Sedan from ${prices.sedanPerKm}. Book: ${BUSINESS.phone}.`,
      `One-way cab service from ${cityName} to all cities: ${stateName}, West Bengal, Jharkhand, Odisha, Bihar, and beyond. Whether it's a one-time airport drop, a point-to-point business trip, or a family visit where you're returning by train — one-way is the smart and economical choice. Sedan at ${prices.sedanPerKm}, SUV at ${prices.suvPerKm}.`,
      `Fare calculation for one-way cab from ${cityName}: Base fare + (Distance × Per-km rate). No empty-return charges, no minimum-km tricks. A 200 km one-way in Sedan costs approximately ₹${Math.round(200 * prices.sedanRate + 500)}. Compare that to a round trip which would charge for 400 km minimum. Clear, honest billing — no guesswork.`,
      `All one-way cabs from ${cityName} are AC, GPS-tracked, and driven by verified drivers. Same no-surge pricing guarantee applies — the fare doesn't go up on festival days or late nights. Free cancellation up to 4 hours before departure. Instant WhatsApp confirmation with driver contact and vehicle number.`,
      `Book one-way cab from ${cityName}: call or WhatsApp ${BUSINESS.phone}. Share your pickup address, destination, travel date and time. Receive fare quote and booking confirmation in 2 minutes. Available 24/7.`,
    ],
    [
      `${BUSINESS.name} offers affordable one-way cab service from ${cityName}, ${stateName}. You're charged for the kilometres you travel — and only those. No guessing, no inflated round-trip billing. If you're heading somewhere and not returning the same day, one-way is the sensible option. Sedan from ${prices.sedanPerKm}.`,
      `Available one-way routes from ${cityName}: to all cities in ${stateName} and neighbouring states including West Bengal, Jharkhand, Odisha, and Bihar. Airport drops, station transfers, inter-city business trips, and one-way family travel — all handled. SUV and Innova options for groups. Call ${BUSINESS.phone} for any route.`,
      `How one-way fare from ${cityName} is calculated: it's simply distance × per-km rate plus a base fare. The driver travels one way with you — their return is not billed to you. This is why one-way is consistently the cheapest option for single-direction travel, especially for distances over 100 km.`,
      `Safety, comfort, and reliability don't change for one-way trips. AC vehicle, verified driver, GPS tracking, and fixed rates — all exactly the same as our round-trip service. The only difference is you pay less because you're only going one way.`,
      `To book one-way cab from ${cityName}: call ${BUSINESS.phone} or WhatsApp us anytime. We confirm in 2 minutes and send driver details to your phone. Cancel for free up to 4 hours before. Pay at destination — Cash, UPI, or Card.`,
    ],
    [
      `The problem with round-trip bookings when you don't need to come back: you pay for the driver's return. Our one-way cab from ${cityName} doesn't do that. You pay exactly for the distance from ${cityName} to your destination — transparent, fair, and 40–50% cheaper for single-direction travel. Sedan from ${prices.sedanPerKm}. ${BUSINESS.phone}.`,
      `One-way cab destinations from ${cityName}: anywhere in ${stateName}, plus West Bengal, Jharkhand, Odisha, Bihar routes. Popular for airport drops (fastest way from ${cityName} to the nearest airport), railway station transfers, business city-hops, and family visits. We operate 24/7 with the same fixed rate every day.`,
      `One-way fare is calculated per km: Sedan at ${prices.sedanPerKm}, SUV at ${prices.suvPerKm}, Innova Crysta at ${prices.crystaPerKm}, Tempo Traveller at ${prices.tempoPerKm}. Toll and parking are additional and informed upfront. Driver and fuel charges are included. No hidden charges.`,
      `All vehicles used for one-way trips from ${cityName} are the same AC, sanitized, GPS-tracked fleet as our other services. Police-verified experienced highway drivers. Same service quality regardless of whether you're going one way or both ways.`,
      `Book your one-way cab from ${cityName} now: call or WhatsApp ${BUSINESS.phone}. 24/7 available, confirmed in 2 minutes, driver details on WhatsApp. Cancel free up to 4 hours before. Pay at your destination.`,
    ],
  ];

  return {
    aboutContent: aboutVariants[v],
    faqs: [
      { question: `What is the one-way cab fare from ${cityName}?`, answer: `One-way fares from ${cityName}: Sedan ${prices.sedanPerKm}, SUV ${prices.suvPerKm}, Tempo ${prices.tempoPerKm}. You pay only for your direction — no return charges. Toll and parking extra. Call ${BUSINESS.phone}.` },
      { question: `Is one-way cab cheaper than round trip from ${cityName}?`, answer: `Yes, typically 40–50% cheaper for single-direction travel. You only pay for the distance you travel; the driver's return journey is not billed to you. Best option when you don't need to return the same day.` },
      { question: `Can I book one-way cab for airport drop from ${cityName}?`, answer: `Yes. One-way airport drop from ${cityName} to any nearby airport. Driver drops you at the departure terminal. No return charges. Call ${BUSINESS.phone}.` },
      { question: `How is one-way fare calculated from ${cityName}?`, answer: `One-way fare = Distance × Per-km rate + Base fare. Sedan: ${prices.sedanPerKm}. SUV: ${prices.suvPerKm}. Toll and parking are additional, communicated upfront. No hidden charges.` },
      { question: `Is one-way cab available at night from ${cityName}?`, answer: `Yes, 24/7. Same fixed rate at any hour — no night surcharge. Driver night allowance of ₹300 applies for journeys with an overnight stay (10 PM–6 AM).` },
      { question: `Do you provide one-way cab to all cities from ${cityName}?`, answer: `Yes. One-way cab from ${cityName} to all cities in ${stateName}, West Bengal, Jharkhand, Odisha, Bihar, and beyond. No route too far. Call ${BUSINESS.phone} for any destination.` },
    ],
    popularSearches: [
      `one way cab from ${cityName}`, `one way taxi ${cityName}`, `drop taxi ${cityName}`,
      `${cityName} one way cab service`, `cheap one way cab ${cityName}`, `one side taxi ${cityName}`,
      `point to point cab ${cityName}`, `single trip taxi ${cityName}`, `one way cab booking ${cityName}`,
    ],
  };
}

// ─────────────────────────────────────────────────────────────
// ROUND TRIP SERVICE
// ─────────────────────────────────────────────────────────────
export function generateRoundTripServiceContent(input: ServiceContentInput) {
  const { cityName, stateName, stateSlug } = input;
  const prices = getStatePriceLabels(stateSlug || 'west-bengal');
  const h = getHash(cityName + 'roundtrip');
  const v = h % 3;

  const aboutVariants = [
    [
      `Round-trip cab from ${cityName} means one driver, one vehicle, your entire journey. Whether it's a 2-day family trip, a week-long pilgrimage tour, or a multi-city business circuit — the driver stays with you throughout, handles all local pickups at the destination, and brings you back home. ${BUSINESS.name} offers this service from ${cityName} starting at ${prices.sedanPerKm}. Book: ${BUSINESS.phone}.`,
      `Round-trip fare from ${cityName} is calculated per km with a minimum of 250 km per day. So for a 2-day round trip where you travel 400 km total, you're billed for 500 km (250 × 2 days minimum). Sedan at ${prices.sedanPerKm}, SUV at ${prices.suvPerKm}, Innova Crysta at ${prices.crystaPerKm}. Driver allowance of ₹300/night for multi-day trips.`,
      `The round-trip advantage over one-way: your driver is available for local sightseeing, meetings, and errands at the destination — you don't need to find another cab there. This is why round trip is preferred for vacation tours, temple visits, and business trips where you need transport at both ends.`,
      `Popular round trips from ${cityName}: temple and pilgrimage circuits, hill station getaways, beach trips, business city circuits. For groups of 8 or more, our Tempo Traveller offers the best per-person rate on round trips. All vehicles are AC and GPS-tracked; all fares are fixed.`,
      `Book round-trip cab from ${cityName}: call ${BUSINESS.phone} or WhatsApp. Share your pickup address, destination(s), travel dates, and passenger count. Get a fare quote and booking confirmation in 2 minutes. Driver arrives 15 minutes before departure. Free cancellation up to 4 hours before.`,
    ],
    [
      `${BUSINESS.name} provides round-trip cab service from ${cityName}, ${stateName} — a dedicated vehicle and driver for your entire journey, from departure to return. Perfect for outstation tours, family vacations, business circuits, and pilgrimages where you want consistent, reliable transport throughout. Starts at ${prices.sedanPerKm}. Call ${BUSINESS.phone}.`,
      `How round-trip pricing works from ${cityName}: Sedan ${prices.sedanPerKm}, SUV ${prices.suvPerKm}, Innova Crysta ${prices.crystaPerKm}, Tempo Traveller ${prices.tempoPerKm}. Minimum 250 km/day billed regardless of actual km. Driver allowance ₹300/night for overnight stays. Toll, parking, and state permit are extra and disclosed upfront.`,
      `Key benefit of round-trip over one-way: you get the same driver and vehicle for local travel at your destination. No need to hunt for cabs in an unfamiliar city. Whether you need the cab waiting while you're at a meeting or ready at 6 AM for an early temple visit — your driver is there.`,
      `Round trips from ${cityName} that we commonly handle: Kolkata weekend trips, Darjeeling and Sikkim tours, Puri–Konark circuits, Jharkhand family visits, Odisha beach holidays, and multi-city corporate circuits. We also arrange destination wedding transport with multi-vehicle coordination.`,
      `To book round-trip cab from ${cityName}: WhatsApp or call ${BUSINESS.phone}. We'll plan the fare based on your dates and route, confirm in 2 minutes, and ensure the driver has all details. Pay at the end. Free cancellation up to 4 hours before departure.`,
    ],
    [
      `A round-trip cab from ${cityName} gives you something one-way doesn't: continuity. Same driver, same cab, no re-booking mid-trip. When you're on a 3-day Darjeeling or Puri tour, that consistency matters — especially when navigating unfamiliar hill roads or busy pilgrimage towns. ${BUSINESS.name} runs round-trip cab from ${cityName} at fixed rates from ${prices.sedanPerKm}. Book: ${BUSINESS.phone}.`,
      `Round-trip fares from ${cityName}: Sedan ${prices.sedanPerKm}, SUV ${prices.suvPerKm}, Crysta ${prices.crystaPerKm}, Tempo ${prices.tempoPerKm}. Minimum 250 km/day applies. For a 3-day Puri trip from ${cityName} (approx 900 km total), you're billed for 750 km (250 × 3 days). Driver night allowance ₹300/night. All inclusive of fuel; toll extra.`,
      `Round trip means the driver is available throughout your stay. He can take you from hotel to beach to temple, wait while you eat, and be ready for early morning departures. For older travellers or those visiting for medical treatments, this continuity provides real peace of mind.`,
      `We handle all types of round trips from ${cityName}: weekend family outings, pilgrimage tours (Puri, Gaya, Varanasi), hill station holidays (Darjeeling, Gangtok), destination weddings, and extended business travel. Customised itineraries available — call ${BUSINESS.phone}.`,
      `Booking round-trip cab from ${cityName}: one call or WhatsApp to ${BUSINESS.phone}. Tell us where you're going, how many days, and how many passengers. We send a fare estimate and confirm the booking in 2 minutes with driver details. Cancel free up to 4 hours before. Pay at trip end.`,
    ],
  ];

  return {
    aboutContent: aboutVariants[v],
    faqs: [
      { question: `What is round trip cab fare from ${cityName}?`, answer: `Round trip fares from ${cityName}: Sedan ${prices.sedanPerKm}, SUV ${prices.suvPerKm}, Crysta ${prices.crystaPerKm}, Tempo ${prices.tempoPerKm}. Minimum 250 km/day. Driver night allowance ₹300. Toll and parking extra. Call ${BUSINESS.phone}.` },
      { question: `What is included in the round trip from ${cityName}?`, answer: `Included: fuel, driver charges, and GST. Extra: toll, parking, state permit, and driver food/accommodation for multi-day trips. Driver stays with you throughout — available for local travel at destination.` },
      { question: `How is round trip fare calculated from ${cityName}?`, answer: `Round trip fare = Total km × Per-km rate, with minimum 250 km/day. Example: 2-day trip, 400 actual km = 500 km billed (250×2). Sedan: 500 × ₹${prices.sedanRate} = ₹${500 * prices.sedanRate}.` },
      { question: `Can I keep the cab for sightseeing at the destination?`, answer: `Yes. Round trip means your driver is available throughout your stay. Use the cab for local sightseeing, meetings, shopping at your destination. Extra km beyond daily limit charged at the same per-km rate.` },
      { question: `Is round trip available for multi-day tours from ${cityName}?`, answer: `Yes. Multi-day round trips from ${cityName} — 2 to 30 days. Perfect for vacation tours, pilgrimage circuits, and extended business travel. Call ${BUSINESS.phone} for custom packages.` },
      { question: `Is night travel included in round trip from ${cityName}?`, answer: `Yes, 24/7 availability. Same fixed rate at any time. Night allowance of ₹300 applies for driver accommodation for 10 PM–6 AM travel. No surge pricing ever.` },
    ],
    popularSearches: [
      `round trip cab from ${cityName}`, `round trip taxi ${cityName}`, `return cab ${cityName}`,
      `${cityName} round trip cab service`, `multi day cab ${cityName}`, `return trip taxi ${cityName}`,
      `cab for tour from ${cityName}`, `${cityName} round trip fare`, `book round trip cab ${cityName}`,
    ],
  };
}

// ─────────────────────────────────────────────────────────────
// AIRPORT TRANSFER SERVICE
// ─────────────────────────────────────────────────────────────
export function generateAirportServiceContent(input: ServiceContentInput) {
  const { cityName, stateName, stateSlug, airport } = input;
  const prices = getStatePriceLabels(stateSlug || 'west-bengal');
  const airportName = airport || `${cityName} Airport`;
  const h = getHash(cityName + 'airport');
  const v = h % 3;

  const aboutVariants = [
    [
      `Missing a flight because of a late cab is one of the worst travel experiences — and it's entirely avoidable. ${BUSINESS.name} provides airport cab service in ${cityName}, ${stateName} with fixed flat rates and a strict on-time protocol. For pickups, our driver tracks your flight in real time and is at the arrival gate when you land — no extra charge for delays up to 45 minutes. For drops, we depart early enough to account for traffic. Airport Sedan from ${prices.airportSedan}. Call ${BUSINESS.phone}.`,
      `Flat fares for airport transfer in ${cityName}: Sedan ${prices.airportSedan}, SUV ${prices.airportSuv}, Innova Crysta ${prices.airportInnova}. These are all-inclusive, fixed fares — no meter running, no surge on early morning flights, no extra charges for waiting during flight delays (up to 45 minutes). Toll and airport parking charges are included in the quoted price.`,
      `For airport arrivals in ${cityName}: our driver monitors your flight's ETA via a live tracker. If your flight is delayed or lands early, the driver adjusts. You'll see a name board at the arrival gate and get a WhatsApp message with the driver's number when they're at the airport. No stress of finding a cab after a long flight.`,
      `For airport drops from ${cityName}: driver reaches your pickup address at least 30 minutes before the scheduled departure time. We recommend leaving for domestic flights at least 2.5 hours before and for international flights at least 3.5 hours before. Our drivers know the fastest route to ${airportName} and monitor real-time traffic.`,
      `Book airport cab in ${cityName} by calling ${BUSINESS.phone} or WhatsApp. Share your flight number, travel date, pickup/drop address, and time. We confirm in 2 minutes and send driver details to your phone. Available 24/7 — early morning 4 AM, late night red-eye, any time.`,
    ],
    [
      `${BUSINESS.name} airport cab service in ${cityName}: on-time, fixed-rate, 24/7. Whether you're catching an early morning flight or arriving late at night — our airport transfer service ensures you never scramble for a cab at the last minute. Flat fare from ${prices.airportSedan}. Book: ${BUSINESS.phone}.`,
      `Airport cab rates in ${cityName}: Sedan ${prices.airportSedan} (up to 4 passengers), SUV ${prices.airportSuv} (up to 6 passengers), Innova Crysta ${prices.airportInnova} (up to 7 passengers). Flat fares — quoted before you confirm, stays the same regardless of time of day. No meter-based billing, no peak-hour surcharge.`,
      `Pickup at ${airportName}: driver tracks your flight live. If the flight is delayed, no extra charge for waiting (up to 45 minutes). Driver holds your name on a board at the arrival exit. You'll get a WhatsApp message when driver is at the airport. For business travelers, we arrange executive cars with Innova Crysta or Fortuner.`,
      `Airport drop from ${cityName}: we leave enough time to handle traffic. Driver arrives at your location 30 minutes before the agreed pickup time. Live traffic monitoring to choose the fastest route to ${airportName}. For international flights, we recommend 3.5 hours buffer. We'll advise on timing when you book.`,
      `Booking airport cab in ${cityName}: call or WhatsApp ${BUSINESS.phone}. Share your flight number, route (pickup or drop), date, and address. We confirm in 2 minutes. Corporate airport packages with monthly billing available for frequent flyers and business travelers.`,
    ],
    [
      `Airport cab service in ${cityName} by ${BUSINESS.name}: flat-rate, flight-tracked, and available 24 hours. We know airport travel is time-sensitive — which is why our protocol is stricter than regular cab service. Drivers for airport runs go through an additional briefing on punctuality and airport procedures. Sedan from ${prices.airportSedan}. ${BUSINESS.phone}.`,
      `Airport cab fares in ${cityName}: Sedan ${prices.airportSedan}, SUV ${prices.airportSuv}, Innova Crysta ${prices.airportInnova}. Inclusive of fuel, driver, and airport parking. No surprise charges at the end. Same fare whether you fly at 5 AM or 11 PM. Toll is also included in the quoted flat fare.`,
      `For arrivals at ${airportName}: your driver tracks the flight and arrives before landing. You'll get a WhatsApp update with driver details when they're at the airport. Name board at the arrival gate. Waiting time up to 45 minutes included in the flat fare — no extra charges for flight delays within that window.`,
      `For departures from ${cityName}: our driver is at your address 30 minutes before the booked pickup time. We plan the departure time based on typical traffic on the route to ${airportName}. For important flights, book the previous evening to ensure priority dispatch.`,
      `Airport cab booking in ${cityName}: call or WhatsApp ${BUSINESS.phone}. Give us your flight number, travel direction (arrival or departure), pickup address, and date. Confirmation in 2 minutes. Available round the clock. Corporate clients get priority dispatch and monthly billing.`,
    ],
  ];

  return {
    aboutContent: aboutVariants[v],
    faqs: [
      { question: `What is the airport cab fare in ${cityName}?`, answer: `Airport cab fares in ${cityName}: Sedan ${prices.airportSedan}, SUV ${prices.airportSuv}, Innova Crysta ${prices.airportInnova}. Flat fare — no meter, no surge, toll included. Call ${BUSINESS.phone}.` },
      { question: `Do you track flights for airport pickup in ${cityName}?`, answer: `Yes. We track your flight live. If delayed, driver waits at no extra charge up to 45 minutes. Name board at arrival gate. WhatsApp update when driver is at the airport.` },
      { question: `How early should I book airport cab in ${cityName}?`, answer: `2–4 hours advance recommended. For flights before 6 AM, book the previous evening. Last-minute bookings are accommodated based on availability. Call ${BUSINESS.phone}.` },
      { question: `Is airport cab available at 3 AM in ${cityName}?`, answer: `Yes, 24/7 airport transfer in ${cityName}. Same flat fare at 3 AM as at noon. No night surcharge. Driver night allowance of ₹300 applies for 10 PM–6 AM journeys.` },
      { question: `Do you provide airport transfer for groups in ${cityName}?`, answer: `Yes. SUV (6 pax), Innova Crysta (7 pax), and Tempo Traveller (12–17 pax) for group airport transfers. Corporate group packages with GST billing available.` },
      { question: `Can I book return airport transfer in ${cityName}?`, answer: `Yes. Book airport arrival and departure together for seamless travel. We can send a fresh vehicle or the same driver depending on timing. Call ${BUSINESS.phone}.` },
    ],
    popularSearches: [
      `airport cab ${cityName}`, `airport taxi ${cityName}`, `${cityName} airport transfer`,
      `${airportName} cab`, `airport pickup ${cityName}`, `airport drop ${cityName}`,
      `cheap airport cab ${cityName}`, `${cityName} airport taxi fare`, `book airport cab ${cityName}`,
    ],
  };
}

// ─────────────────────────────────────────────────────────────
// WEDDING CAR SERVICE
// ─────────────────────────────────────────────────────────────
export function generateWeddingCarServiceContent(input: ServiceContentInput) {
  const { cityName, stateName } = input;
  const h = getHash(cityName + 'wedding');
  const v = h % 3;

  const aboutVariants = [
    [
      `Your wedding day has enough to manage — transport shouldn't be one of the stressors. ${BUSINESS.name} provides premium wedding car rental in ${cityName}, ${stateName} with beautifully decorated vehicles, professional chauffeurs, and a logistics team that coordinates across multiple vehicles so everything runs on time. Baraat car, vidaai car, guest shuttles — we handle all of it.`,
      `Wedding car fleet in ${cityName}: decorated Sedan (Honda City, Toyota Camry — ₹5,000/day), Innova Crysta (₹8,000/day), Toyota Fortuner (₹12,000/day), and Mercedes-Benz or BMW (₹20,000+). For guest transportation: multiple Ertiga, Innova, and Tempo Traveller vehicles. Decoration includes fresh flowers, ribbons, and custom themes — traditional or contemporary.`,
      `Our wedding car packages in ${cityName} cover the full function: baraat procession with decorated lead vehicle, bride's car with special vidaai decoration, reception venue transfers, guest pickup from hotels and railway station, and honeymoon departure arrangements. We coordinate timing across all vehicles so guests aren't kept waiting.`,
      `For destination weddings from ${cityName}: we provide multi-day outstation wedding transport packages including decorated cars at the venue, guest shuttle coordination, and driver accommodation. Popular destinations include Digha, Puri, Bhubaneswar, and hill stations in North Bengal.`,
      `Book wedding car in ${cityName}: call ${BUSINESS.phone} at least 1–2 weeks before the function date (2–4 weeks for peak wedding season, November–February). We discuss your requirements, suggest the right vehicle combination, and provide a trial decoration for premium bookings. 50% advance required at confirmation.`,
    ],
    [
      `Wedding transportation in ${cityName} requires planning beyond just booking a car — it's about the right vehicle for each moment, coordinated timing, and a chauffeur who understands the significance of the occasion. ${BUSINESS.name} has been handling wedding car service in ${cityName} since ${BUSINESS.foundYear} with exactly that mindset.`,
      `Vehicle options for weddings in ${cityName}: decorated Innova Crysta (₹8,000) is the most popular choice for the baraat and vidaai car — spacious, dignified, and beautiful with floral decoration. For luxury baraat cars: Fortuner (₹12,000) and Mercedes (₹20,000+). For bride's car: decorated Honda City or Camry (₹5,000). Guest fleet: Ertiga, Innova, and Tempo Traveller.`,
      `Our wedding car service in ${cityName} is comprehensive: baraat car with drum or band coordination, bride's car with garland and ribbon decoration, vidaai car (often a different style from baraat — more emotional and elegant), guest shuttle from hotel to function hall, and post-wedding honeymoon drop. All handled professionally with punctual drivers.`,
      `Planning a destination wedding outside ${cityName}? We provide full outstation wedding transport — decorated cars at the destination, guest shuttle service between accommodation and venue, driver accommodation, and multi-day fleet availability. We've coordinated weddings in Digha, Mandarmani, Puri, and various resort venues.`,
      `Wedding car booking in ${cityName}: contact ${BUSINESS.phone} early — our premium vehicles (Fortuner, Mercedes) get booked quickly during wedding season (November to February, May to June). After discussing your requirements, we send a detailed quote with decoration options. 50% advance at confirmation; balance on the wedding day.`,
    ],
    [
      `A decorated baraat car that breaks down, or a vidaai car that's late — these are the wedding transport nightmares that ${BUSINESS.name} was built to prevent. Our wedding car service in ${cityName}, ${stateName} comes with backup vehicles, reliable chauffeurs, and a coordinator who's in touch with your family on the day of the event.`,
      `Wedding fleet in ${cityName}: Sedan (decorated from ₹5,000), Innova Crysta (₹8,000, most requested), Fortuner (₹12,000 — grand baraat car), Mercedes-Benz E-Class (₹20,000+), and BMW (₹25,000+). Guest transport: Ertiga (6 pax), Innova (7 pax), Tempo Traveller (12 pax). Decoration with fresh flowers, marigold garlands, ribbons, and custom themes.`,
      `Services covered under wedding transport in ${cityName}: baraat procession car, groom's entry vehicle, bride's car, vidaai car (decorated differently — often white flowers for a serene look), guest pickup from hotels, airport, and railway station, venue-to-venue shuttles, and honeymoon departure. We also do Mehndi and Sangeet function transport.`,
      `For weddings happening outside ${cityName}: we provide multi-day wedding car packages. The decorated vehicle travels with the wedding party, driver stays at a guest house, and the car is available for all functions across multiple days. Special rates for 3+ day wedding events.`,
      `Book your wedding car in ${cityName}: call ${BUSINESS.phone} or WhatsApp. Best to enquire 2–3 weeks before the event date. We'll understand your budget, number of vehicles needed, pickup/drop locations, and decoration preferences. Trial decoration available for premium packages. 50% advance to confirm booking.`,
    ],
  ];

  return {
    aboutContent: aboutVariants[v],
    faqs: [
      { question: `What is the wedding car rental fare in ${cityName}?`, answer: `Wedding car rates in ${cityName}: Decorated Sedan ₹5,000/day, Innova Crysta ₹8,000/day, Fortuner ₹12,000/day, Mercedes/BMW ₹20,000+/day. Includes decoration, professional chauffeur, fuel for 100 km, 8 hours. Call ${BUSINESS.phone}.` },
      { question: `Do you provide baraat car in ${cityName}?`, answer: `Yes. Baraat cars with fresh flower decoration, ribbons, and garlands. Innova Crysta (₹8,000), Fortuner (₹12,000), Mercedes (₹20,000+). We also provide music systems and additional floral arrangements on request.` },
      { question: `Can I see the decoration before booking in ${cityName}?`, answer: `Yes. For premium bookings (₹10,000+), we arrange a trial decoration. You can select from traditional marigold themes, contemporary white flower themes, or custom styles.` },
      { question: `Do you provide guest shuttle service for weddings in ${cityName}?`, answer: `Yes. Guest shuttle fleet: Ertiga (6 pax), Innova Crysta (7 pax), Tempo Traveller (12–17 pax). We coordinate pickup from hotels, railway station, and airport and ensure guests reach the venue on time.` },
      { question: `How early should I book wedding car in ${cityName}?`, answer: `At least 1–2 weeks before the event. During peak wedding season (November–February and May–June), book 2–4 weeks in advance. Popular vehicles like Fortuner and Mercedes book quickly. 50% advance required.` },
      { question: `Do you provide wedding car for destination weddings from ${cityName}?`, answer: `Yes. Multi-day wedding car packages for destination weddings outside ${cityName}. Decorated car travels with the wedding party, driver accommodation included. Call ${BUSINESS.phone} for custom packages.` },
    ],
    popularSearches: [
      `wedding car ${cityName}`, `wedding car rental ${cityName}`, `baraat car ${cityName}`,
      `decorated car ${cityName}`, `marriage car ${cityName}`, `dulhan car ${cityName}`,
      `wedding taxi ${cityName}`, `shaadi car ${cityName}`, `luxury wedding car ${cityName}`,
    ],
  };
}
