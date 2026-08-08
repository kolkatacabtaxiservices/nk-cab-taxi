/**
 * functions/api/reindex.ts
 *
 * Cloudflare Pages Function — replaces src/app/api/reindex/route.ts
 *
 * POST /api/reindex — submit specific URLs to IndexNow (authenticated)
 * Header: x-api-key: <REINDEX_API_KEY>
 * Body: { "urls": ["/routes/kolkata-to-ranchi", ...] }
 *
 * Security fixes applied:
 *  - INDEXNOW_API_KEY hard-coded fallback removed; env var is now required.
 *  - SSRF fix: URLs are validated to belong to own domain before forwarding.
 *  - Domain read from NEXT_PUBLIC_SITE_URL env var; no hard-coded string.
 */

interface Env {
  INDEXNOW_API_KEY?: string;
  REINDEX_API_KEY?: string;
  NEXT_PUBLIC_SITE_URL?: string;
}

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Authenticate
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== (env.REINDEX_API_KEY || '').trim()) {
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

  try {
    const body = await request.json() as { urls?: string[] };
    const urls: string[] = body.urls || [];

    if (urls.length === 0) {
      return Response.json({ error: 'No URLs provided' }, { status: 400 });
    }

    // Convert relative URLs to absolute
    const absoluteUrls = urls.map(url =>
      url.startsWith('http') ? url : `${DOMAIN}${url.startsWith('/') ? '' : '/'}${url}`
    );

    // FIX #4 (SSRF): Only forward URLs that belong to our own domain.
    // Reject any URL that doesn't start with the configured DOMAIN.
    const ownDomainUrls = absoluteUrls.filter(url => url.startsWith(DOMAIN));
    const rejectedCount = absoluteUrls.length - ownDomainUrls.length;

    if (ownDomainUrls.length === 0) {
      return Response.json(
        { error: 'All provided URLs were rejected — only own-domain URLs are allowed.' },
        { status: 400 }
      );
    }

    // Ping all IndexNow endpoints in parallel
    const results = await Promise.allSettled(
      INDEXNOW_ENDPOINTS.map(async (endpoint) => {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            host: new URL(DOMAIN).hostname,
            key: INDEXNOW_KEY,
            keyLocation: `${DOMAIN}/${INDEXNOW_KEY}.txt`,
            urlList: ownDomainUrls,
          }),
        });
        return { endpoint, status: response.status, ok: response.ok };
      })
    );

    // Also ping Google's URL submission via sitemap ping
    const googlePing = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${DOMAIN}/sitemap_index.xml`)}`,
      { method: 'GET' }
    ).catch(() => null);

    return Response.json({
      success: true,
      urlsSubmitted: ownDomainUrls.length,
      urlsRejected: rejectedCount,
      urls: ownDomainUrls,
      indexNowResults: results.map(r =>
        r.status === 'fulfilled' ? r.value : { error: (r.reason as Error)?.message }
      ),
      googleSitemapPing: googlePing ? googlePing.status : 'failed',
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to submit URLs', details: String(error) },
      { status: 500 }
    );
  }
};
