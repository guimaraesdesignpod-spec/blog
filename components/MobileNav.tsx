'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  lang: 'en' | 'pt'
  links: { href: string; label: string }[]
}

export default function MobileNav({ lang, links }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="nav-mobile-toggle"
        onClick={() => setOpen(!open)}
        aria-label={lang === 'pt' ? 'Menu' : 'Menu'}
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      <div className={`nav-mobile-menu${open ? ' open' : ''}`}>
        {links.map(link => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}
