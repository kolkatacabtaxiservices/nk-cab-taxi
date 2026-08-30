import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS } from '@/lib/data';
import { getPopularRoutes } from '@/lib/routeData';
import { generateFaqSchema, generateBreadcrumbSchema, generateServiceTypeSchema } from '@/lib/seo';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: `One Way Cab Kolkata ₹12/km | No Return Fare | 500+ Routes | ${BUSINESS.name}`,
  description: `One-way taxi from Kolkata — pay only for the trip you take, zero return charges. Sedan ₹12/km. Kolkata→Digha ₹2,280, →Ranchi ₹4,800, →Puri ₹5,880. 500+ destinations. Call ${BUSINESS.phone}.`.slice(0, 160),
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  alternates: { canonical: `${BUSINESS.domain}/services/one-way/` },
  openGraph: {
    title: `One Way Cab Kolkata ₹12/km | No Return Fare | ${BUSINESS.name}`,
    description: `One-way cab from Kolkata to 500+ cities. Pay only one side. Sedan ₹12/km. Digha, Puri, Ranchi, Darjeeling covered. Flat fares. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/services/one-way`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `One Way Taxi Service Kolkata — ${BUSINESS.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `One Way Cab Kolkata ₹12/km | No Return Fare`,
    description: `One-way taxi from Kolkata. 500+ routes. Pay only for the distance you travel. Fixed fares. Call ${BUSINESS.phone}`,
  },
};

export default async function OneWayPage() {
  const routes = await getPopularRoutes(12);

  const faqs = [
    { question: 'What does one-way taxi service from Kolkata mean?', answer: `One-way taxi from Kolkata means you pay only for your journey from Kolkata to your destination — there is no return charge. It is ideal when you do not need the cab to travel back. ${BUSINESS.name} runs one-way cabs from Kolkata to 500+ destinations across West Bengal, Jharkhand, Odisha, Bihar & Uttar Pradesh. Call ${BUSINESS.phone}.` },
    { question: 'How affordable is a one-way cab from Kolkata?', answer: 'One-way cabs from Kolkata start at ₹12/km for a Sedan (Swift Dzire). For reference: Kolkata to Durgapur (170 km) ≈ ₹2,040; Kolkata to Digha (190 km) ≈ ₹2,280; Kolkata to Ranchi (400 km) ≈ ₹4,800. No hidden fees.' },
    { question: 'How is one-way different from a round trip?', answer: 'One-way: you pay for the single journey only, and the driver does not wait for a return. Round trip: the driver stays with you for the whole itinerary including the return leg, which costs more but suits day trips where you want the driver on standby.' },
    { question: 'Can I take a one-way cab from Kolkata airport?', answer: `Yes! We offer one-way cabs from Kolkata airport (CCU) to any destination. This is ideal for travellers landing in Kolkata and moving on to another city without needing a return cab. Call ${BUSINESS.phone}.` },
    { question: 'Do you do one-way rides under 100 km?', answer: 'Yes, one-way service is available for routes as short as 50 km. A minimum billing distance (usually 150 km) applies. For very short hops, local taxi packages often make more sense.' },
    { question: 'What payment options are there for one-way cabs from Kolkata?', answer: 'We accept Cash, UPI (Google Pay, PhonePe, Paytm), Credit Card, Debit Card and Bank Transfer. Settle at the end of the trip or pay in advance at booking.' },
  ];

  const popularOneWay = [
    { from: 'Kolkata', to: 'Digha', dist: '190 km', price: '₹2,280' },
    { from: 'Kolkata', to: 'Durgapur', dist: '165 km', price: '₹1,980' },
    { from: 'Kolkata', to: 'Asansol', dist: '200 km', price: '₹2,400' },
    { from: 'Kolkata', to: 'Ranchi', dist: '400 km', price: '₹4,800' },
    { from: 'Kolkata', to: 'Jamshedpur', dist: '270 km', price: '₹3,240' },
    { from: 'Kolkata', to: 'Bhubaneswar', dist: '450 km', price: '₹5,400' },
    { from: 'Kolkata', to: 'Puri', dist: '490 km', price: '₹5,880' },
    { from: 'Kolkata', to: 'Darjeeling', dist: '600 km', price: '₹7,200' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceTypeSchema('One Way Taxi Service Kolkata', 'one-way', 'Budget one-way cab service from Kolkata. Pay for a single-direction journey. 500+ routes covered.')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Services', url: `${BUSINESS.domain}/services` },
        { name: 'One Way Taxi', url: `${BUSINESS.domain}/services/one-way` }
      ])) }} />

      <section className="relative text-white py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Services', href: '/services' }, { name: 'One Way Taxi', href: '/services/one-way' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">One Way <span className="text-gradient">Taxi Service</span> from Kolkata ₹12/km | Pay One Side Only</h1>
          <p className="text-lg text-gray-300 max-w-3xl">Pay only for one direction — no return charges. One of the most wallet-friendly cab services from Kolkata to all major cities. Round-the-clock reservations, AC fleet, verified chauffeurs.</p>
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg">
            <Phone size={18} /> Book Now: {BUSINESS.phone}
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-4">One-Way Cabs from Kolkata — Pay Only One Direction</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    One-way taxi service from Kolkata is the most economical choice for point-to-point intercity travel. With {BUSINESS.name}&apos;s one-way cabs, you are billed only for the stretch from your pickup to your drop — no return charges, no waiting charges, and no surprises.
                  </p>
                  <p>
                    Whether you are heading to Digha for a beach break, Durgapur for a work meeting, Ranchi for a family visit, or Bhubaneswar to continue onward — our one-way cabs are the smart pick. Sedan (Swift Dzire, Honda Amaze) starts at ₹12/km, making it the lowest-priced intercity cab from Kolkata.
                  </p>
                  <p>
                    One-way service covers 500+ routes across West Bengal, Jharkhand, Odisha, Bihar and Uttar Pradesh. One-way cabs are also available from <strong>Ranchi</strong> (to Kolkata, Jamshedpur, Dhanbad), <strong>Jamshedpur</strong> (to Kolkata, Ranchi, Bokaro) and <strong>Bhubaneswar</strong> (to Puri, Kolkata, Cuttack). Every vehicle is AC, serviced, and handled by police-verified chauffeurs who know the routes well.
                  </p>
                </div>
              </div>

              {/* Why one-way */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Why Pick a One-Way Cab from Kolkata?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Pay for one direction only — big savings vs round trip',
                    'No waiting charges or surprise return fares',
                    'Perfect when your return leg is by train or flight',
                    'Sedan ₹12/km — lowest-priced intercity cab option',
                    'Available round the clock — even for early flights',
                    'Doorstep pickup at home, station, or airport',
                    'WhatsApp confirmation in about 2 minutes',
                    'Full fleet — Sedan, SUV, Innova, Tempo Traveller',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fare examples */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Sample One-Way Fares from Kolkata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {popularOneWay.map((route, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-accent/50 rounded-xl border border-primary/10">
                      <div className="flex items-center gap-2">
                        <ArrowRight size={16} className="text-primary" />
                        <div>
                          <p className="font-semibold text-secondary text-sm">{route.from} → {route.to}</p>
                          <p className="text-xs text-gray-400">{route.dist}</p>
                        </div>
                      </div>
                      <span className="font-bold text-primary">{route.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">* Sedan ₹12/km estimate. Toll & parking extra. Call for exact quote.</p>
              </div>

              {/* Popular routes */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">One-Way Cab Routes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {routes.map(r => (
                    <Link key={r.slug} href={`/routes/${r.slug}`} className="route-card bg-white rounded-xl p-3 border border-gray-100">
                      <p className="font-semibold text-secondary text-sm">{r.fromName} → {r.toName}</p>
                      <p className="text-xs text-gray-500 mt-1">{r.distance} km • From ₹{r.priceSaloon}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">Reserve a One-Way Cab</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><FAQSection faqs={faqs} title="One-Way Cab from Kolkata — Common Questions" /></div></section>

      {/* Multi-City Coverage */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-4">One-Way Cabs from <span className="text-primary">Other Cities</span></h2>
          <p className="text-gray-600 mb-6">
            One-way travel is not just for Kolkata. {BUSINESS.name} runs one-way cabs from <strong>Ranchi, Jamshedpur, Bhubaneswar, Dhanbad, Siliguri, Durgapur</strong> and 80+ other cities, with the same straightforward pricing — pay only for one direction.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: 'Ranchi', href: '/jharkhand/ranchi' },
              { name: 'Jamshedpur', href: '/jharkhand/jamshedpur' },
              { name: 'Bhubaneswar', href: '/odisha/bhubaneswar' },
              { name: 'Dhanbad', href: '/jharkhand/dhanbad' },
              { name: 'Siliguri', href: '/west-bengal/siliguri' },
              { name: 'Durgapur', href: '/west-bengal/durgapur' },
              { name: 'Bokaro', href: '/jharkhand/bokaro' },
              { name: 'Puri', href: '/odisha/puri' },
            ].map((city) => (
              <Link key={city.name} href={city.href} className="group p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-all text-center">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">🚗 {city.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve a One-Way Cab — Kolkata, Ranchi, Jamshedpur</h2>
          <p className="text-white/90 mb-6">Pay one direction only. Best rates. Round-the-clock reservations with instant confirmation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I would like to book a one-way cab.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
