import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ButtonLink } from '@/components/ui/Button'
import type { TextSegment } from '@/sanity/lib/queries'
import '@/styles/components/hero.scss'

type HeroProps = {
  eyebrowText: string
  heading: TextSegment[]
  subheading: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  backgroundImage: string
}

export function Hero({ eyebrowText, heading, subheading, primaryCtaLabel, secondaryCtaLabel, backgroundImage }: HeroProps) {
  return (
    <section id="top" data-screen-label="Hero" className="as-hero">
      <Image src={backgroundImage} alt="" fill priority className="as-hero__bg" sizes="100vw" />
      <div className="as-hero__scrim" />
      <div className="as-grid-overlay as-hero__grid" />
      <div className="as-hero__scan" />
      <div className="as-hero__content">
        <Eyebrow tone="dark">{eyebrowText}</Eyebrow>
        <h1 className="as-hero__heading">
          {heading.map((seg, i) => (
            <span key={i} className={seg.modifier === 'accent' ? 'as-hero__heading-accent' : undefined}>
              {seg.text}
            </span>
          ))}
        </h1>
        <p className="as-hero__subheading">{subheading}</p>
        <div className="as-hero__ctas">
          <ButtonLink href="#contact" size="lg">
            {primaryCtaLabel}
          </ButtonLink>
          <ButtonLink href="#capabilities" size="lg" variant="secondary" tone="dark">
            {secondaryCtaLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
