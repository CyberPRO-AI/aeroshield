import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import '@/styles/components/domains.scss'

type DomainItem = {
  icon: string
  title: string
  description: string
  anchorHref: string
}

type DomainsProps = {
  eyebrowLabel: string
  heading: string
  introText: string
  backgroundImage: string
  items: DomainItem[]
}

export function Domains({ eyebrowLabel, heading, introText, backgroundImage, items }: DomainsProps) {
  return (
    <section id="domains" data-screen-label="Security domains" className="as-domains">
      <Image src={backgroundImage} alt="" fill className="as-domains__bg" sizes="100vw" />
      <div className="as-domains__scrim" />
      <div className="as-domains__inner">
        <div data-reveal="up">
          <Eyebrow tone="dark" rule>
            02 / {eyebrowLabel}
          </Eyebrow>
          <h2 className="as-domains__heading">{heading}</h2>
          <p className="as-domains__intro">{introText}</p>
        </div>
        <div className="as-domains__grid">
          {items.map((item) => (
            <div key={item.title} data-reveal="zoom">
              <a href={item.anchorHref} className="as-domain-card">
                <span className="as-domain-card__watermark">
                  <Icon src={item.icon} size={190} />
                </span>
                <span className="as-domain-card__icon">
                  <Icon src={item.icon} size={32} />
                </span>
                <h3 className="as-domain-card__title">{item.title}</h3>
                <span className="as-domain-card__rule" />
                <p className="as-domain-card__description">{item.description}</p>
                <span className="as-domain-card__cta">
                  Explore capabilities
                  <Icon src="/icons/arrow-right.svg" size={16} />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
