import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS, getAllStates } from '@/lib/data';
import { getPopularRoutes } from '@/lib/routeData';
import { generateFaqSchema, generateBreadcrumbSchema, generateServiceTypeSchema } from '@/lib/seo';
import { Phone, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: `Outstation Taxi Kolkata ₹12/km | One-Way & Round Trip | 500+ Routes | ${BUSINESS.name}`,
  description: `Intercity cab from Kolkata on 500+ routes. Sedan ₹12/km, SUV ₹16/km, Innova ₹18/km. Darjeeling, Puri, Digha, Ranchi, Jamshedpur, Bhubaneswar. Round-the-clock booking. Call ${BUSINESS.phone}.`.slice(0, 160),
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  alternates: { canonical: `${BUSINESS.domain}/services/outstation/` },
  openGraph: {
    title: `Outstation Taxi Kolkata ₹12/km | 500+ Routes | ${BUSINESS.name}`,
    description: `Outstation cabs from Kolkata to 500+ cities. Sedan ₹12/km | SUV ₹16/km | Innova ₹18/km. One-way & round trips. Round the clock with flat fares. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/services/outstation`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `Outstation Taxi Service Kolkata — ${BUSINESS.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Outstation Taxi Kolkata ₹12/km | 500+ Routes | ${BUSINESS.name}`,
    description: `Intercity taxi from Kolkata at ₹12/km sedan. Darjeeling, Puri, Ranchi, Bhubaneswar & more. Fixed fares. Call ${BUSINESS.phone}`,
  },
};

export default async function OutstationPage() {
  const states = getAllStates();
  const routes = await getPopularRoutes(12);

  const faqs = [
    { question: 'What does outstation cab service from Kolkata mean?', answer: `An outstation cab from Kolkata is an intercity taxi that carries you between Kolkata and other towns. ${BUSINESS.name} serves 500+ routes from Kolkata, including Darjeeling, Puri, Ranchi, Bhubaneswar, Digha, Siliguri and Jamshedpur, as one-way or round trips. Call ${BUSINESS.phone}.` },
    { question: 'How is outstation cab fare from Kolkata charged?', answer: 'Outstation fares from Kolkata: Sedan ₹12/km, SUV ₹16/km, Innova Crysta ₹18/km and Tempo Traveller ₹22/km. Fuel and driver charges sit inside these rates; tolls and parking are billed separately. Multi-day journeys include a ₹300/day driver allowance.' },
    { question: 'Is there a minimum distance for outstation bookings?', answer: 'One-way journeys from Kolkata require at least 150 km per day, and round trips 250 km per day. The ₹300/day driver allowance is already part of the fare.' },
    { question: 'On multi-day outstation trips, is driver accommodation covered?', answer: 'Yes — on multi-day round trips from Kolkata the driver stay is part of the fare, and the driver arranges his own lodging at the destination.' },
    { question: 'Are stops allowed during an outstation trip from Kolkata?', answer: 'Certainly — multiple stops and sightseeing detours are welcome. Extra kilometres are billed at the per-km rate, so share your full itinerary while booking for the smoothest experience.' },
    { question: 'Which cab suits a Kolkata to Darjeeling journey best?', answer: 'For the 600 km Kolkata–Darjeeling run, Innova Crysta or Ertiga are our picks — both manage hill roads comfortably. The stretch is about 600 km and estimates land near ₹7,200–₹9,600. Reserve by call or WhatsApp.' },
  ];

  const fareData = [
    { vehicle: 'Sedan (Swift Dzire / Amaze)', perKm: '₹12', dayMin: '₹2,400', note: '200 km/day min (RT)' },
    { vehicle: 'SUV (Ertiga / Innova)', perKm: '₹16', dayMin: '₹3,200', note: '200 km/day min (RT)' },
    { vehicle: 'Innova Crysta', perKm: '₹18', dayMin: '₹3,600', note: '200 km/day min (RT)' },
    { vehicle: 'Tempo Traveller', perKm: '₹22', dayMin: '₹4,400', note: '200 km/day min (RT)' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceTypeSchema('Outstation Cab Service Kolkata', 'outstation', 'Easy intercity taxi service from Kolkata spanning 500+ routes, available as one-way or round trips.')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Services', url: `${BUSINESS.domain}/services` },
        { name: 'Outstation Cab', url: `${BUSINESS.domain}/services/outstation` }
      ])) }} />

      <section className="relative text-white py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Services', href: '/services' }, { name: 'Outstation Cab', href: '/services/outstation' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">Outstation <span className="text-gradient">Cab Service</span> from Kolkata ₹12/km | Reserve Online</h1>
          <p className="text-lg text-gray-300 max-w-3xl">Outstation cabs from Kolkata to 500+ destinations. AC Sedan ₹12/km, SUV ₹16/km, Innova Crysta ₹18/km. One-way & round trips with police-verified drivers and flat fares, day and night. Call {BUSINESS.phone}.</p>
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
                <h2 className="text-2xl font-bold text-secondary mb-4">Outstation Cabs from Kolkata — Intercity Travel Across East India</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>{BUSINESS.name}</strong> runs outstation taxi service from Kolkata across 500+ intercity routes that connect West Bengal, Jharkhand and Odisha. Whether it is a business visit, a family holiday, a pilgrimage or a wedding — our outstation cabs from Kolkata come with AC vehicles, courteous chauffeurs and straightforward pricing.
                  </p>
                  <p>
                    Favourite outstation destinations from Kolkata include Darjeeling (600 km), Digha (185 km), Puri (500 km), Siliguri (560 km), Ranchi (400 km), Jamshedpur (270 km), Bhubaneswar (450 km), Durgapur (180 km) and Dhanbad (300 km). One-way and round-trip options are both available on every route.
                  </p>
                  <p>
                    Our outstation fares from Kolkata are easy to follow: Sedan ₹12/km, SUV ₹16/km, Innova Crysta ₹18/km and Tempo Traveller ₹22/km. Fuel and driver charges are built into these rates. Tolls, parking and state permit fees are billed as incurred, and a ₹300/night driver allowance is covered for multi-day trips.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Reasons to Book an Outstation Cab from Kolkata with Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'One-way outstation — no return-leg charge',
                    'Round trip outstation — driver stays for multi-day trips',
                    'No minimum-distance cap for shorter runs',
                    'AC fleet — Swift Dzire, Ertiga, Innova Crysta, Tempo Traveller',
                    'Police-verified chauffeurs with outstation experience',
                    'Live WhatsApp updates at every stage of the trip',
                    'Multiple stops and sightseeing detours are allowed',
                    'Driver allowance & stay covered on round trips',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fare Table */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Outstation Cab Rates from Kolkata</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-secondary text-white">
                        <th className="px-4 py-3 text-left text-sm">Vehicle Type</th>
                        <th className="px-4 py-3 text-center text-sm">Per KM</th>
                        <th className="px-4 py-3 text-center text-sm">Minimum / Day</th>
                        <th className="px-4 py-3 text-center text-sm">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fareData.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-semibold text-secondary text-sm">{row.vehicle}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">{row.perKm}</td>
                          <td className="px-4 py-3 text-center text-gray-600 text-sm">{row.dayMin}</td>
                          <td className="px-4 py-3 text-center text-gray-400 text-xs">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">* Toll, parking & state permits extra. Driver allowance ₹300/night included.</p>
              </div>

              {/* Popular Routes */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Top Outstation Routes from Kolkata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {routes.map(r => (
                    <Link key={r.slug} href={`/routes/${r.slug}`} className="route-card bg-white rounded-xl p-3 border border-gray-100 hover:border-primary/30 transition-colors">
                      <p className="font-semibold text-secondary text-sm">{r.fromName} → {r.toName}</p>
                      <p className="text-xs text-gray-500 mt-1">{r.distance} km • From ₹{r.priceSaloon}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* All cities */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Outstation Cabs across All Cities</h3>
                {states.map(state => (
                  <div key={state.slug} className="mb-4">
                    <h4 className="font-semibold text-secondary text-sm mb-2">{state.name}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {state.cities.map(city => (
                        <Link key={city.slug} href={`/${state.slug}/${city.slug}/outstation`} className="text-xs text-primary hover:underline bg-accent px-2 py-1 rounded-full">{city.name}</Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">Reserve an Outstation Cab</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><FAQSection faqs={faqs} title="Outstation Cab from Kolkata — Common Questions" /></div></section>

      {/* Multi-City Coverage — SEO Content + Internal Links */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-4">Outstation Cabs in <span className="text-primary">Other Cities</span></h2>
          <p className="text-gray-600 mb-6">
            Outstation travel is not limited to Kolkata. {BUSINESS.name} also runs outstation taxi services from <strong>Ranchi</strong> (to Jamshedpur, Dhanbad, Kolkata, Deoghar), <strong>Jamshedpur</strong> (to Kolkata, Ranchi, Dhanbad, Bokaro), <strong>Bhubaneswar</strong> (to Puri, Konark, Cuttack, Kolkata) and 80+ other cities across West Bengal, Jharkhand, Odisha, Bihar and Uttar Pradesh. Same fleet, same rates, same service standards.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: 'Ranchi', href: '/jharkhand/ranchi', desc: 'Outstation to Kolkata, Deoghar & more' },
              { name: 'Jamshedpur', href: '/jharkhand/jamshedpur', desc: 'Outstation to Kolkata, Ranchi & more' },
              { name: 'Bhubaneswar', href: '/odisha/bhubaneswar', desc: 'Outstation to Puri, Kolkata & more' },
              { name: 'Dhanbad', href: '/jharkhand/dhanbad', desc: 'Outstation to Ranchi, Kolkata & more' },
              { name: 'Siliguri', href: '/west-bengal/siliguri', desc: 'Outstation to Darjeeling, Kolkata' },
              { name: 'Durgapur', href: '/west-bengal/durgapur', desc: 'Outstation to Kolkata, Asansol' },
              { name: 'Bokaro', href: '/jharkhand/bokaro', desc: 'Outstation to Ranchi, Jamshedpur' },
              { name: 'Puri', href: '/odisha/puri', desc: 'Outstation to Bhubaneswar, Konark' },
            ].map((city) => (
              <Link key={city.name} href={city.href} className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">🚗 {city.name}</p>
                <p className="text-xs text-gray-400 mt-1">{city.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve an Outstation Cab from Kolkata</h2>
          <p className="text-white/90 mb-6">500+ routes from Kolkata, Ranchi & Bhubaneswar. One-way and round trips. AC fleet, verified chauffeurs, flat fares.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I would like to book an outstation cab from Kolkata.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
