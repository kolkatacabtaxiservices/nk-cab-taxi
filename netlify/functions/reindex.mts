/**
 * netlify/functions/reindex.mts
 *
 * Netlify Function — replaces functions/api/reindex.ts (Cloudflare Pages Function)
 *
 * POST /api/reindex — submit specific URLs to IndexNow (authenticated)
 * Header: x-api-key: <REINDEX_API_KEY>
 * Body: { "urls": ["/routes/kolkata-to-ranchi", ...] }
 *
 * Security:
 *  - INDEXNOW_API_KEY env var is required (no hard-coded fallback).
 *  - SSRF fix: URLs are validated to belong to own domain before forwarding.
 *  - Domain read from NEXT_PUBLIC_SITE_URL env var.
 */

import type { Context } from "@netlify/functions";

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

export default async function handler(req: Request, _context: Context) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Authenticate
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== (process.env.REINDEX_API_KEY || "").trim()) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const INDEXNOW_KEY = (process.env.INDEXNOW_API_KEY || "").trim();
  if (!INDEXNOW_KEY) {
    console.error("INDEXNOW_API_KEY env variable is not set!");
    return new Response(JSON.stringify({ error: "IndexNow service not configured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const DOMAIN = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "").trim();
  if (!DOMAIN) {
    return new Response(JSON.stringify({ error: "NEXT_PUBLIC_SITE_URL env variable is not set." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as { urls?: string[] };
    const urls: string[] = body.urls || [];

    if (urls.length === 0) {
      return new Response(JSON.stringify({ error: "No URLs provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert relative URLs to absolute
    const absoluteUrls = urls.map((url) =>
      url.startsWith("http") ? url : `${DOMAIN}${url.startsWith("/") ? "" : "/"}${url}`
    );

    // SSRF fix: Only forward URLs that belong to our own domain
    const ownDomainUrls = absoluteUrls.filter((url) => url.startsWith(DOMAIN));
    const rejectedCount = absoluteUrls.length - ownDomainUrls.length;

    if (ownDomainUrls.length === 0) {
      return new Response(
        JSON.stringify({ error: "All provided URLs were rejected — only own-domain URLs are allowed." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Ping all IndexNow endpoints in parallel
    const results = await Promise.allSettled(
      INDEXNOW_ENDPOINTS.map(async (endpoint) => {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

    // Also ping Google's sitemap
    const googlePing = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${DOMAIN}/sitemap_index.xml`)}`,
      { method: "GET" }
    ).catch(() => null);

    return new Response(
      JSON.stringify({
        success: true,
        urlsSubmitted: ownDomainUrls.length,
        urlsRejected: rejectedCount,
        urls: ownDomainUrls,
        indexNowResults: results.map((r) =>
          r.status === "fulfilled" ? r.value : { error: (r.reason as Error)?.message }
        ),
        googleSitemapPing: googlePing ? googlePing.status : "failed",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to submit URLs", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const config = {
  path: "/api/reindex",
};
