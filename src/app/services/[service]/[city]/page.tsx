import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS, getAllCities, getState, getStatePriceLabels } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema, generateCitySubServiceSchema, generateServiceCityMetadata } from '@/lib/seo';
import {
  generateLocalServiceContent,
  generateOutstationServiceContent,
  generateOneWayServiceContent,
  generateRoundTripServiceContent,
  generateAirportServiceContent,
  generateWeddingCarServiceContent,
} from '@/lib/serviceContent';

export const dynamic = 'force-static';
export const revalidate = false;

const SERVICE_SLUGS = ['local-taxi', 'outstation', 'one-way', 'round-trip', 'airport-transfer', 'wedding-car-rental', 'corporate-car-rental'] as const;
type ServiceSlug = typeof SERVICE_SLUGS[number];

type ContentResult = { aboutContent: string[]; faqs: { question: string; answer: string }[]; popularSearches: string[]; useCases?: { icon: string; title: string; desc: string }[]; whyChooseUs?: string[] };

const SERVICE_MAP: Record<ServiceSlug, { name: string; icon: string; generator?: (input: { cityName: string; stateName: string; stateSlug: string; citySlug: string; landmarks?: string[]; airport?: string; railway?: string }) => ContentResult }> = {
  'local-taxi': { name: 'Local Taxi', icon: 'MapPin', generator: generateLocalServiceContent },
  'outstation': { name: 'Outstation Cab', icon: 'Route', generator: generateOutstationServiceContent },
  'one-way': { name: 'One-Way Taxi', icon: 'ArrowRight', generator: generateOneWayServiceContent },
  'round-trip': { name: 'Round Trip Cab', icon: 'Repeat', generator: generateRoundTripServiceContent },
  'airport-transfer': { name: 'Airport Transfer', icon: 'Plane', generator: generateAirportServiceContent },
  'wedding-car-rental': { name: 'Wedding Car Rental', icon: 'Heart', generator: generateWeddingCarServiceContent },
  'corporate-car-rental': { name: 'Corporate Car Rental', icon: 'Building', generator: undefined },
};

function findCityWithState(citySlug: string) {
  const allCities = getAllCities();
  return allCities.find(c => c.slug === citySlug);
}

export async function generateStaticParams() {
  const allCities = getAllCities();
  const hubCities = allCities.filter(c => c.type === 'hub');
  const params: { service: string; city: string }[] = [];
  for (const city of hubCities) {
    for (const service of SERVICE_SLUGS) {
      params.push({ service, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; city: string }> }): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  if (!SERVICE_SLUGS.includes(serviceSlug as ServiceSlug)) return {};
  const cityData = findCityWithState(citySlug);
  if (!cityData) return {};
  if (cityData.type !== 'hub') return {};
  const service = SERVICE_MAP[serviceSlug as ServiceSlug];
  const stateData = getState(cityData.state);
  return generateServiceCityMetadata(
    service.name,
    cityData.name,
    stateData?.name || cityData.state,
    serviceSlug,
  );
}

export default async function ServiceCityPage({ params }: { params: Promise<{ service: string; city: string }> }) {
  const { service: serviceSlug, city: citySlug } = await params;
  if (!SERVICE_SLUGS.includes(serviceSlug as ServiceSlug)) notFound();
  const service = SERVICE_MAP[serviceSlug as ServiceSlug];
  const cityData = findCityWithState(citySlug);
  if (!cityData || cityData.type !== 'hub') notFound();

  const stateData = getState(cityData.state);
  const stateName = stateData?.name || cityData.state;
  const pricing = getStatePriceLabels(cityData.state);
  const displayRate = pricing.displayRate;

  const contentInput = {
    cityName: cityData.name,
    stateName,
    stateSlug: cityData.state,
    citySlug,
    landmarks: cityData.landmarks,
    airport: cityData.airport,
    railway: cityData.railway,
  };

  const content = service.generator ? service.generator(contentInput) : null;

  const faqs = content?.faqs?.slice(0, 8) || [
    { question: `What is ${service.name.toLowerCase()} service in ${cityData.name}?`, answer: `${BUSINESS.name} is the most trusted name for ${service.name.toLowerCase()} in ${cityData.name}, ${stateName} — AC cars, verified chauffeurs and open pricing, available round the clock. Call ${BUSINESS.phone}.` },
    { question: `How do I book ${service.name.toLowerCase()} in ${cityData.name}?`, answer: `Reach us on ${BUSINESS.phone} or WhatsApp. Share your trip details and receive an instant confirmation with the driver information within 2 minutes. No app download is needed.` },
    { question: `Is there surge pricing for ${service.name.toLowerCase()} in ${cityData.name}?`, answer: `Never — unlike Ola and Uber, ${BUSINESS.name} applies fixed rates with zero surge pricing. The same fare holds 24/7, through festivals and rush hours.` },
    { question: `What vehicles are available for ${service.name.toLowerCase()} in ${cityData.name}?`, answer: `Sedan (Swift Dzire, Honda Amaze — 4 pax), SUV (Ertiga, Innova — 6 pax), Innova Crysta (7 pax), Tempo Traveller (12-17 pax). All AC, GPS-tracked, sanitized.` },
  ];

  const includedItems = [
    'Air-conditioned car with music system',
    'Full-trip fuel costs covered',
    'Seasoned, police-checked driver',
    'GPS tracking with live location sharing',
    'Flat fares all day — no surge pricing',
  ];

  const canonicalUrl = `${BUSINESS.domain}/services/${serviceSlug}/${citySlug}`;


  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Services', url: `${BUSINESS.domain}/services` },
        { name: service.name, url: `${BUSINESS.domain}/services/${serviceSlug}` },
        { name: cityData.name, url: canonicalUrl },
      ])) }} />
      {content && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCitySubServiceSchema(
          cityData.name, stateName, cityData.state, citySlug, service.name, serviceSlug,
          `${service.name} in ${cityData.name}, ${stateName}. AC cab, verified chauffeurs, round-the-clock availability with flat fares.`,
          '1200', '5000'
        )) }} />
      )}

      {/* Hero */}
      <section className="relative text-white py-12 lg:py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Services', href: '/services' },
            { name: service.name, href: `/services/${serviceSlug}` },
            { name: cityData.name, href: canonicalUrl },
          ]} />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mt-4 mb-4">
            {service.name} in {cityData.name} <span className="text-gradient">{displayRate} | 24/7 Booking</span>
          </h1>
          <p className="text-gray-300 max-w-3xl mb-4">
            {service.name} in {cityData.name}, {stateName} — AC Sedan, SUV and Innova Crysta with seasoned drivers. 
            Flat fares with no surge, service around the clock. Call {BUSINESS.phone}.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><MapPin size={14} /> {cityData.name}</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Clock size={14} /> 24/7</span>
            <span className="flex items-center gap-1.5 bg-primary/30 px-3 py-1.5 rounded-full font-semibold">{displayRate}</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><CheckCircle size={14} /> No Surge Fares</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all">
              <Phone size={18} /> Book Now: {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! Please help me book ${service.name.toLowerCase()} in ${cityData.name}.`)}`} className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: '🌙', text: 'Day & Night 24/7' },
              { icon: '❄️', text: 'All AC Vehicles' },
              { icon: '✅', text: 'No Upfront Payment' },
              { icon: '💰', text: 'Fixed Fare Always' },
              { icon: '🛡️', text: 'Checked Drivers' },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-gray-600">
                <span className="text-base">{item.icon}</span> {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      {content && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              {service.name} in {cityData.name}, {stateName} — <span className="text-primary">Reliable & Budget-Friendly</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
              {content.aboutContent.slice(0, 3).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases (if available) */}
      {content && 'useCases' in content && content.useCases && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
              When to Book {service.name} in {cityData.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.useCases.map((uc, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
                  <div className="text-3xl mb-3">{uc.icon}</div>
                  <h3 className="font-bold text-secondary text-sm mb-1">{uc.title}</h3>
                  <p className="text-gray-500 text-xs">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            {service.name} Rates in {cityData.name} — <span className="text-primary">Clear Pricing</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-accent rounded-2xl border-2 border-primary/20 text-center">
              <p className="text-sm text-gray-500 mb-1">Sedan (Dzire, Amaze)</p>
              <p className="text-3xl font-extrabold text-primary">{pricing.sedanPerKm}</p>
              <p className="text-xs text-gray-500 mt-1">{pricing.displayRate}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">SUV (Ertiga, Innova)</p>
              <p className="text-3xl font-extrabold text-secondary">{pricing.suvPerKm}</p>
              <p className="text-xs text-gray-500 mt-1">Roomy and powerful</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-1">Innova Crysta</p>
              <p className="text-3xl font-extrabold text-secondary">{pricing.crystaPerKm}</p>
              <p className="text-xs text-gray-500 mt-1">Luxury comfort</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <h3 className="font-bold text-secondary mb-3">What the Fare Includes</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {includedItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500 shrink-0" /> {item}</div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <h3 className="font-bold text-secondary mb-3">Additional Charges</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {[
                  'Tolls billed as incurred',
                  'Parking billed as incurred',
                  'Night charges ₹300 (10 PM–6 AM)',
                  'State permit where applicable',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2"><span className="text-amber-500 shrink-0">•</span> {item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content continued */}
      {content && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
              {content.aboutContent.slice(3).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      {content && 'whyChooseUs' in content && content.whyChooseUs && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              Why Pick {BUSINESS.name} for {service.name} in {cityData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.whyChooseUs.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Form */}
      <section className="py-12 bg-white" id="booking-form">
        <div className="max-w-2xl mx-auto px-4">
          <BookingForm defaultFrom={cityData.name} defaultTo="" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} title={`${service.name} — ${cityData.name} Common Questions`} />
        </div>
      </section>

      {/* Google Maps */}
      <GoogleMapEmbed
        fromCity={cityData.name}
        fromLat={cityData.lat}
        fromLng={cityData.lng}
        title={`${cityData.name} ${service.name} — ${BUSINESS.name}`}
        subtitle={`${service.name} in ${cityData.name}, ${stateName}. Reserve today.`}
      />

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Reserve {service.name} in {cityData.name} — {displayRate}
          </h2>
          <p className="text-white/90 mb-6">{service.name} in {cityData.name}, {stateName} — AC cars, verified chauffeurs, round-the-clock service.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi! Please help me book ${service.name.toLowerCase()} in ${cityData.name}.`)}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              WhatsApp
            </a>
          </div>
          <Link href={`/services/${serviceSlug}`} className="inline-flex items-center gap-2 mt-4 text-white/80 text-sm hover:text-white transition-colors">
            <ArrowRight size={14} /> See full {service.name.toLowerCase()} details
          </Link>
        </div>
      </section>
    </>
  );
}
