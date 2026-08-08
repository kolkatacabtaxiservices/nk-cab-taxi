import type { Metadata } from 'next';
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
    default: 'NK Cab & Taxi Kolkata | ₹12/km | ⭐4.8 | Airport, Outstation, Local Taxi 24/7',
    template: '%s',
  },
  description: `★4.8 NK Cab & Taxi — Best cab service in Kolkata & East India from ₹12/km. Airport taxi Kolkata | Outstation to Darjeeling, Puri, Ranchi, Bhubaneswar | Local 4hr ₹1,800. AC Innova, Ertiga, Sedan. No surge 24/7. Call ${BUSINESS.phone}`,
  keywords: [
    // Brand keywords
    'NK Cab & Taxi', 'NK cab', 'NK taxi', 'nkcabtaxi', 'nk cab service', 'nk taxi kolkata',
    // Kolkata primary
    'cab service in kolkata', 'kolkata taxi service', 'kolkata cab service',
    'kolkata airport cab', 'kolkata airport taxi', 'CCU airport cab',
    'outstation cab kolkata', 'one way cab kolkata', 'local taxi kolkata',
    'book cab kolkata', 'best cab service kolkata', 'kolkata to darjeeling cab',
    'kolkata to puri cab', 'kolkata to digha cab', 'kolkata to siliguri cab',
    // West Bengal cities
    'cab service west bengal', 'howrah cab service', 'siliguri taxi service',
    'darjeeling cab service', 'durgapur cab service', 'asansol taxi service',
    'cab service in bardhaman', 'kharagpur cab service', 'haldia taxi',
    // Jharkhand
    'cab service jharkhand', 'ranchi cab service', 'jamshedpur cab service',
    'dhanbad taxi', 'bokaro cab', 'deoghar taxi service',
    // Odisha
    'bhubaneswar cab service', 'puri taxi service', 'cuttack cab',
    // Service types
    'airport transfer kolkata', 'outstation cab east india', 'one way taxi',
    'no surge cab', 'fixed rate taxi', '24 hour cab service kolkata',
    'wedding car rental kolkata', 'corporate cab kolkata', 'innova cab kolkata',
    'tempo traveller kolkata', 'sedan cab kolkata', 'suv cab kolkata',
  ],
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
  // NOTE: Add your real Google Search Console and Bing Webmaster verification codes here
  // once confirmed. Empty strings are omitted to avoid emitting useless <meta> tags.
  // verification: {
  //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
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
        {/* Google tag (gtag.js) — Replace G-XXXXXXXXXX with your GA4 ID */}
        {/* <Script
          id="gtag-js"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `,
          }}
        /> */}
        {/* End Google tag */}

        {/* DNS Prefetch — only for resources actually loaded on this page */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://g.page" />
        {/* Uncomment when GA/GTM is enabled:
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        */}

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
        {/* noscript fallback — update with your GA4 ID */}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingButtons />
        <ScrollToTop />
      </body>
    </html>
  );
}
