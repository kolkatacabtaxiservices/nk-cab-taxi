import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import nextDynamic from 'next/dynamic';
import {
  MapPin, Shield, Clock, CreditCard, Car, Phone, Star,
  ArrowRight, Route, Plane, Heart, Building, ChevronRight,
  Users, CheckCircle, Zap, Headphones, TrendingUp
} from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import HeroBanner from '@/components/HeroBanner';
import FAQSection from '@/components/FAQSection';
import { BUSINESS, getServices, getVehicles } from '@/lib/data';
import { getPopularRoutes } from '@/lib/routeData';
import {
  generateFaqSchema,
  generatePopularRoutesItemListSchema, generateHomePageMetadata,
  generateSeasonalOfferSchema,
} from '@/lib/seo';

const FareCalculator = nextDynamic(() => import('@/components/FareCalculator'), {
  loading: () => (
    <div className="py-20 text-center">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#0D1B2A]/5 rounded-full text-gray-400 text-sm border border-gray-100">
        <div className="w-4 h-4 border-2 border-[#FF6B00]/30 border-t-[#FF6B00] rounded-full animate-spin" />
        Working out your fare…
      </div>
    </div>
  ),
});
const GoogleMapEmbed = nextDynamic(() => import('@/components/GoogleMapEmbed'), {
  loading: () => (
    <div className="py-16 text-center">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#0D1B2A]/5 rounded-full text-gray-400 text-sm border border-gray-100">
        <div className="w-4 h-4 border-2 border-[#FF6B00]/30 border-t-[#FF6B00] rounded-full animate-spin" />
        Pulling up the map…
      </div>
    </div>
  ),
});

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  ...generateHomePageMetadata(),
  other: {
    // geo meta already injected globally via layout.tsx <head> — no duplication needed here
    'format-detection': 'telephone=yes',
    'thumbnail': `${BUSINESS.domain}/navbanner.webp`,
  },
};

export default async function HomePage() {
  const popularRoutes = await getPopularRoutes(12);
  const services = getServices();
  const vehicles = getVehicles();

  const faqs = [
    { question: 'What makes NK Cab & Taxi different from Ola or Uber?', answer: `NK Cab & Taxi is a direct, operator-run service — you speak to a person on ${BUSINESS.phone}, not a bot. Our fares are fixed before you confirm: no surge, no algorithm, no price revision at pickup. And we never cancel after accepting. App cabs do all three; we do none. For outstation travel (500+ routes), airport transfers, and weddings, we're the better choice every time.` },
    { question: `How quickly can I get a cab confirmed in Kolkata?`, answer: `Call ${BUSINESS.phone} or send a WhatsApp — booking confirmed in under 2 minutes. Driver name, vehicle number, and contact sent to your phone immediately. No app download, no account creation, no waiting queue.` },
    { question: 'Do your fares change during Durga Puja or other festivals?', answer: `Never. NK Cab & Taxi runs fixed fares 365 days a year. Durga Puja evening, Diwali night, New Year's Eve, heavy monsoon — the rate you're quoted is the rate you pay. We built this service specifically because festival-season surges from apps were becoming unworkable for Kolkata families.` },
    { question: 'What is the airport transfer fare from Kolkata (CCU)?', answer: `Airport to Salt Lake: Sedan from ₹1,200. Airport to Howrah: from ₹800. Airport to Park Street / Esplanade: from ₹700. Airport to New Town: from ₹1,400. Rates are fixed — no surge in rain, no peak-time multiplier. We track your flight and the driver waits with a name board. Call ${BUSINESS.phone}.` },
    { question: 'Which East India cities do you cover for outstation travel?', answer: `80+ cities across 5 states: West Bengal (Kolkata, Siliguri, Darjeeling, Durgapur, Asansol, Haldia, Digha, Shantiniketan, Cooch Behar, Malda, Bardhaman, Kharagpur, Murshidabad, Jalpaiguri and more), Jharkhand (Ranchi, Jamshedpur, Dhanbad, Bokaro, Deoghar, Hazaribagh), Odisha (Bhubaneswar, Puri, Cuttack, Rourkela, Konark, Berhampur), Bihar (Patna, Gaya, Muzaffarpur), and Uttar Pradesh (Varanasi, Prayagraj, Ayodhya, Agra, Mathura).` },
    { question: 'What vehicles are available and what do they cost per kilometre?', answer: 'AC Sedan (Swift Dzire, Honda Amaze) — ₹12/km, up to 4 passengers. SUV (Maruti Ertiga, Toyota Innova) — ₹16/km, up to 6 passengers. Innova Crysta — ₹18/km, 7 passengers, captain seats. Tempo Traveller (12-seater) — ₹22/km for groups. All include fuel and driver. Toll and parking quoted separately.' },
    { question: 'Do you provide one-way taxi service from Kolkata?', answer: `Yes — one-way outstation cabs are one of our most booked services. You pay only for the trip you take, with no return fare added. Kolkata to Puri, Kolkata to Ranchi, Kolkata to Bhubaneswar, Kolkata to Darjeeling — all available as clean one-way bookings. Call ${BUSINESS.phone} for a flat one-way fare quote.` },
    { question: 'Can I rent a wedding car in Kolkata?', answer: `Yes. NK Cab & Taxi provides decorated wedding cars in Kolkata — flower-trimmed Innova Crysta, Fortuner, and luxury sedans. Formally dressed chauffeur, red-carpet service, punctual and presentable for baraat, vidaai, ring ceremony, and all functions. Call ${BUSINESS.phone} at least 3 days in advance for wedding bookings.` },
    { question: 'Is there a monthly corporate cab plan available?', answer: `Yes. Monthly contracts for IT companies, hospitals, law firms, and other businesses in Salt Lake, New Town, Esplanade, and across Kolkata. Dedicated vehicles, fixed monthly billing, GST-compliant invoices, and a dedicated point of contact. 15–20% savings vs per-trip rates. Call ${BUSINESS.phone} for a corporate quote.` },
    { question: 'How do I pay for my NK Cab booking?', answer: 'We accept Cash, UPI (Google Pay, PhonePe, Paytm, BHIM), Credit and Debit Cards, and bank transfers. Payment is at trip end — no advance required for regular bookings. For multi-day outstation and tour packages, a 20% advance may be requested.' },
  ];

  const testimonials = [
    { name: 'Debashis Mukherjee', location: 'Lake Town, Kolkata', rating: 5, text: 'Booked NK Cab for my father\'s hospital runs to SSKM every week. The driver knows exactly which gate to use and how long to wait. No surprises with the fare. This is how a local cab service should work.' },
    { name: 'Tanushree Bose', location: 'Salt Lake Sector V', rating: 5, text: 'Used them for a 3 AM CCU pickup after a delayed Dubai flight. The driver was there with a name board before I reached the arrival gate. Fixed fare, no surge despite the ungodly hour. Will book again without hesitation.' },
    { name: 'Karthik Srinivasan', location: 'New Town, Action Area II', rating: 5, text: 'Our IT team uses NK Cab for client visits across Kolkata and occasional Ranchi trips. GST billing is clean, drivers are always presentable, and they never cancel. Far better than corporate cab aggregators we tried before.' },
    { name: 'Reshma Chatterjee', location: 'Behala, Kolkata', rating: 5, text: 'Hired the wedding Innova Crysta for my brother\'s baraat. Beautifully decorated, driver in formals, arrived 20 minutes early. The whole family was impressed. NK Cab made the baraat day completely stress-free.' },
    { name: 'Arjun Das', location: 'Barasat, North 24 Parganas', rating: 5, text: 'Took a one-way to Bhubaneswar — I was sceptical about the pricing but it was exactly what was quoted on the phone. Driver knew every toll booth and the best rest stop for lunch. Would recommend for long-distance travel.' },
    { name: 'Priyanka Agarwal', location: 'Park Street, Kolkata', rating: 5, text: 'I\'ve been booking NK Cab for Durga Puja pandal hopping for two years now. While Ola prices tripled during Maha Ashtami, NK quoted the same fixed rate. That consistency is why I\'m a loyal customer.' },
  ];

  const wbCities = [
    { name: 'Kolkata', slug: '/west-bengal/kolkata' },
    { name: 'Howrah', slug: '/west-bengal/howrah' },
    { name: 'Siliguri', slug: '/west-bengal/siliguri' },
    { name: 'Darjeeling', slug: '/west-bengal/darjeeling' },
    { name: 'Durgapur', slug: '/west-bengal/durgapur' },
    { name: 'Asansol', slug: '/west-bengal/asansol' },
    { name: 'Kharagpur', slug: '/west-bengal/kharagpur' },
    { name: 'Bardhaman', slug: '/west-bengal/bardhaman' },
    { name: 'Haldia', slug: '/west-bengal/haldia' },
    { name: 'Malda', slug: '/west-bengal/malda' },
    { name: 'Kalyani', slug: '/west-bengal/kalyani' },
    { name: 'Krishnanagar', slug: '/west-bengal/krishnanagar' },
    { name: 'Barasat', slug: '/west-bengal/barasat' },
    { name: 'Midnapore', slug: '/west-bengal/midnapore' },
    { name: 'Bankura', slug: '/west-bengal/bankura' },
    { name: 'Cooch Behar', slug: '/west-bengal/cooch-behar' },
    { name: 'Shantiniketan', slug: '/west-bengal/shantiniketan' },
    { name: 'Digha', slug: '/west-bengal/digha' },
    { name: 'Murshidabad', slug: '/west-bengal/murshidabad' },
    { name: 'Jalpaiguri', slug: '/west-bengal/jalpaiguri' },
    { name: 'Purulia', slug: '/west-bengal/purulia' },
    { name: 'Nadia', slug: '/west-bengal/nadia' },
  ];

  const jhCities = [
    { name: 'Ranchi', slug: '/jharkhand/ranchi' },
    { name: 'Jamshedpur', slug: '/jharkhand/jamshedpur' },
    { name: 'Dhanbad', slug: '/jharkhand/dhanbad' },
    { name: 'Bokaro', slug: '/jharkhand/bokaro' },
    { name: 'Deoghar', slug: '/jharkhand/deoghar' },
    { name: 'Hazaribagh', slug: '/jharkhand/hazaribagh' },
    { name: 'Giridih', slug: '/jharkhand/giridih' },
    { name: 'Dumka', slug: '/jharkhand/dumka' },
  ];

  const odCities = [
    { name: 'Bhubaneswar', slug: '/odisha/bhubaneswar' },
    { name: 'Puri', slug: '/odisha/puri' },
    { name: 'Cuttack', slug: '/odisha/cuttack' },
    { name: 'Rourkela', slug: '/odisha/rourkela' },
    { name: 'Berhampur', slug: '/odisha/berhampur' },
    { name: 'Sambalpur', slug: '/odisha/sambalpur' },
    { name: 'Konark', slug: '/odisha/konark' },
    { name: 'Paradip', slug: '/odisha/paradip' },
  ];

  const fareData = [
    { vehicle: '🚗 Sedan', models: 'Swift Dzire / Honda Amaze', capacity: '4', perKm: '₹12', local4hr: '₹1,800', local8hr: '₹2,800' },
    { vehicle: '🚙 SUV', models: 'Ertiga / Innova', capacity: '6', perKm: '₹16', local4hr: '₹2,500', local8hr: '₹3,800' },
    { vehicle: '🚐 Innova Crysta', models: 'Premium MPV', capacity: '7', perKm: '₹18', local4hr: '₹3,000', local8hr: '₹4,500' },
    { vehicle: '🚌 Tempo', models: '12-Seater Traveller', capacity: '12', perKm: '₹22', local4hr: '₹3,500', local8hr: '₹5,500' },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    MapPin: <MapPin className="w-6 h-6" />,
    Route: <Route className="w-6 h-6" />,
    ArrowRight: <ArrowRight className="w-6 h-6" />,
    ArrowLeftRight: <ArrowRight className="w-6 h-6" />,
    RotateCcw: <ArrowRight className="w-6 h-6" />,
    Plane: <Plane className="w-6 h-6" />,
    Heart: <Heart className="w-6 h-6" />,
    Building: <Building className="w-6 h-6" />,
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePopularRoutesItemListSchema(popularRoutes)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSeasonalOfferSchema()) }} />

      {/* ═══ HERO — Banner Slideshow + Booking Form ═══ */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background slideshow covering 100% of the Hero section backdrop */}
        <HeroBanner />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 lg:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">

            {/* Left: Hero Text Content matching screenshot */}
            <div className="text-white animate-slideUp">
              {/* Trust pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm mb-5 border border-white/20 shadow-md">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400" />
                <span className="text-white font-medium">★ Rated 4.8 on Google — 80+ Cities in Five States</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-4">
                <span className="text-[#FF6B00]">NK Cab &amp; Taxi</span> — Kolkata&apos;s Trusted Taxi from ₹12/km
              </h1>

              {/* Subheading */}
              <h2 className="text-lg sm:text-2xl font-bold text-white/95 mb-4">
                City Rides, Outstation Cars &amp; Airport Pickups — Kolkata | Always Open
              </h2>

              <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                No algorithm, no surge, no app download. NK Cab &amp; Taxi is a direct, operator-run taxi service covering Kolkata, West Bengal, Jharkhand, Odisha, Bihar &amp; UP — with a real person on the phone 24/7. AC cars from ₹12/km, fixed fares, driver confirmed in 2 minutes.
              </p>

              {/* Action Buttons matching screenshot */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#FF6B00] hover:bg-[#e05e00] text-white rounded-full text-base font-bold shadow-lg transition-all animate-nk-pulse"
                >
                  <Phone size={20} />
                  Call Us Now: {BUSINESS.phoneDisplay}
                </a>
                <a
                  href="#booking-form"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/15 hover:bg-white/25 text-white rounded-full text-base font-bold border border-white/30 backdrop-blur-md transition-all"
                >
                  Reserve a Cab →
                </a>
              </div>

              {/* Trust Badges with Green Checkmarks matching screenshot */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-200 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle size={15} className="text-green-400" /> Top-Rated Cabs in Kolkata</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={15} className="text-green-400" /> Fixed Fares at Every Hour</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={15} className="text-green-400" /> ★4.8 from 5,000+ Riders</span>
              </div>
            </div>

            {/* Right: Booking Form Card — Sitting on top of the hero background */}
            <div className="animate-slideInRight mt-6 lg:mt-0" id="booking-form">
              <BookingForm compact={false} />
            </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="relative z-10 w-full">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-10 sm:h-16" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F7F5F0" />
          </svg>
        </div>
      </section>

      {/* ═══ TRUST TICKER (Marquee) ═══ */}
      <div className="bg-[#FF6B00] py-3 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...Array(2)].map((_, repeat) => (
              <span key={repeat} className="inline-flex items-center">
                {[
                  '🚖 NK Cab & Taxi ₹12/km',
                  '✈️ Airport Transfer — Fixed Fares',
                  '🏙️ 80+ Cities Covered',
                  '⭐ 4.8 Rating — 5,000+ Customers',
                  '🚫 No Surge Pricing 24/7',
                  '💬 WhatsApp Booking in 2 Min',
                  '🗺️ WB · Jharkhand · Odisha · Bihar',
                  '🚗 AC Fleet — Sedan · SUV · Tempo',
                  '💒 Wedding Car Rental Available',
                  '🏢 Corporate Contracts with GST',
                ].map((item, i) => (
                  <span key={`${repeat}-${i}`} className="inline-flex items-center text-white font-semibold text-sm px-8">
                    {item}
                    <span className="ml-8 text-white/40">|</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ STATS — Animated Counters ═══ */}
      <section className="py-14 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: '5,000+', label: 'Satisfied Riders', sub: 'Across East India', icon: <Users className="w-6 h-6" />, color: 'from-orange-500 to-amber-400' },
              { value: '500+', label: 'Intercity Routes', sub: '5 States · 80+ Cities', icon: <Route className="w-6 h-6" />, color: 'from-orange-600 to-orange-400' },
              { value: '₹12/km', label: 'Base Fare', sub: 'AC Sedan · No Surge', icon: <TrendingUp className="w-6 h-6" />, color: 'from-amber-500 to-yellow-400' },
              { value: '4.8★', label: 'Google Score', sub: '2,847+ Reviews', icon: <Star className="w-6 h-6" />, color: 'from-orange-500 to-red-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 border border-[rgba(255,107,0,0.08)] shadow-sm card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-orange`}>
                  {stat.icon}
                </div>
                <p className="text-3xl font-extrabold text-[#0D1B2A] leading-none">{stat.value}</p>
                <p className="text-sm font-semibold text-[#0D1B2A] mt-1">{stat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES — Fresh Grid ═══ */}
      <section className="py-14 lg:py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="tag-orange inline-flex mb-4">🚖 Our Services</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0D1B2A] mb-4">
              Every Type of <span className="text-gradient">Cab & Taxi</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Local rides to long-distance trips, weddings to corporate travel — all across Kolkata & East India.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, idx) => (
              <Link key={service.id} href={`/services/${service.slug}`}
                className="group relative p-6 bg-white rounded-2xl border border-gray-100 card-premium shadow-sm overflow-hidden"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Orange corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#FF6B00]/10 to-transparent rounded-2xl" />
                <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-xl flex items-center justify-center text-[#FF6B00] mb-4 group-hover:bg-[#FF6B00] group-hover:text-white transition-all duration-300">
                  {iconMap[service.icon] || <Car className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-[#0D1B2A] text-base mb-2 group-hover:text-[#FF6B00] transition-colors">{service.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                <div className="flex items-center gap-1 text-[#FF6B00] text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WEST BENGAL CITIES — Hex Grid ═══ */}
      <section className="py-14 lg:py-20 bg-[#F7F5F0] section-divider" id="west-bengal-cities">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="tag-orange inline-flex mb-4">📍 West Bengal Coverage</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-3">
              Cab Service Across <span className="text-gradient">West Bengal</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              NK Cab & Taxi picks up from every corner of West Bengal — all {wbCities.length}+ cities, hill stations, beaches, and heritage towns.
            </p>
          </div>
          <div className="hex-grid mb-8">
            {wbCities.map((city) => (
              <Link key={city.slug} href={city.slug} className="hex-item">
                <MapPin size={12} className="text-[#FF6B00] mr-1.5 shrink-0" />
                {city.name}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/west-bengal" className="inline-flex items-center gap-2 px-7 py-3.5 btn-primary rounded-full font-bold">
              All WB Cities & Routes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ JHARKHAND + ODISHA CITIES ═══ */}
      <section className="py-14 lg:py-20 bg-white" id="jharkhand-odisha">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="tag-orange inline-flex mb-4">🗺️ Multi-State Coverage</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-3">
              Jharkhand &amp; <span className="text-gradient">Odisha</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Jharkhand */}
            <div className="bg-[#F7F5F0] rounded-2xl p-6 border border-[rgba(255,107,0,0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-[#0D1B2A] text-lg">Jharkhand</h3>
                  <p className="text-gray-400 text-xs">Ranchi · Jamshedpur · Dhanbad</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {jhCities.map((city) => (
                  <Link key={city.slug} href={city.slug}
                    className="px-3 py-1.5 bg-white border border-[rgba(255,107,0,0.15)] rounded-lg text-sm font-medium text-[#0D1B2A] hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-all"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
              <Link href="/jharkhand" className="inline-flex items-center gap-1 text-[#FF6B00] text-sm font-semibold mt-5 hover:gap-2 transition-all">
                All Jharkhand cities <ArrowRight size={14} />
              </Link>
            </div>

            {/* Odisha */}
            <div className="bg-[#F7F5F0] rounded-2xl p-6 border border-[rgba(255,107,0,0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#F5A623] rounded-xl flex items-center justify-center text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-[#0D1B2A] text-lg">Odisha</h3>
                  <p className="text-gray-400 text-xs">Bhubaneswar · Puri · Cuttack</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {odCities.map((city) => (
                  <Link key={city.slug} href={city.slug}
                    className="px-3 py-1.5 bg-white border border-[rgba(255,107,0,0.15)] rounded-lg text-sm font-medium text-[#0D1B2A] hover:bg-[#F5A623] hover:text-white hover:border-[#F5A623] transition-all"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
              <Link href="/odisha" className="inline-flex items-center gap-1 text-[#FF6B00] text-sm font-semibold mt-5 hover:gap-2 transition-all">
                All Odisha cities <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATES WE COVER ═══ */}
      <section className="py-14 lg:py-20 bg-[#0D1B2A]" id="states-coverage">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[rgba(255,107,0,0.3)] rounded-full text-[#FF6B00] text-xs font-semibold uppercase tracking-wider mb-4">
              🗺️ Our Coverage
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Cab Service Across <span className="text-gradient">5 States</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              NK Cab &amp; Taxi covers West Bengal, Jharkhand, Odisha, Bihar &amp; Uttar Pradesh — 80+ cities, 500+ routes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { flag: '🪷', name: 'West Bengal', slug: 'west-bengal', hubs: 'Kolkata · Siliguri · Durgapur', cities: '25+ cities', color: 'from-[#FF6B00] to-[#F5A623]' },
              { flag: '⛏️', name: 'Jharkhand', slug: 'jharkhand', hubs: 'Ranchi · Jamshedpur · Dhanbad', cities: '12+ cities', color: 'from-[#FF6B00] to-red-500' },
              { flag: '🛕', name: 'Odisha', slug: 'odisha', hubs: 'Bhubaneswar · Puri · Cuttack', cities: '10+ cities', color: 'from-[#F5A623] to-yellow-500' },
              { flag: '🌾', name: 'Bihar', slug: 'bihar', hubs: 'Patna · Gaya · Muzaffarpur', cities: '8+ cities', color: 'from-green-500 to-emerald-600' },
              { flag: '🕌', name: 'Uttar Pradesh', slug: 'uttar-pradesh', hubs: 'Varanasi · Ayodhya · Agra', cities: '6+ cities', color: 'from-purple-500 to-indigo-600' },
            ].map((state) => (
              <Link
                key={state.slug}
                href={`/${state.slug}`}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-[rgba(255,107,0,0.4)] transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FF6B00]/10"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${state.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {state.flag}
                </div>
                <h3 className="font-bold text-white text-base mb-1 group-hover:text-[#FF6B00] transition-colors">
                  {state.name}
                </h3>
                <p className="text-gray-500 text-xs mb-3 leading-relaxed">{state.hubs}</p>
                <span className="inline-block px-3 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-semibold rounded-full border border-[rgba(255,107,0,0.2)]">
                  {state.cities} covered
                </span>
                <div className="mt-3 flex items-center justify-center gap-1 text-[#FF6B00] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Cities <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FARE TABLE ═══ */}
      <section className="py-14 lg:py-20 bg-[#0D1B2A]" id="fare-chart">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[rgba(255,107,0,0.3)] rounded-full text-[#FF6B00] text-xs font-semibold uppercase tracking-wider mb-4">
              💰 Transparent Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Kolkata Cab <span className="text-gradient">Fare Chart</span>
            </h2>
            <p className="text-gray-400">Fixed rates — no surge, no hidden charges. What you see is what you pay.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FF6B00]">
                  <th className="px-5 py-4 text-left text-sm font-bold text-white rounded-tl-2xl">Vehicle</th>
                  <th className="px-5 py-4 text-center text-sm font-bold text-white">Models</th>
                  <th className="px-5 py-4 text-center text-sm font-bold text-white">Seats</th>
                  <th className="px-5 py-4 text-center text-sm font-bold text-white">Per KM</th>
                  <th className="px-5 py-4 text-center text-sm font-bold text-white">4 Hrs</th>
                  <th className="px-5 py-4 text-center text-sm font-bold text-white rounded-tr-2xl">8 Hrs</th>
                </tr>
              </thead>
              <tbody>
                {fareData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#162436]' : 'bg-[#1a2c3e]'}>
                    <td className="px-5 py-4 font-bold text-white text-sm">{row.vehicle}</td>
                    <td className="px-5 py-4 text-center text-gray-400 text-sm">{row.models}</td>
                    <td className="px-5 py-4 text-center text-gray-300 text-sm">{row.capacity} pax</td>
                    <td className="px-5 py-4 text-center font-extrabold text-[#FF6B00] text-lg">{row.perKm}</td>
                    <td className="px-5 py-4 text-center text-gray-300 text-sm">{row.local4hr}</td>
                    <td className="px-5 py-4 text-center text-gray-300 text-sm">{row.local8hr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs mt-4 text-center">* Outstation: Toll & parking extra. Driver night allowance ₹300/night. Local packages include fuel & driver.</p>
          <div className="mt-6 text-center">
            <Link href="/fare-chart" className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(255,107,0,0.4)] text-[#FF6B00] font-semibold rounded-full hover:bg-[#FF6B00] hover:text-white transition-all text-sm">
              Full Fare Chart & Calculator <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-14 lg:py-20 bg-[#F7F5F0]" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="tag-orange inline-flex mb-4">⚡ Simple Booking</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-3">
              Book in <span className="text-gradient">3 Steps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-0.5 bg-gradient-to-r from-[#FF6B00] via-[#F5A623] to-[#FF6B00] rounded-full opacity-30" />
            {[
              { step: '01', icon: <Phone size={28} />, title: 'Call or WhatsApp', desc: `Dial ${BUSINESS.phone} or WhatsApp us. Share your route, date, time, and passenger count.` },
              { step: '02', icon: <Car size={28} />, title: 'Pick Your Car', desc: 'Choose between Sedan, SUV, Innova Crysta, or Tempo Traveller for an instant quote.' },
              { step: '03', icon: <MapPin size={28} />, title: 'Get on the Road', desc: 'Chauffeur arrives on time, GPS-tracked AC car, verified driver, confirmation shared.' },
            ].map((item, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm card-hover text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {item.step}
                </div>
                <div className="w-16 h-16 mx-auto bg-[#FF6B00]/10 rounded-2xl flex items-center justify-center text-[#FF6B00] mb-5 mt-2">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#0D1B2A] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ POPULAR ROUTES — Timeline Style ═══ */}
      <section className="py-14 lg:py-20 bg-white" id="popular-routes">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="tag-orange inline-flex mb-4">🛣️ Popular Routes</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-3">
              Most Booked <span className="text-gradient">Routes</span>
            </h2>
            <p className="text-gray-500">Top cab routes from Kolkata and across our service area</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {popularRoutes.map((route) => (
              <Link key={route.slug} href={`/routes/${route.slug}`}
                className="route-card bg-white rounded-xl p-4 flex items-center gap-3"
              >
                <div className="shrink-0 w-9 h-9 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
                  <Route size={16} className="text-[#FF6B00]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#0D1B2A] text-sm truncate">{route.fromName} → {route.toName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{route.distance} km · From ₹{route.priceSaloon}</p>
                </div>
                <ChevronRight size={14} className="text-gray-300 shrink-0" />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
              <Link href="/west-bengal/kolkata" className="inline-flex items-center gap-2 px-7 py-3.5 btn-dark rounded-full font-semibold">
              Browse Kolkata Routes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FLEET ═══ */}
      <section className="py-14 lg:py-20 bg-[#F7F5F0]" id="fleet">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="tag-orange inline-flex mb-4">🚗 Our Fleet</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-3">
              Well-Maintained <span className="text-gradient">AC Vehicles</span>
            </h2>
            <p className="text-gray-500">Clean, sanitized, GPS-tracked fleet. Regularly inspected for your safety.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles.slice(0, 3).map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm card-hover">
                <div className="relative h-48 bg-gradient-to-br from-[#FF6B00]/5 to-[#F5A623]/10">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.name} - ${vehicle.models.join(', ')} for rent in Kolkata`}
                    fill className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 badge-orange">AC Fleet</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0D1B2A] text-lg mb-1">{vehicle.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{vehicle.models.join(', ')}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-semibold rounded-full">👥 {vehicle.capacity} Pax</span>
                    <span className="px-2.5 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-semibold rounded-full">🧳 {vehicle.luggage} Bags</span>
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">❄️ AC</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs text-gray-400">From</span>
                      <p className="text-2xl font-extrabold text-[#FF6B00]">₹{vehicle.pricePerKm}<span className="text-sm text-gray-400 font-normal">/km</span></p>
                    </div>
                    <a href={`tel:${BUSINESS.phone}`} className="px-4 py-2 btn-primary rounded-xl text-sm font-bold">Book</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
              <Link href="/fleet" className="inline-flex items-center gap-2 px-7 py-3.5 btn-dark rounded-full font-semibold">
              See the Complete Fleet <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="py-14 lg:py-20 bg-[#0D1B2A]" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[rgba(255,107,0,0.3)] rounded-full text-[#FF6B00] text-xs font-semibold uppercase tracking-wider mb-4">
              🏆 Why NK Cab & Taxi
            </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                <span className="text-gradient">5,000+</span> Riders Rely on Us
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">Here is why so many riders in Kolkata choose us over app taxis and local fleets.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Shield className="w-7 h-7" />, title: 'Police-Checked Chauffeurs', desc: 'Every driver is verified and vetted, with 5+ years of commercial experience.' },
              { icon: <Clock className="w-7 h-7" />, title: 'One Fixed Rate, Always', desc: 'The same fare at 3 AM, on Durga Puja, or on a public holiday. No surge, period.' },
              { icon: <CreditCard className="w-7 h-7" />, title: 'Fares With No Surprises', desc: 'All-inclusive quotes. Toll and parking are flagged before you book. Zero extras.' },
              { icon: <Zap className="w-7 h-7" />, title: 'Fast WhatsApp Booking', desc: 'Ride confirmed in under 2 minutes with the driver name and number.' },
              { icon: <MapPin className="w-7 h-7" />, title: 'Five States · 500+ Routes', desc: 'WB, Jharkhand, Odisha, Bihar, UP — local, outstation, and one-way trips.' },
              { icon: <Headphones className="w-7 h-7" />, title: 'A Human Answers', desc: '24/7 phone support with no bot and no IVR — a real person, every call.' },
            ].map((item, i) => (
              <div key={i} className="glass-orange rounded-2xl p-6 card-hover border border-[rgba(255,107,0,0.1)]">
                <div className="w-12 h-12 bg-[#FF6B00]/20 rounded-xl flex items-center justify-center text-[#FF6B00] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* NK Cab vs Uber/Ola comparison */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-white font-bold text-xl">
                NK Cab & Taxi vs <span className="text-gradient">Uber / Ola</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-3 text-left text-gray-400 text-xs font-semibold uppercase">Feature</th>
                    <th className="px-5 py-3 text-center text-[#FF6B00] text-xs font-semibold uppercase">NK Cab & Taxi</th>
                    <th className="px-5 py-3 text-center text-gray-500 text-xs font-semibold uppercase">Uber / Ola</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Surge Pricing', '❌ Never — flat round the clock', '✅ 2-3x in rain or festival season'],
                    ['Outstation (500+ routes)', '✅ Every major city reachable', '❌ Patchy availability'],
                    ['Airport Pickup (CCU)', '✅ ₹1,800 flat + flight tracking', '⚠️ Fare shifts with demand'],
                    ['Cancellations', '❌ No-cancel policy', '✅ Drivers cancel often'],
                    ['Wedding Cars', '✅ Decorated fleet, red carpet', '❌ Not offered'],
                    ['Corporate GST Billing', '✅ Monthly plans, GST invoice', '❌ Weak support'],
                    ['WhatsApp Booking', '✅ Confirmed in two minutes', '❌ App login required'],
                  ].map(([feature, us, them], i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="px-5 py-3.5 text-gray-300 text-sm font-medium">{feature}</td>
                      <td className="px-5 py-3.5 text-center text-green-400 text-sm">{us}</td>
                      <td className="px-5 py-3.5 text-center text-gray-500 text-sm">{them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — Scroll Carousel ═══ */}
      <section className="py-14 lg:py-20 bg-[#F7F5F0]" id="testimonials">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="tag-orange inline-flex mb-4">⭐ Reviews</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-3">
              What Kolkata <span className="text-gradient">Travelers Say</span>
            </h2>
            <p className="text-gray-500">4.8 stars from riders across the city and eastern India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className={j < t.rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B00] to-[#F5A623] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#0D1B2A] font-bold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1"><MapPin size={10} /> {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D1B2A] rounded-full text-white text-sm">
              <Star size={14} className="text-[#F5A623] fill-[#F5A623]" />
              <span>★ 4.8 average from 2,847+ Google reviews</span>
            </div>
            <a href={BUSINESS.gbpReviewLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary rounded-full text-sm font-bold">
              ⭐ Write a Google Review
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FARE CALCULATOR ═══ */}
      <FareCalculator />

      {/* ═══ GOOGLE MAP ═══ */}
      <GoogleMapEmbed
        title="Our Service Area — Kolkata & East India"
        subtitle="Reaching 80+ cities across West Bengal, Jharkhand, Odisha, Bihar & Uttar Pradesh."
      />

      {/* ═══ FESTIVAL CAB SERVICE ═══ */}
      <section className="py-14 lg:py-20 bg-[#F7F5F0]" id="seasonal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="tag-orange inline-flex mb-4">🎉 Festival Cab</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-3">
              Festival &amp; <span className="text-gradient">Seasonal Service</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Durga Puja, Diwali, Christmas, summer vacations — fixed rates, no surge, always available.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: '🪔', title: 'Durga Puja Cab Kolkata', desc: 'Fixed fares for pandal hopping, family outings, airport drops, and outstation travel across all 5 Puja days — no surge, no cancellations.', period: 'Sep–Oct' },
              { emoji: '🎆', title: 'Kali Puja & Diwali', desc: 'Safe late-night pickups through Lakshmi Puja and Kali Puja nights — flat rates for family gatherings, fireworks outings, and airport runs.', period: 'Oct–Nov' },
              { emoji: '🎄', title: 'Christmas & New Year', desc: 'Park Street on Christmas Eve, New Year countdown rides, early morning airport departures — fixed rate, no midnight surge.', period: 'Dec–Jan' },
              { emoji: '☀️', title: 'Summer Vacation Cab', desc: 'AC outstation packages to Darjeeling, Mandarmani, Digha, Puri, and Sundarbans during April–June school holidays.', period: 'Apr–Jun' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-bold text-[#0D1B2A] text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">{item.desc}</p>
                <span className="text-xs text-[#FF6B00] font-semibold">📅 {item.period}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-r from-[#FF6B00] to-[#F5A623] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-1">🚫 No Surge Pricing During Festivals — Guaranteed!</p>
            <p className="text-white/85 text-sm">Unlike Ola and Uber, {BUSINESS.name} charges the same fixed rates during Durga Puja, Diwali, Christmas & all festivals. Call <a href={`tel:${BUSINESS.phone}`} className="font-bold underline">{BUSINESS.phone}</a></p>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-14 lg:py-20 bg-[#0D1B2A]" id="cta">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#FF6B00]/20 to-[#F5A623]/20 rounded-3xl blur-xl" />
            <div className="relative glass-dark rounded-3xl p-10 border border-[rgba(255,107,0,0.2)]">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Reserve Your <span className="text-gradient">Kolkata Taxi</span> Today
              </h2>
              <p className="text-gray-400 mb-8">Open round the clock. Confirmed in under two minutes, no app download.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-3 px-8 py-4 btn-primary rounded-2xl text-lg font-bold shadow-orange-lg">
                  <Phone size={22} /> {BUSINESS.phoneDisplay}
                </a>
                <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I want to book a cab in Kolkata.')}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl text-lg font-bold transition-colors">
                  💬 WhatsApp Us
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <a href={BUSINESS.gbpReviewLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-gray-300 text-sm font-medium hover:text-white transition-colors border border-white/10">
                  📍 Find on Google Maps
                </a>
                <a href={BUSINESS.gbpReviewLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-gray-300 text-sm font-medium hover:text-white transition-colors border border-white/10">
                  ⭐ Leave a Review
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT + SEO CONTENT ═══ */}
      <section className="py-14 lg:py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Main content — 3 cols */}
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D1B2A]">
                About <span className="text-gradient">NK Cab & Taxi</span> — A Better Way to Travel
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                <p>
                  NK Cab &amp; Taxi started as a simple idea: Kolkata deserves a cab service where you call a human being, get a straight fare, and the driver actually shows up on time. No algorithm, no surge multiplier, no mystery about what you&apos;ll pay at destination. Since {BUSINESS.foundYear}, that&apos;s been the NK Cab promise — and it&apos;s why our customers keep calling back instead of downloading another app.
                </p>
                <p>
                  We cover <strong>Kolkata, West Bengal</strong>, and all of East India. Outstation Sedan fares start at <strong className="text-[#FF6B00]">₹12/km</strong> (Swift Dzire, Honda Amaze), SUV at ₹16/km (Ertiga, Innova), Innova Crysta at ₹18/km, Tempo Traveller at ₹22/km. Local city hire from ₹1,800 (4 hours / 40 km). Fuel and driver are always included — tolls are quoted upfront, never sprung on you at the gate.
                </p>
                <p>
                  What we&apos;re proud of: <strong>zero surge pricing</strong>. Our fares are identical at 3 AM, during Durga Puja Maha Ashtami, on New Year&apos;s Eve, and on a quiet Monday morning. That single commitment — the same rate regardless of demand — is why IT professionals in Salt Lake, hospital families in Dhakuria, and outstation travelers from Howrah Station all choose NK Cab for journeys that matter.
                </p>
                <p>
                  Our West Bengal footprint: <strong>Kolkata, Howrah, Salt Lake, New Town (Rajarhat), Siliguri, Darjeeling, Durgapur, Asansol, Haldia, Malda, Shantiniketan, Digha, Mandarmani</strong>, and 15+ more cities. Cross-state: Ranchi, Jamshedpur, Dhanbad, Bokaro, Deoghar (Jharkhand) · Bhubaneswar, Puri, Cuttack, Konark (Odisha) · Patna, Gaya (Bihar) · Varanasi, Prayagraj, Ayodhya (UP).
                </p>
                <p>
                  We pick up from everywhere in Kolkata: Howrah Station and Sealdah Station, Esplanade and Karunamoyee bus terminals, SSKM, AMRI Dhakuria, Apollo Gleneagles, Fortis Anandapur, TCS Gitobitan, DLF IT Park, Wipro New Town, and all residential colonies from Behala to Barasat. For corporate clients — monthly fleet contracts with GST invoicing, dedicated account managers, and 15–20% volume discount. Call {BUSINESS.phone} or fill the booking form — confirmed in 2 minutes.
                </p>
              </div>


              {/* Airport section */}
              <div className="bg-[#F7F5F0] rounded-2xl p-6">
                <h3 className="font-bold text-[#0D1B2A] text-lg mb-3 flex items-center gap-2">
                  <Plane size={18} className="text-[#FF6B00]" /> Kolkata CCU Airport — Fixed Taxi Fares
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  NSCBI Airport (CCU) is in Dum Dum — 30–45 minutes from central Kolkata depending on traffic. NK Cab tracks your flight arrival in real time; the driver is at the arrivals gate (Terminal 1 or 2) with a name board, ready before you clear baggage.
                  <br /><strong>Sample fares (Sedan):</strong> Airport → Salt Lake ₹1,200 · Airport → Howrah ₹900 · Airport → Park Street ₹750 · Airport → New Town ₹1,400. Same fare in rain or peak hours — no surge, ever.
                </p>
              </div>

              {/* NAP for local SEO */}
              <address className="bg-[#0D1B2A] rounded-2xl p-6 not-italic">
                <h3 className="text-white font-bold text-base mb-4">Contact NK Cab & Taxi</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1.5">
                    <p className="font-bold text-white">NK Cab & Taxi</p>
                    <p className="text-gray-400">Salt Lake Sector V Area, Kolkata</p>
                    <p className="text-gray-400">West Bengal, India — 700091</p>
                  </div>
                  <div className="space-y-1.5">
                    <p><a href={`tel:${BUSINESS.phone}`} className="text-[#FF6B00] font-bold hover:underline">{BUSINESS.phone}</a></p>
                    <p><a href={`mailto:${BUSINESS.email}`} className="text-gray-400 hover:text-white">{BUSINESS.email}</a></p>
                    <p className="text-gray-400">24/7, 365 Days</p>
                    <p><a href={BUSINESS.gbpReviewLink} target="_blank" rel="noopener noreferrer" className="text-[#FF6B00] font-semibold hover:underline text-xs">View on Google Maps →</a></p>
                  </div>
                </div>
              </address>
            </div>

            {/* Sidebar — 2 cols */}
            <div className="lg:col-span-2 space-y-5">
              {/* Why Choose Us */}
              <div className="bg-[#F7F5F0] rounded-2xl p-6">
                <h3 className="font-bold text-[#0D1B2A] mb-4">Why Choose NK Cab?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    '₹12/km Sedan — no surge pricing ever',
                    '⭐4.8 Google rating — 5,000+ happy customers',
                    'Police-verified drivers, 5+ years experience',
                    'Clean AC GPS-tracked vehicles',
                    'Free cancellation up to 4 hours before',
                    'Instant WhatsApp confirmation in 2 minutes',
                    '24/7/365 — rain, festival, midnight',
                    '80+ cities, 500+ routes covered',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5 shrink-0">✅</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services quick links */}
              <div className="bg-[#0D1B2A] rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Popular Services</h3>
                <div className="space-y-1">
                  {[
                    { name: 'Airport Transfer Kolkata', href: '/services/airport-transfer' },
                    { name: 'Outstation Cab Kolkata', href: '/services/outstation' },
                    { name: 'One-Way Taxi', href: '/services/one-way' },
                    { name: 'Local Hourly Taxi', href: '/services/local-taxi' },
                    { name: 'Wedding Car Rental', href: '/services/wedding-car-rental' },
                    { name: 'Corporate Car Rental', href: '/services/corporate-car-rental' },
                    { name: 'Kolkata to Darjeeling Cab', href: '/routes/kolkata-to-darjeeling' },
                    { name: 'Kolkata to Puri Cab', href: '/routes/kolkata-to-puri' },
                  ].map(({ name, href }) => (
                    <Link key={href} href={href} className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-gray-400 hover:text-[#FF6B00] hover:bg-white/5 transition-all">
                      <ArrowRight size={12} className="text-[#FF6B00]" /> {name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-14 lg:py-20 bg-[#F7F5F0]" id="faq">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="tag-orange inline-flex mb-4">❓ FAQ</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-3">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* ═══ SEO LINK CLOUD — Comprehensive Internal Links ═══ */}
      <section className="py-10 bg-white" id="popular-searches">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Popular Searches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-3 flex items-center gap-1.5"><MapPin size={13} className="text-[#FF6B00]" /> West Bengal Cities</h3>
              <div className="space-y-0.5">
                {[
                  { name: 'Kolkata', href: '/west-bengal/kolkata' },
                  { name: 'Howrah', href: '/west-bengal/howrah' },
                  { name: 'Siliguri', href: '/west-bengal/siliguri' },
                  { name: 'Darjeeling', href: '/west-bengal/darjeeling' },
                  { name: 'Durgapur', href: '/west-bengal/durgapur' },
                  { name: 'Asansol', href: '/west-bengal/asansol' },
                  { name: 'Kharagpur', href: '/west-bengal/kharagpur' },
                  { name: 'Bardhaman', href: '/west-bengal/bardhaman' },
                  { name: 'Haldia', href: '/west-bengal/haldia' },
                  { name: 'Malda', href: '/west-bengal/malda' },
                  { name: 'Digha', href: '/west-bengal/digha' },
                  { name: 'Shantiniketan', href: '/west-bengal/bolpur-shantiniketan' },
                  { name: 'Midnapore', href: '/west-bengal/midnapore' },
                  { name: 'Barasat', href: '/west-bengal/barasat' },
                  { name: 'Kalyani', href: '/west-bengal/kalyani' },
                  { name: 'Mandarmani', href: '/west-bengal/mandarmani' },
                  { name: 'Cooch Behar', href: '/west-bengal/cooch-behar' },
                  { name: 'Jalpaiguri', href: '/west-bengal/jalpaiguri' },
                  { name: 'Bankura', href: '/west-bengal/bankura' },
                  { name: 'Murshidabad', href: '/west-bengal/murshidabad' },
                ].map(c => <Link key={c.href} href={c.href} className="block py-1 text-sm text-gray-500 hover:text-[#FF6B00] transition-colors">Cab in {c.name}</Link>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-3 flex items-center gap-1.5"><MapPin size={13} className="text-[#FF6B00]" /> Other State Cities</h3>
              <div className="space-y-0.5">
                {[
                  { name: 'Ranchi', href: '/jharkhand/ranchi' },
                  { name: 'Jamshedpur', href: '/jharkhand/jamshedpur' },
                  { name: 'Dhanbad', href: '/jharkhand/dhanbad' },
                  { name: 'Bokaro', href: '/jharkhand/bokaro' },
                  { name: 'Deoghar', href: '/jharkhand/deoghar' },
                  { name: 'Hazaribagh', href: '/jharkhand/hazaribagh' },
                  { name: 'Giridih', href: '/jharkhand/giridih' },
                  { name: 'Dumka', href: '/jharkhand/dumka' },
                  { name: 'Bhubaneswar', href: '/odisha/bhubaneswar' },
                  { name: 'Puri', href: '/odisha/puri' },
                  { name: 'Cuttack', href: '/odisha/cuttack' },
                  { name: 'Rourkela', href: '/odisha/rourkela' },
                  { name: 'Berhampur', href: '/odisha/berhampur' },
                  { name: 'Balasore', href: '/odisha/balasore' },
                  { name: 'Konark', href: '/odisha/konark' },
                  { name: 'Sambalpur', href: '/odisha/sambalpur' },
                  { name: 'Patna', href: '/bihar/patna' },
                  { name: 'Gaya', href: '/bihar/gaya' },
                  { name: 'Varanasi', href: '/uttar-pradesh/varanasi' },
                  { name: 'Prayagraj', href: '/uttar-pradesh/prayagraj' },
                ].map(c => <Link key={c.href} href={c.href} className="block py-1 text-sm text-gray-500 hover:text-[#FF6B00] transition-colors">Cab in {c.name}</Link>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-3 flex items-center gap-1.5"><Route size={13} className="text-[#FF6B00]" /> Kolkata Routes</h3>
              <div className="space-y-0.5">
                {[
                  ['Kolkata to Darjeeling Cab', '/routes/kolkata-to-darjeeling'],
                  ['Kolkata to Puri Cab', '/routes/kolkata-to-puri'],
                  ['Kolkata to Digha Cab', '/routes/kolkata-to-digha'],
                  ['Kolkata to Siliguri Cab', '/routes/kolkata-to-siliguri'],
                  ['Kolkata to Bhubaneswar Cab', '/routes/kolkata-to-bhubaneswar'],
                  ['Kolkata to Ranchi Cab', '/routes/kolkata-to-ranchi'],
                  ['Kolkata to Jamshedpur Cab', '/routes/kolkata-to-jamshedpur'],
                  ['Kolkata to Deoghar Cab', '/routes/kolkata-to-deoghar'],
                  ['Kolkata to Durgapur Cab', '/routes/kolkata-to-durgapur'],
                  ['Kolkata to Balasore Cab', '/routes/kolkata-to-balasore'],
                  ['Kolkata to Mandarmani Cab', '/routes/kolkata-to-mandarmani'],
                  ['Kolkata to Kharagpur Cab', '/routes/kolkata-to-kharagpur'],
                  ['Kolkata to Haldia Cab', '/routes/kolkata-to-haldia'],
                  ['Kolkata to Midnapore Cab', '/routes/kolkata-to-midnapore'],
                  ['Kolkata to Asansol Cab', '/routes/kolkata-to-asansol'],
                  ['Kolkata to Shantiniketan Cab', '/routes/kolkata-to-bolpur-shantiniketan'],
                  ['Kolkata to Gangasagar Cab', '/routes/kolkata-to-gangasagar'],
                  ['Kolkata to Mayapur Cab', '/routes/kolkata-to-mayapur'],
                  ['Kolkata to Patna Cab', '/routes/kolkata-to-patna'],
                  ['Kolkata to Varanasi Cab', '/routes/kolkata-to-varanasi'],
                ].map(([name, href]) => <Link key={href} href={href} className="block py-1 text-sm text-gray-500 hover:text-[#FF6B00] transition-colors">{name}</Link>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-3 flex items-center gap-1.5"><Route size={13} className="text-[#FF6B00]" /> Other Popular Routes</h3>
              <div className="space-y-0.5">
                {[
                  ['Ranchi to Kolkata Cab', '/routes/ranchi-to-kolkata'],
                  ['Jamshedpur to Kolkata Cab', '/routes/jamshedpur-to-kolkata'],
                  ['Bhubaneswar to Kolkata Cab', '/routes/bhubaneswar-to-kolkata'],
                  ['Siliguri to Kolkata Cab', '/routes/siliguri-to-kolkata'],
                  ['Dhanbad to Kolkata Cab', '/routes/dhanbad-to-kolkata'],
                  ['Puri to Bhubaneswar Cab', '/routes/puri-to-bhubaneswar'],
                  ['Balasore to Kolkata Cab', '/routes/balasore-to-kolkata'],
                  ['Ranchi to Jamshedpur Cab', '/routes/ranchi-to-jamshedpur'],
                  ['Jamshedpur to Ranchi Cab', '/routes/jamshedpur-to-ranchi'],
                  ['Deoghar to Kolkata Cab', '/routes/deoghar-to-kolkata'],
                  ['Bokaro to Kolkata Cab', '/routes/bokaro-to-kolkata'],
                  ['Durgapur to Kolkata Cab', '/routes/durgapur-to-kolkata'],
                  ['Asansol to Kolkata Cab', '/routes/asansol-to-kolkata'],
                  ['Darjeeling to Kolkata Cab', '/routes/darjeeling-to-kolkata'],
                  ['Patna to Kolkata Cab', '/routes/patna-to-kolkata'],
                  ['Howrah to Ranchi Cab', '/routes/howrah-to-ranchi'],
                  ['Ranchi to Bhubaneswar Cab', '/routes/ranchi-to-bhubaneswar'],
                  ...popularRoutes.slice(0, 3).map(r => ([`${r.fromName} to ${r.toName} Cab`, `/routes/${r.slug}`])),
                ].map(([name, href]) => <Link key={href} href={href} className="block py-1 text-sm text-gray-500 hover:text-[#FF6B00] transition-colors">{name}</Link>)}
              </div>
            </div>
          </div>

          {/* Services & Tours quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-3 flex items-center gap-1.5"><Car size={13} className="text-[#FF6B00]" /> Services</h3>
              <div className="space-y-0.5">
                {[
                  ['Airport Transfer', '/services/airport-transfer'],
                  ['Outstation Cab', '/services/outstation'],
                  ['One-Way Taxi', '/services/one-way'],
                  ['Round Trip', '/services/round-trip'],
                  ['Local Taxi', '/services/local-taxi'],
                  ['Wedding Car', '/services/wedding-car-rental'],
                  ['Corporate Car', '/services/corporate-car-rental'],
                  ['Tempo Traveller', '/fleet'],
                ].map(([name, href]) => <Link key={href} href={href} className="block py-1 text-sm text-gray-500 hover:text-[#FF6B00] transition-colors">{name}</Link>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-3 flex items-center gap-1.5"><Star size={13} className="text-[#FF6B00]" /> Tour Packages</h3>
              <div className="space-y-0.5">
                {[
                  ['Darjeeling Tour', '/tours/darjeeling-tour'],
                  ['Puri & Konark', '/tours/puri-konark-tour'],
                  ['Sundarbans Safari', '/tours/sundarbans-tour'],
                  ['Varanasi Tour', '/tours/varanasi-ayodhya-tour'],
                  ['North Bengal Tour', '/tours/north-bengal-tour'],
                  ['Kolkata City Tour', '/tours/kolkata-city-tour'],
                  ['Digha Beach Trip', '/tours/digha-beach'],
                  ['Mandarmani Tour', '/tours/mandarmani'],
                ].map(([name, href]) => <Link key={name} href={href} className="block py-1 text-sm text-gray-500 hover:text-[#FF6B00] transition-colors">{name}</Link>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-3 flex items-center gap-1.5"><Route size={13} className="text-[#FF6B00]" /> Ranchi & Jharkhand Routes</h3>
              <div className="space-y-0.5">
                {[
                  ['Ranchi to Patna Cab', '/routes/ranchi-to-patna'],
                  ['Ranchi to Deoghar Cab', '/routes/ranchi-to-deoghar'],
                  ['Ranchi to Dhanbad Cab', '/routes/ranchi-to-dhanbad'],
                  ['Ranchi to Bokaro Cab', '/routes/ranchi-to-bokaro'],
                  ['Ranchi to Hazaribagh Cab', '/routes/ranchi-to-hazaribagh'],
                  ['Ranchi to Puri Cab', '/routes/ranchi-to-puri'],
                  ['Ranchi to Siliguri Cab', '/routes/ranchi-to-siliguri'],
                  ['Ranchi to Darjeeling Cab', '/routes/ranchi-to-darjeeling'],
                ].map(([name, href]) => <Link key={href} href={href} className="block py-1 text-sm text-gray-500 hover:text-[#FF6B00] transition-colors">{name}</Link>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-3 flex items-center gap-1.5"><Route size={13} className="text-[#FF6B00]" /> Bhubaneswar & Odisha Routes</h3>
              <div className="space-y-0.5">
                {[
                  ['Bhubaneswar to Puri Cab', '/routes/bhubaneswar-to-puri'],
                  ['Bhubaneswar to Konark Cab', '/routes/bhubaneswar-to-konark'],
                  ['Bhubaneswar to Cuttack Cab', '/routes/bhubaneswar-to-cuttack'],
                  ['Bhubaneswar to Ranchi Cab', '/routes/bhubaneswar-to-ranchi'],
                  ['Bhubaneswar to Kolkata Cab', '/routes/bhubaneswar-to-kolkata'],
                  ['Puri to Kolkata Cab', '/routes/puri-to-kolkata'],
                  ['Cuttack to Bhubaneswar Cab', '/routes/cuttack-to-bhubaneswar'],
                  ['Rourkela to Bhubaneswar Cab', '/routes/rourkela-to-bhubaneswar'],
                ].map(([name, href]) => <Link key={href} href={href} className="block py-1 text-sm text-gray-500 hover:text-[#FF6B00] transition-colors">{name}</Link>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FloatingButtons component (layout.tsx) already provides persistent Call + WhatsApp buttons */}
    </>
  );
}
