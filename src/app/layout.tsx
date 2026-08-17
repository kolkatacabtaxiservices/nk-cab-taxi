import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import ScrollToTop from '@/components/ScrollToTop';
import { BUSINESS } from '@/lib/data';
import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebsiteSchema, generateTaxiServiceSchema, generateHowToBookSchema, generateSpeakableSchema } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  // 'swap' shows text immediately in fallback font then swaps to Inter once loaded.
  // This improves FCP and LCP vs 'optional' which can hide text until font arrives.
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  adjustFontFallback: true, // reduces CLS by matching fallback metrics to Inter
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-heading',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.domain),
  title: {
    default: 'NK Cab & Taxi Kolkata | ₹12/km | Airport, Outstation & Local Taxi 24/7',
    template: '%s | NK Cab & Taxi',
  },
  description: `★4.8 NK Cab & Taxi — Best cab service in Kolkata & East India from ₹12/km. Airport taxi Kolkata | Outstation to Darjeeling, Puri, Ranchi, Bhubaneswar | Local 4hr ₹1,800. AC Innova, Ertiga, Sedan. No surge 24/7. Call ${BUSINESS.phone}`,
  // keywords meta tag intentionally removed — Google has ignored it since 2009
  // and a long list signals keyword stuffing. Page-level metadata handles targeting.
  authors: [{ name: BUSINESS.name, url: BUSINESS.domain }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  classification: 'Travel & Transportation',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'NK Cab & Taxi',
    images: [
      {
        url: `${BUSINESS.domain}/navbanner.webp`,
        width: 1200,
        height: 630,
        alt: 'NK Cab & Taxi — Best Cab Service in Kolkata & East India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NK Cab & Taxi Kolkata | ₹12/km | Airport, Outstation, Local Taxi 24/7',
    description: `Best cab service in Kolkata & East India. Airport taxi, outstation to Darjeeling, Puri, Ranchi. AC Innova, Ertiga, Sedan. No surge 24/7. Call ${BUSINESS.phone}`,
    images: [`${BUSINESS.domain}/navbanner.webp`],
  },
  alternates: {
    languages: {
      'en-IN': BUSINESS.domain,
      'x-default': BUSINESS.domain,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // ─── Google Search Console Verification ────────────────────────────────────
  // IMPORTANT: Uncomment and fill in your verification code below to enable
  // meta-tag ownership verification for Google Search Console.
  // To get the code: GSC → Settings → Ownership Verification → HTML Tag method
  // Example: if the tag is <meta name="google-site-verification" content="ABC123" />
  // then set google: 'ABC123'
  //
  // NOTE: The public/b8e4c2a1f3d7e9b0.txt file already provides HTML-file verification.
  // Adding the meta tag below provides a second verification method (belt & suspenders).
  //
  // verification: {
  //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',  // from GSC HTML Tag method
  //   other: { 'msvalidate.01': ['YOUR_BING_VERIFICATION_CODE'] },
  // },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', sizes: '48x48', type: 'image/png' },
      { url: '/logo.png', sizes: '96x96', type: 'image/png' },
      { url: '/logo.png', sizes: '144x144', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  category: 'Travel & Transportation',
  other: {
    'format-detection': 'telephone=yes',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const taxiServiceSchema = generateTaxiServiceSchema();
  const howToBookSchema = generateHowToBookSchema();
  const speakableSchema = generateSpeakableSchema();

  return (
    <html lang="en-IN" dir="ltr" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager — GTM-5VKP87LN */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5VKP87LN');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google Analytics GA4 — Measurement ID: G-X4V31JY158 */}
        <Script
          id="gtag-js"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-X4V31JY158"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X4V31JY158', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `,
          }}
        />
        {/* End Google Analytics */}

        {/* DNS Prefetch — only for resources actually loaded on this page */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://g.page" />
        {/* Uncomment when GA/GTM is enabled: */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* ═══ CRITICAL: Preload LCP hero image ═══
            This eliminates the 2,000ms "Element render delay" in PageSpeed.
            Without this, browser waits for React hydration before discovering the image. */}
        <link rel="preload" as="image" type="image/webp" href="/navbanner.webp" fetchPriority="high" />
        
        {/* Content-Language for SEO */}
        <meta httpEquiv="Content-Language" content="en-IN" />
        {/* hrefLang is handled per-page via Next.js metadata.alternates — not here */}
        
        {/* PWA & Theme */}
        <meta name="theme-color" content="#FF6B00" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NK Cab" />


        
        {/* GMB Integration — update with your GBP link */}
        <link rel="me" href={BUSINESS.gbpLink} />
        <link rel="author" href={BUSINESS.gbpLink} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToBookSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} ${inter.className} font-sans antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) — required fallback for browsers with JS disabled */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5VKP87LN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingButtons />
        <ScrollToTop />
      </body>
    </html>
  );
}
