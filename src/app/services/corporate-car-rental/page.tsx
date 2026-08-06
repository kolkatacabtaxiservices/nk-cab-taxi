import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema, generateServiceTypeSchema } from '@/lib/seo';
import { Building, Phone, CheckCircle, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: `Corporate Car Rental Kolkata | GST Invoice | Employee Transport | ₹25,000/month | ${BUSINESS.name}`,
  description: `B2B corporate cab service in Kolkata. GST invoice for ITC claims. Employee transport from Salt Lake Sector V, New Town IT Park. Monthly contracts from ₹25,000. Call ${BUSINESS.phone}.`.slice(0, 160),
  keywords: [
    'corporate car rental kolkata', 'corporate cab service kolkata', 'employee transport kolkata',
    'gst cab invoice kolkata', 'itc cab expense kolkata', 'monthly cab contract kolkata',
    'executive car rental kolkata', 'salt lake sector v cab', 'new town it park cab',
    'business cab kolkata', 'corporate taxi kolkata', 'office cab service kolkata',
    'corporate car rental jharkhand', 'corporate fleet kolkata', 'cab for company kolkata',
  ],
  alternates: { canonical: `${BUSINESS.domain}/services/corporate-car-rental` },
  openGraph: {
    title: `Corporate Car Rental Kolkata | GST Invoice | Monthly Contracts | ${BUSINESS.name}`,
    description: `Corporate cab in Kolkata with GST invoice for ITC. Employee transport, executive rental, event fleets. Salt Lake, New Town, Rajarhat coverage. Fixed rates. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/services/corporate-car-rental`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `B2B Car Rental Service Kolkata — ${BUSINESS.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Corporate Car Rental Kolkata | GST Invoice | ₹25,000/month`,
    description: `Business cab service in Kolkata. GST invoices, monthly contracts, IT park coverage. Fixed fares. Call ${BUSINESS.phone}`,
  },
};

export default function CorporatePage() {
  const faqs = [
    { question: 'How do GST invoices work for corporate cab bookings in Kolkata?', answer: `For every corporate booking, ${BUSINESS.name} issues a GST-compliant tax invoice within 24 hours of trip completion (or monthly for contract clients). The invoice carries our GSTIN, your company GSTIN, the HSN/SAC code for cab services, and a CGST + SGST (intra-state) or IGST (inter-state) split, so your accounts team can claim Input Tax Credit (ITC) directly. Call ${BUSINESS.phone} to open your corporate account.` },
    { question: 'Which Kolkata IT parks and business districts do you cover for employee transport?', answer: 'We cover every major business zone in Kolkata: Salt Lake Sector V (the IT hub), New Town Action Areas I, II and III (Infosys, TCS, Wipro campuses), Rajarhat (Eco Space, Unitech Info Space), Park Street, Dalhousie/BBD Bagh (banks and PSUs) and Howrah (the industrial belt). We also serve Jamshedpur and Dhanbad for steel and manufacturing clients.' },
    { question: 'What SLA commitments do you give corporate fleet clients?', answer: 'For contract clients we commit to: (1) driver dispatch within 15 minutes of a confirmed booking, (2) a substitute vehicle within 45 minutes on breakdown, (3) monthly trip reports with km/time/cost data within 5 business days of month end, and (4) a dedicated WhatsApp line for your fleet coordinator. Formal SLA agreements apply to clients taking 5+ vehicles a month.' },
    { question: 'Can your cabs integrate with our travel management system?', answer: `Yes. For larger clients (₹1L+ monthly billing) we can feed your travel system with structured CSV or email-based trip data exports. We can also set up pre-approved driver lists, employee authorisation codes and department-wise billing. Call ${BUSINESS.phone} to discuss enterprise setup.` },
    { question: 'Is there a trial period for corporate car rental in Kolkata?', answer: 'Yes — new corporate clients can run a 2-week pilot before committing to a monthly contract. During the trial you get the same fleet quality, GST invoices and support at standard rates, and we extend a 10–20% discount on contract signing. Call to arrange your trial.' },
    { question: 'Can you manage multi-city corporate travel from Kolkata?', answer: 'Absolutely. We coordinate multi-city business travel across West Bengal, Jharkhand, Odisha, Bihar and Uttar Pradesh. A Kolkata client can book cabs in Ranchi, Jamshedpur and Bhubaneswar under one corporate account with unified GST billing — ideal for regional sales teams and multi-plant operations.' },
  ];

  const packages = [
    { name: 'Employee Transport', desc: 'Daily pick & drop for office staff', features: ['8 Hrs / 80 KM daily', 'Sedan or SUV available', 'Monthly billing with GST', 'Dedicated driver assigned'], from: '₹25,000/month' },
    { name: 'Executive Car Rental', desc: 'Premium service for CXOs & management', features: ['Innova Crysta / Fortuner', 'Chauffeur in formal attire', 'Airport & hotel transfers', 'Flexible scheduling'], from: '₹35,000/month' },
    { name: 'Business Trip Cab', desc: 'Outstation travel for client meetings', features: ['All India coverage', 'Multi-city itinerary', 'GST invoice provided', 'AC vehicles, verified drivers'], from: '₹16/km onward' },
    { name: 'Event Transport', desc: 'Corporate events & conference travel', features: ['Fleet of 5–50 vehicles', 'Multiple pickup points', 'Coordination manager', 'Tempo Traveller for groups'], from: 'Custom quote' },
  ];

  const badges = ['GST Invoice Provided', 'Monthly Contracts', 'Dedicated Manager', '24/7 Fleet', 'Pan-India Coverage', 'Premium Vehicles'];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceTypeSchema('Corporate Car Rental Kolkata', 'corporate-car-rental', 'Corporate cab and car rental service in Kolkata with GST invoice, monthly packages, employee transport, and executive vehicle rental.')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Services', url: `${BUSINESS.domain}/services` },
        { name: 'Corporate Car Rental', url: `${BUSINESS.domain}/services/corporate-car-rental` }
      ])) }} />

      <section className="relative text-white py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Services', href: '/services' }, { name: 'Corporate Car Rental', href: '/services/corporate-car-rental' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">Corporate <span className="text-gradient">Car Rental in Kolkata</span> ₹25,000/month | GST Invoice</h1>
          <p className="text-lg text-gray-300 max-w-3xl">Business-grade cab service in Kolkata — employee transport, executive cars, airport transfers, monthly contracts and GST invoices. Round-the-clock fleet management for corporates.</p>
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg">
            <Phone size={18} /> Corporate Enquiry: {BUSINESS.phone}
          </a>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-primary font-medium">
                <FileText size={14} /> {badge}
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
                <h2 className="text-2xl font-bold text-secondary mb-4">Corporate Car Rental Service in Kolkata</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>{BUSINESS.name}</strong> runs a full corporate cab and car rental programme in Kolkata built for businesses — from startups to large enterprises around Salt Lake Sector V, New Town IT Park, Rajarhat and Greater Kolkata. Our corporate clients span IT firms, consultancies, manufacturing units and government bodies.
                  </p>
                  <p>
                    We handle employee transport, executive cars for CXOs and senior management, airport pickups for visiting clients, outstation business travel and complete event transport. Every corporate booking comes with a GST-compliant invoice, so your business can claim Input Tax Credit (ITC) on cab spend.
                  </p>
                  <p>
                    Our corporate fleet covers AC Sedans, SUVs, Innova Crysta, Fortuner and Tempo Travellers — all serviced on schedule and driven by professionally trained, police-verified chauffeurs. Monthly contracts, quarterly billing and custom SLAs are available, and every corporate account gets a named relationship manager for smooth coordination.
                  </p>
                </div>
              </div>

              {/* Packages */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Corporate Car Rental Plans in Kolkata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packages.map((pkg, i) => (
                    <div key={i} className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-primary/30 transition-colors">
                      <h4 className="font-bold text-secondary mb-1">{pkg.name}</h4>
                      <p className="text-xs text-gray-400 mb-3">{pkg.desc}</p>
                      <p className="text-xl font-bold text-primary mb-3">From {pkg.from}</p>
                      <div className="space-y-1">
                        {pkg.features.map((f, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle size={12} className="text-green-500" /> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why us */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Why Businesses Choose Us for Corporate Cabs in Kolkata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'GST invoice on every booking — claim ITC on cab expenses',
                    'A named account manager for smooth coordination',
                    'Monthly billing with detailed trip reports',
                    'Background-verified, professionally trained chauffeurs',
                    'AC fleet — Sedan, SUV, Innova Crysta, Fortuner, Tempo',
                    'Covers all Kolkata IT hubs — Salt Lake Sector V, New Town, Rajarhat',
                    'Round-the-clock emergency cab support for corporates',
                    'Pan-India coverage for business travel from Kolkata',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Building size={14} className="text-primary shrink-0 mt-0.5" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">Corporate Cab Enquiry</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><FAQSection faqs={faqs} title="Corporate Car Rental Kolkata — Common Questions" /></div></section>

      {/* Multi-City Corporate Coverage */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-4">Corporate Cabs in <span className="text-primary">Other Cities</span></h2>
          <p className="text-gray-600 mb-6">
            {BUSINESS.name} offers corporate car rental beyond Kolkata — in <strong>Ranchi</strong> (IT hub, steel plants), <strong>Jamshedpur</strong> (Tata Steel, industry), <strong>Bhubaneswar</strong> (IT Park, Infocity) and other cities, with monthly contracts, GST invoices and managed fleets across East India.
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
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">🏢 {city.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Cut Your Corporate Travel Spend by up to 25%</h2>
          <p className="text-white/90 mb-6">Monthly contracts with GST invoices, ITC-eligible billing and a dedicated manager. No surge pricing — fixed rates for your whole team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I would like corporate car rental details. Please share the info.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
