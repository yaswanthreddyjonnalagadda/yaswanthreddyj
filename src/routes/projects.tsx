import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-teal-950/40 text-teal-300 border border-teal-800/30">
      {label}
    </span>
  )
}

function Projects() {
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

        <div className="mb-12">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-teal-400 mb-3">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 mb-3">
            Projects
          </h1>
          <p className="text-slate-400 text-[15px] leading-relaxed max-w-lg">
            A selection of things I&rsquo;ve built — open-source tools, side
            experiments, and serious engineering projects.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {allProjects.map((project) => (
            <article
              key={project._meta.path}
              className="
                group flex flex-col
                bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6
                hover:-translate-y-1 hover:border-slate-700/80 hover:bg-slate-900/80
                hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]
                transition-all duration-300
              "
            >
              <div className="flex items-start justify-between mb-5">
                <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-5 h-5 text-teal-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub repository"
                      className="text-slate-500 hover:text-slate-300 transition-colors duration-150"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live site"
                      className="text-slate-500 hover:text-slate-300 transition-colors duration-150"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <h2 className="text-slate-200 font-semibold text-base leading-snug mb-2 group-hover:text-teal-300 transition-colors duration-200">
                {project.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
