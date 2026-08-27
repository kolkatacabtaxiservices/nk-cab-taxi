import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Phone, CheckCircle, Users, Briefcase, Fuel, Gauge } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import nextDynamic from 'next/dynamic';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';

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
import { getCity, getState, getVehicle, getVehicles, VEHICLE_SLUGS, BUSINESS } from '@/lib/data';
import { getRoute, isHubRoute } from '@/lib/routeData';
import { getStaticVehicleRouteSlugs, getAllRouteSlugs } from '@/lib/routeDataStatic';
import { generateVehicleRouteMetadata, generateVehicleRouteSchema, generateFaqSchema, generateBreadcrumbSchema } from '@/lib/seo';

// dynamicParams=false: With output: 'export', all pages must be pre-rendered at build time.
// Only pre-built route × vehicle combos are served; unknown combinations return 404.
// This covers all major hub route × vehicle combos pre-built at build time.
export const dynamicParams = false;
// force-static: pre-build pages and serve as static assets — zero CPU at request time
export const dynamic = 'force-static';
export const revalidate = false; // fully static, no ISR — zero CPU at request time

// Pre-build vehicle detail pages for hub routes only.
// Main route pages (/routes/[slug]) = ALL ~14,000 routes via getAllRouteSlugs().
// Vehicle pages (/routes/[slug]/sedan etc) = top 2500 hub routes only.
// This keeps vehicle pages focused on high-booking-intent hubs while every
// route still has a main page (no more 404s).
export async function generateStaticParams() {
  const routeSlugs = getStaticVehicleRouteSlugs(2500);
  const params: { route: string; vehicle: string }[] = [];
  for (const rs of routeSlugs) {
    for (const vs of VEHICLE_SLUGS) {
      params.push({ route: rs, vehicle: vs });
    }
  }
  return params;
}


export async function generateMetadata({ params }: { params: Promise<{ route: string; vehicle: string }> }): Promise<Metadata> {
  const { route: routeSlug, vehicle: vehicleSlug } = await params;
  const route = await getRoute(routeSlug);
  const vehicle = getVehicle(vehicleSlug);
  if (!route || !vehicle) return {};
  const fare = vehicleSlug === 'sedan' ? route.priceSaloon : vehicleSlug === 'suv' ? route.priceSuv : vehicleSlug === 'tempo' ? route.priceTempo : Math.round(route.distance * vehicle.pricePerKm);
  const isHub = isHubRoute(routeSlug);
  const baseMetadata = generateVehicleRouteMetadata(route.fromName, route.toName, route.distance, vehicleSlug, fare, route.slug);
  return {
    ...baseMetadata,
    // Non-hub route vehicle pages: noindex to preserve crawl budget.
    // Hub city routes (Kolkata, Ranchi, Bhubaneswar, Jamshedpur, Patna) stay indexed.
    ...(!isHub ? { robots: { index: false, follow: false } } : {}),
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  };
}

function getVehicleFare(route: { priceSaloon: number; priceSuv: number; priceTempo: number; distance: number }, vehicleSlug: string, pricePerKm: number) {
  if (vehicleSlug === 'sedan') return route.priceSaloon;
  if (vehicleSlug === 'suv') return route.priceSuv;
  if (vehicleSlug === 'tempo') return route.priceTempo;
  return Math.round(route.distance * pricePerKm);
}

export default async function VehicleRoutePage({ params }: { params: Promise<{ route: string; vehicle: string }> }) {
  const { route: routeSlug, vehicle: vehicleSlug } = await params;
  const route = await getRoute(routeSlug);
  const vehicle = getVehicle(vehicleSlug);
  if (!route || !vehicle) notFound();

  const fromCity = getCity(route.fromState, route.from);
  const toCity = getCity(route.toState, route.to);
  const fromState = getState(route.fromState);
  const allVehicles = getVehicles();
  const fare = getVehicleFare(route, vehicleSlug, vehicle.pricePerKm);

  const faqs = [
    { question: `What is the ${vehicle.name} fare from ${route.fromName} to ${route.toName}?`, answer: `A one-way ${vehicle.name} (${vehicle.models.slice(0, 2).join(', ')}) trip from ${route.fromName} to ${route.toName} costs ₹${fare}. The drive covers ${route.distance} km, and the fare covers AC, fuel and the driver. Toll and parking are billed separately. Ring ${BUSINESS.phone} to reserve.` },
    { question: `Which ${vehicle.name} models are available for ${route.fromName} to ${route.toName}?`, answer: `On the ${route.fromName} to ${route.toName} route we run ${vehicle.models.join(', ')}. Every car is air-conditioned, regularly serviced, GPS-tracked, and cleaned ahead of each journey.` },
    { question: `How many passengers can travel in a ${vehicle.name} from ${route.fromName} to ${route.toName}?`, answer: `A ${vehicle.name} seats ${vehicle.capacity} people and carries up to ${vehicle.luggage} bags. Over the ${route.distance} km run from ${route.fromName} to ${route.toName}, it suits ${vehicle.capacity <= 4 ? 'couples, solo travellers and small families' : vehicle.capacity <= 7 ? 'families and mid-size groups' : 'big parties, pilgrimages and office outings'}.` },
    { question: `Is round trip available for ${vehicle.name} from ${route.fromName} to ${route.toName}?`, answer: `Yes — ${vehicle.name} is available for both one-way and round trip on the ${route.fromName} to ${route.toName} run. A round trip works out to roughly ₹${Math.round(fare * 1.8)}, with the driver stay included. Contact ${BUSINESS.phone} for the precise figure.` },
    { question: `Can I book a ${vehicle.name} for ${route.fromName} to ${route.toName} at night?`, answer: `Certainly — ${vehicle.name} runs 24/7 between ${route.fromName} and ${route.toName}. Dawn pickups at 3 AM, late-night rides, and festive bookings all come at the single fixed rate of ₹${fare}. Surge pricing never applies. Call ${BUSINESS.phone}.` },
    { question: `How to book ${vehicle.name} from ${route.fromName} to ${route.toName}?`, answer: `Ring ${BUSINESS.phone}, message us on WhatsApp, or use the booking form on this page and pick "${vehicle.name}" as your car. You will receive instant confirmation with driver details in about 2 minutes.` },
    { question: `Is ${vehicle.name} comfortable for ${route.distance} km journey?`, answer: `Very much so. The ${vehicle.name} fleet comes with ${vehicle.features.join(', ')}. On the ${route.duration}-hour run from ${route.fromName} to ${route.toName}, expect a relaxed ride with drivers familiar with the road.` },
    { question: `What is included in the ${vehicle.name} fare of ₹${fare}?`, answer: `The ₹${fare} ${vehicle.name} fare on the ${route.fromName} to ${route.toName} route covers the AC car, fuel, the driver, and GST. Extras are tolls (at actual), parking, and a ₹300 night charge between 10 PM and 6 AM.` },
  ];

  const otherVehicles = allVehicles.filter(v => v.id !== vehicleSlug && v.id !== 'wedding');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateVehicleRouteSchema(route.fromName, route.toName, vehicleSlug, fare, route.distance, route.duration, route.slug)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Routes', url: `${BUSINESS.domain}/routes` },
        { name: `${route.fromName} to ${route.toName}`, url: `${BUSINESS.domain}/routes/${route.slug}` },
        { name: vehicle.name, url: `${BUSINESS.domain}/routes/${route.slug}/${vehicleSlug}` },
      ])) }} />

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

      {/* Hero */}
      <section className="relative text-white py-12 lg:py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: fromState?.name || '', href: `/${route.fromState}` },
            { name: `${route.fromName} to ${route.toName}`, href: `/routes/${route.slug}` },
            { name: vehicle.name, href: `/routes/${route.slug}/${vehicleSlug}` },
          ]} />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mt-4 mb-4">
            {route.fromName} to {route.toName} <span className="text-gradient">{vehicle.name} Taxi ₹{fare}</span>
          </h1>
          <p className="text-gray-300 max-w-3xl mb-4">
            Reserve a {vehicle.name} ({vehicle.models.slice(0, 2).join(', ')}) for the {route.fromName} to {route.toName} run — {route.distance} km, {route.duration} hours, {vehicle.capacity} seats, AC and GPS fitted. Fixed fares around the clock.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><MapPin size={14} /> {route.distance} km</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Clock size={14} /> {route.duration} hrs</span>
            <span className="flex items-center gap-1.5 bg-primary/30 px-3 py-1.5 rounded-full font-semibold">₹{fare}</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Users size={14} /> {vehicle.capacity} Pax</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all">
              <Phone size={18} /> Reserve {vehicle.name}: {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I want to book a ${vehicle.name} from ${route.fromName} to ${route.toName}.`)}`} className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Vehicle Showcase */}
      <section className="py-12 bg-gradient-to-br from-secondary via-slate-800 to-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <Image src={vehicle.image} alt={`${vehicle.name} — ${vehicle.models.join(', ')} on the ${route.fromName} to ${route.toName} route`} fill className="object-contain p-6 drop-shadow-2xl" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-extrabold mb-4 text-primary">{vehicle.name}</h2>
              <p className="text-gray-300 mb-6">{vehicle.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2.5 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Users size={16} className="text-primary" />
                  <div><p className="text-white text-sm font-semibold">{vehicle.capacity} Seats</p><p className="text-gray-500 text-xs">Maximum occupancy</p></div>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Briefcase size={16} className="text-primary" />
                  <div><p className="text-white text-sm font-semibold">{vehicle.luggage} Bags</p><p className="text-gray-500 text-xs">Baggage allowance</p></div>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Fuel size={16} className="text-primary" />
                  <div><p className="text-white text-sm font-semibold">AC Car</p><p className="text-gray-500 text-xs">Climate control</p></div>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Gauge size={16} className="text-primary" />
                  <div><p className="text-white text-sm font-semibold">GPS Enabled</p><p className="text-gray-500 text-xs">Live tracking</p></div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Models on Offer</h4>
                <div className="flex flex-wrap gap-2">
                  {vehicle.models.map(m => (<span key={m} className="px-3 py-1.5 bg-white/10 text-white/90 text-xs font-medium rounded-lg border border-white/10">{m}</span>))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map(f => (<span key={f} className="flex items-center gap-1 text-xs text-gray-400"><CheckCircle size={12} className="text-green-500" /> {f}</span>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route + Vehicle Pricing */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">{vehicle.name} Pricing on {route.fromName} to {route.toName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-accent rounded-2xl border-2 border-primary/20 text-center">
              <p className="text-sm text-gray-500 mb-1">One-Way Rate</p>
              <p className="text-4xl font-extrabold text-primary">₹{fare}</p>
              <p className="text-xs text-gray-500 mt-1">{route.distance} km • {route.duration} hrs</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">Round Trip (Estimated)</p>
              <p className="text-4xl font-extrabold text-secondary">₹{Math.round(fare * 1.8)}</p>
              <p className="text-xs text-gray-500 mt-1">Return journey covered</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">Per-Kilometre Rate</p>
              <p className="text-4xl font-extrabold text-secondary">₹{vehicle.pricePerKm}</p>
              <p className="text-xs text-gray-500 mt-1">Everything included</p>
            </div>
          </div>

          {/* What's Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <h3 className="font-bold text-secondary mb-3">✅ What the ₹{fare} Fare Covers</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {['AC car with music system', 'Full fuel for the trip', 'Verified, experienced driver', 'GPS tracking with live location sharing', 'Free cancellation up to 4 hours prior', 'No surge pricing — stable fare around the clock'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500 shrink-0" /> {item}</div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <h3 className="font-bold text-secondary mb-3">ℹ️ Additional Costs</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {['Toll charges (billed at actual)', 'Parking fees (billed at actual)', `Night surcharge: ₹${vehicle.driverAllowance} (10 PM–6 AM)`, 'State permit fee (where applicable)', `Driver allowance: ₹${vehicle.driverAllowance}/day (multi-day trips)`, 'Extra distance beyond the route: same per-km rate'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2"><span className="text-amber-500 shrink-0">•</span> {item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Other Vehicles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-2">Other Vehicle Choices for {route.fromName} to {route.toName}</h2>
          <p className="text-gray-500 text-sm mb-6">Pick the right car for your {route.distance} km trip</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherVehicles.map(v => {
              const vFare = getVehicleFare(route, v.id, v.pricePerKm);
              return (
                <Link key={v.id} href={`/routes/${route.slug}/${v.id}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="relative h-40 bg-gradient-to-br from-accent to-orange-50">
                    <Image src={v.image} alt={`${v.name} option on the ${route.fromName} to ${route.toName} route`} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors">{v.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{v.models.slice(0, 2).join(', ')}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>👥 {v.capacity} seats</span>
                        <span>🧳 {v.luggage} bags</span>
                      </div>
                      <span className="text-xl font-extrabold text-primary">₹{vFare}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form — Full Width */}
      <section className="py-12 bg-white" id="booking-form">
        <div className="max-w-2xl mx-auto px-4">
          <BookingForm defaultFrom={route.fromName} defaultTo={route.toName} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} title={`${vehicle.name} Queries — ${route.fromName} to ${route.toName}`} />
        </div>
      </section>

      {/* Fare Calculator */}
      <FareCalculator defaultFrom={route.fromName} defaultTo={route.toName} />

      {/* Google Maps */}
      <GoogleMapEmbed
        fromCity={route.fromName} toCity={route.toName}
        fromLat={fromCity?.lat} fromLng={fromCity?.lng}
        toLat={toCity?.lat} toLng={toCity?.lng}
        title={`${vehicle.name} Driving Map — ${route.fromName} to ${route.toName}`}
        subtitle={`${route.distance} km road route. Reserve a ${vehicle.name} at ₹${fare}.`}
      />

      {/* Back to Route + CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve a {vehicle.name} — {route.fromName} to {route.toName} at ₹{fare}</h2>
          <p className="text-white/90 mb-6">{vehicle.models.slice(0, 2).join(', ')} • {route.distance} km • {route.duration} hours • {vehicle.capacity} passengers</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I want to book a ${vehicle.name} from ${route.fromName} to ${route.toName}.`)}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
          <Link href={`/routes/${route.slug}`} className="inline-flex items-center gap-2 mt-4 text-white/80 text-sm hover:text-white transition-colors">
            ← See every vehicle option for {route.fromName} to {route.toName}
          </Link>
        </div>
      </section>
    </>
  );
}
