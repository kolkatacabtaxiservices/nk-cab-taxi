import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';

import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import { getState, getAllStateSlugs, BUSINESS, getStatePriceLabels, type Route } from '@/lib/data';
import { getRoutesFrom, getPopularLocalRoutes } from '@/lib/routeData';
import { generateStateMetadata, generateFaqSchema, generateBreadcrumbSchema } from '@/lib/seo';

// Only pre-built state pages served; unknown state slugs → 404 (no on-demand ISR)
export const dynamicParams = false;
// Force fully static SSG — zero ISR Reads/Writes on Vercel
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return getAllStateSlugs().map(slug => ({ state: slug }));
}


export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getState(stateSlug);
  if (!state) return {};
  const baseMetadata = generateStateMetadata(state.name);
  const cityNames = state.cities.slice(0, 8).map(c => c.name);
  return {
    ...baseMetadata,
    keywords: [
      `cab service in ${state.name}`,
      `taxi in ${state.name}`,
      `${state.name} cab service`,
      `${state.name} taxi service`,
      `cab booking ${state.name}`,
      `outstation cab ${state.name}`,
      `one way cab ${state.name}`,
      `round trip cab ${state.name}`,
      `airport cab ${state.name}`,
      `car rental ${state.name}`,
      `taxi booking ${state.name}`,
      `24/7 cab ${state.name}`,
      `best cab service ${state.name}`,
      `cheap cab ${state.name}`,
      `ac cab ${state.name}`,
      ...cityNames.map(c => `cab service in ${c}`),
      ...cityNames.map(c => `taxi in ${c}`),
      ...cityNames.map(c => `${c} to kolkata cab`),
    ],
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const state = getState(stateSlug);
  if (!state) notFound();

  const prices = getStatePriceLabels(stateSlug);


  const hubCity = state.cities.find(c => c.type === 'hub') || state.cities[0];
  const hubRoutes = (await getRoutesFrom(hubCity.slug)).slice(0, 12);
  const touristCities = state.cities.filter(c => c.tourist);

  // Gather local routes for all cities in this state to show popular intra-state routes
  const intraStateRoutes: Route[] = [];
  const seenSlugs = new Set<string>();
  for (const city of state.cities) {
    const localRoutes = await getPopularLocalRoutes(city.slug, 4);
    for (const r of localRoutes) {
      if (!seenSlugs.has(r.slug) && r.toState === state.slug) {
        intraStateRoutes.push(r);
        seenSlugs.add(r.slug);
      }
    }
  }

  // Fix #8 — Soft 404 prevention: For states with sparse intra-state routes (e.g. Bihar/UP),
  // supplement with cross-state routes from Kolkata to state cities — gives Google real, crawlable content.
  let crossStateRoutes: Route[] = [];
  if (intraStateRoutes.length < 4) {
    const kolkataRoutes = await getRoutesFrom('kolkata');
    crossStateRoutes = kolkataRoutes
      .filter(r => r.toState === stateSlug && !seenSlugs.has(r.slug))
      .slice(0, 8);
  }

  const localRoutesSample = [...intraStateRoutes, ...crossStateRoutes].slice(0, 12);

  // Build a Set of all known route slugs from already-fetched data.
  // Used in the Popular Searches section to determine if a city→hub route exists
  // WITHOUT calling the async getRoute() function (which would return a Promise when
  // used synchronously — always truthy, causing broken links for non-existent routes).
  const knownRouteSlugs = new Set<string>([
    ...hubRoutes.map(r => r.slug),
    ...intraStateRoutes.map(r => r.slug),
    ...crossStateRoutes.map(r => r.slug),
  ]);

  // State-specific unique FAQ content — prevents identical template FAQs across all state pages
  const stateFaqMap: Record<string, Array<{ question: string; answer: string }>> = {
    'west-bengal': [
      { question: 'What is the fastest cab route from Kolkata to Darjeeling?', answer: `The fastest route from Kolkata to Darjeeling is NH12 via Siliguri (596 km, 12–14 hrs). ${BUSINESS.name} recommends Innova Crysta for this route due to 74 hairpin bends on the hill section. Sedan available for 2–3 passengers. Call ${BUSINESS.phone} for departure timing advice — early morning start (4–5 AM) beats both Kolkata traffic and hill-road afternoon fog.` },
      { question: 'Does NK Cab & Taxi cover the Sundarbans area in West Bengal?', answer: `Yes. We provide cab service to Godkhali ghat (Sundarbans entry point), approximately 110–130 km from Kolkata. The driver parks and waits during your 2-day boat safari. Call ${BUSINESS.phone} — we also help coordinate boat booking contacts through our network.` },
      { question: 'What is the cab fare from Kolkata to Digha in West Bengal?', answer: `Kolkata to Digha (185 km, NH116B): Sedan ₹2,500 one-way | SUV ₹3,400 | Weekend package (Sat–Sun with driver stay) Sedan ₹5,500. No surge during Durga Puja weekends. Call ${BUSINESS.phone} for weekend availability.` },
      { question: 'Do you operate outstation cabs from Siliguri in West Bengal?', answer: `Yes. From Siliguri we provide cabs to Darjeeling (90 km, Innova ₹2,800), Gangtok (120 km, Innova ₹3,500), Kalimpong (70 km, ₹2,200), Dooars (100 km, ₹2,800). We also do Siliguri–Kolkata outstation (one-way ₹6,500 Sedan). Call ${BUSINESS.phone}.` },
      { question: 'Are there cab services from smaller cities in West Bengal like Durgapur and Asansol?', answer: `Yes. ${BUSINESS.name} provides cab services from Durgapur and Asansol to Kolkata, Ranchi, Bhubaneswar, and all major destinations. Durgapur to Kolkata: Sedan ₹2,000 (approx 170 km). Asansol to Kolkata: Sedan ₹2,200 (approx 200 km). Call ${BUSINESS.phone} for city-specific availability.` },
    ],
    'jharkhand': [
      { question: 'Which Jharkhand cities does NK Cab & Taxi operate in?', answer: `${BUSINESS.name} operates in all major Jharkhand cities: Ranchi (hub), Jamshedpur, Dhanbad, Bokaro, Deoghar, Hazaribagh, Giridih, Ramgarh, and Latehar. Our Ranchi and Jamshedpur driver networks ensure 15–20 minute pickup times in both cities. Call ${BUSINESS.phone} for booking from any Jharkhand city.` },
      { question: 'Is there a cab service from Ranchi airport to Jamshedpur?', answer: `Yes — this is one of our most-booked Jharkhand routes. Ranchi airport (IXR, Birsa Munda International) to Jamshedpur is approximately 145 km (2.5–3 hours via NH33). Fare: Sedan ₹1,800 | SUV ₹2,400 | Innova ₹2,900. We monitor flight arrivals for airport pickup. Call ${BUSINESS.phone} to book.` },
      { question: 'Do you operate cab service to Deoghar Baidyanath Dham from Ranchi?', answer: `Yes. Ranchi to Deoghar is approximately 170 km (3.5 hours). Fare: Sedan ₹2,200 | Innova ₹3,600. During Shravan month (July–August), when Kanwar pilgrims throng Deoghar, we maintain fixed rates — no surge pricing during the pilgrimage season. Advance booking strongly recommended for Shravan. Call ${BUSINESS.phone}.` },
      { question: 'What is the cab fare from Ranchi to Kolkata?', answer: `Ranchi to Kolkata is approximately 400 km via NH39 (7–8 hours). Fare: Sedan ₹4,800 | SUV ₹6,400 | Innova Crysta ₹7,800 | Tempo Traveller ₹10,000. Best departure: 5 AM from Ranchi to reach Kolkata by early afternoon. Call ${BUSINESS.phone} for current availability.` },
      { question: 'Do you provide corporate cab service in Jharkhand for SAIL, TATA, and other companies?', answer: `Yes. ${BUSINESS.name} provides corporate fleet services in Jharkhand for Tata Steel, SAIL Bokaro, HPCL, and other major employers. GST invoice with CGST/SGST breakdown for ITC claims. Monthly contracts available. Employee transport from Jamshedpur, Bokaro, and Ranchi plants. Call ${BUSINESS.phone} for a corporate quote.` },
    ],
    'odisha': [
      { question: 'Does NK Cab & Taxi provide cab service for Jagannath Temple visits in Puri?', answer: `Yes. We regularly provide Kolkata to Puri cab (500 km, ~9.5 hours, from ₹5,800 Sedan) and local sightseeing from Puri including Jagannath Temple area, Konark Sun Temple (35 km), and Chilika Lake (50 km). Important: Jagannath Temple permits Hindus only inside the complex; we brief passengers and suggest Raghunandan Library viewpoint for non-Hindu visitors. Call ${BUSINESS.phone}.` },
      { question: 'What cab service does NK Cab & Taxi provide in Bhubaneswar?', answer: `In Bhubaneswar, we provide: airport transfer at BBI (Biju Patnaik International Airport) starting ₹800, local city taxi (4hr ₹1,800), outstation to Puri (60 km, ₹1,000), Konark (65 km, ₹1,100), Cuttack (30 km, ₹700), Berhampur (165 km, ₹2,500), and Kolkata (500 km, ₹5,800 Sedan). Call ${BUSINESS.phone}.` },
      { question: 'Can I book a cab from Kolkata to Konark Sun Temple?', answer: `Yes. Kolkata to Konark is approximately 540 km (10 hours). We recommend a 2-night package: Day 1 Kolkata to Puri, Day 2 Puri to Konark (35 km) + local sightseeing, Day 3 return. 3-day Sedan package from ₹12,500 including driver accommodation. Call ${BUSINESS.phone} for the full Odisha circuit itinerary.` },
      { question: 'Do you serve tribal and rural Odisha areas like Koraput, Baripada, and Rourkela?', answer: `We serve Rourkela (280 km from Bhubaneswar, via NH55), Baripada (Mayurbhanj district, 240 km from Kolkata), and Jeypore/Koraput on request. Remote tribal area trips require advance booking (48 hours minimum) and may need a local guide for the last section. Call ${BUSINESS.phone} to check availability for specific tribal circuit destinations.` },
      { question: 'Is there a pilgrimage cab circuit covering Puri, Konark, and Chilika from Kolkata?', answer: `Yes — our 3-day Odisha pilgrimage circuit is popular: Day 1 Kolkata to Puri (Jagannath darshan), Day 2 Puri to Konark (Sun Temple) + Chilika Lake (dolphin boat), Day 3 return to Kolkata. Sedan 3-day package ₹12,500 | Innova 3-day ₹20,000. All tolls and driver accommodation included. Call ${BUSINESS.phone}.` },
    ],
    'bihar': [
      { question: 'Does NK Cab & Taxi provide cab service from Kolkata to Bodh Gaya?', answer: `Yes. Kolkata to Bodh Gaya is approximately 450 km (7–8 hours via NH19/Asansol/Dhanbad). Sedan fare: ₹5,500 one-way. Round trip 3-day package (Kolkata to Bodh Gaya → Gaya → Rajgir → Nalanda → return) from ₹14,000 Sedan. This is a popular Buddhist pilgrimage circuit we operate frequently. Call ${BUSINESS.phone}.` },
      { question: 'What is the cab fare from Patna to Varanasi?', answer: `Patna to Varanasi is approximately 250 km (4–5 hours via NH19). Sedan fare: ₹3,200 one-way | Innova: ₹5,000. We can continue to Prayagraj (another 120 km) for the full Uttar Pradesh pilgrimage circuit. Call ${BUSINESS.phone} for Bihar–UP multi-city pricing.` },
      { question: 'Do you cover Gaya airport cab service in Bihar?', answer: `Yes. Gaya International Airport (GAY) serves Buddhist pilgrims from Japan, Thailand, and Sri Lanka. We provide airport transfer from GAY to Bodh Gaya (17 km, ₹600 Sedan) and multi-day pilgrimage packages from Gaya Airport covering Bodh Gaya, Rajgir, Nalanda, and Vaishali. Call ${BUSINESS.phone} for pilgrim group packages.` },
      { question: 'Is there cab service from Kolkata to Rajgir and Nalanda in Bihar?', answer: `Yes. Kolkata to Rajgir is approximately 450 km (8 hours). We offer 2-day packages covering Rajgir (Vishwa Shanti Stupa, hot springs, Gridhrakuta hill) and Nalanda (ancient university ruins). Sedan 2-day package from ₹12,000. Call ${BUSINESS.phone} for availability.` },
      { question: 'Can NK Cab & Taxi provide multiple cabs for large groups visiting Chhath Puja ghats?', answer: `Yes. During Chhath Puja (October–November), we manage group transport to Bihar's Ganga ghats and local Chhath celebration venues. Multi-vehicle coordination for corporate groups, family gatherings, and pilgrimage parties. Book at least 2 weeks before Chhath for guaranteed availability. Call ${BUSINESS.phone}.` },
    ],
    'uttar-pradesh': [
      { question: 'Does NK Cab & Taxi cover Kashi Vishwanath temple area in Varanasi?', answer: `Yes. We provide cab service in Varanasi including the Kashi Vishwanath temple circuit, Assi Ghat, Dasaswamedh Ghat, and Sarnath (10 km). Our Varanasi drivers know the narrow lanes of the old city and the best drop points near the ghats. We also provide Ganga Aarti viewpoint drops. Call ${BUSINESS.phone}.` },
      { question: 'Can I book a cab from Kolkata to Varanasi?', answer: `Yes. Kolkata to Varanasi is approximately 680 km (11–12 hours via NH19). Sedan fare: ₹8,000 one-way | Innova: ₹12,000. We recommend overnight travel (depart 9 PM, arrive 8–9 AM) or a 2-day trip (Kolkata → Varanasi Day 1, sightseeing Day 2, return Day 3). Call ${BUSINESS.phone} for Varanasi tour packages.` },
      { question: 'Does NK Cab & Taxi provide Prayagraj (Allahabad) cab service?', answer: `Yes. We operate from Prayagraj for local sightseeing (Triveni Sangam, Anand Bhavan, Khusro Bagh) and outstation routes to Varanasi (120 km), Lucknow (200 km), and Kolkata (700 km). During Maha Kumbh, advance booking is essential — contact ${BUSINESS.phone} at least 30 days prior for Prayagraj during Kumbh period.` },
      { question: 'What is the cab fare from Ranchi to Varanasi?', answer: `Ranchi to Varanasi is approximately 380 km (7 hours via NH39 through Garhwa and Sonbhadra). Sedan fare: ₹4,600 | Innova Crysta: ₹7,500. This is a popular Jharkhand-to-UP pilgrimage corridor. Call ${BUSINESS.phone} for current availability.` },
      { question: 'Is there Ayodhya Ram Mandir cab service from Kolkata?', answer: `Yes. Kolkata to Ayodhya is approximately 900 km (14–15 hours). We recommend a 3-night package: Night travel Kolkata → Ayodhya (arrive morning), Day 1 Ram Mandir darshan + Hanuman Garhi + Sarayu ghat Aarti, Day 2 Faizabad + return journey. Sedan 3-day package from ₹22,000. Call ${BUSINESS.phone} for Ayodhya tour details.` },
    ],
  };

  const faqs = stateFaqMap[stateSlug] || [
    { question: `What cab services are available in ${state.name}?`, answer: `${BUSINESS.name} offers local taxi, outstation cab, one-way taxi, round trip, airport transfer, wedding car rental, and corporate car rental services across all major cities in ${state.name} including ${state.cities.slice(0, 5).map(c => c.name).join(', ')}.` },
    { question: `How can I book a cab in ${state.name}?`, answer: `You can book a cab anywhere in ${state.name} by calling ${BUSINESS.phone}, sending a WhatsApp message, or filling out the booking form on our website. We provide instant confirmation.` },
    { question: `What is the cheapest cab option in ${state.name}?`, answer: `Our Sedan category (Swift Dzire, Honda Amaze) is the most affordable option starting at ${prices.sedanPerKm}. For local rides, we have packages starting from ₹${prices.localPkgSedan} for ${prices.localPkgName}.` },
    { question: `Do you provide one-way cab service in ${state.name}?`, answer: `Yes! We provide one-way cab service between all cities in ${state.name}. You only pay for the one-way journey — no return fare charges.` },
    { question: `Which cities in ${state.name} do you cover?`, answer: `We cover ${state.cities.length} cities in ${state.name}: ${state.cities.map(c => c.name).join(', ')}. Our hub city is ${hubCity.name}.` },
  ];

  const breadcrumbs = [{ name: state.name, href: `/${state.slug}` }];

  return (
    <>
      {/* Geo Meta Tags — target hub city of this state */}
      <meta name="geo.region" content={
        stateSlug === 'west-bengal' ? 'IN-WB' :
        stateSlug === 'jharkhand' ? 'IN-JH' :
        stateSlug === 'odisha' ? 'IN-OR' :
        stateSlug === 'bihar' ? 'IN-BR' :
        stateSlug === 'uttar-pradesh' ? 'IN-UP' : 'IN-WB'
      } />
      <meta name="geo.placename" content={hubCity.name} />
      <meta name="geo.position" content={`${hubCity.lat};${hubCity.lng}`} />
      <meta name="ICBM" content={`${hubCity.lat}, ${hubCity.lng}`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([{ name: 'Home', url: BUSINESS.domain }, { name: state.name, url: `${BUSINESS.domain}/${state.slug}` }])) }} />

      {/* Hero */}
      <section className="relative text-white py-16 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-4">
            Cab Service in <span className="text-gradient">{state.name}</span> {prices.displayRate} | Reserve Taxi Online Day or Night
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-6">{state.description}</p>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full">
              <Phone size={18} /> {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8">Cab Service in {state.name} — <span className="text-primary">{state.cities.length} Cities</span> | Every Area Covered</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {state.cities.map((city) => (
              <Link key={city.slug} href={`/${state.slug}/${city.slug}`} className="group p-5 bg-white rounded-xl border border-gray-100 card-hover shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">{city.name}</h3>
                    {city.type === 'hub' && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Hub City</span>}
                    {city.tourist && <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium ml-1">Tourist</span>}
                    <p className="text-gray-500 text-xs mt-2 line-clamp-2">{city.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes from Hub */}
      {hubRoutes.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8">Popular Routes from <span className="text-primary">{hubCity.name}</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hubRoutes.map((route) => (
                <Link key={route.slug} href={`/routes/${route.slug}`} className="route-card bg-white rounded-xl p-4">
                  <p className="font-semibold text-secondary text-sm">{route.fromName} → {route.toName}</p>
                  <p className="text-xs text-gray-500 mt-1">{route.distance} km • {route.duration} hrs</p>
                  <p className="text-primary font-bold mt-2">From ₹{route.priceSaloon}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Local Routes in State */}
      {localRoutesSample.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Popular Local Routes in <span className="text-primary">{state.name}</span></h2>
            <p className="text-gray-500 mb-8">Reserve a fixed-fare ride on the most-used routes across {state.name}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {localRoutesSample.map((route) => (
                <Link key={route.slug} href={`/routes/${route.slug}`} className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{route.fromName} → {route.toName}</p>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-gray-500">{route.distance} km • {route.duration} hrs</span>
                    <span className="text-primary font-bold">From ₹{route.priceSaloon}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tourist Places */}
      {touristCities.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8">Tourist Places in <span className="text-primary">{state.name}</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {touristCities.slice(0, 6).map((city) => (
                <Link key={city.slug} href={`/${state.slug}/${city.slug}`} className="group bg-white rounded-2xl border border-gray-100 p-6 card-hover shadow-sm">
                  <h3 className="font-bold text-secondary text-lg group-hover:text-primary transition-colors mb-2">{city.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{city.description}</p>
                  {city.landmarks && (
                    <div className="flex flex-wrap gap-1.5">
                      {city.landmarks.slice(0, 3).map((l) => (
                        <span key={l} className="px-2 py-0.5 bg-accent text-primary text-xs rounded-full">{l}</span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <BookingForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} title={`Common Queries — Taxi Service in ${state.name}`} />
        </div>
      </section>

      {/* Long-form SEO Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <article className="max-w-4xl space-y-6" itemScope itemType="https://schema.org/Article">
            <h2 className="text-2xl font-bold text-secondary">Taxi Service in {state.name} — Trusted Fleet by NK Cab &amp; Taxi</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {stateSlug === 'west-bengal' && (
                <>
                  <p><strong>NK Cab &amp; Taxi</strong> is West Bengal&apos;s most-used outstation cab provider, operating from Kolkata across 35+ cities in the state. Whether you need a cab from Kolkata to Darjeeling&apos;s tea gardens (596 km), to Digha beach (185 km), to Siliguri for North Bengal connections, or to Murshidabad for a heritage tour — our drivers know every route in the state with the road-level detail that GPS apps lack.</p>
                  <p>In West Bengal, our service covers the full spectrum: local taxi in Kolkata (4hr ₹1,800), beach destination cabs (Digha, Mandarmani, Tajpur, Bakkhali), hill station routes (Darjeeling, Kalimpong via Siliguri), heritage circuits (Shantiniketan, Bishnupur, Murshidabad), wildlife access (Sundarbans, Jaldapara), and pilgrimages (Gangasagar, Mayapur, Kalighat). All at fixed rates — no surge during Durga Puja or any festival.</p>
                  <p>Our Kolkata cab operates from all areas: Salt Lake, New Town, Howrah, Ballygunge, Dum Dum, Barasat, Gariahat, Jadavpur, Tollygunge, and beyond. CCU Airport transfers start at ₹1,200 (Sedan). Fleet: Swift Dzire ₹12/km, Ertiga ₹16/km, Innova Crysta ₹18/km, Tempo Traveller ₹22/km. Call {BUSINESS.phone}.</p>
                </>
              )}
              {stateSlug === 'jharkhand' && (
                <>
                  <p><strong>NK Cab &amp; Taxi</strong> operates in Jharkhand from two hubs: Ranchi (state capital, Birsa Munda Airport IXR) and Jamshedpur (Tata Steel city, no commercial airport). These two cities handle the majority of Jharkhand&apos;s corporate travel, pilgrimage movement, and inter-city commutes.</p>
                  <p>From Ranchi, we cover: Jamshedpur (130 km, ₹1,800 Sedan), Dhanbad (150 km, ₹2,000), Deoghar (170 km, ₹2,200, Baidyanath Dham), Bokaro (100 km, ₹1,600), Hazaribagh (95 km, ₹1,500), and Kolkata (400 km, ₹4,800). For Jamshedpur, we provide Tata Steel employee transport, Ranchi airport connections, and outstation routes to Kolkata, Patna, and Bhubaneswar. All vehicles carry Jharkhand commercial permits. GST invoice available. Call {BUSINESS.phone}.</p>
                </>
              )}
              {stateSlug === 'odisha' && (
                <>
                  <p><strong>NK Cab &amp; Taxi</strong> serves Odisha primarily through the Kolkata–Bhubaneswar–Puri corridor, one of the busiest pilgrimage and tourism routes in eastern India. Bhubaneswar (BBI Airport) acts as our Odisha hub from which we serve Puri, Konark, Cuttack, Rourkela, Berhampur, and Chilika Lake.</p>
                  <p>The Jagannath Temple pilgrimage circuit from Kolkata is our most popular Odisha package: Kolkata to Puri (500 km, NH16, ₹5,800 Sedan one-way), followed by Konark Sun Temple (35 km from Puri), Chilika Lake dolphin boat (50 km from Puri via Satapada), and Raghurajpur Pattachitra village. 3-day round-trip Sedan package ₹12,500 including driver accommodation. Call {BUSINESS.phone} for itinerary.</p>
                </>
              )}
              {stateSlug === 'bihar' && (
                <>
                  <p><strong>NK Cab &amp; Taxi</strong> serves Bihar primarily for the Buddhist pilgrimage circuit (Bodh Gaya, Rajgir, Nalanda, Vaishali) and Hindu pilgrimage routes. Bihar sits at the intersection of multiple historic routes — from Kolkata via Dhanbad (450 km), from Ranchi via Hazaribagh, and from Varanasi via NH19.</p>
                  <p>Our Bihar service focuses on: Kolkata to Bodh Gaya (₹5,500 Sedan), Gaya Airport (GAY) transfers, the Buddhist circuit covering Nalanda and Rajgir, Chhath Puja group transport in the Gangetic plains, and corporate travel for Patna&apos;s government and banking sector. During peak pilgrimage periods (Chhath, Buddha Purnima), we maintain fixed rates. Book 2+ weeks ahead. Call {BUSINESS.phone}.</p>
                </>
              )}
              {stateSlug === 'uttar-pradesh' && (
                <>
                  <p><strong>NK Cab &amp; Taxi</strong> serves Uttar Pradesh for the major pilgrimage routes that connect eastern India to Varanasi, Prayagraj, and Ayodhya. Our UP service is primarily accessed from Jharkhand (Ranchi to Varanasi, 380 km), Bihar (Patna to Varanasi, 250 km), and Bengal (Kolkata to Varanasi, 680 km).</p>
                  <p>From Kolkata, our Varanasi package covers: Kashi Vishwanath Temple, Ganga Aarti at Dashashwamedh Ghat, Sarnath (10 km), and optional Prayagraj extension (Triveni Sangam, 120 km). For Maha Kumbh, we coordinate multi-vehicle group bookings to Prayagraj — advance booking essential (30 days minimum). Ayodhya Ram Mandir packages from Kolkata available. Call {BUSINESS.phone}.</p>
                </>
              )}
              {!['west-bengal', 'jharkhand', 'odisha', 'bihar', 'uttar-pradesh'].includes(stateSlug) && (
                <>
                  <p><strong>{BUSINESS.name}</strong> provides trusted cab service across {state.name}. We cover {state.cities.length} cities including {state.cities.slice(0, 5).map(c => c.name).join(', ')} and more. Whether you need a local taxi or outstation cab, call {BUSINESS.phone} for instant booking.</p>
                  <p>Our fleet includes AC Sedans at {prices.sedanPerKm}, SUVs at {prices.suvPerKm}, Innova Crysta at {prices.crystaPerKm}, and Tempo Travellers at {prices.tempoPerKm}. Fixed rates, no surge pricing, police-verified drivers.</p>
                </>
              )}
            </div>
          </article>
        </div>
      </section>

      {/* Popular Searches — SEO internal linking */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Popular Searches in {state.name}</h3>
          <div className="flex flex-wrap gap-2">
            {state.cities.slice(0, 12).flatMap(c => {
              const routeSlug = `${c.slug}-to-${hubCity.slug}`;
              // Use pre-built Set instead of async getRoute() called synchronously.
              // getRoute() is async — calling without await returns a Promise (always truthy),
              // causing every city to link to /routes/... even when that route doesn't exist.
              const hasRoute = knownRouteSlugs.has(routeSlug);
              return [
                { label: `${c.name} cab service`, href: `/${state.slug}/${c.slug}` },
                { label: `taxi in ${c.name}`, href: `/${state.slug}/${c.slug}` },
                { 
                  label: `${c.name} to ${hubCity.name} cab`, 
                  href: hasRoute ? `/routes/${routeSlug}` : `/${state.slug}/${c.slug}/outstation` 
                },
              ];
            }).map((item, i) => (
              <Link key={i} href={item.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-500 hover:border-primary/40 hover:text-primary transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
