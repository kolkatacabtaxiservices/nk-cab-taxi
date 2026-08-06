import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';

import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS } from '@/lib/data';
import { generateContactPageSchema, generateBreadcrumbSchema, generateFaqSchema, generateWebPageSchema } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata = {
  title: { absolute: `Reach ${BUSINESS.name} — Call or WhatsApp ${BUSINESS.phone} 24/7` },
  description: `Hire ${BUSINESS.name} in minutes — ring ${BUSINESS.phone} or WhatsApp. No app or sign-up needed. Sedan ₹12/km, airport runs, outstation trips, wedding cars, 80+ cities. Confirmed in two minutes.`,
  openGraph: {
    title: `Talk to Us — Call ${BUSINESS.phone} | ${BUSINESS.name} 24/7`,
    description: `Ring or WhatsApp ${BUSINESS.phone}. No app. Booking confirmed in 2 minutes. Sedans from ₹12/km across 80+ cities.`,
    type: 'website',
    siteName: 'NK Cab & Taxi',
    url: `${BUSINESS.domain}/contact`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: 'Reach out to NK Cab & Taxi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Get a Ride — ${BUSINESS.phone} | ${BUSINESS.name}`,
    description: `Call or WhatsApp ${BUSINESS.phone}. No app needed. Confirmed in 2 minutes from ₹12/km.`,
    images: [`${BUSINESS.domain}/navbanner.webp`],
  },
  alternates: { canonical: `${BUSINESS.domain}/contact` },
  other: { thumbnail: `${BUSINESS.domain}/navbanner.webp` },
};

const contactFaqs = [
  { question: `What is the phone number of ${BUSINESS.name}?`, answer: `${BUSINESS.name} is on ${BUSINESS.phone} around the clock for bookings, fare quotes, and assistance. Message the same number on WhatsApp and your booking is confirmed on the spot.` },
  { question: `Where is ${BUSINESS.name} located?`, answer: `${BUSINESS.name} operates out of Kolkata, West Bengal, and serves five states — West Bengal, Jharkhand, Odisha, Bihar, and Uttar Pradesh — spanning 80+ cities from Kolkata, Jamshedpur, Ranchi, Dhanbad, Bhubaneswar, and Siliguri to many more.` },
  { question: `What are the working hours of ${BUSINESS.name}?`, answer: `Our fleet runs 24 hours a day, every week, all 365 days. Early flight at 3 AM, festival season, or a national holiday — a cab is always ready. Call ${BUSINESS.phone} whenever you need one.` },
  { question: `How can I book a cab with ${BUSINESS.name}?`, answer: `Pick any of three routes: call ${BUSINESS.phone}, WhatsApp ${BUSINESS.phone}, or complete the booking form on this site. Tell us pickup, drop-off, date, time, and travellers, and you receive confirmation within two minutes.` },
  { question: `Do you provide GST invoices for corporate bookings?`, answer: `Absolutely. GST-compliant invoices are issued for every corporate booking, so businesses in Kolkata, Ranchi, Jamshedpur, and elsewhere can claim input tax credit. Write to ${BUSINESS.email} or call ${BUSINESS.phone} for corporate deals.` },
  { question: `What payment methods do you accept?`, answer: `We take cash, UPI (Google Pay, PhonePe, Paytm), debit/credit cards, and bank transfers (NEFT). Corporates can also use purchase orders with monthly invoicing, and cash rides are settled after the trip.` },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateContactPageSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([{ name: 'Home', url: BUSINESS.domain }, { name: 'Contact Us', url: `${BUSINESS.domain}/contact` }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(contactFaqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebPageSchema(
        'Reach NK Cab & Taxi',
        `Get in touch with ${BUSINESS.name} to book a cab. Call ${BUSINESS.phone} — open 24/7.`,
        `${BUSINESS.domain}/contact`,
        'ContactPage'
      )) }} />

      {/* Geo meta — Kolkata primary (main business hub) */}
      <meta name="geo.region" content="IN-WB" />
      <meta name="geo.placename" content="Kolkata" />
      <meta name="geo.position" content="22.5726;88.3639" />
      <meta name="ICBM" content="22.5726, 88.3639" />

      <section className="relative text-white py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Contact Us', href: '/contact' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">Contact <span className="text-gradient">{BUSINESS.name}</span></h1>
          <p className="text-lg text-gray-300">Need a car or a fare estimate? We&apos;re awake around the clock — call, WhatsApp, or use the form on this page.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-6">Reach Us Directly</h2>
              <div className="space-y-6">
                <a href={`tel:${BUSINESS.phone}`} className="flex items-start gap-4 p-5 bg-accent/50 rounded-2xl hover:bg-accent transition-colors group">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shrink-0"><Phone size={24} /></div>
                  <div>
                    <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">Call Us</h3>
                    <p className="text-gray-500 text-sm">Live round the clock for hires</p>
                    <p className="text-primary font-bold text-lg mt-1">{BUSINESS.phone}</p>
                  </div>
                </a>

                <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hello! I would like to book a cab.')}`} className="flex items-start gap-4 p-5 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shrink-0">💬</div>
                  <div>
                    <h3 className="font-bold text-secondary group-hover:text-green-600 transition-colors">WhatsApp</h3>
                    <p className="text-gray-500 text-sm">Message us and book in moments</p>
                    <p className="text-green-600 font-bold text-lg mt-1">{BUSINESS.phone}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white shrink-0"><Mail size={24} /></div>
                  <div>
                    <h3 className="font-bold text-secondary">Email</h3>
                    <p className="text-gray-500 text-sm">For questions and business accounts</p>
                    <p className="text-secondary font-bold mt-1">{BUSINESS.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white shrink-0"><Clock size={24} /></div>
                  <div>
                    <h3 className="font-bold text-secondary">Operating Hours</h3>
                    <p className="text-gray-500 text-sm">Open every day of the year</p>
                    <p className="text-secondary font-bold mt-1">{BUSINESS.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white shrink-0"><MapPin size={24} /></div>
                  <div>
                    <h3 className="font-bold text-secondary">Service Areas</h3>
                    <p className="text-gray-500 text-sm">Serving three states and beyond</p>
                    <p className="text-secondary font-medium text-sm mt-1">West Bengal • Jharkhand • Odisha</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <FAQSection faqs={contactFaqs} title={`Common Questions About ${BUSINESS.name}`} />
        </div>
      </section>

      {/* Map */}
      <GoogleMapEmbed />
    </>
  );
}
