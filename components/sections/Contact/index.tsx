import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import { ContactForm } from './ContactForm'
import '@/styles/components/contact.scss'

type ContactProps = {
  eyebrowLabel: string
  heading: string
  introText: string
  backgroundImage: string
  successMessage: string
  errorMessage: string
  contactEmail: string
  contactWebsite: string
  contactWebsiteUrl: string
}

export function Contact({
  eyebrowLabel,
  heading,
  introText,
  backgroundImage,
  successMessage,
  errorMessage,
  contactEmail,
  contactWebsite,
  contactWebsiteUrl,
}: ContactProps) {
  return (
    <section id="contact" data-screen-label="Contact" className="as-contact">
      <Image src={backgroundImage} alt="" fill className="as-contact__bg" sizes="100vw" />
      <div className="as-grid-overlay as-contact__grid" />
      <div className="as-contact__inner">
        <div data-reveal="up">
          <Eyebrow tone="dark" rule>
            06 / {eyebrowLabel}
          </Eyebrow>
          <h2 className="as-contact__heading">{heading}</h2>
          <p className="as-contact__intro">{introText}</p>
          <div className="as-contact__details">
            <div className="as-contact__detail">
              <Icon src="/icons/email.svg" size={18} className="as-contact__detail-icon" />
              <div>
                <div className="as-contact__detail-label">Email</div>
                <a href={`mailto:${contactEmail}`} className="as-hoverlink as-contact__detail-value">
                  {contactEmail}
                </a>
              </div>
            </div>
            <div className="as-contact__detail">
              <Icon src="/icons/globe.svg" size={18} className="as-contact__detail-icon" />
              <div>
                <div className="as-contact__detail-label">Web</div>
                <a href={contactWebsiteUrl} className="as-hoverlink as-contact__detail-value">
                  {contactWebsite}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div data-reveal="right" className="as-contact__form-card">
          <ContactForm successMessage={successMessage} errorMessage={errorMessage} contactEmail={contactEmail} />
        </div>
      </div>
    </section>
  )
}
