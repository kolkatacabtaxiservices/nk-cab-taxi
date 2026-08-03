import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema, generateWeddingCarSchema } from '@/lib/seo';
import { Heart, Phone, CheckCircle, Calendar, Star } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: `Wedding Car Rental Kolkata | Decorated Innova, Fortuner ₹3,500 | Baraat & Vidaai | ${BUSINESS.name}`,
  description: `Premium wedding car rental in Kolkata with fresh flower decoration. Innova Crysta ₹5,000, Fortuner ₹8,000, Sedan ₹3,500. Baraat fleet, vidaai car, guest transport. Book 2 weeks early. Call ${BUSINESS.phone}.`.slice(0, 160),
  keywords: [
    'wedding car rental kolkata', 'wedding car kolkata', 'decorated car kolkata wedding',
    'baraat car kolkata', 'vidaai car kolkata', 'innova crysta wedding kolkata',
    'fortuner wedding car kolkata', 'flower decorated car kolkata', 'wedding cab kolkata',
    'wedding car booking kolkata', 'bridal car kolkata', 'dulha car kolkata',
    'wedding fleet kolkata', 'marriage car kolkata', 'wedding chauffeur kolkata',
  ],
  alternates: { canonical: `${BUSINESS.domain}/services/wedding-car-rental` },
  openGraph: {
    title: `Wedding Car Rental Kolkata | Decorated Innova & Fortuner | ${BUSINESS.name}`,
    description: `Flower-decorated wedding cars in Kolkata. Innova Crysta ₹5,000, Fortuner ₹8,000. Baraat fleet, vidaai arrangements. Professional chauffeur. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/services/wedding-car-rental`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `Wedding Car Rental Kolkata — ${BUSINESS.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Wedding Car Rental Kolkata | Decorated Cars from ₹3,500`,
    description: `Premium wedding cars in Kolkata. Innova, Fortuner with flower decoration. Baraat & vidaai service. Call ${BUSINESS.phone}`,
  },
};

export default function WeddingCarPage() {
  const faqs = [
    { question: 'How is the flower decoration done for wedding cars in Kolkata?', answer: `Our team prepares fresh flower garlands, ribbon bows, and decorative elements on the morning of your wedding day — within 2 hours of your scheduled pickup. We use fresh marigold, rose, and seasonal flowers sourced locally. The decoration is done professionally and looks beautiful for photos. Call ${BUSINESS.phone} to discuss specific decoration preferences.` },
    { question: 'Which Kolkata wedding season should I book in advance?', answer: 'Kolkata has two peak wedding seasons: November–February (winter weddings, most popular) and May–June (pre-monsoon auspicious dates). During these months our decorated fleet books up 2–3 weeks in advance. For Muhurats in November–January, we recommend booking 3–4 weeks early. Off-season bookings can be made 1 week before.' },
    { question: 'Can you provide multiple decorated cars for a big baraat in Kolkata?', answer: 'Yes! We manage fleet baraat arrangements — from 3 to 20+ decorated vehicles including the groom’s main car (Innova Crysta or Fortuner), 2–4 supporting sedans for family, and 1–2 Tempo Travellers for larger wedding groups. All vehicles are decorated in a coordinated theme. Call for a complete wedding transport quote.' },
    { question: 'What is the difference between baraat car and vidaai car arrangements?', answer: 'The baraat car (groom’s side) typically features bold, festive decoration with marigold garlands and ribbons, focused on visual impact for the procession. The vidaai car (bride’s send-off) has a more elegant, romantic decoration — white/pink rose garlands, subtle ribbon, and a calm interior. We customize decoration separately for both occasions upon request.' },
    { question: 'Do you provide cars for guest transport to wedding venues in Kolkata?', answer: 'Yes! Besides the main bridal/baraat vehicles, we provide multiple Tempo Travellers (12–17 seater) and sedans for wedding guest transport from hotels, railway stations, and Kolkata airport (CCU). Our coordination team manages the schedule so all guests reach the venue on time. Essential for destination weddings within West Bengal.' },
    { question: 'Is there a cancellation policy for wedding car bookings?', answer: 'Wedding car bookings cancelled more than 7 days before the event receive a full refund of any advance paid. Cancellations within 3–7 days attract a 30% cancellation fee. Cancellations within 48 hours are non-refundable due to decoration and driver scheduling costs. We strongly recommend confirming the booking once wedding dates are fixed.' },
  ];

  const packages = [
    { name: 'Sedan Wedding Package', vehicle: 'Decorated Swift Dzire / Amaze', capacity: '4', price: '₹3,500 – ₹5,000', includes: ['Flower decoration', 'Ribbon & bow', 'Professional driver', 'Fuel included'] },
    { name: 'Innova Crysta Package', vehicle: 'Decorated Innova Crysta 7-Seater', capacity: '7', price: '₹5,000 – ₹8,000', includes: ['Full flower garland', 'Premium ribbon', 'Professional driver', 'Fuel included'] },
    { name: 'Fortuner Package', vehicle: 'Decorated Toyota Fortuner', capacity: '6', price: '₹8,000 – ₹12,000', includes: ['Luxury flower decoration', 'Premium ribbon', 'Professional chauffeur', 'Red carpet'] },
    { name: 'Luxury Car Package', vehicle: 'Mercedes / BMW (Luxury)', capacity: '4', price: '₹12,000 – ₹20,000', includes: ['Exotic flower decoration', 'Champagne interior', 'Uniformed chauffeur', 'Red carpet & roses'] },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWeddingCarSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Services', url: `${BUSINESS.domain}/services` },
        { name: 'Wedding Car Rental', url: `${BUSINESS.domain}/services/wedding-car-rental` }
      ])) }} />

      <section className="relative text-white py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Services', href: '/services' }, { name: 'Wedding Car Rental', href: '/services/wedding-car-rental' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">Wedding Car <span className="text-gradient">Rental in Kolkata</span> ₹3,500 | Decorated Cars</h1>
          <p className="text-lg text-gray-300 max-w-3xl">Premium decorated cars for your special day in Kolkata — baraat, vidaai, wedding functions. Flower-decorated Innova Crysta, Fortuner & luxury sedans with professional chauffeurs.</p>
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg">
            <Phone size={18} /> Book Wedding Car: {BUSINESS.phone}
          </a>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {['Flower Decoration', 'Ribbon & Bow', 'Red Carpet', 'Professional Chauffeur', '4.9★ Wedding Rating', 'Baraat & Vidaai'].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-primary font-medium">
                <Heart size={14} /> {badge}
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
                <h2 className="text-2xl font-bold text-secondary mb-4">Wedding Car Rental Service in Kolkata</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Make your wedding day unforgettable with <strong>{BUSINESS.name}</strong>&apos;s premium wedding car rental service in Kolkata. We provide beautifully decorated vehicles for every wedding occasion — baraat (groom&apos;s procession), vidaai (bride&apos;s send-off), wedding reception, and family transport. Serving all areas of Kolkata including Salt Lake, New Town, Howrah, Park Street, Ballygunge, Behala, Dum Dum, and all Kolkata suburbs.
                  </p>
                  <p>
                    Our fleet of wedding cars includes elegantly decorated Innova Crysta (7-seater), Toyota Fortuner, luxury sedans, and Mercedes/BMW for the most premium experience. All vehicles come with fresh flower garlands, ribbon and bow decoration, red carpet, and a professionally dressed, experienced chauffeur to make the bride and groom feel truly royal.
                  </p>
                  <p>
                    We also provide fleet arrangements for complete wedding transportation — multiple decorated vehicles for baraat procession, Tempo Travellers for wedding guests, and airport/railway pickup service for guests arriving from out of town. Call {BUSINESS.phone} to discuss your complete wedding transport needs.
                  </p>
                </div>
              </div>

              {/* Packages */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Wedding Car Packages in Kolkata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packages.map((pkg, i) => (
                    <div key={i} className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-primary/30 transition-colors">
                      <h4 className="font-bold text-secondary mb-1">{pkg.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{pkg.vehicle} • {pkg.capacity} seater</p>
                      <p className="text-xl font-bold text-primary mb-3">{pkg.price}</p>
                      <div className="space-y-1">
                        {pkg.includes.map((item, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle size={12} className="text-green-500" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">* Prices vary by decoration type, date, and trip distance. Call for exact quote.</p>
              </div>

              {/* Why choose */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Why Choose Us for Wedding Car Rental in Kolkata?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Fresh flower decoration arranged on the morning of your wedding',
                    'Professional chauffeurs in formal attire',
                    'On-time pickup — we guarantee no delays on your special day',
                    'Red carpet, ribbon, and bow included in all packages',
                    'Serving all Kolkata areas — Salt Lake, New Town, Howrah & more',
                    'Baraat procession fleet — 5 to 20+ vehicles available',
                    'Innova Crysta, Fortuner, BMW, Mercedes available',
                    '4.9★ rating from 428+ wedding customers in Kolkata',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Heart size={14} className="text-red-400 shrink-0 mt-0.5" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">Wedding Car Booking</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><FAQSection faqs={faqs} title="Wedding Car Rental Kolkata — FAQs" /></div></section>

      {/* Multi-City Wedding Coverage */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-4">Wedding Car Rental in <span className="text-primary">Other Cities</span></h2>
          <p className="text-gray-600 mb-6">
            Planning a wedding outside Kolkata? {BUSINESS.name} provides decorated wedding car rental in <strong>Ranchi</strong>, <strong>Jamshedpur</strong>, <strong>Bhubaneswar</strong>, <strong>Dhanbad</strong>, and other cities across East India. Same premium decoration, professional chauffeurs, and on-time guarantee.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: 'Ranchi', href: '/jharkhand/ranchi' },
              { name: 'Jamshedpur', href: '/jharkhand/jamshedpur' },
              { name: 'Bhubaneswar', href: '/odisha/bhubaneswar' },
              { name: 'Dhanbad', href: '/jharkhand/dhanbad' },
              { name: 'Siliguri', href: '/west-bengal/siliguri' },
              { name: 'Durgapur', href: '/west-bengal/durgapur' },
            ].map((city) => (
              <Link key={city.name} href={city.href} className="group p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-all text-center">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">💒 {city.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Your Special Day Deserves a Perfect Car — Book Early!</h2>
          <p className="text-white/90 mb-6">Wedding car bookings fill up fast during November–February. Secure your decorated Innova Crysta or Fortuner now — no last-minute stress on your big day.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I want to book a decorated wedding car.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
