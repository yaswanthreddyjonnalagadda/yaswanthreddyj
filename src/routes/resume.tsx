import { createFileRoute, Link } from '@tanstack/react-router'
import { allJobs, allEducations } from 'content-collections'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import { useState } from 'react'
import { PhotoModal } from '../components/PhotoModal'

export const Route = createFileRoute('/resume')({
  component: Resume,
})

const sortedJobs = [...allJobs].sort(
  (a, b) => parseInt(b.startDate) - parseInt(a.startDate),
)

const sortedEducation = [...allEducations].sort(
  (a, b) => parseInt(b.startDate) - parseInt(a.startDate),
)

const CERTIFICATIONS = [
  { name: 'AWS Certified Security – Specialty', code: 'SCS-C03', issuer: 'Amazon Web Services' },
  { name: 'AWS Certified Advanced Networking – Specialty', code: 'ANS-C01', issuer: 'Amazon Web Services' },
  { name: 'Microsoft Azure Network Engineer Associate', code: 'AZ-700', issuer: 'Microsoft' },
  { name: 'Cisco Certified Network Associate', code: 'CCNA', issuer: 'Cisco' },
]

const SKILLS = [
  { category: 'Routing & Switching', items: ['BGP', 'OSPF', 'EIGRP', 'IS-IS', 'MPLS', 'VRF', 'EVPN/VXLAN Spine-Leaf', 'PIM Multicast', 'HSRP/VRRP/GLBP', 'STP/RSTP/MSTP', 'vPC/MLAG', 'EtherChannel/LACP', 'DCI'] },
  { category: 'Platforms', items: ['Cisco Catalyst 9K/3850', 'Nexus 9K/7K/5K', 'ISR/ASR', 'Meraki', 'Viptela SD-WAN', 'ACI', 'Catalyst Center', 'Juniper MX/EX/SRX/QFX', 'Arista EOS', 'HPE Aruba'] },
  { category: 'Security & NGFW', items: ['Palo Alto PA-3200/5200', 'Panorama', 'Prisma Access', 'Fortinet FortiGate/FortiManager/FortiAnalyzer', 'Cisco ASA/Firepower FTD/FMC', 'Check Point', 'ZTNA', 'SASE', 'Microsegmentation', 'IDS/IPS', 'ACLs', 'SSL/TLS Decryption', 'URL Filtering', 'WildFire'] },
  { category: 'Identity & VPN', items: ['Cisco ISE', 'Forescout', 'Aruba ClearPass', '802.1X', 'RADIUS', 'TACACS+', 'NAC', 'MAB', 'IPsec VPN (IKEv1/v2)', 'GRE', 'DMVPN', 'SSL VPN', 'AnyConnect', 'GlobalProtect', 'Zscaler ZIA/ZPA'] },
  { category: 'Load Balancing', items: ['F5 BIG-IP LTM/GTM/ASM/APM', 'iRules', 'GSLB', 'AVI/NSX ALB', 'Citrix NetScaler', 'AWS ALB/NLB', 'Azure Application Gateway'] },
  { category: 'Cloud Networking', items: ['AWS VPC', 'Transit Gateway', 'Direct Connect', 'PrivateLink', 'Security Hub', 'GuardDuty', 'WAF', 'Network Firewall', 'IAM', 'Azure VNet', 'ExpressRoute', 'Azure Firewall', 'Virtual WAN', 'Landing Zone', 'Hub-and-Spoke', 'Private Endpoints', 'GCP VPC', 'Cloud Interconnect', 'Cloud Armor'] },
  { category: 'Automation & IaC', items: ['Python (Netmiko, NAPALM, Nornir, REST API)', 'Ansible (Playbooks/Tower/AWX)', 'Terraform (HCL, Modules, State)', 'PowerShell', 'Bash', 'GitHub Actions', 'Jenkins', 'GitLab CI', 'Azure DevOps', 'NetDevOps', 'Policy-as-Code (Checkov, OPA)'] },
  { category: 'Monitoring & Ops', items: ['SolarWinds NPM/NCM', 'Splunk', 'PRTG', 'Wireshark', 'Prometheus', 'Grafana', 'Datadog', 'NetFlow/sFlow/IPFIX', 'Streaming Telemetry (gNMI/YANG)', 'Infoblox DDI', 'IPAM', 'ITIL', 'ServiceNow', 'Jira', 'DR Planning'] },
]

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-teal-400 shrink-0">
        {title}
      </span>
      <div className="flex-1 h-px bg-slate-800" />
    </div>
  )
}

function Resume() {
  const [photoOpen, setPhotoOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#0a192f]">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 border-b border-slate-800/60 bg-[#0a192f]/95 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400 transition-colors duration-150"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="/Yaswanth_Reddy_J_Networking_Resume.pdf"
              download="Yaswanth_Reddy_J_Networking_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-600/50 text-slate-400 text-xs font-medium hover:bg-slate-700/30 hover:border-slate-500 hover:text-slate-200 transition-all duration-200"
            >
              <Download size={13} aria-hidden="true" />
              PDF
            </a>
            <a
              href="/Yaswanth_Reddy_J_Networking_Resume.docx"
              download="Yaswanth_Reddy_J_Networking_Resume.docx"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/40 text-teal-400 text-xs font-medium hover:bg-teal-500/10 hover:border-teal-400 transition-all duration-200"
            >
              <FileText size={13} aria-hidden="true" />
              Word
            </a>
          </div>
        </div>
      </div>

      {/* Resume content */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-14">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-100 mb-2">
              Yaswanth Reddy Jonnalagadda
            </h1>
            <p className="text-slate-400 text-base mb-5">
              Senior Network &amp; Security Engineer · Cloud Network Engineer · Network Automation Engineer
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              <span>Fairfax, VA</span>
              <span className="opacity-30">·</span>
              <span>(757) 632-6895</span>
              <span className="opacity-30">·</span>
              <a href="mailto:yaswanthreddyj08@gmail.com" className="hover:text-teal-400 transition-colors">
                yaswanthreddyj08@gmail.com
              </a>
              <span className="opacity-30">·</span>
              <a href="https://www.linkedin.com/in/yaswanthreddyj" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                www.linkedin.com/in/yaswanthreddyj
              </a>
              <span className="opacity-30">·</span>
              <a href="https://github.com/yaswanthreddyjonnalagadda" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                github.com/yaswanthreddyjonnalagadda
              </a>
            </div>
          </div>
          <button
            onClick={() => setPhotoOpen(true)}
            className="shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-label="View full photo"
          >
            <img
              src="/headshot-on-white.jpg"
              alt="Yaswanth Reddy Jonnalagadda"
              className="w-24 h-24 rounded-full object-cover object-top ring-2 ring-slate-700/60 cursor-pointer hover:ring-teal-400/60 transition-all duration-200"
            />
          </button>
          {photoOpen && (
            <PhotoModal
              src="/headshot-on-white.jpg"
              alt="Yaswanth Reddy Jonnalagadda"
              onClose={() => setPhotoOpen(false)}
            />
          )}
        </div>

        {/* Summary */}
        <section className="mb-12">
          <SectionDivider title="Summary" />
          <p className="text-slate-400 leading-relaxed text-[15px]">
            Senior Network &amp; Security Engineer with 6+ years of experience architecting, securing, and automating enterprise
            network infrastructure across data center, campus, WAN, and hybrid cloud environments in regulated financial services.
            Proven track record of delivering measurable impact—consolidated 1,200+ firewall rules into ~400 Zero Trust policies,
            drove SD-WAN migration across 25+ branches boosting SLAs from 95% to 99.5%, and automated 50+ switch deployments
            via Ansible/Terraform cutting provisioning time significantly. Holds AWS Security Specialty, AWS Advanced Networking,
            Azure Network Engineer (AZ-700), and CCNA certifications.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <SectionDivider title="Experience" />
          <div>
            {sortedJobs.map((job) => (
              <article
                key={job.company}
                className="flex flex-col md:flex-row gap-4 md:gap-8 py-8 border-t border-slate-800/60 first:border-t-0"
              >
                <div className="md:w-[130px] shrink-0">
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
                  <ul className="mb-4 space-y-2">
                    {job.content
                      .split('\n')
                      .filter((line) => line.startsWith('- '))
                      .map((line, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-400">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                          {line.slice(2)}
                        </li>
                      ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-teal-950/40 text-teal-300 border border-teal-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-12">
          <SectionDivider title="Certifications" />
          <div className="grid sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.code}
                className="rounded-xl border border-slate-800/60 bg-slate-800/20 p-4"
              >
                <p className="text-slate-200 text-sm font-medium leading-snug mb-1">{cert.name}</p>
                <p className="text-slate-500 text-xs">{cert.issuer}</p>
                <span className="mt-2 inline-flex items-center rounded-full bg-teal-400/10 px-2.5 py-0.5 text-xs font-medium text-teal-300 ring-1 ring-inset ring-teal-400/20">
                  {cert.code}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <SectionDivider title="Technical Skills" />
          <div className="space-y-4">
            {SKILLS.map(({ category, items }) => (
              <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                <span className="text-xs font-semibold text-slate-400 sm:w-40 shrink-0 pt-0.5">
                  {category}
                </span>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {items.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionDivider title="Education" />
          <div>
            {sortedEducation.map((edu) => (
              <article
                key={edu.school}
                className="flex flex-col md:flex-row gap-4 md:gap-8 py-7 border-t border-slate-800/60 first:border-t-0"
              >
                <div className="md:w-[130px] shrink-0">
                  <span className="text-xs font-medium text-slate-500 tracking-widest uppercase tabular-nums">
                    {edu.startDate} — {edu.endDate ?? 'Present'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-200 font-semibold text-base mb-0.5">
                    {edu.summary}
                  </h3>
                  <p className="text-slate-500 text-sm">{edu.school}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
