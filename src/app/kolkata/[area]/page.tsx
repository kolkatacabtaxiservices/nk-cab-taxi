import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, Clock, Car, Shield, Star, CheckCircle, Navigation, Plane } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import { BUSINESS } from '@/lib/data';
import { getRoutesFrom } from '@/lib/routeData';
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/seo';
import areasData from '@/data/kolkata-areas.json';

type Area = typeof areasData[number];
const areas = areasData as Area[];

// Only pre-built Kolkata area pages served; unknown slugs → 404 (no on-demand ISR)
export const dynamicParams = false;
// Force fully static SSG — zero ISR Reads/Writes on Vercel
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return areas.map(a => ({ area: a.slug }));
}


export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = areas.find(a => a.slug === slug);
  if (!area) return {};
  return {
    title: `Cab Service in ${area.shortName}, Kolkata — Taxi & Car Rental, 24/7`,
    description: `Reliable cab hire in ${area.name}, Kolkata. Airport drop ${area.fareToAirport}, outstation ₹12/km, local ₹1,800/4hr. AC cars, verified chauffeurs, 24/7. Call ${BUSINESS.phone}.`,
    openGraph: {
      title: `${area.shortName} Cab Hire, Kolkata — ${BUSINESS.name}`,
      description: `Reserve dependable taxis in ${area.name}. Airport ${area.fareToAirport}. Local ₹1,800/4hr and outstation ₹12/km. Round-the-clock, no surge. Call ${BUSINESS.phone}.`,
      url: `${BUSINESS.domain}/kolkata/${area.slug}`,
      siteName: BUSINESS.name,
      locale: 'en_IN',
      type: 'website',
      images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `Cabs & Taxis in ${area.shortName}, Kolkata` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${area.shortName} Taxi Service, Kolkata — ₹12/km | ${BUSINESS.name}`,
      description: `Reserve a cab in ${area.shortName}. Airport ${area.fareToAirport}. Local and outstation trips. 24/7. Call ${BUSINESS.phone}.`,
      images: [`${BUSINESS.domain}/navbanner.webp`],
    },
    alternates: { canonical: `${BUSINESS.domain}/kolkata/${area.slug}` },
    keywords: [
      `cab service in ${area.shortName}`,
      `${area.shortName} cab service`,
      `taxi in ${area.shortName}`,
      `${area.shortName} taxi`,
      `cab in ${area.shortName} kolkata`,
      `${area.shortName} cab kolkata`,
      `${area.shortName} airport cab`,
      `${area.shortName} to airport taxi`,
      `cab from ${area.shortName} to airport`,
      `${area.shortName} to kolkata airport cab`,
      `${area.shortName} outstation cab`,
      `${area.shortName} local taxi`,
      `${area.shortName} hourly cab`,
      `book cab in ${area.shortName}`,
      `cab near me ${area.shortName}`,
      `taxi near me ${area.shortName}`,
      `24 hour cab ${area.shortName}`,
      `${area.shortName} innova cab`,
      `${area.shortName} suv taxi`,
      `${area.shortName} cab rate`,
      `${area.shortName} cab fare`,
      `best cab service ${area.shortName}`,
      `no surge cab ${area.shortName}`,
      `fixed rate taxi ${area.shortName}`,
    ],
    other: {
      thumbnail: `${BUSINESS.domain}/navbanner.webp`,
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: slug } = await params;
  const area = areas.find(a => a.slug === slug);
  if (!area) notFound();

  const otherAreas = areas.filter(a => a.slug !== slug);
  const outstationRoutes = (await getRoutesFrom('kolkata')).slice(0, 8);

  const faqs = [
    { question: `How do I reserve a cab in ${area.shortName}, Kolkata?`, answer: `Ring ${BUSINESS.phone} or message us on WhatsApp to book a cab anywhere in ${area.name}. Give us your pickup address, destination, date, and time — we confirm at once with driver details. No app required.` },
    { question: `How much is the cab fare from ${area.shortName} to Kolkata Airport?`, answer: `Sedan (Swift Dzire): ${area.fareToAirport}. SUV (Ertiga/Innova): ₹${area.airportFareSuv}. Distance: ${area.airportDistance}. Covers AC, fuel, chauffeur. Fixed fare around the clock.` },
    { question: `Is cab service available round the clock in ${area.shortName}?`, answer: `Yes. ${BUSINESS.name} works round the clock in ${area.name} — 3 AM airport pickup or late-night travel, we are always reachable. Same rate, no night surcharge.` },
    { question: `What kinds of cabs are on offer in ${area.shortName}?`, answer: `Sedan (Swift Dzire, Amaze — 4 seats): ₹12/km. SUV (Ertiga, Innova — 6 seats): ₹16/km. Innova Crysta (7 seats): ₹18/km. Tempo Traveller (12 seats): ₹22/km. Every car is AC and sanitized.` },
    { question: `Do fares spike in ${area.shortName} during festivals?`, answer: `Not at all. Unlike Ola and Uber, ${BUSINESS.name} keeps fixed rates in ${area.name} — the same fare during Durga Puja, Diwali, Christmas, and every peak period. No surge, no dynamic pricing.` },
    { question: `Can I take a one-way cab from ${area.shortName}?`, answer: `Yes. Book a one-way cab from ${area.shortName} to any city — you pay for the single journey only. No return fare. Sedans from ₹12/km. The most budget-friendly choice.` },
    { question: `Where can I be picked up in ${area.shortName}?`, answer: `We collect passengers from all across ${area.name}: ${area.landmarks.join(', ')}. Home, office, hotel, or hospital — any address works.` },
    { question: `Can companies hire cabs in ${area.shortName}?`, answer: `Yes. Monthly corporate car contracts are available for firms in ${area.name} — employee transport, client visits, VIP airport pickups. 15-25% corporate discount. GST invoices issued.` },
  ];

  // Neighbourhood-level coordinates for precise geo-targeting
  const AREA_COORDS: Record<string, { lat: number; lng: number }> = {
    'salt-lake': { lat: 22.5800, lng: 88.4119 },
    'new-town': { lat: 22.5958, lng: 88.4845 },
    'howrah': { lat: 22.5958, lng: 88.2636 },
    'park-street': { lat: 22.5513, lng: 88.3526 },
    'dum-dum': { lat: 22.6221, lng: 88.4200 },
    'ballygunge': { lat: 22.5283, lng: 88.3626 },
    'tollygunge': { lat: 22.4980, lng: 88.3468 },
    'barasat': { lat: 22.7225, lng: 88.4805 },
    'behala': { lat: 22.4764, lng: 88.3138 },
    'esplanade': { lat: 22.5626, lng: 88.3510 },
    'gariahat': { lat: 22.5163, lng: 88.3695 },
    'jadavpur': { lat: 22.4990, lng: 88.3712 },
  };
  const coords = AREA_COORDS[area.slug] || { lat: 22.5726, lng: 88.3639 };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${BUSINESS.name} — ${area.shortName}`,
    description: `Trusted cab and taxi service in ${area.name}, Kolkata. Airport runs, outstation trips, local hires, corporate travel.`,
    url: `${BUSINESS.domain}/kolkata/${area.slug}`,
    telephone: BUSINESS.phone,
    address: { '@type': 'PostalAddress', addressLocality: area.shortName, addressRegion: 'West Bengal', addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: coords.lat, longitude: coords.lng },
    areaServed: [
      { '@type': 'Place', name: `${area.name}, Kolkata` },
      {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: coords.lat, longitude: coords.lng },
        geoRadius: '5000',
      },
    ],
    priceRange: '₹₹',
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  };

  return (
    <>
      {/* Geo Meta Tags — neighbourhood-specific */}
      <meta name="geo.region" content="IN-WB" />
      <meta name="geo.placename" content={`${area.shortName}, Kolkata`} />
      <meta name="geo.position" content={`${coords.lat};${coords.lng}`} />
      <meta name="ICBM" content={`${coords.lat}, ${coords.lng}`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Kolkata', url: `${BUSINESS.domain}/west-bengal/kolkata` },
        { name: area.shortName, url: `${BUSINESS.domain}/kolkata/${area.slug}` },
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-14 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Kolkata', href: '/west-bengal/kolkata' },
            { name: area.shortName, href: `/kolkata/${area.slug}` },
          ]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-4">
            Cab Service in <span className="text-gradient">{area.shortName}</span>, Kolkata
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-6">
            Book reliable, affordable cab & taxi service in {area.name}. Airport transfer from {area.fareToAirport}. Local rides from ₹1,800. Outstation from ₹12/km. Round-the-clock service — no surge pricing.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Plane size={14} /> Airport: {area.fareToAirport}</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Car size={14} /> Local: ₹2,800/8hr</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Navigation size={14} /> Outstation: ₹12/km</span>
            <span className="flex items-center gap-1.5 bg-primary/30 px-3 py-1.5 rounded-full font-semibold"><Star size={14} /> 4.8★ Rating</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg">
              <Phone size={18} /> Reserve Now: {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I would like a cab in ${area.shortName}, Kolkata.`)}`} className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {[
              { icon: <Shield size={16} />, text: 'Verified Chauffeurs' },
              { icon: <Clock size={16} />, text: 'Round-the-Clock' },
              { icon: <Star size={16} />, text: '4.8★ (2847 Reviews)' },
              { icon: <CheckCircle size={16} />, text: 'No Surge Fares' },
              { icon: <Car size={16} />, text: 'Clean AC Cars' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-primary font-medium">{b.icon} {b.text}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8" itemScope itemType="https://schema.org/Service">

              {/* About Area */}
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-4">Cab Service in {area.name} — Full Guide</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{area.description}</p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  <strong>{BUSINESS.name}</strong> is the go-to cab provider in {area.shortName}, Kolkata. Whether it is an airport run from {area.shortName} to CCU ({area.airportDistance}), an hourly local car for errands or hospital trips, an outstation cab to Darjeeling, Puri, or Digha, or a corporate vehicle — we are here for you day and night, all week long.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Unlike Ola and Uber, we charge <strong>fixed rates with zero surge pricing</strong> — the same fare at 3 AM, during Durga Puja, on New Year&apos;s Eve, or any peak time. Our chauffeurs are police-verified with 5+ years of experience, and every car is AC, sanitized, and GPS-tracked. Call {BUSINESS.phone} for instant booking.
                </p>
              </div>

              {/* Fare Table */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Cab Rates from {area.shortName}</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-secondary text-white">
                        <th className="px-4 py-3 text-left text-sm">Car</th>
                        <th className="px-4 py-3 text-center text-sm">Seats</th>
                        <th className="px-4 py-3 text-center text-sm">Airport (CCU)</th>
                        <th className="px-4 py-3 text-center text-sm">Per KM Fare</th>
                        <th className="px-4 py-3 text-center text-sm">Local 4hr/40km</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { v: '🚗 Sedan', cap: '4', apt: `₹${area.airportFareSedan}`, km: '₹12/km', local: '₹1,800' },
                        { v: '🚙 SUV', cap: '6', apt: `₹${area.airportFareSuv}`, km: '₹16/km', local: '₹2,500' },
                        { v: '🚘 Crysta', cap: '7', apt: `₹${area.airportFareSuv + 500}`, km: '₹18/km', local: '₹2,999' },
                        { v: '🚐 Tempo', cap: '12', apt: `₹${area.airportFareSuv + 1500}`, km: '₹22/km', local: '₹3,500' },
                      ].map((r, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-semibold text-sm">{r.v}</td>
                          <td className="px-4 py-3 text-center text-gray-500 text-sm">{r.cap}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">{r.apt}</td>
                          <td className="px-4 py-3 text-center text-gray-600 text-sm">{r.km}</td>
                          <td className="px-4 py-3 text-center text-gray-600 text-sm">{r.local}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">* Tolls and parking extra. Fixed fares — no surge, day or night.</p>
              </div>

              {/* Landmarks & Pickup Points */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Pickup and Drop Spots in {area.shortName}</h3>
                <div className="flex flex-wrap gap-2">
                  {area.landmarks.map(l => (
                    <span key={l} className="px-3 py-1.5 bg-accent rounded-full text-sm text-gray-700 font-medium">{l}</span>
                  ))}
                </div>
              </div>

              {/* Hospitals */}
              {area.hospitals.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-4">Cabs for Hospitals in {area.shortName}</h3>
                  <p className="text-gray-600 mb-3">Heading to or from a hospital in {area.shortName}? We run urgent and pre-booked cab trips to every major hospital:</p>
                  <div className="flex flex-wrap gap-2">
                    {area.hospitals.map(h => (
                      <span key={h} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm border border-red-100">🏥 {h}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* IT Parks */}
              {area.itParks && area.itParks.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-4">Cabs for Corporate & IT Parks in {area.shortName}</h3>
                  <p className="text-gray-600 mb-3">Daily office commutes and corporate cars for IT professionals in {area.shortName}. Monthly plans with 15-25% savings.</p>
                  <div className="flex flex-wrap gap-2">
                    {area.itParks.map(p => (
                      <span key={p} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100">🏢 {p}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metro/Station Connectivity */}
              {area.stations.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-4">Cabs to Metro & Railway Stations in {area.shortName}</h3>
                  <p className="text-gray-600 mb-3">Pickup and drop at every metro and railway station close to {area.shortName}:</p>
                  <div className="flex flex-wrap gap-2">
                    {area.stations.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm border border-green-100">🚇 {s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose Us */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Why Pick {BUSINESS.name} in {area.shortName}?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    `Round-the-clock cabs in ${area.shortName} — even at 3 AM`,
                    'Police-verified chauffeurs with 5+ years of experience',
                    'No surge fares — fixed rates through Durga Puja, Diwali',
                    `Airport drop from ${area.fareToAirport} (Sedan)`,
                    'Clean, AC, GPS-tracked, sanitized cars',
                    'Cancel free of charge up to 4 hours before pickup',
                    'Immediate booking confirmation on WhatsApp',
                    `Pickup at any address across ${area.shortName}`,
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 text-xs">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm compact />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">{area.shortName} Cab Hotline</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
              <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I would like a cab in ${area.shortName}, Kolkata.`)}`} className="block w-full p-4 bg-green-500 text-white text-center rounded-xl font-bold hover:bg-green-600 transition-colors">
                💬 Reserve on WhatsApp
              </a>
              <div className="p-4 bg-accent rounded-xl space-y-3">
                <h4 className="font-bold text-secondary text-sm">Fast Rates from {area.shortName}</h4>
                <div className="flex justify-between text-sm"><span className="text-gray-500">To Airport (CCU)</span><span className="font-semibold text-primary">{area.fareToAirport}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Distance to Airport</span><span className="font-semibold text-secondary">{area.airportDistance}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Local (4hr/40km)</span><span className="font-semibold text-secondary">₹1,800</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Outstation Fare</span><span className="font-semibold text-secondary">₹12/km</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Outstation Routes from this Area — Cross-links to route pages */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-2">Top Outstation Cab Routes from <span className="text-primary">{area.shortName}</span>, Kolkata</h2>
          <p className="text-gray-500 text-sm mb-5">Reserve an outstation cab from {area.shortName} to favourite destinations — fixed fares, no surge</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {outstationRoutes.map(r => (
              <Link key={r.slug} href={`/routes/${r.slug}`} className="group p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{r.fromName} → {r.toName}</p>
                <p className="text-xs text-gray-400 mt-1">{r.distance} km • From ₹{r.priceSaloon}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Kolkata Areas */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">Cab Service in More <span className="text-primary">Kolkata Areas</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherAreas.map(a => (
              <Link key={a.slug} href={`/kolkata/${a.slug}`} className="group p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{a.shortName}</p>
                <p className="text-xs text-gray-400 mt-1">Airport: {a.fareToAirport}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} title={`Questions — Cab Service in ${area.shortName}, Kolkata`} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve Your {area.shortName} Cab Today!</h2>
          <p className="text-white/90 mb-6">Airport from {area.fareToAirport} • Local from ₹1,800 • Outstation ₹12/km • 24/7 Availability</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I would like a cab in ${area.shortName}, Kolkata.`)}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* SEO Keyword Links */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">You May Also Search For</h3>
          <div className="flex flex-wrap gap-2">
            {/* First 8 keyword pills → internal pages (crawlable by Google) */}
            {[
              { label: `cab service in ${area.shortName}`, href: '/west-bengal/kolkata' },
              { label: `taxi in ${area.shortName} Kolkata`, href: '/west-bengal/kolkata' },
              { label: `${area.shortName} airport cab`, href: '/west-bengal/kolkata/airport-transfer' },
              { label: `${area.shortName} outstation cab`, href: '/west-bengal/kolkata/outstation' },
              { label: `local taxi ${area.shortName}`, href: '/west-bengal/kolkata/local' },
              { label: `${area.shortName} to Ranchi cab`, href: '/routes/kolkata-to-ranchi' },
              { label: `${area.shortName} to Siliguri cab`, href: '/routes/kolkata-to-siliguri' },
              { label: `${area.shortName} to Jamshedpur cab`, href: '/routes/kolkata-to-jamshedpur' },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {/* Remaining keywords → WhatsApp booking intent */}
            {area.keywords.slice(8, 20).map((kw, i) => (
              <a
                key={i}
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I would like a cab in ${area.shortName}. Query: ${kw}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {kw}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
