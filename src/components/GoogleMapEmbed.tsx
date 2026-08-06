'use client';

import { useRef, useState, useEffect } from 'react';
import { MapPin, Star } from 'lucide-react';
import { BUSINESS } from '@/lib/data';

interface GoogleMapEmbedProps {
  /** For route pages: show directions from → to */
  fromCity?: string;
  toCity?: string;
  fromLat?: number;
  fromLng?: number;
  toLat?: number;
  toLng?: number;
  /** For city pages: show a single city pin */
  cityName?: string;
  cityLat?: number;
  cityLng?: number;
  /** Heading above the map */
  title?: string;
  subtitle?: string;
}

export default function GoogleMapEmbed({
  fromCity,
  toCity,
  fromLat,
  fromLng,
  toLat,
  toLng,
  cityName,
  cityLat,
  cityLng,
  title,
  subtitle,
}: GoogleMapEmbedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  // loaded = true only after IntersectionObserver fires — defers all Maps JS
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }   // start loading 200 px before the section enters viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Build the appropriate Google Maps embed URL
  let mapSrc = '';
  let mapTitle = '';

  if (fromCity && toCity && fromLat && fromLng && toLat && toLng) {
    mapSrc = `https://maps.google.com/maps?width=100%25&height=100%25&hl=en&saddr=${encodeURIComponent(fromCity + ', India')}&daddr=${encodeURIComponent(toCity + ', India')}&t=&ie=UTF8&iwloc=B&output=embed`;
    mapTitle = `${fromCity} to ${toCity} Driving Route`;
  } else if (cityName && cityLat && cityLng) {
    mapSrc = `https://maps.google.com/maps?width=100%25&height=100%25&hl=en&q=${encodeURIComponent(cityName + ', India')}&t=&z=12&ie=UTF8&iwloc=B&output=embed`;
    mapTitle = `${cityName} Map — Taxi Coverage Area`;
  } else {
    mapSrc = `https://maps.google.com/maps?width=100%25&height=100%25&hl=en&q=Kolkata+Cab+Service,+Park+Street,+Kolkata,+West+Bengal,+India&t=&z=12&ie=UTF8&iwloc=B&output=embed`;
    mapTitle = 'NK Cab & Taxi — Office Location';
  }

  const displayTitle = title || (fromCity && toCity ? `${fromCity} to ${toCity} — Route Map` : cityName ? `Cab Service in ${cityName} — Coverage Map` : 'Our Coverage Area');
  const displaySubtitle = subtitle || (fromCity && toCity ? `See the driving route between ${fromCity} and ${toCity}. Our veteran drivers pick the smoothest roads for an easy ride.` : cityName ? `We offer taxi pickup and drop-off in every part of ${cityName}. Explore our service footprint.` : 'NK Cab & Taxi serves 80+ cities in West Bengal, Jharkhand, Odisha, Bihar and Uttar Pradesh.');

  return (
    <section ref={sectionRef} className="google-map-section py-10 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-primary mb-2">
            <MapPin size={20} />
            <span className="text-sm font-semibold uppercase tracking-wide">Locations &amp; Routes</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">{displayTitle}</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">{displaySubtitle}</p>
        </div>

        {/* Map Card Container — Responsive height h-[320px] on mobile to h-[450px] on desktop.
            Iframe uses absolute inset-0 w-full h-full to guarantee 100% fill with zero bottom gap. */}
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
          {loaded ? (
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={mapTitle}
              className="absolute inset-0 w-full h-full border-0 block"
            />
          ) : (
            /* ── Placeholder shown before user scrolls to map ── */
            <div
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200"
              aria-label="Map loading placeholder"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <MapPin size={28} className="text-primary" />
              </div>
              <p className="text-gray-600 text-sm font-semibold">Map appears as you scroll</p>
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="px-5 py-2 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors shadow"
              >
                Show Map Now
              </button>
            </div>
          )}
        </div>

        {/* SEO: Accessible directions link for search engines */}
        {fromCity && toCity && (
          <div className="mt-4 text-center">
            <a
              href={`https://www.google.com/maps/dir/${encodeURIComponent(fromCity + ', India')}/${encodeURIComponent(toCity + ', India')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
            >
              <MapPin size={14} />
              Get {fromCity} to {toCity} directions on Google Maps ↗
            </a>
          </div>
        )}
        {cityName && !fromCity && (
          <div className="mt-4 text-center">
            <a
              href={`https://www.google.com/maps/search/cab+service+${encodeURIComponent(cityName + ', India')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline mr-4"
            >
              <MapPin size={14} />
              Open {cityName} in Google Maps ↗
            </a>
          </div>
        )}
        <div className="mt-4 text-center">
          <a
            href={BUSINESS.gbpReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-amber-300 rounded-full text-xs sm:text-sm font-bold text-gray-800 hover:bg-amber-50 shadow-sm transition-all"
          >
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span>Rate &amp; Review NK Cab &amp; Taxi on Google My Business ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
