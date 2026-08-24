import { Metadata } from 'next';
import { BUSINESS } from './data';

const DOMAIN = BUSINESS.domain;
const LOGO_URL = `${DOMAIN}/logo.png`;
const OG_IMAGE_URL = `${DOMAIN}/navbanner.webp`;

// ═══════════════════════════════════════════════════
// GEO META HELPERS
// ═══════════════════════════════════════════════════

const STATE_CODE_MAP: Record<string, string> = {
  'west-bengal': 'IN-WB', 'jharkhand': 'IN-JH', 'odisha': 'IN-OR',
  'bihar': 'IN-BR', 'uttar-pradesh': 'IN-UP', 'assam': 'IN-AS', 'sikkim': 'IN-SK',
  'chhattisgarh': 'IN-CT', 'meghalaya': 'IN-ML', 'tripura': 'IN-TR',
};

export function getCityGeoMeta(cityName: string, stateSlug: string, lat?: number, lng?: number) {
  const stateCode = STATE_CODE_MAP[stateSlug] || 'IN';
  return {
    'geo.region': stateCode,
    'geo.placename': cityName,
    'geo.position': lat && lng ? `${lat};${lng}` : '',
    'ICBM': lat && lng ? `${lat}, ${lng}` : '',
  };
}

// ═══════════════════════════════════════════════════
// PAGE METADATA GENERATORS
// ═══════════════════════════════════════════════════

export function generateHomePageMetadata(): Metadata {
  return {
    // `absolute` prevents layout template from appending again
    // Keyword-first title: primary keyword before brand for SERP click-through
    title: { absolute: 'Cab Service Kolkata ₹12/km | Airport Taxi ₹1,800 | NK Cab & Taxi 4.8★' },
    description: `NK Cab & Taxi — Kolkata's #1 outstation one-way drop taxi. Sedan ₹12/km | Airport ₹1,800 | Local 4hr ₹1,800 | 5000+ trips, rated 4.8/5. Innova, Ertiga, Dzire. No surge 24/7. Call ${BUSINESS.phone}`,
    alternates: { canonical: `${DOMAIN}/` },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: 'NK Cab & Taxi',
      title: 'NK Cab & Taxi Kolkata | Cab from ₹12/km | Airport & Outstation Taxi 24/7',
      description: `Rated 4.8/5. NK Cab & Taxi — Best cab in Kolkata & East India. Outstation ₹12/km | Airport from ₹1,800 | Local packages. WB, Jharkhand, Odisha. No surge. Call ${BUSINESS.phone}.`,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'NK Cab & Taxi — Rated 4.8/5 Cab & Taxi Service in Kolkata & East India' }],
      url: `${DOMAIN}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'NK Cab & Taxi Kolkata | ₹12/km | Rated 4.8 | 24/7 East India',
      description: `Rated 4.8/5. NK Cab & Taxi. Outstation ₹12/km | Airport from ₹1,800. AC Innova, Ertiga, Dzire. No surge. Call ${BUSINESS.phone}.`,
      images: [OG_IMAGE_URL],
    },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

// ═══════════════════════════════════════════════════
// ROUTE KEYWORD GENERATOR — typo/variant coverage
// ═══════════════════════════════════════════════════
export function generateRouteKeywords(
  fromName: string, toName: string,
  fromAlternateNames?: string[], toAlternateNames?: string[]
): string[] {
  const f = fromName.toLowerCase();
  const t = toName.toLowerCase();
  const fSlug = f.replace(/\s+/g, '');
  const tSlug = t.replace(/\s+/g, '');
  const fDash = f.replace(/\s+/g, '-');
  const tDash = t.replace(/\s+/g, '-');

  const base: string[] = [
    // Standard forms
    `${fromName} to ${toName} cab`, `${fromName} to ${toName} taxi`,
    `${fromName} to ${toName} car`, `${fromName} ${toName} cab`,
    `${fromName} to ${toName} cab service`, `${fromName} to ${toName} taxi service`,
    `book cab ${fromName} to ${toName}`, `book taxi ${fromName} to ${toName}`,
    `${fromName} to ${toName} innova cab`, `${fromName} to ${toName} suv cab`,
    `${fromName} to ${toName} sedan cab`, `${fromName} to ${toName} one way cab`,
    `${fromName} to ${toName} round trip`, `cab from ${fromName} to ${toName}`,
    `taxi from ${fromName} to ${toName}`, `outstation cab ${fromName} to ${toName}`,
    `${fromName} to ${toName} cab fare`, `${fromName} to ${toName} cab price`,
    `${fromName} to ${toName} cab rate`, `${fromName} to ${toName} cab booking`,
    // Typo / concatenated variants (very important for mistyped searches)
    `${fSlug}to${tSlug} cab`, `${fSlug}to${tSlug} taxi`,
    `${fSlug} to ${toName} cab`, `${fromName} to ${tSlug} cab`,
    `${fromName}to${toName} cab`, `${fromName}to${toName} taxi`,
    `${fDash}to${tDash} cab`, `${fDash} to ${toName} taxi`,
    // NOTE: Reverse route keywords removed — they belong on the reverse route page only.
  ];

  // Add alternate name variants
  if (fromAlternateNames) {
    for (const alt of fromAlternateNames.slice(0, 3)) {
      base.push(`${alt} to ${toName} cab`, `${alt} to ${toName} taxi`);
    }
  }
  if (toAlternateNames) {
    for (const alt of toAlternateNames.slice(0, 3)) {
      base.push(`${fromName} to ${alt} cab`, `${fromName} to ${alt} taxi`);
    }
  }

  return base;
}

export function generateRouteMetadata(
  fromName: string, toName: string, distance: number, priceSaloon: number, slug?: string,
  fromAlternateNames?: string[], toAlternateNames?: string[],
  priceSuvActual?: number
): Metadata {
  const routeSlug = slug || `${fromName.toLowerCase().replace(/\s+/g, '-')}-to-${toName.toLowerCase().replace(/\s+/g, '-')}`;
  const priceSuv = priceSuvActual ?? Math.round(priceSaloon * 1.27);

  // Deterministic hash → selects different template per route pair
  const nameHash = (fromName + toName).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const tv = nameHash % 4; // title variant
  const dv = nameHash % 6; // description variant

  const altWords: string[] = [];
  if (fromAlternateNames && fromAlternateNames.length > 0) altWords.push(...fromAlternateNames);
  if (toAlternateNames && toAlternateNames.length > 0) altWords.push(...toAlternateNames);
  const altSuffix = altWords.length > 0 ? ` Also: ${altWords.slice(0, 2).join(', ')}.` : '';

  // 4 structurally different title templates — avoids identical <title> across all route pages.
  // POSITIONING: this site is the OUTSTATION / ONE-WAY DROP specialist brand.
  // Title phrasing is deliberately distinct from generic "cab service" patterns
  // so search engines see two clearly differentiated sites, not mirrors.
  const titles = [
    `${fromName} to ${toName} One-Way Taxi ₹${priceSaloon} | Fixed Drop Fare, No Return Charge`,
    `${fromName} → ${toName} Outstation Drop Taxi ₹${priceSaloon} | Pay One Side Only`,
    `${fromName}–${toName} One Way Cab ₹${priceSaloon} | ${distance}km Door-to-Door Drop`,
    `${fromName} to ${toName} Drop Taxi ₹${priceSaloon} Fixed | Sedan, SUV & Innova | One-Way Specialist`,
  ];
  const title = titles[tv];

  // 6 structurally different description templates — uniquifies meta across route pages.
  // All lead with one-way / drop-trip value props instead of generic cab booking copy.
  const descs = [
    `One-way taxi from ${fromName} to ${toName} — ₹${priceSaloon} all-inclusive.${altSuffix} ${distance} km door-to-door drop. Pay one side only, no return fare. AC cab, verified driver. Call ${BUSINESS.phone}`.slice(0, 160),
    `${fromName} to ${toName} drop service: fixed ₹${priceSaloon} sedan fare.${altSuffix} Fuel + driver included, toll told upfront. No surge at any hour. WhatsApp booking: ${BUSINESS.phone}`.slice(0, 160),
    `Save 40% vs round trip — book one-way ${fromName}–${toName} cab at ₹${priceSaloon}.${altSuffix} ${distance} km door-to-door. Sedan, SUV, Innova available. Call ${BUSINESS.phone}`.slice(0, 160),
    `Outstation drop taxi ${fromName} → ${toName} from ₹${priceSaloon}.${altSuffix} Door pickup, highway-experienced driver, GPS-tracked AC cab. Instant confirm: ${BUSINESS.phone}`.slice(0, 160),
    `${fromName} to ${toName} one-way fare just ₹${priceSaloon} (Sedan) / ₹${priceSuv} (SUV).${altSuffix} No return charge, no night halt fee. 24/7 drops. Book: ${BUSINESS.phone}`.slice(0, 160),
    `Intercity drop cab ${fromName}–${toName} (${distance} km) at flat ₹${priceSaloon}.${altSuffix} Pay only for the drop — driver returns empty, you don't pay for it. Call ${BUSINESS.phone}`.slice(0, 160),
  ];
  const desc = descs[dv];

  // keywords intentionally omitted — Google ignores meta keywords (deprecated since 2009)
  return {
    title,
    description: desc,
    openGraph: {
      title: `${fromName} to ${toName} One-Way Taxi ₹${priceSaloon} | ${BUSINESS.name}`,
      description: `One-way drop cab ${fromName} to ${toName}. ${distance} km, Sedan ₹${priceSaloon}, SUV ₹${priceSuv}. Pay one side only. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: `${DOMAIN}/routes/${routeSlug}`,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `${fromName} to ${toName} One-Way Drop Taxi - ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fromName} to ${toName} One-Way Taxi ₹${priceSaloon} | Drop 24/7`,
      description: `One-way outstation taxi ${fromName}–${toName}. ${distance} km. Fixed fare, no return charge. Call ${BUSINESS.phone}`,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: `${DOMAIN}/routes/${routeSlug}` },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

// Hub city keyword banks for geo-specific ranking
const HUB_CITY_KEYWORDS: Record<string, string[]> = {
  'ranchi': [
    'cab service in ranchi', 'ranchi taxi service', 'ranchi cab booking', 'taxi in ranchi',
    'ranchi airport cab', 'ranchi airport taxi', 'birsa munda airport cab', 'cab near me ranchi',
    'ranchi to kolkata cab', 'ranchi to jamshedpur cab', 'ranchi to deoghar cab',
    'ranchi to patna cab', 'ranchi outstation cab', 'ranchi local taxi', 'ranchi one way cab',
    'book cab ranchi', 'best cab service ranchi', 'cheapest taxi ranchi', 'ranchi car rental',
    'ranchi innova cab', 'ranchi suv taxi', 'ranchi cab rate per km', '24 hour taxi ranchi',
    'ranchi to bokaro cab', 'ranchi to dhanbad taxi', 'ranchi to hazaribagh cab',
    'taxi near me ranchi jharkhand', 'cab booking online ranchi', 'ac cab ranchi',
  ],
  'jamshedpur': [
    'cab service in jamshedpur', 'jamshedpur taxi service', 'jamshedpur cab booking',
    'taxi in jamshedpur', 'tatanagar cab service', 'tatanagar taxi', 'cab near me jamshedpur',
    'jamshedpur to kolkata cab', 'jamshedpur to ranchi cab', 'jamshedpur to kolkata airport cab',
    'jamshedpur outstation cab', 'jamshedpur local taxi', 'jamshedpur one way cab',
    'book cab jamshedpur', 'best cab service jamshedpur', 'cheapest taxi jamshedpur',
    'jamshedpur car rental', 'jamshedpur innova cab', 'jamshedpur to deoghar cab',
    'jamshedpur to dhanbad cab', 'jamshedpur to bokaro cab', '24 hour taxi jamshedpur',
    'taxi near me jamshedpur jharkhand', 'cab booking online jamshedpur', 'ac cab jamshedpur',
    'jamshedpur to patna cab', 'jamshedpur to howrah cab', 'jamshedpur cab rate per km',
  ],
  'bhubaneswar': [
    'cab service in bhubaneswar', 'bhubaneswar taxi service', 'bhubaneswar cab booking',
    'taxi in bhubaneswar', 'bhubaneswar airport cab', 'biju patnaik airport cab',
    'bhubaneswar to puri cab', 'bhubaneswar to konark cab', 'bhubaneswar outstation cab',
    'bhubaneswar local taxi', 'bhubaneswar one way cab', 'book cab bhubaneswar',
    'best cab service bhubaneswar', 'cheapest taxi bhubaneswar', 'bhubaneswar car rental',
    'bhubaneswar to cuttack cab', 'bhubaneswar to kolkata cab', 'bhubaneswar innova cab',
    '24 hour taxi bhubaneswar', 'bhubaneswar cab rate per km', 'cab near me bhubaneswar',
    'taxi near me bhubaneswar odisha', 'cab booking online bhubaneswar', 'ac cab bhubaneswar',
    'bhubaneswar to rourkela cab', 'bhubaneswar to berhampur cab', 'bhubaneswar suv taxi',
  ],
  'kolkata': [
    // Primary keywords (highest volume)
    'NK Cab & Taxi', 'kolkata cab', 'kolkata taxi', 'kolkata taxi service',
    'cab service in kolkata', 'taxi service in kolkata', 'cab in kolkata', 'taxi in kolkata',
    'kolkata car rental', 'car rental in kolkata', 'car rental kolkata', 'car hire kolkata',
    'cab booking kolkata', 'taxi booking kolkata', 'book cab kolkata', 'book taxi kolkata',
    'kolkata cab booking', 'kolkata taxi booking', 'online cab booking kolkata',
    'best cab service in kolkata', 'best taxi service in kolkata', 'best cab kolkata',
    'best taxi kolkata', 'top cab service kolkata', 'top taxi service kolkata',
    // Near me variations
    'cab near me kolkata', 'taxi near me kolkata', 'cab service near me kolkata',
    'taxi service near me', 'cab near me', 'taxi near me', 'book cab near me kolkata',
    'cab near me kolkata west bengal', 'taxi near me kolkata west bengal',
    // Innova & vehicle-specific (HIGH VOLUME — competitors rank for these)
    'innova cab in kolkata', 'innova cab kolkata', 'kolkata innova cab',
    'kolkata innova crysta cab', 'innova crysta on rent kolkata', 'innova on rent kolkata',
    'toyota innova cab kolkata', 'innova hire kolkata', 'book innova kolkata',
    'suv cab kolkata', 'kolkata suv cab', 'kolkata suv taxi', 'ertiga cab kolkata',
    'kolkata ertiga cab', 'sedan cab kolkata', 'swift dzire kolkata',
    'tempo traveller kolkata', 'kolkata tempo traveller', '12 seater tempo kolkata',
    'luxury car rental kolkata', 'fortuner on rent kolkata', 'sedan on rent kolkata',
    'suv on rent kolkata', 'ac cab kolkata', 'clean cab kolkata',
    // Airport keywords
    'kolkata airport taxi', 'kolkata airport cab', 'kolkata airport cab service',
    'kolkata airport taxi service', 'ccu airport cab', 'ccu airport taxi',
    'netaji subhash chandra bose airport cab', 'netaji subhash airport cab',
    'dum dum airport cab', 'dum dum airport taxi', 'kolkata airport pickup', 
    'kolkata airport drop', 'kolkata airport transfer', 'cab from kolkata airport',
    'taxi from kolkata airport', 'kolkata to airport cab', 'airport cab service kolkata',
    'airport taxi service kolkata', 'airport innova kolkata', 'airport cab 24/7 kolkata',
    // Service type keywords
    'kolkata outstation cab', 'outstation cab kolkata', 'outstation taxi kolkata',
    'kolkata one way cab', 'one way cab kolkata', 'one way taxi kolkata',
    'kolkata local taxi', 'local cab kolkata', 'local taxi kolkata',
    'kolkata round trip cab', 'round trip taxi kolkata', 'intercity cab kolkata',
    'kolkata cab for outstation', 'kolkata hourly cab', 'hourly taxi kolkata',
    // Area-specific keywords (HIGH LOCAL VALUE)
    'howrah cab', 'howrah taxi', 'howrah cab service', 'howrah taxi service',
    'salt lake cab', 'salt lake taxi', 'salt lake cab service', 'bidhannagar cab',
    'new town cab', 'new town taxi', 'new town kolkata cab', 'rajarhat cab',
    'park street taxi kolkata', 'park street cab', 'dum dum cab', 'dum dum taxi',
    'ballygunge cab', 'gariahat cab', 'tollygunge cab', 'behala cab',
    'barasat cab', 'jadavpur cab', 'esplanade cab', 'sealdah cab',
    'howrah station cab', 'sealdah station cab', 'kolkata station cab',
    'ultadanga cab', 'maniktala cab', 'shyambazar cab', 'lake town cab',
    'vip road cab kolkata', 'em bypass cab', 'alipore cab', 'south kolkata cab',
    'north kolkata cab', 'east kolkata cab', 'central kolkata cab',
    'garia cab', 'narendrapur cab', 'joka cab', 'thakurpukur cab',
    'belghoria cab', 'barrackpore cab', 'sodepur cab', 'titagarh cab',
    'kalyani cab', 'naihati cab', 'bandel cab', 'chinsurah cab',
    // Route-specific keywords (HIGH VOLUME)
    'kolkata to darjeeling cab', 'kolkata to puri cab', 'kolkata to digha cab',
    'kolkata to siliguri cab', 'kolkata to jamshedpur cab', 'kolkata to ranchi cab',
    'kolkata to mandarmani cab', 'kolkata to gangasagar cab', 'kolkata to sundarbans cab',
    'kolkata to mayapur cab', 'kolkata to durgapur cab', 'kolkata to asansol cab',
    'kolkata to shantiniketan cab', 'kolkata to bhubaneswar cab', 'kolkata to konark cab',
    'kolkata to bakkhali cab', 'kolkata to tajpur cab', 'kolkata to medinipur cab',
    'kolkata to kharagpur cab', 'kolkata to haldia cab', 'kolkata to deoghar cab',
    'kolkata to darjeeling innova', 'kolkata to puri innova', 'kolkata to digha innova',
    'kolkata to siliguri innova cab', 'kolkata to jamshedpur innova',
    // Wedding & corporate keywords
    'wedding car rental kolkata', 'wedding car kolkata', 'shaadi car kolkata',
    'baraat car kolkata', 'decorated car kolkata', 'corporate cab kolkata',
    'corporate car rental kolkata', 'office cab kolkata', 'employee transport kolkata',
    'gst cab invoice kolkata', 'monthly car rental kolkata',
    // Pricing keywords
    'kolkata cab fare', 'kolkata taxi fare', 'kolkata cab rate per km',
    'kolkata taxi rate', 'kolkata cab price', 'kolkata taxi price',
    'cheap cab kolkata', 'cheapest cab kolkata', 'cheapest taxi kolkata',
    'affordable cab kolkata', 'affordable taxi kolkata', 'low cost cab kolkata',
    'kolkata cab charges', 'kolkata cab fare per km', 'kolkata cab fare chart',
    'cab fare chart kolkata', 'kolkata taxi fare chart',
    // Action keywords
    'hire cab kolkata', 'hire taxi kolkata', 'rent car kolkata',
    'book online cab kolkata', 'cab booking online kolkata',
    'call cab kolkata', 'whatsapp cab booking kolkata',
    // Time-specific keywords
    '24 hour taxi kolkata', '24x7 cab kolkata', '24/7 cab service kolkata',
    'midnight cab kolkata', 'early morning cab kolkata', 'late night cab kolkata',
    'night taxi kolkata', 'early morning flight cab kolkata',
    // Comparison keywords
    'kolkata cab vs ola', 'kolkata cab vs uber', 'better than ola kolkata',
    'better than uber kolkata', 'no surge cab kolkata', 'fixed rate cab kolkata',
    'ola alternative kolkata', 'uber alternative kolkata', 'rapido alternative kolkata',
    // Feature keywords
    'ac cab kolkata', 'reliable cab kolkata', 'safe taxi kolkata',
    'gps tracked cab kolkata', 'verified driver cab kolkata', 'sanitized cab kolkata',
    // Festival keywords
    'durga puja cab kolkata', 'diwali cab kolkata', 'puja cab kolkata',
    'festival cab kolkata', 'pandal hopping cab kolkata', 'kali puja cab kolkata',
    // Question-format (People Also Ask)
    'how to book cab in kolkata', 'which is best cab service in kolkata',
    'NK Cab & Taxi number', 'cab service contact number kolkata',
    'cheapest cab service in kolkata', 'best car rental kolkata',
    'innova on rent near me kolkata', 'cab near me now kolkata',
  ],
  'siliguri': [
    'cab service in siliguri', 'siliguri taxi service', 'siliguri cab booking',
    'taxi in siliguri', 'cab in siliguri', 'siliguri car rental', 'car rental siliguri',
    'bagdogra airport cab', 'bagdogra airport taxi', 'siliguri to darjeeling cab',
    'siliguri to gangtok cab', 'siliguri to kalimpong cab', 'siliguri to mirik cab',
    'siliguri outstation cab', 'siliguri local taxi', 'best cab service siliguri',
    'siliguri to kolkata cab', 'njp station cab', 'new jalpaiguri cab service',
    'siliguri car rental', 'taxi near me siliguri', '24 hour taxi siliguri',
    'siliguri innova cab', 'siliguri suv taxi', 'siliguri cab rate per km',
    'book cab siliguri', 'cheap cab siliguri', 'affordable taxi siliguri',
    'siliguri to sikkim cab', 'siliguri to nepal cab', 'siliguri to bhutan cab',
  ],
  'dhanbad': [
    'cab service in dhanbad', 'dhanbad taxi service', 'dhanbad cab booking',
    'taxi in dhanbad', 'cab in dhanbad', 'dhanbad car rental', 'car rental dhanbad',
    'dhanbad to kolkata cab', 'dhanbad to ranchi cab', 'dhanbad to deoghar cab',
    'dhanbad outstation cab', 'dhanbad local taxi', 'best cab service dhanbad',
    'dhanbad car rental', 'taxi near me dhanbad', '24 hour taxi dhanbad',
    'dhanbad to jamshedpur cab', 'dhanbad to bokaro cab', 'dhanbad cab rate per km',
    'dhanbad innova cab', 'dhanbad suv taxi', 'book cab dhanbad',
    'cheap cab dhanbad', 'cab near me dhanbad', 'affordable taxi dhanbad',
  ],
};

export function generateCityMetadata(cityName: string, stateName: string): Metadata {
  const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-');
  const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
  const isKolkata = citySlug === 'kolkata';

  // Unified rate for all states
  const STATE_RATES: Record<string, string> = {
    'west-bengal': '₹12/km',
    'jharkhand':   '₹12/km',
    'odisha':      '₹12/km',
    'bihar':       '₹14/km',
    'uttar-pradesh': '₹14/km',
  };
  const AIRPORT_RATES: Record<string, string> = {
    'west-bengal': '1200',
    'jharkhand':   '1200',
    'odisha':      '1200',
    'bihar':       '1500',
    'uttar-pradesh': '1500',
  };
  const baseRate    = STATE_RATES[stateSlug]    ?? '₹12/km';
  const airportRate = AIRPORT_RATES[stateSlug]  ?? '1200';

  // City-specific meta descriptions — 30+ individual city entries + 4 type-specific fallbacks
  // This eliminates the single generic template that was applied to 109/119 cities
  const cityDescs: Record<string, string> = {
    // ── Major Hubs (hand-crafted, all ≤155 chars) ──
    'kolkata':             `★4.8 cab in Kolkata. Outstation ₹12/km | Airport ₹1,200 | Local ₹1,800. Dzire, Ertiga, Innova. Salt Lake, Howrah. No surge. Call ${BUSINESS.phone}`,
    'ranchi':              `★4.8 cab in Ranchi ₹12/km. Birsa Munda Airport ₹1,200 | Kolkata, Jamshedpur routes. Innova, SUV, Sedan 24/7. Call ${BUSINESS.phone}`,
    'jamshedpur':          `★4.8 cab in Jamshedpur ₹12/km. Kolkata ₹4,500, Ranchi ₹1,800. Tatanagar taxi — AC Sedan & Innova. 24/7. Call ${BUSINESS.phone}`,
    'bhubaneswar':         `★4.8 cab in Bhubaneswar ₹12/km. Airport ₹1,200 | Puri ₹1,000, Konark ₹1,100. Dzire, Ertiga, Innova 24/7. Call ${BUSINESS.phone}`,
    'siliguri':            `★4.8 cab in Siliguri ₹12/km. Bagdogra Airport ₹1,200. Darjeeling (90km), Gangtok (120km). Dzire, Ertiga, Innova. 24/7. Call ${BUSINESS.phone}`,
    'darjeeling':          `★4.8 cab in Darjeeling ₹12/km. Local ₹1,800 | Tiger Hill, Toy Train, Tea Garden tours. Siliguri route. Innova certified. Call ${BUSINESS.phone}`,
    'dhanbad':             `★4.8 cab in Dhanbad ₹12/km. Kolkata (175km ₹2,200), Ranchi (150km ₹2,000), Deoghar ₹1,600. AC Sedan, Innova. 24/7. Call ${BUSINESS.phone}`,
    'bokaro':              `★4.8 cab in Bokaro ₹12/km. Ranchi ₹1,600, Dhanbad ₹1,200, Kolkata ₹3,400. Bokaro Steel City taxi. AC Sedan & SUV. Call ${BUSINESS.phone}`,
    'deoghar':             `★4.8 cab in Deoghar ₹12/km. Baidyanath Dham taxi. Ranchi ₹2,200, Kolkata ₹4,500. No surge during Shravan. Innova & Sedan. Call ${BUSINESS.phone}`,
    'puri':                `★4.8 cab in Puri ₹12/km. Jagannath Temple & Konark taxi. Bhubaneswar (60km ₹1,000). Dzire, Ertiga, Innova Crysta. 24/7. Call ${BUSINESS.phone}`,
    // ── West Bengal Cities ──
    'durgapur':            `★4.8 cab in Durgapur ₹12/km. Kolkata ₹2,200, Asansol ₹800. Steel city taxi — DPL, City Centre, Benachity. Sedan, SUV, Innova. Call ${BUSINESS.phone}`,
    'asansol':             `★4.8 cab in Asansol ₹12/km. Kolkata ₹2,600, Durgapur ₹800, Dhanbad ₹1,100. AC Sedan, SUV. Burnpur, Kulti, Raniganj. 24/7. Call ${BUSINESS.phone}`,
    'howrah':              `★4.8 cab in Howrah ₹12/km. Howrah Station taxi, Kolkata ₹800, Airport ₹1,200. Sibpur, Belur Math, Shalimar. AC Dzire, Innova. Call ${BUSINESS.phone}`,
    'kharagpur':           `★4.8 cab in Kharagpur ₹12/km. Kolkata ₹1,800, Bhubaneswar ₹4,500. IIT Kharagpur area. Sedan, SUV 24/7. Digha, Odisha route. Call ${BUSINESS.phone}`,
    'bardhaman':           `★4.8 cab in Bardhaman ₹12/km. Kolkata ₹1,600, Durgapur ₹1,000. Bardhaman University area. Sedan & SUV. 24/7 taxi. Call ${BUSINESS.phone}`,
    'haldia':              `★4.8 cab in Haldia ₹12/km. Kolkata (130km ₹1,900), Digha (100km ₹1,600). Haldia Port, HOC, IOCL plant area taxi. Sedan, SUV. 24/7. Call ${BUSINESS.phone}`,
    'midnapore':           `★4.8 cab in Midnapore ₹12/km. Kolkata ₹1,800, Digha ₹1,800. Medical College area. Outstation, local taxi. Sedan & Innova. 24/7. Call ${BUSINESS.phone}`,
    'digha':               `★4.8 cab in Digha ₹12/km. Kolkata (185km ₹2,500), Mandarmani (45km ₹900). Beach resort taxi — hotel pickup, sightseeing. Dzire, Ertiga. Call ${BUSINESS.phone}`,
    'mandarmani':          `★4.8 cab in Mandarmani ₹12/km. Kolkata ₹2,400, Digha ₹900. Resort pickup, Tajpur & Shankarpur sightseeing. AC Sedan & SUV. 24/7. Call ${BUSINESS.phone}`,
    'bolpur-shantiniketan':`★4.8 cab in Shantiniketan ₹12/km. Kolkata (155km ₹2,100). Visva-Bharati, Baul Mela. Heritage sightseeing taxi. Sedan & Innova. 24/7. Call ${BUSINESS.phone}`,
    'sundarbans':          `★4.8 cab to Sundarbans ₹12/km. Godkhali ghat (120km from Kolkata ₹1,800). Tiger reserve, Sajnekhali WLS. Sedan & SUV. 24/7. Call ${BUSINESS.phone}`,
    'mayapur':             `★4.8 cab to Mayapur ₹12/km. Kolkata (130km ₹1,900). ISKCON temple complex taxi. Nabadwip ferry ghat route. Dzire, Ertiga. Call ${BUSINESS.phone}`,
    'gangasagar':          `★4.8 cab to Gangasagar ₹12/km. Kolkata (135km ₹2,000) to Kachuberia ghat. Makar Sankranti cab. No surge. Sedan & SUV. Call ${BUSINESS.phone}`,
    'bishnupur':           `★4.8 cab to Bishnupur ₹12/km. Kolkata (200km ₹2,600). Terracotta temples, Baluchari saree market. Heritage tour. Sedan, Innova. Call ${BUSINESS.phone}`,
    'kolkata-airport':     `★4.8 Kolkata Airport cab from ₹1,200. Flight tracking, meet & greet. Salt Lake ₹900, Howrah ₹1,100, New Town ₹850. AC Sedan & Innova. Call ${BUSINESS.phone}`,
    'salt-lake-kolkata':   `★4.8 cab in Salt Lake (Bidhannagar) ₹12/km. Sector V IT hub, City Centre. CCU airport ₹900. Kolkata outstation, local. Dzire, Innova. Call ${BUSINESS.phone}`,
    'new-town-kolkata':    `★4.8 cab in New Town (Rajarhat) ₹12/km. Eco Park, Biswa Bangla. IT sector, Action Area I-III. Airport ₹850. Sedan, SUV. 24/7. Call ${BUSINESS.phone}`,
    'barasat':             `★4.8 cab in Barasat ₹12/km. Kolkata ₹800, Basirhat ₹1,000, Bongaon ₹900. NH35 corridor. Barasat court, Jagaddal. AC Sedan. 24/7. Call ${BUSINESS.phone}`,
    // ── Odisha Cities ──
    'cuttack':             `★4.8 cab in Cuttack ₹12/km. Bhubaneswar ₹700, Puri ₹1,400. Barabati Fort, Cuttack Chandi temple taxi. AC Sedan & SUV. 24/7. Call ${BUSINESS.phone}`,
    'rourkela':            `★4.8 cab in Rourkela ₹12/km. Bhubaneswar ₹4,800, Ranchi ₹2,000. SAIL plant, RSP colony, Bondamunda. Sedan & Innova. 24/7. Call ${BUSINESS.phone}`,
    'berhampur':           `★4.8 cab in Berhampur ₹12/km. Bhubaneswar ₹2,500, Puri ₹2,500. Gopalpur beach, Silk market. Thakurani temple taxi. AC Sedan. 24/7. Call ${BUSINESS.phone}`,
    'konark':              `★4.8 cab to Konark ₹12/km. Puri ₹700, Bhubaneswar ₹1,100, Kolkata (535km). UNESCO Sun Temple taxi. Chandrabhaga beach. Dzire, Innova. Call ${BUSINESS.phone}`,
    // ── Jharkhand Cities ──
    'hazaribagh':          `★4.8 cab in Hazaribagh ₹12/km. Ranchi ₹1,500, Dhanbad ₹1,600. Hazaribagh National Park, Canary Hill. Sedan & SUV. 24/7. Call ${BUSINESS.phone}`,
    'giridih':             `★4.8 cab in Giridih ₹12/km. Ranchi (160km ₹2,200), Dhanbad (90km ₹1,400). Parasnath pilgrimage, Usri Falls. Sedan & SUV. 24/7. Call ${BUSINESS.phone}`,
    'netarhat':            `★4.8 cab to Netarhat ₹12/km. Ranchi (156km ₹2,200). Sunrise point, Lodh Falls, Betla NP. Hill station cab. Innova certified. Call ${BUSINESS.phone}`,
    // ── Bihar Cities ──
    'patna':               `★4.8 cab in Patna ₹14/km. Gaya ₹1,500, Varanasi ₹3,800. Patna Sahib, Gandhi Maidan, AIIMS area. AC Sedan, Innova. 24/7. Call ${BUSINESS.phone}`,
    'gaya':                `★4.8 cab in Gaya ₹14/km. Bodh Gaya ₹400, Patna ₹1,500, Rajgir ₹1,200. Gaya Airport (GAY) transfers. Vishnupad temple. Sedan & SUV. Call ${BUSINESS.phone}`,
    'bodh-gaya':           `★4.8 cab in Bodh Gaya ₹14/km. Gaya Airport ₹400, Rajgir ₹1,000, Nalanda ₹1,400. Mahabodhi Temple, Buddhist circuit. Sedan & Innova. Call ${BUSINESS.phone}`,
    'nalanda':             `★4.8 cab to Nalanda ₹14/km. Patna ₹1,400, Rajgir ₹400, Bodh Gaya ₹1,400. University ruins, Bihar Sharif. Buddhist circuit cab. Sedan. Call ${BUSINESS.phone}`,
    'rajgir':              `★4.8 cab to Rajgir ₹14/km. Patna ₹1,500, Bodh Gaya ₹1,000, Nalanda ₹400. Vishwa Shanti Stupa, hot springs. Buddhist tour. Sedan & SUV. Call ${BUSINESS.phone}`,
    // ── Uttar Pradesh Cities ──
    'varanasi':            `★4.8 cab in Varanasi ₹14/km. Kolkata ₹8,000, Patna ₹3,800. Kashi Vishwanath, Ganga Aarti, Sarnath (10km). Ghats taxi. 24/7. Call ${BUSINESS.phone}`,
    'prayagraj':           `★4.8 cab in Prayagraj ₹14/km. Varanasi ₹1,900, Lucknow ₹3,000. Triveni Sangam, Anand Bhavan. Maha Kumbh taxi. Book early. Call ${BUSINESS.phone}`,
  };

  // 4 type-specific fallback templates — for remaining cities not in the map above
  // OUTSTATION/DROP positioning — distinct from generic city-service copy
  function getCityFallbackDesc(slug: string, name: string, rate: string, airRate: string): string {
    const hash = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 4;
    const templates = [
      `One-way drop taxi in ${name} from ${rate}. Intercity & airport drops ₹${airRate}. Pay one side only — driver returns empty, you don't pay. AC Sedan, SUV, Innova. Call ${BUSINESS.phone}`,
      `Outstation cab service in ${name} from ${rate}. One-way drops, round trips & airport transfer ₹${airRate}. Fixed fare, no surge, no return charge. 24/7. Call ${BUSINESS.phone}`,
      `Book intercity drop taxi in ${name} from ${rate}. Door pickup, highway-experienced drivers, GPS-tracked AC cabs. Airport ₹${airRate}. Instant WhatsApp confirm: ${BUSINESS.phone}`,
      `${name} one-way taxi from ${rate}. Drop to any city — fuel & driver included, toll told upfront. No night halt fee, no hidden charges. Available 24/7. Call ${BUSINESS.phone}`,
    ];
    return templates[hash];
  }

  const desc = cityDescs[citySlug] || getCityFallbackDesc(citySlug, cityName, baseRate, airportRate);

  // City-specific titles — OUTSTATION/DROP positioning to differentiate this brand
  // from generic "Cab Service in {city}" patterns used by other regional sites.
  const cityTitles: Record<string, string> = {
    'kolkata':             `Outstation Cab from Kolkata ₹12/km | One-Way Drop Taxi 24/7`,
    'ranchi':              `Outstation Cab from Ranchi ₹12/km | One-Way Drop & Airport Taxi`,
    'jamshedpur':          `Jamshedpur Outstation Taxi ₹12/km | One-Way Drop, Tatanagar Pickup`,
    'bhubaneswar':         `Bhubaneswar Outstation Cab ₹12/km | Puri-Konark Drop Taxi`,
    'siliguri':            `Siliguri Drop Taxi ₹12/km | Bagdogra Pickup, Hill Route Drops`,
    'darjeeling':          `Darjeeling Taxi Drop ₹12/km | Hill-Route Specialist Driver`,
    'dhanbad':             `Dhanbad Outstation Drop Taxi ₹12/km | Coal-Belt Route Expert`,
    'puri':                `Puri Drop Taxi ₹12/km | Jagannath Temple Route, Konark Trip`,
    'deoghar':             `Deoghar One-Way Taxi ₹12/km | Jasidih Station & Temple Drop`,
    'bokaro':              `Bokaro Outstation Cab ₹12/km | Steel City One-Way Drop`,
    'durgapur':            `Durgapur Drop Taxi ₹12/km | Industrial Belt Intercity Drop`,
    'asansol':             `Asansol One-Way Taxi ₹12/km | Coalfield Corridor Drop Service`,
    'howrah':              `Howrah Station Drop Taxi ₹12/km | One-Way Intercity Cab`,
    'cuttack':             `Cuttack Outstation Taxi ₹12/km | Silver City One-Way Drop`,
    'rourkela':            `Rourkela Drop Cab ₹12/km | RSP Town One-Way Outstation Taxi`,
    'patna':               `Patna Outstation Taxi ₹14/km | One-Way Drop, Gandhi Maidan Pickup`,
    'varanasi':            `Varanasi Drop Taxi ₹14/km | Ghats Pickup, Kashi Route Drop`,
    'prayagraj':           `Prayagraj One-Way Cab ₹14/km | Sangam Pickup, Kumbh Route Drop`,
    'gaya':                `Gaya Outstation Taxi ₹14/km | Airport & Vishnupad Drop Service`,
    'bodh-gaya':           `Bodh Gaya Drop Taxi ₹14/km | Buddhist Circuit One-Way Drop`,
    'hazaribagh':          `Hazaribagh One-Way Taxi ₹12/km | Ranchi-Dhanbad Corridor Drop`,
    'haldia':              `Haldia Port Drop Taxi ₹12/km | Industrial Zone One-Way Cab`,
    'konark':              `Konark Sun Temple Drop Taxi ₹12/km | Coastal Route One-Way`,
  };
  // 4 title variants for cities not in the map — outstation/drop positioning
  function getCityFallbackTitle(slug: string, name: string, rate: string): string {
    const hash = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 4;
    const variants = [
      `${name} Outstation Cab ${rate} | One-Way & Round Trip Drop Taxi`,
      `${name} One-Way Drop Taxi ${rate} | Pay One Side Only | ★4.8`,
      `Book Outstation Taxi in ${name} ${rate} | Intercity & Airport Drop`,
      `${name} Drop Taxi Service ${rate} | One-Way Specialist, 24/7`,
    ];
    return variants[hash];
  }
  const title = cityTitles[citySlug] || getCityFallbackTitle(citySlug, cityName, baseRate);

  // Keywords for Bing/DDG — use hub keyword bank if available
  const hubKeywords = HUB_CITY_KEYWORDS[citySlug] || [
    // Primary high-volume — "cab in city" / "taxi in city" variations
    `cab service in ${cityName}`,
    `taxi service in ${cityName}`,
    `cab in ${cityName}`,
    `taxi in ${cityName}`,
    `${cityName} cab service`,
    `${cityName} taxi service`,
    `${cityName} cab`,
    `${cityName} taxi`,
    // Booking intent
    `book cab in ${cityName}`,
    `book taxi in ${cityName}`,
    `cab booking ${cityName}`,
    `taxi booking ${cityName}`,
    `online cab booking ${cityName}`,
    // Car rental variants
    `car rental in ${cityName}`,
    `car rental ${cityName}`,
    `rental cab in ${cityName}`,
    `${cityName} car rental`,
    `${cityName} car hire`,
    `cab hire ${cityName}`,
    // Vehicle-specific high volume
    `innova in ${cityName}`,
    `innova cab in ${cityName}`,
    `${cityName} innova cab`,
    `innova crysta ${cityName}`,
    `suv cab in ${cityName}`,
    `${cityName} suv taxi`,
    `${cityName} sedan cab`,
    `tempo traveller ${cityName}`,
    // Service type
    `outstation cab from ${cityName}`,
    `${cityName} outstation cab`,
    `one way cab from ${cityName}`,
    `${cityName} one way cab`,
    `round trip cab ${cityName}`,
    `local taxi ${cityName}`,
    `${cityName} local cab`,
    `airport cab ${cityName}`,
    `${cityName} airport taxi`,
    `airport transfer ${cityName}`,
    `wedding car ${cityName}`,
    // City-to-Kolkata (most searched route for non-hub cities)
    `${cityName} to kolkata cab`,
    `kolkata to ${cityName} cab`,
    `${cityName} to kolkata taxi`,
    // Quality / intent
    `best cab service ${cityName}`,
    `best taxi service ${cityName}`,
    `cheap cab ${cityName}`,
    `affordable taxi ${cityName}`,
    `ac cab ${cityName}`,
    `ac taxi ${cityName}`,
    // 24/7 / near me
    `24 hour cab ${cityName}`,
    `24/7 cab ${cityName}`,
    `night cab ${cityName}`,
    `cab near me ${cityName}`,
    `taxi near me ${cityName}`,
    `${cityName} cab rate per km`,
    `${cityName} cab fare`,
  ];

  return {
    title,
    description: desc.slice(0, 160),
    keywords: hubKeywords,
    openGraph: {
      title: isKolkata
        ? `Cab Service in Kolkata ★4.8 | Outstation ₹12/km | Airport ₹1200`
        : `★4.8 Cab Service in ${cityName} | ${BUSINESS.name}`,
      description: isKolkata
        ? `★4.8 rated. Outstation ₹12/km | Airport ₹1200 | Local 4hr ₹1800. Dzire, Ertiga, Innova Crysta. Salt Lake, Howrah, New Town. No surge. Call ${BUSINESS.phone}`
        : `★4.8 trusted cab & taxi in ${cityName}, ${stateName}. Airport, outstation, local, one-way. Innova, SUV. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: `${DOMAIN}/${stateSlug}/${citySlug}`,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `★4.8 Cab Service in ${cityName}, ${stateName} - ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `★4.8 Cab in ${cityName} ${baseRate} | ${BUSINESS.name}`,
      description: `Book cab in ${cityName}. Airport ₹${airportRate} | Outstation ${baseRate} | Local ₹1,800. No surge pricing. Call ${BUSINESS.phone}`,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: `${DOMAIN}/${stateSlug}/${citySlug}` },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

export function generateStateMetadata(stateName: string): Metadata {
  const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-');

  const stateConfig: Record<string, { title: string; desc: string }> = {
    'west-bengal': {
      title: `Cab Service in West Bengal ₹12/km | Kolkata Taxi 24/7`,
      desc: `Cab service in West Bengal — outstation ₹12/km (Dzire), ₹16/km (Ertiga), ₹18/km (Innova). Airport taxi Kolkata ₹1200. Darjeeling, Siliguri, Durgapur, Asansol & 35+ cities. 24/7.`,
    },
    'jharkhand': {
      title: `Cab Service in Jharkhand ₹12/km | Ranchi Taxi 24/7`,
      desc: `Cab service in Jharkhand — outstation ₹12/km. Ranchi, Jamshedpur, Dhanbad, Bokaro, Deoghar & 15+ cities. AC sedan, SUV. 24/7. No surge pricing.`,
    },
    'odisha': {
      title: `Cab Service in Odisha ₹12/km | Bhubaneswar Taxi 24/7`,
      desc: `Cab service in Odisha — Dzire from ₹12/km, Ertiga ₹16/km, Innova ₹18/km. Bhubaneswar Airport taxi ₹1200. Puri, Cuttack, Rourkela & 15+ cities. 24/7.`,
    },
    'bihar': {
      title: `Cab Service in Bihar ₹14/km | Patna Taxi 24/7`,
      desc: `Cab service in Bihar — outstation ₹14/km. Patna, Gaya, Bodh Gaya, Nalanda, Rajgir & 10+ cities. AC sedan, SUV. 24/7. No surge pricing.`,
    },
    'uttar-pradesh': {
      title: `Cab Service in Uttar Pradesh ₹14/km | Varanasi Taxi 24/7`,
      desc: `Cab service in Uttar Pradesh — outstation ₹14/km. Varanasi, Prayagraj & major cities. AC sedan, SUV. 24/7. No surge pricing.`,
    },
  };

  const config = stateConfig[stateSlug] || {
    title: `Cab Service in ${stateName} ₹12/km | Taxi Service 24/7`,
    desc: `Best cab service across ${stateName}. Local taxi, outstation, one-way, airport transfer. AC sedan/SUV. 24/7. Call ${BUSINESS.phone}`,
  };

  return {
    title: config.title,
    description: config.desc.slice(0, 160),
    // NOTE: Google ignores meta keywords since 2009. Removed to avoid spam signals.
    openGraph: {
      title: `Cab Service in ${stateName} | ${BUSINESS.name} ★4.8`,
      description: `Trusted taxi service across all cities in ${stateName}. Outstation ₹12/km. Local, one-way, airport. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: `${DOMAIN}/${stateSlug}`,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `Cab Service in ${stateName} - ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Cab Service in ${stateName} | ${BUSINESS.name}`,
      description: `Book cab across ${stateName}. All cities covered. ₹12/km. Call ${BUSINESS.phone}`,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: `${DOMAIN}/${stateSlug}` },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

export function generateAboutMetadata(): Metadata {
  return {
    title: `About NK Cab & Taxi | Est. ${BUSINESS.foundYear} | Verified Fleet | 80+ Cities East India`,
    description: `NK Cab & Taxi — established ${BUSINESS.foundYear} in Kolkata. One-way outstation specialist, 5000+ trips, rated 4.8/5. Verified drivers, AC fleet (Sedan/SUV/Innova), transparent fares. 80+ cities. Call ${BUSINESS.phone}.`.slice(0, 160),
    // NOTE: Google ignores meta keywords since 2009. Removed to avoid spam signals.
    openGraph: {
      title: `About ${BUSINESS.name} | Trusted Since ${BUSINESS.foundYear}`,
      description: `${BUSINESS.name} — trusted cab service across East India since ${BUSINESS.foundYear}. 80+ cities, 500+ routes. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: `${DOMAIN}/about`,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `About ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `About ${BUSINESS.name}`,
      description: `Trusted cab service since ${BUSINESS.foundYear}. 80+ cities. Call ${BUSINESS.phone}`,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: `${DOMAIN}/about` },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

export function generateContactMetadata(): Metadata {
  return {
    title: `Book Cab Now | Call ${BUSINESS.phoneDisplay} | NK Cab & Taxi Kolkata 24/7`,
    description: `Book your cab instantly — call or WhatsApp ${BUSINESS.phone}. NK Cab & Taxi serves 80+ cities 24/7. Outstation ₹12/km, airport ₹1,800, local ₹1,800/4hr. Instant confirmation.`.slice(0, 160),
    // NOTE: Google ignores meta keywords since 2009. Removed to avoid spam signals.
    openGraph: {
      title: `Contact ${BUSINESS.name} | Book Cab Now`,
      description: `Book cab instantly. Call ${BUSINESS.phone}, WhatsApp, or fill online form. 24/7 service.`,
      type: 'website',
      siteName: BUSINESS.name,
      url: `${DOMAIN}/contact`,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `Contact ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Contact ${BUSINESS.name}`,
      description: `Book cab. Call ${BUSINESS.phone} or WhatsApp. 24/7 service across East India.`,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: `${DOMAIN}/contact` },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

export function generateFleetMetadata(): Metadata {
  return {
    title: `Innova Crysta Rent Kolkata ₹18/km | Sedan ₹12/km | SUV Ertiga | NK Cab`,
    description: `Car rental Kolkata: Sedan (Dzire ₹12/km), SUV Ertiga (₹16/km), Innova Crysta (₹18/km), Tempo Traveller (12-seater). AC, GPS, verified drivers. 80+ cities. Call ${BUSINESS.phone}.`.slice(0, 160),
    keywords: [
      'car rental kolkata', 'car hire kolkata', 'cab rental kolkata',
      'innova on rent kolkata', 'innova crysta kolkata', 'innova cab kolkata',
      'sedan on rent kolkata', 'sedan hire kolkata', 'dzire cab kolkata',
      'suv on rent kolkata', 'ertiga cab kolkata', 'suv hire kolkata',
      'tempo traveller kolkata', 'tempo traveller hire kolkata', '12 seater tempo kolkata',
      'luxury car rental kolkata', 'fortuner on rent kolkata',
      'car rental ranchi', 'innova cab ranchi', 'car hire jamshedpur',
      'cab for rent kolkata', 'self drive kolkata', 'car on rent kolkata',
      'car rental per km kolkata', 'ac cab kolkata', 'fleet car rental east india',
      'car rental kolkata airport', 'wedding car kolkata', 'corporate car rental kolkata',
    ],
    openGraph: {
      title: `Car Rental Kolkata — Innova, Sedan, SUV, Tempo | ${BUSINESS.name}`,
      description: `Car rental from ₹12/km. Sedan, SUV, Innova Crysta, Tempo Traveller. AC, verified drivers. Kolkata, Ranchi, Jamshedpur & 80+ cities. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: `${DOMAIN}/fleet`,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `Car Rental Fleet — NK Cab & Taxi` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Car Rental Kolkata | Innova Crysta ₹18/km | Sedan ₹12/km`,
      description: `Sedan, SUV, Innova Crysta, Tempo for rent. AC, GPS tracked. Kolkata & 80+ cities. Call ${BUSINESS.phone}`,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: `${DOMAIN}/fleet` },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

export function generateToursListingMetadata(): Metadata {
  return {
    title: `Tour Packages from Kolkata | Darjeeling Puri Varanasi | AC Cab + Driver`,
    description: `Curated tour packages from Kolkata: Darjeeling (2N/3D), Puri-Konark, Sundarbans, Varanasi, Ayodhya. AC cab + driver included. Custom pickups from Ranchi & Jamshedpur. Call ${BUSINESS.phone}.`.slice(0, 160),
    keywords: [
      'tour packages from kolkata', 'darjeeling tour package from kolkata',
      'puri tour package from kolkata', 'sundarbans tour package',
      'varanasi tour from kolkata', 'ayodhya pilgrimage tour from kolkata',
      'hill station tour from kolkata by car', 'kolkata weekend trip package',
      'darjeeling cab package kolkata', 'puri konark tour package kolkata',
      'affordable tour packages from kolkata', 'car tour packages east india',
    ],
    openGraph: {
      title: `Tour Packages | ${BUSINESS.name}`,
      description: `Darjeeling, Puri, Sundarbans, Varanasi — curated tour packages with AC cab. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: `${DOMAIN}/tours`,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `Tour Packages - ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Tour Packages | ${BUSINESS.name}`,
      description: `Book Darjeeling, Puri, Varanasi tours with AC cab. Call ${BUSINESS.phone}`,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: `${DOMAIN}/tours` },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

export function generateTourMetadata(tourName: string, destination: string, duration: string, priceSaloon: number): Metadata {
  const tourSlug = tourName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const desc = `${tourName} — ${duration}, AC cab, driver, sightseeing. Sedan ₹${priceSaloon.toLocaleString('en-IN')}, SUV available. Pickup from Kolkata/Ranchi/Bhubaneswar. Book now`.slice(0, 160);
  return {
    title: `${tourName} | ${duration} From ₹${priceSaloon.toLocaleString('en-IN')} | ${BUSINESS.name}`,
    description: desc,
    // NOTE: Google ignores meta keywords since 2009. Removed to avoid spam signals.
    openGraph: {
      title: `${tourName} | From ₹${priceSaloon.toLocaleString('en-IN')} | ${BUSINESS.name}`,
      description: `${tourName} — ${duration}. AC cab + driver + sightseeing. Starting ₹${priceSaloon.toLocaleString('en-IN')}. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: `${DOMAIN}/tours/${tourSlug}`,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `${tourName} - ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tourName} | ₹${priceSaloon.toLocaleString('en-IN')} | ${BUSINESS.name}`,
      description: desc,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: `${DOMAIN}/tours/${tourSlug}` },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

// Service-specific SEO config — enriched keyword arrays with multi-city coverage
const SERVICE_SEO: Record<string, { keywords: string[]; slug: string }> = {
  'Local Taxi Service': {
    slug: 'local-taxi',
    keywords: [
      'local taxi service kolkata', 'hourly cab rental kolkata', 'city cab booking kolkata',
      'local cab near me kolkata', 'taxi for local travel kolkata', 'hourly taxi hire kolkata',
      'cab for shopping kolkata', 'hospital taxi service kolkata', 'local sightseeing cab kolkata',
      'city tour taxi kolkata', 'taxi for events kolkata', 'short distance cab kolkata',
      'local cab kolkata', 'kolkata local taxi', 'taxi per hour kolkata',
      'local taxi service ranchi', 'local taxi ranchi', 'hourly cab ranchi',
      'local taxi jamshedpur', 'local cab jamshedpur', 'city cab bhubaneswar',
      'local taxi bhubaneswar', 'hourly taxi hire ranchi', 'local cab dhanbad',
    ],
  },
  'Outstation Cab Service': {
    slug: 'outstation',
    keywords: [
      'outstation cab service kolkata', 'outstation taxi kolkata', 'intercity taxi kolkata',
      'long distance cab kolkata', 'outstation taxi booking kolkata', 'city to city cab kolkata',
      'outstation cab near me kolkata', 'cab for outstation travel kolkata',
      'outstation cab booking online kolkata', 'cheap outstation cab kolkata',
      'kolkata outstation taxi service', 'intercity cab from kolkata',
      'outstation cab ranchi', 'outstation taxi ranchi', 'intercity cab ranchi',
      'outstation cab jamshedpur', 'outstation taxi jamshedpur', 'outstation cab bhubaneswar',
      'outstation taxi bhubaneswar', 'intercity cab jamshedpur', 'outstation cab dhanbad',
    ],
  },
  'One Way Taxi Service': {
    slug: 'one-way',
    keywords: [
      'one way taxi service kolkata', 'one side cab booking kolkata', 'drop taxi kolkata',
      'one way cab fare kolkata', 'pay one side only taxi kolkata', 'cheapest one way cab kolkata',
      'single trip taxi kolkata', 'drop off taxi service kolkata', 'one way intercity cab kolkata',
      'kolkata one way taxi', 'one way cab kolkata', 'point to point taxi kolkata',
      'one way taxi ranchi', 'one way cab ranchi', 'drop taxi ranchi',
      'one way taxi jamshedpur', 'one way cab jamshedpur', 'drop taxi jamshedpur',
      'one way taxi bhubaneswar', 'one way cab bhubaneswar', 'drop taxi bhubaneswar',
    ],
  },
  'Round Trip Cab Service': {
    slug: 'round-trip',
    keywords: [
      'round trip cab service kolkata', 'multi day cab rental kolkata', 'pilgrimage cab booking kolkata',
      'cab for multi day trip kolkata', 'round trip taxi fare kolkata', 'tour cab booking kolkata',
      'cab with driver for days kolkata', 'family tour cab kolkata', 'round trip taxi kolkata',
      'round trip cab ranchi', 'round trip taxi ranchi', 'multi day cab ranchi',
      'round trip cab jamshedpur', 'round trip cab bhubaneswar', 'pilgrimage cab ranchi',
    ],
  },
  'Airport Transfer Service': {
    slug: 'airport-transfer',
    keywords: [
      'airport taxi service kolkata', 'kolkata airport pickup drop', 'netaji subhash airport cab',
      'ccu airport taxi kolkata', 'kolkata airport transfer', 'flight pickup taxi kolkata',
      'kolkata airport cab booking', 'airport shuttle service kolkata', 'cheap airport taxi kolkata',
      'kolkata airport car service', 'airport cab near me kolkata', 'airport drop kolkata',
      'dam dam airport taxi', 'kolkata to airport cab', 'cab from kolkata airport',
      'ranchi airport cab', 'birsa munda airport taxi', 'ranchi airport transfer',
      'bhubaneswar airport cab', 'biju patnaik airport taxi', 'bhubaneswar airport transfer',
      'jamshedpur to kolkata airport cab', 'airport pickup ranchi', 'airport drop bhubaneswar',
    ],
  },
  'Wedding Car Rental': {
    slug: 'wedding-car-rental',
    keywords: [
      'wedding car rental kolkata', 'decorated car for marriage kolkata', 'shaadi car kolkata',
      'baraat car rental kolkata', 'vidaai car kolkata', 'wedding car decoration kolkata',
      'marriage car hire kolkata', 'luxury wedding car kolkata', 'bridal car rental kolkata',
      'wedding transport service kolkata', 'decorated innova for wedding kolkata',
      'wedding car near me kolkata', 'flower decoration car kolkata',
      'wedding car rental ranchi', 'shaadi car ranchi', 'wedding car jamshedpur',
      'marriage car hire ranchi', 'wedding car bhubaneswar', 'baraat car ranchi',
    ],
  },
  'Corporate Car Rental': {
    slug: 'corporate-car-rental',
    keywords: [
      'corporate car rental kolkata', 'business travel cab kolkata', 'employee transport kolkata',
      'office cab service kolkata', 'corporate taxi service kolkata', 'monthly car rental kolkata',
      'executive car service kolkata', 'company cab booking kolkata', 'corporate fleet kolkata',
      'gst invoice cab kolkata', 'corporate cab near me kolkata', 'business car hire kolkata',
      'corporate car rental ranchi', 'office cab ranchi', 'employee transport ranchi',
      'corporate cab jamshedpur', 'business cab bhubaneswar', 'corporate car jamshedpur',
    ],
  },
};

// Strong per-service SEO titles — keyword-first format
const SERVICE_STRONG_TITLES: Record<string, string> = {
  'Local Taxi Service':        `Local Taxi in Kolkata | Hourly Cab ₹1800/4hr | Book 24/7`,
  'Outstation Cab Service':    `Outstation Cab Kolkata ₹12/km | Intercity Taxi | Book 24/7`,
  'One Way Taxi Service':      `One Way Cab Kolkata ₹12/km | Drop Taxi | Pay One Side`,

  'Round Trip Cab Service':    `Round Trip Cab Kolkata ₹12/km | Multi-Day Tour Taxi 24/7`,
  'Airport Transfer Service':  `Airport Cab Kolkata ₹1200 | CCU Taxi Pickup & Drop 24/7`,
  'Wedding Car Rental':        `Wedding Car Rental Kolkata | Decorated Innova, Fortuner`,
  'Corporate Car Rental':      `Corporate Cab Kolkata | Office Car Rental | GST Invoice`,
};

// Strong per-service descriptions
const SERVICE_STRONG_DESCS: Record<string, string> = {
  'Local Taxi Service':        `Local taxi service in Kolkata. 4hr/40km ₹1,800, 8hr/80km ₹3,200. Sedan ₹12/km, SUV ₹16/km, Innova Crysta ₹18/km. Hospital visits, shopping, city tours. 24/7. Call ${BUSINESS.phone}`,
  'Outstation Cab Service':    `Outstation cab from Kolkata from ₹12/km. Ranchi, Jamshedpur, Bhubaneswar, Siliguri, Puri & 80+ routes. AC Sedan, SUV, Innova Crysta. One-way & round trip. 24/7. Call ${BUSINESS.phone}`,
  'One Way Taxi Service':      `One way cab from Kolkata ₹12/km. Pay only for one side — no return charges. All major routes: Kolkata→Ranchi, Kolkata→Jamshedpur, Kolkata→Bhubaneswar. AC, 24/7. Call ${BUSINESS.phone}`,

  'Round Trip Cab Service':    `Round trip cab from Kolkata ₹12/km. Multi-day trips with driver: Darjeeling, Puri, Varanasi & more. Sedan, SUV, Innova Crysta. 24/7. Book online. Call ${BUSINESS.phone}`,
  'Airport Transfer Service':  `Airport cab Kolkata from ₹1,200. CCU (Netaji Subhash Airport) pickup & drop. Flight tracking, meet & greet, 24/7. Sedan ₹1200, SUV ₹1800, Innova ₹2200. No surge. Call ${BUSINESS.phone}`,
  'Wedding Car Rental':        `Wedding car rental in Kolkata. Decorated Innova Crysta, Fortuner & luxury sedans. Baraat, vidaai, wedding functions. From ₹3,500. Professional chauffeur. Book via ${BUSINESS.phone}`,
  'Corporate Car Rental':      `Corporate cab in Kolkata for office transport, employee pickup, business travel. Monthly packages, GST invoice, outstation. Sedan from ₹12/km. 24/7. Call ${BUSINESS.phone}`,
};

export function generateServicePageMetadata(serviceName: string, description: string): Metadata {
  const serviceConfig = SERVICE_SEO[serviceName] || { slug: serviceName.toLowerCase().replace(/\s+/g, '-'), keywords: [] };
  const strongTitle = SERVICE_STRONG_TITLES[serviceName] || `${serviceName} in Kolkata | ★4.8 Rated | Book 24/7 | ${BUSINESS.name}`;
  const strongDesc = (SERVICE_STRONG_DESCS[serviceName] || `${description}. Book online 24/7. Sedan ₹12/km, SUV ₹16/km, Innova Crysta ₹18/km. No surge pricing. Call ${BUSINESS.phone}.`).slice(0, 160);
  return {
    title: strongTitle,
    description: strongDesc,
    keywords: serviceConfig.keywords,
    openGraph: {
      title: `${strongTitle}`,
      description: `${description}. Book online. No surge. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: `${DOMAIN}/services/${serviceConfig.slug}`,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `${serviceName} in Kolkata - ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${strongTitle}`,
      description: strongDesc,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: `${DOMAIN}/services/${serviceConfig.slug}` },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

export function generateServiceCityMetadata(
  serviceName: string,
  cityName: string,
  stateName: string,
  serviceSlug: string,
): Metadata {
  const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
  const canonicalUrl = `${DOMAIN}/services/${serviceSlug}/${citySlug}`;
  const title = `${serviceName} in ${cityName} ₹12/km | Book 24/7 | ${BUSINESS.name}`;
  const desc = `${serviceName} service in ${cityName}, ${stateName}. AC Sedan, SUV, Innova Crysta. Verified drivers, no surge pricing. 24/7. Call ${BUSINESS.phone}`.slice(0, 160);

  const keywords = [
    `${serviceName.toLowerCase()} ${cityName.toLowerCase()}`,
    `${serviceName.toLowerCase()} in ${cityName.toLowerCase()}`,
    `cab service ${cityName.toLowerCase()}`,
    `taxi service ${cityName.toLowerCase()}`,
    `${cityName.toLowerCase()} ${serviceName.toLowerCase()}`,
    `${cityName.toLowerCase()} cab booking`,
    `${cityName.toLowerCase()} taxi booking`,
    `book cab ${cityName.toLowerCase()}`,
    `best cab service ${cityName.toLowerCase()}`,
    `${cityName.toLowerCase()} ac cab`,
    `${serviceName.toLowerCase()} ${cityName.toLowerCase()} ${stateName.toLowerCase()}`,
    `cheap cab ${cityName.toLowerCase()}`,
    `${cityName.toLowerCase()} airport cab`,
    `${cityName.toLowerCase()} outstation cab`,
    `${cityName.toLowerCase()} local taxi`,
  ];

  return {
    title,
    description: desc,
    keywords,
    openGraph: {
      title: `${serviceName} in ${cityName} | ${BUSINESS.name}`,
      description: `${serviceName} in ${cityName}. AC cab, verified drivers, 24/7. No surge pricing. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: canonicalUrl,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `${serviceName} in ${cityName} - ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${serviceName} in ${cityName} | ${BUSINESS.name}`,
      description: desc,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: canonicalUrl },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

// Keep old name as alias for backward compat
export const generateServiceMetadata = generateServicePageMetadata;

// ═══════════════════════════════════════════════════
// VEHICLE-SPECIFIC ROUTE PAGE METADATA
// ═══════════════════════════════════════════════════

const VEHICLE_DISPLAY: Record<string, { name: string; models: string; emoji: string; cap: string }> = {
  sedan: { name: 'Sedan', models: 'Swift Dzire, Honda Amaze', emoji: '🚗', cap: '4 Passengers' },
  suv: { name: 'SUV', models: 'Ertiga, Innova, Innova Crysta', emoji: '🚙', cap: '6-7 Passengers' },
  tempo: { name: 'Tempo Traveller', models: '12-Seater, 17-Seater', emoji: '🚐', cap: '12-17 Passengers' },
  luxury: { name: 'Luxury Car', models: 'Innova Crysta, Fortuner, Mercedes', emoji: '🚘', cap: '4-7 Passengers' },
};

export function generateVehicleRouteMetadata(
  fromName: string, toName: string, distance: number, 
  vehicleSlug: string, fare: number, routeSlug: string
): Metadata {
  const v = VEHICLE_DISPLAY[vehicleSlug] || VEHICLE_DISPLAY.sedan;
  const canonicalUrl = `${DOMAIN}/routes/${routeSlug}/${vehicleSlug}`;
  
  // Short title — under 60 chars
  const title = `${fromName} to ${toName} ${v.name} ₹${fare} | Book 24/7`;
  const desc = `${fromName} to ${toName} ${v.name} cab ₹${fare}. Book ${v.models} for ${distance} km trip. ${v.cap}, AC, GPS. One-way & round trip. 24/7.`.slice(0, 160);
  
  // Vehicle-specific keywords for Bing/DDG
  const baseKeywords = generateRouteKeywords(fromName, toName);
  const vehicleKeywords = [
    `${fromName} to ${toName} ${v.name.toLowerCase()} cab`,
    `${fromName} to ${toName} ${v.models.split(',')[0].trim().toLowerCase()}`,
    `${fromName} to ${toName} ${vehicleSlug} hire`,
    `${fromName} ${toName} ${v.name.toLowerCase()} taxi`,
  ];

  return {
    title,
    description: desc,
    keywords: [...vehicleKeywords, ...baseKeywords.slice(0, 10)],
    openGraph: {
      title: `${fromName} to ${toName} ${v.name} ₹${fare} | ${BUSINESS.name}`,
      description: `Book ${v.name} (${v.models}) from ${fromName} to ${toName}. ${distance} km, ₹${fare}. AC, GPS. Call ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: canonicalUrl,
      locale: 'en_IN',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: `${fromName} to ${toName} ${v.name} - ${BUSINESS.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fromName} to ${toName} ${v.name} ₹${fare}`,
      description: desc,
      images: [OG_IMAGE_URL],
    },
    alternates: { canonical: canonicalUrl },
    other: {
      thumbnail: OG_IMAGE_URL,
    },
  };
}

export function generateVehicleRouteSchema(
  fromName: string, toName: string, vehicleSlug: string,
  fare: number, distance: number, duration: string, routeSlug: string
) {
  const v = VEHICLE_DISPLAY[vehicleSlug] || VEHICLE_DISPLAY.sedan;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Taxi Service',
    name: `${fromName} to ${toName} ${v.name} Cab`,
    description: `${v.name} (${v.models}) cab service from ${fromName} to ${toName}. ${distance} km, ${duration} hours. ${v.cap}. AC, GPS tracked.`,
    image: OG_IMAGE_URL,
    // aggregateRating is defined ONCE on the global LocalBusiness schema (layout.tsx).
    // We reference it here by @id only — no duplicate aggregateRating.
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
    },
    areaServed: [
      { '@type': 'City', name: fromName },
      { '@type': 'City', name: toName },
    ],
    offers: {
      '@type': 'Offer',
      url: `${DOMAIN}/routes/${routeSlug}/${vehicleSlug}`,
      priceCurrency: 'INR',
      price: fare,
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generateFleetPageMetadata(): Metadata {
  return generateFleetMetadata();
}

// ═══════════════════════════════════════════════════
// STRUCTURED DATA / SCHEMA GENERATORS
// ═══════════════════════════════════════════════════

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    // @id ties this entity to nkcabtaxi.com ONLY — unique identifier per website
    '@id': `${DOMAIN}/#nk-cab-taxi`,
    name: BUSINESS.name,
    legalName: 'NK Cab & Taxi',
    // Genuine alternate names only — schema validators flag long arrays as keyword spam
    alternateName: ['NK Cab Taxi', 'NK Cab Service', 'NK Taxi Kolkata', 'nkcabtaxi'],
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: DOMAIN,
    image: OG_IMAGE_URL,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 1024,
      height: 1024,
    },
    // Unique description — clearly distinct from Kolkata Cab Service website
    description: `NK Cab & Taxi (nkcabtaxi.com) is a premium cab and taxi operator based in Kolkata with a dedicated fleet serving East India since 2019. We specialize in outstation cabs from ₹12/km, airport pickups from ₹1,800, local taxi packages, one-way intercity travel, and wedding car rentals across West Bengal, Jharkhand, Odisha, and Bihar.`,
    foundingDate: `${BUSINESS.foundYear}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Salt Lake Sector V Area',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
      postalCode: '700091',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.5726,
      longitude: 88.3639,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'West Bengal' },
      { '@type': 'AdministrativeArea', name: 'Jharkhand' },
      { '@type': 'AdministrativeArea', name: 'Odisha' },
      { '@type': 'AdministrativeArea', name: 'Bihar' },
      { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
      {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: 22.5726, longitude: 88.3639 },
        geoRadius: '500000',
      },
    ],
    serviceArea: {
      '@type': 'GeoShape',
      box: '20.5 85.0 27.5 89.0',
    },
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Bank Transfer',
    openingHours: 'Mo-Su 00:00-24:00',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Bengali'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'reservations',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Bengali'],
      },
    ],
    // gbpLink and gbpReviewLink are the same URL — keep one to avoid duplicate sameAs
    // DOMAIN included: explicitly maps this entity to nkcabtaxi.com
    sameAs: [
      DOMAIN,
      `https://wa.me/${BUSINESS.whatsapp}`,
      BUSINESS.gbpLink,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cab & Taxi Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local Taxi Service in Kolkata' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outstation Cab Service from Kolkata' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'One-Way Taxi Service from Kolkata' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Round Trip Cab Service' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kolkata Airport Transfer Service' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Car Rental in Kolkata' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Car Rental in Kolkata' } },
      ],
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${DOMAIN}/#organization`,
    name: BUSINESS.name,
    alternateName: ['NK Cab Taxi', 'NK Cab', 'NK Taxi', 'nkcabtaxi', 'NK Cab & Taxi Kolkata'],
    url: DOMAIN,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 1024,
      height: 1024,
    },
    foundingDate: `${BUSINESS.foundYear}`,
    foundingLocation: { '@type': 'Place', name: 'Kolkata, West Bengal, India' },
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 50, maxValue: 200 },
    knowsAbout: [
      'Taxi Service', 'Cab Booking', 'Airport Transfer', 'Outstation Travel',
      'Car Rental', 'Wedding Car Rental', 'Corporate Transportation',
      'Local Taxi Service', 'One-Way Cab Service', 'Tour Packages',
      'Outstation Taxi Kolkata', 'One-Way Drop Cab East India', 'Airport Transfer Kolkata',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Government Licensed Transport Operator',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Bengali'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Bengali'],
      },
    ],
    // gbpLink and gbpReviewLink are the same URL — keep one to avoid duplicate sameAs
    sameAs: [
      `https://wa.me/${BUSINESS.whatsapp}`,
      BUSINESS.gbpLink,
    ],
    slogan: 'East India One-Way Drop Taxi Specialist Since 2019',
    ethicsPolicy: `${DOMAIN}/about`,
    award: '★4.8/5 Customer Rating · 5000+ Trips Completed',
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${DOMAIN}/#website`,
    name: BUSINESS.name,
    alternateName: [
      'NK Cab & Taxi',
      'NK Cab Taxi',
      'NK Cab',
      'NK Taxi',
      'nkcabtaxi',
      'nkcabtaxi.com',
      'NK Cab & Taxi Kolkata',
    ],
    url: DOMAIN,
    description: 'NK Cab & Taxi (nkcabtaxi.com) — East India outstation one-way drop taxi specialist. Sedan from ₹12/km. Airport, intercity, local & wedding car. 80+ cities across West Bengal, Jharkhand, Odisha, Bihar.',
    publisher: { '@id': `${DOMAIN}/#organization` },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${DOMAIN}/routes/{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    // AI/LLM SEO: helps ChatGPT, Gemini, Perplexity cite this page accurately
    about: {
      '@type': 'Thing',
      name: 'Outstation Cab Booking Service Kolkata',
      description: 'One-way drop taxi from Kolkata and East India cities. Fixed fare, no surge pricing, AC vehicles.',
    },
    keywords: 'cab service kolkata, outstation taxi kolkata, one way cab kolkata, airport taxi kolkata, nkcabtaxi, NK Cab Taxi',
  };
}

export function generateRouteSchema(
  fromName: string,
  toName: string,
  priceSaloon: number,
  priceSuv?: number,
  priceTempo?: number,
  distance?: number,
  duration?: string,
  routeSlug?: string,
  via?: string[]
) {
  const slug = routeSlug || `${fromName.toLowerCase().replace(/\s+/g, '-')}-to-${toName.toLowerCase().replace(/\s+/g, '-')}`;
  const suvPrice = priceSuv ?? Math.round(priceSaloon * 1.27);
  const tempoPrice = priceTempo ?? Math.round(priceSaloon * 1.8);
  const priceValidUntil = '2027-12-31';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${fromName} to ${toName} Cab Service`,
    description: `Book ${fromName} to ${toName} cab with NK Cab & Taxi. ${distance ? `${distance} km, ~${duration} hours.` : ''} Sedan from ₹${priceSaloon}, SUV ₹${suvPrice}, Tempo ₹${tempoPrice}. AC, GPS-tracked, verified driver. No surge pricing. 24/7 available.${via && via.length > 0 ? ` Route via ${via.slice(0, 3).join(', ')}.` : ''}`,
    image: OG_IMAGE_URL,
    brand: {
      '@type': 'Brand',
      name: BUSINESS.name,
    },
    offers: [
      {
        '@type': 'Offer',
        name: `${fromName} to ${toName} Sedan Cab`,
        description: `Sedan (Swift Dzire / Honda Amaze) — 4 passengers. ${distance ? `${distance} km.` : ''}`,
        price: String(priceSaloon),
        priceCurrency: 'INR',
        priceValidUntil,
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/routes/${slug}`,
        seller: {
          '@type': 'Organization',
          name: BUSINESS.name,
          telephone: BUSINESS.phone,
        },
      },
      {
        '@type': 'Offer',
        name: `${fromName} to ${toName} SUV Cab`,
        description: `SUV (Ertiga / Innova Crysta) — 6-7 passengers. ${distance ? `${distance} km.` : ''}`,
        price: String(suvPrice),
        priceCurrency: 'INR',
        priceValidUntil,
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/routes/${slug}/suv`,
        seller: {
          '@type': 'Organization',
          name: BUSINESS.name,
          telephone: BUSINESS.phone,
        },
      },
      {
        '@type': 'Offer',
        name: `${fromName} to ${toName} Tempo Traveller`,
        description: `Tempo Traveller 12-seater — group travel. ${distance ? `${distance} km.` : ''}`,
        price: String(tempoPrice),
        priceCurrency: 'INR',
        priceValidUntil,
        availability: 'https://schema.org/InStock',
        url: `${DOMAIN}/routes/${slug}/tempo`,
        seller: {
          '@type': 'Organization',
          name: BUSINESS.name,
          telephone: BUSINESS.phone,
        },
      },
    ],
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
    },
    areaServed: [
      { '@type': 'City', name: fromName },
      { '@type': 'City', name: toName },
    ],
  };
}



export function generateCityServiceSchema(cityName: string, stateName: string, alternateNames?: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cab Service in ${cityName} — ${BUSINESS.name}`,
    serviceType: 'Taxi Service',
    image: OG_IMAGE_URL,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    description: `Reliable cab and taxi service in ${cityName}, ${stateName}. Local taxi, outstation, airport transfer, one-way, wedding car. 24/7. No surge pricing.`,
    ...(alternateNames && alternateNames.length > 0 ? { alternateName: alternateNames } : {}),
    // aggregateRating lives on the global LocalBusiness schema (layout.tsx @id: /#business)
    // Do NOT duplicate per-city — Google flags fabricated per-city review counts
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      image: OG_IMAGE_URL,
      logo: LOGO_URL,
      // aggregateRating is on the global LocalBusiness schema (layout.tsx) — no duplicate here
    },
    areaServed: [
      { 
        '@type': 'City', 
        name: cityName, 
        containedInPlace: { '@type': 'AdministrativeArea', name: stateName },
        ...(alternateNames && alternateNames.length > 0 ? { alternateName: alternateNames } : {})
      },
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '12',
      highPrice: '25',
      priceCurrency: 'INR',
      offerCount: '5',
      image: OG_IMAGE_URL,
    },
    availableChannel: [
      { '@type': 'ServiceChannel', serviceUrl: DOMAIN, name: 'Website Booking' },
      { '@type': 'ServiceChannel', servicePhone: BUSINESS.phone, name: 'Phone / WhatsApp Booking' },
    ],
    // review is NOT valid on @type Service for Google Rich Results.
    // It lives on the global LocalBusiness schema (layout.tsx @id: /#business).
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string; lang?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      ...(faq.lang === 'hi' ? { inLanguage: 'hi-IN' } : {}),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        ...(faq.lang === 'hi' ? { inLanguage: 'hi-IN' } : {}),
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${BUSINESS.name}`,
    url: `${DOMAIN}/about`,
    description: `About ${BUSINESS.name} — trusted cab service since ${BUSINESS.foundYear}. Serving 80+ cities across East India.`,
    mainEntity: { '@id': `${DOMAIN}/#business` },
  };
}

export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${BUSINESS.name}`,
    url: `${DOMAIN}/contact`,
    description: `Contact ${BUSINESS.name} for cab booking. Call ${BUSINESS.phone}, WhatsApp, or email ${BUSINESS.email}.`,
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Bengali'],
      },
    },
  };
}

export function generateFleetOfferCatalogSchema(vehicles: { name: string; models: string[]; pricePerKm: number; capacity: string | number; image: string }[]) {
  const offerCatalog = {
    '@type': 'OfferCatalog',
    name: `${BUSINESS.name} — Vehicle Fleet`,
    url: `${DOMAIN}/fleet`,
    numberOfItems: vehicles.length,
    itemListElement: vehicles.map((v, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        serviceType: 'Taxi Service',
        name: v.name,
        image: `${DOMAIN}${v.image}`,
        description: `${v.name} — ${v.models.join(', ')}. ${v.capacity} passengers. AC, well-maintained.`,
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${DOMAIN}/#business`,
          name: BUSINESS.name,
          telephone: BUSINESS.phone,
        },
        offers: {
          '@type': 'Offer',
          price: String(v.pricePerKm),
          priceCurrency: 'INR',
          unitText: 'per km',
          availability: 'https://schema.org/InStock',
          image: `${DOMAIN}${v.image}`,
        },
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Car Rental Fleet — ${BUSINESS.name}`,
    serviceType: 'Car Rental Service',
    description: 'Check out our extensive fleet of AC Sedans, SUVs, Premium Innova Crysta, and Tempo Travellers available for local rental and outstation journeys.',
    url: `${DOMAIN}/fleet`,
    image: OG_IMAGE_URL,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
    },
    // review is NOT valid on @type Service for Google Rich Results.
    // It lives on the global LocalBusiness schema (layout.tsx @id: /#business).
    hasOfferCatalog: offerCatalog,
  };
}

export function generateServiceTypeSchema(serviceName: string, serviceSlug: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    serviceType: 'Taxi Service',
    url: `${DOMAIN}/services/${serviceSlug}`,
    description,
    image: OG_IMAGE_URL,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      image: OG_IMAGE_URL,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'West Bengal' },
      { '@type': 'AdministrativeArea', name: 'Jharkhand' },
      { '@type': 'AdministrativeArea', name: 'Odisha' },
      { '@type': 'AdministrativeArea', name: 'Bihar' },
      { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '11',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    // aggregateRating and review are NOT valid on @type Service for Google Rich Results.
    // They live on the global LocalBusiness schema (layout.tsx @id: /#business).
  };
}

export function generateAirportTransferSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Airport Transfer Service Kolkata — Netaji Subhash Chandra Bose Airport',
    serviceType: 'Airport Shuttle Service',
    url: `${DOMAIN}/services/airport-transfer`,
    description: 'Professional airport pickup and drop at Netaji Subhash Chandra Bose International Airport (CCU), Kolkata. Flight tracking, meet & greet, 24/7. Sedan from ₹1200.',
    image: OG_IMAGE_URL,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      image: OG_IMAGE_URL,
    },
    areaServed: [
      { '@type': 'Airport', name: 'Netaji Subhash Chandra Bose International Airport', iataCode: 'CCU' },
      { '@type': 'City', name: 'Kolkata', containedInPlace: { '@type': 'AdministrativeArea', name: 'West Bengal' } },
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '800',
      highPrice: '3000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    // aggregateRating and review are NOT valid on @type Service for Google Rich Results.
    // They live on the global LocalBusiness schema (layout.tsx @id: /#business).
  };
}

export function generateWeddingCarSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Wedding Car Rental Kolkata — Decorated Innova, Fortuner & Luxury Sedans',
    serviceType: 'Wedding Car Rental',
    url: `${DOMAIN}/services/wedding-car-rental`,
    description: 'Premium wedding car rental in Kolkata with flower decoration, ribbon, and professional chauffeurs. Decorated Innova Crysta, Fortuner, and luxury sedans for baraat, vidaai, and wedding functions.',
    image: OG_IMAGE_URL,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      image: OG_IMAGE_URL,
    },
    areaServed: [
      { '@type': 'City', name: 'Kolkata', containedInPlace: { '@type': 'AdministrativeArea', name: 'West Bengal' } },
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '3500',
      highPrice: '15000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    // aggregateRating and review are NOT valid on @type Service for Google Rich Results.
    // They live on the global LocalBusiness schema (layout.tsx @id: /#business).
  };
}

export function generateCitySubServiceSchema(
  cityName: string,
  stateName: string,
  stateSlug: string,
  citySlug: string,
  serviceName: string,
  serviceSlug: string,
  description: string,
  lowPrice: string,
  highPrice: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${serviceName} in ${cityName}`,
    serviceType: 'Taxi Service',
    description,
    image: OG_IMAGE_URL,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    url: `${DOMAIN}/${stateSlug}/${citySlug}/${serviceSlug}`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
    },
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: { '@type': 'AdministrativeArea', name: stateName },
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice,
      highPrice,
      priceCurrency: 'INR',
    },
    // aggregateRating and review are NOT valid on @type Service for Google Rich Results.
    // They live on the global LocalBusiness schema (layout.tsx @id: /#business).
  };
}

export function generateToursItemListSchema(tours: { name: string; slug: string; pricing: { sedan: number }; duration: string; destination: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Tour Packages — ${BUSINESS.name}`,
    url: `${DOMAIN}/tours`,
    numberOfItems: tours.length,
    itemListElement: tours.map((tour, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tour.name,
      url: `${DOMAIN}/tours/${tour.slug}`,
      item: {
        '@type': 'TouristTrip',
        name: tour.name,
        description: `${tour.name} — ${tour.duration}. From ₹${tour.pricing.sedan}. AC cab included.`,
        touristType: 'Leisure',
        offers: {
          '@type': 'Offer',
          price: String(tour.pricing.sedan),
          priceCurrency: 'INR',
        },
      },
    })),
  };
}



export function generatePopularRoutesItemListSchema(routes: { fromName: string; toName: string; slug: string; priceSaloon: number; distance: number }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Popular Cab Routes — ${BUSINESS.name}`,
    url: DOMAIN,
    numberOfItems: routes.length,
    itemListElement: routes.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${r.fromName} to ${r.toName} Cab`,
      url: `${DOMAIN}/routes/${r.slug}`,
    })),
  };
}

export function generateTourSchema(tourName: string, destination: string, priceSaloon: number, duration: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tourName,
    description: `${tourName} — ${duration}. AC cab, experienced driver, sightseeing included.`,
    touristType: 'Leisure',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      image: OG_IMAGE_URL,
      logo: LOGO_URL,
    },
    offers: {
      '@type': 'Offer',
      price: String(priceSaloon),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}

// ═══════════════════════════════════════════════════
// TAXI SERVICE SCHEMA (Google Rich Results)
// ═══════════════════════════════════════════════════

export function generateTaxiServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    '@id': `${DOMAIN}/#taxi-service`,
    name: BUSINESS.name,
    url: DOMAIN,
    telephone: BUSINESS.phone,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'West Bengal' },
      { '@type': 'AdministrativeArea', name: 'Jharkhand' },
      { '@type': 'AdministrativeArea', name: 'Odisha' },
      { '@type': 'AdministrativeArea', name: 'Bihar' },
      { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
    ],
    serviceType: 'Taxi Service',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: DOMAIN,
      servicePhone: BUSINESS.phone,
      serviceSmsNumber: BUSINESS.phone,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '11',
      highPrice: '25',
      offerCount: '1000',
      description: 'Per km rate for various vehicle types',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Vehicle Options',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Sedan',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sedan Cab — Swift Dzire / Honda Amaze' }, price: '11', priceCurrency: 'INR', unitText: 'per km' },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'SUV',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SUV Cab — Ertiga / Innova' }, price: '14', priceCurrency: 'INR', unitText: 'per km' },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Premium SUV',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Premium SUV Cab — Innova Crysta' }, price: '16', priceCurrency: 'INR', unitText: 'per km' },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Tempo Traveller',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tempo Traveller — 12-17 Seater' }, price: '18', priceCurrency: 'INR', unitText: 'per km' },
          ],
        },
      ],
    },
  };
}

// ═══════════════════════════════════════════════════
// AGGREGATE RATING SCHEMA — 4.8★ across all pages
// ═══════════════════════════════════════════════════
export function generateAggregateRatingSchema() {
  // Global LocalBusiness schema in layout.tsx already provides canonical aggregateRating.
  // Returning empty object prevents duplicate AggregateRating errors in Google Search Console.
  return {};
}

// ═══════════════════════════════════════════════════
// SITELINKS SEARCH BOX — homepage only
// ═══════════════════════════════════════════════════
export function generateSitelinksSearchBoxSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${DOMAIN}/#website`,
    url: DOMAIN,
    name: BUSINESS.name,
    description: BUSINESS.tagline,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${DOMAIN}/routes/{search_term_string}-cab`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ═══════════════════════════════════════════════════
// VEHICLE RENTAL SCHEMA — city-vehicle pages
// ═══════════════════════════════════════════════════
export function generateVehicleRentalSchema(
  vehicleName: string,
  vehicleModels: string[],
  cityName: string,
  stateName: string,
  pricePerKm: number,
  capacity: string | number,
  imageUrl?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${vehicleName} Cab in ${cityName}`,
    description: `Hire ${vehicleName} (${vehicleModels.slice(0, 2).join(', ')}) in ${cityName}, ${stateName}. Seats ${capacity} passengers. AC, GPS tracked, police-verified driver. Available 24/7 for airport, outstation, local & one-way trips.`,
    brand: { '@type': 'Brand', name: BUSINESS.name },
    image: imageUrl || `${DOMAIN}/navbanner.webp`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: pricePerKm,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: pricePerKm,
        priceCurrency: 'INR',
        unitText: 'KM',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: '1',
          unitCode: 'KMT',
        },
      },
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01',
      url: DOMAIN,
      seller: {
        '@type': 'LocalBusiness',
        name: BUSINESS.name,
        telephone: BUSINESS.phone,
        url: DOMAIN,
      },
    },
  };
}

// ═══════════════════════════════════════════════════
// SERVICE AREA SCHEMA — 5-state coverage
// ═══════════════════════════════════════════════════
export function generateServiceAreaSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${DOMAIN}/#business`,
    name: BUSINESS.name,
    telephone: BUSINESS.phone,
    priceRange: '₹₹',
    image: OG_IMAGE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Salt Lake Sector V Area',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
      postalCode: '700091',
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'West Bengal',
        alternateName: 'WB',
        containsPlace: [
          { '@type': 'City', name: 'Kolkata' },
          { '@type': 'City', name: 'Howrah' },
          { '@type': 'City', name: 'Siliguri' },
          { '@type': 'City', name: 'Darjeeling' },
          { '@type': 'City', name: 'Durgapur' },
          { '@type': 'City', name: 'Asansol' },
          { '@type': 'City', name: 'Kharagpur' },
          { '@type': 'City', name: 'Haldia' },
        ],
      },
      {
        '@type': 'State',
        name: 'Jharkhand',
        alternateName: 'JH',
        containsPlace: [
          { '@type': 'City', name: 'Ranchi' },
          { '@type': 'City', name: 'Jamshedpur' },
          { '@type': 'City', name: 'Dhanbad' },
          { '@type': 'City', name: 'Bokaro' },
          { '@type': 'City', name: 'Deoghar' },
          { '@type': 'City', name: 'Hazaribagh' },
        ],
      },
      {
        '@type': 'State',
        name: 'Odisha',
        alternateName: 'OR',
        containsPlace: [
          { '@type': 'City', name: 'Bhubaneswar' },
          { '@type': 'City', name: 'Puri' },
          { '@type': 'City', name: 'Cuttack' },
          { '@type': 'City', name: 'Rourkela' },
          { '@type': 'City', name: 'Berhampur' },
        ],
      },
      {
        '@type': 'State',
        name: 'Bihar',
        alternateName: 'BR',
        containsPlace: [
          { '@type': 'City', name: 'Patna' },
          { '@type': 'City', name: 'Gaya' },
          { '@type': 'City', name: 'Bodh Gaya' },
        ],
      },
      {
        '@type': 'State',
        name: 'Uttar Pradesh',
        alternateName: 'UP',
        containsPlace: [
          { '@type': 'City', name: 'Varanasi' },
          { '@type': 'City', name: 'Prayagraj' },
          { '@type': 'City', name: 'Ayodhya' },
        ],
      },
    ],
  };
}

// ═══════════════════════════════════════════════════
// GENERIC ARTICLE SCHEMA — for non-blog article pages
// Use generateArticleSchema(blog) for blog posts
// ═══════════════════════════════════════════════════
export function generateGenericArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified?: string,
  imageUrl?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    image: imageUrl || `${DOMAIN}/navbanner.webp`,
    author: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: DOMAIN,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: DOMAIN,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

// ═══════════════════════════════════════════════════
// CITY OFFER CATALOG SCHEMA — rich city pages
// ═══════════════════════════════════════════════════
export function generateCityOfferCatalogSchema(
  cityName: string,
  stateName: string,
  stateSlug: string,
  citySlug: string,
  sedanRate: number,
  suvRate: number,
  innovaRate: number,
  airportFare: number,
  localPackage4hr: number,
) {
  const cityUrl = `${DOMAIN}/${stateSlug}/${citySlug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `Cab Services in ${cityName}`,
    url: cityUrl,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: DOMAIN,
    },
    offers: [
      {
        '@type': 'Offer',
        name: `Sedan Cab in ${cityName}`,
        description: `Swift Dzire / Honda Amaze outstation cab in ${cityName}, ${stateName}. AC, GPS tracked.`,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: sedanRate,
          priceCurrency: 'INR',
          unitText: 'KM',
        },
        availability: 'https://schema.org/InStock',
        url: `${cityUrl}/sedan`,
      },
      {
        '@type': 'Offer',
        name: `SUV Cab in ${cityName}`,
        description: `Ertiga / Innova outstation cab in ${cityName}. 6-seater, AC.`,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: suvRate,
          priceCurrency: 'INR',
          unitText: 'KM',
        },
        availability: 'https://schema.org/InStock',
        url: `${cityUrl}/suv`,
      },
      {
        '@type': 'Offer',
        name: `Innova Crysta Cab in ${cityName}`,
        description: `Premium 7-seater Innova Crysta cab in ${cityName}.`,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: innovaRate,
          priceCurrency: 'INR',
          unitText: 'KM',
        },
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: `Airport Taxi in ${cityName}`,
        description: `Fixed-fare airport transfer in ${cityName}. Flight tracking included.`,
        price: airportFare,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${cityUrl}/airport-transfer`,
      },
      {
        '@type': 'Offer',
        name: `Local Taxi in ${cityName} (4hr Package)`,
        description: `Hourly cab in ${cityName} — 4 hours / 40 km local package.`,
        price: localPackage4hr,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${cityUrl}/local`,
      },
    ],
  };
}

// ═══════════════════════════════════════════════════
// ROUTE TRIP ACTION SCHEMA — route pages
// ═══════════════════════════════════════════════════
export function generateRouteTripActionSchema(
  fromName: string,
  toName: string,
  distance?: number,
  priceSaloon?: number,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: `${fromName} to ${toName} Cab`,
    description: `Book ${fromName} to ${toName} cab online. ${distance ? `${distance} km journey.` : ''} Sedan from ₹${priceSaloon ?? 12}/km. AC, GPS tracked, 24/7 available.`,
    serviceType: 'Taxi/Cab Service',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: DOMAIN,
    },
    areaServed: [
      { '@type': 'Place', name: fromName },
      { '@type': 'Place', name: toName },
    ],
    offers: {
      '@type': 'Offer',
      price: priceSaloon ?? 12,
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: priceSaloon ?? 12,
        priceCurrency: 'INR',
        unitText: 'KM',
      },
      availability: 'https://schema.org/InStock',
    },
  };
}
export function generateHowToBookSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Book a Cab with ${BUSINESS.name}`,
    description: `Step-by-step guide to booking a cab in Kolkata with ${BUSINESS.name}. Book via phone call, WhatsApp, or online form.`,
    totalTime: 'PT2M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'INR', value: '11' },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Contact Us',
        text: `Call ${BUSINESS.phone} or send a WhatsApp message with your travel details.`,
        url: `${DOMAIN}/#booking-form`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Share Trip Details',
        text: 'Share your pickup location, destination, date, time, and number of passengers.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Vehicle',
        text: 'Select from Sedan, SUV, Innova Crysta, or Tempo Traveller based on your needs.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Get Confirmation',
        text: 'Receive instant booking confirmation on WhatsApp within 2 minutes with driver details.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Enjoy Your Ride',
        text: 'Our driver arrives 15 minutes early. Enjoy a safe, comfortable journey.',
      },
    ],
  };
}

export function generateEnhancedRouteSchema(
  fromName: string, toName: string, priceSaloon: number, priceSuv: number, priceTempo: number, 
  distance: number, duration: string, slug?: string
) {
  const routeSlug = slug || `${fromName.toLowerCase().replace(/\s+/g, '-')}-to-${toName.toLowerCase().replace(/\s+/g, '-')}`;
  // Use today's date for freshness signals — rebuilt on every deploy
  const today = new Date().toISOString().split('T')[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: `${fromName} to ${toName} Cab Service — ${BUSINESS.name}`,
    description: `Professional cab service from ${fromName} to ${toName}. Distance: ${distance} km. Duration: ${duration} hours. AC Sedan from ₹${priceSaloon}, SUV from ₹${priceSuv}. 24/7 booking.`,
    image: OG_IMAGE_URL,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    url: `${DOMAIN}/routes/${routeSlug}`,
    termsOfService: `${DOMAIN}/terms`,
    serviceType: 'Outstation Taxi',
    // datePublished / dateModified — freshness signals for Google ranking
    datePublished: '2024-01-01',
    dateModified: today,
    // aggregateRating lives on global LocalBusiness (layout.tsx @id:/#business) — NOT here
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: DOMAIN,
      image: OG_IMAGE_URL,
    },
    areaServed: [
      { '@type': 'City', name: fromName, containedInPlace: { '@type': 'Country', name: 'India' } },
      { '@type': 'City', name: toName, containedInPlace: { '@type': 'Country', name: 'India' } },
    ],
    // Trip itinerary helps Google understand point-to-point travel intent
    itinerary: {
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: `Pickup from ${fromName}` },
        { '@type': 'ListItem', position: 2, name: `Drop at ${toName}` },
      ],
    },
    availableChannel: [
      { '@type': 'ServiceChannel', serviceUrl: DOMAIN, name: 'Website Booking' },
      { '@type': 'ServiceChannel', servicePhone: BUSINESS.phone, name: 'Phone Booking' },
      { '@type': 'ServiceChannel', serviceUrl: `https://wa.me/${BUSINESS.whatsapp}`, name: 'WhatsApp Booking' },
    ],
    offers: [
      { '@type': 'Offer', name: 'Sedan (Swift Dzire, Honda Amaze)', price: String(priceSaloon), priceCurrency: 'INR', availability: 'https://schema.org/InStock', priceValidUntil: '2027-12-31', image: OG_IMAGE_URL },
      { '@type': 'Offer', name: 'SUV (Ertiga, Innova Crysta)', price: String(priceSuv), priceCurrency: 'INR', availability: 'https://schema.org/InStock', priceValidUntil: '2027-12-31', image: OG_IMAGE_URL },
      { '@type': 'Offer', name: 'Tempo Traveller (12-Seater)', price: String(priceTempo), priceCurrency: 'INR', availability: 'https://schema.org/InStock', priceValidUntil: '2027-12-31', image: OG_IMAGE_URL },
    ],
    // review NOT valid on TaxiService — lives on global LocalBusiness schema (layout.tsx)
  };
}


// ═══════════════════════════════════════════════════
// SPEAKABLE SPECIFICATION (Voice Search)
// ═══════════════════════════════════════════════════

export function generateSpeakableSchema(pagePath: string = '') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${DOMAIN}${pagePath}#webpage`,
    name: `${BUSINESS.name} — Best Cab Service in Kolkata`,
    url: `${DOMAIN}${pagePath}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#hero', '#booking-form', '#fare-chart'],
    },
    lastReviewed: '2026-05-10',
  };
}

// ═══════════════════════════════════════════════════
// SEASONAL / FESTIVAL OFFER SCHEMA
// ═══════════════════════════════════════════════════

export function generateSeasonalOfferSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Seasonal & Festival Cab Offers — Kolkata',
    url: `${DOMAIN}/#seasonal-offers`,
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Durga Puja Special Cab — Kolkata',
        description: 'Special cab packages during Durga Puja for pandal hopping, airport transfers, and outstation travel from Kolkata. No surge pricing.',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
        price: '1200',
        validFrom: '2026-09-01',
        validThrough: '2026-10-31',
        itemOffered: { '@type': 'Service', name: 'Durga Puja Cab Service Kolkata', serviceType: 'Taxi Service' },
      },
      {
        '@type': 'Offer',
        name: 'Christmas & New Year Cab — Kolkata',
        description: 'Reliable cab service during Christmas and New Year celebrations. Airport transfers, party drops, outstation trips. Fixed rates.',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
        price: '800',
        validFrom: '2026-12-15',
        validThrough: '2027-01-05',
        itemOffered: { '@type': 'Service', name: 'New Year Cab Service Kolkata', serviceType: 'Taxi Service' },
      },
      {
        '@type': 'Offer',
        name: 'Summer Holiday Cab Packages — Kolkata',
        description: 'Special summer tour packages from Kolkata to Darjeeling, Puri, Digha, Sundarbans with AC cab at no-surge rates.',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
        price: '2500',
        validFrom: '2026-04-01',
        validThrough: '2026-06-30',
        itemOffered: { '@type': 'Service', name: 'Summer Holiday Cab Kolkata', serviceType: 'Taxi Service' },
      },
      {
        '@type': 'Offer',
        name: 'Diwali & Kali Puja Cab — Kolkata',
        description: 'Safe, reliable cab service during Diwali and Kali Puja nights. Late night rides, pandal visits, family travel. Zero surge.',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
        price: '1000',
        validFrom: '2026-10-01',
        validThrough: '2026-11-15',
        itemOffered: { '@type': 'Service', name: 'Diwali Cab Service Kolkata', serviceType: 'Taxi Service' },
      },
    ],
  };
}

// ═══════════════════════════════════════════════════
// BLOG ARTICLE SCHEMA (Enhanced)
// ═══════════════════════════════════════════════════

export function generateArticleSchema(blog: {
  title: string;
  description: string;
  slug: string;
  date: string;
  keywords: string[];
  category: string;
  readTime: string;
  content: string[];
}) {
  const wordCount = blog.content.join(' ').split(/\s+/).length;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.description,
    datePublished: blog.date,
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: DOMAIN,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: DOMAIN,
      logo: { '@type': 'ImageObject', url: LOGO_URL, width: 500, height: 500 },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${DOMAIN}/blog/${blog.slug}`,
    },
    image: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
      width: 1200,
      height: 630,
    },
    keywords: blog.keywords.join(', '),
    articleSection: blog.category,
    wordCount,
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Blog',
      name: `${BUSINESS.name} Travel Blog`,
      url: `${DOMAIN}/blog`,
    },
    about: {
      '@type': 'Thing',
      name: 'Cab Service in Kolkata',
      sameAs: DOMAIN,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article h2', 'article p:first-of-type'],
    },
  };
}

// ═══════════════════════════════════════════════════
// BLOG LISTING SCHEMA (CollectionPage)
// ═══════════════════════════════════════════════════

export function generateBlogListingSchema(blogs: { title: string; slug: string; date: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Travel Blog — ${BUSINESS.name}`,
    url: `${DOMAIN}/blog`,
    description: `Travel guides, route tips, fare charts, and booking guides from ${BUSINESS.name}.`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: blogs.length,
      itemListElement: blogs.map((blog, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: blog.title,
        url: `${DOMAIN}/blog/${blog.slug}`,
      })),
    },
  };
}

// ═══════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getBookingWhatsAppLink(from: string, to: string, date?: string, carType?: string): string {
  const msg = `Hi! I want to book a cab.\nFrom: ${from}\nTo: ${to}${date ? `\nDate: ${date}` : ''}${carType ? `\nCar: ${carType}` : ''}\nPlease share the fare details.`;
  return getWhatsAppLink(msg);
}

// ═══════════════════════════════════════════════════

export function generateCityGeoCircleSchema(cityName: string, stateName: string, lat: number, lng: number, alternateNames?: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${BUSINESS.name} — ${cityName}`,
    description: `Reliable cab & taxi service in ${cityName}, ${stateName}. Local taxi, outstation, airport transfer, one-way, wedding car rental. AC sedan ₹12/km, SUV ₹16/km. 24/7 availability.`,
    url: DOMAIN,
    telephone: BUSINESS.phone,
    image: OG_IMAGE_URL,
    provider: { '@type': 'LocalBusiness', '@id': `${DOMAIN}/#business`, name: BUSINESS.name },
    ...(alternateNames && alternateNames.length > 0 ? { alternateName: alternateNames } : {}),
    areaServed: [
      { 
        '@type': 'City', 
        name: cityName, 
        containedInPlace: { '@type': 'AdministrativeArea', name: stateName },
        ...(alternateNames && alternateNames.length > 0 ? { alternateName: alternateNames } : {})
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
        geoRadius: '100000',
      },
    ],
    geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: stateName,
      addressCountry: 'IN',
    },
    offers: { '@type': 'AggregateOffer', lowPrice: '11', highPrice: '25', priceCurrency: 'INR', offerCount: '5', image: OG_IMAGE_URL },
    availableChannel: [
      { '@type': 'ServiceChannel', serviceUrl: DOMAIN, name: 'Website' },
      { '@type': 'ServiceChannel', servicePhone: BUSINESS.phone, name: 'Phone' },
      { '@type': 'ServiceChannel', serviceUrl: `https://wa.me/${BUSINESS.whatsapp}`, name: 'WhatsApp' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00', closes: '23:59',
    },
  };
}

// ===== ITEMLIST SCHEMA (Route listings, fare tables) =====
export function generateItemListSchema(items: { name: string; url: string; position: number }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

// ===== WEBPAGE SCHEMA (Key landing pages — enables SiteLinks) =====
export function generateWebPageSchema(
  title: string,
  description: string,
  url: string,
  pageType: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' = 'WebPage'
) {
  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: BUSINESS.name,
      url: DOMAIN,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    inLanguage: 'en-IN',
    dateModified: new Date().toISOString(),
  };
}

// ===== PRICE SPECIFICATION (Fare chart — rich snippet eligible) =====
export function generateCabPriceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${BUSINESS.name} — Cab Booking`,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cab Service Pricing',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Sedan Cab (Swift Dzire / Honda Amaze)' },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '11',
            priceCurrency: 'INR',
            unitText: 'km',
            referenceQuantity: { '@type': 'QuantitativeValue', value: '1', unitCode: 'KMT' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'SUV Cab (Ertiga / Innova)' },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '14',
            priceCurrency: 'INR',
            unitText: 'km',
            referenceQuantity: { '@type': 'QuantitativeValue', value: '1', unitCode: 'KMT' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Innova Crysta Premium' },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '16',
            priceCurrency: 'INR',
            unitText: 'km',
            referenceQuantity: { '@type': 'QuantitativeValue', value: '1', unitCode: 'KMT' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Tempo Traveller (12-17 Seater)' },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '18',
            priceCurrency: 'INR',
            unitText: 'km',
            referenceQuantity: { '@type': 'QuantitativeValue', value: '1', unitCode: 'KMT' },
          },
        },
      ],
    },
  };
}

// ===================================================
// ROUTE FAQ SCHEMA - People Also Ask rich results
// ===================================================

export function generateRouteFAQSchema(
  fromName: string, toName: string,
  priceSaloon: number, priceSuv: number,
  distance: number, duration: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much does a cab from ${fromName} to ${toName} cost?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `One-way cab from ${fromName} to ${toName}: Sedan ₹${priceSaloon} (Swift Dzire/Amaze), SUV ₹${priceSuv} (Ertiga/Innova). All-inclusive fare — fuel, driver, AC. No return charge. Book via WhatsApp ${BUSINESS.phone}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How far is ${fromName} to ${toName} by road?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Road distance from ${fromName} to ${toName} is approximately ${distance} km. Travel time around ${duration} hours by cab.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is one-way cab available from ${fromName} to ${toName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. NK Cab & Taxi specialises in one-way drop cabs. Pay only for ${fromName} to ${toName} — driver returns empty at our cost. Sedan ₹${priceSaloon}, SUV ₹${priceSuv}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How to book cab from ${fromName} to ${toName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `WhatsApp ${BUSINESS.phone} with pickup address in ${fromName}, drop in ${toName}, date/time, vehicle choice. Confirmed in 5 minutes with driver name and vehicle number.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which vehicles are available for ${fromName} to ${toName} cab?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Sedan (Dzire/Amaze, 4 seats) ₹${priceSaloon}; SUV (Ertiga/Innova, 6-7 seats) ₹${priceSuv}; Tempo Traveller (12-17 seats) for groups. All AC, GPS-tracked, verified drivers.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is NK Cab & Taxi available 24/7 for ${fromName} to ${toName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, NK Cab & Taxi runs 24/7 for ${fromName} to ${toName}. Early morning, late night, holiday bookings accepted. Call or WhatsApp ${BUSINESS.phone} anytime.`,
        },
      },
    ],
  };
}

// Breadcrumb schemas
export function generateCityBreadcrumbSchema(cityName: string, stateName: string, citySlug: string, stateSlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: stateName, item: `${DOMAIN}/${stateSlug}` },
      { '@type': 'ListItem', position: 3, name: `Cab Service in ${cityName}`, item: `${DOMAIN}/${stateSlug}/${citySlug}` },
    ],
  };
}

export function generateRouteBreadcrumbSchema(fromName: string, toName: string, routeSlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: 'Routes', item: `${DOMAIN}/routes` },
      { '@type': 'ListItem', position: 3, name: `${fromName} to ${toName} Cab`, item: `${DOMAIN}/routes/${routeSlug}` },
    ],
  };
}

export function generateServiceBreadcrumbSchema(serviceName: string, serviceSlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${DOMAIN}/services` },
      { '@type': 'ListItem', position: 3, name: serviceName, item: `${DOMAIN}/services/${serviceSlug}` },
    ],
  };
}

// E-E-A-T Person schema
export function generateAboutPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'NK Transport Operations',
    jobTitle: 'Transport Operations Manager',
    worksFor: { '@type': 'Organization', name: BUSINESS.name, url: DOMAIN },
    knowsAbout: ['Outstation Cab Service Kolkata', 'Airport Taxi', 'One-Way Drop Cab East India', 'Wedding Car Rental', 'Corporate Transport'],
    url: `${DOMAIN}/about`,
    sameAs: [BUSINESS.gbpLink],
  };
}

// Voice/LLM speakable for route pages
export function generateRouteSpeakableSchema(fromName: string, toName: string, priceSaloon: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.route-price', '.route-summary'],
    name: `${fromName} to ${toName} cab fare`,
    text: `One-way cab from ${fromName} to ${toName} costs ₹${priceSaloon} for a Sedan. Book via NK Cab & Taxi at ${BUSINESS.phone}.`,
  };
}

// Voice/LLM speakable for city pages
export function generateCitySpeakableSchema(cityName: string, baseRate: string, airportRate: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.city-fare', '.city-description'],
    name: `Cab service in ${cityName}`,
    text: `Cab service in ${cityName} from ${baseRate}. Airport transfer from ₹${airportRate}. 24/7. Call NK Cab & Taxi at ${BUSINESS.phone}.`,
  };
}
