import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  const [form, setForm] = useState({ fullName: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const body = `From: ${form.fullName}\n\n${form.message}`
    const mailto =
      `mailto:yaswanthreddyj08@gmail.com` +
      `?subject=${encodeURIComponent(form.subject)}` +
      `&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSent(true)
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
            Fill out the form and it will open in your email client, ready to send directly to my inbox.
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 text-teal-400">
              <CheckCircle size={22} />
              <span className="text-base font-medium text-slate-200">Your email client should have opened.</span>
            </div>
            <p className="text-slate-400 text-sm">
              Didn&rsquo;t open?{' '}
              <button
                onClick={() => setSent(false)}
                className="text-teal-400 underline underline-offset-4 hover:text-teal-300 transition-colors"
              >
                Try again
              </button>
            </p>
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
                placeholder="Hi Yashu, I came across your portfolio and would love to connect..."
                className="w-full bg-slate-800/50 border border-slate-700/60 rounded-lg px-4 py-3 text-slate-200 placeholder:text-slate-600 text-sm focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-teal-500/50 text-teal-400 font-medium text-sm hover:bg-teal-500/10 hover:border-teal-400 transition-all duration-200"
            >
              <Send size={14} />
              Send Message
            </button>

          </form>
        )}
      </div>
    </div>
  )
}
