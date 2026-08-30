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

const FROM = 'Kolkata';
const TO = 'Jamshedpur';
const DISTANCE = 270;
const DURATION = '4-5';
const PRICE_SEDAN = 4500;
const PRICE_SUV = 5800;
const PRICE_TEMPO = 7800;
const VIA = ['NH 16', 'Kolaghat', 'Kharagpur', 'Baharagora'];

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: `Kolkata to Jamshedpur Cab ₹${PRICE_SEDAN} | One Way Taxi, Cheapest Cab | ${BUSINESS.name}`,
  description: `Kolkata to Jamshedpur cab fare starts at ₹${PRICE_SEDAN}. One-way drop, round trips and airport pickups over ${DISTANCE} km of highway driving — AC sedan, SUV & Tempo Traveller, available round the clock. Call ${BUSINESS.phone} for an instant fare quote.`,
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  openGraph: {
    title: `Kolkata to Jamshedpur Cab ₹${PRICE_SEDAN} | ${BUSINESS.name}`,
    description: `Door-to-door Kolkata to Jamshedpur taxi covering ${DISTANCE} km from ₹${PRICE_SEDAN}. One-way drops and round trips with AC cars. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/kolkata-to-jamshedpur-cab`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/herobanner.webp`, width: 1200, height: 630, alt: 'Kolkata to Jamshedpur Cab Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Kolkata to Jamshedpur Cab ₹${PRICE_SEDAN}`,
    description: `Kolkata to Jamshedpur cab, ${DISTANCE} km highway run in an AC car. Call ${BUSINESS.phone}`,
    images: [`${BUSINESS.domain}/herobanner.webp`],
  },
  alternates: {
    // This page has richer, hand-crafted content for the flagship route.
    // Canonical points here (not to /routes/kolkata-to-jamshedpur) to signal
    // this is the authoritative version. The dynamic route page links back here.
    canonical: `${BUSINESS.domain}/kolkata-to-jamshedpur-cab`,
  },
  other: {
    thumbnail: `${BUSINESS.domain}/herobanner.webp`,
  },
};

export default function KolkataToJamshedpurCabPage() {
  const vehicles = getVehicles();

  const faqs = [
    { question: 'How much does a cab from Kolkata to Jamshedpur cost?', answer: `The Kolkata to Jamshedpur cab fare begins at ₹${PRICE_SEDAN} for a Sedan (Swift Dzire, Honda Amaze), ₹${PRICE_SUV} for an SUV (Ertiga, Innova Crysta), and ₹${PRICE_TEMPO} for a Tempo Traveller. These are one-way rates; toll and parking are billed separately. For a confirmed quote, call ${BUSINESS.phone}.` },
    { question: 'What is the road distance and travel time from Kolkata to Jamshedpur?', answer: `Jamshedpur lies ${DISTANCE} km from Kolkata by road. Driving along NH 16 through Kolaghat, Kharagpur and Baharagora, the trip takes about ${DURATION} hours in normal traffic, with rest stops along the way as needed.` },
    { question: 'Do you run a one-way cab from Kolkata to Jamshedpur?', answer: `Yes — one-way is our most economical option for this route. You are billed only for the forward journey and the cab's return leg is not charged to you. A one-way Sedan costs ₹${PRICE_SEDAN}. Call ${BUSINESS.phone} to confirm your booking.` },
    { question: 'Which is the cheapest cab option from Kolkata to Jamshedpur?', answer: `The lowest-priced option on this route is our Sedan (Swift Dzire) at ₹${PRICE_SEDAN} one-way, which covers fuel and the driver's charges. To lock in the best available rate, book directly with us on ${BUSINESS.phone} rather than through aggregators.` },
    { question: 'Is a round trip cab available from Kolkata to Jamshedpur?', answer: `Yes. A round trip gives you the same car and driver for both legs. Billing is on total distance covered both ways, with a minimum 250 km per day for overnight stays, and the driver's halt is arranged. Ask ${BUSINESS.phone} for a round trip quote.` },
    { question: 'Which highway is used for the Kolkata to Jamshedpur drive?', answer: `Our cabs follow NH 16 — Kolkata to Kolaghat to Kharagpur to Baharagora and into Jamshedpur. It is the fastest and smoothest corridor on this route, with good road quality for the entire drive.` },
    { question: 'Can you pick us up from Kolkata Airport for Jamshedpur?', answer: `Yes. For airport pickups we meet you at the CCU arrival gate holding a name board and track your flight's live status so a delay does not mean a missed ride. Airport to Jamshedpur is 285 km, with the Sedan fare from ₹4,750.` },
    { question: 'Do you provide wedding cars from Kolkata to Jamshedpur?', answer: `We do. Decorated Innova Crysta, Fortuner and luxury sedans are available for baraat processions, vidaai and reception functions travelling from Kolkata to Jamshedpur. Call ${BUSINESS.phone} to plan decorations and timings.` },
    { question: 'Is there a cab service from Howrah to Jamshedpur?', answer: `Yes, we pick up anywhere in Howrah — including Howrah Junction and Howrah Maidan — for Jamshedpur at ₹4,350 for a Sedan. Call ${BUSINESS.phone} to schedule the pickup.` },
    { question: 'Can we travel at night from Kolkata to Jamshedpur?', answer: 'Yes, the service runs 24/7 with the same flat fare at any hour — there is no night surcharge. Our drivers are used to night driving on NH 16 and take required rest breaks on longer runs.' },
  ];

  const relatedRoutes = [
    { name: 'Jamshedpur to Kolkata', slug: 'jamshedpur-to-kolkata', distance: 270, price: 4500 },
    { name: 'Kolkata to Ranchi', slug: 'kolkata-to-ranchi', distance: 410, price: 5900 },
    { name: 'Jamshedpur to Ranchi', slug: 'jamshedpur-to-ranchi', distance: 140, price: 3000 },
    { name: 'Howrah to Jamshedpur', slug: 'howrah-to-jamshedpur', distance: 260, price: 4350 },
    { name: 'Kolkata Airport to Jamshedpur', slug: 'kolkata-airport-to-jamshedpur', distance: 285, price: 4750 },
    { name: 'Jamshedpur to Dhanbad', slug: 'jamshedpur-to-dhanbad', distance: 170, price: 3400 },
    { name: 'Jamshedpur to Bokaro', slug: 'jamshedpur-to-bokaro', distance: 130, price: 2900 },
    { name: 'Jamshedpur to Patna', slug: 'jamshedpur-to-patna', distance: 427, price: 6200 },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateRouteSchema(FROM, TO, PRICE_SEDAN)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Kolkata to Jamshedpur Cab', url: `${BUSINESS.domain}/kolkata-to-jamshedpur-cab` },
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-14 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Kolkata to Jamshedpur Cab', href: '/kolkata-to-jamshedpur-cab' }]} />
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
            Kolkata to Jamshedpur <span className="text-gradient">Cab Service</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-6">
            The Kolkata–Jamshedpur run in an AC cab — one-way drops or round trips over {DISTANCE} km, roughly {DURATION} hours of highway driving. Sedan, SUV and Tempo Traveller options, starting at <strong className="text-primary">₹{PRICE_SEDAN}</strong>.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><MapPin size={14} /> {DISTANCE} km</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Clock size={14} /> {DURATION} hours</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Route size={14} /> Via {VIA.join(', ')}</span>
            <span className="flex items-center gap-1.5 bg-primary/20 border border-primary/30 px-3 py-1.5 rounded-full text-primary font-bold"><Car size={14} /> From ₹{PRICE_SEDAN}</span>
          </div>
        </div>
      </section>

      {/* Quick Pricing Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">Kolkata to Jamshedpur Cab Fare — One Way & Round Trip</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {vehicles.slice(0, 4).map((v) => (
              <div key={v.id} className="p-6 bg-gradient-to-br from-accent/50 to-white rounded-2xl border border-primary/10 card-hover text-center">
                <h3 className="font-bold text-secondary text-lg mb-1">{v.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{v.models.slice(0, 2).join(', ')}</p>
                <p className="text-3xl font-extrabold text-primary mb-1">₹{v.id === 'sedan' ? PRICE_SEDAN : v.id === 'suv' ? PRICE_SUV : v.id === 'tempo' ? PRICE_TEMPO : Math.round(DISTANCE * v.pricePerKm * 1.1)}</p>
                <p className="text-xs text-gray-400">One-Way • {DISTANCE} km</p>
                <p className="text-xs text-gray-500 mt-2">{v.capacity} persons • {v.luggage} bags</p>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-secondary text-lg">🎯 Best Price Guarantee</h3>
              <p className="text-gray-500 text-sm">Transparent pricing. No hidden charges. Toll & parking extra.</p>
            </div>
            <a href={`tel:${BUSINESS.phone}`} className="px-8 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all whitespace-nowrap">
              <Phone size={16} className="inline mr-2" />Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Detailed Content — SEO Pillar */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-4">Kolkata to Jamshedpur Cab — Complete Travel Guide</h2>
          
          {/* ── QUICK ANSWER BOX — targets AI Overviews / Featured Snippets ── */}
          <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <h3 className="text-base font-bold text-secondary mb-3 flex items-center gap-2">
                ⚡ Quick Answer — Kolkata to Jamshedpur Cab Route Facts
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
                📍 Highway Route: Kolkata → Kolaghat → Kharagpur → Baharagora → Jamshedpur (NH 16 and NH 18)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                📞 24/7 Helpline: <a href={`tel:${BUSINESS.phone}`} className="text-primary font-semibold hover:underline">{BUSINESS.phone}</a> | No surge pricing, flat fares guaranteed.
              </p>
            </div>
            <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm">
              <Image
                src="/herobanner.webp"
                alt="Kolkata to Jamshedpur Cab booking - AC sedan and SUV taxi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
                priority
              />
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            Planning the drive from Kolkata to Jamshedpur? {BUSINESS.name} runs one of the most dependable <strong>Kolkata to Jamshedpur cab services</strong> on this corridor — a private, air-conditioned car and a driver who knows NH 16 well, with fares from just ₹{PRICE_SEDAN}. Whether you need a <strong>one-way cab from Kolkata to Jamshedpur</strong>, a return booking, or an airport pickup at CCU, the arrangement stays the same: transparent pricing, a confirmed vehicle, and a professional at the wheel.
          </p>
          <p className="text-gray-600 mb-4">
            The <strong>Kolkata to Jamshedpur distance is {DISTANCE} km</strong>, covered along NH 16 past Kolaghat, Kharagpur and Baharagora before you reach Tatanagar. On a clear run the journey takes about {DURATION} hours. With a well-maintained car and a driver comfortable with highway driving, you arrive rested — whether you are travelling for business, a family visit, or a wedding function.
          </p>

          <h3 className="text-xl font-bold text-secondary mt-8 mb-3">Why Choose Our Kolkata to Jamshedpur Cab?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { icon: <CreditCard size={20} />, title: 'Flat, Upfront Fares', desc: `From ₹${PRICE_SEDAN} with no hidden add-ons — you pay for the kilometres you actually cover.` },
              { icon: <Shield size={20} />, title: 'Vetted Highway Drivers', desc: 'Background-checked professionals who drive the Kolkata–NH 16–Jamshedpur stretch regularly.' },
              { icon: <Clock size={20} />, title: 'Round-the-Clock Dispatch', desc: 'Early departures and late-night arrivals handled at the same flat rate, any day.' },
              { icon: <Star size={20} />, title: 'Fresh, AC Fleet', desc: 'Serviced cars — Swift Dzire, Ertiga, Innova Crysta and Tempo Traveller — cleaned before every trip.' },
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

          <h3 className="text-xl font-bold text-secondary mt-8 mb-3">Kolkata to Jamshedpur One Way Cab</h3>
          <p className="text-gray-600 mb-4">
            Our <strong>Kolkata to Jamshedpur one-way cab</strong> is the straightforward choice for a single-direction journey — you pay only for the way you travel, with no return-leg charge. A one-way Sedan is priced from ₹{PRICE_SEDAN}, which also makes it the <strong>most affordable cab from Kolkata to Jamshedpur</strong>. It suits business trips, relocations, family visits, or simply anyone not coming back the same way.
          </p>

          <h3 className="text-xl font-bold text-secondary mt-8 mb-3">Kolkata to Jamshedpur Round Trip Cab</h3>
          <p className="text-gray-600 mb-4">
            Coming back the same way? Our <strong>Kolkata to Jamshedpur round trip cab</strong> keeps the same vehicle and driver with you for the whole journey. Fares are computed on total kilometres covered both ways, with a minimum 250 km per day on overnight stays; driver halt charges are covered as well. It works well for weekend trips, same-day meetings, and family functions that need transport at both ends.
          </p>

          <h3 className="text-xl font-bold text-secondary mt-8 mb-3">Airport to Jamshedpur Cab</h3>
          <p className="text-gray-600 mb-4">
            Flying into Kolkata? We run a <strong>Kolkata Airport (CCU) to Jamshedpur cab</strong> service with live flight tracking, meeting you at the arrival gate with a name board. The airport to Jamshedpur run is 285 km, with a Sedan fare from ₹4,750; a <strong>Howrah to Jamshedpur</strong> pickup is available from ₹4,350 as well.
          </p>

          <h3 className="text-xl font-bold text-secondary mt-8 mb-3">Route Details — NH 16 Highway</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Kolkata', 'Kolaghat', 'Kharagpur', 'Baharagora', 'Jamshedpur (Tatanagar)'].map((stop, i, arr) => (
              <span key={stop} className="flex items-center gap-1">
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-secondary">{stop}</span>
                {i < arr.length - 1 && <ArrowRight size={14} className="text-primary" />}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Routes */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">Related Routes — Jamshedpur Cab Service</h2>
          {/* Cross-link to dynamic route page to avoid cannibalization confusion */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-secondary text-sm">📍 Detailed Route: Kolkata → Jamshedpur</p>
              <p className="text-xs text-gray-500 mt-0.5">Distance, fare chart, map, via stops and more</p>
            </div>
            <Link href="/routes/kolkata-to-jamshedpur" className="text-sm font-bold text-primary hover:underline whitespace-nowrap">View Route Details →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedRoutes.map((route) => (
              <Link key={route.slug} href={`/routes/${route.slug}`} className="group route-card bg-white rounded-xl p-4">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{route.name}</p>
                <p className="text-xs text-gray-500 mt-1">{route.distance} km • One Way</p>
                <p className="text-primary font-bold mt-2">From ₹{route.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <BookingForm defaultFrom="Kolkata" defaultTo="Jamshedpur" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} title="Kolkata to Jamshedpur Cab — Your Questions Answered" />
        </div>
      </section>

      {/* CTA */}
      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve Your Kolkata to Jamshedpur Cab</h2>
          <p className="text-white/90 mb-6">Flat fares. AC cars. All-hours availability. Confirmation in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> Call {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi, I need a cab from Kolkata to Jamshedpur. Please send me the fare details.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp Booking
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
