import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { BUSINESS } from '@/lib/data';
import { getPopularRoutes } from '@/lib/routeData';

export default async function Footer() {
  const popularRoutes = await getPopularRoutes(10);


  const wbCities = [
    { name: 'Kolkata', href: '/west-bengal/kolkata' },
    { name: 'Siliguri', href: '/west-bengal/siliguri' },
    { name: 'Darjeeling', href: '/west-bengal/darjeeling' },
    { name: 'Durgapur', href: '/west-bengal/durgapur' },
    { name: 'Asansol', href: '/west-bengal/asansol' },
    { name: 'Kharagpur', href: '/west-bengal/kharagpur' },
    { name: 'Haldia', href: '/west-bengal/haldia' },
    { name: 'Malda', href: '/west-bengal/malda' },
    { name: 'Bardhaman', href: '/west-bengal/bardhaman' },
    { name: 'Kalyani', href: '/west-bengal/kalyani' },
    { name: 'Shantiniketan', href: '/west-bengal/shantiniketan' },
    { name: 'Digha', href: '/west-bengal/digha' },
    { name: 'Cooch Behar', href: '/west-bengal/cooch-behar' },
    { name: 'Murshidabad', href: '/west-bengal/murshidabad' },
    { name: 'Bankura', href: '/west-bengal/bankura' },
    { name: 'Midnapore', href: '/west-bengal/midnapore' },
  ];

  const kolkataAreas = [
    { name: 'Salt Lake Cab', href: '/kolkata/salt-lake' },
    { name: 'New Town Cab', href: '/kolkata/new-town' },
    { name: 'Howrah Cab', href: '/west-bengal/howrah' },
    { name: 'Dum Dum Airport Cab', href: '/kolkata/dum-dum' },
    { name: 'Park Street Cab', href: '/kolkata/park-street' },
    { name: 'Ballygunge Cab', href: '/kolkata/ballygunge' },
    { name: 'Esplanade Cab', href: '/kolkata/esplanade' },
    { name: 'Gariahat Cab', href: '/kolkata/gariahat' },
    { name: 'Barasat Cab', href: '/west-bengal/barasat' },
    { name: 'Tollygunge Cab', href: '/kolkata/tollygunge' },
    { name: 'Jadavpur Cab', href: '/kolkata/jadavpur' },
    { name: 'Behala Cab', href: '/kolkata/behala' },
  ];

  const otherStateCities = [
    { name: 'Ranchi', href: '/jharkhand/ranchi' },
    { name: 'Jamshedpur', href: '/jharkhand/jamshedpur' },
    { name: 'Dhanbad', href: '/jharkhand/dhanbad' },
    { name: 'Deoghar', href: '/jharkhand/deoghar' },
    { name: 'Bhubaneswar', href: '/odisha/bhubaneswar' },
    { name: 'Puri', href: '/odisha/puri' },
    { name: 'Cuttack', href: '/odisha/cuttack' },
    { name: 'Rourkela', href: '/odisha/rourkela' },
    { name: 'Patna', href: '/bihar/patna' },
    { name: 'Gaya', href: '/bihar/gaya' },
    { name: 'Varanasi', href: '/uttar-pradesh/varanasi' },
    { name: 'Prayagraj', href: '/uttar-pradesh/prayagraj' },
  ];

  return (
    <footer className="bg-[#0A1420]">
      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-[#FF6B00] via-[#F5A623] to-[#FF6B00]" />

      {/* CTA strip */}
      <div className="bg-[#0D1B2A] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg">
                Ready to Travel?
              </p>
              <p className="text-gray-400 text-sm">Open round the clock · Confirmation within 2 minutes · No app required</p>
            </div>
            <div className="flex gap-3">
              <a href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B00] to-[#F5A623] text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-orange-lg transition-all">
                <Phone size={16} /> {BUSINESS.phoneDisplay}
              </a>
              <a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I would like to book a cab.')}`}
                className="flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-colors">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* NK Logo */}
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="NK Cab & Taxi Logo"
                width={52}
                height={52}
                className="rounded-full shrink-0"
              />
              <div>
                <span className="font-extrabold text-white text-lg leading-tight block">
                  NK Cab <span className="text-[#FF6B00]">&</span> Taxi
                </span>
                <span className="text-[#F5A623] text-[10px] font-semibold uppercase tracking-[0.15em]">Taxi | Cab Service</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              NK Cab &amp; Taxi (est. 2019) — East India&apos;s one-way drop taxi specialist. You pay only for your direction, never for the driver&apos;s return. Police-verified drivers, AC fleet, fixed fares that never surge. Salt Lake Sector V, Kolkata.
            </p>
            <div className="space-y-3">
              <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-[#FF6B00] transition-colors text-sm">
                <div className="w-8 h-8 bg-[#FF6B00]/15 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-[#FF6B00]" />
                </div>
                {BUSINESS.phoneDisplay}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[#FF6B00] transition-colors text-sm">
                <div className="w-8 h-8 bg-[#FF6B00]/15 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-[#FF6B00]" />
                </div>
                {BUSINESS.email}
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-[#FF6B00]/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-[#FF6B00]" />
                </div>
                <span>Salt Lake Sector V Area, Kolkata<br />West Bengal — 700091</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-[#FF6B00]/15 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-[#FF6B00]" />
                </div>
                24/7, 365 Days a Year
              </div>
              <a
                href={BUSINESS.gbpReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-semibold transition-all group"
              >
                <span className="text-amber-400 font-bold">⭐ 4.8</span>
                <span>Review Us on Google Business</span>
                <span className="text-gray-400 group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>

            {/* States badges - Clickable links for all 5 states */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                { name: 'West Bengal', href: '/west-bengal' },
                { name: 'Jharkhand', href: '/jharkhand' },
                { name: 'Odisha', href: '/odisha' },
                { name: 'Bihar', href: '/bihar' },
                { name: 'UP', href: '/uttar-pradesh' },
              ].map((state) => (
                <Link
                  key={state.name}
                  href={state.href}
                  className="px-2.5 py-1 bg-[#FF6B00]/10 text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-colors text-[10px] font-bold rounded-full border border-[rgba(255,107,0,0.2)]"
                >
                  {state.name}
                </Link>
              ))}
            </div>
          </div>

          {/* West Bengal Cities */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#FF6B00] rounded-full inline-block" />
              <Link href="/west-bengal" className="hover:text-[#FF6B00] transition-colors">
                West Bengal
              </Link>
            </h3>
            <div className="grid grid-cols-2 gap-x-3">
              {wbCities.map((city) => (
                <Link key={city.href} href={city.href}
                  className="py-1 text-xs text-gray-400 hover:text-[#FF6B00] transition-colors flex items-center gap-1">
                  <ArrowRight size={10} className="shrink-0 text-[#FF6B00]/40" />
                  {city.name}
                </Link>
              ))}
            </div>
            <Link href="/west-bengal" className="inline-flex items-center gap-1 text-[#FF6B00] text-xs font-semibold mt-4 hover:gap-2 transition-all">
              View all WB cities <ArrowRight size={12} />
            </Link>
          </div>

          {/* Kolkata Areas + Other States */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#FF6B00] rounded-full inline-block" />
              Kolkata Zones
            </h3>
            <div className="space-y-0.5 mb-6">
              {kolkataAreas.slice(0, 6).map((area) => (
                <Link key={area.href} href={area.href}
                  className="block py-1 text-xs text-gray-400 hover:text-[#FF6B00] transition-colors flex items-center gap-1">
                  <ArrowRight size={10} className="shrink-0 text-[#FF6B00]/40" />
                  {area.name}
                </Link>
              ))}
            </div>
            <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#F5A623] rounded-full inline-block" />
              Jharkhand, Odisha, Bihar & UP
            </h3>
            <div className="grid grid-cols-2 gap-x-3">
              {otherStateCities.map((city) => (
                <Link key={city.href} href={city.href}
                  className="py-1 text-xs text-gray-400 hover:text-[#FF6B00] transition-colors flex items-center gap-1">
                  <ArrowRight size={10} className="shrink-0 text-[#FF6B00]/40" />
                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Routes + Services + Quick */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#FF6B00] rounded-full inline-block" />
              Top Routes
            </h3>
            <div className="space-y-0.5 mb-6">
              {popularRoutes.map((r) => (
                <Link key={r.slug} href={`/routes/${r.slug}`}
                  className="block py-1 text-xs text-gray-400 hover:text-[#FF6B00] transition-colors flex items-center gap-1">
                  <ArrowRight size={10} className="shrink-0 text-[#FF6B00]/40" />
                  {r.fromName} → {r.toName}
                </Link>
              ))}
            </div>
            <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#F5A623] rounded-full inline-block" />
              Our Services
            </h3>
            <div className="space-y-0.5">
              {[
                ['Airport Transfer', '/services/airport-transfer'],
                ['Outstation Cab', '/services/outstation'],
                ['One-Way Cab', '/services/one-way'],
                ['Kolkata Local Taxi', '/services/local-taxi'],
                ['Wedding Car Rental', '/services/wedding-car-rental'],
                ['Corporate Cabs', '/services/corporate-car-rental'],
                ['Fare Rates', '/fare-chart'],
                ['NK Cab vs Ola & Uber', '/kolkata-cab-vs-ola-uber'],
                ['Kolkata to Jamshedpur Cab', '/kolkata-to-jamshedpur-cab'],
                ['Jamshedpur to Kolkata Cab', '/jamshedpur-to-kolkata-cab'],
                ['About Us', '/about'],
                ['Contact', '/contact'],
              ].map(([name, href]) => (
                <Link key={href} href={href}
                  className="block py-1 text-xs text-gray-400 hover:text-[#FF6B00] transition-colors flex items-center gap-1">
                  <ArrowRight size={10} className="shrink-0 text-[#FF6B00]/40" />
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-xs text-center">
              © {new Date().getFullYear()} NK Cab & Taxi — All rights reserved · Kolkata, West Bengal, India
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <Link href="/privacy-policy" className="hover:text-[#FF6B00] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#FF6B00] transition-colors">Terms</Link>
              <Link href="/sitemap.xml" className="hover:text-[#FF6B00] transition-colors">Sitemap</Link>
              <a href="https://www.basant.me" target="_blank" rel="noopener noreferrer"
                className="hover:text-[#FF6B00] transition-colors">
                Made by Basant Kumar
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
