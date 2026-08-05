import Image from 'next/image'
import '@/styles/components/footer.scss'

type FooterProps = {
  logo: string
  footerTagline: string
  footerCopyright: string
  contactEmail: string
  contactWebsite: string
  contactWebsiteUrl: string
  domainTitles: string[]
  companyLinks: { id: string; label: string }[]
}

export function Footer({
  logo,
  footerTagline,
  footerCopyright,
  contactEmail,
  contactWebsite,
  contactWebsiteUrl,
  domainTitles,
  companyLinks,
}: FooterProps) {
  return (
    <footer className="as-footer">
      <div className="as-footer__top">
        <div>
          <Image src={logo} alt="AeroShield" width={195} height={40} unoptimized style={{ height: 40, width: 'auto' }} />
          <p className="as-footer__tagline">{footerTagline}</p>
        </div>
        <div className="as-footer__columns">
          <div className="as-footer__column">
            <div className="as-footer__column-title">Domains</div>
            {domainTitles.map((title) => (
              <a key={title} href="#domains" className="as-hoverlink">
                {title}
              </a>
            ))}
          </div>
          <div className="as-footer__column">
            <div className="as-footer__column-title">Company</div>
            {companyLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="as-hoverlink">
                {link.label}
              </a>
            ))}
          </div>
          <div className="as-footer__column">
            <div className="as-footer__column-title">Contact</div>
            <a href={`mailto:${contactEmail}`} className="as-hoverlink">
              {contactEmail}
            </a>
            <a href={contactWebsiteUrl} className="as-hoverlink">
              {contactWebsite}
            </a>
          </div>
        </div>
      </div>
      <div className="as-footer__bottom">
        <span>{footerCopyright}</span>
        <span>{contactWebsite}</span>
      </div>
    </footer>
  )
}
