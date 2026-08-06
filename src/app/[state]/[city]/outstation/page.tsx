import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, Clock, Car, CheckCircle, Shield, Star, Route, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import { getState, getCity, getAllCities, getVehicles, BUSINESS } from '@/lib/data';
import { getStatePriceLabels } from '@/lib/data';
import { getRoutesFrom } from '@/lib/routeData';
import { generateFaqSchema, generateBreadcrumbSchema, getCityGeoMeta, generateCitySubServiceSchema } from '@/lib/seo';
import { generateOutstationServiceContent } from '@/lib/serviceContent';
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
  const canonicalUrl = `${BUSINESS.domain}/${stateSlug}/${citySlug}/outstation`;
  return {
    title: `Outstation Taxi from ${city.name} at ${metaPrices.sedanPerKm} | AC Hire, One-Way or Return | ${BUSINESS.name}`,
    description: `Reserve an outstation car out of ${city.name}, ${stateName}. Air-conditioned intercity fleet: Sedan ${metaPrices.sedanPerKm}, SUV ${metaPrices.suvPerKm}, Crysta ${metaPrices.crystaPerKm}. One-way or return, at any hour. Ring ${BUSINESS.phone}`.slice(0, 160),
    openGraph: {
      title: `Outstation Taxi from ${city.name} at ${metaPrices.sedanPerKm} | ${BUSINESS.name}`,
      description: `Intercity ride out of ${city.name}. Air-conditioned sedan and SUV, screened chauffeurs. Dial ${BUSINESS.phone}`,
      type: 'website', siteName: BUSINESS.name, url: canonicalUrl, locale: 'en_IN',
      images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `Outstation taxi hire from ${city.name}` }],
    },
    twitter: { card: 'summary_large_image', title: `Outstation Taxi from ${city.name} | ${BUSINESS.name}`, images: [`${BUSINESS.domain}/navbanner.webp`] },
    alternates: { canonical: canonicalUrl },
    other: { thumbnail: `${BUSINESS.domain}/navbanner.webp` },
    keywords: [
      `outstation cab from ${city.name}`,
      `outstation taxi from ${city.name}`,
      `intercity cab ${city.name}`,
      `${city.name} outstation cab`,
      `${city.name} outstation taxi`,
      `${city.name} outstation cab booking`,
      `${city.name} intercity taxi`,
      `one way cab from ${city.name}`,
      `round trip cab from ${city.name}`,
      `${city.name} cab ${metaPrices.sedanPerKm}`,
      `outstation sedan ${city.name}`,
      `outstation suv ${city.name}`,
      `outstation innova ${city.name}`,
      `outstation tempo traveller ${city.name}`,
      `${city.name} to kolkata outstation cab`,
      `best outstation cab ${city.name}`,
      `24/7 outstation cab ${city.name}`,
    ],
  };
}

export default async function OutstationPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getState(stateSlug);
  const city = getCity(stateSlug, citySlug);
  if (!state || !city) notFound();
  const prices = getStatePriceLabels(stateSlug);

  const routes = (await getRoutesFrom(citySlug)).slice(0, 12);
  const vehicles = getVehicles();
  const content = generateOutstationServiceContent({ cityName: city.name, stateName: state.name, stateSlug: state.slug, citySlug: city.slug, landmarks: city.landmarks, airport: city.airport, railway: city.railway });

  return (
    <>
      {(() => { const geo = getCityGeoMeta(city.name, state.slug, city.lat, city.lng); return (<><meta name="geo.region" content={geo['geo.region']} /><meta name="geo.placename" content={geo['geo.placename']} /><meta name="geo.position" content={geo['geo.position']} /><meta name="ICBM" content={geo['ICBM']} /></>); })()}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCitySubServiceSchema(city.name, state.name, state.slug, city.slug, 'Outstation Taxi Service', 'outstation', `Intercity ride out of ${city.name}, ${state.name}. Sedan ${prices.sedanPerKm}, SUV ${prices.suvPerKm} — one-way or return, at any hour.`, '11', '18')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(content.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain }, { name: state.name, url: `${BUSINESS.domain}/${state.slug}` },
        { name: city.name, url: `${BUSINESS.domain}/${state.slug}/${city.slug}` },
        { name: 'Outstation Taxi', url: `${BUSINESS.domain}/${stateSlug}/${citySlug}/outstation` },
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-14 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: state.name, href: `/${state.slug}` }, { name: city.name, href: `/${state.slug}/${city.slug}` }, { name: 'Outstation Taxi', href: `/${state.slug}/${city.slug}/outstation` }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-4">Outstation Taxi from <span className="text-gradient">{city.name}</span> {prices.sedanPerKm}</h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-6">Easy, budget-friendly long-distance travel out of {city.name}, {state.name}. Choose an AC sedan, SUV, Innova Crysta or Tempo Traveller for a one-way or return journey, bookable at any hour with steady fares.</p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Car size={14} /> Sedan {prices.sedanPerKm}</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Car size={14} /> SUV {prices.suvPerKm}</span>
            <span className="flex items-center gap-1.5 bg-primary/30 px-3 py-1.5 rounded-full font-semibold"><Star size={14} /> 4.8★ Customer Score</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg"><Phone size={18} /> Call to Book: {BUSINESS.phone}</a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want an outstation taxi from ${city.name}.`)}`} className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[{ icon: <Shield size={16} />, text: 'Screened Chauffeurs' }, { icon: <Clock size={16} />, text: 'Service 24x7' }, { icon: <Star size={16} />, text: '4.8★ from 2,847 Riders' }, { icon: <CheckCircle size={16} />, text: 'No Peak Markups' }, { icon: <Route size={16} />, text: 'Over 500 Routes' }].map((b, i) => (
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
                <h2 className="text-2xl font-bold text-secondary mb-4">Outstation Taxi Service out of {city.name}, {state.name} — from {prices.sedanPerKm} | Reserve Online Any Time</h2>
                
                {/* ── QUICK ANSWER BOX — targets AI Overviews ── */}
                <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full text-left">
                    <h4 className="text-base font-bold text-secondary mb-3 flex items-center gap-2">
                      ⚡ Quick Facts — {city.name} Outstation Taxi
                    </h4>
                    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Sedan Fare</dt>
                        <dd className="font-bold text-secondary">₹{prices.sedanRate}/km</dd>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">SUV Fare</dt>
                        <dd className="font-bold text-secondary">₹{prices.suvRate}/km</dd>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Daily Minimum</dt>
                        <dd className="font-bold text-primary">150 km/day</dd>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Driver Allowance</dt>
                        <dd className="font-bold text-primary">₹300/day</dd>
                      </div>
                    </dl>
                    <p className="text-xs text-gray-500 mt-3">
                      📍 Perfect for: return journeys between cities, short weekend breaks, and outstation drops across West Bengal, Jharkhand and Bihar.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      📞 Round-the-clock support: <a href={`tel:${BUSINESS.phone}`} className="text-primary font-semibold hover:underline">{BUSINESS.phone}</a> | Seasoned long-route chauffeurs.
                    </p>
                  </div>
                  <div className="relative w-full md:w-40 h-28 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm">
                    <Image
                      src="/navbanner.webp"
                      alt={`Outstation taxi service out of ${city.name} - air-conditioned sedan and SUV booking`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 160px"
                      priority
                    />
                  </div>
                </div>
                {content.aboutContent.map((para, i) => (<p key={i} className="text-gray-600 mb-4 leading-relaxed">{formatBoldText(para)}</p>))}
              </div>

              {/* Fare Table */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Outstation Taxi Rate Chart out of {city.name}</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead><tr className="bg-secondary text-white">
                      <th className="px-4 py-3 text-left text-sm">Car</th><th className="px-4 py-3 text-left text-sm">Models</th>
                      <th className="px-4 py-3 text-center text-sm">Seats</th><th className="px-4 py-3 text-right text-sm">Rate/km</th>
                    </tr></thead>
                    <tbody>{vehicles.slice(0, 4).map((v, i) => (
                      <tr key={v.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-semibold text-secondary text-sm">{v.name}</td>
                        <td className="px-4 py-3 text-gray-500 text-sm">{v.models.slice(0, 2).join(', ')}</td>
                        <td className="px-4 py-3 text-center text-sm">{v.capacity} pax</td>
                        <td className="px-4 py-3 text-right font-bold text-primary text-sm">₹{i === 0 ? prices.sedanRate : i === 1 ? prices.suvRate : i === 2 ? prices.innovaRate : i === 3 ? prices.crystaRate : prices.tempoRate}/km</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">* Minimum billing is 150 km daily for one-way and 250 km daily for return trips. Tolls, parking and permits are billed separately.</p>
              </div>

              {/* Why Choose */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Why Travel Outstation with {BUSINESS.name} from {city.name}?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Long-distance service at any hour, including very early and very late departures', 'Pick one-way or return and pay only for the journey you make', 'Chauffeurs familiar with every intercity highway and shortcut', 'Fares stay steady through festivals and holidays — never inflated', 'Air-conditioned cars, GPS monitored and cleaned between rides', 'Cancel free of charge up to four hours before pickup', `We pick you up at home, a hotel, ${city.railway || 'the railway station'} or ${city.airport || 'the airport'}`, 'WhatsApp confirmation lands within two minutes'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />{item}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm defaultFrom={city.name} compact />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">Outstation Taxi Support</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
              <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want an outstation taxi from ${city.name}.`)}`} className="block w-full p-4 bg-green-500 text-white text-center rounded-xl font-bold hover:bg-green-600 transition-colors">💬 Reserve via WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      {routes.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-2">Top Outstation Routes out of <span className="text-primary">{city.name}</span></h2>
            <p className="text-gray-500 text-sm mb-6">Reserve a budget outstation ride from {city.name}; both one-way and return are offered.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {routes.map((r) => (
                <Link key={r.slug} href={`/routes/${r.slug}`} className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0"><ArrowRight size={14} className="text-primary" /></div>
                    <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{r.fromName} → {r.toName}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{r.distance} km • {r.duration} hrs</span>
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
              { name: 'One-Way Hire', slug: 'one-way', price: `${prices.sedanPerKm}` },
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
      <section className="py-12 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><FAQSection faqs={content.faqs} title={`Common Questions — Outstation Taxi from ${city.name}, ${state.name}`} /></div></section>

      {/* Popular Searches — mix of crawlable route links + WhatsApp fallback */}
      <section className="py-8 bg-white"><div className="max-w-7xl mx-auto px-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Related Searches</h3>
        <div className="flex flex-wrap gap-2">
          {/* Route-specific internal links — crawlable for SEO */}
          {routes.slice(0, 8).map((r) => (
            <Link
              key={r.slug}
              href={`/routes/${r.slug}`}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {city.name} to {r.toName} taxi
            </Link>
          ))}
          {/* Service type links — internal crawlable */}
          {[
            { label: `one-way taxi from ${city.name}`, href: `/${stateSlug}/${citySlug}/one-way` },
            { label: `return-trip car ${city.name}`, href: `/${stateSlug}/${citySlug}/round-trip` },
            { label: `${city.name} airport taxi`, href: `/${stateSlug}/${citySlug}/airport-transfer` },
            { label: `innova outstation ${city.name}`, href: `/${stateSlug}/${citySlug}/outstation` },
            { label: `${city.name} taxi service`, href: `/${stateSlug}/${citySlug}` },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {/* Remaining generic keywords → WhatsApp conversion */}
          {content.popularSearches.slice(8, 16).map((kw, i) => (
            <a key={i} href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! Outstation taxi enquiry for ${city?.name || 'this city'}: ${kw}`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">{kw}</a>
          ))}
        </div>
      </div></section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve Your Outstation Taxi from {city.name} Today!</h2>
          <p className="text-white/90 mb-6">Sedan {prices.sedanPerKm} | SUV {prices.suvPerKm} | AC Fleet | Any Hour | No Peak Fares</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all"><Phone size={22} /> {BUSINESS.phone}</a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want an outstation taxi from ${city.name}.`)}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">💬 WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
