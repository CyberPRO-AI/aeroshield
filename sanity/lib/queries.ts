import { client } from './client'
import { imgUrl } from './image'

// ─── Config guard ────────────────────────────────────────────────────────────
// Static-first, CMS-optional: every getter below falls back to the real
// migrated copy (not placeholders) so the site renders correctly even before
// Sanity is configured/seeded, and merges field-by-field so a partially-filled
// document in Studio doesn't blank out the rest of the section.

const CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_new_sanity_project_id_here'
)

async function fetchSingleton<T>(type: string): Promise<T | null> {
  if (!CONFIGURED) return null
  return client.fetch<T | null>(`*[_type=="${type}" && _id=="${type}"][0]`)
}

// ─── Shared types ────────────────────────────────────────────────────────────

export type TextSegment = { text: string; modifier: 'default' | 'accent' }
export type CapabilityItem = { icon: string; title: string; description: string }

// ─── siteSettings ────────────────────────────────────────────────────────────

export async function getSiteSettingsData() {
  const d = await fetchSingleton<any>('siteSettings')
  return {
    logo: imgUrl(d?.logo, '/images/logo.svg'),
    navCtaLabel: d?.navCtaLabel ?? 'Request briefing',
    contactEmail: d?.contactEmail ?? 'info@aeroshieldsys.com',
    contactWebsite: d?.contactWebsite ?? 'www.aeroshieldsys.com',
    contactWebsiteUrl: d?.contactWebsiteUrl ?? 'https://www.aeroshieldsys.com',
    gaMeasurementId: d?.gaMeasurementId ?? 'G-0QQTPS0590',
    footerTagline: d?.footerTagline ?? 'Intelligence · Homeland Security · Defense',
    footerCopyright: d?.footerCopyright ?? '© AeroShield. All rights reserved.',
    metaTitle: d?.metaTitle ?? 'AeroShield — Defense, Intelligence & Homeland Security',
    metaDescription:
      d?.metaDescription ??
      'Protecting nations. Enabling decision-makers. Strengthening what matters most. Mission-critical solutions spanning intelligence, command and control, electronic warfare, counter-UAS, secure communications and critical infrastructure protection.',
    ogImage: imgUrl(d?.ogImage, '/images/hero-bg.jpg'),
  }
}

// ─── hero ─────────────────────────────────────────────────────────────────────

const HERO_HEADING_DEFAULT: TextSegment[] = [
  { text: 'Advancing national security through ', modifier: 'default' },
  { text: 'intelligence & HLS', modifier: 'accent' },
]

export async function getHeroData() {
  const d = await fetchSingleton<any>('hero')
  return {
    eyebrowText: d?.eyebrowText ?? 'Intelligence · Homeland Security · Defense',
    heading: (d?.heading as TextSegment[]) ?? HERO_HEADING_DEFAULT,
    subheading:
      d?.subheading ??
      'Protecting nations. Enabling decision-makers. Strengthening what matters most. Mission-critical solutions spanning intelligence, command and control, electronic warfare, counter-UAS, secure communications and critical infrastructure protection.',
    primaryCtaLabel: d?.primaryCtaLabel ?? 'Request a briefing',
    secondaryCtaLabel: d?.secondaryCtaLabel ?? 'Our capabilities',
    backgroundImage: imgUrl(d?.backgroundImage, '/images/hero-bg.jpg'),
  }
}

// ─── whoWeAre ─────────────────────────────────────────────────────────────────

export async function getWhoWeAreData() {
  const d = await fetchSingleton<any>('whoWeAre')
  return {
    navLabel: d?.navLabel ?? 'Who we are',
    eyebrowLabel: d?.eyebrowLabel ?? 'Who we are',
    heading: d?.heading ?? 'AeroShield - Defense & HLS Ecosystems',
    bodyParagraphs: (d?.bodyParagraphs as string[]) ?? [
      'We deliver mission-critical solutions to governments, defense organizations, law enforcement agencies, and critical infrastructure operators. Combining operational expertise, advanced technologies, and global partnerships, we design, integrate, and support end-to-end security ecosystems that strengthen national resilience, situational awareness, and operational readiness.',
      'Our portfolio spans intelligence platforms and analysis, command and control, electronic warfare, counter-UAS, secure communications, critical infrastructure protection, and capacity building to support agencies at every level.',
    ],
    highlightQuote:
      d?.highlightQuote ??
      'Led by a strategic core of former senior officers and global national security experts, AeroShield combines deep operational insight with market-driven adaptability.',
    image: imgUrl(d?.image, '/images/who-we-are.webp'),
    imageAlt: d?.image?.alt ?? 'AeroShield global defense network',
  }
}

// ─── domains ──────────────────────────────────────────────────────────────────

const DOMAINS_ITEMS_DEFAULT = [
  {
    icon: '/images/cap-icons/domain-defense.svg',
    title: 'Defense Solutions',
    description: 'Supporting defense forces with mission-ready capabilities, advanced systems, and operational support for complex environments.',
    anchorHref: '#defense-solutions',
  },
  {
    icon: '/images/cap-icons/domain-hls.svg',
    title: 'Homeland Security',
    description: 'Comprehensive, integrated solutions to help prevent, detect, and respond to threats across the homeland. We help governments build resilient and sustainable national security capabilities.',
    anchorHref: '#homeland-security',
  },
  {
    icon: '/images/cap-icons/domain-intelligence.svg',
    title: 'Intelligence Solutions',
    description: 'Strategic, operational, and tactical intelligence capabilities including fusion platforms, WEBINT, GEOINT, analytics, and investigation systems.',
    anchorHref: '#intelligence-solutions',
  },
]

export async function getDomainsData() {
  const d = await fetchSingleton<any>('domains')
  return {
    navLabel: d?.navLabel ?? 'Domains',
    eyebrowLabel: d?.eyebrowLabel ?? 'Security domains',
    heading: d?.heading ?? 'Capabilities Across Security Domains',
    introText: d?.introText ?? 'Three integrated pillars of capability spanning the full spectrum of national security operations.',
    backgroundImage: imgUrl(d?.backgroundImage, '/images/domains-bg.webp'),
    items:
      (d?.items as any[])?.map((item) => ({
        icon: imgUrl(item.icon, '/images/cap-icons/domain-defense.svg'),
        title: item.title,
        description: item.description,
        anchorHref: item.anchorHref,
      })) ?? DOMAINS_ITEMS_DEFAULT,
  }
}

// ─── capabilities ─────────────────────────────────────────────────────────────

const CAPABILITY_GROUPS_DEFAULT = [
  {
    label: 'Defense Solutions',
    description: 'Mission-ready capabilities, advanced systems, and operational support for complex defense environments.',
    anchorId: 'defense-solutions',
    items: [
      { icon: '/images/cap-icons/isr-systems.svg', title: 'ISR Systems', description: 'Intelligence, surveillance, and reconnaissance systems for persistent situational awareness.' },
      { icon: '/images/cap-icons/tactical-command-posts.svg', title: 'Tactical Command Posts', description: 'Deployable and mobile command posts for tactical operations.' },
      { icon: '/images/cap-icons/c-uas.svg', title: 'C-UAS', description: 'Counter-UAS solutions for detection, tracking, identification, and neutralization of hostile drones and swarms.' },
      { icon: '/images/cap-icons/battlefield-communications.svg', title: 'Battlefield Communications', description: 'Secure, resilient, and interoperable communications for deployed forces.' },
      { icon: '/images/cap-icons/defense-electronic-warfare.svg', title: 'Electronic Warfare', description: 'EW systems for spectrum awareness, electronic protection, and defensive operational support.' },
      { icon: '/images/cap-icons/c-rcied.svg', title: 'C-RCIED', description: 'Counter-RCIED solutions for detection, disruption, and neutralization of IED threats and explosive hazards.' },
    ],
  },
  {
    label: 'HLS Solutions',
    description: 'Integrated solutions to help prevent, detect, and respond to threats across the homeland.',
    anchorId: 'homeland-security',
    items: [
      { icon: '/images/cap-icons/national-command-control.svg', title: 'National Command & Control', description: 'C4I, SOC, EOC, and mobile command centers for unified national operations.' },
      { icon: '/images/cap-icons/hls-counter-uas.svg', title: 'Counter-UAS & Electronic Warfare', description: 'Detection, tracking, and neutralization of drones and advanced EW capabilities.' },
      { icon: '/images/cap-icons/secure-communications.svg', title: 'Secure Communications', description: 'Encrypted communications, radio systems, RCIED jammers, and solutions for mission-critical environments.' },
      { icon: '/images/cap-icons/border-security.svg', title: 'Border Security', description: 'Integrated border surveillance, monitoring, and threat detection systems.' },
      { icon: '/images/cap-icons/critical-infrastructure.svg', title: 'Critical Infrastructure Protection', description: 'Protection of airports, energy, transportation, and other critical infrastructure assets.' },
      { icon: '/images/cap-icons/integrated-security.svg', title: 'Integrated Security Operations', description: 'Holistic planning, integration, detection, and response for national-level security.' },
    ],
  },
  {
    label: 'Intelligence Solutions',
    description: 'Strategic, operational, and tactical intelligence capabilities for decision advantage.',
    anchorId: 'intelligence-solutions',
    items: [
      { icon: '/images/cap-icons/fusion-platforms.svg', title: 'Intelligence Fusion Platforms', description: 'Unified platforms integrating multiple intelligence sources for comprehensive situational awareness.' },
      { icon: '/images/cap-icons/ai-analytics.svg', title: 'AI Analytics & Investigations', description: 'AI-powered analytics for pattern detection, link analysis, threat assessment, and advanced investigations.' },
      { icon: '/images/cap-icons/tactical-intelligence.svg', title: 'Tactical Intelligence Systems', description: 'Advanced intelligence-support systems for tactical and real-time operational environments.' },
      { icon: '/images/cap-icons/osint.svg', title: 'OSINT / WEBINT Monitoring', description: 'Advanced open-source and web intelligence monitoring, analysis, and operational insight.' },
      { icon: '/images/cap-icons/maritime-intelligence.svg', title: 'Maritime Intelligence Platforms', description: 'Comprehensive maritime domain awareness, vessel tracking, risk analysis, and threat monitoring across global waterways.' },
      { icon: '/images/cap-icons/national-centers.svg', title: 'National Intelligence Centers', description: 'Design, integration, and support for national-level intelligence centers and operations.' },
    ],
  },
]

export async function getCapabilitiesData() {
  const d = await fetchSingleton<any>('capabilities')
  return {
    navLabel: d?.navLabel ?? 'Capabilities',
    eyebrowLabel: d?.eyebrowLabel ?? 'Capabilities',
    heading: d?.heading ?? 'Full-Spectrum Capabilities',
    introText: d?.introText ?? 'Capability areas across three security domains, each backed by operational expertise and purpose-built systems.',
    groups:
      (d?.groups as any[])?.map((g) => ({
        label: g.label,
        description: g.description,
        anchorId: g.anchorId,
        items: g.items.map((item: any) => ({
          icon: imgUrl(item.icon, '/images/cap-icons/isr-systems.svg'),
          title: item.title,
          description: item.description,
        })),
      })) ?? CAPABILITY_GROUPS_DEFAULT,
  }
}

// ─── approach ─────────────────────────────────────────────────────────────────

const APPROACH_STEPS_DEFAULT = [
  { photo: '/images/photos/deliver-assess.webp', title: 'Assess', description: 'Comprehensive threat and capability assessment. We map the operational environment, identify gaps and define requirements aligned to your security posture.' },
  { photo: '/images/photos/deliver-architect.webp', title: 'Architect', description: 'Solution design integrating the right capabilities across domains. Every architecture is tailored. No off-the-shelf templates, no unnecessary complexity.' },
  { photo: '/images/photos/deliver-deploy.webp', title: 'Deploy', description: 'Full installation, configuration and integration. Our teams handle infrastructure, software deployment, network configuration and system hardening on-site.' },
  { photo: '/images/photos/deliver-sustain.webp', title: 'Sustain', description: 'Ongoing support, training delivery and operational handover. We transfer knowledge and capability so your teams operate with full autonomy.' },
]

const STATS_DEFAULT = [
  { targetValue: 5, suffix: '', label: 'Continents with active operations and partner networks' },
  { targetValue: 20, suffix: '+', label: 'Partner nations across defense, intelligence and enterprise sectors' },
  { targetValue: 200, suffix: '+', label: 'Cybersecurity and defense professionals worldwide' },
  { targetValue: 3, suffix: '', label: 'Core security domains: Intelligence, Homeland Security, Defense' },
]

export async function getApproachData() {
  const d = await fetchSingleton<any>('approach')
  return {
    navLabel: d?.navLabel ?? 'Approach',
    eyebrowLabel: d?.eyebrowLabel ?? 'How we deliver',
    heading: d?.heading ?? 'From Requirement to Operation',
    introText: d?.introText ?? 'Every engagement follows a structured methodology: scoping the threat landscape, designing the architecture, deploying the systems and sustaining the operation.',
    steps:
      (d?.steps as any[])?.map((s) => ({
        title: s.title,
        description: s.description,
        photo: imgUrl(s.photo, '/images/photos/deliver-assess.webp'),
      })) ?? APPROACH_STEPS_DEFAULT,
    globalReachEyebrow: d?.globalReachEyebrow ?? 'Global reach',
    stats: (d?.stats as any[]) ?? STATS_DEFAULT,
    globalReachMap: '/images/global-reach-map.png',
  }
}

// ─── values ───────────────────────────────────────────────────────────────────

const VALUES_LEFT_DEFAULT = [
  { icon: '/images/cap-icons/value-innovation.svg', title: 'Innovation', description: 'Every solution is engineered from first principles. We combine emerging technologies with deep domain expertise to solve problems others work around.' },
  { icon: '/images/cap-icons/value-integration.svg', title: 'Integration', description: 'Technologies that work together, not in silos. Every platform in the ecosystem is designed to interoperate, sharing data, context and operational intelligence.' },
]

const VALUES_RIGHT_DEFAULT = [
  { icon: '/images/cap-icons/value-sovereignty.svg', title: 'Sovereignty', description: 'Security infrastructure must be owned, not rented. We design systems that give operators full control. No vendor lock-in, no foreign dependencies on critical assets.' },
  { icon: '/images/cap-icons/value-people-first.svg', title: 'People First', description: 'Trained personnel are the most important element of any security ecosystem. Technology enables; people protect. Every engagement includes knowledge transfer.' },
]

export async function getValuesData() {
  const d = await fetchSingleton<any>('values')
  const mapItems = (items: any[], fallback: CapabilityItem[]) =>
    items?.map((item) => ({ icon: imgUrl(item.icon, fallback[0].icon), title: item.title, description: item.description })) ?? fallback

  return {
    eyebrowLabel: d?.eyebrowLabel ?? 'Values',
    heading: d?.heading ?? 'Built on First Principles',
    introText: d?.introText ?? 'AeroShield is a defense and homeland security ecosystem, coordinating proprietary technologies, global partners and field expertise to deliver sovereign-grade security.',
    left: mapItems(d?.left, VALUES_LEFT_DEFAULT),
    right: mapItems(d?.right, VALUES_RIGHT_DEFAULT),
    circleBgImage: '/images/values-circle-bg.svg',
    centerImage: imgUrl(d?.centerImage, '/images/values-center.webp'),
  }
}

// ─── contact ──────────────────────────────────────────────────────────────────

export async function getContactData() {
  const d = await fetchSingleton<any>('contact')
  return {
    eyebrowLabel: d?.eyebrowLabel ?? 'Get in touch',
    heading: d?.heading ?? 'Advance your national security capability',
    introText: d?.introText ?? 'Get in touch with our team to discuss how we can support your objectives. We look forward to hearing from you.',
    backgroundImage: imgUrl(d?.backgroundImage, '/images/contact-bg.png'),
    successMessage: d?.successMessage ?? 'Request received. Our team will contact you shortly.',
    errorMessage: d?.errorMessage ?? 'Submission failed. Please retry, or write to',
  }
}
