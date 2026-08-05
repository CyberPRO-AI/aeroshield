import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { WhoWeAre } from '@/components/sections/WhoWeAre'
import { Domains } from '@/components/sections/Domains'
import { Capabilities } from '@/components/sections/Capabilities'
import { Approach } from '@/components/sections/Approach'
import { Values } from '@/components/sections/Values'
import { Contact } from '@/components/sections/Contact'
import {
  getSiteSettingsData,
  getHeroData,
  getWhoWeAreData,
  getDomainsData,
  getCapabilitiesData,
  getApproachData,
  getValuesData,
  getContactData,
} from '@/sanity/lib/queries'

export default async function HomePage() {
  const [settings, hero, whoWeAre, domains, capabilities, approach, values, contact] = await Promise.all([
    getSiteSettingsData(),
    getHeroData(),
    getWhoWeAreData(),
    getDomainsData(),
    getCapabilitiesData(),
    getApproachData(),
    getValuesData(),
    getContactData(),
  ])

  const navItems = [
    { id: 'who', label: whoWeAre.navLabel },
    { id: 'domains', label: domains.navLabel },
    { id: 'capabilities', label: capabilities.navLabel },
    { id: 'approach', label: approach.navLabel },
  ]

  return (
    <>
      <Header logo={settings.logo} navCtaLabel={settings.navCtaLabel} navItems={navItems} />
      <div style={{ height: 72 }} aria-hidden="true" />
      <main id="main-content">
        <Hero
          eyebrowText={hero.eyebrowText}
          heading={hero.heading}
          subheading={hero.subheading}
          primaryCtaLabel={hero.primaryCtaLabel}
          secondaryCtaLabel={hero.secondaryCtaLabel}
          backgroundImage={hero.backgroundImage}
        />
        <WhoWeAre
          eyebrowLabel={whoWeAre.eyebrowLabel}
          heading={whoWeAre.heading}
          bodyParagraphs={whoWeAre.bodyParagraphs}
          highlightQuote={whoWeAre.highlightQuote}
          image={whoWeAre.image}
          imageAlt={whoWeAre.imageAlt}
        />
        <Domains
          eyebrowLabel={domains.eyebrowLabel}
          heading={domains.heading}
          introText={domains.introText}
          backgroundImage={domains.backgroundImage}
          items={domains.items}
        />
        <Capabilities
          eyebrowLabel={capabilities.eyebrowLabel}
          heading={capabilities.heading}
          introText={capabilities.introText}
          groups={capabilities.groups}
        />
        <Approach
          eyebrowLabel={approach.eyebrowLabel}
          heading={approach.heading}
          introText={approach.introText}
          steps={approach.steps}
          globalReachEyebrow={approach.globalReachEyebrow}
          stats={approach.stats}
          globalReachMap={approach.globalReachMap}
        />
        <Values
          eyebrowLabel={values.eyebrowLabel}
          heading={values.heading}
          introText={values.introText}
          left={values.left}
          right={values.right}
          circleBgImage={values.circleBgImage}
          centerImage={values.centerImage}
        />
        <Contact
          eyebrowLabel={contact.eyebrowLabel}
          heading={contact.heading}
          introText={contact.introText}
          backgroundImage={contact.backgroundImage}
          successMessage={contact.successMessage}
          errorMessage={contact.errorMessage}
          contactEmail={settings.contactEmail}
          contactWebsite={settings.contactWebsite}
          contactWebsiteUrl={settings.contactWebsiteUrl}
        />
      </main>
      <Footer
        logo={settings.logo}
        footerTagline={settings.footerTagline}
        footerCopyright={settings.footerCopyright}
        contactEmail={settings.contactEmail}
        contactWebsite={settings.contactWebsite}
        contactWebsiteUrl={settings.contactWebsiteUrl}
        domainTitles={domains.items.map((item) => item.title)}
        companyLinks={[
          { id: 'who', label: whoWeAre.navLabel },
          { id: 'capabilities', label: capabilities.navLabel },
          { id: 'approach', label: approach.navLabel },
        ]}
      />
    </>
  )
}
