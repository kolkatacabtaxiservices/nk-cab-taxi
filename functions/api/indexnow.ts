/**
 * functions/api/indexnow.ts
 *
 * Cloudflare Pages Function — replaces src/app/api/indexnow/route.ts
 *
 * GET  /api/indexnow — submit all priority URLs to search engines (requires x-api-key)
 * POST /api/indexnow — submit custom URL list (requires x-api-key)
 *
 * Security fixes applied:
 *  - INDEXNOW_API_KEY hard-coded fallback removed; env var is now required.
 *  - GET endpoint now requires the same x-api-key header as the reindex endpoint.
 *  - Domain read from NEXT_PUBLIC_SITE_URL env var; no hard-coded string.
 */

interface Env {
  INDEXNOW_API_KEY?: string;
  INDEXNOW_ADMIN_KEY?: string; // separate secret used to call this endpoint
  NEXT_PUBLIC_SITE_URL?: string;
}

// Top priority pages to submit on every deploy
const PRIORITY_URLS = [
  '/',
  '/services',
  '/services/local-taxi',
  '/services/outstation',
  '/services/one-way',
  '/services/airport-transfer',
  '/services/wedding-car-rental',
  '/services/corporate-car-rental',
  '/services/round-trip',
  '/fleet',
  '/tours',
  '/fare-chart',
  '/blog',
  '/faq',
  '/contact',
  '/about',
  '/kolkata-cab-vs-ola-uber',
  '/kolkata-to-jamshedpur-cab',
  '/jamshedpur-to-kolkata-cab',
  // State pages
  '/west-bengal',
  '/jharkhand',
  '/odisha',
  // Top routes
  '/routes/kolkata-to-siliguri',
  '/routes/kolkata-to-darjeeling',
  '/routes/kolkata-to-durgapur',
  '/routes/kolkata-to-asansol',
  '/routes/kolkata-to-digha',
  '/routes/kolkata-to-mandarmani',
  '/routes/kolkata-to-gangasagar',
  '/routes/kolkata-to-bhubaneswar',
  '/routes/kolkata-to-puri',
  '/routes/kolkata-to-jamshedpur',
  '/routes/kolkata-to-ranchi',
  '/routes/kolkata-to-dhanbad',
  '/routes/kolkata-to-bokaro',
  '/routes/kolkata-to-deoghar',
  '/routes/kolkata-to-mayapur',
  '/routes/kolkata-to-konark',
  '/routes/kolkata-to-varanasi',
  '/routes/kolkata-to-patna',
  '/routes/jamshedpur-to-kolkata',
  '/routes/ranchi-to-kolkata',
  '/routes/bhubaneswar-to-kolkata',
  // Top cities
  '/west-bengal/kolkata',
  '/jharkhand/ranchi',
  '/jharkhand/jamshedpur',
  '/jharkhand/dhanbad',
  '/jharkhand/bokaro',
  '/jharkhand/deoghar',
  '/odisha/bhubaneswar',
  '/odisha/puri',
  '/odisha/cuttack',
  '/odisha/rourkela',
  '/west-bengal/siliguri',
  '/west-bengal/darjeeling',
  '/west-bengal/durgapur',
  '/west-bengal/asansol',
  '/west-bengal/howrah',
  '/west-bengal/digha',
  '/west-bengal/mandarmani',
  '/west-bengal/sundarbans',
  // Kolkata area pages
  '/kolkata/salt-lake',
  '/kolkata/new-town',
  '/kolkata/howrah',
  '/kolkata/park-street',
  '/kolkata/dum-dum',
  '/kolkata/ballygunge',
  '/kolkata/gariahat',
  '/kolkata/jadavpur',
  '/kolkata/tollygunge',
  '/kolkata/esplanade',
  '/kolkata/barasat',
  '/kolkata/behala',
  // Blog posts
  '/blog/complete-guide-cab-service-kolkata',
  '/blog/kolkata-to-darjeeling-road-trip-guide',
  '/blog/kolkata-airport-cab-service-guide',
  '/blog/best-weekend-trips-from-kolkata',
  '/blog/kolkata-to-puri-cab-jagannath-temple',
  // Sitemaps
  '/sitemap_index.xml',
];

async function submitToIndexNow(urls: string[], indexNowKey: string, domain: string) {
  const fullUrls = urls.map(u => u.startsWith('http') ? u : `${domain}${u}`);
  const results: { engine: string; status: string; error?: string }[] = [];

  const engines = [
    { name: 'Bing', url: 'https://www.bing.com/indexnow' },
    { name: 'Yandex', url: 'https://yandex.com/indexnow' },
  ];

  for (const engine of engines) {
    try {
      const response = await fetch(engine.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: new URL(domain).hostname,
          key: indexNowKey,
          keyLocation: `${domain}/${indexNowKey}.txt`,
          urlList: fullUrls.slice(0, 10000),
        }),
      });
      results.push({
        engine: engine.name,
        status: response.ok ? 'success' : `error-${response.status}`,
      });
    } catch (error) {
      results.push({ engine: engine.name, status: 'failed', error: String(error) });
    }
  }

  // Also ping Google sitemap
  try {
    const googlePing = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${domain}/sitemap_index.xml`)}`,
      { method: 'GET' }
    );
    results.push({
      engine: 'Google Sitemap Ping',
      status: googlePing.ok ? 'success' : `error-${googlePing.status}`,
    });
  } catch (error) {
    results.push({ engine: 'Google Sitemap Ping', status: 'failed', error: String(error) });
  }

  return results;
}

/** Authenticate request using the x-api-key header. */
function isAuthorized(request: Request, env: Env): boolean {
  const providedKey = request.headers.get('x-api-key');
  const expectedKey = (env.INDEXNOW_ADMIN_KEY || '').trim();
  // Reject if env var is not configured or key doesn't match
  return expectedKey.length > 0 && providedKey === expectedKey;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  // FIX #3: GET endpoint now requires authentication
  if (!isAuthorized(request, env)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // FIX #2: No hard-coded fallback — env var is required
  const INDEXNOW_KEY = (env.INDEXNOW_API_KEY || '').trim();
  if (!INDEXNOW_KEY) {
    console.error('INDEXNOW_API_KEY env variable is not set!');
    return Response.json({ error: 'IndexNow service not configured.' }, { status: 500 });
  }

  // FIX #15: Domain from env var, not hard-coded
  const DOMAIN = (env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '').trim();
  if (!DOMAIN) {
    return Response.json({ error: 'NEXT_PUBLIC_SITE_URL env variable is not set.' }, { status: 500 });
  }

  const results = await submitToIndexNow(PRIORITY_URLS, INDEXNOW_KEY, DOMAIN);

  return Response.json({
    message: `Submitted ${PRIORITY_URLS.length} URLs to search engines`,
    submitted: PRIORITY_URLS.length,
    results,
    timestamp: new Date().toISOString(),
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // POST also requires authentication
  if (!isAuthorized(request, env)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // FIX #2: No hard-coded fallback — env var is required
    const INDEXNOW_KEY = (env.INDEXNOW_API_KEY || '').trim();
    if (!INDEXNOW_KEY) {
      console.error('INDEXNOW_API_KEY env variable is not set!');
      return Response.json({ error: 'IndexNow service not configured.' }, { status: 500 });
    }

    // FIX #15: Domain from env var, not hard-coded
    const DOMAIN = (env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '').trim();
    if (!DOMAIN) {
      return Response.json({ error: 'NEXT_PUBLIC_SITE_URL env variable is not set.' }, { status: 500 });
    }

    const body = await request.json() as { urls?: string[] };
    const urls = body.urls || PRIORITY_URLS;

    const results = await submitToIndexNow(urls, INDEXNOW_KEY, DOMAIN);

    return Response.json({
      message: `Submitted ${urls.length} URLs to search engines`,
      submitted: urls.length,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }
};
