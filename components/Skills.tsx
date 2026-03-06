'use client'

import { motion } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────
// Skills data — update to reflect your real stack
const SKILL_GROUPS: { category: string; skills: string[]; color: string; bg: string }[] = [
  {
    category: 'Cloud Platforms',
    color: '#a5b4fc',
    bg: 'rgba(99,102,241,0.1)',
    skills: ['AWS', 'Microsoft Azure', 'Microsoft 365', 'Azure Active Directory'],
  },
  {
    category: 'Security',
    color: '#67e8f9',
    bg: 'rgba(6,182,212,0.1)',
    skills: [
      'Azure Sentinel',
      'Microsoft Cloud App Security (MCAS)',
      'Microsoft Defender',
      'Microsoft Phish Test',
      'Zero Trust Architecture',
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    color: '#6ee7b7',
    bg: 'rgba(16,185,129,0.1)',
    skills: [
      'Azure DevOps',
      'CI/CD Pipelines',
      'Infrastructure as Code',
      'Terraform',
      'Docker',
      'Git',
    ],
  },
  {
    category: 'Business Applications',
    color: '#fcd34d',
    bg: 'rgba(245,158,11,0.1)',
    skills: [
      'Microsoft Dynamics 365',
      'CRM & ERP Solutions',
      'Power Platform',
      'SharePoint',
      'Teams',
    ],
  },
]

// ─── Animation variants ───────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

// ─── Component ────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-28 px-6 bg-surface"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 gradient-text-accent inline-block">
            What I work with
          </p>
          <h2
            id="skills-heading"
            className="text-3xl font-bold tracking-tight mb-3 gradient-text"
          >
            Skills & Tech Stack
          </h2>
          <p className="text-secondary text-sm leading-relaxed max-w-md">
            Technologies I work with day-to-day — from cloud infrastructure to enterprise security.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-10">
          {SKILL_GROUPS.map(({ category, skills, color, bg }, groupIndex) => (
            <motion.div
              key={category}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: groupIndex * 0.05 }}
            >
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                  aria-hidden="true"
                />
                {category}
              </h3>
              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="flex flex-wrap gap-2"
                role="list"
                aria-label={`${category} skills`}
              >
                {skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={itemVariants}
                    role="listitem"
                    style={{'--pill-color': color, '--pill-bg': bg} as React.CSSProperties}
                    className="
                      px-4 py-1.5 rounded-full text-sm
                      text-secondary
                      border border-white/[0.08]
                      bg-background
                      hover:text-white
                      transition-all duration-200
                      cursor-default
                    "
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = color
                      el.style.background = bg
                      el.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = ''
                      el.style.background = ''
                      el.style.color = ''
                    }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
