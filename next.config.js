/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    // Next.js dev mode's Fast Refresh runtime evaluates hot-reloaded module
    // code via eval() — a strict script-src without 'unsafe-eval' silently
    // breaks ALL client-side JS in dev (hydration, StatCounter, ScrollReveal,
    // the contact form, everything), while working fine in a production
    // build (which doesn't eval()). Only relax it outside production.
    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      'www.googletagmanager.com',
      'www.google-analytics.com',
      process.env.NODE_ENV !== 'production' ? "'unsafe-eval'" : '',
    ].filter(Boolean).join(' ')

    return [
      {
        // Excludes /studio: the embedded Sanity Studio needs unsafe-eval and a
        // much broader connect-src (api.sanity.io, realtime websockets) that
        // would otherwise conflict with the strict policy below.
        source: '/((?!studio).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src ${scriptSrc}`,
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' cdn.sanity.io data:",
              "frame-src 'self'",
              "connect-src 'self' https://*.sanity.io https://*.google-analytics.com https://*.analytics.google.com",
              "media-src 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
