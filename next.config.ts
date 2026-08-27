import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Static Export for Netlify ───────────────────────────────────────────────────
  // Generates ./out/ directory with pure static HTML — served directly by
  // Netlify's CDN with zero server overhead.
  output: "export",

  // Fixed deployment ID — keeps the buildId stable across rebuilds.
  // Without this, every `next build` generates a new random buildId.
  deploymentId: "nk-cab-taxi-v1",

  // Ensure consistent URLs — no trailing slashes
  trailingSlash: false,

  // `sharp` is NOT supported in the Cloudflare Pages build environment.
  // Use unoptimized: true so Next.js skips server-side image processing.
  images: {
    unoptimized: true,
    // Retain device/image sizes for <Image> sizing hints (no actual transform occurs)
    deviceSizes: [390, 640, 750, 1080, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
  },

  poweredByHeader: false,

  // ── Strip legacy JS polyfills — SWC targets modern browsers only ──
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // NOTE: Headers and redirects below are for local `next dev` development only.
  // In production (Netlify), these are handled by public/_headers
  // and public/_redirects files which are processed by Netlify's CDN layer.
  // Keep them here so local development works correctly.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value:
              "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          // FIX #12: X-XSS-Protection removed — deprecated header, CSP handles XSS now
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            // FIX #13: Added frame-ancestors 'self' — modern clickjacking protection.
            // FIX #14: Removed unsafe-eval — not required by Next.js/React 19 in production.
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://wa.me; frame-src https://www.google.com https://maps.google.com https://maps.googleapis.com https://www.googletagmanager.com; frame-ancestors 'self';",
          },
          { key: "Content-Language", value: "en-IN" },
        ],
      },
      {
        // Long-lived cache for immutable static assets
        source: "/:path*.:ext(js|css|woff2|webp|avif|png|jpg|jpeg|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // 7 days CDN cache (was 30 days) — allows faster re-crawl after updates
        source: "/routes/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, s-maxage=604800, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // 7 days CDN cache (was 30 days) — faster re-crawl for Google
        source: "/:state/:city(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, s-maxage=604800, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // Noindex headers for stub/removed state paths
      {
        source: "/delhi-ncr/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/uttarakhand/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/madhya-pradesh/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async redirects() {
    return [
      // NOTE: These redirects are for local `next dev` only.
      // In production (Netlify), redirects live in public/_redirects
      // which are processed by Netlify's CDN layer at the edge.
      // Redirect /route/xxx to /routes/xxx (common typo)
      {
        source: "/route/:path*",
        destination: "/routes/:path*",
        permanent: true,
      },
      // Redirect /service/xxx to /services/xxx (common typo)
      {
        source: "/service/:path*",
        destination: "/services/:path*",
        permanent: true,
      },
      // Duplicate page consolidation — Salt Lake & New Town
      {
        source: "/west-bengal/salt-lake-kolkata",
        destination: "/kolkata/salt-lake",
        permanent: true,
      },
      {
        source: "/west-bengal/salt-lake-kolkata/:path*",
        destination: "/kolkata/salt-lake",
        permanent: true,
      },
      {
        source: "/west-bengal/new-town-kolkata",
        destination: "/kolkata/new-town",
        permanent: true,
      },
      {
        source: "/west-bengal/new-town-kolkata/:path*",
        destination: "/kolkata/new-town",
        permanent: true,
      },
      // Two-Way → Round Trip
      {
        source: "/services/two-way",
        destination: "/services/round-trip",
        permanent: true,
      },
      {
        source: "/:state/:city/two-way",
        destination: "/:state/:city/round-trip",
        permanent: true,
      },
      // Duplicate route pages → dedicated hand-built landing pages (canonical).
      // Production parity lives in public/_redirects (Cloudflare CDN).
      {
        source: "/routes/kolkata-to-jamshedpur",
        destination: "/kolkata-to-jamshedpur-cab",
        permanent: true,
      },
      {
        source: "/routes/kolkata-to-jamshedpur/:path*",
        destination: "/kolkata-to-jamshedpur-cab",
        permanent: true,
      },
      {
        source: "/routes/jamshedpur-to-kolkata",
        destination: "/jamshedpur-to-kolkata-cab",
        permanent: true,
      },
      {
        source: "/routes/jamshedpur-to-kolkata/:path*",
        destination: "/jamshedpur-to-kolkata-cab",
        permanent: true,
      },
      // Delhi-NCR, Uttarakhand, MP remain redirected (no content yet)
      { source: "/delhi-ncr", destination: "/", permanent: true },
      { source: "/delhi-ncr/:path*", destination: "/", permanent: true },
      { source: "/uttarakhand", destination: "/", permanent: true },
      { source: "/uttarakhand/:path*", destination: "/", permanent: true },
      { source: "/madhya-pradesh", destination: "/", permanent: true },
      { source: "/madhya-pradesh/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
