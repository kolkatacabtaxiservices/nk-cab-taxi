/**
 * netlify/functions/booking.mts
 *
 * Netlify Function — replaces functions/api/booking.ts (Cloudflare Pages Function)
 *
 * POST /api/booking → this file handles booking form submissions
 *
 * Security features (same as CF version):
 *  - In-memory IP-based rate limiting (max 5 requests per IP per 60s window).
 *  - Input length validation on all user-supplied fields.
 *  - Phone validation: strips non-digits, enforces 10–13 digit range.
 *
 * Netlify Functions use Node.js runtime — no Cloudflare Workers APIs.
 * CORS headers added so the static site can POST to this endpoint.
 */

import type { Context } from "@netlify/functions";

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
// In-memory rate limiter
// Netlify Functions are stateless per invocation — this Map resets
// on each cold start. For production distributed rate limiting,
// add Netlify Edge Middleware or use an external KV store.
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
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// ─────────────────────────────────────────────────────────────────
// Input length limits
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

// ─────────────────────────────────────────────────────────────────
// CORS headers — allow the static site to call this function
// ─────────────────────────────────────────────────────────────────
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_SITE_URL || "https://www.nkcabtaxi.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req: Request, context: Context) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Method Not Allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    // Rate limiting — get client IP from Netlify context or standard header
    const clientIp =
      context.ip ||
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      "unknown";

    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ success: false, error: "Too many requests. Please wait a minute before trying again." }),
        {
          status: 429,
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
          },
        }
      );
    }

    let body: BookingBody;
    try {
      body = (await req.json()) as BookingBody;
    } catch {
      return new Response(JSON.stringify({ success: false, error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Input length validation
    const lengthError = exceedsMaxLength(body);
    if (lengthError) {
      return new Response(JSON.stringify({ success: false, error: lengthError }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const { tripType, from, to, date, carType, name, phone } = body;

    // Validate required fields
    if (!from || !date || !name || !phone) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        }
      );
    }

    // Phone validation — strip non-digits, require 10–13 digits (Indian numbers)
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 13) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Enter a valid 10-digit Indian mobile number (with or without +91).",
        }),
        {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        }
      );
    }

    const GOOGLE_SCRIPT_URL = (process.env.GOOGLE_SCRIPT_URL || "").replace(/[\r\n]/g, "").trim();

    if (!GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SCRIPT_URL env variable is not set!");
      return new Response(
        JSON.stringify({ success: false, error: "Booking service not configured. Please call us directly." }),
        {
          status: 500,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        }
      );
    }

    const bookingPayload = {
      tripType: tripType || "One-Way",
      pickupCity: from,
      dropCity: to || "N/A",
      travelDate: date,
      carType: carType || "Sedan",
      name,
      phone,
      timestamp: new Date().toISOString(),
      source: "website",
    };

    try {
      const controller = new AbortController();
      // 25s timeout — accounts for Google Apps Script latency
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
        redirect: "follow", // Google Apps Script uses 302 redirect — must follow
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const resText = await response.text().catch(() => "");
        console.log("Booking sent to Google Sheets. Status:", response.status, "| Response:", resText.substring(0, 200));
        return new Response(
          JSON.stringify({
            success: true,
            message: "Booking submitted successfully! We will call you shortly.",
          }),
          { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      } else {
        const errText = await response.text().catch(() => "unknown");
        console.error("Google Script HTTP error:", response.status, errText.substring(0, 300));
        return new Response(
          JSON.stringify({ success: false, error: "Unable to submit booking. Please call us directly." }),
          { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        console.error("Google Script timed out after 25s");
        return new Response(
          JSON.stringify({ success: false, error: "Request timed out. Please call us at +919883619471." }),
          { status: 504, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      }
      console.error("Google Script fetch error:", err);
      return new Response(
        JSON.stringify({ success: false, error: "Unable to submit booking. Please call us directly." }),
        { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Booking API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error. Please try again." }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
}

export const config = {
  path: "/api/booking",
};
