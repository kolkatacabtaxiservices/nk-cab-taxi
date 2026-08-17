import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Car, ArrowRight, Route, Shield, CreditCard, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS, getVehicles } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema, generateRouteSchema } from '@/lib/seo';

const FROM = 'Jamshedpur';
const TO = 'Kolkata';
const DISTANCE = 270;
const DURATION = '4-5';
const PRICE_SEDAN = 4500;
const PRICE_SUV = 5800;
const PRICE_TEMPO = 7800;
const VIA = ['Baharagora', 'Kharagpur', 'Kolaghat', 'NH 16'];

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: `Jamshedpur to Kolkata Cab from ₹${PRICE_SEDAN} | One-Way Taxi & Round Trip | ${BUSINESS.name}`,
  description: `Hire a Jamshedpur to Kolkata taxi starting ₹${PRICE_SEDAN}. One-way drop, round trips, budget-friendly AC sedan & SUV. ${DISTANCE} km journey. Book anytime at ${BUSINESS.phone}.`,
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  openGraph: {
    title: `Jamshedpur to Kolkata Taxi ₹${PRICE_SEDAN} | ${BUSINESS.name}`,
    description: `Reserve your Jamshedpur to Kolkata ride. ${DISTANCE} km, starting ₹${PRICE_SEDAN}. One-way and round trip. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/jamshedpur-to-kolkata-cab`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: 'Jamshedpur to Kolkata cab booking with NK Cab & Taxi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Jamshedpur to Kolkata Taxi ₹${PRICE_SEDAN}`,
    description: `Jamshedpur to Kolkata taxi reserved in minutes. ${DISTANCE} km, AC vehicles. Call ${BUSINESS.phone}`,
    images: [`${BUSINESS.domain}/navbanner.webp`],
  },
  alternates: {
    // This page has richer, hand-crafted content for the flagship route.
    // Canonical points here (not to /routes/jamshedpur-to-kolkata) to signal
    // this is the authoritative version. The dynamic route page links back here.
    canonical: `${BUSINESS.domain}/jamshedpur-to-kolkata-cab`,
  },
  other: {
    thumbnail: `${BUSINESS.domain}/navbanner.webp`,
  },
};

export default function JamshedpurToKolkataCabPage() {
  const vehicles = getVehicles();

  const faqs = [
    { question: 'How much does a Jamshedpur to Kolkata cab cost?', answer: `A sedan (Swift Dzire or Honda Amaze) ride from Jamshedpur to Kolkata starts at ₹${PRICE_SEDAN}, an SUV (Ertiga or Innova Crysta) at ₹${PRICE_SUV}, and a Tempo Traveller at ₹${PRICE_TEMPO}. Toll and parking are billed separately. Reach us at ${BUSINESS.phone}.` },
    { question: 'What is the road distance between Jamshedpur and Kolkata?', answer: `Driving over NH 16, the gap between Jamshedpur and Kolkata is ${DISTANCE} km. The ride normally takes around ${DURATION} hours, passing Baharagora, Kharagpur, and Kolaghat en route.` },
    { question: 'Can I take a one-way cab from Jamshedpur to Kolkata?', answer: `Certainly. A one-way sedan from Jamshedpur to Kolkata costs ₹${PRICE_SEDAN}; you pay for a single leg only, with no return fare. Dial ${BUSINESS.phone} to reserve it.` },
    { question: 'Which is the most budget-friendly cab option on this route?', answer: `Our Sedan (Swift Dzire) is the lowest-cost option at ₹${PRICE_SEDAN}, covering fuel and driver charges with nothing hidden. Call ${BUSINESS.phone} to book.` },
    { question: 'Do you run cabs from Tatanagar to Kolkata?', answer: `Absolutely — Tatanagar (Jamshedpur) to Kolkata rides run round the clock. We collect you from Tatanagar Junction, Jubilee Park, Bistupur, Sakchi, or wherever you are in Jamshedpur. Sedans begin at ₹${PRICE_SEDAN}.` },
    { question: 'Can you drop me at Kolkata Airport from Jamshedpur?', answer: 'Yes — we serve Kolkata Airport (CCU) from Jamshedpur over 285 km, with sedans from ₹4,750. You are dropped straight at the departure gate, perfect for flight connections.' },
    { question: 'Do you offer a Jamshedpur to Howrah ride?', answer: 'Yes — Howrah-bound sedans from Jamshedpur are ₹4,350, delivering you at Howrah Station or anywhere in Howrah. The NH 16 route takes roughly 4 hours.' },
    { question: 'Do you accommodate group travel on this route?', answer: `For larger parties we provide Tempo Travellers (12-17 seats) from ₹${PRICE_TEMPO}. Extra sedans and SUVs can be lined up for weddings, office teams, and family outings. Call ${BUSINESS.phone}.` },
    { question: 'Can I travel overnight from Jamshedpur to Kolkata?', answer: 'Our fleet never stops — late-night and pre-dawn departures run without any extra fee, and every chauffeur knows NH 16 thoroughly.' },
    { question: 'Which payment options do you accept?', answer: `We take cash, UPI (Google Pay, Paytm, PhonePe), debit/credit cards, and online bank transfers. GST invoices are issued for business bookings.` },
  ];

  const relatedRoutes = [
    { name: 'Kolkata to Jamshedpur', slug: 'kolkata-to-jamshedpur', distance: 270, price: 4500 },
    { name: 'Jamshedpur to Ranchi', slug: 'jamshedpur-to-ranchi', distance: 140, price: 3000 },
    { name: 'Jamshedpur to Dhanbad', slug: 'jamshedpur-to-dhanbad', distance: 170, price: 3400 },
    { name: 'Jamshedpur to Bokaro', slug: 'jamshedpur-to-bokaro', distance: 130, price: 2900 },
    { name: 'Jamshedpur to Patna', slug: 'jamshedpur-to-patna', distance: 427, price: 6200 },
    { name: 'Jamshedpur to Howrah', slug: 'jamshedpur-to-howrah', distance: 260, price: 4350 },
    { name: 'Ranchi to Kolkata', slug: 'ranchi-to-kolkata', distance: 410, price: 5900 },
    { name: 'Jamshedpur to Kolkata Airport', slug: 'jamshedpur-to-kolkata-airport', distance: 285, price: 4750 },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateRouteSchema(FROM, TO, PRICE_SEDAN)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Jamshedpur to Kolkata Cab', url: `${BUSINESS.domain}/jamshedpur-to-kolkata-cab` },
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-14 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Jamshedpur to Kolkata Cab', href: '/jamshedpur-to-kolkata-cab' }]} />
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
            Jamshedpur to Kolkata <span className="text-gradient">Cab & Taxi Hire</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-6">
            Reserve an economical one-way or round-trip cab from Jamshedpur to Kolkata. {DISTANCE} km, roughly {DURATION} hours, from <strong className="text-primary">₹{PRICE_SEDAN}</strong>. Available around the clock.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><MapPin size={14} /> {DISTANCE} km</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Clock size={14} /> {DURATION} hours</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Route size={14} /> Route: {VIA.join(', ')}</span>
            <span className="flex items-center gap-1.5 bg-primary/20 border border-primary/30 px-3 py-1.5 rounded-full text-primary font-bold"><Car size={14} /> Starting ₹{PRICE_SEDAN}</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">Jamshedpur to Kolkata Cab Rates — One-Way & Round Trip</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {vehicles.slice(0, 4).map((v) => (
              <div key={v.id} className="p-6 bg-gradient-to-br from-accent/50 to-white rounded-2xl border border-primary/10 card-hover text-center">
                <h3 className="font-bold text-secondary text-lg mb-1">{v.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{v.models.slice(0, 2).join(', ')}</p>
                <p className="text-3xl font-extrabold text-primary mb-1">₹{v.id === 'sedan' ? PRICE_SEDAN : v.id === 'suv' ? PRICE_SUV : v.id === 'tempo' ? PRICE_TEMPO : Math.round(DISTANCE * v.pricePerKm * 1.1)}</p>
                <p className="text-xs text-gray-400">One-Way • {DISTANCE} km</p>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-secondary text-lg">🎯 Lowest Fare Promise</h3>
              <p className="text-gray-500 text-sm">Upfront rates with no surprise costs. Toll and parking billed separately.</p>
            </div>
            <a href={`tel:${BUSINESS.phone}`} className="px-8 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all whitespace-nowrap">
              <Phone size={16} className="inline mr-2" />Book on {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-4">Jamshedpur to Kolkata Cab — The Complete Guide</h2>
          
          {/* ── QUICK ANSWER BOX — targets AI Overviews / Featured Snippets ── */}
          <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <h3 className="text-base font-bold text-secondary mb-3 flex items-center gap-2">
                ⚡ Quick Facts — Jamshedpur to Kolkata Cab Route
              </h3>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                  <dt className="text-xs text-gray-400 mb-1">Distance</dt>
                  <dd className="font-bold text-secondary">{DISTANCE} km</dd>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                  <dt className="text-xs text-gray-400 mb-1">Travel Time</dt>
                  <dd className="font-bold text-secondary">{DURATION} hrs</dd>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                  <dt className="text-xs text-gray-400 mb-1">Sedan Fare</dt>
                  <dd className="font-bold text-primary">₹{PRICE_SEDAN}</dd>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                  <dt className="text-xs text-gray-400 mb-1">SUV Fare</dt>
                  <dd className="font-bold text-primary">₹{PRICE_SUV}</dd>
                </div>
              </dl>
              <p className="text-xs text-gray-500 mt-3">
                📍 Suggested Route: Jamshedpur → Baharagora → Kharagpur → Kolaghat → Kolkata (NH 18 and NH 16)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                📞 Always-On Help: <a href={`tel:${BUSINESS.phone}`} className="text-primary font-semibold hover:underline">{BUSINESS.phone}</a> | Fixed fares, no surge pricing, ever.
              </p>
            </div>
            <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm">
              <Image
                src="/navbanner.webp"
                alt="Jamshedpur to Kolkata Cab booking - AC sedan and SUV taxi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
                priority
              />
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Searching for the <strong>best cab from Jamshedpur to Kolkata</strong>? {BUSINESS.name} is a dependable, budget-friendly option connecting Jamshedpur (Tatanagar) with Kolkata. Be it a <strong>one-way taxi from Jamshedpur to Kolkata</strong>, a round trip, or a direct ride to Kolkata Airport or Howrah Station — you get a <strong>value-for-money cab</strong> with air-conditioned cars and veteran highway drivers.
          </p>
          <p className="text-gray-600 mb-4">
            The <strong>Jamshedpur to Kolkata distance is {DISTANCE} km</strong> along NH 16. Cabs roll through Baharagora, Kharagpur, and Kolaghat on the approach to Kolkata. Expect about {DURATION} hours inside spotless, well-kept AC vehicles steered by drivers familiar with every mile of this corridor.
          </p>

          <h3 className="text-xl font-bold text-secondary mt-8 mb-3">Jamshedpur to Kolkata One-Way Taxi</h3>
          <p className="text-gray-600 mb-4">
            Our <strong>Jamshedpur to Kolkata one-way cab</strong> is the thriftiest way to move between these cities. You settle only the single-leg fare of ₹{PRICE_SEDAN} (sedan) — no return charges, nothing concealed. Pickups happen anywhere in Jamshedpur: Tatanagar Junction, Bistupur, Sakchi, Telco, Sonari, Kadma, Adityapur, or Gamharia.
          </p>

          <h3 className="text-xl font-bold text-secondary mt-8 mb-3">Direct Cabs to Kolkata Airport or Howrah</h3>
          <p className="text-gray-600 mb-4">
            Have a flight or train to board? Book a direct <strong>Jamshedpur to Kolkata Airport (CCU)</strong> cab at ₹4,750 or a <strong>Jamshedpur to Howrah Station</strong> ride at ₹4,350. Dawn departures are available so you never miss an early connection.
          </p>

          <h3 className="text-xl font-bold text-secondary mt-8 mb-3">Route Stops — NH 16</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Jamshedpur (Tatanagar)', 'Baharagora', 'Kharagpur', 'Kolaghat', 'Kolkata'].map((stop, i, arr) => (
              <span key={stop} className="flex items-center gap-1">
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-secondary">{stop}</span>
                {i < arr.length - 1 && <ArrowRight size={14} className="text-primary" />}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { icon: <CreditCard size={20} />, title: 'Lowest Fare', desc: `From ₹${PRICE_SEDAN}. Nothing to pay on return.` },
              { icon: <Shield size={20} />, title: 'Safe and Dependable', desc: 'Screened chauffeurs. GPS-monitored cars.' },
              { icon: <Clock size={20} />, title: 'Round-the-Clock Availability', desc: 'Mornings, evenings, late nights — we are always on.' },
              { icon: <Star size={20} />, title: 'Many Pickup Spots', desc: 'Tatanagar, Bistupur, Sakchi, Telco, Sonari, Kadma and more.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Routes */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">Other Routes from Jamshedpur</h2>
          {/* Cross-link to dynamic route page to avoid cannibalization confusion */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-secondary text-sm">📍 Full Route Guide: Jamshedpur → Kolkata</p>
              <p className="text-xs text-gray-500 mt-0.5">Distance, fare list, map, halts, and much more</p>
            </div>
            <Link href="/routes/jamshedpur-to-kolkata" className="text-sm font-bold text-primary hover:underline whitespace-nowrap">See Route Details →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedRoutes.map((route) => (
              <Link key={route.slug} href={`/routes/${route.slug}`} className="group route-card bg-white rounded-xl p-4">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{route.name}</p>
                <p className="text-xs text-gray-500 mt-1">{route.distance} km</p>
                <p className="text-primary font-bold mt-2">From ₹{route.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <BookingForm defaultFrom="Jamshedpur" defaultTo="Kolkata" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} title="Jamshedpur to Kolkata Cab — Frequently Asked Questions" />
        </div>
      </section>

      {/* CTA */}
      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve Your Jamshedpur to Kolkata Cab Today!</h2>
          <p className="text-white/90 mb-6">Lowest fares. AC vehicles. Instant booking at any hour.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> Call {BUSINESS.phone} Now
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hello! I need a cab from Jamshedpur to Kolkata. Please send me the fare details.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp Us to Book
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
