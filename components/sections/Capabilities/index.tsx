import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import '@/styles/components/capabilities.scss'

type CapabilityItem = { icon: string; title: string; description: string }
type CapabilityGroup = {
  label: string
  description: string
  anchorId: string
  items: CapabilityItem[]
}

type CapabilitiesProps = {
  eyebrowLabel: string
  heading: string
  introText: string
  groups: CapabilityGroup[]
}

export function Capabilities({ eyebrowLabel, heading, introText, groups }: CapabilitiesProps) {
  return (
    <section id="capabilities" data-screen-label="Capabilities" className="as-capabilities">
      <div className="as-capabilities__inner">
        <div data-reveal="up">
          <Eyebrow rule>03 / {eyebrowLabel}</Eyebrow>
          <h2 className="as-capabilities__heading">{heading}</h2>
          <p className="as-capabilities__intro">{introText}</p>
        </div>
        <div data-stack-group="" className="as-capabilities__stack">
          {groups.map((group, i) => (
            <div
              key={group.anchorId}
              id={group.anchorId}
              data-step-card={String(i + 1).padStart(2, '0')}
              className="as-capability-group"
              style={{ top: 92 + i * 20, zIndex: i + 1, scrollMarginTop: 92 + i * 20 + 12 }}
            >
              <h3 data-reveal="zoom" className="as-capability-group__label">
                {group.label}
              </h3>
              <p className="as-capability-group__description">{group.description}</p>
              <div className="as-capability-group__items">
                {group.items.map((item) => (
                  <div key={item.title} className="as-capability-item">
                    <span className="as-capability-item__icon">
                      <Icon src={item.icon} size={28} />
                    </span>
                    <h3 className="as-capability-item__title">{item.title}</h3>
                    <span className="as-capability-item__rule" />
                    <p className="as-capability-item__description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
