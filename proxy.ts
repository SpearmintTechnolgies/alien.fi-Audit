import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const csp = `
    default-src 'self';

    script-src
      'self'
      'unsafe-inline'
      'unsafe-eval'
      https://*.google.com
      https://*.googleapis.com;

    style-src
      'self'
      'unsafe-inline'
      https://fonts.googleapis.com;

    img-src
      'self'
      data:
      blob:
      https:;

    font-src
      'self'
      data:
      https://fonts.gstatic.com;

    connect-src
      'self'
      https://generativelanguage.googleapis.com
      https://api.openai.com
      https://*.googleapis.com;

    frame-ancestors
      https://alien-fi-ebon.vercel.app;

    frame-src
      'self';

    object-src 'none';

    base-uri 'self';

    form-action 'self';

    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  response.headers.set("Content-Security-Policy", csp);

  // DO NOT SET X-Frame-Options
  // It overrides iframe support and will block embedding.

  response.headers.set("X-Content-Type-Options", "nosniff");

  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // Legacy browsers only
  response.headers.set("X-XSS-Protection", "1; mode=block");

  response.headers.set(
    "Permissions-Policy",
    [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()"
    ].join(", ")
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};