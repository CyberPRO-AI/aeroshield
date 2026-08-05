import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import '@/styles/components/who-we-are.scss'

type WhoWeAreProps = {
  eyebrowLabel: string
  heading: string
  bodyParagraphs: string[]
  highlightQuote: string
  image: string
  imageAlt: string
}

export function WhoWeAre({ eyebrowLabel, heading, bodyParagraphs, highlightQuote, image, imageAlt }: WhoWeAreProps) {
  return (
    <section id="who" data-screen-label="Who we are" className="as-who">
      <div className="as-who__grid">
        <div data-reveal="up">
          <Eyebrow rule>01 / {eyebrowLabel}</Eyebrow>
          <h2 className="as-who__heading">{heading}</h2>
          {bodyParagraphs.map((p, i) => (
            <p key={i} className="as-who__paragraph">
              {p}
            </p>
          ))}
          <div className="as-who__quote">
            <p>{highlightQuote}</p>
          </div>
        </div>
        <div className="as-who__image-wrap">
          <div className="as-who__image-backdrop" />
          <div data-reveal="zoom" className="as-who__image-frame">
            <Image src={image} alt={imageAlt} fill className="as-who__image" sizes="(max-width: 920px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
