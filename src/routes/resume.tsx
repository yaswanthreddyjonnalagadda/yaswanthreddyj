import { createFileRoute, Link } from '@tanstack/react-router'
import { allJobs, allEducations } from 'content-collections'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/resume')({
  component: Resume,
})

const sortedJobs = [...allJobs].sort(
  (a, b) => parseInt(b.startDate) - parseInt(a.startDate),
)

function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-teal-950/40 text-teal-300 border border-teal-800/30">
      {label}
    </span>
  )
}

function Resume() {
  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400 transition-colors duration-150 mb-14"
        >
          <ArrowLeft size={14} />
          Back home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-100 mb-3">
            Elara Voss
          </h1>
          <p className="text-slate-400 text-lg">
            Software Engineer — Design Systems &amp; Interfaces
          </p>
          <div className="mt-5 flex items-center gap-4 text-sm text-slate-500">
            <a
              href="mailto:elara@example.com"
              className="hover:text-teal-400 transition-colors"
            >
              elara@example.com
            </a>
            <span className="opacity-30">·</span>
            <a
              href="https://github.com/elara-voss"
              className="hover:text-teal-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/elara-voss
            </a>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-teal-400">
              Summary
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
          <div className="grid md:grid-cols-[1fr_180px] gap-10 items-start">
            <p className="text-slate-400 leading-relaxed text-[15px]">
              Frontend engineer with six years of experience building design
              systems, accessible component libraries, and high-performance
              interfaces. I specialise in the infrastructure that makes product
              teams move faster — token pipelines, shared component libraries,
              and performance-first architecture.
            </p>
            <img
              src="/headshot-on-white.jpg"
              alt="Elara Voss"
              className="w-full max-w-[160px] aspect-[3/4] object-cover rounded-xl grayscale opacity-75 ring-1 ring-slate-700/60 hidden md:block"
            />
          </div>
        </section>

        {/* Experience */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-teal-400">
              Experience
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
          <div className="space-y-0">
            {sortedJobs.map((job) => (
              <article
                key={job.company}
                className="flex flex-col md:flex-row gap-4 md:gap-8 py-8 border-t border-slate-800/60 first:border-t-0"
              >
                <div className="md:w-[120px] shrink-0">
                  <span className="text-xs font-medium text-slate-500 tracking-widest uppercase tabular-nums">
                    {job.startDate} — {job.endDate ?? 'Present'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-200 font-semibold text-base mb-0.5">
                    {job.jobTitle}
                  </h3>
                  <p className="text-slate-500 text-sm mb-3">
                    {job.company} · {job.location}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {job.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <TechTag key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-teal-400">
              Education
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
          <div className="space-y-0">
            {allEducations.map((education) => (
              <article
                key={education.school}
                className="flex flex-col md:flex-row gap-4 md:gap-8 py-8 border-t border-slate-800/60 first:border-t-0"
              >
                <div className="md:w-[120px] shrink-0">
                  <span className="text-xs font-medium text-slate-500 tracking-widest uppercase tabular-nums">
                    {education.startDate} — {education.endDate ?? 'Present'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-200 font-semibold text-base mb-0.5">
                    {education.school}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mt-2">
                    {education.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
