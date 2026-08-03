import { Shield, Users, Award, Phone, Heart, Building, CheckCircle, Star, TrendingUp, MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import { BUSINESS } from '@/lib/data';
import { generateAboutMetadata, generateAboutPageSchema, generateBreadcrumbSchema, generateFaqSchema, generateWebPageSchema } from '@/lib/seo';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata = generateAboutMetadata();

const faqItems = [
  { question: 'Why does NK Cab & Taxi not use surge pricing?', answer: `Surge pricing was rejected as a business model when ${BUSINESS.name} was founded. The founding logic was simple: a passenger booking an airport cab at 5 AM during a storm needs reliable transport the most — penalizing them with 2.5x fares is the opposite of good service. Our fixed-rate commitment means every passenger pays the same whether it's Durga Puja night, a monsoon afternoon, or a regular Tuesday.` },
  { question: 'How are NK Cab & Taxi drivers selected?', answer: `Every ${BUSINESS.name} driver goes through: (1) Police verification and background check, (2) Valid commercial driving licence with minimum 5 years experience, (3) Vehicle inspection for roadworthiness, insurance, and documentation compliance, (4) Personal interview with our operations team. We do not onboard drivers anonymously through an app — we know every driver in our network personally.` },
  { question: 'Can NK Cab & Taxi handle group bookings for 15–20 passengers?', answer: `Yes. Our Tempo Traveller fleet (12-seat and 17-seat vehicles) handles group bookings for corporate events, wedding guest transport, school/college trips, and pilgrimages. For groups above 20, we provide multiple coordinated vehicles. Call ${BUSINESS.phone} for group booking rates — we offer group discounts.` },
  { question: 'Does NK Cab & Taxi operate on public holidays and festival days?', answer: `Yes — 24/7, 365 days. We operate on all public holidays including Durga Puja (all 5 days), Diwali, Eid, Christmas, and all state-specific holidays in West Bengal, Jharkhand, and Odisha. Importantly, our rates do NOT increase on holidays — the same fixed rates apply on Mahalaya morning as on any regular day.` },
  { question: 'What is NK Cab & Taxi\'s service area?', answer: `Our primary coverage: Kolkata (all 141 wards + Howrah, Bidhannagar, Rajarhat), Ranchi, Jamshedpur, Dhanbad, Bhubaneswar, Puri, and 80+ cities across West Bengal, Jharkhand, Odisha, Bihar, and Uttar Pradesh. For outstation routes, we connect 500+ city pairs. Airport transfer at CCU (Kolkata), IXR (Ranchi), BBI (Bhubaneswar).` },
];

export default function AboutPage() {
  const milestones = [
    { year: '2019', title: 'Founded', desc: 'Started operations in Kolkata, West Bengal with a small fleet of 5 vehicles, focused on outstation cab service.' },
    { year: '2020', title: 'Expanded to 3 States', desc: 'Extended service to Jharkhand and Odisha, covering 30+ cities from our Kolkata hub.' },
    { year: '2021', title: '1,000+ Customers', desc: 'Crossed 1,000 happy customers milestone with 4.8★ average rating. Launched airport transfer service.' },
    { year: '2022', title: 'Corporate & Wedding', desc: 'Launched dedicated corporate car rental and wedding car rental services with expanded fleet.' },
    { year: '2023', title: '80+ Cities, 500+ Routes', desc: 'Expanded to 80+ cities across Jharkhand, West Bengal, Odisha, Bihar, and Uttar Pradesh. Launched Tempo Traveller and luxury segments.' },
    { year: '2024', title: '5,000+ Customers', desc: 'Serving 5,000+ customers across 80+ cities. Focused on Kolkata, Ranchi, Jamshedpur & East India.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAboutPageSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([{ name: 'Home', url: BUSINESS.domain }, { name: 'About Us', url: `${BUSINESS.domain}/about` }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebPageSchema(
        'About NK Cab & Taxi',
        'Learn about NK Cab & Taxi — trusted cab provider across West Bengal, Jharkhand & Odisha since 2019.',
        `${BUSINESS.domain}/about`,
        'AboutPage'
      )) }} />

      {/* Hero */}
      <section className="relative text-white py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'About Us', href: '/about' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">About <span className="text-gradient">{BUSINESS.name}</span></h1>
          <p className="text-lg text-gray-300 max-w-3xl">{BUSINESS.tagline} &mdash; East India&apos;s trusted cab &amp; taxi service since {BUSINESS.foundYear}. Verified drivers, AC vehicles, no hidden charges.</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${new Date().getFullYear() - BUSINESS.foundYear}+`, label: 'Years of Service', icon: <Award size={24} /> },
              { value: '5,000+', label: 'Happy Customers', icon: <Users size={24} /> },
              { value: '80+', label: 'Cities Covered', icon: <MapPin size={24} /> },
              { value: '4.8★', label: 'Average Rating', icon: <Star size={24} /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="opacity-70">{stat.icon}</div>
                <p className="text-3xl font-extrabold">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-5">Who We Are — And Why We Do This Differently</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              <strong>{BUSINESS.name}</strong> started in {BUSINESS.foundYear} from a simple frustration: cab booking in Kolkata was unpredictable. App-based services surged prices during the exact moments people needed reliable transport most &mdash; storms, festivals, early morning flights. Yellow taxis negotiated fares at the passenger&apos;s disadvantage. NK Cab &amp; Taxi was built around one founding principle: <strong>fixed rates, always.</strong>
            </p>
            <p>
              What started as a Kolkata outstation service with 5 vehicles has grown into a multi-state operation covering 80+ cities across West Bengal, Jharkhand, Odisha, Bihar, and Uttar Pradesh. Our operational hubs in Kolkata, Ranchi, and Jamshedpur allow us to provide both local taxi service and long-distance outstation cabs without compromising on response time or driver quality.
            </p>
            <p>
              We operate 7 service categories: local taxi (hourly), outstation one-way, outstation round trip, airport transfer, railway station pickup, wedding car rental, and corporate fleet management. Every service runs on the same fixed-rate, no-surge promise that defines the brand.
            </p>
            <p>
              Our fleet ranges from AC Sedans (Swift Dzire, Honda Amaze) to SUVs (Ertiga, Innova) to Innova Crysta, Tempo Traveller (12–17 seater), and luxury vehicles (Fortuner). All vehicles carry valid fitness certificates, insurance, and commercial registration. Drivers hold valid commercial licences with police verification.
            </p>
          </div>

          {/* Why Fixed Rate Matters — NK's Unique Philosophy */}
          <div className="mt-10 p-6 bg-accent/50 rounded-2xl border border-primary/10">
            <h3 className="text-xl font-bold text-secondary mb-3">Why We Reject Surge Pricing — Our Founding Philosophy</h3>
            <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <p>When Durga Puja begins and everyone needs a cab simultaneously &mdash; that&apos;s when a surge algorithm raises prices 2&ndash;3x. But that&apos;s also exactly when Kolkata families need reliable transport the most. We believe charging more when passengers have fewer alternatives is not service; it&apos;s exploitation.</p>
              <p>NK Cab &amp; Taxi has never used surge pricing since {BUSINESS.foundYear} &mdash; not during Ashtami night, not during monsoon storms, not during New Year&apos;s Eve. This isn&apos;t a marketing claim. It&apos;s the operational decision we made at founding and have maintained every day since.</p>
              <p>The consequence is that passengers can <strong>predict their travel cost in advance</strong> — which is what genuine planning requires.</p>
            </div>
          </div>

          {/* Operational Commitments */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-secondary mb-4">What We Commit to on Every Booking</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Driver dispatched with name & vehicle number within 2 minutes of booking',
                'Fixed rate quoted upfront — no changes after booking',
                'Driver arrives 10–15 minutes before scheduled time',
                'No advance payment required for most bookings',
                'Toll and parking receipts shown — no markup',
                'Flight tracking for all airport pickup bookings',
                'Driver accommodation included in multi-day round trips',
                'GST invoice within 24 hours for corporate bookings',
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">Services We Offer in Kolkata, Ranchi & East India</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <MapPin size={28} />, title: 'Local Taxi Kolkata', desc: 'Hourly cab rental for city sightseeing, shopping, hospital, and events in Kolkata. Packages from ₹1,800.' },
              { icon: <Shield size={28} />, title: 'Outstation Cab', desc: 'Intercity cab service from Kolkata to 80+ cities. One-way and round trip. Sedan ₹12/km.' },
              { icon: <TrendingUp size={28} />, title: 'One-Way Taxi', desc: 'Pay only for one side. Most affordable option for point-to-point intercity travel from Kolkata.' },
              { icon: <Users size={28} />, title: 'Airport Transfer', desc: 'Pickup & drop at Netaji Subhash Airport (CCU). Flight tracking, name board, 24/7 service.' },
              { icon: <Heart size={28} />, title: 'Wedding Car Rental', desc: 'Decorated Innova Crysta, Fortuner & luxury cars for baraat, vidaai, and wedding functions in Kolkata.' },
              { icon: <Building size={28} />, title: 'Corporate Car Rental', desc: 'Employee transport, client meetings, monthly contracts, GST invoices for businesses in Kolkata.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary mb-4">{item.icon}</div>
                <h3 className="font-bold text-secondary mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey — Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-8">Our Journey Since {BUSINESS.foundYear}</h2>
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-16 shrink-0">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">{m.year}</span>
                </div>
                <div className="flex-1 pb-4 border-b border-gray-100">
                  <p className="font-bold text-secondary">{m.title}</p>
                  <p className="text-gray-500 text-sm mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <FAQSection faqs={faqItems} title="About NK Cab & Taxi — FAQs" />
        </div>
      </section>

      {/* CTA */}
      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Fixed Rate. Verified Driver. Instant Confirmation.</h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">No surge, no surprises &mdash; book your cab across East India and know exactly what you&apos;ll pay before you travel.</p>
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg hover:scale-105 transition-all">
            <Phone size={22} /> Call {BUSINESS.phone}
          </a>
        </div>
      </section>
    </>
  );
}
