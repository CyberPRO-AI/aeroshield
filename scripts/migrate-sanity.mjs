/**
 * Sanity Migration Script
 * Extracts content + assets from the legacy bundled export (legacy/index.html)
 * and seeds the 8 singleton documents in Sanity.
 *
 * Setup:
 *   1. Add SANITY_API_WRITE_TOKEN (Editor role) to .env.local
 *   2. Run: node --env-file=.env.local scripts/migrate-sanity.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import zlib from 'zlib'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LEGACY_PATH = join(__dirname, '..', 'legacy', 'index.html')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// ─── 1. Parse the bundle's manifest + ext_resources ──────────────────────────

function extractScriptContent(lines, tag) {
  for (let i = 0; i < lines.length; i++) {
    const openTag = `<script type="${tag}">`
    const idx = lines[i].indexOf(openTag)
    if (idx === -1) continue
    const rest = lines[i].slice(idx + openTag.length)
    const candidate = rest.trim() && !rest.trim().startsWith('</script>') ? rest : lines[i + 1]
    return candidate.split('</script>')[0]
  }
  throw new Error(`Could not find <script type="${tag}"> in ${LEGACY_PATH}`)
}

const raw = readFileSync(LEGACY_PATH, 'utf-8')
const lines = raw.split('\n')
const manifest = JSON.parse(extractScriptContent(lines, '__bundler/manifest'))
const extResources = JSON.parse(extractScriptContent(lines, '__bundler/ext_resources'))
const idToUuid = Object.fromEntries(extResources.map((e) => [e.id, e.uuid]))

function decodeAsset(uuid) {
  const entry = manifest[uuid]
  if (!entry) throw new Error(`Asset UUID not found in manifest: ${uuid}`)
  let buffer = Buffer.from(entry.data, 'base64')
  if (entry.compressed) buffer = zlib.gunzipSync(buffer)
  return { buffer, mime: entry.mime }
}

// ─── 2. Upload assets, keyed by a friendly name used when building documents ─

const DIRECT_UUIDS = {
  logo: 'f411cedd-2415-46bd-b195-049ed06cd198',
  heroBg: '6851c9c0-eac4-4fbf-83dd-7ccbd362c7a7',
  whoWeAreImage: 'cd7db752-eb09-4afb-aa23-4d73c9c2739d',
  domainsBg: 'd10c0b19-fd23-419c-ad31-10034a397866',
  valuesCircleBg: '759937b6-9601-48db-9585-a43efe4218ba',
  valuesCenterImage: 'a544a7a7-3226-4145-8f48-eca03a20ff45',
  contactBg: 'f3fe6309-afe5-4e7f-9345-c66d0cad4afb',
}

const EXT_EXT = { 'image/svg+xml': 'svg', 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' }

const uploaded = {}
let uploadCount = 0
let uploadFailures = 0

async function uploadAsset(key, uuid, filenameHint) {
  try {
    const { buffer, mime } = decodeAsset(uuid)
    const filename = `${filenameHint}.${EXT_EXT[mime] ?? 'bin'}`
    const asset = await client.assets.upload('image', buffer, { filename, contentType: mime })
    uploaded[key] = asset._id
    uploadCount++
  } catch (err) {
    console.error(`  ✗ Failed to upload ${key} (${uuid}):`, err.message)
    uploadFailures++
  }
}

function imageRef(assetKey) {
  const id = uploaded[assetKey]
  if (!id) return undefined
  return { _type: 'image', asset: { _type: 'reference', _ref: id } }
}

async function uploadAllAssets() {
  console.log('Uploading assets to Sanity...')

  for (const [key, uuid] of Object.entries(DIRECT_UUIDS)) {
    await uploadAsset(key, uuid, key)
  }

  for (const [id, uuid] of Object.entries(idToUuid)) {
    if (id.startsWith('assets-cap-icons-')) {
      const name = id.slice('assets-cap-icons-'.length, -'-svg'.length)
      await uploadAsset(`icon:${name}`, uuid, name)
    } else if (id.startsWith('assets-photos-')) {
      const name = id.slice('assets-photos-'.length, -'-webp'.length)
      await uploadAsset(`photo:${name}`, uuid, name)
    }
  }

  console.log(`Uploaded ${uploadCount} assets (${uploadFailures} failures).\n`)
}

// ─── 3. Build documents (same real copy as sanity/lib/queries.ts fallbacks) ──

function capabilityItem(iconKey, title, description) {
  return { _type: 'capabilityItem', icon: imageRef(`icon:${iconKey}`), title, description }
}

async function buildDocuments() {
  const docs = []

  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    logo: imageRef('logo'),
    navCtaLabel: 'Request briefing',
    contactEmail: 'info@aeroshieldsys.com',
    contactWebsite: 'www.aeroshieldsys.com',
    contactWebsiteUrl: 'https://www.aeroshieldsys.com',
    gaMeasurementId: 'G-0QQTPS0590',
    footerTagline: 'Intelligence · Homeland Security · Defense',
    footerCopyright: '© AeroShield. All rights reserved.',
    metaTitle: 'AeroShield — Defense, Intelligence & Homeland Security',
    metaDescription:
      'Protecting nations. Enabling decision-makers. Strengthening what matters most. Mission-critical solutions spanning intelligence, command and control, electronic warfare, counter-UAS, secure communications and critical infrastructure protection.',
    ogImage: imageRef('heroBg'),
  })

  docs.push({
    _id: 'hero',
    _type: 'hero',
    eyebrowText: 'Intelligence · Homeland Security · Defense',
    heading: [
      { _type: 'textSegment', _key: 'a', text: 'Advancing national security through ', modifier: 'default' },
      { _type: 'textSegment', _key: 'b', text: 'intelligence & HLS', modifier: 'accent' },
    ],
    subheading:
      'Protecting nations. Enabling decision-makers. Strengthening what matters most. Mission-critical solutions spanning intelligence, command and control, electronic warfare, counter-UAS, secure communications and critical infrastructure protection.',
    primaryCtaLabel: 'Request a briefing',
    secondaryCtaLabel: 'Our capabilities',
    backgroundImage: imageRef('heroBg'),
  })

  docs.push({
    _id: 'whoWeAre',
    _type: 'whoWeAre',
    navLabel: 'Who we are',
    eyebrowLabel: 'Who we are',
    heading: 'AeroShield - Defense & HLS Ecosystems',
    bodyParagraphs: [
      'We deliver mission-critical solutions to governments, defense organizations, law enforcement agencies, and critical infrastructure operators. Combining operational expertise, advanced technologies, and global partnerships, we design, integrate, and support end-to-end security ecosystems that strengthen national resilience, situational awareness, and operational readiness.',
      'Our portfolio spans intelligence platforms and analysis, command and control, electronic warfare, counter-UAS, secure communications, critical infrastructure protection, and capacity building to support agencies at every level.',
    ],
    highlightQuote:
      'Led by a strategic core of former senior officers and global national security experts, AeroShield combines deep operational insight with market-driven adaptability.',
    image: { ...imageRef('whoWeAreImage'), alt: 'AeroShield global defense network' },
  })

  docs.push({
    _id: 'domains',
    _type: 'domains',
    navLabel: 'Domains',
    eyebrowLabel: 'Security domains',
    heading: 'Capabilities Across Security Domains',
    introText: 'Three integrated pillars of capability spanning the full spectrum of national security operations.',
    backgroundImage: imageRef('domainsBg'),
    items: [
      {
        _type: 'domainItem', _key: 'defense',
        icon: imageRef('icon:domain-defense'), title: 'Defense Solutions',
        description: 'Supporting defense forces with mission-ready capabilities, advanced systems, and operational support for complex environments.',
        anchorHref: '#defense-solutions',
      },
      {
        _type: 'domainItem', _key: 'hls',
        icon: imageRef('icon:domain-hls'), title: 'Homeland Security',
        description: 'Comprehensive, integrated solutions to help prevent, detect, and respond to threats across the homeland. We help governments build resilient and sustainable national security capabilities.',
        anchorHref: '#homeland-security',
      },
      {
        _type: 'domainItem', _key: 'intel',
        icon: imageRef('icon:domain-intelligence'), title: 'Intelligence Solutions',
        description: 'Strategic, operational, and tactical intelligence capabilities including fusion platforms, WEBINT, GEOINT, analytics, and investigation systems.',
        anchorHref: '#intelligence-solutions',
      },
    ],
  })

  docs.push({
    _id: 'capabilities',
    _type: 'capabilities',
    navLabel: 'Capabilities',
    eyebrowLabel: 'Capabilities',
    heading: 'Full-Spectrum Capabilities',
    introText: 'Capability areas across three security domains, each backed by operational expertise and purpose-built systems.',
    groups: [
      {
        _type: 'capabilityGroup', _key: 'defense', label: 'Defense Solutions',
        description: 'Mission-ready capabilities, advanced systems, and operational support for complex defense environments.',
        anchorId: 'defense-solutions',
        items: [
          capabilityItem('isr-systems', 'ISR Systems', 'Intelligence, surveillance, and reconnaissance systems for persistent situational awareness.'),
          capabilityItem('tactical-command-posts', 'Tactical Command Posts', 'Deployable and mobile command posts for tactical operations.'),
          capabilityItem('c-uas', 'C-UAS', 'Counter-UAS solutions for detection, tracking, identification, and neutralization of hostile drones and swarms.'),
          capabilityItem('battlefield-communications', 'Battlefield Communications', 'Secure, resilient, and interoperable communications for deployed forces.'),
          capabilityItem('defense-electronic-warfare', 'Electronic Warfare', 'EW systems for spectrum awareness, electronic protection, and defensive operational support.'),
          capabilityItem('c-rcied', 'C-RCIED', 'Counter-RCIED solutions for detection, disruption, and neutralization of IED threats and explosive hazards.'),
        ],
      },
      {
        _type: 'capabilityGroup', _key: 'hls', label: 'HLS Solutions',
        description: 'Integrated solutions to help prevent, detect, and respond to threats across the homeland.',
        anchorId: 'homeland-security',
        items: [
          capabilityItem('national-command-control', 'National Command & Control', 'C4I, SOC, EOC, and mobile command centers for unified national operations.'),
          capabilityItem('hls-counter-uas', 'Counter-UAS & Electronic Warfare', 'Detection, tracking, and neutralization of drones and advanced EW capabilities.'),
          capabilityItem('secure-communications', 'Secure Communications', 'Encrypted communications, radio systems, RCIED jammers, and solutions for mission-critical environments.'),
          capabilityItem('border-security', 'Border Security', 'Integrated border surveillance, monitoring, and threat detection systems.'),
          capabilityItem('critical-infrastructure', 'Critical Infrastructure Protection', 'Protection of airports, energy, transportation, and other critical infrastructure assets.'),
          capabilityItem('integrated-security', 'Integrated Security Operations', 'Holistic planning, integration, detection, and response for national-level security.'),
        ],
      },
      {
        _type: 'capabilityGroup', _key: 'intel', label: 'Intelligence Solutions',
        description: 'Strategic, operational, and tactical intelligence capabilities for decision advantage.',
        anchorId: 'intelligence-solutions',
        items: [
          capabilityItem('fusion-platforms', 'Intelligence Fusion Platforms', 'Unified platforms integrating multiple intelligence sources for comprehensive situational awareness.'),
          capabilityItem('ai-analytics', 'AI Analytics & Investigations', 'AI-powered analytics for pattern detection, link analysis, threat assessment, and advanced investigations.'),
          capabilityItem('tactical-intelligence', 'Tactical Intelligence Systems', 'Advanced intelligence-support systems for tactical and real-time operational environments.'),
          capabilityItem('osint', 'OSINT / WEBINT Monitoring', 'Advanced open-source and web intelligence monitoring, analysis, and operational insight.'),
          capabilityItem('maritime-intelligence', 'Maritime Intelligence Platforms', 'Comprehensive maritime domain awareness, vessel tracking, risk analysis, and threat monitoring across global waterways.'),
          capabilityItem('national-centers', 'National Intelligence Centers', 'Design, integration, and support for national-level intelligence centers and operations.'),
        ],
      },
    ],
  })

  docs.push({
    _id: 'approach',
    _type: 'approach',
    navLabel: 'Approach',
    eyebrowLabel: 'How we deliver',
    heading: 'From Requirement to Operation',
    introText: 'Every engagement follows a structured methodology: scoping the threat landscape, designing the architecture, deploying the systems and sustaining the operation.',
    steps: [
      { _type: 'approachStep', _key: 'assess', title: 'Assess', description: 'Comprehensive threat and capability assessment. We map the operational environment, identify gaps and define requirements aligned to your security posture.', photo: imageRef('photo:deliver-assess') },
      { _type: 'approachStep', _key: 'architect', title: 'Architect', description: 'Solution design integrating the right capabilities across domains. Every architecture is tailored. No off-the-shelf templates, no unnecessary complexity.', photo: imageRef('photo:deliver-architect') },
      { _type: 'approachStep', _key: 'deploy', title: 'Deploy', description: 'Full installation, configuration and integration. Our teams handle infrastructure, software deployment, network configuration and system hardening on-site.', photo: imageRef('photo:deliver-deploy') },
      { _type: 'approachStep', _key: 'sustain', title: 'Sustain', description: 'Ongoing support, training delivery and operational handover. We transfer knowledge and capability so your teams operate with full autonomy.', photo: imageRef('photo:deliver-sustain') },
    ],
    globalReachEyebrow: 'Global reach',
    stats: [
      { _type: 'stat', _key: 'continents', targetValue: 5, suffix: '', label: 'Continents with active operations and partner networks' },
      { _type: 'stat', _key: 'nations', targetValue: 20, suffix: '+', label: 'Partner nations across defense, intelligence and enterprise sectors' },
      { _type: 'stat', _key: 'professionals', targetValue: 200, suffix: '+', label: 'Cybersecurity and defense professionals worldwide' },
      { _type: 'stat', _key: 'domains', targetValue: 3, suffix: '', label: 'Core security domains: Intelligence, Homeland Security, Defense' },
    ],
  })

  docs.push({
    _id: 'values',
    _type: 'values',
    eyebrowLabel: 'Values',
    heading: 'Built on First Principles',
    introText: 'AeroShield is a defense and homeland security ecosystem, coordinating proprietary technologies, global partners and field expertise to deliver sovereign-grade security.',
    left: [
      capabilityItem('value-innovation', 'Innovation', 'Every solution is engineered from first principles. We combine emerging technologies with deep domain expertise to solve problems others work around.'),
      capabilityItem('value-integration', 'Integration', 'Technologies that work together, not in silos. Every platform in the ecosystem is designed to interoperate, sharing data, context and operational intelligence.'),
    ],
    right: [
      capabilityItem('value-sovereignty', 'Sovereignty', 'Security infrastructure must be owned, not rented. We design systems that give operators full control. No vendor lock-in, no foreign dependencies on critical assets.'),
      capabilityItem('value-people-first', 'People First', 'Trained personnel are the most important element of any security ecosystem. Technology enables; people protect. Every engagement includes knowledge transfer.'),
    ],
    centerImage: imageRef('valuesCenterImage'),
  })

  docs.push({
    _id: 'contact',
    _type: 'contact',
    eyebrowLabel: 'Get in touch',
    heading: 'Advance your national security capability',
    introText: 'Get in touch with our team to discuss how we can support your objectives. We look forward to hearing from you.',
    backgroundImage: imageRef('contactBg'),
    successMessage: 'Request received. Our team will contact you shortly.',
    errorMessage: 'Submission failed. Please retry, or write to',
  })

  return docs
}

// ─── 4. Run + verify ──────────────────────────────────────────────────────────

const EXPECTED = {
  domainsItems: 3,
  capabilityGroups: 3,
  capabilityItemsPerGroup: 6,
  approachSteps: 4,
  stats: 4,
  valuesLeft: 2,
  valuesRight: 2,
}

async function run() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  if (!process.env.SANITY_API_WRITE_TOKEN) throw new Error('Missing SANITY_API_WRITE_TOKEN')

  await uploadAllAssets()

  const docs = await buildDocuments()
  console.log(`Writing ${docs.length} documents...`)
  for (const doc of docs) {
    await client.createOrReplace(doc)
    console.log(`  ✓ ${doc._id}`)
  }

  // ---- Verification summary ----
  const siteSettingsDoc = docs.find((d) => d._id === 'siteSettings')
  const domainsDoc = docs.find((d) => d._id === 'domains')
  const capabilitiesDoc = docs.find((d) => d._id === 'capabilities')
  const approachDoc = docs.find((d) => d._id === 'approach')
  const valuesDoc = docs.find((d) => d._id === 'values')

  const checks = [
    ['documents created', docs.length, 8],
    ['siteSettings.ogImage set', Boolean(siteSettingsDoc.ogImage?.asset?._ref), true],
    ['domains.items length', domainsDoc.items.length, EXPECTED.domainsItems],
    ['capabilities.groups length', capabilitiesDoc.groups.length, EXPECTED.capabilityGroups],
    ...capabilitiesDoc.groups.map((g, i) => [`capabilities.groups[${i}].items length`, g.items.length, EXPECTED.capabilityItemsPerGroup]),
    ['approach.steps length', approachDoc.steps.length, EXPECTED.approachSteps],
    ['approach.stats length', approachDoc.stats.length, EXPECTED.stats],
    ['values.left length', valuesDoc.left.length, EXPECTED.valuesLeft],
    ['values.right length', valuesDoc.right.length, EXPECTED.valuesRight],
    ['values.centerImage set', Boolean(valuesDoc.centerImage?.asset?._ref), true],
    ['assets uploaded', uploadCount, uploadCount + uploadFailures],
  ]

  console.log('\nVerification summary:')
  let allOk = true
  for (const [label, actual, expected] of checks) {
    const ok = actual === expected
    allOk = allOk && ok
    console.log(`  ${ok ? '✓' : '✗'} ${label}: ${actual} (expected ${expected})`)
  }
  if (uploadFailures > 0) {
    console.log(`  ✗ ${uploadFailures} asset upload(s) failed — see errors above`)
    allOk = false
  }
  console.log(allOk ? '\nAll checks passed — nothing appears lost in migration.' : '\nSome checks failed — review before cutover.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
