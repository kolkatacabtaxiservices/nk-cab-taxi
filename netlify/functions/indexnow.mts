/**
 * netlify/functions/indexnow.mts
 *
 * Netlify Function — replaces functions/api/indexnow.ts (Cloudflare Pages Function)
 *
 * GET  /api/indexnow — submit all priority URLs to search engines (requires x-api-key)
 * POST /api/indexnow — submit custom URL list (requires x-api-key)
 *
 * Security:
 *  - INDEXNOW_API_KEY env var is required (no hard-coded fallback).
 *  - Both GET and POST require x-api-key header matching INDEXNOW_ADMIN_KEY.
 *  - Domain read from NEXT_PUBLIC_SITE_URL env var.
 */

import type { Context } from "@netlify/functions";

// Top priority pages to submit on every deploy
const PRIORITY_URLS = [
  "/",
  "/services",
  "/services/local-taxi",
  "/services/outstation",
  "/services/one-way",
  "/services/airport-transfer",
  "/services/wedding-car-rental",
  "/services/corporate-car-rental",
  "/services/round-trip",
  "/fleet",
  "/tours",
  "/fare-chart",
  "/blog",
  "/faq",
  "/contact",
  "/about",
  "/kolkata-cab-vs-ola-uber",
  "/kolkata-to-jamshedpur-cab",
  "/jamshedpur-to-kolkata-cab",
  // State pages
  "/west-bengal",
  "/jharkhand",
  "/odisha",
  // Top routes
  "/routes/kolkata-to-siliguri",
  "/routes/kolkata-to-darjeeling",
  "/routes/kolkata-to-durgapur",
  "/routes/kolkata-to-asansol",
  "/routes/kolkata-to-digha",
  "/routes/kolkata-to-mandarmani",
  "/routes/kolkata-to-gangasagar",
  "/routes/kolkata-to-bhubaneswar",
  "/routes/kolkata-to-puri",
  "/routes/kolkata-to-jamshedpur",
  "/routes/kolkata-to-ranchi",
  "/routes/kolkata-to-dhanbad",
  "/routes/kolkata-to-bokaro",
  "/routes/kolkata-to-deoghar",
  "/routes/kolkata-to-mayapur",
  "/routes/kolkata-to-konark",
  "/routes/kolkata-to-varanasi",
  "/routes/kolkata-to-patna",
  "/routes/jamshedpur-to-kolkata",
  "/routes/ranchi-to-kolkata",
  "/routes/bhubaneswar-to-kolkata",
  // Top cities
  "/west-bengal/kolkata",
  "/jharkhand/ranchi",
  "/jharkhand/jamshedpur",
  "/jharkhand/dhanbad",
  "/jharkhand/bokaro",
  "/jharkhand/deoghar",
  "/odisha/bhubaneswar",
  "/odisha/puri",
  "/odisha/cuttack",
  "/odisha/rourkela",
  "/west-bengal/siliguri",
  "/west-bengal/darjeeling",
  "/west-bengal/durgapur",
  "/west-bengal/asansol",
  "/west-bengal/howrah",
  "/west-bengal/digha",
  "/west-bengal/mandarmani",
  "/west-bengal/sundarbans",
  // Kolkata area pages
  "/kolkata/salt-lake",
  "/kolkata/new-town",
  "/kolkata/howrah",
  "/kolkata/park-street",
  "/kolkata/dum-dum",
  "/kolkata/ballygunge",
  "/kolkata/gariahat",
  "/kolkata/jadavpur",
  "/kolkata/tollygunge",
  "/kolkata/esplanade",
  "/kolkata/barasat",
  "/kolkata/behala",
  // Blog posts
  "/blog/complete-guide-cab-service-kolkata",
  "/blog/kolkata-to-darjeeling-road-trip-guide",
  "/blog/kolkata-airport-cab-service-guide",
  "/blog/best-weekend-trips-from-kolkata",
  "/blog/kolkata-to-puri-cab-jagannath-temple",
  // Sitemaps
  "/sitemap_index.xml",
];

async function submitToIndexNow(urls: string[], indexNowKey: string, domain: string) {
  const fullUrls = urls.map((u) => (u.startsWith("http") ? u : `${domain}${u}`));
  const results: { engine: string; status: string; error?: string }[] = [];

  const engines = [
    { name: "Bing", url: "https://www.bing.com/indexnow" },
    { name: "Yandex", url: "https://yandex.com/indexnow" },
  ];

  for (const engine of engines) {
    try {
      const response = await fetch(engine.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: new URL(domain).hostname,
          key: indexNowKey,
          keyLocation: `${domain}/${indexNowKey}.txt`,
          urlList: fullUrls.slice(0, 10000),
        }),
      });
      results.push({
        engine: engine.name,
        status: response.ok ? "success" : `error-${response.status}`,
      });
    } catch (error) {
      results.push({ engine: engine.name, status: "failed", error: String(error) });
    }
  }

  // Also ping Google sitemap
  try {
    const googlePing = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${domain}/sitemap_index.xml`)}`,
      { method: "GET" }
    );
    results.push({
      engine: "Google Sitemap Ping",
      status: googlePing.ok ? "success" : `error-${googlePing.status}`,
    });
  } catch (error) {
    results.push({ engine: "Google Sitemap Ping", status: "failed", error: String(error) });
  }

  return results;
}

/** Authenticate request using the x-api-key header. */
function isAuthorized(req: Request): boolean {
  const providedKey = req.headers.get("x-api-key");
  const expectedKey = (process.env.INDEXNOW_ADMIN_KEY || "").trim();
  return expectedKey.length > 0 && providedKey === expectedKey;
}

export default async function handler(req: Request, _context: Context) {
  const INDEXNOW_KEY = (process.env.INDEXNOW_API_KEY || "").trim();
  const DOMAIN = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "").trim();

  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!INDEXNOW_KEY) {
    console.error("INDEXNOW_API_KEY env variable is not set!");
    return new Response(JSON.stringify({ error: "IndexNow service not configured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!DOMAIN) {
    return new Response(JSON.stringify({ error: "NEXT_PUBLIC_SITE_URL env variable is not set." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "GET") {
    const results = await submitToIndexNow(PRIORITY_URLS, INDEXNOW_KEY, DOMAIN);
    return new Response(
      JSON.stringify({
        message: `Submitted ${PRIORITY_URLS.length} URLs to search engines`,
        submitted: PRIORITY_URLS.length,
        results,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  if (req.method === "POST") {
    try {
      const body = (await req.json()) as { urls?: string[] };
      const urls = body.urls || PRIORITY_URLS;
      const results = await submitToIndexNow(urls, INDEXNOW_KEY, DOMAIN);
      return new Response(
        JSON.stringify({
          message: `Submitted ${urls.length} URLs to search engines`,
          submitted: urls.length,
          results,
          timestamp: new Date().toISOString(),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}

export const config = {
  path: "/api/indexnow",
};
