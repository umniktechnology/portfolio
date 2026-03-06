'use client'

import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────
interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  demo: string
  /** Set to true to pin this project (shows a visual marker) */
  featured?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────
// Projects data
const PROJECTS: Project[] = [
  {
    title: 'Cloud Security Posture Management',
    description:
      'Designed and implemented an end-to-end cloud security framework using Azure Sentinel and MCAS, enabling real-time threat detection, automated incident response, and centralised visibility across a multi-cloud environment.',
    tags: ['Azure Sentinel', 'MCAS', 'Microsoft Defender', 'Azure'],
    github: 'https://github.com/hendivalentino',
    demo: 'https://www.linkedin.com/in/hendi-valentino-507b36126/',
    featured: true,
  },
  {
    title: 'Azure Infrastructure Automation',
    description:
      'Built Infrastructure as Code pipelines using Terraform and Azure DevOps to provision and manage scalable cloud resources — cutting deployment time by over 60% and enforcing consistent environment configurations.',
    tags: ['Terraform', 'Azure DevOps', 'CI/CD', 'IaC'],
    github: 'https://github.com/hendivalentino',
    demo: 'https://www.linkedin.com/in/hendi-valentino-507b36126/',
  },
  {
    title: 'Dynamics 365 CRM/ERP Implementation',
    description:
      'Delivered tailored Microsoft Dynamics 365 solutions for CRM and ERP needs, integrating Power Platform automations that streamlined business processes and improved team productivity across departments.',
    tags: ['Dynamics 365', 'Power Platform', 'Azure AD', 'M365'],
    github: 'https://github.com/hendivalentino',
    demo: 'https://www.linkedin.com/in/hendi-valentino-507b36126/',
  },
]

// ─── Animation variants ───────────────────────────────────────────
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ─── Icons ────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-28 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 gradient-text-accent inline-block">
            What I've built
          </p>
          <h2
            id="projects-heading"
            className="text-3xl font-bold tracking-tight mb-3 gradient-text"
          >
            Selected Work
          </h2>
          <p className="text-secondary text-sm leading-relaxed max-w-md">
            A selection of cloud infrastructure and security projects I&apos;ve delivered.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Projects"
        >
          {PROJECTS.map((project, index) => (
            <motion.article
              key={`${project.title}-${index}`}
              variants={cardVariants}
              role="listitem"
              className="
                group relative flex flex-col
                bg-surface
                border border-white/[0.07]
                rounded-2xl p-6
                shadow-card
                hover:shadow-card-hover
                hover:-translate-y-1
                transition-all duration-300
              "
              style={{
                background: 'linear-gradient(145deg, #111111 0%, #0f0f0f 100%)',
              }}
              aria-label={`Project: ${project.title}`}
            >
              {/* gradient border on hover via pseudo-element workaround */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.2) 50%, rgba(6,182,212,0.35) 100%)',
                  margin: '-1px',
                }}
                aria-hidden="true"
              />
              {/* Featured badge */}
              {project.featured && (
                <span
                  className="absolute top-4 right-4 text-[10px] font-semibold tracking-widest uppercase rounded-full px-2 py-0.5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))',
                    border: '1px solid rgba(99,102,241,0.35)',
                    color: '#a5b4fc',
                  }}
                  aria-label="Featured project"
                >
                  Featured
                </span>
              )}

              {/* Title */}
              <h3 className="text-sm font-semibold mb-2 pr-16 text-white group-hover:text-accent-hover transition-colors duration-200">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-secondary leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              {/* Tech tags */}
              <ul
                className="flex flex-wrap gap-1.5 mb-5"
                role="list"
                aria-label="Technologies used"
              >
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    role="listitem"
                    className="px-2 py-0.5 text-[11px] rounded-full bg-background text-secondary border border-white/[0.07]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* Links */}
              <div className="flex items-center gap-5 text-xs text-secondary pt-3 border-t border-white/[0.06]">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  aria-label={`View source code for ${project.title} on GitHub`}
                >
                  <GitHubIcon />
                  Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  aria-label={`Open live demo of ${project.title}`}
                >
                  <ArrowUpRightIcon />
                  Live Demo
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/hendivalentino"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white transition-colors duration-200 group"
            aria-label="View all projects on GitHub"
          >
            View all on GitHub
            <span className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
