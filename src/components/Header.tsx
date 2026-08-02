'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { BUSINESS } from '@/lib/data';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Services', href: '/services',
    children: [
      { name: 'Local Taxi', href: '/services/local-taxi' },
      { name: 'Outstation Cab', href: '/services/outstation' },
      { name: 'One-Way Taxi', href: '/services/one-way' },
      { name: 'Round Trip', href: '/services/round-trip' },
      { name: 'Airport Transfer', href: '/services/airport-transfer' },
      { name: 'Wedding Car Rental', href: '/services/wedding-car-rental' },
      { name: 'Corporate Car Rental', href: '/services/corporate-car-rental' },
    ],
  },
  {
    name: 'Tours', href: '/tours',
    children: [
      { name: 'Darjeeling Tour', href: '/tours/darjeeling-tour' },
      { name: 'Puri & Konark Tour', href: '/tours/puri-konark-tour' },
      { name: 'Sundarbans Safari', href: '/tours/sundarbans-tour' },
      { name: 'Varanasi & Ayodhya', href: '/tours/varanasi-ayodhya-tour' },
      { name: 'Bodh Gaya & Rajgir', href: '/tours/bodh-gaya-rajgir-tour' },
      { name: 'North Bengal Tour', href: '/tours/north-bengal-tour' },
      { name: 'Kolkata City Tour', href: '/tours/kolkata-city-tour' },
      { name: 'All Packages →', href: '/tours' },
    ],
  },
  {
    name: 'Cities', href: '/west-bengal',
    children: [
      { name: 'Kolkata', href: '/west-bengal/kolkata' },
      { name: 'Howrah', href: '/west-bengal/howrah' },
      { name: 'Darjeeling', href: '/west-bengal/darjeeling' },
      { name: 'Siliguri', href: '/west-bengal/siliguri' },
      { name: 'Durgapur', href: '/west-bengal/durgapur' },
      { name: 'Ranchi', href: '/jharkhand/ranchi' },
      { name: 'Jamshedpur', href: '/jharkhand/jamshedpur' },
      { name: 'Bhubaneswar', href: '/odisha/bhubaneswar' },
      { name: 'All Cities →', href: '/west-bengal' },
    ],
  },
  { name: 'Fleet', href: '/fleet' },
  { name: 'Fare Chart', href: '/fare-chart' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar — orange gradient, kept */}
      <div className="bg-gradient-to-r from-[#FF6B00] via-[#F5A623] to-[#FF6B00] text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="hidden sm:flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse" />
            🚖 {BUSINESS.tagline} — Available {BUSINESS.hours}
          </span>
          <span className="sm:hidden font-medium text-xs">🚖 NK Cab &amp; Taxi — 24/7 Available</span>
          <a
            href={`tel:${BUSINESS.phone}`}
            className="flex items-center gap-1.5 font-bold hover:opacity-80 transition-opacity text-white"
          >
            <Phone size={12} />
            <span>{BUSINESS.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Main header — light/white theme */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)] border-b border-gray-100'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        {/* Orange gradient accent line at top of header */}
        <div className="h-0.5 bg-gradient-to-r from-[#FF6B00] via-[#F5A623] to-[#FF6B00]" />

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">

            {/* NK Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="group-hover:scale-105 transition-transform shrink-0">
                <Image
                  src="/logo.png"
                  alt="NK Cab & Taxi Logo"
                  width={48}
                  height={48}
                  className="rounded-full shadow-sm"
                  priority
                />
              </div>
              <div>
                <span
                  className="font-extrabold text-[#0D1B2A] text-lg lg:text-xl leading-tight block tracking-tight"
                >
                  NK Cab <span className="text-[#FF6B00]">&</span> Taxi
                </span>
                <span className="text-[#FF6B00] text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em]">
                  Taxi | Cab Service
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-[#0D1B2A] hover:text-[#FF6B00] relative group transition-colors"
                    onClick={(e) => { if (item.children) e.preventDefault(); }}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          openDropdown === item.name ? 'rotate-180 text-[#FF6B00]' : 'text-gray-400'
                        }`}
                      />
                    )}
                    {/* Orange underline on hover */}
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#FF6B00] to-[#F5A623] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>

                  {item.children && openDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2 w-56 animate-fadeIn">
                      <div className="bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 py-1.5 overflow-hidden">
                        <div className="h-0.5 bg-gradient-to-r from-[#FF6B00] to-[#F5A623] mx-3 mb-1.5 rounded-full" />
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#FF6B00] hover:bg-orange-50 transition-colors font-medium"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA — desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I want to book a cab.')}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-400 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all text-sm font-semibold"
              >
                💬 WhatsApp
              </a>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-2 px-5 py-2.5 btn-primary rounded-full text-sm font-bold"
              >
                <Phone size={15} />
                Call Now
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl border border-gray-200 text-[#0D1B2A] hover:bg-gray-50 hover:border-[#FF6B00]/30 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-slideDown max-h-[75vh] overflow-y-auto shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.children ? '#' : item.href}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[#0D1B2A] font-semibold hover:bg-orange-50 hover:text-[#FF6B00] transition-colors text-sm"
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault();
                        setOpenDropdown(openDropdown === item.name ? null : item.name);
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                  >
                    <span>{item.name}</span>
                    {item.children && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform text-[#FF6B00] ${openDropdown === item.name ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Link>
                  {item.children && openDropdown === item.name && (
                    <div className="pl-4 space-y-0.5 mb-1 ml-3 border-l-2 border-[#FF6B00]/30">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-500 hover:text-[#FF6B00] hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-100 flex gap-2 pb-2">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 btn-primary rounded-xl text-sm font-bold"
                >
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent('Hi! I want to book a cab.')}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-bold rounded-xl text-sm hover:bg-green-500 transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
