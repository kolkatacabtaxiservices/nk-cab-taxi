import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Route, ArrowRight, Repeat, Plane, Heart, Building, Phone } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS, getAllCities } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = {
  title: `Cab & Taxi Services in Kolkata | ${BUSINESS.name}`,
  description: `Every cab & taxi service offered by ${BUSINESS.name} — local taxi ₹2,800/8hr, outstation ₹12/km, one-way, round trip, airport transfer ₹1200, wedding car ₹5,000, corporate car rental. Round the clock. Call ${BUSINESS.phone}`.slice(0, 160),
  keywords: [
    'NK Cab & Taxis', 'taxi services kolkata', 'cab types kolkata', 'kolkata taxi booking',
    'outstation cab kolkata', 'local taxi kolkata', 'airport taxi kolkata', 'wedding car kolkata',
    'corporate cab kolkata', 'one way taxi kolkata', 'round trip cab kolkata',
  ],
  openGraph: {
    title: `Taxi & Cab Services | ${BUSINESS.name}`,
    description: `Full range of cab services — local, outstation, airport, wedding, corporate. From ₹12/km. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/services`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `Cab Services by ${BUSINESS.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Our Services | ${BUSINESS.name}`,
    description: `Every cab service — local, outstation, airport, wedding. Call ${BUSINESS.phone}`,
    images: [`${BUSINESS.domain}/navbanner.webp`],
  },
  alternates: { canonical: `${BUSINESS.domain}/services` },
  other: {
    thumbnail: `${BUSINESS.domain}/navbanner.webp`,
  },
};

const serviceCards = [
  {
    name: 'Local Taxi',
    slug: 'local-taxi',
    icon: MapPin,
    price: 'From ₹1,800/4hr',
    desc: 'Hourly cab hire for trips around the city — shopping, hospitals, sightseeing and meetings. AC sedan or SUV with chauffeur.',
    features: ['4hr/40km plans', '₹12/km beyond limit', 'AC sedans & SUVs', 'Open round the clock'],
  },
  {
    name: 'Outstation Cab',
    slug: 'outstation',
    icon: Route,
    price: 'From ₹12/km',
    desc: 'AC cab for intercity, long-distance journeys. One-way or round trip choices across 80+ cities.',
    features: ['Sedan at ₹12/km', 'SUV at ₹16/km', 'Over 80 cities', 'Driver stay included'],
  },
  {
    name: 'One-Way Taxi',
    slug: 'one-way',
    icon: ArrowRight,
    price: 'From ₹12/km',
    desc: 'Pay for a single direction only — no return fare. The most economical way to move between cities.',
    features: ['Zero return fare', 'Point to point', 'Every route covered', 'Best-priced option'],
  },
  {
    name: 'Round Trip',
    slug: 'round-trip',
    icon: Repeat,
    price: 'From ₹12/km',
    desc: 'A full round journey with driver stay for multi-day tours, pilgrimages and holidays.',
    features: ['Driver remains with you', 'Multi-day trips', 'Flexible itinerary', '250 km/day minimum'],
  },
  {
    name: 'Airport Transfer',
    slug: 'airport-transfer',
    icon: Plane,
    price: 'From ₹1200',
    desc: 'Airport pickup and drop with live flight tracking and flat fares. CCU, Ranchi and Bhubaneswar airports.',
    features: ['Live flight tracking', 'Fixed fares', 'Arrivals meet & greet', 'Early & late flights'],
  },
  {
    name: 'Wedding Car Rental',
    slug: 'wedding-car-rental',
    icon: Heart,
    price: 'From ₹5,000',
    desc: 'Decorated cars for baraat, vidaai and receptions — Innova Crysta, Fortuner and luxury sedans.',
    features: ['Flower decor', 'Red carpet welcome', 'Multi-car fleet', 'Uniformed chauffeur'],
  },
  {
    name: 'Corporate Car Rental',
    slug: 'corporate-car-rental',
    icon: Building,
    price: 'Monthly Packages',
    desc: 'Dedicated cars for staff transport, client visits and business trips, with GST invoices on every booking.',
    features: ['Monthly agreements', 'Save 15-25%', 'GST billing', 'Exclusive cars'],
  },
];

const HUB_CITY_SERVICES = [
  { slug: 'local-taxi', name: 'Local Taxi', icon: MapPin },
  { slug: 'outstation', name: 'Outstation Cab', icon: Route },
  { slug: 'one-way', name: 'One-Way Taxi', icon: ArrowRight },
  { slug: 'round-trip', name: 'Round Trip', icon: Repeat },
  { slug: 'airport-transfer', name: 'Airport Transfer', icon: Plane },
  { slug: 'wedding-car-rental', name: 'Wedding Car', icon: Heart },
  { slug: 'corporate-car-rental', name: 'Corporate Car', icon: Building },
];

function HubCitiesSection() {
  const allCities = getAllCities();
  const hubCities = allCities.filter(c => c.type === 'hub');
  if (hubCities.length === 0) return null;

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center">
          City-Wise Cab Services — <span className="text-primary">Book Online</span>
        </h2>
        <p className="text-gray-500 text-sm mb-8 text-center">Pick your city to view local, outstation, airport and all other services</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubCities.map(city => (
            <div key={city.slug} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary text-lg">{city.name}</h3>
                  <p className="text-gray-400 text-xs">{city.state === 'west-bengal' ? 'West Bengal' : city.state === 'jharkhand' ? 'Jharkhand' : 'Odisha'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {HUB_CITY_SERVICES.map(svc => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}/${city.slug}`}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all text-sm text-gray-600 hover:text-primary"
                  >
                    <svc.icon size={13} />
                    <span className="truncate">{svc.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const faqs = [
    { question: `Which cab services does ${BUSINESS.name} provide?`, answer: `Seven cab service types are available: Local Taxi (hourly hire), Outstation Cab (intercity), One-Way Taxi (single-direction payment), Round Trip, Airport Transfer, Wedding Car Rental (decorated) and Corporate Car Rental. Every service runs round the clock across West Bengal, Jharkhand, Odisha, Bihar and Uttar Pradesh.` },
    { question: 'Which cab option is the most affordable?', answer: `A one-way taxi works out cheapest — you are billed only for the distance covered in one direction, with no return fare. Sedans begin at ₹12/km. Within the city, the 4hr/40km plan at ₹1,800 gives the best value.` },
    { question: 'Are AC cabs available across all services?', answer: 'Yes — the whole fleet is air-conditioned, clean and sanitised. Sedan (Swift Dzire, Honda Amaze), SUV (Ertiga, Innova), Innova Crysta, Tempo Traveller and luxury cars are all available for every service type.' },
    { question: `How do I reserve a cab with ${BUSINESS.name}?`, answer: `Ring ${BUSINESS.phone}, message us on WhatsApp, or complete the booking form on this site. You get an immediate confirmation along with the driver name and contact. No app download is needed.` },
    { question: 'Do fares surge during festival seasons?', answer: `No — unlike Ola and Uber, ${BUSINESS.name} applies one fixed rate all through the day, even during Durga Puja, Diwali, Christmas, New Year or any busy period. No surge, no dynamic pricing, no hidden costs.` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Services', url: `${BUSINESS.domain}/services` },
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-14 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Our Services', href: '/services' }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-4">
            Taxi & Cab <span className="text-gradient">Services in Kolkata</span> ₹12/km | Reserve Online
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-6">
            End-to-end taxi and cab solutions for every journey — local, outstation, airport, wedding and corporate. 
            Fixed rates with no surge, available around the clock in 80+ cities.
          </p>
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all">
            <Phone size={18} /> Book Now: {BUSINESS.phone}
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-8 text-center">
            Cab Services in Kolkata — <span className="text-primary">Select Your Service</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">{service.name}</h3>
                      <p className="text-primary font-semibold text-sm">{service.price}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-1.5 mb-4">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="text-primary font-semibold text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
                    View Details <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6 text-center">Quick <span className="text-primary">Rate Guide</span></h2>
          <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-4 py-3 text-left text-sm">Service Type</th>
                  <th className="px-4 py-3 text-center text-sm">Sedan</th>
                  <th className="px-4 py-3 text-center text-sm">SUV</th>
                  <th className="px-4 py-3 text-center text-sm">Tempo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { s: 'City (4hr/40km)', sedan: '₹1,800', suv: '₹2,500', tempo: '₹3,500' },
                  { s: 'Outstation (per km)', sedan: '₹12/km', suv: '₹16/km', tempo: '₹22/km' },
                  { s: 'One-Way (per km)', sedan: '₹12/km', suv: '₹16/km', tempo: '₹22/km' },
                  { s: 'Airport Transfer', sedan: 'From ₹1200', suv: 'From ₹1,800', tempo: 'From ₹2,200' },
                  { s: 'Wedding Cars', sedan: 'From ₹5,000', suv: 'From ₹8,000', tempo: '—' },
                ].map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-semibold text-sm text-secondary">{r.s}</td>
                    <td className="px-4 py-3 text-center text-sm text-primary font-bold">{r.sedan}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{r.suv}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{r.tempo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">* Toll, parking and state permit billed extra. Fares stay flat 24/7 — no surge.</p>
        </div>
      </section>

      {/* Hub Cities */}
      <HubCitiesSection />

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} title="Our Cab Services — FAQ" />
        </div>
      </section>

      {/* CTA */}
      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a Cab? Reserve Today!</h2>
          <p className="text-white/90 mb-6">Round-the-clock service in 80+ cities, flat fares and AC cabs driven by verified chauffeurs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi! I would like to book a cab.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
