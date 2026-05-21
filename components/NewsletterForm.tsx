'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  labels: {
    newsletter_label: string;
    newsletter_title: string;
    newsletter_em: string;
    newsletter_placeholder: string;
    newsletter_btn: string;
  }
}

export default function NewsletterForm({ labels }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="newsletter-strip">
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <div className="newsletter-label">{labels.newsletter_label}</div>
          <p className="newsletter-title">
            {labels.newsletter_title} <em>{labels.newsletter_em}</em>
          </p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={labels.newsletter_placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? '...' : labels.newsletter_btn}
          </button>
          {status === 'success' && (
            <span className="newsletter-success">✓</span>
          )}
          {status === 'error' && (
            <span className="newsletter-error">✕</span>
          )}
        </form>
      </div>
    </div>
  )
}
