'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-28 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col md:flex-row items-center md:items-start gap-12"
        >
          {/* ─── Avatar ─────────────────────────────────────── */}
          <div className="shrink-0" aria-hidden="true">
            <div
              className="
                w-36 h-36 sm:w-40 sm:h-40 rounded-full
                overflow-hidden
                flex items-center justify-center
                text-3xl font-semibold text-secondary
                select-none
              "
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
                padding: '2px',
              }}
              /*
               * Swap the inner div with a Next.js Image component when you have a photo:
               *   import Image from 'next/image'
               *   <Image src="/avatar.jpg" alt="Hendi Valentino" width={160} height={160} className="object-cover w-full h-full" priority />
               */
            >
              {/* Inner circle to create the ring effect */}
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-3xl font-semibold text-secondary">
                HV
              </div>
            </div>
          </div>

          {/* ─── Bio ────────────────────────────────────────── */}
          <div>
            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight mb-6 gradient-text"
            >
              About Me
            </h2>
            <div className="space-y-4 text-secondary leading-[1.8] text-base">
              <p>
                I am a seasoned cloud engineer with a versatile skill set across various cloud
                platforms and services. My career has been devoted to enabling organisations to
                harness the full potential of cloud technology for improved operations and enhanced
                security. I&apos;ve worked extensively with AWS and Azure, designing and managing
                cloud infrastructure to ensure scalability and reliability for businesses.
              </p>
              <p>
                I&apos;ve specialised in Microsoft Dynamics 365 (D365), Azure Sentinel, and
                Microsoft Cloud App Security (MCAS) to protect cloud environments and data.
                Leveraging Azure DevOps, I promote team collaboration and streamline deployment
                pipelines. I&apos;m passionate about staying at the forefront of cloud technology,
                continuously improving security postures, and delivering innovative solutions that
                drive business success within the cloud ecosystem.
              </p>
            </div>

            {/* ─── Quick facts / highlights ─────────────────── */}
            <ul
              className="mt-7 flex flex-wrap gap-x-8 gap-y-2 text-sm text-secondary"
              aria-label="Quick facts"
            >
              <li className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">▸</span>
                Cloud Infrastructure & Security
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">▸</span>
                AWS · Azure · Microsoft 365
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">▸</span>
                Open to Remote &amp; Hybrid Roles
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
