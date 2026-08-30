import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import { BUSINESS } from '@/lib/data';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = {
  title: `Terms & Conditions | ${BUSINESS.name}`,
  description: `The booking rules for ${BUSINESS.name} — covering reservations, cancellations, payments, and how we run each trip. Questions? Call ${BUSINESS.phone}.`,
  robots: { index: true, follow: true },
  alternates: { canonical: `${BUSINESS.domain}/terms/` },
  other: {
    thumbnail: `${BUSINESS.domain}/herobanner.webp`,
  },
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: BUSINESS.domain },
              { name: 'Terms & Conditions', url: `${BUSINESS.domain}/terms` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative text-white py-12 lg:py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Terms & Conditions', href: '/terms' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-3">
            Terms & <span className="text-gradient">Conditions</span>
          </h1>
          <p className="text-gray-300 max-w-3xl">
            Please review these terms before booking a ride with {BUSINESS.name}.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-6">Last Updated: May 2026</p>

          <h2 className="text-xl font-bold text-secondary mb-3">1. What These Terms Cover</h2>
          <p className="text-gray-600 mb-6">
            {BUSINESS.name} runs cab and car rental services across West Bengal, Jharkhand, and Odisha, including city taxis, outstation rides, one-way trips, round trips, airport transfers, wedding cars, and corporate fleets. Making a booking means you accept the rules below.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">2. Booking and Confirmation</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Reserve by phone ({BUSINESS.phone}), WhatsApp, or the booking form on this website</li>
            <li>A ride is only confirmed once you receive a confirmation message over WhatsApp or a call</li>
            <li>We suggest booking 2-4 hours ahead for city trips and 12-24 hours ahead for outstation journeys</li>
            <li>Wedding cars and group travel should be reserved 1-2 weeks in advance</li>
            <li>Outstation bookings may need an advance of ₹500-1,000 to lock the reservation</li>
          </ul>

          <h2 className="text-xl font-bold text-secondary mb-3">3. Fares and Payments</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Every quote already covers fuel, driver wages, and air conditioning</li>
            <li>Tolls, parking, state permits, and night allowance where relevant are charged extra and quoted to you in advance</li>
            <li>We never apply surge pricing — our rates stay fixed around the clock, all year</li>
            <li>Outstation trips bill a minimum of 250 km per day. City trips bill a minimum of 4 hours / 40 km</li>
            <li>Pay with Cash, UPI, Credit/Debit Card, or Bank Transfer</li>
            <li>Corporate clients can set up monthly billing with GST invoices</li>
          </ul>

          <h2 className="text-xl font-bold text-secondary mb-3">4. Cancellations and Refunds</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Cancelling at least 4 hours before your scheduled pickup is free</li>
            <li>Cancellations made inside the 4-hour window may carry a small fee of ₹200-500</li>
            <li>No-show: if you are not at the pickup point within 30 minutes of the scheduled time, the ride counts as a no-show and a cancellation fee is charged</li>
            <li>Prepaid bookings are refunded within 3-5 business days</li>
          </ul>

          <h2 className="text-xl font-bold text-secondary mb-3">5. What We Ask of Passengers</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Share a correct pickup address and working contact number</li>
            <li>Be ready at the pickup point at the agreed time</li>
            <li>Illegal substances, weapons, and hazardous materials are banned from all trips</li>
            <li>No smoking or drinking inside any of our vehicles</li>
            <li>Damage to the car caused by a passenger is billed to that passenger</li>
            <li>Luggage is limited to the vehicle&apos;s capacity; extra luggage may call for a bigger car</li>
          </ul>

          <h2 className="text-xl font-bold text-secondary mb-3">6. Drivers and Vehicles</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Every driver is police-verified, holds a valid commercial licence, and has at least 5 years of experience</li>
            <li>You get an AC car in the category you booked (Sedan, SUV, or Tempo Traveller)</li>
            <li>The category is guaranteed, but the exact model may differ (for example, Dzire or Amaze in place of a Sedan)</li>
            <li>On the rare occasion of a breakdown, we send a replacement car at no extra cost</li>
          </ul>

          <h2 className="text-xl font-bold text-secondary mb-3">7. Safety and Insurance</h2>
          <p className="text-gray-600 mb-6">
            Every vehicle in our fleet is comprehensively insured and holds a current fitness certificate. All cars are GPS-tracked. In an accident or emergency, call our helpline right away at {BUSINESS.phone}; the driver follows our standard safety procedures as well.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">8. Limits of Our Liability</h2>
          <p className="text-gray-600 mb-6">
            {BUSINESS.name} accepts no liability for delays from traffic, weather, road closures, strikes, or any event outside our control. We are also not responsible for items left behind in a vehicle after the ride — please check for your belongings before getting out.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">9. Changing Your Route</h2>
          <p className="text-gray-600 mb-6">
            You can change your destination or stretch out the trip while on the road. Extra distance is billed at the same per-km rate. Let the driver know, or call us, to make any adjustment.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">10. Dispute Resolution</h2>
          <p className="text-gray-600 mb-6">
            Disputes that arise from our services fall under the jurisdiction of the courts in Jamshedpur, Jharkhand, India. We first encourage settling disagreements with our customer support team.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">11. Updates to These Terms</h2>
          <p className="text-gray-600 mb-6">
            We may revise these Terms & Conditions at any time. Changes appear on this page, and continuing to use our services means you accept the updated terms.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">12. How to Reach Us</h2>
          <div className="bg-accent rounded-xl p-4 text-sm text-gray-700">
            <p><strong>{BUSINESS.name}</strong></p>
            <p>Phone: <a href={`tel:${BUSINESS.phone}`} className="text-primary font-semibold hover:underline">{BUSINESS.phone}</a></p>
            <p>Email: <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline">{BUSINESS.email}</a></p>
            <p>Address: Bistupur, Jamshedpur, Jharkhand, India \u2014 831001</p>
          </div>
        </div>
      </section>
    </>
  );
}
