import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS } from '@/lib/data';
import { getPopularRoutes } from '@/lib/routeData';
import { generateFaqSchema, generateBreadcrumbSchema, generateServiceTypeSchema } from '@/lib/seo';
import { Phone, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: `Round Trip Cab Kolkata | Driver Stays With You | Darjeeling, Puri & More | ${BUSINESS.name}`,
  description: `Multi-day round trip cab from Kolkata. Driver stays throughout your tour. Sedan ₹12/km, Innova ₹18/km. Darjeeling 4–5 days, Puri 3–4 days, Varanasi 5–6 days. Call ${BUSINESS.phone}.`.slice(0, 160),
  keywords: [
    'round trip cab kolkata', 'round trip taxi kolkata', 'kolkata round trip cab',
    'multi day cab kolkata', 'driver stays kolkata tour', 'kolkata to darjeeling round trip cab',
    'kolkata to puri round trip', 'kolkata to varanasi round trip cab',
    'tour cab kolkata', 'pilgrimage cab kolkata', 'family tour cab from kolkata',
    'kolkata round trip package', 'driver accommodation included kolkata', 'kolkata holiday cab',
  ],
  alternates: { canonical: `${BUSINESS.domain}/services/round-trip` },
  openGraph: {
    title: `Round Trip Cab Kolkata | Driver Stays | Darjeeling, Puri, Varanasi | ${BUSINESS.name}`,
    description: `Multi-day round trip from Kolkata with driver accommodation included. Darjeeling 4–5 days, Puri 3–4 days. Sedan ₹12/km. Fixed fares. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/services/round-trip`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `Round Trip Taxi Service Kolkata — ${BUSINESS.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Round Trip Cab Kolkata | Driver Stays With You | ${BUSINESS.name}`,
    description: `Multi-day tour cabs from Kolkata. Driver stays all days. Darjeeling, Puri, Varanasi. Fixed fares. Call ${BUSINESS.phone}`,
  },
};

export default async function RoundTripPage() {
  const routes = await getPopularRoutes(9);

  const faqs = [
    { question: 'What does round trip cab service from Kolkata mean?', answer: `Round trip cab from Kolkata means the driver starts with you in Kolkata, stays with you for the whole tour, and finally brings you back to Kolkata. It suits multi-day tours, pilgrimages and family holidays. Call ${BUSINESS.phone}.` },
    { question: 'How is the round trip fare from Kolkata calculated?', answer: 'Round trip fares from Kolkata: Sedan ₹12/km (min 250 km/day), SUV ₹16/km, Innova Crysta ₹18/km, Tempo Traveller ₹22/km. A ₹300/night driver allowance is included. Tolls and parking are billed as incurred.' },
    { question: 'How is a round trip different from a one-way cab?', answer: 'One-way: the driver drops you at your destination and returns; you pay only one side. Round trip: the driver remains with you for the entire itinerary including the return. Choose round trip when you want the cab at your disposal throughout your stay.' },
    { question: 'Can I take a Kolkata to Darjeeling-Gangtok round trip?', answer: 'Yes — our most booked round trip from Kolkata is Darjeeling-Gangtok (5–7 days). We recommend the Innova Crysta, which handles mountain roads very well. Full itinerary help and sightseeing stops are included. Call for a custom quote.' },
    { question: 'Is driver accommodation covered on a round trip?', answer: 'Yes — driver accommodation is part of every round trip booking from Kolkata. The driver arranges his own stay at each destination, and the ₹300/night driver allowance is already inside the quoted fare.' },
    { question: 'Which round trip packages are popular from Kolkata?', answer: 'Favourite round trips from Kolkata: Kolkata-Digha-Kolkata (2 days), Kolkata-Darjeeling-Kolkata (4–5 days), Kolkata-Puri-Konark-Kolkata (3–4 days), Kolkata-Varanasi-Ayodhya-Kolkata (5–6 days) and Kolkata-Sundarbans-Kolkata (2–3 days).' },
  ];

  const popularTours = [
    { name: 'Kolkata → Darjeeling → Kolkata', days: '4–5 Days', dist: '600 km', price: '₹9,600', vehicle: 'Innova Crysta' },
    { name: 'Kolkata → Puri → Konark → Kolkata', days: '3–4 Days', dist: '500 km', price: '₹8,000', vehicle: 'Sedan / SUV' },
    { name: 'Kolkata → Digha → Mandarmani → Kolkata', days: '2 Days', dist: '200 km', price: '₹3,200', vehicle: 'Sedan' },
    { name: 'Kolkata → Sundarbans → Kolkata', days: '2–3 Days', dist: '150 km', price: '₹2,400', vehicle: 'Sedan' },
    { name: 'Kolkata → Varanasi → Ayodhya → Kolkata', days: '5–6 Days', dist: '700 km', price: '₹11,200', vehicle: 'Innova / Sedan' },
    { name: 'Kolkata → Siliguri → Kolkata', days: '2 Days', dist: '560 km', price: '₹8,000', vehicle: 'Sedan / SUV' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceTypeSchema('Round Trip Cab Service Kolkata', 'round-trip', 'Multi-day round trip cab service from Kolkata. Driver stays with you for the full tour. 500+ routes available.')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Services', url: `${BUSINESS.domain}/services` },
        { name: 'Round Trip', url: `${BUSINESS.domain}/services/round-trip` }
      ])) }} />

      <section className="relative text-white py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Services', href: '/services' }, { name: 'Round Trip', href: '/services/round-trip' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">Round Trip <span className="text-gradient">Cab Service</span> from Kolkata ₹12/km | Multi-Day Options</h1>
          <p className="text-lg text-gray-300 max-w-3xl">Multi-day round trip cab from Kolkata — the driver stays with you for the whole tour. Darjeeling, Puri, Digha & 500+ routes. Sedan ₹12/km, Innova ₹18/km.</p>
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
                <h2 className="text-2xl font-bold text-secondary mb-4">Round Trip Cabs from Kolkata — Multi-Day Tours</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Round trip cab service from Kolkata is the go-to pick for multi-day tours, pilgrimages and family trips. With <strong>{BUSINESS.name}</strong>&apos;s round trip booking, a dedicated driver joins you in Kolkata and stays for the full journey — covering every sightseeing leg, hotel-to-hotel transfers, and bringing you back safely to Kolkata.
                  </p>
                  <p>
                    Favourite round trip destinations from Kolkata include Darjeeling (4–5 days), Puri & Konark (3–4 days), Varanasi & Ayodhya (5–6 days), Digha & Mandarmani (2 days), Siliguri & North Bengal (3–4 days) and the Sundarbans National Park (2–3 days). All cars are AC, and the chauffeurs are experienced, police-verified professionals.
                  </p>
                  <p>
                    Round trip rates from Kolkata: Sedan ₹12/km, SUV ₹16/km, Innova Crysta ₹18/km — billed on a minimum 250 km/day. Driver allowance and accommodation are included, tolls and parking are extra. Cash, UPI and Card are all accepted.
                  </p>
                </div>
              </div>

              {/* Popular tour packages */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Popular Round Trip Packages from Kolkata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {popularTours.map((tour, i) => (
                    <div key={i} className="p-4 bg-accent/50 rounded-xl border border-primary/10">
                      <h4 className="font-bold text-secondary text-sm mb-2">{tour.name}</h4>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        <span>🗓️ {tour.days}</span>
                        <span>📍 {tour.dist}</span>
                        <span>🚗 {tour.vehicle}</span>
                      </div>
                      <p className="text-primary font-bold mt-2">{tour.price} <span className="text-xs font-normal text-gray-400">onwards</span></p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">* Sedan ₹12/km estimate, 250 km/day min. Toll & driver allowance included. Call for exact package price.</p>
              </div>

              {/* Fare */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Round Trip Rates from Kolkata</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-secondary text-white">
                        <th className="px-4 py-3 text-left text-sm">Vehicle</th>
                        <th className="px-4 py-3 text-center text-sm">Per KM</th>
                        <th className="px-4 py-3 text-center text-sm">Min / Day</th>
                        <th className="px-4 py-3 text-center text-sm">Driver Allowance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { v: 'Sedan (Dzire / Amaze)', km: '₹12', day: '₹3,000', da: '₹300/night' },
                        { v: 'SUV (Ertiga / Innova)', km: '₹16', day: '₹4,000', da: '₹300/night' },
                        { v: 'Innova Crysta', km: '₹18', day: '₹4,500', da: '₹300/night' },
                        { v: 'Tempo Traveller', km: '₹22', day: '₹5,500', da: '₹400/night' },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-semibold text-secondary text-sm">{row.v}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">{row.km}</td>
                          <td className="px-4 py-3 text-center text-gray-600 text-sm">{row.day}</td>
                          <td className="px-4 py-3 text-center text-gray-500 text-sm">{row.da}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">* 250 km/day minimum. Toll, parking & state permits extra.</p>
              </div>

              {/* why */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Why Book a Round Trip Cab from Kolkata with Us?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Driver stays with you for the entire journey',
                    'Flexible itinerary — change plans as you go',
                    'Plenty of sightseeing stops built in',
                    'Hotel-to-hotel transfers at each destination',
                    'Driver accommodation covered in the fare',
                    'Innova Crysta for mountain routes (Darjeeling, Gangtok)',
                    'WhatsApp itinerary confirmation before departure',
                    'Round-the-clock support during the trip',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              {/* Other routes */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">More Round Trip Routes from Kolkata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {routes.map(r => (
                    <Link key={r.slug} href={`/routes/${r.slug}`} className="route-card bg-white rounded-xl p-3 border border-gray-100">
                      <p className="font-semibold text-secondary text-sm">{r.fromName} → {r.toName}</p>
                      <p className="text-xs text-gray-500 mt-1">{r.distance} km • From ₹{r.priceSaloon * 2}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">Reserve a Round Trip Cab</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><FAQSection faqs={faqs} title="Round Trip Cab from Kolkata — Common Questions" /></div></section>

      {/* Multi-City Coverage */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-4">Round Trips from <span className="text-primary">Other Cities</span></h2>
          <p className="text-gray-600 mb-6">
            Round trip service is also available from <strong>Ranchi</strong> (to Deoghar, Kolkata, Hazaribagh), <strong>Jamshedpur</strong> (to Kolkata, Ranchi, Parasnath), <strong>Bhubaneswar</strong> (to Puri, Konark, Chilika) and 80+ more cities, with the same driver-stays-with-you experience.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: 'Ranchi', href: '/jharkhand/ranchi' },
              { name: 'Jamshedpur', href: '/jharkhand/jamshedpur' },
              { name: 'Bhubaneswar', href: '/odisha/bhubaneswar' },
              { name: 'Dhanbad', href: '/jharkhand/dhanbad' },
              { name: 'Siliguri', href: '/west-bengal/siliguri' },
              { name: 'Puri', href: '/odisha/puri' },
            ].map((city) => (
              <Link key={city.name} href={city.href} className="group p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-all text-center">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">🔄 {city.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve a Round Trip — Kolkata, Ranchi & More</h2>
          <p className="text-white/90 mb-6">Multi-day tours with a dedicated driver. Darjeeling, Puri, Varanasi & beyond.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I would like to book a round trip cab.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
