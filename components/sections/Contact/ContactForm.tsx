'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

type ContactFormProps = {
  successMessage: string
  errorMessage: string
  contactEmail: string
}

// Field list/names/order are intentionally hardcoded here (not CMS content) —
// they must stay in sync with the static "ghost" form Netlify's build-time
// HTML parser detects; only the copy strings are editable via Sanity.
export function ContactForm({ successMessage, errorMessage, contactEmail }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    if (!form.reportValidity()) return

    setStatus('sending')
    try {
      const params = new URLSearchParams()
      new FormData(form).forEach((value, key) => params.append(key, String(value)))
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      name="briefing-request"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      action="/"
      onSubmit={handleSubmit}
      className="as-contact-form"
    >
      <input type="hidden" name="form-name" value="briefing-request" />
      <p className="as-contact-form__honeypot">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="as-contact-form__row">
        <div className="as-contact-form__field">
          <label htmlFor="f-name">Full name *</label>
          <input id="f-name" name="name" type="text" required placeholder="Your full name" className="as-field" />
        </div>
        <div className="as-contact-form__field">
          <label htmlFor="f-email">Email *</label>
          <input id="f-email" name="email" type="email" required placeholder="you@company.com" className="as-field" />
        </div>
      </div>

      <div className="as-contact-form__row">
        <div className="as-contact-form__field">
          <label htmlFor="f-org">Organization *</label>
          <input id="f-org" name="organization" type="text" required placeholder="Company or organization" className="as-field" />
        </div>
        <div className="as-contact-form__field">
          <label htmlFor="f-phone">Phone</label>
          <input id="f-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="as-field" />
        </div>
      </div>

      <div className="as-contact-form__field">
        <label htmlFor="f-msg">Message *</label>
        <textarea id="f-msg" name="message" rows={4} required placeholder="How can we help?" className="as-field" />
      </div>

      {status !== 'sent' && (
        <Button type="submit" size="lg" fullWidth disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Submit request'}
        </Button>
      )}

      {status === 'sent' && (
        <div role="status" className="as-contact-form__status as-contact-form__status--success">
          {successMessage}
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="as-contact-form__status as-contact-form__status--error">
          {errorMessage} <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </div>
      )}

      <p className="as-contact-form__disclaimer">Your contact information will be used only to respond to your inquiry.</p>
    </form>
  )
}
