import { createFileRoute } from '@tanstack/react-router'
import { allJobs, allProjects } from 'content-collections'
import { ArrowUpRight, Github, Linkedin, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

const sortedJobs = [...allJobs].sort(
  (a, b) => parseInt(b.startDate) - parseInt(a.startDate),
)

const featuredProjects = [...allProjects].slice(0, 3)

const NAV_ITEMS = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
]

function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ring-1 ring-inset ring-teal-400/20">
      {label}
    </span>
  )
}

function MobileSectionHeader({ title }: { title: string }) {
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0a192f]/90 px-6 py-5 backdrop-blur lg:sr-only">
      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
        {title}
      </h2>
    </div>
  )
}

function Sidebar({ activeSection }: { activeSection: string }) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          Yashu Reddy
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200">
          Software Engineer
        </h2>
        <p className="mt-4 max-w-xs leading-normal text-slate-400">
          I build accessible, pixel-perfect experiences for the web.
        </p>

        <div className="mt-8">
          <img
            src="/headshot-on-white.jpg"
            alt="Yashu Reddy"
            className="w-20 h-20 rounded-full object-cover object-top ring-2 ring-slate-700/60"
          />
        </div>

        <nav className="nav mt-16 hidden lg:block" aria-label="On-page">
          <ul className="space-y-4">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id
              return (
                <li key={id}>
                  <a href={`#${id}`} className="group flex items-center gap-4">
                    <span
                      className={`block h-px transition-all duration-300 ${
                        isActive
                          ? 'w-16 bg-slate-200'
                          : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-400'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                        isActive
                          ? 'text-slate-200'
                          : 'text-slate-500 group-hover:text-slate-400'
                      }`}
                    >
                      {label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <ul className="mt-8 flex items-center gap-5 lg:mt-0">
        <li>
          <a
            href="https://github.com/Yashu1308"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="block text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Github size={20} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/yaswanthreddyj"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="block text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Linkedin size={20} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            href="mailto:yaswanthreddyj08@gmail.com"
            aria-label="Email"
            className="block text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ExternalLink size={20} aria-hidden="true" />
          </a>
        </li>
      </ul>
    </header>
  )
}

function AboutSection() {
  return (
    <section id="about" className="mb-16 scroll-mt-16 lg:mb-36 lg:scroll-mt-24">
      <MobileSectionHeader title="About" />
      <div className="space-y-4 text-slate-400">
        <p>
          I&rsquo;m a frontend engineer with an expertise in building accessible,
          pixel-perfect user interfaces. I take pride in crafting thoughtful, inclusive
          products and have a sharp eye for the little details that elevate user
          experience. I do my best work at the intersection of design and engineering,
          where great UX meets clean, scalable code.
        </p>
        <p>
          Currently, I&rsquo;m on the component library team at{' '}
          <a
            href="#"
            className="font-medium text-slate-200 hover:text-teal-300 transition-colors"
          >
            Meridian Labs
          </a>
          , where I maintain and evolve the company&rsquo;s design system. I lead
          engineering efforts across components, tooling, and patterns, partnering
          closely with designers and engineers to ensure accessibility is built into the
          foundation of our products.
        </p>
        <p>
          Previously, I&rsquo;ve worked across a wide range of environments &mdash; from
          product studios to startups &mdash; including{' '}
          <a
            href="#"
            className="font-medium text-slate-200 hover:text-teal-300 transition-colors"
          >
            Helix Systems
          </a>
          . Outside of my day-to-day work, I&rsquo;m passionate about building products
          that are both well-crafted and widely usable.
        </p>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="mb-16 scroll-mt-16 lg:mb-36 lg:scroll-mt-24">
      <MobileSectionHeader title="Experience" />
      <div>
        <ol className="group/list space-y-12">
          {sortedJobs.map((job) => (
            <li key={job.company} className="group relative">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
              <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:gap-8">
                <header className="z-10 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:w-32 sm:shrink-0 sm:text-right">
                  {job.startDate} &mdash; {job.endDate ?? 'Present'}
                </header>
                <div className="flex-1">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <a
                      href="#"
                      className="group/link inline-flex items-baseline gap-1 text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      {job.jobTitle}{' '}
                      <span className="inline-block text-slate-400">·</span>{' '}
                      {job.company}
                      <ArrowUpRight
                        size={14}
                        className="ml-1 inline-block shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-slate-400">
                    {job.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <li key={tag}>
                        <TechTag label={tag} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <a
            href="/resume"
            className="inline-flex items-center gap-2 font-medium text-slate-200 hover:text-teal-300 transition-colors group"
          >
            View Full Résumé
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-16 lg:scroll-mt-24">
      <MobileSectionHeader title="Projects" />
      <ol className="group/list space-y-12">
        {featuredProjects.map((project) => (
          <li key={project._meta.path} className="group relative">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
              <div className="flex-1">
                <h3 className="font-medium leading-snug text-slate-200">
                  <a
                    href={project.liveUrl ?? project.github ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-baseline gap-1 text-base font-medium leading-tight text-slate-200 hover:text-teal-300"
                  >
                    {project.title}
                    <ArrowUpRight
                      size={14}
                      className="ml-1 inline-block shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </h3>
                <p className="mt-2 text-sm leading-normal text-slate-400">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <TechTag label={tag} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-12">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 font-medium text-slate-200 hover:text-teal-300 transition-colors group"
        >
          View All Projects
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  )
}

function Portfolio() {
  const [activeSection, setActiveSection] = useState('about')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: '#0a192f' }}>
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(29,78,216,0.12), transparent 80%)`,
        }}
      />
      <div className="mx-auto max-w-screen-xl px-6 md:px-12 lg:flex lg:gap-4 lg:px-24">
        <Sidebar activeSection={activeSection} />
        <main className="pt-24 pb-24 lg:w-[52%] lg:py-24">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
        </main>
      </div>
    </div>
  )
}
