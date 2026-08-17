import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, Clock, Car, CheckCircle, Shield, Star, CreditCard } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import { getState, getCity, getAllCities, getLocalPackages, getVehicles, BUSINESS } from '@/lib/data';
import { getStatePriceLabels } from '@/lib/data';
import { getRoutesFrom } from '@/lib/routeData';
import { generateFaqSchema, generateBreadcrumbSchema, getCityGeoMeta, generateCitySubServiceSchema } from '@/lib/seo';
import { generateLocalServiceContent } from '@/lib/serviceContent';
import { formatBoldText } from '@/lib/textHelper';

// Pre-render ALL city pages at build time to avoid SSR CPU limit errors on CF Free Tier
export const dynamicParams = false;
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map(c => ({ state: c.state, city: c.slug }));
}


export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCity(stateSlug, citySlug);
  if (!city) return {};
  const metaPrices = getStatePriceLabels(stateSlug);
  const state = getState(stateSlug);
  const stateName = state?.name || stateSlug;
  const canonicalUrl = `${BUSINESS.domain}/${stateSlug}/${citySlug}/local`;
  return {
    title: `City Taxi Service in ${city.name}, ${stateName} ₹${metaPrices.localPkgSedan}/${metaPrices.localPkgName} | Hourly Hire Any Time | ${BUSINESS.name}`,
    description: `Top-rated city taxi service in ${city.name}, ${stateName}. Hourly rental: Sedan ₹${metaPrices.localPkgSedan}/${metaPrices.localPkgName}, SUV ₹2,500/4hr. Hospital runs, airport trips, shopping and sightseeing. AC cars, screened chauffeurs, round-the-clock, no surge. Ring ${BUSINESS.phone}`.slice(0, 160),
    openGraph: {
      title: `City Taxi in ${city.name} ₹${metaPrices.localPkgSedan}/${metaPrices.localPkgName} | ${BUSINESS.name}`,
      description: `Hourly car hire in ${city.name}. AC sedan and SUV, screened chauffeurs, at any hour. Dial ${BUSINESS.phone}`,
      type: 'website',
      siteName: BUSINESS.name,
      url: canonicalUrl,
      locale: 'en_IN',
      images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `City taxi service in ${city.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Local Cab in ${city.name} | ${BUSINESS.name}`,
      description: `Hourly taxi hire in ${city.name} starting at ₹${metaPrices.localPkgSedan}. Ring ${BUSINESS.phone}`,
      images: [`${BUSINESS.domain}/navbanner.webp`],
    },
    alternates: { canonical: canonicalUrl },
    other: { thumbnail: `${BUSINESS.domain}/navbanner.webp` },
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  };
}

export default async function LocalPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getState(stateSlug);
  const city = getCity(stateSlug, citySlug);
  if (!state || !city) notFound();
  const prices = getStatePriceLabels(stateSlug);

  const packages = getLocalPackages();
  const vehicles = getVehicles();
  const routes = (await getRoutesFrom(citySlug)).slice(0, 6);

  const content = generateLocalServiceContent({
    cityName: city.name,
    stateName: state.name,
    stateSlug: state.slug,
    citySlug: city.slug,
    landmarks: city.landmarks,
    airport: city.airport,
    railway: city.railway,
  });

  return (
    <>
      {/* Geo Meta Tags */}
      {(() => {
        const geo = getCityGeoMeta(city.name, state.slug, city.lat, city.lng);
        return (
          <>
            <meta name="geo.region" content={geo['geo.region']} />
            <meta name="geo.placename" content={geo['geo.placename']} />
            <meta name="geo.position" content={geo['geo.position']} />
            <meta name="ICBM" content={geo['ICBM']} />
          </>
        );
      })()}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCitySubServiceSchema(city.name, state.name, state.slug, city.slug, 'City Taxi Service', 'local', `Hourly city taxi hire in ${city.name}, ${state.name}. Sedan ₹${prices.localPkgSedan}/${prices.localPkgName}, SUV ₹2,500/4hr. Hospital, airport, shopping runs at any hour.`, '1800', '10000')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(content.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: state.name, url: `${BUSINESS.domain}/${state.slug}` },
        { name: city.name, url: `${BUSINESS.domain}/${state.slug}/${city.slug}` },
        { name: 'City Taxi', url: `${BUSINESS.domain}/${stateSlug}/${citySlug}/local` },
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-14 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: state.name, href: `/${state.slug}` },
            { name: city.name, href: `/${state.slug}/${city.slug}` },
            { name: 'City Taxi', href: `/${state.slug}/${city.slug}/local` },
          ]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-4">
            City Taxi Service in <span className="text-gradient">{city.name}</span> ₹{prices.localPkgSedan}/{prices.localPkgName}
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-6">
            Hourly car hire in {city.name}, {state.name} for hospital visits, airport runs, shopping, sightseeing and every short trip around town. AC fleet, screened chauffeurs and steady fares, available at any hour.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Clock size={14} /> 4hr/8hr/12hr Plans</span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Car size={14} /> Sedan, SUV, Tempo</span>
            <span className="flex items-center gap-1.5 bg-primary/30 px-3 py-1.5 rounded-full font-semibold"><Star size={14} /> 4.8★ Customer Score</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg">
              <Phone size={18} /> Call to Book: {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want a city taxi in ${city.name}.`)}`} className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {[
              { icon: <Shield size={16} />, text: 'Screened Chauffeurs' },
              { icon: <Clock size={16} />, text: 'Service 24x7' },
              { icon: <Star size={16} />, text: '4.8★ from 2,847 Riders' },
              { icon: <CheckCircle size={16} />, text: 'No Peak Markups' },
              { icon: <CreditCard size={16} />, text: 'Pay by Cash, UPI or Card' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-primary font-medium">{b.icon} {b.text}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Rich Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-4">City Taxi Service in {city.name}, {state.name} — Hourly Hire from ₹1,800</h2>
                
                {/* ── QUICK ANSWER BOX — targets AI Overviews ── */}
                <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full text-left">
                    <h4 className="text-base font-bold text-secondary mb-3 flex items-center gap-2">
                      ⚡ Quick Facts — {city.name} City Taxi Hire
                    </h4>
                    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Sedan, 4h/40km</dt>
                        <dd className="font-bold text-secondary">₹{prices.localPkgSedan}</dd>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Sedan, 8h/80km</dt>
                        <dd className="font-bold text-secondary">₹{packages[1]?.sedan || '2,800'}</dd>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Per Extra Kilometre</dt>
                        <dd className="font-bold text-primary">₹{prices.sedanPerKm}</dd>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                        <dt className="text-xs text-gray-400 mb-1">Chauffeur Fee</dt>
                        <dd className="font-bold text-primary">Included</dd>
                      </div>
                    </dl>
                    <p className="text-xs text-gray-500 mt-3">
                      📍 Great for: errands around town, tours of landmarks, client meetings and check-ups with several stops along the way.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      📞 Always-on support: <a href={`tel:${BUSINESS.phone}`} className="text-primary font-semibold hover:underline">{BUSINESS.phone}</a> | Cars are sanitized between rides.
                    </p>
                  </div>
                  <div className="relative w-full md:w-40 h-28 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm">
                    <Image
                      src="/navbanner.webp"
                      alt={`Hourly city taxi hire in ${city.name} - air-conditioned sedan and SUV`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 160px"
                      priority
                    />
                  </div>
                </div>
                {content.aboutContent.map((para, i) => (
                  <p key={i} className="text-gray-600 mb-4 leading-relaxed">{formatBoldText(para)}</p>
                ))}
              </div>

              {/* Packages Table */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">City Taxi Plans in {city.name}</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-secondary text-white">
                        <th className="px-4 py-3 text-left text-sm">Plan</th>
                        <th className="px-4 py-3 text-center text-sm">Sedan Price</th>
                        <th className="px-4 py-3 text-center text-sm">SUV Price</th>
                        <th className="px-4 py-3 text-center text-sm">Tempo Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((pkg, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-semibold text-secondary text-sm">{pkg.name}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">₹{pkg.sedan}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">₹{pkg.suv}</td>
                          <td className="px-4 py-3 text-center font-bold text-primary text-sm">₹{pkg.tempo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">* Beyond limits: {prices.sedanPerKm} per km in a sedan and {prices.suvPerKm} in an SUV. Waiting time costs ₹150-₹200 per hour. Rates never inflate.</p>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Scenarios for a City Taxi in {city.name}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {content.useCases.map((uc, i) => (
                    <div key={i} className="p-4 bg-accent/50 rounded-xl border border-primary/10 text-center">
                      <div className="text-3xl mb-2">{uc.icon}</div>
                      <h4 className="font-bold text-secondary text-xs mb-1">{uc.title}</h4>
                      <p className="text-gray-400 text-xs">{uc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Why Pick {BUSINESS.name} for City Taxi in {city.name}?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.whyChooseUs.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              {/* Landmarks */}
              {city.landmarks && city.landmarks.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-4">City Taxi Pickup Spots in {city.name}</h3>
                  <p className="text-gray-600 mb-3">We collect and drop off at any point across {city.name}:</p>
                  <div className="flex flex-wrap gap-2">
                    {city.landmarks.map((l) => (
                      <span key={l} className="px-3 py-1.5 bg-accent rounded-full text-sm text-gray-700 font-medium">{l}</span>
                    ))}
                    {city.airport && <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium">✈️ {city.airport}</span>}
                    {city.railway && <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium">🚂 {city.railway}</span>}
                  </div>
                </div>
              )}

              {/* Fleet Info */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-4">Our Cars Available in {city.name}</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-secondary text-white">
                        <th className="px-4 py-3 text-left text-sm">Car</th>
                        <th className="px-4 py-3 text-left text-sm">Models</th>
                        <th className="px-4 py-3 text-center text-sm">Seats</th>
                        <th className="px-4 py-3 text-right text-sm">Rate/km</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.slice(0, 4).map((v, i) => (
                        <tr key={v.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-semibold text-secondary text-sm">{v.name}</td>
                          <td className="px-4 py-3 text-gray-500 text-sm">{v.models.slice(0, 2).join(', ')}</td>
                          <td className="px-4 py-3 text-center text-sm">{v.capacity} pax</td>
                          <td className="px-4 py-3 text-right font-bold text-primary text-sm">₹{i === 0 ? prices.sedanRate : i === 1 ? prices.suvRate : i === 2 ? prices.innovaRate : i === 3 ? prices.crystaRate : prices.tempoRate}/km</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <BookingForm defaultFrom={city.name} compact />
              <div className="p-4 bg-secondary rounded-xl text-white text-center">
                <p className="text-sm text-gray-300 mb-2">{city.name} Taxi Support</p>
                <a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a>
              </div>
              <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want a city taxi in ${city.name}.`)}`} className="block w-full p-4 bg-green-500 text-white text-center rounded-xl font-bold hover:bg-green-600 transition-colors">
                💬 Reserve via WhatsApp
              </a>
              <div className="p-4 bg-accent rounded-xl space-y-3">
                <h4 className="font-bold text-secondary text-sm">Snap Fares in {city.name}</h4>
                <div className="flex justify-between text-sm"><span className="text-gray-500">City 4h/40km</span><span className="font-semibold text-primary">₹{prices.localPkgSedan}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">City 8h/80km</span><span className="font-semibold text-primary">₹{prices.fares.localPackages[1]?.sedan || '2,800'}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Outstation Fare</span><span className="font-semibold text-secondary">{prices.sedanPerKm}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">SUV Fare</span><span className="font-semibold text-secondary">{prices.suvPerKm}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes from City */}
      {routes.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-2">Need to Go Farther? — Outstation Taxi from <span className="text-primary">{city.name}</span></h2>
            <p className="text-gray-500 text-sm mb-6">Heading beyond {city.name}? Take an outstation ride from {prices.sedanPerKm}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {routes.map((r) => (
                <Link key={r.slug} href={`/routes/${r.slug}`} className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{r.fromName} → {r.toName}</p>
                  <div className="flex items-center justify-between mt-2 text-xs">
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
              { name: 'Outstation Ride', slug: 'outstation', price: `${prices.sedanPerKm}` },
              { name: 'One-Way Hire', slug: 'one-way', price: `${prices.sedanPerKm}` },
              { name: 'Return Tour', slug: 'round-trip', price: `${prices.sedanPerKm}` },
              { name: 'Airport Pickup', slug: 'airport-transfer', price: `${prices.airportSedan}+` },
              { name: 'Wedding Vehicle', slug: 'wedding-car', price: '₹5,000+' },
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={content.faqs} title={`Common Questions — City Taxi in ${city.name}, ${state.name}`} />
        </div>
      </section>

      {/* Popular Searches */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Related Searches</h3>
          <div className="flex flex-wrap gap-2">
            {content.popularSearches.slice(0, 24).map((kw, i) => (
              <a
                key={i}
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! City taxi enquiry for ${city.name}: ${kw}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {kw}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve a City Taxi in {city.name} Today!</h2>
          <p className="text-white/90 mb-6">4 Hours ₹1,800 | 8 Hours ₹2,800 | AC Fleet | Any Hour | No Peak Fares</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              <Phone size={22} /> {BUSINESS.phone}
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want a city taxi in ${city.name}.`)}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
              💬 Message Us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
