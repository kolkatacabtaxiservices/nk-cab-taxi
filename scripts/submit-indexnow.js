/**
 * IndexNow Batch Submission Script
 * Submits all URLs to Bing/Yandex IndexNow API for instant crawl signaling.
 * 
 * Usage: node scripts/submit-indexnow.js
 * 
 * IndexNow is free, no auth needed, and signals crawlers to come immediately.
 * Bing, Yandex, Seznam, and Naver support IndexNow natively.
 */

const DOMAIN = 'https://www.nkcabtaxi.com';
const INDEXNOW_KEY = 'f63a562479e04845a7090b84784a9e52';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

// All URLs that need indexing — focus on "Discovered - currently not indexed" pages
const urls = [
  // Blog pages
  `${DOMAIN}/blog`,
  `${DOMAIN}/blog/best-weekend-trips-from-kolkata`,
  `${DOMAIN}/blog/complete-guide-cab-service-kolkata`,
  `${DOMAIN}/blog/kolkata-airport-cab-service-guide`,
  `${DOMAIN}/blog/kolkata-corporate-car-rental`,
  `${DOMAIN}/blog/kolkata-local-taxi-fare-chart`,
  `${DOMAIN}/blog/kolkata-to-darjeeling-road-trip-guide`,
  `${DOMAIN}/blog/kolkata-to-digha-road-trip`,
  `${DOMAIN}/blog/kolkata-to-puri-cab-jagannath-temple`,
  `${DOMAIN}/blog/kolkata-to-siliguri-cab-nh12`,
  `${DOMAIN}/blog/kolkata-wedding-car-rental-guide`,

  // State pages
  `${DOMAIN}/west-bengal`,
  `${DOMAIN}/jharkhand`,
  `${DOMAIN}/odisha`,
  `${DOMAIN}/bihar`,
  `${DOMAIN}/uttar-pradesh`,

  // City pages — West Bengal (ALL major cities)
  `${DOMAIN}/west-bengal/kolkata`,
  `${DOMAIN}/west-bengal/howrah`,
  `${DOMAIN}/west-bengal/siliguri`,
  `${DOMAIN}/west-bengal/darjeeling`,
  `${DOMAIN}/west-bengal/durgapur`,
  `${DOMAIN}/west-bengal/asansol`,
  `${DOMAIN}/west-bengal/kharagpur`,
  `${DOMAIN}/west-bengal/bardhaman`,
  `${DOMAIN}/west-bengal/haldia`,
  `${DOMAIN}/west-bengal/malda`,
  `${DOMAIN}/west-bengal/digha`,
  `${DOMAIN}/west-bengal/midnapore`,
  `${DOMAIN}/west-bengal/barasat`,
  `${DOMAIN}/west-bengal/kalyani`,
  `${DOMAIN}/west-bengal/bankura`,
  `${DOMAIN}/west-bengal/purulia`,
  `${DOMAIN}/west-bengal/mandarmani`,
  `${DOMAIN}/west-bengal/murshidabad`,
  `${DOMAIN}/west-bengal/krishnanagar`,
  `${DOMAIN}/west-bengal/cooch-behar`,
  `${DOMAIN}/west-bengal/jalpaiguri`,
  `${DOMAIN}/west-bengal/bolpur-shantiniketan`,
  `${DOMAIN}/west-bengal/kolkata-airport`,
  `${DOMAIN}/west-bengal/new-town-kolkata`,
  `${DOMAIN}/west-bengal/salt-lake-kolkata`,

  // City pages — Jharkhand
  `${DOMAIN}/jharkhand/ranchi`,
  `${DOMAIN}/jharkhand/jamshedpur`,
  `${DOMAIN}/jharkhand/dhanbad`,
  `${DOMAIN}/jharkhand/bokaro`,
  `${DOMAIN}/jharkhand/deoghar`,
  `${DOMAIN}/jharkhand/hazaribagh`,
  `${DOMAIN}/jharkhand/giridih`,
  `${DOMAIN}/jharkhand/dumka`,

  // City pages — Odisha (ALL)
  `${DOMAIN}/odisha/bhubaneswar`,
  `${DOMAIN}/odisha/puri`,
  `${DOMAIN}/odisha/cuttack`,
  `${DOMAIN}/odisha/rourkela`,
  `${DOMAIN}/odisha/berhampur`,
  `${DOMAIN}/odisha/balasore`,
  `${DOMAIN}/odisha/konark`,
  `${DOMAIN}/odisha/sambalpur`,
  `${DOMAIN}/odisha/baripada`,
  `${DOMAIN}/odisha/paradip`,

  // City pages — Bihar
  `${DOMAIN}/bihar/patna`,
  `${DOMAIN}/bihar/gaya`,
  `${DOMAIN}/bihar/bodh-gaya`,
  `${DOMAIN}/bihar/muzaffarpur`,

  // City pages — Uttar Pradesh
  `${DOMAIN}/uttar-pradesh/varanasi`,
  `${DOMAIN}/uttar-pradesh/prayagraj`,
  `${DOMAIN}/uttar-pradesh/agra`,
  `${DOMAIN}/uttar-pradesh/ayodhya`,

  // Service pages
  `${DOMAIN}/services/airport-transfer`,
  `${DOMAIN}/services/corporate-car-rental`,
  `${DOMAIN}/services/local-taxi`,
  `${DOMAIN}/services/outstation`,
  `${DOMAIN}/services/round-trip`,
  `${DOMAIN}/services/one-way`,
  `${DOMAIN}/services/wedding-car-rental`,

  // Route pages — Kolkata to all destinations
  `${DOMAIN}/routes/kolkata-to-balasore`,
  `${DOMAIN}/routes/kolkata-to-bhubaneswar`,
  `${DOMAIN}/routes/kolkata-to-darjeeling`,
  `${DOMAIN}/routes/kolkata-to-deoghar`,
  `${DOMAIN}/routes/kolkata-to-digha`,
  `${DOMAIN}/routes/kolkata-to-dooars`,
  `${DOMAIN}/routes/kolkata-to-durgapur`,
  `${DOMAIN}/routes/kolkata-to-gangasagar`,
  `${DOMAIN}/routes/kolkata-to-haldia`,
  `${DOMAIN}/routes/kolkata-to-howrah`,
  `${DOMAIN}/routes/kolkata-to-jamshedpur`,
  `${DOMAIN}/routes/kolkata-to-kharagpur`,
  `${DOMAIN}/routes/kolkata-to-konark`,
  `${DOMAIN}/routes/kolkata-to-mandarmani`,
  `${DOMAIN}/routes/kolkata-to-mayapur`,
  `${DOMAIN}/routes/kolkata-to-midnapore`,
  `${DOMAIN}/routes/kolkata-to-patna`,
  `${DOMAIN}/routes/kolkata-to-puri`,
  `${DOMAIN}/routes/kolkata-to-ranchi`,
  `${DOMAIN}/routes/kolkata-to-siliguri`,
  `${DOMAIN}/routes/kolkata-to-varanasi`,
  `${DOMAIN}/routes/kolkata-to-asansol`,
  `${DOMAIN}/routes/kolkata-to-bolpur-shantiniketan`,

  // Route pages — Balasore routes (specifically not indexed)
  `${DOMAIN}/routes/balasore-to-kolkata`,
  `${DOMAIN}/routes/balasore-to-bhubaneswar`,
  `${DOMAIN}/routes/balasore-to-cuttack`,
  `${DOMAIN}/routes/balasore-to-puri`,

  // Route pages — all major return routes
  `${DOMAIN}/routes/asansol-to-bhubaneswar`,
  `${DOMAIN}/routes/asansol-to-kolkata`,
  `${DOMAIN}/routes/asansol-to-ranchi`,
  `${DOMAIN}/routes/bhubaneswar-to-bokaro`,
  `${DOMAIN}/routes/bhubaneswar-to-darjeeling`,
  `${DOMAIN}/routes/bhubaneswar-to-deoghar`,
  `${DOMAIN}/routes/bhubaneswar-to-dhanbad`,
  `${DOMAIN}/routes/bhubaneswar-to-digha`,
  `${DOMAIN}/routes/bhubaneswar-to-durgapur`,
  `${DOMAIN}/routes/bhubaneswar-to-jamshedpur`,
  `${DOMAIN}/routes/bhubaneswar-to-kolkata`,
  `${DOMAIN}/routes/bhubaneswar-to-konark`,
  `${DOMAIN}/routes/bhubaneswar-to-mandarmani`,
  `${DOMAIN}/routes/bhubaneswar-to-puri`,
  `${DOMAIN}/routes/bhubaneswar-to-ranchi`,
  `${DOMAIN}/routes/bhubaneswar-to-siliguri`,
  `${DOMAIN}/routes/bhubaneswar-to-cuttack`,
  `${DOMAIN}/routes/bokaro-to-bhubaneswar`,
  `${DOMAIN}/routes/bokaro-to-kolkata`,
  `${DOMAIN}/routes/bokaro-to-ranchi`,
  `${DOMAIN}/routes/cuttack-to-bhubaneswar`,
  `${DOMAIN}/routes/darjeeling-to-bhubaneswar`,
  `${DOMAIN}/routes/darjeeling-to-kolkata`,
  `${DOMAIN}/routes/darjeeling-to-ranchi`,
  `${DOMAIN}/routes/deoghar-to-bhubaneswar`,
  `${DOMAIN}/routes/deoghar-to-kolkata`,
  `${DOMAIN}/routes/deoghar-to-ranchi`,
  `${DOMAIN}/routes/dhanbad-to-bhubaneswar`,
  `${DOMAIN}/routes/dhanbad-to-kolkata`,
  `${DOMAIN}/routes/dhanbad-to-ranchi`,
  `${DOMAIN}/routes/digha-to-bhubaneswar`,
  `${DOMAIN}/routes/digha-to-kolkata`,
  `${DOMAIN}/routes/digha-to-ranchi`,
  `${DOMAIN}/routes/durgapur-to-bhubaneswar`,
  `${DOMAIN}/routes/durgapur-to-kolkata`,
  `${DOMAIN}/routes/durgapur-to-ranchi`,
  `${DOMAIN}/routes/haldia-to-kolkata`,
  `${DOMAIN}/routes/howrah-to-ranchi`,
  `${DOMAIN}/routes/howrah-to-bhubaneswar`,
  `${DOMAIN}/routes/jamshedpur-to-bhubaneswar`,
  `${DOMAIN}/routes/jamshedpur-to-kolkata`,
  `${DOMAIN}/routes/jamshedpur-to-ranchi`,
  `${DOMAIN}/routes/kharagpur-to-kolkata`,
  `${DOMAIN}/routes/konark-to-bhubaneswar`,
  `${DOMAIN}/routes/mandarmani-to-bhubaneswar`,
  `${DOMAIN}/routes/mandarmani-to-kolkata`,
  `${DOMAIN}/routes/midnapore-to-kolkata`,
  `${DOMAIN}/routes/patna-to-kolkata`,
  `${DOMAIN}/routes/patna-to-ranchi`,
  `${DOMAIN}/routes/puri-to-bhubaneswar`,
  `${DOMAIN}/routes/puri-to-kolkata`,
  `${DOMAIN}/routes/puri-to-ranchi`,
  `${DOMAIN}/routes/ranchi-to-asansol`,
  `${DOMAIN}/routes/ranchi-to-bhubaneswar`,
  `${DOMAIN}/routes/ranchi-to-bokaro`,
  `${DOMAIN}/routes/ranchi-to-darjeeling`,
  `${DOMAIN}/routes/ranchi-to-deoghar`,
  `${DOMAIN}/routes/ranchi-to-dhanbad`,
  `${DOMAIN}/routes/ranchi-to-digha`,
  `${DOMAIN}/routes/ranchi-to-howrah`,
  `${DOMAIN}/routes/ranchi-to-jamshedpur`,
  `${DOMAIN}/routes/ranchi-to-kolkata`,
  `${DOMAIN}/routes/ranchi-to-puri`,
  `${DOMAIN}/routes/ranchi-to-siliguri`,
  `${DOMAIN}/routes/ranchi-to-patna`,
  `${DOMAIN}/routes/rourkela-to-bhubaneswar`,
  `${DOMAIN}/routes/siliguri-to-bhubaneswar`,
  `${DOMAIN}/routes/siliguri-to-kolkata`,
  `${DOMAIN}/routes/siliguri-to-ranchi`,

  // Tour pages
  `${DOMAIN}/tours/agra-taj-mahal-tour`,
  `${DOMAIN}/tours/bodh-gaya-rajgir-tour`,
  `${DOMAIN}/tours/darjeeling-tour`,
  `${DOMAIN}/tours/golden-triangle-tour`,
  `${DOMAIN}/tours/haridwar-rishikesh-tour`,
  `${DOMAIN}/tours/kolkata-beach-tour`,
  `${DOMAIN}/tours/kolkata-city-tour`,
  `${DOMAIN}/tours/north-bengal-tour`,
  `${DOMAIN}/tours/patna-rajgir-nalanda-tour`,
  `${DOMAIN}/tours/puri-konark-tour`,
  `${DOMAIN}/tours/ranchi-netarhat-tour`,
  `${DOMAIN}/tours/sundarbans-tour`,
  `${DOMAIN}/tours/varanasi-ayodhya-tour`,
];

async function submitToIndexNow() {
  console.log(`\n🚀 IndexNow Batch Submission`);
  console.log(`📊 Total URLs: ${urls.length}`);
  console.log(`🔑 Key: ${INDEXNOW_KEY}`);
  console.log(`🌐 Host: www.nkcabtaxi.com\n`);

  const payload = {
    host: 'www.nkcabtaxi.com',
    key: INDEXNOW_KEY,
    keyLocation: `${DOMAIN}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    console.log(`📡 Response Status: ${response.status} ${response.statusText}`);
    
    if (response.status === 200 || response.status === 202) {
      console.log(`✅ SUCCESS! All ${urls.length} URLs submitted to IndexNow.`);
      console.log(`📋 Search engines notified: Bing, Yandex, Seznam, Naver`);
      console.log(`⏰ Crawlers will visit these URLs within hours to days.\n`);
    } else {
      const body = await response.text();
      console.log(`⚠️ Response body: ${body}`);
    }
  } catch (error) {
    console.error(`❌ Error submitting to IndexNow:`, error);
  }
}

submitToIndexNow();
