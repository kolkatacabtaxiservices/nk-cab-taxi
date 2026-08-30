import { Metadata } from 'next';
import { Phone } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { BUSINESS } from '@/lib/data';
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = {
  // `absolute` prevents layout template from appending "| NK Cab & Taxi" again
  title: { absolute: `NK Cab & Taxi Q&A | Booking, Fares, Routes & Payment` },
  description: `Straight answers from NK Cab & Taxi — how to book, pricing from ₹12/km in a sedan, payment choices, airport transfers, cancellations, wedding cars and corporate hire. Call ${BUSINESS.phone}.`,
  openGraph: {
    title: `NK Cab & Taxi Q&A — Booking, Fares & Routes`,
    description: `Practical answers to common questions — booking, fares (₹12/km), payment, cancellations, airport runs, wedding cars. Call ${BUSINESS.phone}.`,
    type: 'website',
    siteName: 'NK Cab & Taxi',
    url: `${BUSINESS.domain}/faq`,
    locale: 'en_IN',
    images: [{ url: `${BUSINESS.domain}/herobanner.webp`, width: 1200, height: 630, alt: 'NK Cab & Taxi questions and answers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NK Cab & Taxi Q&A | Booking and Fares`,
    description: `Quick answers to common questions. Fares from ₹12/km. Call ${BUSINESS.phone}.`,
    images: [`${BUSINESS.domain}/herobanner.webp`],
  },
  alternates: { canonical: `${BUSINESS.domain}/faq/` },
  other: {
    thumbnail: `${BUSINESS.domain}/herobanner.webp`,
  },
};

const faqCategories = [
  {
    title: 'Booking Process & Confirmation',
    faqs: [
      { question: 'What information do I need to give when booking?', answer: `To book a cab with ${BUSINESS.name}, you need to provide: (1) Your pickup address (building name/landmark helps the driver), (2) Destination address, (3) Date and time of travel, (4) Number of passengers and approximate luggage, (5) Vehicle preference (Sedan, SUV, Innova, or Tempo). That's it — no account creation, no app download. Call or WhatsApp ${BUSINESS.phone}.` },
      { question: 'How quickly do I get confirmation after booking?', answer: `Within 2 minutes of your WhatsApp or call, you receive confirmation with: driver's full name, mobile number, vehicle model, and registration number. For advance outstation bookings made 12+ hours ahead, you receive confirmation immediately and a reminder with updated driver details 2 hours before departure.` },
      { question: 'Can I modify my booking after confirmation?', answer: `Yes. You can modify pickup time, pickup location (within reason), vehicle type (subject to availability), and date — by calling ${BUSINESS.phone} at least 2 hours before scheduled departure. For outstation modifications on the day of travel, call at least 1 hour before scheduled start. No modification fee for advance notice.` },
      { question: 'Is there a booking fee or registration requirement?', answer: 'No booking fee and no registration required. You book by calling or WhatsApp, get confirmed, and pay only for the trip (after completion in most cases). First-time customers and regular customers both follow the same simple process.' },
      { question: 'Can I book a cab for someone else — a family member or guest?', answer: `Yes, frequently done. Share the passenger's name, pickup address, and mobile number. Our driver will coordinate pickup with the passenger directly. This is useful for booking for elderly parents, guests arriving at Kolkata airport, or corporate clients who need to arrange travel for visiting executives.` },
    ],
  },
  {
    title: 'Safety & Documents',
    faqs: [
      { question: 'What documents does your driver carry in the vehicle?', answer: `Every ${BUSINESS.name} vehicle carries: (1) Commercial vehicle registration certificate, (2) Valid insurance policy (comprehensive), (3) Pollution Under Control (PUC) certificate, (4) Vehicle fitness certificate from RTO, (5) Driver's commercial licence (badge), (6) Route permit for the operating state(s), (7) Taxi/cab permit. You may ask the driver to show any of these at any time.` },
      { question: 'Is it safe to travel alone late at night with your cab?', answer: `Yes. All our drivers are police-verified with background checks before onboarding. We maintain driver contact details and trip records. For solo night-time outstation travel, we recommend: (1) Sharing the driver's vehicle number and phone number with a family member, (2) Keeping your phone charged, (3) Noting down the booking confirmation you received. We also advise passengers to rate the trip via WhatsApp after completion so we can maintain quality standards.` },
      { question: 'Are the vehicles insured for passengers?', answer: `Yes. All vehicles carry comprehensive third-party insurance. In the unlikely event of an accident, the vehicle's insurance covers passenger liability as per Motor Vehicles Act requirements. For high-value outstation trips, we recommend passengers also carry personal accident insurance (available as low as ₹200/year from most insurance apps).` },
      { question: 'What happens if the vehicle breaks down during the trip?', answer: `In case of breakdown: (1) Driver immediately contacts our operations team, (2) We arrange a substitute vehicle to your current location within 45–90 minutes, (3) You are not charged for the waiting time, (4) The fare is calculated for the actual distance covered by the substitute vehicle from your original pickup. On remote outstation routes where replacement may take longer, we keep you informed and coordinate accordingly.` },
      { question: 'Can I share my live location during the trip?', answer: `Yes — and we encourage it for solo travel. Share your live location with a trusted family member via WhatsApp or Google Maps from inside the cab. Our vehicle details (model and registration) are sent to you at booking time so your family can verify the vehicle. If at any point during the trip you feel uncomfortable, call ${BUSINESS.phone} directly — our operations team is available 24/7.` },
    ],
  },
  {
    title: 'Trip Planning & Luggage',
    faqs: [
      { question: 'How much luggage can I carry in a Sedan cab?', answer: `A standard Sedan (Swift Dzire, Honda Amaze) has a 380–420 litre boot — comfortably fits 2 large suitcases (28") and 1 cabin bag. For 4 passengers with heavy luggage, we recommend upgrading to SUV (Ertiga, 209 litre boot + roof capable) or Innova Crysta (8 passengers, large rear cargo area). Mention your luggage count when booking so we assign the right vehicle.` },
      { question: 'What is the best departure time for long outstation trips from Kolkata?', answer: `For routes under 300 km: 5–6 AM departure is ideal — exits Kolkata city traffic, arrives destination by afternoon.\nFor routes 300–500 km (Puri, Ranchi, Bhubaneswar): 4–5 AM departure recommended — reaches well before nightfall.\nFor routes over 500 km (Darjeeling, Varanasi): Either 3–4 AM departure for same-day arrival, or night departure (9–10 PM) for next-morning arrival. Discuss with us when booking — we'll recommend the best departure based on your destination.` },
      { question: 'Can I make stops along the route?', answer: `Yes. Brief stops (toilet, food, fuel — 15–20 minutes each) are standard and expected on outstation trips. For sightseeing stops en route (e.g., stopping at Kharagpur for a break on the way to Puri), inform the driver at the start or call us. Stops beyond what's reasonable for the route may incur extra waiting charges only if they significantly extend trip time.` },
      { question: 'Is smoking or drinking alcohol permitted in the cab?', answer: `No smoking inside any NK Cab & Taxi vehicle — this is a strict policy. No alcohol consumption during transit for outstation trips. These policies protect all passengers including children who may travel in the same vehicle. Violation of this policy can result in the driver refusing to continue the trip without refund.` },
      { question: 'Can I bring pets in the cab?', answer: `Small pets in carriers are allowed at the driver's discretion — call ${BUSINESS.phone} when booking and mention this. We'll note the driver preference. Large pets or pets without carriers cannot be accommodated. For pet-friendly travel, book a dedicated vehicle (not shared) and confirm in advance.` },
    ],
  },
  {
    title: 'Payment, Bills & Receipts',
    faqs: [
      { question: 'Do I receive a receipt or bill after the trip?', answer: `Yes. For all bookings, a trip summary with pickup, destination, distance, and fare breakdown is available on WhatsApp upon request. For corporate clients, formal GST-compliant tax invoices are issued within 24 hours of trip completion (or monthly for contract clients). Personal bills for individual bookings can be issued by requesting at ${BUSINESS.phone}.` },
      { question: 'How are toll charges handled — do I pay the driver directly?', answer: `Toll charges are paid at the booth during the trip. The driver pays at the plaza and either you reimburse the driver directly (most common) or it's added to the final bill. We provide all toll receipts — there is no markup on toll charges. For multi-toll routes (e.g., Kolkata to Puri has 6+ tolls), we give you an approximate toll estimate before departure.` },
      { question: 'Is UPI payment accepted? Which apps?', answer: `Yes — we accept all major UPI apps: Google Pay, PhonePe, Paytm, BHIM, and any UPI-enabled bank app. Payment can be made to the driver's UPI ID directly. We also accept NEFT/IMPS bank transfer for advance booking payments (share account details on request). Cash is always accepted.` },
      { question: 'What if there is a billing dispute after the trip?', answer: `Call ${BUSINESS.phone} immediately after the trip if you have any concern about the billed amount. We review the trip log (distance, time, applicable charges) and resolve disputes within 4 hours. Our fare calculation is transparent and based on distance only — there are no subjective charges. If an error is found, the difference is returned via the same payment method used.` },
      { question: 'Can I get a GST invoice for my outstation trip as an individual?', answer: `Yes. Any individual or business can request a GST-compliant invoice for any trip. Provide your name/company name, GSTIN (if business), and state of registration when requesting. We issue the invoice within 24 hours. Note: GST on cab services is 5% (no ITC available) for non-GST registered individuals, and 18% with full ITC eligibility for registered businesses.` },
    ],
  },
  {
    title: 'Multi-State Travel & Permits',
    faqs: [
      { question: 'Do you provide cabs for inter-state travel from West Bengal?', answer: `Yes — inter-state travel is one of our core strengths. We operate from West Bengal to Jharkhand, Odisha, Bihar, and Uttar Pradesh on a daily basis. Our vehicles carry all-state permits for these routes. Common routes: Kolkata → Ranchi, Kolkata → Puri, Kolkata → Bhubaneswar, Kolkata → Patna, Kolkata → Varanasi. Call ${BUSINESS.phone} for any route inquiry.` },
      { question: 'Is there an extra charge for crossing state borders?', answer: `For most routes within our standard coverage, state entry permits are either included or communicated upfront as a small separate charge (typically ₹200–400 per border crossing for commercial vehicles). We never add undisclosed permit charges to the final bill. The permit amount is shown on the receipt provided at the border entry point.` },
      { question: 'Can I book a cab in Ranchi or Jharkhand?', answer: `Yes. We operate independently in Jharkhand with Ranchi and Jamshedpur as our base cities there. You can book from Ranchi to Kolkata, Ranchi to Deoghar, Ranchi to Patna, Jamshedpur to Kolkata, and all local/outstation routes within Jharkhand. Call the same number: ${BUSINESS.phone} — our team handles all states centrally.` },
      { question: 'Do you operate in Odisha?', answer: `Yes. Bhubaneswar, Puri, and Cuttack are active service zones. We run regular Kolkata–Bhubaneswar and Kolkata–Puri routes, and can arrange local transport within Odisha's cities. For Puri temple circuit (Konark, Chilika, Raghurajpur), we provide full-day local sightseeing packages from Puri.` },
    ],
  },
  {
    title: 'Accessibility & Special Needs',
    faqs: [
      { question: 'Can you accommodate passengers with mobility limitations?', answer: `Yes. When booking, mention any mobility limitations so we can assign a vehicle with easier entry (Innova Crysta has higher step height but more space; Sedan is lower and easier for some passengers). Our drivers are briefed to assist with boarding and luggage. For wheelchair users, mention the wheelchair dimensions so we ensure boot space is adequate.` },
      { question: 'Do you provide child seats for infant and toddler passengers?', answer: `We don't stock child seats (they are personal safety equipment) but you are welcome to bring your own child seat — drivers assist with securing them. We recommend bringing your own seat for children under 12 kg for outstation trips. Mention you're travelling with a young child when booking so the driver is prepared.` },
      { question: 'Is medical equipment allowed in the cab for patients being transported?', answer: `Yes. We regularly transport hospital patients, including those with oxygen cylinders, wheelchairs, and IV stands (during discharge trips). Mention medical equipment details when booking — we'll confirm vehicle suitability. Our drivers handling medical transport bookings are briefed on being patient and allowing sufficient time for boarding. No extra charge for medical equipment.` },
    ],
  },
];


export default function FAQPage() {
  const allFaqs = faqCategories.flatMap(cat => cat.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(allFaqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS.domain },
        { name: 'FAQ', url: `${BUSINESS.domain}/faq` },
      ])) }} />

      {/* Hero */}
      <section className="relative text-white py-12 lg:py-16 overflow-hidden">
        <HeroBanner hideDots />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ name: 'FAQ', href: '/faq' }]} />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-3">
            Common Questions, <span className="text-gradient">Straight Answers</span>
          </h1>
          <p className="text-gray-300 max-w-3xl">Practical answers on booking a car with {BUSINESS.name}. Question not covered? Ring {BUSINESS.phone}.</p>
        </div>
      </section>

      {/* FAQ Categories */}
      {faqCategories.map((category, catIdx) => (
        <section key={catIdx} className={`py-12 ${catIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary mb-6">{category.title}</h2>
            <FAQSection faqs={category.faqs} />
          </div>
        </section>
      ))}

      {/* CTA */}
      <GoogleMapEmbed />

      <section className="py-12 bg-gradient-to-r from-primary to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a Quick Answer?</h2>
          <p className="text-white/90 mb-6">Reach us any hour — someone is always on the line!</p>
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all">
            <Phone size={22} /> {BUSINESS.phone}
          </a>
        </div>
      </section>
    </>
  );
}
