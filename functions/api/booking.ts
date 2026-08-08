/**
 * functions/api/booking.ts
 *
 * Cloudflare Pages Function — replaces src/app/api/booking/route.ts
 *
 * This runs on Cloudflare Workers runtime ONLY when a booking form is submitted.
 * Static pages never touch this function — they are served directly from CDN.
 *
 * Cloudflare Pages Functions automatically handle routing:
 * POST /api/booking → this file's onRequestPost handler
 *
 * Security fixes applied:
 *  - In-memory IP-based rate limiting (max 5 requests per IP per 60s window).
 *  - Input length validation on all user-supplied fields.
 *  - Aligned phone validation: strips non-digits, enforces 10–13 digit range.
 */

interface Env {
  GOOGLE_SCRIPT_URL?: string;
}

interface BookingBody {
  tripType?: string;
  from?: string;
  to?: string;
  date?: string;
  carType?: string;
  name?: string;
  phone?: string;
}

// ─────────────────────────────────────────────────────────────────
// FIX #5: In-memory rate limiter
// Cloudflare Workers are single-threaded per isolate — this Map
// persists across requests within the same isolate lifetime.
// For a true distributed rate limit, use Cloudflare Rate Limiting
// rules in the Dashboard (free plan: 1 rule).
// ─────────────────────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60_000; // 60 seconds
const RATE_LIMIT_MAX = 5;            // max 5 requests per IP per window

interface RateEntry {
  count: number;
  windowStart: number;
}

const rateLimitMap = new Map<string, RateEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    // Start a fresh window
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

// ─────────────────────────────────────────────────────────────────
// FIX #8: Input length limits
// ─────────────────────────────────────────────────────────────────
const MAX_LENGTHS: Record<string, number> = {
  tripType: 30,
  from: 150,
  to: 150,
  date: 20,
  carType: 30,
  name: 100,
  phone: 20,
};

function exceedsMaxLength(body: BookingBody): string | null {
  for (const [key, maxLen] of Object.entries(MAX_LENGTHS)) {
    const val = body[key as keyof BookingBody];
    if (val && val.length > maxLen) {
      return `Field '${key}' exceeds maximum length of ${maxLen} characters.`;
    }
  }
  return null;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    // FIX #5: Rate limiting — get client IP from Cloudflare header
    const clientIp =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      'unknown';

    if (isRateLimited(clientIp)) {
      return Response.json(
        { success: false, error: 'Too many requests. Please wait a minute before trying again.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          },
        }
      );
    }

    let body: BookingBody;
    try {
      body = await request.json() as BookingBody;
    } catch {
      return Response.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    // FIX #6: Input length validation before any processing
    const lengthError = exceedsMaxLength(body);
    if (lengthError) {
      return Response.json({ success: false, error: lengthError }, { status: 400 });
    }

    const { tripType, from, to, date, carType, name, phone } = body;

    // Validate required fields
    if (!from || !date || !name || !phone) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // FIX #9: Aligned phone validation — strip non-digits, require 10–13 digits
    // This matches Indian phone formats: 10-digit local, +91 prefix (12 digits),
    // 0-prefix (11 digits), etc.
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 13) {
      return Response.json(
        { success: false, error: 'Enter a valid 10-digit Indian mobile number (with or without +91).' },
        { status: 400 }
      );
    }

    const GOOGLE_SCRIPT_URL = (env.GOOGLE_SCRIPT_URL || '').replace(/[\r\n]/g, '').trim();

    if (!GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SCRIPT_URL env variable is not set!');
      return Response.json(
        { success: false, error: 'Booking service not configured. Please call us directly.' },
        { status: 500 }
      );
    }

    const bookingPayload = {
      tripType: tripType || 'One-Way',
      pickupCity: from,
      dropCity: to || 'N/A',
      travelDate: date,
      carType: carType || 'Sedan',
      name,
      phone,
      timestamp: new Date().toISOString(),
      source: 'website',
    };

    try {
      const controller = new AbortController();
      // 25s timeout — accounts for Google Apps Script latency
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
        redirect: 'follow', // Google Apps Script uses 302 redirect — must follow
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const resText = await response.text().catch(() => '');
        console.log('Booking sent to Google Sheets. Status:', response.status, '| Response:', resText.substring(0, 200));
        return Response.json({
          success: true,
          message: 'Booking submitted successfully! We will call you shortly.',
        });
      } else {
        const errText = await response.text().catch(() => 'unknown');
        console.error('Google Script HTTP error:', response.status, errText.substring(0, 300));
        return Response.json(
          { success: false, error: 'Unable to submit booking. Please call us directly.' },
          { status: 502 }
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.error('Google Script timed out after 25s');
        return Response.json(
          { success: false, error: 'Request timed out. Please call us at +916204811752.' },
          { status: 504 }
        );
      }
      console.error('Google Script fetch error:', err);
      return Response.json(
        { success: false, error: 'Unable to submit booking. Please call us directly.' },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('Booking API error:', error);
    return Response.json(
      { success: false, error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
};
