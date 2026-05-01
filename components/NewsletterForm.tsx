'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NewsletterFormProps {
  labels: {
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
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <form className=\"newsletter-form\" onSubmit={handleSubmit}>
      <input 
        type=\"email\" 
        placeholder={labels.newsletter_placeholder} 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className=\"flex-1 bg-oklch-25-0.02-250 border border-oklch-35-0.02-250 rounded-full px-4 py-2 text-sm text-white font-sans outline-none transition-colors focus:border-accent\"
      />
      <button 
        type=\"submit\" 
        disabled={status === 'loading'}
        className=\"bg-accent text-white rounded-full px-5 py-2 text-sm font-semibold cursor-pointer transition-all hover:bg-oklch-37-0.18-165 disabled:opacity-50\"
      >
        {status === 'loading' ? '...' : labels.newsletter_btn}
      </button>
      {status === 'success' && (
        <span className=\"absolute top-0 right-0 text-xs text-green-500\">✓ Subscribed!</span>
      )}
    </form>
  )
}
