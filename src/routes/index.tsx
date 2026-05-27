import { createFileRoute } from '@tanstack/react-router'
import { allJobs, allProjects, allBlogs } from 'content-collections'
import { ArrowUpRight, Github, Linkedin, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

const sortedJobs = [...allJobs].sort(
  (a, b) => parseInt(b.startDate) - parseInt(a.startDate),
)

const featuredProjects = [...allProjects].slice(0, 3)

const sortedBlogs = [...allBlogs]
  .filter((b) =>
    ['vxlan-vs-vlan','sdwan-migration-lessons','aws-transit-gateway-design','azure-expressroute-guide','bgp-failover-engineering','network-automation-at-scale']
      .includes(b._meta.path)
  )
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const SKILLS = [
  {
    category: 'Cloud Platforms',
    skills: ['AWS VPC', 'Transit Gateway', 'Direct Connect', 'GuardDuty', 'Security Hub', 'Azure VNet', 'ExpressRoute', 'VPN Gateway'],
  },
  {
    category: 'Network Core',
    skills: ['BGP', 'OSPF', 'EIGRP', 'VRF', 'VXLAN', 'EVPN', 'STP', 'RSTP', 'EtherChannel', 'Cisco Nexus', 'Arista', 'Juniper Junos'],
  },
  {
    category: 'Security & Firewalls',
    skills: ['Zero Trust Architecture', 'Palo Alto Panorama', 'Fortinet FortiGate', 'Cisco Firepower', 'IPsec VPN', 'AWS IAM', 'Network Segmentation'],
  },
  {
    category: 'Automation & IaC',
    skills: ['Terraform', 'Ansible', 'Python', 'Netmiko', 'NAPALM', 'Bash', 'REST API', 'GitHub Actions', 'Jenkins', 'Policy-as-Code'],
  },
  {
    category: 'WAN & SD-WAN',
    skills: ['Cisco Viptela', 'Fortinet SD-WAN', 'Site-to-Site VPN', 'Failover Architecture', 'Multi-path Optimization'],
  },
  {
    category: 'Observability',
    skills: ['Wireshark', 'SolarWinds', 'Prometheus', 'Grafana', 'Splunk', 'Real-time Telemetry'],
  },
]

const CERTIFICATIONS = [
  { name: 'AWS Certified Advanced Networking Specialty', code: 'ANS-C01', issuer: 'Amazon Web Services' },
  { name: 'AWS Certified Security Specialty', code: 'SCS-C03', issuer: 'Amazon Web Services' },
  { name: 'Microsoft Certified Azure Network Engineer Associate', code: 'AZ-700', issuer: 'Microsoft' },
  { name: 'Cisco Certified Network Associate', code: 'CCNA', issuer: 'Cisco' },
]

const NAV_ITEMS = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'certifications', label: 'certifications' },
  { id: 'projects', label: 'projects' },
  { id: 'writing', label: 'writing' },
]

function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ring-1 ring-inset ring-teal-400/20">
      {label}
    </span>
  )
}

function SectionHeader({ title, divider = false }: { title: string; divider?: boolean }) {
  return (
    <>
      <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-[#0a192f]/90 px-6 py-5 backdrop-blur lg:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">{title}</h2>
      </div>
      {divider && (
        <div className="hidden lg:block h-0.5 bg-slate-600 mb-10" />
      )}
      <h2 className="hidden lg:block text-sm font-bold uppercase tracking-widest text-slate-200 mb-8">
        {title}
      </h2>
    </>
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
    <header className="lg:sticky lg:top-0 lg:relative lg:h-screen lg:w-[48%] lg:overflow-hidden lg:pt-10 lg:pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-200 sm:text-3xl lg:text-3xl">
          Yaswanth Reddy Jonnalagadda
        </h1>
        <h2 className="mt-2 text-base font-medium tracking-tight text-slate-200">
          Network &amp; Security Engineer
        </h2>
        <p className="mt-2 max-w-xs leading-normal text-slate-400 text-sm">
          I architect hybrid cloud networks, harden enterprise security, and automate infrastructure at scale.
        </p>

        <div className="mt-5 flex items-center gap-5">
          <img
            src="/headshot-on-white.jpg"
            alt="Yaswanth Reddy Jonnalagadda"
            className="w-16 h-16 rounded-full object-cover object-top ring-2 ring-slate-700/60 shrink-0"
          />
          <ul className="flex items-center gap-4">
            <li>
              <a
                href="https://github.com/yaswanthreddyjonnalagadda"
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
                href="https://www.linkedin.com/in/yaswanthreddyj"
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
        </div>

        <nav className="nav mt-8 hidden lg:block" aria-label="On-page">
          <ul className="space-y-3">
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

        <div className="mt-7 hidden lg:flex lg:flex-col lg:gap-2">
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-600/50 text-slate-400 text-sm font-medium hover:bg-slate-700/30 hover:border-slate-500 hover:text-slate-200 transition-all duration-200"
          >
            View Résumé
          </a>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-teal-500/50 text-teal-400 text-sm font-medium hover:bg-teal-500/10 hover:border-teal-400 transition-all duration-200"
          >
            Contact Me
          </a>
        </div>
      </div>

    </header>
  )
}

function AboutSection() {
  return (
    <section id="about" className="mb-6 scroll-mt-16 lg:mb-12 lg:scroll-mt-24">
      <SectionHeader title="About" />
      <div className="space-y-4 text-slate-400">
        <p>
          Cloud-first Senior Network Engineer who architected and deployed hybrid cloud
          infrastructure serving{' '}
          <span className="text-slate-200 font-medium">500+ network devices</span> across
          AWS, Azure, and on-premises environments — delivering{' '}
          <span className="text-slate-200 font-medium">$280K annual savings</span>, 40%
          capacity scaling, and 99.99% uptime.
        </p>
        <p>
          AWS Certified Security &amp; Advanced Networking Specialist who hardened
          enterprise networks through{' '}
          <span className="text-slate-200 font-medium">zero-trust architecture</span>,
          reducing firewall rules by 70% (1,200 &rarr; 400) while cutting policy
          deployment time 94% (4 hours &rarr; 15 minutes) at{' '}
          <span className="text-teal-400 font-medium">Capital One</span> and{' '}
          <span className="text-teal-400 font-medium">Freddie Mac</span>.
        </p>
        <p>
          Driven automation engineer: automated compliance scanning, threat remediation,
          and provisioning workflows via{' '}
          <span className="text-slate-200 font-medium">Terraform, Ansible, and Python</span>{' '}
          — reducing manual configuration effort by 60% and enabling reproducible
          multi-account cloud deployments across 15 AWS accounts.
        </p>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="mb-6 scroll-mt-16 lg:mb-12 lg:scroll-mt-24">
      <SectionHeader title="Professional Experience" divider />
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
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="mb-6 scroll-mt-16 lg:mb-12 lg:scroll-mt-24">
      <SectionHeader title="Projects" divider />
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

function SkillsSection() {
  return (
    <section id="skills" className="mb-6 scroll-mt-16 lg:mb-12 lg:scroll-mt-24">
      <SectionHeader title="Technical Expertise" divider />
      <div className="grid gap-6 sm:grid-cols-2">
        {SKILLS.map(({ category, skills }) => (
          <div
            key={category}
            className="rounded-xl border border-slate-800/60 bg-slate-800/20 p-5 hover:border-slate-700/80 hover:bg-slate-800/40 transition-all duration-300"
          >
            <h3 className="text-xs font-bold tracking-widest uppercase text-teal-400 mb-4">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-slate-700/40 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-slate-600/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CertificationsSection() {
  return (
    <section id="certifications" className="mb-6 scroll-mt-16 lg:mb-12 lg:scroll-mt-24">
      <SectionHeader title="Certifications" divider />
      <ol className="group/list space-y-6">
        {CERTIFICATIONS.map((cert) => (
          <li key={cert.code} className="group relative">
            <div className="absolute -inset-x-4 -inset-y-3 z-0 hidden rounded-md transition-all lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-teal-300 transition-colors duration-200">
                  {cert.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{cert.issuer}</p>
              </div>
              <span className="shrink-0 inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300 ring-1 ring-inset ring-teal-400/20">
                {cert.code}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function WritingSection() {
  return (
    <section id="writing" className="scroll-mt-16 lg:scroll-mt-24">
      <SectionHeader title="Technical Writing" divider />
      <ol className="group/list space-y-10">
        {sortedBlogs.map((post) => (
          <li key={post._meta.path} className="group relative">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
            <div className="relative z-10">
              <h3 className="font-medium text-slate-200 leading-snug mb-2 group-hover:text-teal-300 transition-colors duration-200">
                <a href={`/blog/${post._meta.path}`} className="group/link inline-flex items-baseline gap-1 text-base font-medium leading-tight">
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                  {post.title}
                  <ArrowUpRight
                    size={14}
                    className="ml-1 inline-block shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </h3>
              <p className="text-sm leading-normal text-slate-400 mb-3">{post.summary}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300 ring-1 ring-inset ring-teal-400/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
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
        <main className="pt-6 pb-16 lg:w-[52%] lg:pt-10 lg:pb-16">
          <AboutSection />
          <div className="h-0.5 bg-slate-600 my-6 lg:hidden" />
          <SkillsSection />
          <div className="h-0.5 bg-slate-600 my-6 lg:hidden" />
          <ExperienceSection />
          <div className="h-0.5 bg-slate-600 my-6 lg:hidden" />
          <CertificationsSection />
          <div className="h-0.5 bg-slate-600 my-6 lg:hidden" />
          <ProjectsSection />
          <div className="h-0.5 bg-slate-600 my-6 lg:hidden" />
          <WritingSection />
        </main>
      </div>
    </div>
  )
}
