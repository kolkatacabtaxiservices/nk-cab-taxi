import { Metadata } from 'next';
import { Phone, CheckCircle, XCircle, Shield, Clock, Car, CreditCard, MapPin } from 'lucide-react';

import HeroBanner from '@/components/HeroBanner';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: { absolute: `NK Cab & Taxi vs Ola vs Uber — A Fair 2026 Showdown` },
  description: `See how ${BUSINESS.name} measures up against Ola, Uber, Rapido and InDrive in Kolkata. Surge-free fares, fixed rates, vetted chauffeurs. Find out why 5000+ riders prefer us to app taxis. Call ${BUSINESS.phone}.`,
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  openGraph: {
    title: 'NK Cab & Taxi vs Ola vs Uber — Straight-Talk Comparison',
    description: 'Flat fares, zero surge, vetted drivers. Discover why riders move away from Ola and Uber.',
    url: `${BUSINESS.domain}/kolkata-cab-vs-ola-uber`,
    siteName: BUSINESS.name,
    locale: 'en_IN',
    type: 'article',
    images: [{ url: `${BUSINESS.domain}/herobanner.webp`, width: 1200, height: 630, alt: 'NK Cab & Taxi compared against Ola and Uber' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NK Cab & Taxi vs Ola vs Uber — Straight-Talk Comparison',
    description: 'Flat fares, zero surge, vetted drivers. Discover why riders move away from Ola and Uber.',
    images: [`${BUSINESS.domain}/herobanner.webp`],
  },
  alternates: { canonical: `${BUSINESS.domain}/kolkata-cab-vs-ola-uber/` },
  other: {
    thumbnail: `${BUSINESS.domain}/herobanner.webp`,
  },
};

const features = [
  { feature: 'Surge Pricing', ours: false, oursText: 'Absent — flat fares around the clock', ola: true, olaText: '2-3x in busy hours', uber: true, uberText: '2-4x in busy hours' },
  { feature: 'Night Surcharge', ours: false, oursText: 'Identical fare all hours', ola: true, olaText: '1.5x past 11 PM', uber: true, uberText: '1.25-2x after dark' },
  { feature: 'Festival Pricing', ours: false, oursText: 'Prices steady across Durga Puja, Diwali', ola: true, olaText: '3-5x in Puja week', uber: true, uberText: '3-5x in Puja week' },
  { feature: 'Booking Channel', ours: true, oursText: 'Phone, WhatsApp, or website', ola: true, olaText: 'App only', uber: true, uberText: 'App only' },
  { feature: 'Driver Screening', ours: true, oursText: 'Police-checked, 5+ years on road', ola: true, olaText: 'Standard background check', uber: true, uberText: 'Standard background check' },
  { feature: 'Pre-Planned Bookings', ours: true, oursText: 'Reserve days ahead', ola: true, olaText: 'Rarely available', uber: true, uberText: 'Rarely available' },
  { feature: 'Outstation Trips', ours: true, oursText: '500+ routes, single-leg from ₹12/km', ola: false, olaText: 'Very few routes', uber: false, uberText: 'Not offered' },
  { feature: 'Wedding Cars', ours: true, oursText: 'Bedecked Crysta from ₹5,000/day', ola: false, olaText: 'Not offered', uber: false, uberText: 'Not offered' },
  { feature: 'Corporate Deals', ours: true, oursText: 'Month-to-month plans with GST bills', ola: true, olaText: 'Ola Corporate', uber: true, uberText: 'Uber for Business' },
  { feature: 'Cancellation Rules', ours: true, oursText: 'No charge 4 hours ahead', ola: false, olaText: '₹50-100 charge', uber: false, uberText: '₹50-150 charge' },
  { feature: 'Payment Choices', ours: true, oursText: 'Cash, UPI, cards, or bank transfer', ola: true, olaText: 'In-app payment, UPI', uber: true, uberText: 'In-app payment, UPI' },
  { feature: 'Flight Monitoring', ours: true, oursText: 'Live flight updates, no wait fees', ola: false, olaText: 'Not offered', uber: false, uberText: 'Not offered' },
  { feature: 'Tempo Travellers', ours: true, oursText: '12-17 seaters on call', ola: false, olaText: 'Not offered', uber: false, uberText: 'Not offered' },
  { feature: 'App Requirement', ours: true, oursText: 'No download — phone us', ola: false, olaText: 'App download required', uber: false, uberText: 'App download required' },
];

const faqs = [
  { question: 'Does NK Cab & Taxi beat Ola for outstation journeys?', answer: `Yes. Ola serves very few long-distance routes out of Kolkata. ${BUSINESS.name} runs 500+ outstation routes such as Kolkata to Darjeeling (₹6,500), Puri (₹5,500), Digha (₹2,500), and Siliguri (₹6,000). Single-leg pricing means you never pay for the return.` },
  { question: 'Why does NK Cab & Taxi avoid surge pricing?', answer: `We follow a fixed-fare model. Our prices are set in advance by distance and car type. At 3 AM, during Durga Puja, on New Year's Eve, or in heavy rain — the fare never moves. That sets us apart from the algorithm-driven pricing used by Ola and Uber.` },
  { question: 'Can I book a cab without any app?', answer: `Of course. Ring ${BUSINESS.phone} or message us on WhatsApp. No download, no sign-up, no OTP checks. Your ride is confirmed in under two minutes with full driver and vehicle information.` },
  { question: 'What makes your chauffeurs stand out from Ola and Uber drivers?', answer: 'Our chauffeurs are career professionals rather than occasional gig workers. Each is police-verified, holds at least five years of commercial driving experience, knows the city streets, and has undergone customer-service training. They handle the same car daily and keep it in excellent condition.' },
  { question: 'How safe is NK Cab & Taxi compared with Ola and Uber?', answer: `Every car we run is GPS-monitored with live location sharing. Before pickup you receive the driver's name, photo, mobile number, and registration plate. Drivers are police-checked, and help is available 24/7 at ${BUSINESS.phone}. For women travellers we can also assign a female-preferred chauffeur on request.` },
  { question: 'Is NK Cab & Taxi more affordable than Uber?', answer: 'In ordinary traffic our fares sit close to Ola and Uber. The difference shows in rush hour, festivals, rain, or after dark, when Ola and Uber climb 2-5x while ours hold firm. Across a year, our regulars save an estimated 30-50% versus app taxis.' },
  { question: 'Does NK Cab & Taxi offer airport rides like Ola and Uber?', answer: `We do — and with more care. Our airport service monitors flights in real time, so a delayed arrival is handled automatically by your chauffeur with no wait fee. Airport fares are flat: Salt Lake ₹1,200, Park Street ₹1,200, Howrah ₹1,200 (sedan). Surge never applies.` },
  { question: 'Is NK Cab & Taxi a good fit for daily office travel?', answer: `Certainly. Monthly business plans come with 15-25% savings on standard pricing, a dedicated car, the same chauffeur daily, and a fixed timetable. GST bills are provided, and numerous tech firms across Salt Lake Sector V and New Town already rely on our corporate fleet.` },
];

export default function ComparisonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Kolkata Cab vs Ola vs Uber', url: `${BUSINESS.domain}/kolkata-cab-vs-ola-uber` },
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-14 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Kolkata Cab vs Ola vs Uber', href: '/kolkata-cab-vs-ola-uber' }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-4">
            <span className="text-gradient">NK Cab & Taxi</span> vs Ola vs Uber
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-6">
            A straight comparison — the reasons over 5,000 Kolkata riders have left app taxis behind for {BUSINESS.name}. Surge-free fares, set rates, vetted drivers, and extras that Ola and Uber simply do not provide.
          </p>
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg">
            <Phone size={18} /> Give Us a Try: {BUSINESS.phone}
          </a>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">Side-by-Side Feature Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-4 py-4 text-left text-sm font-bold w-1/4">Feature</th>
                  <th className="px-4 py-4 text-center text-sm font-bold w-1/4 bg-primary/20">🏆 {BUSINESS.name}</th>
                  <th className="px-4 py-4 text-center text-sm font-bold w-1/4">Ola</th>
                  <th className="px-4 py-4 text-center text-sm font-bold w-1/4">Uber</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-semibold text-secondary text-sm border-r border-gray-100">{f.feature}</td>
                    <td className="px-4 py-3 text-center text-sm bg-green-50/50 border-r border-gray-100">
                      <div className="flex items-center justify-center gap-1.5">
                        {f.feature === 'Surge Pricing' || f.feature === 'Night Surcharge' || f.feature === 'Festival Pricing'
                          ? <XCircle size={16} className="text-green-500" />
                          : <CheckCircle size={16} className="text-green-500" />}
                        <span className="text-green-700 font-medium">{f.oursText}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-sm border-r border-gray-100">
                      <span className={f.feature === 'Surge Pricing' || f.feature === 'Night Surcharge' || f.feature === 'Festival Pricing' ? 'text-red-500' : 'text-gray-500'}>{f.olaText}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      <span className={f.feature === 'Surge Pricing' || f.feature === 'Night Surcharge' || f.feature === 'Festival Pricing' ? 'text-red-500' : 'text-gray-500'}>{f.uberText}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">The Reasons Riders Move to <span className="text-primary">{BUSINESS.name}</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <CreditCard size={24} />, title: 'No Surge, Ever', desc: 'Ola and Uber raise fares 2-5x for Durga Puja, rain, or late nights. Our rate stays identical, no matter when. Pocket 30-50% more savings in peak hours.' },
              { icon: <Shield size={24} />, title: 'Professional Chauffeurs', desc: 'Not occasional gig workers. Full-time, police-checked chauffeurs with 5+ years of experience and total command of Kolkata streets.' },
              { icon: <Phone size={24} />, title: 'No App Required', desc: 'Simply call or WhatsApp. Skip downloads, skip sign-ups, skip OTP loops. Booking takes two minutes, done.' },
              { icon: <Car size={24} />, title: 'Outstation Experts', desc: '500+ long-distance routes Ola and Uber do not cover, including Kolkata to Darjeeling, Puri, Digha, and Sundarbans — one-way from ₹12/km.' },
              { icon: <Clock size={24} />, title: 'Bookings Made Ahead', desc: 'Reserve days or weeks in advance with guaranteed car allocation, ideal for airport runs, weddings, and scheduled travel.' },
              { icon: <MapPin size={24} />, title: 'Airport Specialists', desc: 'Live flight monitoring, a greeting at the arrival gate, and zero wait charges for delays. Airport fares stay fixed — never fluctuating.' },
            ].map((card, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary mb-4">{card.icon}</div>
                <h3 className="font-bold text-secondary text-lg mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">Fare Comparison — Real-Life Examples</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-4 py-3 text-left text-sm">Route</th>
                  <th className="px-4 py-3 text-center text-sm bg-primary/20">🏆 Our Rate</th>
                  <th className="px-4 py-3 text-center text-sm">Ola (Peak)</th>
                  <th className="px-4 py-3 text-center text-sm">Uber (Peak)</th>
                  <th className="px-4 py-3 text-center text-sm text-green-300">Your Saving</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { route: 'Airport → Salt Lake', ours: '₹1,200', ola: '₹2,200–1,800', uber: '₹1,400–2,000', save: '₹200–800' },
                  { route: 'Airport → Howrah', ours: '₹1,200', ola: '₹1,800–2,500', uber: '₹1,600–2,800', save: '₹400–1,600' },
                  { route: 'Kolkata → Darjeeling', ours: '₹6,500', ola: 'Unavailable', uber: 'Unavailable', save: '—' },
                  { route: 'Kolkata → Digha', ours: '₹2,500', ola: 'Unavailable', uber: 'Unavailable', save: '—' },
                  { route: 'Park Street → New Town', ours: '₹700', ola: '₹900–1,400', uber: '₹1800–1,500', save: '₹200–800' },
                  { route: 'Puja-Night City Ride', ours: '₹12/km', ola: '₹33–55/km', uber: '₹30–50/km', save: '60–80%' },
                ].map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-semibold text-secondary text-sm">{r.route}</td>
                    <td className="px-4 py-3 text-center font-bold text-primary text-sm bg-green-50/50">{r.ours}</td>
                    <td className="px-4 py-3 text-center text-red-500 text-sm">{r.ola}</td>
                    <td className="px-4 py-3 text-center text-red-500 text-sm">{r.uber}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 text-sm">{r.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">* Peak-season figures for Ola/Uber come from rider reports gathered during Durga Puja and the monsoons. Our pricing remains constant throughout the year.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} title="NK Cab & Taxi vs Ola vs Uber — Questions and Answers" />
        </div>
      </section>

      {/* CTA */}
      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Move to a Fixed-Fare Cab Service</h2>
          <p className="text-white/90 mb-6">No surge, no app, no fuss. Just phone and go.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hello! I would like to use your cab service in place of Ola or Uber.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
