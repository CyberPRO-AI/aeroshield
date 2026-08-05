import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import '@/styles/components/values.scss'

type ValueItem = { icon: string; title: string; description: string }

type ValuesProps = {
  eyebrowLabel: string
  heading: string
  introText: string
  left: ValueItem[]
  right: ValueItem[]
  circleBgImage: string
  centerImage: string
}

export function Values({ eyebrowLabel, heading, introText, left, right, circleBgImage, centerImage }: ValuesProps) {
  return (
    <section id="values" data-screen-label="Values" className="as-values">
      <div className="as-grid-overlay as-values__grid" />
      <div className="as-values__inner">
        <div data-reveal="up">
          <Eyebrow tone="dark" rule>
            05 / {eyebrowLabel}
          </Eyebrow>
          <h2 className="as-values__heading">{heading}</h2>
          <p className="as-values__intro">{introText}</p>
        </div>
        <div className="as-values__grid-layout">
          <div data-reveal="left" className="as-values__column as-values__column--left">
            {left.map((v) => (
              <div key={v.title} className="as-value-row as-value-row--left">
                <div className="as-value-row__text">
                  <div className="as-value-row__title">{v.title}</div>
                  <div className="as-value-row__description">{v.description}</div>
                </div>
                <span className="as-value-tile">
                  <Icon src={v.icon} size={32} />
                </span>
                <span className="as-values-conn" />
              </div>
            ))}
          </div>
          <div className="as-values__center">
            <div className="as-values__center-bg">
              <Image src={circleBgImage} alt="" aria-hidden="true" width={200} height={200} unoptimized className="as-values__center-bg-img" />
            </div>
            <Image
              src={centerImage}
              alt="AeroShield cyber intelligence operations"
              data-reveal="zoom"
              width={480}
              height={480}
              className="as-values__center-image"
            />
          </div>
          <div data-reveal="right" className="as-values__column as-values__column--right">
            {right.map((v) => (
              <div key={v.title} className="as-value-row as-value-row--right">
                <span className="as-values-conn" />
                <span className="as-value-tile">
                  <Icon src={v.icon} size={32} />
                </span>
                <div className="as-value-row__text">
                  <div className="as-value-row__title">{v.title}</div>
                  <div className="as-value-row__description">{v.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
