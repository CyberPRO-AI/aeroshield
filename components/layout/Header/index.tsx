'use client'

import { useState } from 'react'
import Image from 'next/image'
import '@/styles/components/header.scss'

type NavItem = { id: string; label: string }

type HeaderProps = {
  logo: string
  navCtaLabel: string
  navItems: NavItem[]
}

export function Header({ logo, navCtaLabel, navItems }: HeaderProps) {
  const [navOpen, setNavOpen] = useState(false)
  const closeNav = () => setNavOpen(false)

  return (
    <header className="as-header">
      <div className="as-header__bar">
        <a href="#top" className="as-header__logo">
          <Image src={logo} alt="AeroShield" width={122} height={25} priority unoptimized style={{ height: 25, width: 'auto' }} />
        </a>
        <nav className="as-header__nav-desktop">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="as-hoverlink">
              {item.label}
            </a>
          ))}
          <a href="#contact" className="as-header__cta">
            {navCtaLabel}
          </a>
        </nav>
        <button
          className="as-header__burger"
          onClick={() => setNavOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={navOpen}
        >
          <span className="as-header__burger-icon" />
        </button>
      </div>
      {navOpen && (
        <div className="as-header__nav-mobile">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeNav} className="as-hoverlink">
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={closeNav} className="as-header__nav-mobile-contact">
            Contact
          </a>
        </div>
      )}
    </header>
  )
}
