import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, Clock, Shield, Star, Heart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeroBanner from '@/components/HeroBanner';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import { getState, getCity, getAllCities, BUSINESS, getStatePriceLabels } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema, getCityGeoMeta, generateCitySubServiceSchema } from '@/lib/seo';
import { generateWeddingCarServiceContent } from '@/lib/serviceContent';
import { formatBoldText } from '@/lib/textHelper';

// Pre-render ALL city pages at build time — eliminates SSR CPU limit errors on CF Free Tier
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
  const canonicalUrl = `${BUSINESS.domain}/${stateSlug}/${citySlug}/wedding-car/`;
  return {
    title: `Bridal Car Hire in ${city.name} from ₹5,000 | Decorated Baraat Car | ${BUSINESS.name}`,
    description: `Marriage car hire in ${city.name} for your decorated baraat, guest shuttles and vidaai rides. Sedan ₹5,000, Crysta ₹8,000, Fortuner ₹12,000. Ring ${BUSINESS.phone}`.slice(0, 160),
    openGraph: { title: `Bridal Taxi ${city.name} | ${BUSINESS.name}`, type: 'website', siteName: BUSINESS.name, url: canonicalUrl, locale: 'en_IN', images: [{ url: `${BUSINESS.domain}/navbanner.webp`, width: 1200, height: 630, alt: `Bridal car hire in ${city.name}` }] },
    twitter: { card: 'summary_large_image', title: `Wedding Ride ${city.name} | ${BUSINESS.name}`, images: [`${BUSINESS.domain}/navbanner.webp`] },
    alternates: { canonical: canonicalUrl },
    other: { thumbnail: `${BUSINESS.domain}/navbanner.webp` },
    // keywords meta tag removed — Google ignores it (ignored since 2009), signals spam
  };
}

export default async function WeddingCarPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getState(stateSlug); const city = getCity(stateSlug, citySlug);
  if (!state || !city) notFound();
  const prices = getStatePriceLabels(stateSlug);
  const content = generateWeddingCarServiceContent({ cityName: city.name, stateName: state.name, stateSlug: state.slug, citySlug: city.slug, landmarks: city.landmarks, airport: city.airport, railway: city.railway });

  const weddingPackages = [
    { vehicle: 'Decorated Sedan', models: 'Swift Dzire, Honda Amaze', price: '₹5,000', includes: '8 hrs, 100 km, standard décor' },
    { vehicle: 'Decorated Innova Crysta', models: 'Toyota Innova Crysta', price: '₹8,000', includes: '8 hrs, 100 km, premium floral décor' },
    { vehicle: 'Decorated Fortuner', models: 'Toyota Fortuner', price: '₹12,000', includes: '8 hrs, 100 km, luxury floral décor' },
    { vehicle: 'Mercedes / BMW', models: 'Mercedes E-Class, BMW 5-Series', price: '₹20,000+', includes: '8 hrs, 100 km, VIP floral décor' },
  ];

  return (
    <>
      {(() => { const geo = getCityGeoMeta(city.name, state.slug, city.lat, city.lng); return (<><meta name="geo.region" content={geo['geo.region']} /><meta name="geo.placename" content={geo['geo.placename']} /><meta name="geo.position" content={geo['geo.position']} /><meta name="ICBM" content={geo['ICBM']} /></>); })()}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCitySubServiceSchema(city.name, state.name, state.slug, city.slug, 'Bridal Car Hire', 'wedding-car', `Luxury bridal car hire in ${city.name} with floral décor, ribbon work and experienced chauffeurs. Decorated sedans from ₹5,000 and Innova Crysta from ₹8,000.`, '5000', '25000')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(content.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([{ name: 'Home', url: BUSINESS.domain }, { name: state.name, url: `${BUSINESS.domain}/${state.slug}` }, { name: city.name, url: `${BUSINESS.domain}/${state.slug}/${city.slug}` }, { name: 'Bridal Car', url: `${BUSINESS.domain}/${stateSlug}/${citySlug}/wedding-car` }])) }} />

      <section className="relative text-white py-14 lg:py-20 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: state.name, href: `/${state.slug}` }, { name: city.name, href: `/${state.slug}/${city.slug}` }, { name: 'Bridal Car', href: `/${state.slug}/${city.slug}/wedding-car` }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-4">Bridal Car Hire in <span className="text-gradient">{city.name}</span></h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-6">Elegantly decorated vehicles for the baraat, the vidaai and ferrying your guests. Sedan, Innova Crysta, Fortuner and Mercedes, priced from ₹5,000.</p>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-bold rounded-full shadow-lg"><Phone size={18} /> {BUSINESS.phone}</a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! I want a bridal car in ${city.name}.`)}`} className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-gray-100"><div className="max-w-7xl mx-auto px-4"><div className="flex flex-wrap justify-center gap-6 text-sm">
        {[{ icon: <Heart size={16} />, t: 'Stunning Floral Décor' }, { icon: <Shield size={16} />, t: 'Experienced Chauffeurs' }, { icon: <Star size={16} />, t: 'More Than 5 Décor Themes' }, { icon: <Clock size={16} />, t: 'Punctuality Assured' }].map((b, i) => (<div key={i} className="flex items-center gap-1.5 text-primary font-medium">{b.icon} {b.t}</div>))}
      </div></div></section>

      <section className="py-12 bg-white"><div className="max-w-7xl mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div><h2 className="text-2xl font-bold text-secondary mb-4">Bridal Car Hire in {city.name}, {state.name} — Decorated Rides from ₹5,000</h2>
            
            {/* ── QUICK ANSWER BOX — targets AI Overviews ── */}
            <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full text-left">
                <h4 className="text-base font-bold text-secondary mb-3 flex items-center gap-2">
                  ⚡ Quick Facts — {city.name} Bridal Car Hire
                </h4>
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                    <dt className="text-xs text-gray-400 mb-1">Premium Sedan</dt>
                    <dd className="font-bold text-secondary">From ₹5,000/day</dd>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                    <dt className="text-xs text-gray-400 mb-1">SUV / Ertiga</dt>
                    <dd className="font-bold text-secondary">From ₹6,500/day</dd>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                    <dt className="text-xs text-gray-400 mb-1">Decor Option</dt>
                    <dd className="font-bold text-primary">Optional extra</dd>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                    <dt className="text-xs text-gray-400 mb-1">Chauffeur and Fuel</dt>
                    <dd className="font-bold text-primary">Included</dd>
                  </div>
                </dl>
                <p className="text-xs text-gray-500 mt-3">
                  📍 In the package: premium cars (Dzire, Ciaz, Ertiga, Crysta) driven by well-groomed chauffeurs for wedding functions and the groom entry.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  📞 Always-on support: <a href={`tel:${BUSINESS.phone}`} className="text-primary font-semibold hover:underline">{BUSINESS.phone}</a> | Decorated luxury ride plans available.
                </p>
              </div>
              <div className="relative w-full md:w-40 h-28 rounded-xl overflow-hidden shrink-0 border border-amber-200 shadow-sm">
                <Image
                  src="/navbanner.webp"
                  alt={`Bridal car hire in ${city.name} - booking decorated luxury vehicles`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 160px"
                  priority
                />
              </div>
            </div>
            {content.aboutContent.map((p, i) => (<p key={i} className="text-gray-600 mb-4 leading-relaxed">{formatBoldText(p)}</p>))}
          </div>
          <div><h3 className="text-xl font-bold text-secondary mb-4">Bridal Car Plans in {city.name}</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm"><table className="w-full border-collapse bg-white">
              <thead><tr className="bg-secondary text-white"><th className="px-4 py-3 text-left text-sm">Car</th><th className="px-4 py-3 text-left text-sm">Models</th><th className="px-4 py-3 text-center text-sm">Price</th><th className="px-4 py-3 text-left text-sm">Includes</th></tr></thead>
              <tbody>{weddingPackages.map((pkg, i) => (<tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}><td className="px-4 py-3 font-semibold text-secondary text-sm">{pkg.vehicle}</td><td className="px-4 py-3 text-gray-500 text-sm">{pkg.models}</td><td className="px-4 py-3 text-center font-bold text-primary text-sm">{pkg.price}</td><td className="px-4 py-3 text-gray-500 text-xs">{pkg.includes}</td></tr>))}</tbody>
            </table></div>
          </div>
          <div><h3 className="text-xl font-bold text-secondary mb-4">Wedding Services We Handle</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[{ icon: '💒', title: 'Baraat Car', desc: 'Adorned with flowers and ribbons' }, { icon: '👰', title: 'Vidaai Car', desc: 'A special send-off for the bride' }, { icon: '👥', title: 'Guest Shuttle', desc: 'Several cars moving your guests' }, { icon: '🎵', title: 'Sangeet Transport', desc: 'Rides for pre-wedding functions' }, { icon: '💍', title: 'Reception Transfers', desc: 'Moving guests between venues' }, { icon: '✈️', title: 'Honeymoon Travel', desc: 'Drops to the airport or station' }].map((item, i) => (
                <div key={i} className="p-4 bg-accent/50 rounded-xl border border-primary/10 text-center"><div className="text-2xl mb-2">{item.icon}</div><h4 className="font-bold text-secondary text-xs mb-1">{item.title}</h4><p className="text-gray-400 text-xs">{item.desc}</p></div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <BookingForm defaultFrom={city.name} compact />
          <div className="p-4 bg-secondary rounded-xl text-white text-center"><p className="text-sm text-gray-300 mb-2">Bridal Car Support</p><a href={`tel:${BUSINESS.phone}`} className="text-xl font-bold hover:text-primary transition-colors">📞 {BUSINESS.phone}</a></div>
        </div>
      </div></div></section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary mb-6">More Options in <span className="text-primary">{city.name}</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'City Taxi', slug: 'local', price: `₹${prices.localPkgSedan}/${prices.localPkgName}` },
              { name: 'Outstation Ride', slug: 'outstation', price: `${prices.sedanPerKm}` },
              { name: 'One-Way Hire', slug: 'one-way', price: `${prices.sedanPerKm}` },
              { name: 'Return Tour', slug: 'round-trip', price: `${prices.sedanPerKm}` },
              { name: 'Airport Pickup', slug: 'airport-transfer', price: `${prices.airportSedan}+` }
            ].map((srv) => (
              <Link key={srv.slug} href={`/${stateSlug}/${citySlug}/${srv.slug}`} className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-all text-center">
                <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{srv.name}</p>
                <p className="text-xs text-primary font-medium mt-1">{srv.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><FAQSection faqs={content.faqs} title={`Common Questions — Bridal Car in ${city.name}`} /></div></section>
      <section className="py-8 bg-white"><div className="max-w-7xl mx-auto px-4"><h3 className="text-sm font-semibold text-gray-400 mb-3">Related Searches</h3><div className="flex flex-wrap gap-2">{content.popularSearches.slice(0, 24).map((kw, i) => (<a key={i} href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! Bridal car enquiry: ${kw}`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">{kw}</a>))}</div></div></section>

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500 text-white text-center"><div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Reserve a Bridal Car in {city.name}!</h2>
        <p className="text-white/90 mb-6">Sedan ₹5,000 | Crysta ₹8,000 | Fortuner ₹12,000 | Décor Included</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all"><Phone size={22} /> {BUSINESS.phone}</a>
          <a href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello! Bridal car in ${city.name}.`)}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">💬 WhatsApp</a>
        </div>
      </div></section>
    </>
  );
}
