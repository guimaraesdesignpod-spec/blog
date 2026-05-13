'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  // Prevent hydration mismatch: render a placeholder until mounted
  if (!mounted) {
    return (
      <button
        aria-label="Alternar tema"
        style={{
          background: 'none',
          border: '1px solid var(--rule)',
          borderRadius: '6px',
          cursor: 'pointer',
          color: 'var(--ink-light)',
          fontSize: '1rem',
          padding: '0.35rem 0.5rem',
          lineHeight: 1,
          width: '2rem',
          height: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {' '}
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'none',
        border: '1px solid var(--rule)',
        borderRadius: '6px',
        cursor: 'pointer',
        color: 'var(--ink-light)',
        fontSize: '1rem',
        padding: '0.35rem 0.5rem',
        lineHeight: 1,
        width: '2rem',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s, border-color 0.2s',
      }}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}