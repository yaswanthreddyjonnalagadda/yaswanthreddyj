import { createFileRoute } from '@tanstack/react-router'
import { allJobs, allProjects } from 'content-collections'
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

// ─── Data sorted by start date descending ───────────────────────────────────
const sortedJobs = [...allJobs].sort(
  (a, b) => parseInt(b.startDate) - parseInt(a.startDate),
)

const featuredProjects = [...allProjects].slice(0, 3)

// ─── Small reusable pieces ───────────────────────────────────────────────────

function TechTag({ label }: { label: string }) {
  return (
    <span
      className="
        inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium
        tracking-wide uppercase
        bg-teal-950/40 text-teal-300 border border-teal-800/30
        transition-colors duration-200 hover:bg-teal-900/40
      "
    >
      {label}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-teal-400">
        {children}
      </span>
      <div className="flex-1 h-px bg-slate-800" />
    </div>
  )
}

function NavDot({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <a
      href={href}
      className="
        text-xs font-medium tracking-widest uppercase text-slate-500
        hover:text-slate-200 transition-colors duration-200
      "
    >
      {label}
    </a>
  )
}

// ─── Sections ────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="animate-fade-up">
        <p className="text-teal-400 text-sm font-medium tracking-[0.15em] uppercase mb-5">
          Available for new opportunities
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 leading-[1.05] mb-5">
          Elara Voss
        </h1>
        <h2 className="text-xl md:text-2xl font-light text-slate-400 mb-7 tracking-tight">
          Software Engineer &mdash; Design Systems &amp; Interfaces
        </h2>
        <p className="max-w-lg text-slate-400 leading-relaxed text-base mb-10">
          I build the invisible infrastructure that makes great products feel
          inevitable &mdash; design systems, component libraries, and
          high-performance interfaces that scale.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#contact"
            className="
              inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              border border-teal-500/50 text-teal-400 text-sm font-medium
              hover:bg-teal-500/10 hover:border-teal-400
              transition-all duration-200
            "
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="
              text-slate-400 text-sm font-medium hover:text-slate-200
              transition-colors duration-200 flex items-center gap-1.5
            "
          >
            View work
            <ArrowUpRight size={14} className="opacity-60" />
          </a>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-20 scroll-mt-20 animate-fade-up animation-delay-100">
      <SectionLabel>About</SectionLabel>
      <div className="grid md:grid-cols-[1fr_200px] gap-12 items-start">
        <div className="space-y-5 text-slate-400 leading-relaxed text-[15px]">
          <p>
            I&rsquo;m a frontend engineer with six years of experience at the
            intersection of{' '}
            <span className="text-slate-200 font-medium">design systems</span>,{' '}
            <span className="text-slate-200 font-medium">
              accessibility engineering
            </span>
            , and{' '}
            <span className="text-slate-200 font-medium">
              high-performance UI
            </span>
            . I thrive in the unglamorous work of making complex things simple
            and making fast things faster.
          </p>
          <p>
            Most recently at{' '}
            <span className="text-teal-400 font-medium">Meridian Labs</span>, I
            led a design-system overhaul that unified six product teams under a
            single component library, cutting cross-product visual
            inconsistencies by 74% and halving the average time to ship a new
            feature. Before that, at{' '}
            <span className="text-teal-400 font-medium">Helix Systems</span>, I
            built the real-time visualization layer for an infrastructure
            monitoring product serving thousands of enterprise clients.
          </p>
          <p>
            Outside of work, I contribute to open-source tooling (my{' '}
            <a
              href="https://github.com/elara-voss/vessel"
              className="text-slate-300 underline underline-offset-4 decoration-slate-600 hover:decoration-teal-400 hover:text-teal-300 transition-colors duration-150"
            >
              Vessel CLI
            </a>{' '}
            is used by three funded startups), write about{' '}
            <span className="text-slate-200">interface performance</span>, and
            occasionally speak at local meetups on component architecture.
          </p>
        </div>
        <div className="hidden md:block">
          <div className="relative inline-block">
            <img
              src="/headshot-on-white.jpg"
              alt="Elara Voss"
              className="
                w-48 h-56 object-cover rounded-xl
                grayscale opacity-80
                ring-1 ring-slate-700/60
                transition-all duration-500
                hover:grayscale-0 hover:opacity-100
              "
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-teal-400/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-20 scroll-mt-20 animate-fade-up animation-delay-200">
      <SectionLabel>Experience</SectionLabel>
      <div className="space-y-0">
        {sortedJobs.map((job, i) => (
          <article
            key={job.company}
            className="
              group relative flex flex-col md:flex-row gap-5 md:gap-8
              py-8 border-t border-slate-800/60 first:border-t-0
              hover:bg-slate-800/20
              transition-colors duration-300 rounded-xl
              px-4 -mx-4
            "
          >
            {/* Date column */}
            <div className="md:w-[120px] shrink-0">
              <span className="text-xs font-medium text-slate-500 tracking-widest uppercase tabular-nums">
                {job.startDate} — {job.endDate ?? 'Present'}
              </span>
            </div>

            {/* Content column */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-slate-200 font-semibold text-base leading-snug group-hover:text-teal-300 transition-colors duration-200">
                  {job.jobTitle}{' '}
                  <span className="text-slate-500 font-normal">·</span>{' '}
                  <span className="text-slate-400 font-normal">
                    {job.company}
                  </span>
                </h3>
                <span className="shrink-0 text-xs text-slate-600 mt-0.5 hidden sm:block">
                  {job.location}
                </span>
              </div>
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

      <div className="mt-8 pl-4 md:pl-[152px]">
        <a
          href="/resume"
          className="
            inline-flex items-center gap-2
            text-sm font-medium text-slate-400
            hover:text-teal-300 transition-colors duration-200
          "
        >
          View full résumé
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-20 scroll-mt-20 animate-fade-up animation-delay-300">
      <SectionLabel>Projects</SectionLabel>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <article
            key={project._meta.path}
            className="
              group relative flex flex-col
              bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6
              hover:-translate-y-1 hover:border-slate-700/80 hover:bg-slate-900/80
              hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]
              transition-all duration-300
            "
          >
            {/* Top row */}
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

            {/* Title */}
            <h3 className="text-slate-200 font-semibold text-base leading-snug mb-2 group-hover:text-teal-300 transition-colors duration-200">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <TechTag key={tag} label={tag} />
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <a
          href="/projects"
          className="
            inline-flex items-center gap-2
            text-sm font-medium text-slate-400
            hover:text-teal-300 transition-colors duration-200
          "
        >
          See all projects
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 border-t border-slate-800/60 scroll-mt-20 animate-fade-up animation-delay-400">
      <div className="max-w-lg">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-teal-400 mb-4">
          Get in touch
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100 mb-5 leading-tight">
          Let&rsquo;s build something worth building.
        </h2>
        <p className="text-slate-400 leading-relaxed mb-8 text-[15px]">
          Currently open to senior engineering and staff-level roles focused on
          design systems, component architecture, or frontend infrastructure.
          Always happy to talk interfaces, tooling, or craft.
        </p>
        <a
          href="mailto:elara@example.com"
          className="
            inline-flex items-center gap-2.5 px-6 py-3 rounded-full
            border border-teal-500/50 text-teal-400 font-medium text-sm
            hover:bg-teal-500/10 hover:border-teal-400
            transition-all duration-200
          "
        >
          <Mail size={15} />
          elara@example.com
        </a>
      </div>
    </section>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <nav className="
          flex items-center justify-between
          py-4 border-b border-slate-800/40
          backdrop-blur-sm bg-[#0b0f1a]/80
        ">
          <a
            href="/"
            className="text-slate-400 text-sm font-medium hover:text-slate-200 transition-colors duration-200 tracking-tight"
          >
            EV
          </a>
          <div className="flex items-center gap-6">
            <NavDot href="#about" label="About" />
            <NavDot href="#experience" label="Experience" />
            <NavDot href="#projects" label="Projects" />
            <NavDot href="#contact" label="Contact" />
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/elara-voss"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-500 hover:text-slate-300 transition-colors duration-150"
            >
              <Github size={17} />
            </a>
            <a
              href="https://linkedin.com/in/elara-voss"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-slate-300 transition-colors duration-150"
            >
              <Linkedin size={17} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t border-slate-800/40">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-slate-600 text-xs tracking-wide">
          Designed &amp; built by Elara Voss
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/elara-voss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 text-xs hover:text-slate-400 transition-colors duration-150"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/elara-voss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 text-xs hover:text-slate-400 transition-colors duration-150"
          >
            LinkedIn
          </a>
          <a
            href="/resume"
            className="text-slate-600 text-xs hover:text-slate-400 transition-colors duration-150"
          >
            Résumé
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function Portfolio() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 md:px-12">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
