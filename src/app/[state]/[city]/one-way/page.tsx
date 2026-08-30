import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, Clock, Car, CheckCircle, Shield, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import { getState, getCity, getAllCities, getVehicles, BUSINESS } from '@/lib/data';
import { getStatePriceLabels } from '@/lib/data';
import { getRoutesFrom } from '@/lib/routeData';
import { generateFaqSchema, generateBreadcrumbSchema, getCityGeoMeta, generateCitySubServiceSchema } from '@/lib/seo';
import { generateOneWayServiceContent } from '@/lib/serviceContent';
import { formatBoldText } from '@/lib/textHelper';

// Pre-render pages as static HTML to avoid edge CPU execution limits
export const dynamicParams = false;
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  // Pre-render ALL cities at build time — eliminates SSR cold starts on CF Free Tier
  const cities = getAllCities();
  return cities.map(c => ({ state: c.state, city: c.slug }));
}


export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCity(stateSlug, citySlug);
  const state = getState(stateSlug);
  if (!city) return {};
  const metaPrices = getStatePriceLabels(stateSlug);
  const stateName = state?.name || stateSlug;
  const canonicalUrl = `${BUSINESS.domain}/${stateSlug}/${citySlug}/one-way/`;
  return {
    title: `One-Way Taxi from ${city.name} at ${metaPrices.sedanPerKm} | Pay Only the Outbound Leg | ${BUSINESS.name}`,
    description: `Reserve a one-way taxi out of ${city.name}, ${stateName} and pay for the outward leg alone, since the empty return trip is on us. Sedan ${metaPrices.sedanPerKm}, SUV ${metaPrices.suvPerKm} — 40-50% below a round-trip fare. Round the clock. Call ${BUSINESS.phone}`.slice(0, 160),
    openGraph: {
      title: `One-Way Taxi from ${city.name} | One-Side Billing | ${BUSINESS.name}`,
      description: `One-direction ride from ${city.name}; no return fare is added. From ${metaPrices.sedanPerKm}. Dial ${BUSINESS.phone}`,
      type: 'website', siteName: BUSINESS.name, url: canonicalUrl, locale: 'en_IN',
      images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `One-Way Taxi from ${city.name}` }],
    },
    twitter: { card: 'summary_large_image', title: `One-Way Car Hire from ${city.name} | ${BUSINESS.name}`, images: [`${BUSINESS.domain}/navbanner.webp`] },
    alternates: { canonical: canonicalUrl },
    other: { thumbnail: `${BUSINESS.domain}/navbanner.webp` },
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  };
}

export default async function OneWayPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getState(stateSlug);
  const city = getCity(stateSlug, citySlug);
  if (!state || !city) notFound();
  const prices = getStatePriceLabels(stateSlug);

  const routes = (await getRoutesFrom(citySlug)).slice(0, 10);
  const vehicles = getVehicles();
  const content = generateOneWayServiceContent({ cityName: city.name, stateName: state.name, stateSlug: state.slug, citySlug: city.slug, landmarks: city.landmarks, airport: city.airport, railway: city.railway });

  return (
    <>
      {(() => { const geo = getCityGeoMeta(city.name, state.slug, city.lat, city.lng); return (<><meta name="geo.region" content={geo['geo.region']} /><meta name="geo.placename" content={geo['geo.placename']} /><meta name="geo.position" content={geo['geo.position']} /><meta name="ICBM" content={geo['ICBM']} /></>); })()}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCitySubServiceSchema(city.name, state.name, state.slug, city.slug, 'Single-Way Taxi Service', 'one-way', `One-way ride out of ${city.name}. You settle the outward leg only. Sedan ${prices.sedanPerKm}, SUV ${prices.suvPerKm}, with no return fare.`, '11', '18')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(content.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain }, { name: state.name, url: `${BUSINESS.domain}/${state.slug}` },
        { name: city.name, url: `${BUSINESS.domain}/${state.slug}/${city.slug}` },
        { name: 'One-Way Taxi', url: `${BUSINESS.domain}/${stateSlug}/${citySlug}/one-way` },
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-14 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: state.name, href: `/${state.slug}` }, { name: city.name, href: `/${state.slug}/${city.slug}` }, { name: 'One-Way Taxi', href: `/${state.slug}/${city.slug}/one-way` }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-4">One-Way Taxi from <span className="text-gradient">{city.name}</span> — Pay Only the Outward Leg</h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-6">The budget intercity ride leaving {city.name}. You are billed for the outward distance alone and the way back is free, which lands 40-50% under a round trip. Air-conditioned cars, screened chauffeurs and service at any hour.</p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Car size={14} /> Sedan {prices.sedanPerKm}</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Car size={14} /> SUV {prices.suvPerKm}</span>
            <span className="flex items-center gap-1.5 bg-green-500/30 px-3 py-1.5 rounded-full font-semibold">💰 40-50% Cheaper</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg"><Phone size={18} /> Call to Book: {BUSINESS.phone}</a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want a one-way taxi from ${city.name}.`)}`} className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[{ icon: <CheckCircle size={16} />, text: 'No Return Fare' }, { icon: <Shield size={16} />, text: 'Screened Drivers' }, { icon: <Clock size={16} />, text: 'Open 24x7' }, { icon: <Star size={16} />, text: '4.8★ Rated' }].map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-primary font-medium">{b.icon} {b.text}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-4">One-Way Hire from {city.name}, {state.name} — 40-50% Less Than a Round Trip</h2>
                
                {/* ── QUICK ANSWER BOX — targets AI Overviews ── */}
                <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full text-left">
                    <h4 className="text-base font-bold text-secondary mb-3 flex items-center gap-2">
                      ⚡ Quick Facts — {city.name} One-Way Taxi
                    </h4>
                    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Outbound Sedan</dt>
                        <dd className="font-bold text-secondary">₹{prices.sedanPerKm}</dd>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Outbound SUV</dt>
                        <dd className="font-bold text-secondary">₹{prices.suvPerKm}</dd>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Round-Trip Saving</dt>
                        <dd className="font-bold text-primary">40% - 50% Off</dd>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Return-Leg Fee</dt>
                        <dd className="font-bold text-primary">₹0 (Zero)</dd>
                      </div>
                    </dl>
                    <p className="text-xs text-gray-500 mt-3">
                      📍 Perfect for: pure drop rides, house shifting, airport drops into other cities, or a calm one-direction journey.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      📞 Round-the-clock help: <a href={`tel:${BUSINESS.phone}`} className="text-primary font-semibold hover:underline">{BUSINESS.phone}</a> | Fares follow standard toll guidelines.
                    </p>
                  </div>
                  <div className="relative w-full md:w-40 h-28 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm">
                    <Image
                      src="/navbanner.webp"
                      alt={`Single-trip taxi service out of ${city.name} - air-conditioned sedan and SUV booking`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 160px"
                      priority
                    />
                  </div>
                </div>
                {content.aboutContent.map((para, i) => (<p key={i} className="text-gray-600 mb-4 leading-relaxed">{formatBoldText(para)}</p>))}
              </div>

              {/* Comparison */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Outbound vs Round Trip — Fare Math from {city.name}</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead><tr className="bg-secondary text-white">
                      <th className="px-4 py-3 text-left text-sm">Journey</th><th className="px-4 py-3 text-center text-sm">200 km Sample</th>
                      <th className="px-4 py-3 text-center text-sm">Sedan</th><th className="px-4 py-3 text-center text-sm">SUV</th>
                    </tr></thead>
                    <tbody>
                      <tr className="bg-green-50"><td className="px-4 py-3 font-semibold text-green-700 text-sm">✅ Outbound</td><td className="px-4 py-3 text-center text-sm">billed 200 km</td><td className="px-4 py-3 text-center font-bold text-green-700 text-sm">≈ ₹3,700</td><td className="px-4 py-3 text-center font-bold text-green-700 text-sm">≈ ₹4,800</td></tr>
                      <tr className="bg-red-50"><td className="px-4 py-3 font-semibold text-red-500 text-sm">❌ Round Trip</td><td className="px-4 py-3 text-center text-sm">billed 400 km</td><td className="px-4 py-3 text-center font-bold text-red-500 text-sm">≈ ₹5,900</td><td className="px-4 py-3 text-center font-bold text-red-500 text-sm">≈ ₹7,600</td></tr>
                      <tr className="bg-white"><td className="px-4 py-3 font-bold text-primary text-sm">💰 Your Saving</td><td className="px-4 py-3 text-center text-sm font-medium">50% lower</td><td className="px-4 py-3 text-center font-bold text-primary text-sm">₹2,200</td><td className="px-4 py-3 text-center font-bold text-primary text-sm">₹2,800</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fare Table */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">One-Way Taxi Rates from {city.name}</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead><tr className="bg-secondary text-white">
                      <th className="px-4 py-3 text-left text-sm">Car</th><th className="px-4 py-3 text-center text-sm">Rate/km</th><th className="px-4 py-3 text-center text-sm">Starting Fare</th><th className="px-4 py-3 text-center text-sm">Seats</th>
                    </tr></thead>
                    <tbody>{vehicles.slice(0, 4).map((v, i) => (
                      <tr key={v.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-semibold text-secondary text-sm">{v.name}</td>
                        <td className="px-4 py-3 text-center font-bold text-primary text-sm">₹{i === 0 ? prices.sedanRate : i === 1 ? prices.suvRate : i === 2 ? prices.innovaRate : i === 3 ? prices.crystaRate : prices.tempoRate}/km</td>
                        <td className="px-4 py-3 text-center text-gray-500 text-sm">₹{v.pricePerKm <= 12 ? '1,500' : v.pricePerKm <= 15 ? '2,000' : '2,500'}</td>
                        <td className="px-4 py-3 text-center text-sm">{v.capacity} pax</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">* Tolls and parking billed separately. No return fare applies. GST is included.</p>
              </div>

              {/* Why Choose */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Reasons to Take a One-Way Taxi from {city.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Bill covers only the outbound distance; nothing for the empty return', 'The same distance costs 40-50% less than a round trip', 'Identical air-conditioned cars and screened chauffeurs as the return option', 'No peak-hour markup — one stable rate every day', 'Operates day and night, including festivals and dawn departures', 'WhatsApp booking with a two-minute confirmation', 'Cancel without charge up to four hours before your ride', `We collect you from home, office, ${city.railway || 'the railway station'} or ${city.airport || 'the airport'}`].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />{item}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm defaultFrom={city.name} compact />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">One-Way Taxi Support</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
              <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want a one-way taxi from ${city.name}.`)}`} className="block w-full p-4 bg-green-500 text-white text-center rounded-xl font-bold hover:bg-green-600 transition-colors">💬 Reserve via WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      {routes.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-2">Top One-Way Routes out of <span className="text-primary">{city.name}</span></h2>
            <p className="text-gray-500 text-sm mb-6">You pay only the outward fare; nothing for the way back</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {routes.map((r) => (
                <Link key={r.slug} href={`/routes/${r.slug}`} className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{r.fromName} ➡️ {r.toName}</p>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-gray-500">{r.distance} km • Outbound</span>
                    <span className="text-primary font-bold">₹{r.priceSaloon}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">More Options in <span className="text-primary">{city.name}</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'City Taxi', slug: 'local', price: `₹${prices.localPkgSedan}/${prices.localPkgName}` },
              { name: 'Outstation Ride', slug: 'outstation', price: `${prices.sedanPerKm}` },
              { name: 'Return Tour', slug: 'round-trip', price: `${prices.sedanPerKm}` },
              { name: 'Airport Pickup', slug: 'airport-transfer', price: `${prices.airportSedan}+` },
              { name: 'Wedding Vehicle', slug: 'wedding-car', price: '₹5,000+' }
            ].map((srv) => (
              <Link key={srv.slug} href={`/${stateSlug}/${citySlug}/${srv.slug}`} className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-all text-center">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{srv.name}</p>
                <p className="text-xs text-primary font-medium mt-1">{srv.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><FAQSection faqs={content.faqs} title={`Common Questions — One-Way Taxi from ${city.name}`} /></div></section>

      {/* Popular Searches */}
      <section className="py-8 bg-white"><div className="max-w-7xl mx-auto px-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Related Searches</h3>
        <div className="flex flex-wrap gap-2">{content.popularSearches.slice(0, 24).map((kw, i) => (<a key={i} href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! One-way taxi enquiry: ${kw}`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">{kw}</a>))}</div>
      </div></section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve a One-Way Taxi from {city.name} — Save 50%!</h2>
          <p className="text-white/90 mb-6">Sedan {prices.sedanPerKm} | SUV {prices.suvPerKm} | No Return Fare | Round the Clock</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all"><Phone size={22} /> {BUSINESS.phone}</a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want a one-way taxi from ${city.name}.`)}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">💬 WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
