import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import { BUSINESS } from '@/lib/data';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = {
  title: `Privacy Policy | ${BUSINESS.name}`,
  description: `How ${BUSINESS.name} handles your data. Read about what we gather, why we use it, and the steps we take to keep your details safe when booking a cab in Kolkata and East India.`,
  robots: { index: true, follow: true },
  alternates: { canonical: `${BUSINESS.domain}/privacy-policy` },
  other: {
    thumbnail: `${BUSINESS.domain}/navbanner.webp`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: BUSINESS.domain },
              { name: 'Privacy Policy', url: `${BUSINESS.domain}/privacy-policy` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative text-white py-12 lg:py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-3">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-gray-300 max-w-3xl">
            We take your privacy seriously. This page explains what data {BUSINESS.name} gathers, why we need it, and how we keep it secure.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-6">Last Updated: May 2026</p>

          <h2 className="text-xl font-bold text-secondary mb-3">1. What Information We Gather</h2>
          <p className="text-gray-600 mb-4">
            We may ask for the details listed below when you make a booking with {BUSINESS.name}:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Your name and how we can reach you (phone number, email address)</li>
            <li>Where you want to be picked up and dropped off</li>
            <li>Travel dates and any preferences you share</li>
            <li>Your preferred vehicle type and passenger count</li>
            <li>Payment details, only when you pay online</li>
            <li>Booking-related communication such as WhatsApp messages and call records</li>
          </ul>

          <h2 className="text-xl font-bold text-secondary mb-3">2. How We Use What You Share</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>To confirm and manage your cab reservations</li>
            <li>To match you with a suitable driver and vehicle</li>
            <li>To send you booking confirmation, driver details, and trip updates</li>
            <li>To answer your questions and provide support</li>
            <li>To improve our service and tailor it to your needs</li>
            <li>To share offers and promotions, only if you agree</li>
            <li>To meet our legal requirements</li>
          </ul>

          <h2 className="text-xl font-bold text-secondary mb-3">3. Who We Share Data With</h2>
          <p className="text-gray-600 mb-4">
            We never sell, trade, or rent your personal details to anyone else. We may share your information only with:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Our drivers, who receive only what is essential for the trip, such as your name, pickup point, and phone number</li>
            <li>Payment gateways, so online payments are processed safely</li>
            <li>Authorities, only when the law demands it or safety is at risk</li>
          </ul>

          <h2 className="text-xl font-bold text-secondary mb-3">4. How We Protect Your Data</h2>
          <p className="text-gray-600 mb-6">
            We use sensible safeguards to keep your personal information safe from unauthorized access, changes, leaks, or loss. Online payments are encrypted with SSL technology. Still, no internet connection can ever be 100% secure, so we cannot promise absolute protection.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">5. Cookies and Analytics</h2>
          <p className="text-gray-600 mb-6">
            This site may use cookies and analytics tools such as Google Analytics to understand how visitors use it, improve our services, and make browsing smoother. You can switch off cookies anytime in your browser settings.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">6. Your Rights Over Your Data</h2>
          <p className="text-gray-600 mb-4">As a user, you can:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>View, update, or erase your personal data</li>
            <li>Stop receiving promotional messages</li>
            <li>Ask for a copy of the data we hold on you</li>
            <li>Change your mind and withdraw consent for data processing</li>
          </ul>

          <h2 className="text-xl font-bold text-secondary mb-3">7. How Long We Keep Your Data</h2>
          <p className="text-gray-600 mb-6">
            We keep your booking details for a reasonable time so we can serve you better on future trips and meet legal obligations. You can ask us to delete your data at any time by getting in touch.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">8. Updates to This Policy</h2>
          <p className="text-gray-600 mb-6">
            We may revise this Privacy Policy now and then. Any changes will appear on this page with a fresh date, so please check back occasionally.
          </p>

          <h2 className="text-xl font-bold text-secondary mb-3">9. Getting in Touch</h2>
          <p className="text-gray-600 mb-2">
            If you have any questions about this Privacy Policy, reach out to us:
          </p>
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
