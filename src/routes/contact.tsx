import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

function Contact() {
  const [form, setForm] = useState({ fullName: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.fullName,
          subject: form.subject,
          message: form.message,
          reply_to: '',
        },
        PUBLIC_KEY,
      )
      setStatus('sent')
      setForm({ fullName: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0a192f' }}>
      <div className="w-full max-w-lg">

        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-400 mb-3">
            Get in touch
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-200 mb-3">
            Send a Message
          </h1>
          <p className="text-slate-400 leading-relaxed text-sm">
            Fill out the form and your message will be sent directly to my inbox.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle size={22} className="text-teal-400" />
              <span className="text-base font-medium text-slate-200">Message sent — I'll be in touch soon.</span>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="text-teal-400 text-sm underline underline-offset-4 hover:text-teal-300 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full bg-slate-800/50 border border-slate-700/60 rounded-lg px-4 py-3 text-slate-200 placeholder:text-slate-600 text-sm focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder="Networking role at Acme Corp"
                className="w-full bg-slate-800/50 border border-slate-700/60 rounded-lg px-4 py-3 text-slate-200 placeholder:text-slate-600 text-sm focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Hi Yaswanth, I came across your portfolio and would love to connect..."
                className="w-full bg-slate-800/50 border border-slate-700/60 rounded-lg px-4 py-3 text-slate-200 placeholder:text-slate-600 text-sm focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">
                Something went wrong. Please try again or email me directly at{' '}
                <a href="mailto:yaswanthreddyj08@gmail.com" className="underline underline-offset-4 hover:text-red-300">
                  yaswanthreddyj08@gmail.com
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-teal-500/50 text-teal-400 font-medium text-sm hover:bg-teal-500/10 hover:border-teal-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={14} />
                  Send Message
                </>
              )}
            </button>

          </form>
        )}
      </div>
    </div>
  )
}
