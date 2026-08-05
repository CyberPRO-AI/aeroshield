import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { StatCounter } from './StatCounter'
import '@/styles/components/approach.scss'

type Step = { title: string; description: string; photo: string }
type Stat = { targetValue: number; suffix: string; label: string }

type ApproachProps = {
  eyebrowLabel: string
  heading: string
  introText: string
  steps: Step[]
  globalReachEyebrow: string
  stats: Stat[]
  globalReachMap: string
}

export function Approach({ eyebrowLabel, heading, introText, steps, globalReachEyebrow, stats, globalReachMap }: ApproachProps) {
  return (
    <section id="approach" data-screen-label="How we deliver" className="as-approach">
      <div className="as-grid-overlay as-approach__grid" />
      <div className="as-approach__inner">
        <div data-reveal="up">
          <Eyebrow tone="dark" rule>
            04 / {eyebrowLabel}
          </Eyebrow>
          <h2 className="as-approach__heading">{heading}</h2>
          <p className="as-approach__intro">{introText}</p>
        </div>
        <div data-stack-group="" className="as-approach__stack">
          {steps.map((step, i) => {
            const num = String(i + 1).padStart(2, '0')
            const barStart = `${i * 25}%`
            const barFull = `${(i + 1) * 25}%`
            return (
              <div
                key={step.title}
                data-step-card={num}
                className="as-approach-step"
                style={{ top: 92 + i * 20, zIndex: i + 1 }}
              >
                <div className="as-grid-overlay as-approach-step__grid" />
                <div className="as-approach-step__split">
                  <div className="as-approach-step__image-wrap">
                    <Image src={step.photo} alt={step.title} fill className="as-approach-step__image" sizes="(max-width: 920px) 100vw, 50vw" />
                  </div>
                  <div className="as-approach-step__content">
                    <div className="as-approach-step__meta">
                      <span className="as-approach-step__step-label">Step {num} / 04</span>
                      <span className="as-approach-step__big-num">{num}</span>
                    </div>
                    <div className="as-approach-step__text">
                      <h3 data-reveal="zoom" className="as-approach-step__title">
                        {step.title}
                      </h3>
                      <p className="as-approach-step__description">{step.description}</p>
                    </div>
                  </div>
                </div>
                <div className="as-approach-step__bar-track">
                  <div
                    data-step-bar={num}
                    data-start={barStart}
                    data-full={barFull}
                    className="as-approach-step__bar-fill"
                    style={{ width: barStart }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div id="global-reach" data-reveal="scale" className="as-approach__global-reach">
          <Eyebrow tone="dark">{globalReachEyebrow}</Eyebrow>
        </div>
      </div>
      <div className="as-approach__stats-section">
        <Image
          src={globalReachMap}
          alt=""
          aria-hidden="true"
          width={1270}
          height={700}
          className="as-approach__map"
          style={{ width: '100%', height: 'auto' }}
        />
        <div className="as-approach__stats-overlay">
          <div data-reveal="scale" className="as-approach__stats-card">
            <div className="as-approach__stats-row">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <StatCounter targetValue={stat.targetValue} suffix={stat.suffix} />
                  <div className="as-stat__rule" />
                  <div className="as-stat__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
