import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS, getLocalPackages } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema, generateServiceTypeSchema } from '@/lib/seo';
import { MapPin, Phone, CheckCircle, Clock, Car } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: `Kolkata Local Taxi ₹1,800/4hr | Hourly Cab Rental 24/7 | ${BUSINESS.name}`,
  description: `Hourly local taxi in Kolkata — 4hr/40km Sedan ₹1,800, 8hr/80km ₹2,800, SUV ₹2,500. Hospital visits, airport drops, sightseeing, shopping. Covers Salt Lake, New Town, Howrah, Behala. Call ${BUSINESS.phone}.`.slice(0, 160),
  keywords: [
    'local taxi kolkata', 'kolkata local cab', 'hourly cab kolkata', 'cab on rent kolkata',
    'local taxi booking kolkata', 'local cab service kolkata', 'cab for hospital kolkata',
    'salt lake taxi', 'new town cab', 'howrah taxi', 'dum dum cab',
    'half day cab kolkata', 'full day taxi kolkata', 'kolkata city cab rent',
    'kolkata sightseeing cab', 'cab for shopping kolkata', 'local innova kolkata',
  ],
  alternates: { canonical: `${BUSINESS.domain}/services/local-taxi` },
  openGraph: {
    title: `Local Taxi Kolkata ₹1,800/4hr | Hourly Cab on Rent | ${BUSINESS.name}`,
    description: `Hourly cab rental in Kolkata from ₹1,800 (4hr/40km). Hospital, airport, shopping, sightseeing. Salt Lake, New Town, Howrah covered. No surge. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/services/local-taxi`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `Local Taxi Kolkata — ${BUSINESS.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Local Taxi Kolkata ₹1,800/4hr | Hourly Cab | ${BUSINESS.name}`,
    description: `Hourly local cab in Kolkata from ₹1,800. All areas covered. No surge 24/7. Call ${BUSINESS.phone}`,
  },
};

export default function LocalTaxiPage() {
  const packages = getLocalPackages();

  const faqs = [
    { question: 'Which Kolkata package is right — 4hr or 8hr?', answer: 'Choose the 4hr/40km package (₹1,800 Sedan) if you have 2–3 stops within a small radius — hospital visit, bank, then home. Choose the 8hr/80km package (₹2,800 Sedan) if you need the driver all day: multiple offices, full-day shopping, or sightseeing across North and South Kolkata. Both packages include extra km/hr billing at ₹12/km for overuse.' },
    { question: 'Can the local taxi wait while I visit a hospital or office?', answer: `Yes — our local taxi drivers wait throughout your appointment without running the meter. Whether it\'s a 20-minute consultation at AMRI Salt Lake or a 3-hour procedure at SSKM Kolkata, your driver parks nearby and stays on call. No extra waiting charge within the package time. Call ${BUSINESS.phone} to book.` },
    { question: 'Is there traffic-aware routing in Kolkata cabs?', answer: 'Yes. Our Kolkata drivers know local traffic patterns well — EM Bypass vs Ultadanga, Gariahat routing during Pujas, the VIP Road vs New Town Expressway choice. They use live maps plus experience to avoid congestion. This local knowledge significantly reduces your actual travel time compared to app-based cabs.' },
    { question: 'Can I hire a local taxi for Kolkata Durga Puja pandal hopping?', answer: `Absolutely. Our local taxi packages are perfect for Durga Puja pandal hopping — we provide 8hr/80km or 12hr/120km packages for Puja nights. Unlike app cabs, our rates do NOT surge during festivals. You pay the same fixed rate on Ashtami night as on any regular day. Pre-book via WhatsApp to guarantee availability.` },
    { question: 'Do you serve outskirt areas like Barasat, Barrackpore, Howrah?', answer: `Yes! Our local taxi covers not just central Kolkata but also extended areas including Barasat, Barrackpore, Kamarhati, Belghoria, Sodepur, Howrah, Shibpur, Belur, Bally, Uttarpara, and Serampore. For distances beyond 40km, extra km charges (₹12/km Sedan) apply on top of the base package.` },
    { question: 'What vehicles are available for local taxi in Kolkata?', answer: 'We offer Sedan (Swift Dzire, Honda Amaze — 4 passengers, ₹1,800/4hr), SUV (Ertiga, Innova — 6 passengers, ₹2,500/4hr), Innova Crysta (7 passengers, ₹3,200/4hr), and Tempo Traveller (12 passengers, ₹3,500/4hr) for group travel. All are AC, clean, and sanitized before each trip.' },
  ];

  const localAreas = [
    'Salt Lake & Sector V', 'New Town & Rajarhat', 'Howrah', 'Dum Dum & Airport',
    'Park Street & BBD Bagh', 'Ballygunge', 'Gariahat', 'Behala',
    'Tollygunge', 'Jadavpur', 'Barasat', 'Dum Dum Cantonment',
    'Esplanade', 'Sealdah', 'Shyambazar', 'Ultadanga',
  ];

  const useCases = [
    { icon: '🏥', title: 'Hospital Visits', desc: 'Medical appointments, discharge & emergency — all hospitals covered.' },
    { icon: '✈️', title: 'Airport Transfer', desc: 'Pickup & drop at CCU (Netaji Subhash Airport), Dum Dum.' },
    { icon: '🎭', title: 'City Sightseeing', desc: 'Victoria Memorial, Dakshineswar, Belur Math & more.' },
    { icon: '🛍️', title: 'Shopping Trips', desc: 'New Market, South City Mall, Golpark & all major markets.' },
    { icon: '🏢', title: 'Office Travel', desc: 'Daily commute, client meetings, IT park transport.' },
    { icon: '🎓', title: 'School & College', desc: 'College admissions, exam centres & institutions.' },
    { icon: '🚂', title: 'Railway Station', desc: 'Howrah station, Sealdah station pickup & drop.' },
    { icon: '🎊', title: 'Events & Functions', desc: 'Weddings, parties, pujas, and family gatherings.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceTypeSchema('Local Taxi Service Kolkata', 'local-taxi', 'Hourly local cab rental service in Kolkata for city travel, hospital visits, sightseeing, and events. Sedan, SUV, Innova available.')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Services', url: `${BUSINESS.domain}/services` },
        { name: 'Local Taxi', url: `${BUSINESS.domain}/services/local-taxi` }
      ])) }} />

      <section className="relative text-white py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Services', href: '/services' }, { name: 'Local Taxi', href: '/services/local-taxi' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">Local <span className="text-gradient">Taxi Service</span> in Kolkata ₹1,800/4hr | Book Online 24/7</h1>
          <p className="text-lg text-gray-300 max-w-3xl">Hourly cab rental in Kolkata for hospital visits, airport, sightseeing, shopping & events. Starting ₹1,800 for 4 hrs/40 km. 24/7 availability, AC vehicles.</p>
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg">
            <Phone size={18} /> Book Now: {BUSINESS.phone}
          </a>
        </div>
      </section>

      {/* Trust row */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: '⏰', text: 'Hourly Rental Available' },
              { icon: '🌙', text: '24/7 Including Night' },
              { icon: '❄️', text: 'AC Vehicles Only' },
              { icon: '✅', text: 'No Advance Payment' },
              { icon: '📍', text: 'All Kolkata Areas' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-primary font-medium">
                <span>{b.icon}</span> {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">

              <div>
                <h2 className="text-2xl font-bold text-secondary mb-4">Local Taxi & Cab Service in Kolkata</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>{BUSINESS.name}</strong> provides reliable local taxi service in Kolkata for all kinds of city travel. Whether you need a cab for a hospital visit, daily office commute, school run, shopping trip, or city sightseeing — our local taxi service covers every corner of Kolkata, including Salt Lake, New Town, Howrah, Park Street, Dum Dum, Ballygunge, and all popular areas.
                  </p>
                  <p>
                    Our local taxi packages are based on time and km usage, making it easy to plan your budget. The 4-hour/40-km package is ideal for short trips like hospital visits, shopping, or two-three appointments. The 8-hour/80-km package is perfect for a full day of travel — multiple stops, city sightseeing, or office travel across Kolkata.
                  </p>
                  <p>
                    All local taxis are AC, well-maintained, and driven by experienced Kolkata-based drivers who know the city&apos;s traffic patterns and shortcuts. We pick up from your home, office, hotel, railway station (Howrah/Sealdah), and drop anywhere including Kolkata airport (CCU).
                  </p>
                </div>
              </div>

              {/* Packages table */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Local Taxi Packages in Kolkata (2026)</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-secondary text-white">
                        <th className="px-4 py-3 text-left text-sm">Package</th>
                        <th className="px-4 py-3 text-center text-sm">Sedan Fare</th>
                        <th className="px-4 py-3 text-center text-sm">SUV Fare</th>
                        <th className="px-4 py-3 text-center text-sm">Tempo Fare</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((pkg, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-semibold text-secondary text-sm">{pkg.name}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">₹{pkg.sedan}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">₹{pkg.suv}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">₹{pkg.tempo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">* Extra km charged at ₹12/km (Sedan), ₹16/km (SUV). Extra hour: ₹150–₹200/hr.</p>
              </div>

              {/* Use cases */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">When to Use Local Taxi Service in Kolkata</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {useCases.map((uc, i) => (
                    <div key={i} className="p-4 bg-accent/50 rounded-xl border border-primary/10 text-center">
                      <div className="text-3xl mb-2">{uc.icon}</div>
                      <h4 className="font-bold text-secondary text-xs mb-1">{uc.title}</h4>
                      <p className="text-gray-400 text-xs">{uc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Local Taxi Service Areas in Kolkata</h3>
                <div className="flex flex-wrap gap-2">
                  {localAreas.map((area) => (
                    <span key={area} className="px-3 py-1.5 bg-white rounded-full border border-gray-200 text-sm text-gray-700 shadow-sm">
                      <MapPin size={12} className="inline-block text-primary mr-1" />{area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why choose */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Why Choose Our Local Taxi in Kolkata?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Hourly packages — pay only for time you use',
                    'AC vehicles — comfortable even in Kolkata summer heat',
                    '24/7 availability including early morning & late night',
                    'Kolkata-based drivers familiar with all city routes',
                    'No advance payment — pay at trip end via Cash/UPI',
                    'Instant WhatsApp confirmation within 2 minutes',
                    'Pickup from all Kolkata areas — including suburbs',
                    'Same-day booking, last-minute confirmed',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">Book Local Taxi Now</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><FAQSection faqs={faqs} title="Local Taxi Kolkata — FAQs" /></div></section>

      {/* Multi-City Coverage */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-4">Local Taxi in <span className="text-primary">Other Cities</span></h2>
          <p className="text-gray-600 mb-6">
            {BUSINESS.name} also provides local taxi service in <strong>Ranchi</strong>, <strong>Jamshedpur</strong>, <strong>Bhubaneswar</strong>, <strong>Dhanbad</strong>, <strong>Siliguri</strong>, and 80+ other cities. Same hourly packages, same rates, same AC fleet.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: 'Ranchi', href: '/jharkhand/ranchi' },
              { name: 'Jamshedpur', href: '/jharkhand/jamshedpur' },
              { name: 'Bhubaneswar', href: '/odisha/bhubaneswar' },
              { name: 'Dhanbad', href: '/jharkhand/dhanbad' },
              { name: 'Siliguri', href: '/west-bengal/siliguri' },
              { name: 'Durgapur', href: '/west-bengal/durgapur' },
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
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Stuck Somewhere in Kolkata? Call for an Instant Cab!</h2>
          <p className="text-white/90 mb-6">Local taxi available in 15–20 minutes across Kolkata — hospital, airport, shopping, office. No surge, no waiting. ₹1,800 for 4hrs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I need a local taxi.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
