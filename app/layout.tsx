import type { Metadata } from 'next'
import { Oswald, Urbanist, IBM_Plex_Mono } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.scss'
import { getSiteSettingsData } from '@/sanity/lib/queries'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { StickyStack } from '@/components/ui/StickyStack'

const oswald = Oswald({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-oswald', display: 'swap' })
const urbanist = Urbanist({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-urbanist', display: 'swap' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', display: 'swap' })

const SITE_URL = 'https://www.aeroshieldsys.com'

// Sanity's CDN URLs (cdn.sanity.io/...) are already absolute; the static
// fallback paths (/images/...) are not — this normalizes either into a full
// URL, which social-media crawlers and JSON-LD both require.
function absoluteUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl}`
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsData()
  const { metaTitle: title, metaDescription: description } = settings
  const ogImage = absoluteUrl(settings.ogImage)

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: '%s | AeroShield' },
    description,
    keywords: [
      'defense solutions', 'homeland security', 'intelligence platforms', 'counter-UAS',
      'electronic warfare', 'secure communications', 'critical infrastructure protection', 'AeroShield',
    ],
    authors: [{ name: 'AeroShield', url: SITE_URL }],
    creator: 'AeroShield',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'AeroShield',
      url: SITE_URL,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: SITE_URL },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettingsData()

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AeroShield',
    url: SITE_URL,
    logo: absoluteUrl(settings.logo),
    email: settings.contactEmail,
    sameAs: [],
  }

  return (
    <html lang="en" className={`${oswald.variable} ${urbanist.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main-content" className="as-skip-link">
          Skip to content
        </a>
        {children}
        <ScrollReveal />
        <StickyStack />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {settings.gaMeasurementId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${settings.gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
