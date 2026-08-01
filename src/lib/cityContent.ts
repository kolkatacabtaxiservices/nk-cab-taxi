import { BUSINESS, type City, type Route, getStateFares, getStateDisplayRate } from './data';

// ═══════════════════════════════════════════════════════════════
// CITY CONTENT GENERATION ENGINE v2
// Natural, varied, E-E-A-T-compliant content for every city page
// ═══════════════════════════════════════════════════════════════

interface CityContentInput {
  city: City;
  stateName: string;
  stateSlug: string;
  routesFrom: Route[];
  routesTo: Route[];
}

// ─── Kolkata-specific neighbourhood coverage ───
const KOLKATA_AREAS = [
  { name: 'Salt Lake (Bidhannagar)', areas: 'Sector I–V, City Centre, Karunamoyee' },
  { name: 'New Town (Rajarhat)', areas: 'Action Area I–III, Eco Park, Biswa Bangla Gate' },
  { name: 'Howrah', areas: 'Howrah Station, Shibpur, Belur, Bally, Liluah' },
  { name: 'Dum Dum', areas: 'Airport Area, Nagerbazar, Dum Dum Cantonment' },
  { name: 'Park Street', areas: 'Park Circus, Free School Street, Mullick Bazar' },
  { name: 'Ballygunge', areas: 'Gariahat, Golpark, Dhakuria, Lake Market' },
  { name: 'Esplanade / BBD Bagh', areas: 'Dalhousie, Writers Building, GPO' },
  { name: 'Tollygunge', areas: 'Rashbehari, Bhawanipur, Hazra, Kalighat' },
  { name: 'Barasat', areas: 'Madhyamgram, Hridaypur, Barasat Court' },
  { name: 'Behala', areas: 'Joka, Thakurpukur, Sakherbazar, Parnashree' },
  { name: 'Ultadanga / Sealdah', areas: 'Maniktala, Phoolbagan, CIT Road' },
  { name: 'Jadavpur / Garia', areas: 'Jadavpur University, Garia Station, Narendrapur' },
  { name: 'Lake Town / Bangur', areas: 'Kankurgachi, Baguiati, VIP Road' },
  { name: 'Barrackpore', areas: 'Titagarh, Belghoria, Kamarhati, Sodepur' },
  { name: 'South Kolkata', areas: 'Alipore, New Alipore, Chetla, Ekbalpur' },
];

function getCityHash(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return hash;
}

// ─── Generate detailed "About Cab Service" content ───
function getAboutCityContent(input: CityContentInput): string[] {
  const { city, stateName, routesFrom } = input;
  const isKolkata = city.slug === 'kolkata';
  const paragraphs: string[] = [];
  const stateFares = getStateFares(input.stateSlug || 'west-bengal');
  const displayRate = getStateDisplayRate(input.stateSlug || 'west-bengal');
  const hash = getCityHash(city.slug);
  // Use 12-way rotation for more diversity
  const templateIndex = hash % 12;

  // ── Paragraph 1: Natural, varied opening ──
  if (isKolkata) {
    const kolkataIntros = [
      `Finding a reliable cab in Kolkata isn't always easy — between surge-happy apps and unreliable auto-walllahs, most people end up frustrated. That's why ${BUSINESS.name} runs fixed-rate taxi service across Kolkata, from Dum Dum to Garia, from Salt Lake to Howrah. We've been picking up passengers from Park Street at 3 AM and dropping off families at Netaji Subhas Chandra Bose International Airport during Durga Puja rush — rain or shine. Kolkata cab starts from ${displayRate}. Call ${BUSINESS.phone}.`,
      `Kolkata's traffic can be unpredictable — a 10-km drive from New Town to Esplanade can take 45 minutes on a bad evening. ${BUSINESS.name} drivers know the city's pressure points: when to take VIP Road and when to slip through Ultadanga, when the Howrah Bridge is clear and when EM Bypass saves time. Local knowledge, clean AC cars, honest metering — that's what we offer Kolkata passengers every day. Rates from ${displayRate}. Book via WhatsApp on ${BUSINESS.phone}.`,
      `${BUSINESS.name} is Kolkata's trusted cab service covering all 141 wards of the city plus Howrah, Bidhannagar, Rajarhat, and Barrackpore. Whether you're catching the 5 AM Rajdhani from Howrah, heading to AMRI or Apollo for a checkup, or need a late-night drop after an office event at Eco Space — we are on call 24/7. Our sedan cab from ${displayRate}. No surge pricing, ever. Dial ${BUSINESS.phone} to book.`,
    ];
    paragraphs.push(kolkataIntros[hash % 3]);
  } else if (city.type === 'hub') {
    const hubIntros = [
      `${city.name} is a busy junction city — and busy cities need transport that doesn't let you down. ${BUSINESS.name} offers professional cab service in ${city.name}, ${stateName}, starting from ${displayRate}. We cover all areas, connect to all major highways, and run 24/7 including on public holidays and festival days. Whether it's a 6 AM corporate flight or a weekend family trip — our vehicles are always clean, drivers always professional. Call ${BUSINESS.phone} for booking.`,
      `Running a business or managing family commitments in ${city.name}? Either way, reliable transport matters. ${BUSINESS.name} has been serving passengers in ${city.name} with fixed-rate cab service from ${displayRate}. No app, no surge — just call ${BUSINESS.phone}, tell us your pickup point and destination, and we confirm in under 2 minutes. Our drivers know ${city.name} well and reach you on time.`,
      `${city.name} cab passengers often tell us the same thing: they tried app-based cabs and kept facing surge pricing, cancellations, or wrong pickups. ${BUSINESS.name} was started to solve exactly this problem. We run a transparent cab service in ${city.name} with fixed fares from ${displayRate}, verified drivers, and a direct phone line you can call anytime — ${BUSINESS.phone}. No hidden charges. No drama.`,
      `Whether you're a resident of ${city.name} needing daily commute support or a visitor arriving for business — ${BUSINESS.name} covers your ground transportation in ${city.name} at honest rates starting from ${displayRate}. We pick up from your home, hotel, railway station, or any address. Call or WhatsApp ${BUSINESS.phone} — we reply fast.`,
    ];
    paragraphs.push(hubIntros[hash % 4]);
  } else if (city.tourist) {
    const touristIntros = [
      `${city.name} is one of those destinations that stays with you long after you leave. To make sure your visit here is stress-free, ${BUSINESS.name} provides dedicated tourist cab service in ${city.name} with experienced drivers who know every temple, viewpoint, and hidden gem. Rates start from ${displayRate}. We also do pick-and-drop from the railway station or nearest airport. Call ${BUSINESS.phone}.`,
      `Getting around ${city.name} as a tourist can be tricky — unreliable autos, confusing e-rickshaw routes, and the ever-present worry of overcharging. ${BUSINESS.name} takes care of all of that. We offer clean AC cabs in ${city.name} with knowledgeable local drivers, fixed fares from ${displayRate}, and a booking line that's live 24/7: ${BUSINESS.phone}. Plan your itinerary, we'll handle the driving.`,
      `Thousands of visitors come to ${city.name} every year for its unique attractions. ${BUSINESS.name} provides transport to every major spot from ${displayRate}. Our drivers are familiar with local areas, can suggest the best visit order, and will wait while you explore. Book for half-day sightseeing or a full-day tour — we customise based on your plan. Call ${BUSINESS.phone}.`,
      `A cab in ${city.name} is practically essential for tourists — distances between the main attractions can be substantial, especially in peak summer. ${BUSINESS.name} offers fixed-rate tourist cabs in ${city.name} so you know exactly what you're paying before you start. No unpleasant surprises at the end of the day. From ${displayRate}. Available 24/7 on ${BUSINESS.phone}.`,
    ];
    paragraphs.push(touristIntros[hash % 4]);
  } else {
    const regularIntros = [
      `${city.name} residents and visitors deserve transport that's predictable and priced fairly. ${BUSINESS.name} provides cab service in ${city.name}, ${stateName} from ${displayRate} — with verified drivers, clean AC vehicles, and zero surge pricing. Book by calling ${BUSINESS.phone} or sending a WhatsApp message. We confirm in 2 minutes.`,
      `Cab service in ${city.name} has improved a lot in recent years, but nothing beats the reliability of a local operator who knows the roads and takes responsibility. ${BUSINESS.name} has been doing exactly that — serving passengers across ${city.name} with honest fares from ${displayRate} and 24/7 availability. One call to ${BUSINESS.phone} is all it takes.`,
      `Whether you're heading to a hospital appointment, catching an early train, or planning a day trip from ${city.name} — ${BUSINESS.name} has you covered. Our cab service in ${city.name} runs day and night with fixed rates from ${displayRate}. Driver confirmation arrives on WhatsApp within 2 minutes of booking. Call ${BUSINESS.phone} to get started.`,
      `People in ${city.name} book with us because we don't cancel last-minute, we don't surge on festival days, and our drivers show up on time. ${BUSINESS.name} operates a straightforward cab service in ${city.name} from ${displayRate}. No app needed. Call ${BUSINESS.phone} or WhatsApp us — we handle the rest.`,
    ];
    paragraphs.push(regularIntros[hash % 4]);
  }

  // ── Paragraph 2: City description + context ──
  paragraphs.push(
    `${city.description} ${city.tourist
      ? `As a popular destination throughout the year, ${city.name} draws visitors for its culture, temples, natural beauty, and heritage. Our cab service ensures you can explore everything at your own pace without worrying about transport.`
      : `Being an important city in ${stateName}, ${city.name} has significant commercial and residential activity. Our cab service meets both daily local needs and occasional outstation travel requirements.`}`
  );

  // ── Paragraph 3: Services — different framing by template ──
  const serviceVariants = [
    `Our cab services in ${city.name} cover six main categories: Local taxi (4hr/8hr city packages from ₹${stateFares.localPackages[0]?.sedan || '1,800'}), Outstation one-way drop${routesFrom.length > 0 ? ` to cities like ${routesFrom.slice(0, 3).map(r => r.toName).join(', ')}` : ''}, Round-trip outstation with dedicated driver, Airport and railway station transfers, Wedding car rental with decoration, and Corporate monthly contracts. Whatever your need — we handle it.`,
    `From a quick hospital visit to a multi-day tour, ${BUSINESS.name} offers the right cab for every situation in ${city.name}. Local hourly packages start at ₹${stateFares.localPackages[0]?.sedan || '1,800'} for 4 hours${routesFrom.length > 0 ? `, and we run regular outstation routes to ${routesFrom.slice(0, 3).map(r => r.toName).join(', ')}` : ''}. Our airport and station pickups include meet-and-greet. Wedding cars come decorated. Corporate clients get GST invoices and monthly billing.`,
    `Here's what we actually offer in ${city.name}: (1) Local taxi packages for city travel, (2) Outstation one-way cab — you only pay for your direction, (3) Round-trip with a driver who stays at the destination, (4) Airport transfer with flight tracking, (5) Decorated wedding cars, (6) Corporate travel accounts. Local packages from ₹${stateFares.localPackages[0]?.sedan || '1,800'}${routesFrom.length > 0 ? `. Popular outstation routes: ${routesFrom.slice(0, 3).map(r => `${city.name} to ${r.toName}`).join(', ')}` : ''}.`,
  ];
  paragraphs.push(serviceVariants[templateIndex % 3]);

  // ── Paragraph 4: Transport infrastructure ──
  const transportPoints: string[] = [];
  if (city.airport) transportPoints.push(`${city.airport} — we provide round-the-clock airport pickup and drop with real-time flight tracking. Driver waits at arrivals with a name board; no extra charge for delays up to 45 minutes`);
  if (city.railway) transportPoints.push(`${city.railway} — our drivers coordinate station pickups at any hour, day or night, weekday or festival`);
  if (transportPoints.length > 0) {
    paragraphs.push(
      `${city.name} is well-served by key transport links. ${transportPoints.join('. ')}. ${BUSINESS.name} provides reliable last-mile connectivity from these hubs to any destination in ${city.name} or outstation.`
    );
  }

  // ── Paragraph 5: Landmark coverage ──
  if (city.landmarks && city.landmarks.length > 0) {
    const landmarkVariants = [
      `Our drivers in ${city.name} regularly cover all major landmarks and areas including ${city.landmarks.join(', ')}. They know the quickest routes, avoid congested times, and can suggest the most efficient travel sequence for sightseeing or multi-stop errands.`,
      `We service all areas and attractions around ${city.name}: ${city.landmarks.join(', ')}. For first-time visitors, our drivers are happy to suggest must-see places and local eateries along the route — a small perk of choosing a local cab service over an app.`,
    ];
    paragraphs.push(landmarkVariants[hash % 2]);
  }

  // ── Paragraph 6: Routes with natural language ──
  if (routesFrom.length > 0) {
    const topRoutes = routesFrom.slice(0, 8);
    const routeList = topRoutes.map(r => `${city.name}–${r.toName} (${r.distance} km, starts ₹${r.priceSaloon})`).join(', ');
    const routeVariants = [
      `Frequently booked outstation routes from ${city.name}: ${routeList}. All fares include fuel and driver. Toll charges are informed upfront — no nasty surprises when you arrive.`,
      `Popular intercity cabs from ${city.name} include: ${routeList}. We operate all these routes every day — just call ${BUSINESS.phone} for your booking and you'll receive the driver's contact and vehicle number before departure.`,
    ];
    paragraphs.push(routeVariants[hash % 2]);
  }

  // ── Paragraph 7: Booking — conversational ──
  const bookingVariants = [
    `Booking is simple. Call ${BUSINESS.phone} or send a WhatsApp — we don't need an app download or account creation. Tell us your pickup address, where you're going, when, and how many passengers. Confirmation arrives in under 2 minutes. Driver reaches you 10–15 minutes before departure. Payment by Cash, UPI, or Card — whichever works for you.`,
    `We run 24/7 in ${city.name} — that includes midnight rides, 4 AM airport drops, and Durga Puja evening travel when most cabs are unavailable. To book: call or WhatsApp ${BUSINESS.phone}, share your trip details, and receive your booking confirmation instantly. No app, no registration, no advance payment required for most bookings.`,
    `Getting a cab through ${BUSINESS.name} in ${city.name} takes less than 2 minutes. Dial ${BUSINESS.phone} or message on WhatsApp. We need just your pickup point, destination, and travel time. Our team confirms the booking, assigns a driver, and sends details to your number. Pay at the end of the trip — Cash, UPI, or Card accepted.`,
  ];
  paragraphs.push(bookingVariants[templateIndex % 3]);

  return paragraphs;
}

// ─── Get neighbourhood areas ───
export function getCityAreas(city: City): { name: string; areas: string }[] {
  if (city.slug === 'kolkata') return KOLKATA_AREAS;

  const areas: { name: string; areas: string }[] = [];
  if (city.railway) areas.push({ name: `${city.railway} Area`, areas: 'Station Road, Bus Stand, Auto Stand, Taxi Queue' });
  if (city.airport) areas.push({ name: `${city.airport} Area`, areas: 'Airport Road, Terminal 1 & 2, Hotel Zone' });
  if (city.landmarks) {
    city.landmarks.slice(0, 6).forEach(landmark => {
      areas.push({ name: `${landmark} Area`, areas: `${landmark} and nearby localities, approach roads` });
    });
  }
  return areas.slice(0, 8);
}

// ─── Extended FAQs — 12-way rotation for maximum variety ───
export function getCityExtendedFAQs(input: CityContentInput): { question: string; answer: string }[] {
  const { city, stateName, routesFrom, stateSlug } = input;
  const stateFares = getStateFares(stateSlug || 'west-bengal');
  const hash = getCityHash(city.slug);
  const v = hash % 3;

  // Three versions of each core FAQ
  const bestServiceAnswers = [
    `${BUSINESS.name} is rated the most reliable cab service in ${city.name}. We offer local taxi, outstation, one-way, airport transfer, wedding cars, and corporate rental. Drivers are police-verified, vehicles are AC and sanitized, rates are fixed with no surge. Available 24/7 including holidays. Call ${BUSINESS.phone}.`,
    `Most passengers in ${city.name} rate ${BUSINESS.name} #1 for reliability and honest pricing. We run all service types — local hourly, outstation, one-way drop, airport and station transfer, wedding car, and corporate monthly contracts. No surge pricing, verified drivers, instant WhatsApp confirmation. ${BUSINESS.phone}.`,
    `For dependable cab service in ${city.name}, ${BUSINESS.name} is the go-to choice. Fixed fares, 24/7 availability, AC fleet, police-verified local drivers. Whether you need a hospital run at midnight or a Durga Puja eve airport drop — we show up. Call or WhatsApp ${BUSINESS.phone}.`,
  ];

  const fareAnswers = [
    `Cab fares in ${city.name} with ${BUSINESS.name}: Sedan ₹${stateFares.sedan.pricePerKm}/km, SUV ₹${stateFares.suv.pricePerKm}/km, Innova Crysta ₹${stateFares.crysta?.pricePerKm || stateFares.innova.pricePerKm}/km, Tempo Traveller ₹${stateFares.tempo.pricePerKm}/km. Local 8hr/80km: Sedan ₹${stateFares.localPackages[0]?.sedan || '2,200'}. Airport transfer from ₹${stateFares.airportTransfer.sedan}. All fares include fuel and driver.`,
    `Pricing for cab in ${city.name}: per-km rates — Sedan ₹${stateFares.sedan.pricePerKm}, SUV ₹${stateFares.suv.pricePerKm}, Crysta ₹${stateFares.crysta?.pricePerKm || stateFares.innova.pricePerKm}, Tempo ₹${stateFares.tempo.pricePerKm}. Local packages from ₹${stateFares.localPackages[0]?.sedan || '2,200'} for 8 hours/80 km (Sedan). Toll and parking are extra and communicated before the trip.`,
    `${city.name} cab rates at ${BUSINESS.name}: Sedan starts ₹${stateFares.sedan.pricePerKm}/km (Swift Dzire or Honda Amaze), SUV ₹${stateFares.suv.pricePerKm}/km (Ertiga or Innova), Innova Crysta ₹${stateFares.crysta?.pricePerKm || stateFares.innova.pricePerKm}/km, 12-seater Tempo ₹${stateFares.tempo.pricePerKm}/km. No hidden charges. Same fare on festival days.`,
  ];

  const bookingAnswers = [
    `Call ${BUSINESS.phone} or send a WhatsApp message. Mention your pickup address, destination, date, time, and passenger count. We confirm in 2 minutes with driver name and vehicle details. No app or account needed.`,
    `Three ways to book taxi in ${city.name}: (1) Call ${BUSINESS.phone} directly, (2) WhatsApp us the trip details, (3) Fill out the booking form on our website. Confirmation within 2 minutes with driver contact and vehicle number.`,
    `Booking cab in ${city.name} is straightforward — just call or WhatsApp ${BUSINESS.phone}. Tell us your pickup point, where you're going, and your preferred time. We assign a driver and send confirmation in about 2 minutes. No deposit required for most bookings.`,
  ];

  const availabilityAnswers = [
    `Yes, ${BUSINESS.name} operates 24/7 in ${city.name}, 365 days a year — including Durga Puja, Diwali, Eid, Christmas, and New Year. For night bookings before 6 AM, we recommend calling the previous evening. Call anytime: ${BUSINESS.phone}.`,
    `Absolutely. We don't have "off hours" in ${city.name}. 3 AM airport runs, Diwali night rides, Holi morning pickups — all are part of our regular service at the same fixed rate. Dial ${BUSINESS.phone} anytime.`,
    `${BUSINESS.name} is available 24 hours a day in ${city.name}. Festival traffic? Early morning flights? Midnight hospital emergencies? Our cabs are always on. Ring ${BUSINESS.phone} at any hour.`,
  ];

  const oneWayAnswers = [
    `Yes. We run one-way cab service from ${city.name}${routesFrom.length > 0 ? ` to destinations including ${routesFrom.slice(0, 5).map(r => r.toName).join(', ')}` : ''}. You pay only for the distance you travel — no return-leg charges. It's the most economical option for single-direction trips.`,
    `One-way cab from ${city.name} is available to all cities. You're charged only for the one-way journey distance${routesFrom.length > 0 ? ` — popular routes: ${routesFrom.slice(0, 4).map(r => `${city.name} to ${r.toName}`).join(', ')}` : ''}. Saves 40–50% compared to a round-trip booking when you don't need to return the same day.`,
    `Certainly. Our one-way cab from ${city.name} means you pay for your trip only — no empty-return charges. Available to${routesFrom.length > 0 ? ` popular destinations like ${routesFrom.slice(0, 5).map(r => r.toName).join(', ')} and` : ''} all cities across ${stateName} and neighbouring states. Call ${BUSINESS.phone}.`,
  ];

  const faqs: { question: string; answer: string }[] = [
    { question: `What is the best cab service in ${city.name}?`, answer: bestServiceAnswers[v] },
    { question: `What is the taxi fare per km in ${city.name}?`, answer: fareAnswers[v] },
    { question: `How can I book a cab in ${city.name}?`, answer: bookingAnswers[v] },
    { question: `Is cab service available 24/7 in ${city.name}?`, answer: availabilityAnswers[v] },
    { question: `Do you provide one-way cab from ${city.name}?`, answer: oneWayAnswers[v] },
  ];

  // Airport FAQ
  if (city.airport) {
    const airportAnswers = [
      `Yes, 24/7 airport cab service at ${city.airport}. For arrivals, our driver tracks your flight and waits at the exit with a name board — no extra charge for delays up to 45 minutes. For departures, driver arrives at your address 30 minutes before the agreed time. Sedan from ₹${stateFares.airportTransfer.sedan}.`,
      `We serve ${city.airport} round the clock. Pickup from the arrival gate — driver has your name and tracks the flight live. Drop to the departure terminal — we leave early enough to account for traffic. Airport Sedan flat fare from ₹${stateFares.airportTransfer.sedan}.`,
      `Airport cab at ${city.airport} is one of our most-booked services. Flight tracked in real-time, driver at arrivals with name board, no extra wait charges (up to 45 minutes). Flat fares — Sedan ₹${stateFares.airportTransfer.sedan}, SUV ₹${stateFares.airportTransfer.suv}, Innova ₹${stateFares.airportTransfer.innova}.`,
    ];
    faqs.push({ question: `Do you provide airport cab at ${city.airport}?`, answer: airportAnswers[v] });
  }

  // Railway FAQ
  if (city.railway) {
    const railwayAnswers = [
      `Yes, we pick up and drop at ${city.railway}. Driver is at the station exit at your scheduled time. For outstation pickups, we coordinate directly with you on WhatsApp to match your arrival platform. Available 24/7.`,
      `${city.railway} pickup and drop is part of our regular service. Our driver meets you at the main exit — no searching required. Available all hours, all days. Call ${BUSINESS.phone} to arrange.`,
      `Cab service at ${city.railway} is available round the clock with ${BUSINESS.name}. Tell us your train number or ETA when booking and our driver adjusts timing accordingly. Standard cab rates apply.`,
    ];
    faqs.push({ question: `Do you provide cab at ${city.railway}?`, answer: railwayAnswers[v] });
  }

  // Vehicle FAQ
  const vehicleAnswers = [
    `In ${city.name} we offer: Sedan — Swift Dzire or Honda Amaze (4 passengers), SUV — Ertiga or Innova (6 passengers), Innova Crysta (7 passengers, premium), Tempo Traveller (12 passengers, group trips), Luxury cars on request (Fortuner, Mercedes). All vehicles are AC and sanitized.`,
    `Our fleet in ${city.name}: Sedan cars (Dzire, Amaze) for individuals and couples; SUVs (Ertiga, Innova Crysta) for families and groups of 5–7; Tempo Traveller (12+ seater) for tour groups; Luxury vehicles for weddings and VIP travel. All AC, GPS-tracked, regularly maintained.`,
    `Vehicle options in ${city.name}: Swift Dzire/Honda Amaze (Sedan, 4 pax, most affordable), Ertiga/Innova (SUV, 6 pax), Innova Crysta (7 pax, premium comfort), 12-seater Tempo Traveller (groups), and luxury cars for special occasions. All have working AC and are cleaned before each trip.`,
  ];
  faqs.push({ question: `What cars are available for rent in ${city.name}?`, answer: vehicleAnswers[v] });

  // Wedding car FAQ
  const weddingAnswers = [
    `Yes, we do wedding car rental in ${city.name} with flower and ribbon decoration. Options: decorated Sedan (₹5,000/day), Innova Crysta (₹8,000/day), Fortuner (₹12,000/day). Good for baraat, vidaai, reception transfers, and guest shuttles. Book 1–2 weeks in advance during wedding season.`,
    `Wedding car rental in ${city.name}: decorated Innova Crysta, Fortuner, or luxury sedan for baraat and vidaai. Guest shuttle service in Ertiga and Tempo Traveller. Packages from ₹5,000 with decoration, driver, and fuel for 100 km. 50% advance required. Call ${BUSINESS.phone} to discuss your requirements.`,
    `We provide decorated wedding cars in ${city.name} — baraat car, vidaai car, reception transfers, and guest shuttle service. Sedan from ₹5,000, Innova Crysta from ₹8,000, Fortuner from ₹12,000, decorated with fresh flowers. Chauffeurs are professionally dressed. Book early during peak wedding season (November–February).`,
  ];
  faqs.push({ question: `Do you offer wedding car rental in ${city.name}?`, answer: weddingAnswers[v] });

  // Corporate FAQ
  const corporateAnswers = [
    `Yes. We serve corporate clients in ${city.name} with monthly cab contracts, GST billing, dedicated account managers, and priority support. Employee transport, client pickups, airport transfers — all covered. Bulk discounts available. Call ${BUSINESS.phone} to discuss.`,
    `Corporate cab service in ${city.name}: monthly packages with 15–25% discount on regular fares, GST invoices for reimbursement, and a dedicated driver or driver pool for your company. We serve IT parks, manufacturing units, hospitals, and other large employers. Contact ${BUSINESS.phone}.`,
    `${BUSINESS.name} has corporate accounts with several companies operating in ${city.name}. We offer fixed monthly billing, GST-compliant invoices, last-minute booking support, and dedicated relationship management. Great for employee transport, executive travel, and client logistics.`,
  ];
  faqs.push({ question: `Is there corporate cab service in ${city.name}?`, answer: corporateAnswers[v] });

  // Payment FAQ
  const paymentAnswers = [
    `We accept Cash (most popular), UPI payments via Google Pay / PhonePe / Paytm, Credit and Debit Cards, and Bank Transfer. Corporate clients get monthly billing with NEFT/RTGS. No advance payment required for local bookings — pay at the end of your trip.`,
    `Payment options: Cash to driver at trip end, UPI (GPay, PhonePe, Paytm), card swipe, or bank transfer. For corporate accounts, monthly invoice and NEFT/RTGS accepted. We don't require advance payment for most local and outstation bookings.`,
    `All payment methods are welcome: cash, UPI (GPay, PhonePe, Paytm, BHIM), debit/credit card, net banking. Corporate clients receive monthly consolidated invoices with GST. No mandatory advance payment except for wedding car bookings (50% advance required).`,
  ];
  faqs.push({ question: `What payment methods do you accept for cab in ${city.name}?`, answer: paymentAnswers[v] });

  return faqs;
}

// ─── Hindi FAQs — natural Hinglish tone ───
export function getCityHindiFAQs(input: CityContentInput): { question: string; answer: string }[] {
  const { city } = input;
  const displayRate = getStateDisplayRate(input.stateSlug || 'west-bengal');
  const hash = getCityHash(city.slug);
  const v = hash % 3;

  const hintiFaqSets = [
    [
      { question: `${city.name} mein sabse achhi cab service kaun si hai?`, answer: `${BUSINESS.name} ${city.name} mein sabse reliable cab service hai. Hum 24/7 uplabdh hain, drivers police-verified hain, aur koi surge pricing nahi hai. Book karne ke liye ${BUSINESS.phone} pe call ya WhatsApp karein.` },
      { question: `${city.name} se outstation cab ka kiraya kitna hai?`, answer: `${city.name} se cab ka kiraya ${displayRate} se shuru hota hai. Sedan, SUV, Innova Crysta, aur Tempo Traveller available hain. One-way aur round trip dono options hain. Call karein ${BUSINESS.phone}.` },
      { question: `Kya ${city.name} mein raat ko cab milti hai?`, answer: `Ji haan, ${BUSINESS.name} ${city.name} mein 24 ghante, 365 din cab service deta hai. Raat 2 baje, subah 4 baje airport drop — hum hamesha available hain. Same fixed rate, koi raat ka surcharge nahi.` },
    ],
    [
      { question: `${city.name} mein cab kaise book karein?`, answer: `${BUSINESS.phone} pe call karein ya WhatsApp karein. Apna pickup address, destination, date, time batayein. 2 minute mein confirmation milega — driver ka naam, mobile number, aur gaadi ka number.` },
      { question: `${city.name} mein cab ka rate per km kya hai?`, answer: `${city.name} mein cab rate ${displayRate} se shuru hota hai sedan ke liye. SUV thoda zyada. Local packages mein 4 ghante ya 8 ghante ki facility hai. Koi hidden charge nahi. Full detail ke liye ${BUSINESS.phone} pe call karein.` },
      { question: `Kya ${city.name} mein AC cab milti hai?`, answer: `Bilkul. ${BUSINESS.name} ki saari gaadiyaan — Sedan, SUV, Innova — AC hain. Gaadi hamesha saaf aur sanitized hoti hai. Driver professionally dressed aur experienced hota hai.` },
    ],
    [
      { question: `${city.name} se one-way cab ki facility hai?`, answer: `Haan, one-way cab ${city.name} se har sheher ke liye available hai. Aap sirf apni direction ka kiraya dete hain — wapsi ka koi charge nahi. Yeh round trip se kaafi sasta padta hai.` },
      { question: `${city.name} mein cab book karne ka number kya hai?`, answer: `${BUSINESS.name} ka booking number hai ${BUSINESS.phone}. Call ya WhatsApp karein. Hum 24/7 available hain.` },
      { question: `${city.name} mein airport cab milti hai?`, answer: `Haan, ${city.airport ? city.airport + ' pe' : 'airport pe'} pickup aur drop dono available hain. Flight track karke driver wait karta hai. Flat rate — koi meter nahi, koi surge nahi.` },
    ],
  ];

  return hintiFaqSets[v];
}

// ─── "Why Choose Us" — 4-pool rotation ───
export function getCityWhyChooseUs(cityName: string): { title: string; description: string }[] {
  const hash = getCityHash(cityName);
  const v = hash % 4;

  const driverSets = [
    `All ${cityName} drivers are police-verified, hold valid commercial licences, and have 5+ years of local driving experience. They know the city's lanes, shortcuts, and traffic patterns.`,
    `Our drivers in ${cityName} undergo background verification, commercial licence checks, and regular customer feedback reviews. 5+ years of professional experience is the minimum threshold.`,
    `Every driver we assign in ${cityName} is police-verified with a clean record, holds a commercial vehicle licence, and has hands-on experience navigating the city's roads in all traffic conditions.`,
    `We work only with verified, experienced drivers in ${cityName}. Each driver clears police verification, holds commercial driving credentials, and knows the city's routes inside out.`,
  ];

  const fleetSets = [
    `Our vehicles are AC, sanitized before each trip, and serviced at authorised centres. Sedan, SUV, Innova Crysta, and Tempo Traveller — all maintained to a high standard.`,
    `Every car in our ${cityName} fleet gets a cleanliness check and basic mechanical inspection before departure. AC, GPS tracking, and regular authorised servicing are non-negotiable.`,
    `AC vehicles, sanitized interiors, functioning seat belts, and GPS tracking. Our fleet covers Sedan, SUV, Innova Crysta, and Tempo Traveller — all kept in road-ready condition.`,
    `We maintain our vehicles regularly at authorised service centres. Every cab you book in ${cityName} is air-conditioned, GPS-tracked, and cleaned before the trip starts.`,
  ];

  const pricingSets = [
    `Fixed fares with no surge pricing — ever. Same rate during Durga Puja, Diwali, monsoon rush, or midnight. Toll and parking are communicated before the journey, not added at the end.`,
    `Our fare structure in ${cityName} is transparent and fixed. No dynamic pricing, no hidden charges. Toll fees are disclosed upfront. What we quote is what you pay.`,
    `You'll never face surge pricing with us in ${cityName}. Same rate at 3 AM as at noon. All fares include driver and fuel. Toll and parking are mentioned before you confirm.`,
    `Honest pricing — no algorithms, no surge, no surprises. The rate you get when you call is the rate you pay at the end. Toll charges are told upfront. Festival days cost the same as regular days.`,
  ];

  const availSets = [
    `Booking confirmation in under 2 minutes, driver arrives 10–15 minutes early. Available 24/7 including major festivals, public holidays, and bad weather days.`,
    `We confirm bookings fast — usually under 2 minutes. Driver is told to reach 10 minutes before pickup time. Operating 24/7 in ${cityName}, rain or festival or midnight.`,
    `Round-the-clock availability in ${cityName}. Instant booking confirmations. Drivers briefed to arrive ahead of schedule. Never a last-minute cancellation from our side.`,
    `24/7 operations across ${cityName}. No "driver not available" situations — we always have fleet on standby. Booking confirmed in 2 minutes, driver dispatched within minutes.`,
  ];

  const paymentSets = [
    `Pay at trip end via Cash, UPI (GPay, PhonePe, Paytm), or Card. No advance required for regular bookings. Corporate clients get monthly billing with GST invoices.`,
    `Flexible payment — Cash, UPI, or Card at trip end. No advance payment pressure. Corporate accounts get consolidated monthly invoices with proper GST documentation.`,
    `We accept all payment modes: Cash, UPI, Credit/Debit Card, Bank Transfer. Pay after your trip — no upfront deposits for local and outstation bookings.`,
    `Cash to driver, UPI scan, or card swipe — all accepted in ${cityName}. Corporate clients receive GST invoices monthly. Pay at the end of the trip, not before.`,
  ];

  const bookingSets = [
    `No app download, no registration. One call or WhatsApp message to ${BUSINESS.phone} and you're done. Driver details on WhatsApp, payment at trip end.`,
    `Booking is a 1-minute process. Call or WhatsApp ${BUSINESS.phone}, give trip details, receive confirmation. No account needed. Driver contacts you directly.`,
    `Simple, app-free booking. Phone or WhatsApp to ${BUSINESS.phone}. We confirm in under 2 minutes. Driver sends a message before departure. No registration required.`,
    `Skip the app and the registration. A WhatsApp or phone call to ${BUSINESS.phone} gets your cab confirmed in 2 minutes. Driver number comes directly to you.`,
  ];

  return [
    { title: 'Verified Local Drivers', description: driverSets[v] },
    { title: 'Clean AC Fleet', description: fleetSets[v] },
    { title: 'Fixed, Honest Pricing', description: pricingSets[v] },
    { title: '24/7 Availability', description: availSets[v] },
    { title: 'Flexible Payments', description: paymentSets[v] },
    { title: 'Simple Booking', description: bookingSets[v] },
  ];
}

// ─── Main export ───
export function generateCityPageContent(input: CityContentInput) {
  const { city } = input;

  return {
    aboutContent: getAboutCityContent(input),
    areas: getCityAreas(city),
    faqs: [...getCityExtendedFAQs(input), ...getCityHindiFAQs(input)],
    whyChooseUs: getCityWhyChooseUs(city.name),
    isKolkata: city.slug === 'kolkata',
    popularSearches: [
      // ═══ PRIMARY KEYWORDS ═══
      `cab service in ${city.name}`,
      `${city.name} cab service`,
      `${city.name} taxi service`,
      `taxi service in ${city.name}`,
      `taxi in ${city.name}`,
      `cab in ${city.name}`,
      `${city.name} cab`,
      `${city.name} taxi`,
      `car rental ${city.name}`,
      `${city.name} car hire`,
      // ═══ BOOKING & ACTION ═══
      `book cab ${city.name}`,
      `book taxi ${city.name}`,
      `${city.name} cab booking`,
      `${city.name} taxi booking`,
      `${city.name} cab booking online`,
      `hire cab ${city.name}`,
      `rent car ${city.name}`,
      `${city.name} cab online`,
      `whatsapp cab booking ${city.name}`,
      // ═══ NEAR ME ═══
      `cab near me ${city.name}`,
      `taxi near me ${city.name}`,
      `cab service near me ${city.name}`,
      `car rental near me ${city.name}`,
      // ═══ QUALITY ═══
      `best cab service ${city.name}`,
      `best taxi service ${city.name}`,
      `trusted cab ${city.name}`,
      `reliable cab ${city.name}`,
      `safe cab ${city.name}`,
      // ═══ PRICING ═══
      `${city.name} cab fare`,
      `${city.name} taxi fare`,
      `${city.name} cab rate per km`,
      `${city.name} cab price`,
      `cheap cab ${city.name}`,
      `affordable cab ${city.name}`,
      `${city.name} cab fare chart`,
      // ═══ OUTSTATION ═══
      `outstation cab ${city.name}`,
      `${city.name} outstation cab`,
      `outstation cab from ${city.name}`,
      `intercity cab ${city.name}`,
      // ═══ LOCAL TAXI ═══
      `local taxi ${city.name}`,
      `${city.name} local taxi`,
      `local cab service ${city.name}`,
      `hourly cab rental ${city.name}`,
      `${city.name} hourly taxi`,
      // ═══ ONE-WAY ═══
      `one way cab ${city.name}`,
      `${city.name} one way cab`,
      `one way taxi from ${city.name}`,
      `drop taxi ${city.name}`,
      // ═══ ROUND TRIP ═══
      `round trip cab ${city.name}`,
      `${city.name} round trip taxi`,
      // ═══ AIRPORT ═══
      `${city.name} airport cab`,
      `airport taxi ${city.name}`,
      `${city.name} airport transfer`,
      `${city.name} airport pickup`,
      // ═══ RAILWAY ═══
      `${city.name} station cab`,
      `${city.name} railway station taxi`,
      `cab from ${city.name} station`,
      // ═══ VEHICLE-SPECIFIC ═══
      `${city.name} innova cab`,
      `${city.name} suv cab`,
      `${city.name} sedan cab`,
      `${city.name} tempo traveller`,
      `innova on rent ${city.name}`,
      // ═══ WEDDING ═══
      `wedding car ${city.name}`,
      `${city.name} wedding car rental`,
      `baraat car ${city.name}`,
      // ═══ CORPORATE ═══
      `corporate cab ${city.name}`,
      `${city.name} corporate car rental`,
      `employee transport ${city.name}`,
      // ═══ TIME-SPECIFIC ═══
      `24 hour taxi ${city.name}`,
      `late night cab ${city.name}`,
      `early morning cab ${city.name}`,
      // ═══ COMPARISON ═══
      `no surge cab ${city.name}`,
      `fixed rate cab ${city.name}`,
      `${city.name} cab vs ola`,
      // ═══ ROUTE-SPECIFIC ═══
      `${city.name} to kolkata cab`,
      `kolkata to ${city.name} cab`,
      `${city.name} to darjeeling cab`,
      `${city.name} to puri cab`,
      `${city.name} to digha cab`,
      // ═══ PURPOSE-SPECIFIC ═══
      `${city.name} sightseeing cab`,
      `${city.name} cab for hospital`,
      `${city.name} cab for family trip`,
      `${city.name} darshan cab`,
      // ═══ SAFETY FEATURES ═══
      `gps tracked cab ${city.name}`,
      `verified driver cab ${city.name}`,
      `ac cab ${city.name}`,
      // ═══ QUESTION-FORMAT ═══
      `how to book cab in ${city.name}`,
      `what is cab fare in ${city.name}`,
      `which is best cab service in ${city.name}`,
      `${city.name} cab phone number`,
      // ═══ PAYMENT ═══
      `upi payment cab ${city.name}`,
      // ═══ FESTIVAL / SEASONAL ═══
      `${city.name} durga puja cab`,
      `${city.name} diwali cab`,
      `${city.name} holiday cab`,
      // ═══ GROUP & FAMILY ═══
      `${city.name} group cab`,
      `${city.name} family cab`,
      // ═══ ALTERNATE NAME KEYWORDS ═══
      ...(city.alternateNames || []).flatMap(alt => [
        `${alt} cab service`,
        `${alt} taxi service`,
        `cab service in ${alt}`,
        `taxi in ${alt}`,
        `${alt} to kolkata cab`,
        `kolkata to ${alt} cab`,
        `${alt} cab booking`,
      ]),
      // ═══ HINDI / HINGLISH ═══
      `${city.name} cab service number`,
      `${city.name} cab ka number`,
      `${city.name} se kolkata cab`,
      `${city.name} mein cab`,
      `${city.name} taxi ka kiraya`,
    ],
  };
}
