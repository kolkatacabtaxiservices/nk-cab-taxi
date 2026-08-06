import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Phone, Navigation, ArrowLeftRight, Info, Route as RouteIcon } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';

import nextDynamic from 'next/dynamic';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import FleetSection from '@/components/FleetSection';

const GoogleMapEmbed = nextDynamic(() => import('@/components/GoogleMapEmbed'), {
  loading: () => (
    <div className="py-16 text-center">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-full text-gray-400 text-sm border border-gray-100">
        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        Preparing map&hellip;
      </div>
    </div>
  ),
});
const FareCalculator = nextDynamic(() => import('@/components/FareCalculator'), {
  loading: () => (
    <div className="py-20 text-center">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-full text-gray-400 text-sm border border-gray-100">
        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        Estimating fares&hellip;
      </div>
    </div>
  ),
});
import { getCity, getState, BUSINESS } from '@/lib/data';
import { getRoute, getRoutesFrom, getPopularLocalRoutes, isHubRoute } from '@/lib/routeData';
import { getAllRouteSlugs } from '@/lib/routeDataStatic';
import { generateRouteMetadata, generateFaqSchema, generateBreadcrumbSchema, generateEnhancedRouteSchema, generateRouteTripActionSchema, generateAggregateRatingSchema } from '@/lib/seo';
import { generateRoutePageContent } from '@/lib/routeContent';
import { formatBoldText, parseParagraphsWithBold } from '@/lib/textHelper';

// Pre-build ALL routes (~13,800) as static HTML at build time.
// This ensures 0ms Worker CPU usage per request and eliminates 503 errors on the CF Free Tier.
export const dynamicParams = false;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getAllRouteSlugs().map(slug => ({ route: slug }));
}


export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const { route: routeSlug } = await params;
  const route = await getRoute(routeSlug);
  if (!route) return {};
  const fromCity = getCity(route.fromState, route.from);
  const toCity = getCity(route.toState, route.to);
  const baseMetadata = generateRouteMetadata(
    route.fromName,
    route.toName,
    route.distance,
    route.priceSaloon,
    route.slug,
    fromCity?.alternateNames,
    toCity?.alternateNames,
    route.priceSuv  // Pass actual priceSuv — prevents meta/body price inconsistency
  );
  return {
    ...baseMetadata,
    keywords: [
      `${route.fromName} to ${route.toName} cab`,
      `${route.fromName} to ${route.toName} taxi`,
      `${route.fromName} to ${route.toName} cab fare`,
      `${route.fromName} to ${route.toName} cab price`,
      `${route.fromName} to ${route.toName} cab booking`,
      `${route.fromName} to ${route.toName} cab service`,
      `${route.fromName} to ${route.toName} distance`,
      `${route.fromName} to ${route.toName} taxi fare`,
      `${route.fromName} to ${route.toName} one way cab`,
      `${route.fromName} to ${route.toName} round trip cab`,
      `${route.fromName} to ${route.toName} cab rate`,
      `${route.fromName} to ${route.toName} innova`,
      `${route.fromName} to ${route.toName} suv cab`,
      `${route.fromName} to ${route.toName} sedan`,
      `${route.fromName} to ${route.toName} tempo traveller`,
      `cab from ${route.fromName} to ${route.toName}`,
      `taxi from ${route.fromName} to ${route.toName}`,
      `book cab ${route.fromName} to ${route.toName}`,
      `${route.toName} to ${route.fromName} cab`,
      `${route.toName} to ${route.fromName} taxi`,
      // Alternate name variants
      ...(fromCity?.alternateNames || []).map((n: string) => `${n} to ${route.toName} cab`),
      ...(toCity?.alternateNames || []).map((n: string) => `${route.fromName} to ${n} cab`),
    ],
  };
}

export default async function RoutePage({ params }: { params: Promise<{ route: string }> }) {
  const { route: routeSlug } = await params;
  const route = await getRoute(routeSlug);
  if (!route) notFound();

  const toCity = getCity(route.toState, route.to);
  const fromCity = getCity(route.fromState, route.from);
  const fromState = getState(route.fromState);
  const toState = getState(route.toState);
  const relatedRoutes = (await getRoutesFrom(route.from)).filter(r => r.slug !== route.slug).slice(0, 8);
  const localRoutesFrom = await getPopularLocalRoutes(route.from, 6);
  const localRoutesTo = await getPopularLocalRoutes(route.to, 6);

  // Generate rich, unique content for this route
  const content = generateRoutePageContent({
    route,
    fromCity: fromCity || undefined,
    toCity: toCity || undefined,
    fromStateName: fromState?.name,
    toStateName: toState?.name,
  });

  // Check if reverse route exists — prevents 404 links (some routes are one-directional)
  const reverseRoute = await getRoute(content.reverseRouteSlug);
  const hasReverseRoute = !!reverseRoute;


  return (
    <>
      {/* Geo Meta Tags — target source city for local ranking */}
      {fromCity && (
        <>
          <meta name="geo.region" content={
            route.fromState === 'west-bengal' ? 'IN-WB' :
            route.fromState === 'jharkhand' ? 'IN-JH' :
            route.fromState === 'odisha' ? 'IN-OR' :
            route.fromState === 'bihar' ? 'IN-BR' :
            route.fromState === 'uttar-pradesh' ? 'IN-UP' : 'IN-WB'
          } />
          <meta name="geo.placename" content={route.fromName} />
          <meta name="geo.position" content={`${fromCity.lat};${fromCity.lng}`} />
          <meta name="ICBM" content={`${fromCity.lat}, ${fromCity.lng}`} />
        </>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateEnhancedRouteSchema(route.fromName, route.toName, route.priceSaloon, route.priceSuv, route.priceTempo, route.distance, route.duration, route.slug)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(content.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Routes', url: `${BUSINESS.domain}/routes` },
        ...(route.fromState !== route.toState && toState
          ? [{ name: toState.name, url: `${BUSINESS.domain}/${route.toState}` }]
          : []),
        { name: `${route.fromName} to ${route.toName}`, url: `${BUSINESS.domain}/routes/${route.slug}` },
      ])) }} />
      {/* Service schema with pricing — improves route-specific rich results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateRouteTripActionSchema(route.fromName, route.toName, route.distance, route.priceSaloon)) }} />

      {/* Hero */}
      <section className="relative text-white py-12 lg:py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: fromState?.name || '', href: `/${route.fromState}` },
            ...(route.fromState !== route.toState && toState
              ? [{ name: toState.name, href: `/${route.toState}` }]
              : []),
            { name: `${route.fromName} to ${route.toName}`, href: `/routes/${route.slug}` },
          ]} />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mt-4 mb-4">
            {route.fromName} to {route.toName} <span className="text-gradient">Cab Fare ₹{route.priceSaloon}</span> — Reserve Round the Clock
          </h1>
          {((fromCity?.alternateNames && fromCity.alternateNames.length > 0) || (toCity?.alternateNames && toCity.alternateNames.length > 0)) && (
            <p className="text-xs text-gray-300 font-medium mb-3 italic">
              {fromCity?.alternateNames && fromCity.alternateNames.length > 0 && `Aliases: ${fromCity.alternateNames.join(', ')} (pickup point)`}
              {fromCity?.alternateNames && fromCity.alternateNames.length > 0 && toCity?.alternateNames && toCity.alternateNames.length > 0 && ` | `}
              {toCity?.alternateNames && toCity.alternateNames.length > 0 && `Aliases: ${toCity.alternateNames.join(', ')} (drop-off point)`}
            </p>
          )}

          {/* Key Highlights Bar */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><MapPin size={14} /> {route.distance} km</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Clock size={14} /> {route.duration} hours</span>
            <span className="flex items-center gap-1.5 bg-primary/30 px-3 py-1.5 rounded-full font-semibold">Starts at ₹{route.priceSaloon}</span>
            {route.via.length > 0 && (
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Navigation size={14} /> via {route.via[0]}</span>
            )}
          </div>

          {/* Reverse Route Link */}
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg">
              <Phone size={18} /> Call to Book: {BUSINESS.phone}
            </a>
            {hasReverseRoute && (
            <Link href={`/routes/${content.reverseRouteSlug}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white/90 text-sm rounded-full hover:bg-white/20 transition-colors border border-white/20">
              <ArrowLeftRight size={14} /> {content.reverseRouteLabel} Cab →
            </Link>
            )}
          </div>
        </div>
      </section>

      {/* Route Overview + Sidebar */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2" itemScope itemType="https://schema.org/Article">

              {/* ── QUICK ANSWER BOX — targets AI Overviews / Featured Snippets ── */}
              <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center" itemProp="description">
                <div className="flex-1 w-full">
                  <h3 className="text-base font-bold text-secondary mb-3 flex items-center gap-2">
                    ⚡ Fast Facts — {route.fromName} to {route.toName} Cab
                  </h3>
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                      <dt className="text-xs text-gray-400 mb-1">Route Length</dt>
                      <dd className="font-bold text-secondary">{route.distance} km</dd>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                      <dt className="text-xs text-gray-400 mb-1">Journey Time</dt>
                      <dd className="font-bold text-secondary">{route.duration} hrs</dd>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                      <dt className="text-xs text-gray-400 mb-1">Sedan Cost</dt>
                      <dd className="font-bold text-primary">₹{route.priceSaloon}</dd>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                      <dt className="text-xs text-gray-400 mb-1">SUV Cost</dt>
                      <dd className="font-bold text-primary">₹{route.priceSuv}</dd>
                    </div>
                  </dl>
                  {route.via.length > 0 && (
                    <p className="text-xs text-gray-500 mt-3">
                      📍 Pathway: {route.fromName} → {route.via.join(' → ')} → {route.toName}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    📞 Reserve right away: <a href={`tel:${BUSINESS.phone}`} className="text-primary font-semibold hover:underline">{BUSINESS.phone}</a> | One-way and round-trip options open 24/7
                  </p>
                </div>
                <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm">
                  <Image
                    src="/navbanner.webp"
                    alt={`${route.fromName} to ${route.toName} taxi hire by NK Cab & Taxi`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 192px"
                    priority
                  />
                </div>
              </div>

              {/* Rich About Content */}
              <h2 className="text-2xl font-bold text-secondary mb-4">{route.fromName} to {route.toName} — Taxi Fare Guide, Distance &amp; Booking</h2>
              {content.aboutContent.map((para, i) => (
                <p key={i} className="text-gray-600 mb-4 leading-relaxed">{formatBoldText(para)}</p>
              ))}

              {/* Pricing Table */}
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Pricing for the {route.fromName} to {route.toName} Trip</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <thead>
                    <tr className="bg-secondary text-white">
                      <th className="px-4 py-3 text-left text-sm">Car</th>
                      <th className="px-4 py-3 text-left text-sm">Model Names</th>
                      <th className="px-4 py-3 text-center text-sm">Seats</th>
                      <th className="px-4 py-3 text-right text-sm">One-Way Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-sm">🚗 Sedan</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">Swift Dzire, Honda Amaze</td>
                      <td className="px-4 py-3 text-center text-sm">4</td>
                      <td className="px-4 py-3 text-right font-bold text-primary text-sm">₹{route.priceSaloon}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-sm">🚙 SUV</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">Ertiga, Innova Crysta</td>
                      <td className="px-4 py-3 text-center text-sm">6</td>
                      <td className="px-4 py-3 text-right font-bold text-primary text-sm">₹{route.priceSuv}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-sm">🚐 Tempo</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">Tempo Traveller 12-Seater</td>
                      <td className="px-4 py-3 text-center text-sm">12</td>
                      <td className="px-4 py-3 text-right font-bold text-primary text-sm">₹{route.priceTempo}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">* Quoted rates cover fuel and driver fees; tolls and parking are billed separately.</p>

              {/* Cab vs Train vs Bus Comparison Table */}
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Cab, Train or Bus? Comparison for {route.fromName} to {route.toName}</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-secondary text-white text-sm">
                      <th className="px-4 py-3 text-left">Aspect</th>
                      <th className="px-4 py-3 text-center">NK Cab & Taxi</th>
                      <th className="px-4 py-3 text-center">Train</th>
                      <th className="px-4 py-3 text-center">Bus / Public Transit</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-semibold text-secondary">Privacy and Comfort</td>
                      <td className="px-4 py-3 text-center text-green-600 font-medium bg-green-50/30 font-semibold">✅ Fully private, AC, sanitised, halt anywhere</td>
                      <td className="px-4 py-3 text-center">❌ Shared coaches, packed station crowds</td>
                      <td className="px-4 py-3 text-center">❌ Shared seating, predetermined stops</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <td className="px-4 py-3 font-semibold text-secondary">Door-to-Door Pickup</td>
                      <td className="px-4 py-3 text-center text-green-600 font-medium bg-green-50/30 font-semibold">✅ Yes — doorstep pickups and drops, day or night</td>
                      <td className="px-4 py-3 text-center">❌ Terminus to terminus only; add auto fare</td>
                      <td className="px-4 py-3 text-center">❌ Depot to depot only; few autos at stops</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-semibold text-secondary">Flexible Scheduling</td>
                      <td className="px-4 py-3 text-center text-green-600 font-medium bg-green-50/30 font-semibold">✅ Depart on your schedule, detour and pause freely</td>
                      <td className="px-4 py-3 text-center">❌ Rigid timetables, frequent delays</td>
                      <td className="px-4 py-3 text-center">❌ Fixed bus runs, late-running risk</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <td className="px-4 py-3 font-semibold text-secondary">Baggage Handling</td>
                      <td className="px-4 py-3 text-center text-green-600 font-medium bg-green-50/30 font-semibold">✅ Spacious boot for all your bags, no worries</td>
                      <td className="px-4 py-3 text-center">❌ Heavy luggage is hard to manage; theft risk</td>
                      <td className="px-4 py-3 text-center">❌ Restricted baggage allowance, safety concerns</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Road Conditions */}
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Driving Conditions on the {route.fromName} to {route.toName} Route</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{content.roadDescription}</p>

              {/* Travel Tips */}
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Handy Tips for Your {route.fromName} to {route.toName} Trip</h3>
              <div className="space-y-3">
                {content.travelTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>

              {/* Seasonal & Festival Travel Guide */}
              {content.seasonalContent && (
                <>
                  <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Festival and Seasonal Trip Notes</h3>
                  <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl text-sm text-gray-600 leading-relaxed">
                    {parseParagraphsWithBold(content.seasonalContent)}
                  </div>
                </>
              )}

              {/* Why Choose Us */}
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Why Take {route.fromName} to {route.toName} with {BUSINESS.name}?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Around-the-clock service with instant booking confirmation',
                  'Route-savvy drivers who are verified and experienced',
                  'Spotless AC cars, cleaned before every journey',
                  'Live GPS tracking — keep your family posted on your location',
                  'Pickup wherever you like: home, hotel, airport, or station',
                  `Assured lowest rates — Sedan from ₹${route.priceSaloon}`,
                  'Cancel at no cost up to 4 hours before pickup',
                  'No surge pricing — stable fares all 365 days',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 text-xs">✓</span>
                    {item}
                  </div>
                ))}
              </div>

              {/* How to Book — Step by Step */}
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Booking Your {route.fromName} to {route.toName} Cab</h3>
              <div className="space-y-4">
                {content.bookingSteps.map((step) => (
                  <div key={step.step} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary text-sm">{step.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pickup/Drop Points */}
              {(fromCity?.landmarks || toCity?.landmarks) && (
                <>
                  <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Pickup and Drop Locations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fromCity?.landmarks && (
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2"><MapPin size={16} className="text-primary" /> Boarding in {route.fromName}</h4>
                        <div className="flex flex-wrap gap-2">
                          {fromCity.landmarks.map((l) => (
                            <span key={l} className="px-3 py-1 bg-white rounded-full text-xs text-gray-700 border border-gray-200">{l}</span>
                          ))}
                          {fromCity.airport && <span className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">✈️ {fromCity.airport}</span>}
                          {fromCity.railway && <span className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">🚂 {fromCity.railway}</span>}
                        </div>
                      </div>
                    )}
                    {toCity?.landmarks && (
                      <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                        <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2"><MapPin size={16} className="text-green-600" /> Alighting in {route.toName}</h4>
                        <div className="flex flex-wrap gap-2">
                          {toCity.landmarks.map((l) => (
                            <span key={l} className="px-3 py-1 bg-white rounded-full text-xs text-gray-700 border border-gray-200">{l}</span>
                          ))}
                          {toCity.airport && <span className="px-3 py-1 bg-green-100 rounded-full text-xs text-green-700 font-medium">✈️ {toCity.airport}</span>}
                          {toCity.railway && <span className="px-3 py-1 bg-green-100 rounded-full text-xs text-green-700 font-medium">🚂 {toCity.railway}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* About Destination */}
              {toCity && toCity.tourist && (
                <>
                  <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Visiting {route.toName} — Quick Travel Guide</h3>
                  <p className="text-gray-600 mb-3">{toCity.description}</p>
                  {toCity.landmarks && (
                    <div>
                      <h4 className="font-semibold text-secondary text-sm mb-2">Top Attractions in {route.toName}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {toCity.landmarks.map((l) => (
                          <span key={l} className="px-3 py-1.5 bg-accent rounded-full text-sm text-gray-700">{l}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* About Source City */}
              {fromCity && fromCity.tourist && (
                <>
                  <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Getting to Know {route.fromName}</h3>
                  <p className="text-gray-600 mb-3">{fromCity.description}</p>
                </>
              )}
            </article>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              {/* Key Highlights */}
              <div className="p-4 bg-accent rounded-xl space-y-3">
                <h4 className="font-bold text-secondary text-sm">Trip Snapshot</h4>
                {content.keyHighlights.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-500">{h.label}</span>
                    <span className="font-semibold text-secondary">{h.value}</span>
                  </div>
                ))}
              </div>

              {/* Quick call */}
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">Need assistance? Ring us anytime</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">
                  📞 {BUSINESS.phone}
                </a>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I want to book a cab from ${route.fromName} to ${route.toName}.`)}`}
                className="block w-full p-4 bg-green-500 text-white text-center rounded-xl font-bold hover:bg-green-600 transition-colors"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section — Vehicle Selection for This Route */}
      <FleetSection
        fromName={route.fromName}
        toName={route.toName}
        routeSlug={route.slug}
        priceSaloon={route.priceSaloon}
        priceSuv={route.priceSuv}
        priceTempo={route.priceTempo}
        distance={route.distance}
      />

      {/* Booking Form — Full Width like Homepage */}
      <section className="py-12 bg-gray-50" id="booking-form">
        <div className="max-w-2xl mx-auto px-4">
          <BookingForm defaultFrom={route.fromName} defaultTo={route.toName} />
        </div>
      </section>

      {/* Related Routes from Source */}
      {relatedRoutes.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-2">More Outstation Routes from <span className="text-primary">{route.fromName}</span></h2>
            <p className="text-gray-500 text-sm mb-6">Find budget-friendly trips from {route.fromName} beyond the city</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedRoutes.map((r) => (
                <Link key={r.slug} href={`/routes/${r.slug}`} className="group bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{r.fromName} → {r.toName}</p>
                  <p className="text-xs text-gray-500 mt-1">{r.distance} km • {r.duration} hrs</p>
                  <p className="text-primary font-bold mt-2">From ₹{r.priceSaloon}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Local Routes from Source City */}
      {localRoutesFrom.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-2">Top Short-Haul Routes from <span className="text-primary">{route.fromName}</span></h2>
            <p className="text-gray-500 text-sm mb-6">See close-by getaways from {route.fromName} at easy rates</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localRoutesFrom.filter(r => r.slug !== route.slug).slice(0, 6).map((r) => (
                <Link key={r.slug} href={`/routes/${r.slug}`} className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0">
                      <RouteIcon size={14} className="text-primary" />
                    </div>
                    <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{r.fromName} → {r.toName}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{r.distance} km • {r.duration} hrs</span>
                    <span className="text-primary font-bold">₹{r.priceSaloon}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Local Routes from Destination City */}
      {localRoutesTo.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-2">Extend Your Trip from <span className="text-primary">{route.toName}</span></h2>
            <p className="text-gray-500 text-sm mb-6">Carry on travelling — check out nearby towns from {route.toName}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localRoutesTo.filter(r => r.slug !== route.slug).slice(0, 6).map((r) => (
                <Link key={r.slug} href={`/routes/${r.slug}`} className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0">
                      <RouteIcon size={14} className="text-primary" />
                    </div>
                    <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{r.fromName} → {r.toName}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{r.distance} km • {r.duration} hrs</span>
                    <span className="text-primary font-bold">₹{r.priceSaloon}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ  — Now with 12+ FAQs */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={content.faqs} title={`Common Questions — ${route.fromName} to ${route.toName} Cab`} />
        </div>
      </section>

      {/* Instant Fare Calculator */}
      <FareCalculator defaultFrom={route.fromName} defaultTo={route.toName} />

      {/* Google Maps — Route Directions */}
      <GoogleMapEmbed
        fromCity={route.fromName}
        toCity={route.toName}
        fromLat={fromCity?.lat}
        fromLng={fromCity?.lng}
        toLat={toCity?.lat}
        toLng={toCity?.lng}
        title={`${route.fromName} to ${route.toName} — Driving Map and Directions`}
        subtitle={`See the ${route.distance} km road path from ${route.fromName} to ${route.toName}. Approximate drive time: ${route.duration} hours.`}
      />

      {/* Popular Searches — SEO Keyword Links (internal, crawlable) */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Popular Search Terms</h3>
          <div className="flex flex-wrap gap-2">
            {/* Route-specific internal links (first 15) — crawlable for SEO */}
            <Link href={`/routes/${route.from}-to-${route.to}`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              {route.fromName} to {route.toName} taxi
            </Link>
            <Link href={`/routes/${route.to}-to-${route.from}`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              {route.toName} to {route.fromName} taxi
            </Link>
            <Link href={`/${route.fromState}/${route.from}/outstation`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              outstation taxi from {route.fromName}
            </Link>
            <Link href={`/${route.fromState}/${route.from}/one-way`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              one-way taxi from {route.fromName}
            </Link>
            <Link href={`/${route.toState}/${route.to}/outstation`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              outstation taxi from {route.toName}
            </Link>
            <Link href={`/${route.toState}/${route.to}/one-way`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              one-way taxi from {route.toName}
            </Link>
            <Link href={`/${route.fromState}/${route.from}`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              taxi service in {route.fromName}
            </Link>
            <Link href={`/${route.toState}/${route.to}`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              taxi service in {route.toName}
            </Link>
            <Link href={`/${route.fromState}/${route.from}/airport-transfer`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              {route.fromName} airport taxi
            </Link>
            <Link href={`/${route.toState}/${route.to}/airport-transfer`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              {route.toName} airport taxi
            </Link>
            <Link href={`/${route.fromState}/${route.from}/round-trip`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              round-trip taxi from {route.fromName}
            </Link>
            <Link href={`/${route.toState}/${route.to}/round-trip`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              round-trip taxi from {route.toName}
            </Link>
            {/* Vehicle-specific route links — hub routes get detail pages, others scroll to booking */}
            <Link href={isHubRoute(route.slug) ? `/routes/${route.slug}/sedan` : `/routes/${route.slug}#booking-form`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              {route.fromName} to {route.toName} sedan taxi
            </Link>
            <Link href={isHubRoute(route.slug) ? `/routes/${route.slug}/suv` : `/routes/${route.slug}#booking-form`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              {route.fromName} to {route.toName} SUV taxi
            </Link>
            <Link href={isHubRoute(route.slug) ? `/routes/${route.slug}/tempo` : `/routes/${route.slug}#booking-form`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              {route.fromName} to {route.toName} tempo traveller hire
            </Link>
            <Link href="/services/outstation" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              outstation taxi hire
            </Link>
            <Link href="/services/one-way" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              one-way cab reservation
            </Link>
            <Link href="/services/airport-transfer" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
              airport transfer service
            </Link>
            {/* Remaining keywords — booking intent → WhatsApp */}
            {content.popularKeywords.slice(18, 30).map((kw, i) => (
              <a
                key={i}
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I want to book a cab. Query: ${kw}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                {kw}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Linking Mesh — Reverse Route + City Pages */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold text-secondary mb-4">Related Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Reverse Route */}
            {hasReverseRoute && (
              <Link href={`/routes/${content.reverseRouteSlug}`} className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all">
                <p className="text-xs text-gray-400 mb-1">Return Direction</p>
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">🔄 {content.reverseRouteLabel} Cab</p>
                <p className="text-xs text-gray-400 mt-1">One-way and round-trip options offered</p>
              </Link>
            )}
            {/* Source City Page */}
            {fromState && !['bihar', 'uttar-pradesh', 'delhi-ncr', 'uttarakhand', 'madhya-pradesh'].includes(route.fromState) && (
              <Link href={`/${route.fromState}/${route.from}`} className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all">
                <p className="text-xs text-gray-400 mb-1">Taxi Service In</p>
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">📍 {route.fromName}</p>
                <p className="text-xs text-gray-400 mt-1">City, outstation and airport taxi</p>
              </Link>
            )}
            {/* Destination City Page */}
            {toState && !['bihar', 'uttar-pradesh', 'delhi-ncr', 'uttarakhand', 'madhya-pradesh'].includes(route.toState) && (
              <Link href={`/${route.toState}/${route.to}`} className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all">
                <p className="text-xs text-gray-400 mb-1">Taxi Service In</p>
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">📍 {route.toName}</p>
                <p className="text-xs text-gray-400 mt-1">City, outstation and airport taxi</p>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve Your {route.fromName} to {route.toName} Cab Today!</h2>
          <p className="text-white/90 mb-6">Fares begin at ₹{route.priceSaloon} • {route.distance} km • {route.duration} hours</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I want to book a cab from ${route.fromName} to ${route.toName}.`)}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
