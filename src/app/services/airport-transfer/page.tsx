import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema, generateAirportTransferSchema } from '@/lib/seo';
import { Plane, Clock, Shield, CheckCircle, Phone, Star } from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Kolkata Airport Cab ₹1200 | CCU Pickup & Drop Taxi | 24/7 Booking',
  description: `Airport taxi service across Kolkata (CCU), Ranchi (IXR), Bhubaneswar (BBI). Sedan ₹1,200, SUV ₹1,800, Innova ₹2,200. Live flight tracking, arrivals meet & greet, round-the-clock. Flat fares. Call ${BUSINESS.phone}`.slice(0, 160),
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  alternates: { canonical: `${BUSINESS.domain}/services/airport-transfer/` },
  openGraph: {
    title: 'Kolkata Airport Taxi ₹1200 | CCU Pickup & Drop | 24/7',
    description: `Airport taxis in Kolkata from ₹1,200. CCU pickups and drops with live flight tracking and flat fares. Sedan, SUV, Innova Crysta fleet. Call ${BUSINESS.phone}`,
    type: 'website',
    siteName: BUSINESS.name,
    url: `${BUSINESS.domain}/services/airport-transfer`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: 'Kolkata CCU Airport Transfer Cab Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airport Taxi Kolkata ₹1200 | CCU Cab 24/7',
    description: `Airport cab in Kolkata from ₹1,200. Flat fares day and night. Call ${BUSINESS.phone}`,
  },
};

export default function AirportTransferPage() {
  const faqs = [
    { question: 'How does pickup from Kolkata airport work?', answer: `Your driver follows your flight live at Netaji Subhash Chandra Bose International Airport (CCU), Dum Dum. He stands at the arrivals gate holding a name board. If the flight runs late, no added fee applies. Ring ${BUSINESS.phone} to reserve your pickup.` },
    { question: 'At which airports can we get a cab?', answer: 'Our cabs run at airports throughout the three states we operate in: Kolkata (CCU), Ranchi (IXR), Bhubaneswar (BBI) and Bagdogra/Siliguri (IXB). CCU in Kolkata remains our main base.' },
    { question: 'How much does an airport transfer from Kolkata cost?', answer: 'Transfer pricing is set by distance. Leaving CCU airport: a Sedan to the city centre (Salt Lake, New Town, Howrah, Park Street) runs ₹1,200–₹1,800 and an SUV ₹1,800–₹2,200. Outstation drops are billed at per-kilometre rates.' },
    { question: 'Is a night-time airport cab available in Kolkata?', answer: 'Certainly — we run round the clock at Kolkata airport, covering early-morning and very late flights. Night-time travel carries no extra cost; the same fare applies at every hour.' },
    { question: 'Can a group book an airport transfer in Kolkata?', answer: 'Of course — Tempo Travellers and several cars can be arranged for group transfers from CCU, ideal for corporate teams, families and wedding parties.' },
    { question: 'How far in advance should a Kolkata airport cab be booked?', answer: `Book at least 2 hours ahead of your pickup. For outstation journeys starting from Kolkata airport, plan a day earlier. WhatsApp ${BUSINESS.phone} for an immediate confirmation.` },
  ];

  const airports = [
    { code: 'CCU', name: 'Netaji Subhash Chandra Bose Intl. Airport', city: 'Kolkata', note: 'Main base at Dum Dum, Kolkata' },
    { code: 'IXR', name: 'Birsa Munda Airport', city: 'Ranchi', note: 'Serves Jharkhand' },
    { code: 'BBI', name: 'Biju Patnaik Intl. Airport', city: 'Bhubaneswar', note: 'Serves Odisha' },
    { code: 'IXB', name: 'Bagdogra Airport', city: 'Siliguri', note: 'North Bengal entry point to Darjeeling' },
  ];

  const fareTable = [
    { vehicle: '🚗 Sedan (Swift Dzire / Amaze)', capacity: '4', cityFare: '₹1,200 – ₹1,800', outstationFare: '₹12/km' },
    { vehicle: '🚙 SUV (Ertiga / Innova)', capacity: '6', cityFare: '₹1,800 – ₹2,200', outstationFare: '₹16/km' },
    { vehicle: '🚘 Innova Crysta', capacity: '7', cityFare: '₹2,200', outstationFare: '₹18/km' },
    { vehicle: '🚌 Tempo Traveller', capacity: '12', cityFare: '₹3,500', outstationFare: '₹22/km' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAirportTransferSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'Services', url: `${BUSINESS.domain}/services` },
        { name: 'Airport Transfer', url: `${BUSINESS.domain}/services/airport-transfer` }
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Services', href: '/services' }, { name: 'Airport Transfer', href: '/services/airport-transfer' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">Airport <span className="text-gradient">Cab Service</span> in Kolkata ₹1,200 | 24/7 CCU Taxi</h1>
          <p className="text-lg text-gray-300 max-w-3xl">Dependable airport taxi service at Netaji Subhash Chandra Bose Airport (CCU), Kolkata. Live flight tracking, meet-and-greet at the arrivals gate, service around the clock — zero waiting.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg">
              <Phone size={18} /> Book Now: {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {[
              { icon: <Plane size={16} />, text: 'Live Flight Tracking' },
              { icon: <Clock size={16} />, text: 'Round-the-Clock Airport Service' },
              { icon: <Shield size={16} />, text: 'Background-Checked Drivers' },
              { icon: <Star size={16} />, text: 'Rated 4.9★ by Airport Travelers' },
              { icon: <CheckCircle size={16} />, text: 'Flat Fares at Night' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-primary font-medium">
                {badge.icon} {badge.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-4">Airport Pickup & Drop — Kolkata CCU Cab Service</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>{BUSINESS.name}</strong> runs a trusted airport taxi service in Kolkata from Netaji Subhash Chandra Bose International Airport (IATA: CCU), Dum Dum. Need a ride from the terminal to Salt Lake, New Town, Howrah, Park Street, or any other locality — or a pre-flight drop from anywhere in the city to CCU? We handle both, seven days a week, around the clock.
                  </p>
                  <p>
                    Using the airport cab service is straightforward: reserve over a call or WhatsApp on {BUSINESS.phone}. Our driver monitors your flight live, then waits at the arrivals gate holding a board with your name. A delayed flight never attracts a surcharge.
                  </p>
                  <p>
                    For outbound journeys, the driver reaches your address 15–20 minutes ahead of the agreed time so you have ample margin for check-in. Every terminal at Kolkata airport, domestic and international, is covered.
                  </p>
                  <p>
                    Outside Kolkata, airport transfers are available at Birsa Munda (Ranchi), Biju Patnaik (Bhubaneswar), and Bagdogra (Siliguri/Darjeeling).
                  </p>
                </div>
              </div>

              {/* Fare Table */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Kolkata Airport Transfer Pricing</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-secondary text-white">
                        <th className="px-4 py-3 text-left text-sm">Car Type</th>
                        <th className="px-4 py-3 text-center text-sm">Seats</th>
                        <th className="px-4 py-3 text-center text-sm">City Run (CCU)</th>
                        <th className="px-4 py-3 text-center text-sm">Intercity Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fareTable.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-semibold text-secondary text-sm">{row.vehicle}</td>
                          <td className="px-4 py-3 text-center text-gray-500 text-sm">{row.capacity}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">{row.cityFare}</td>
                          <td className="px-4 py-3 text-center text-gray-600 text-sm">{row.outstationFare}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">* Intercity trips add toll and parking. Night flights carry no surcharge.</p>
              </div>

              {/* How it works */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Booking Your Kolkata Airport Cab in Three Steps</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { step: '1', title: 'Reserve by Call or WhatsApp', desc: `Share your flight number and pickup spot with us on ${BUSINESS.phone} by call or WhatsApp.` },
                    { step: '2', title: 'Driver Confirmed in Minutes', desc: 'A background-checked driver is allotted and his name plus phone number reach you within minutes.' },
                    { step: '3', title: 'Meet, Board & Travel', desc: 'The driver greets you at the arrivals gate with a name board; flight delays are picked up automatically.' },
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-accent/50 rounded-xl border border-primary/10">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm mb-3">{item.step}</div>
                      <h4 className="font-bold text-secondary mb-1 text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Airports */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Airports Covered by Our Cabs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {airports.map((airport) => (
                    <div key={airport.code} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="w-12 h-8 bg-secondary text-white rounded text-center flex items-center justify-center text-xs font-bold">{airport.code}</div>
                      <div>
                        <p className="font-semibold text-secondary text-sm">{airport.city}</p>
                        <p className="text-xs text-gray-400">{airport.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">Airport Cab Helpline</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">
                  📞 {BUSINESS.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} title="Kolkata Airport Transfer — Common Questions" />
        </div>
      </section>

      {/* Multi-Airport Coverage */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-4">Airport Taxi Service at <span className="text-primary">Other Airports</span></h2>
          <p className="text-gray-600 mb-6">
            Apart from Kolkata Airport (CCU), {BUSINESS.name} runs airport transfers at <strong>Birsa Munda Airport, Ranchi</strong> and <strong>Biju Patnaik Airport, Bhubaneswar</strong> — the same dependable service with live flight tracking, arrivals meet-and-greet, round-the-clock availability and flat pricing. Airport rides to the closest terminals are also arranged from Jamshedpur, Dhanbad and Siliguri.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { airport: 'Birsa Munda Airport (IXR)', city: 'Ranchi', href: '/jharkhand/ranchi', fare: '₹600' },
              { airport: 'Biju Patnaik Airport (BBI)', city: 'Bhubaneswar', href: '/odisha/bhubaneswar', fare: '₹500' },
              { airport: 'Bagdogra Airport (IXB)', city: 'Siliguri', href: '/west-bengal/siliguri', fare: '₹1,200' },
            ].map((a) => (
              <Link key={a.city} href={a.href} className="group p-5 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all">
                <p className="text-xs text-gray-400 mb-1">{a.airport}</p>
                <p className="font-semibold text-secondary group-hover:text-primary transition-colors">✈️ {a.city} Airport Cab</p>
                <p className="text-primary font-bold text-sm mt-2">Sedan from {a.fare}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve an Airport Cab — Kolkata, Ranchi, Bhubaneswar</h2>
          <p className="text-white/90 mb-6">Airport pickups and drops at any hour, from any terminal. Around-the-clock service with flat fares.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! Please share airport transfer cab details and fares.')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
