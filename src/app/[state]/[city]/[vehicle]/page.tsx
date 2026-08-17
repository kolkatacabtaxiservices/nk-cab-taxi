import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, CheckCircle, Users, Briefcase, Fuel, Gauge, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { getCity, getState, getVehicle, getVehicles, getStateFares, getStatePriceLabels, BUSINESS } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema, getCityGeoMeta } from '@/lib/seo';

// Hub cities jinke liye vehicle-specific pages build hongi
const HUB_CITY_VEHICLE_PARAMS: { state: string; city: string }[] = [
  { state: 'west-bengal', city: 'kolkata' },
  { state: 'jharkhand',   city: 'ranchi' },
  { state: 'odisha',      city: 'bhubaneswar' },
  { state: 'jharkhand',   city: 'jamshedpur' },
  { state: 'bihar',       city: 'patna' },
];

// Sirf hub cities × 4 vehicles = 20 pages pre-built
const CITY_VEHICLE_SLUGS = ['sedan', 'suv', 'tempo', 'luxury'] as const;

export const dynamicParams = false;
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const params: { state: string; city: string; vehicle: string }[] = [];
  for (const { state, city } of HUB_CITY_VEHICLE_PARAMS) {
    for (const vehicle of CITY_VEHICLE_SLUGS) {
      params.push({ state, city, vehicle });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string; vehicle: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, city: citySlug, vehicle: vehicleSlug } = await params;
  const city = getCity(stateSlug, citySlug);
  const state = getState(stateSlug);
  const vehicle = getVehicle(vehicleSlug);
  if (!city || !state || !vehicle) return {};

  const fares = getStateFares(stateSlug);
  const rate = vehicleSlug === 'sedan' ? fares.sedan.pricePerKm
    : vehicleSlug === 'suv' ? fares.suv.pricePerKm
    : vehicleSlug === 'tempo' ? fares.tempo.pricePerKm
    : fares.luxury?.pricePerKm ?? 28;

  const title = `${vehicle.name} Taxi in ${city.name} ₹${rate}/km | Reserve 24/7 | NK Cab & Taxi`;
  const description = `Hire a ${vehicle.name} (${vehicle.models.slice(0, 2).join(', ')}) in ${city.name} from ₹${rate}/km. Airport runs, outstation trips, city packages. AC, GPS fitted, verified drivers. Fixed fares round the clock. Call ${BUSINESS.phone}`;
  const canonical = `${BUSINESS.domain}/${stateSlug}/${citySlug}/${vehicleSlug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: 'NK Cab & Taxi',
      title,
      description,
      images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `${vehicle.name} taxi in ${city.name}` }],
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BUSINESS.domain}/navbanner.webp`],
    },
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  };
}

export default async function CityVehiclePage({
  params,
}: {
  params: Promise<{ state: string; city: string; vehicle: string }>;
}) {
  const { state: stateSlug, city: citySlug, vehicle: vehicleSlug } = await params;
  const city = getCity(stateSlug, citySlug);
  const state = getState(stateSlug);
  const vehicle = getVehicle(vehicleSlug);
  if (!city || !state || !vehicle) notFound();

  const fares = getStateFares(stateSlug);
  const prices = getStatePriceLabels(stateSlug);
  const allVehicles = getVehicles().filter(v => v.id !== 'wedding');

  // Per-km rate for this vehicle in this state
  const ratePerKm =
    vehicleSlug === 'sedan' ? fares.sedan.pricePerKm
    : vehicleSlug === 'suv' ? fares.suv.pricePerKm
    : vehicleSlug === 'tempo' ? fares.tempo.pricePerKm
    : fares.luxury?.pricePerKm ?? 28;

  // Local package fare (first package)
  const localPkg = fares.localPackages[0];
  const localFare =
    vehicleSlug === 'sedan' ? (localPkg?.sedan ?? prices.localPkgSedan)
    : vehicleSlug === 'suv' ? (localPkg?.suv ?? prices.localPkgSuv)
    : vehicleSlug === 'tempo' ? (localPkg?.tempo ?? prices.localPkgTempo)
    : (localPkg?.innova ?? prices.localPkgInnova);

  // Airport transfer fare
  const airportFare =
    vehicleSlug === 'sedan' ? fares.airportTransfer.sedan
    : vehicleSlug === 'suv' ? fares.airportTransfer.suv
    : vehicleSlug === 'tempo' ? Math.round(fares.airportTransfer.innova * 1.4)
    : fares.airportTransfer.innova;

  const geo = getCityGeoMeta(city.name, stateSlug, city.lat, city.lng);
  const otherVehicles = allVehicles.filter(v => v.id !== vehicleSlug);

  const faqs = [
    {
      question: `${vehicle.name} cab ka kira kya hai ${city.name} mein?`,
      answer: `${city.name} mein ${vehicle.name} (${vehicle.models.slice(0, 2).join(', ')}) ka outstation rate ₹${ratePerKm}/km hai. Local package (4hr/40km) ₹${localFare} se shuru hota hai. Airport transfer ₹${airportFare} se. Call ${BUSINESS.phone}.`,
    },
    {
      question: `What is the ${vehicle.name} fare in ${city.name}?`,
      answer: `${vehicle.name} (${vehicle.models.slice(0, 2).join(', ')}) rates in ${city.name}: outstation ₹${ratePerKm}/km | city package ₹${localFare} (4hr/40km) | airport ₹${airportFare}. Service runs around the clock with no surge. Ring ${BUSINESS.phone}.`,
    },
    {
      question: `How many passengers can travel in ${vehicle.name} in ${city.name}?`,
      answer: `A ${vehicle.name} seats ${vehicle.capacity} passengers and takes ${vehicle.luggage} bags. Available models: ${vehicle.models.join(', ')}. All are AC-fitted, GPS-tracked, and sanitised.`,
    },
    {
      question: `Is ${vehicle.name} available for outstation trips from ${city.name}?`,
      answer: `Yes — ${vehicle.name} runs outstation trips from ${city.name} at ₹${ratePerKm}/km, one-way or round trip. Service is 24/7 with fixed fares. Reserve at ${BUSINESS.phone}.`,
    },
    {
      question: `Can I book ${vehicle.name} for airport pickup in ${city.name}?`,
      answer: `Yes — ${vehicle.name} airport transfers in ${city.name} start at ₹${airportFare}${city.airport ? ` (${city.airport})` : ''}, with live flight tracking, meet and greet, and fixed pricing. Call ${BUSINESS.phone}.`,
    },
    {
      question: `What is the ${vehicle.name} local package fare in ${city.name}?`,
      answer: `A ${vehicle.name} city package in ${city.name} costs ₹${localFare} for 4 hours/40 km, with extra km at ₹${ratePerKm}/km. Great for sightseeing, hospital runs, shopping, and office trips. Call ${BUSINESS.phone}.`,
    },
    {
      question: `How to book ${vehicle.name} in ${city.name}?`,
      answer: `Ring ${BUSINESS.phone} or use WhatsApp to reserve a ${vehicle.name} in ${city.name}, or fill the booking form on this page. Confirmation with driver details arrives within 2 minutes, with no advance payment needed.`,
    },
    {
      question: `Does NK Cab & Taxi offer ${vehicle.name} for round trip from ${city.name}?`,
      answer: `Yes — ${vehicle.name} round trips run from ${city.name}, with driver stay included on multi-day journeys. Rates are fixed, with no surge and no hidden fees. Call ${BUSINESS.phone} for a quote.`,
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BUSINESS.domain },
    { name: state.name, url: `${BUSINESS.domain}/${stateSlug}` },
    { name: city.name, url: `${BUSINESS.domain}/${stateSlug}/${citySlug}` },
    { name: vehicle.name, url: `${BUSINESS.domain}/${stateSlug}/${citySlug}/${vehicleSlug}` },
  ]);

  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${vehicle.name} Taxi in ${city.name}`,
    description: `${vehicle.name} taxi service in ${city.name}. Tariff ₹${ratePerKm}/km. Models: ${vehicle.models.join(', ')}. Seats ${vehicle.capacity}. AC, GPS fitted.`,
    brand: { '@type': 'Brand', name: 'NK Cab & Taxi' },
    image: `${BUSINESS.domain}/navbanner.webp`,
    offers: {
      '@type': 'Offer',
      price: ratePerKm,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: ratePerKm,
        priceCurrency: 'INR',
        unitText: 'KM',
      },
      seller: { '@type': 'Organization', name: 'NK Cab & Taxi', telephone: BUSINESS.phone, url: BUSINESS.domain },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '5000',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <>
      {/* Geo tags */}
      <meta name="geo.region" content={geo['geo.region']} />
      <meta name="geo.placename" content={geo['geo.placename']} />
      {geo['geo.position'] && <meta name="geo.position" content={geo['geo.position']} />}
      {geo['ICBM'] && <meta name="ICBM" content={geo['ICBM']} />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative text-white py-12 lg:py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: state.name, href: `/${stateSlug}` },
            { name: city.name, href: `/${stateSlug}/${citySlug}` },
            { name: vehicle.name, href: `/${stateSlug}/${citySlug}/${vehicleSlug}` },
          ]} />
          <h1 className="text-2xl md:text-4xl font-extrabold mt-4 mb-3">
            {vehicle.name} Taxi in{' '}
            <span className="text-gradient">{city.name}</span>
            {' '}— ₹{ratePerKm}/km | Reserve Round the Clock
          </h1>
          <p className="text-gray-300 max-w-3xl mb-4">
            Hire a {vehicle.name} ({vehicle.models.slice(0, 2).join(', ')}) in {city.name}.{' '}
            {vehicle.capacity} seats, AC, GPS fitted. City pack ₹{localFare} | Outstation ₹{ratePerKm}/km | Airport ₹{airportFare}. Fixed fares, no surge.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
              <Users size={14} /> {vehicle.capacity} Seats
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
              <Briefcase size={14} /> {vehicle.luggage} Bags
            </span>
            <span className="flex items-center gap-1.5 bg-primary/30 px-3 py-1.5 rounded-full font-semibold">
              ₹{ratePerKm}/km
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
              <MapPin size={14} /> {city.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
            >
              <Phone size={18} /> Reserve {vehicle.name}: {BUSINESS.phone}
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I want to book a ${vehicle.name} in ${city.name}.`)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Vehicle Showcase ──────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-br from-secondary via-slate-800 to-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Vehicle image */}
            <div className="relative h-64 sm:h-80 lg:h-96">
              <Image
                src={vehicle.image}
                alt={`${vehicle.name} taxi in ${city.name} — ${vehicle.models.join(', ')}`}
                fill
                className="object-contain p-6 drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Vehicle specs */}
            <div className="text-white">
              <h2 className="text-3xl font-extrabold mb-2 text-primary">{vehicle.name}</h2>
              <p className="text-gray-400 text-sm mb-1">{city.name}, {state.name}</p>
              <p className="text-gray-300 mb-6">{vehicle.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: <Users size={16} className="text-primary" />, label: `${vehicle.capacity} Seats`, sub: 'Maximum occupancy' },
                  { icon: <Briefcase size={16} className="text-primary" />, label: `${vehicle.luggage} Bags`, sub: 'Baggage allowance' },
                  { icon: <Fuel size={16} className="text-primary" />, label: 'AC Car', sub: 'Climate control' },
                  { icon: <Gauge size={16} className="text-primary" />, label: 'GPS Enabled', sub: 'Live tracking' },
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 bg-white/5 rounded-xl border border-white/10">
                    {spec.icon}
                    <div>
                      <p className="text-white text-sm font-semibold">{spec.label}</p>
                      <p className="text-gray-500 text-xs">{spec.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Models on Offer</h4>
                <div className="flex flex-wrap gap-2">
                  {vehicle.models.map(m => (
                    <span key={m} className="px-3 py-1.5 bg-white/10 text-white/90 text-xs font-medium rounded-lg border border-white/10">{m}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {vehicle.features.map(f => (
                  <span key={f} className="flex items-center gap-1 text-xs text-gray-400">
                    <CheckCircle size={12} className="text-green-500" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ─────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            {vehicle.name} Pricing in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-accent rounded-2xl border-2 border-primary/20 text-center">
              <p className="text-sm text-gray-500 mb-1">Outstation Tariff</p>
              <p className="text-4xl font-extrabold text-primary">₹{ratePerKm}<span className="text-lg">/km</span></p>
              <p className="text-xs text-gray-500 mt-1">One-way or round trip</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">City Package</p>
              <p className="text-4xl font-extrabold text-secondary">₹{localFare}</p>
              <p className="text-xs text-gray-500 mt-1">4 Hours / 40 KM</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">Airport Runs</p>
              <p className="text-4xl font-extrabold text-secondary">₹{airportFare}</p>
              <p className="text-xs text-gray-500 mt-1">Pickup or drop-off</p>
            </div>
          </div>

          {/* Included / Extra */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <h3 className="font-bold text-secondary mb-3">✅ Covered in the Fare</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {[
                  'AC car with music system',
                  'Full fuel for the trip',
                  'Verified, experienced driver',
                  'GPS tracking with live location sharing',
                  'Free cancellation up to 4 hours prior',
                  'No surge pricing — stable fare around the clock',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-500 shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <h3 className="font-bold text-secondary mb-3">ℹ️ Additional Costs</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {[
                  'Toll charges (billed at actual)',
                  'Parking fees (billed at actual)',
                  `Night surcharge: ₹${vehicle.driverAllowance} (10 PM–6 AM)`,
                  'State permit fee (where applicable)',
                  `Driver allowance: ₹${vehicle.driverAllowance} per day for multi-day runs`,
                  'Extra kilometres beyond the package: same per-km rate',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-amber-500 shrink-0">•</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Compare Other Vehicles ────────────────────────────── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-2">
            Other Vehicle Choices in {city.name}
          </h2>
          <p className="text-gray-500 text-sm mb-6">Size up the options and pick the right car for your journey</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherVehicles.map(v => {
              const vRate = v.id === 'sedan' ? fares.sedan.pricePerKm
                : v.id === 'suv' ? fares.suv.pricePerKm
                : v.id === 'tempo' ? fares.tempo.pricePerKm
                : fares.luxury?.pricePerKm ?? 28;
              return (
                <Link
                  key={v.id}
                  href={`/${stateSlug}/${citySlug}/${v.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className="relative h-36 bg-gradient-to-br from-accent to-orange-50">
                    <Image
                      src={v.image}
                      alt={`${v.name} option in ${city.name}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">{v.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{v.models.slice(0, 2).join(', ')}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">👥 {v.capacity} Pax</span>
                      <span className="text-lg font-extrabold text-primary">₹{vRate}/km</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Booking Form ──────────────────────────────────────── */}
      <section className="py-12 bg-white" id="booking-form">
        <div className="max-w-2xl mx-auto px-4">
          <BookingForm defaultFrom={city.name} />
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection
            faqs={faqs}
            title={`${vehicle.name} Queries — ${city.name}`}
          />
        </div>
      </section>

      {/* ── Map ───────────────────────────────────────────────── */}
      <GoogleMapEmbed
        fromCity={city.name}
        fromLat={city.lat}
        fromLng={city.lng}
        title={`${city.name} — ${vehicle.name} Taxi Service`}
        subtitle={`Reserve a ${vehicle.name} anywhere across ${city.name}. Tariff: ₹${ratePerKm}/km.`}
      />

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-primary to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Reserve a {vehicle.name} in {city.name} — ₹{ratePerKm}/km
          </h2>
          <p className="text-white/90 mb-6">
            {vehicle.models.slice(0, 2).join(', ')} • {vehicle.capacity} seats • AC • GPS • Fixed fares round the clock
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all"
            >
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! I want to book a ${vehicle.name} in ${city.name}.`)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all"
            >
              💬 WhatsApp
            </a>
          </div>
          <Link
            href={`/${stateSlug}/${citySlug}`}
            className="inline-flex items-center gap-1 mt-5 text-white/80 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> All services offered in {city.name}
          </Link>
        </div>
      </section>
    </>
  );
}
