'use client'

import { useCallback } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export default function Hero() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* ─── Ambient background glow ────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 35%, rgba(6,182,212,0.05) 60%, transparent 80%)',
        }}
      />
      {/* subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ─── Content ────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-5 gradient-text-accent inline-block"
        >
          {/* Available for new opportunities */}
          Open to New Opportunities
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.06] mb-5 gradient-text"
        >
          Hendi Valentino
        </motion.h1>

        {/* Role / tagline */}
        <motion.p
          variants={fadeUp}
          className="text-xl sm:text-2xl text-secondary font-light mb-4 leading-snug"
        >
          Cloud Engineer & Security Specialist
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base text-secondary/80 max-w-xl mx-auto mb-11 leading-relaxed"
        >
          I help organisations harness the full potential of cloud technology — designing
          scalable infrastructure on AWS &amp; Azure, hardening security postures, and
          streamlining delivery with DevOps practices.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="px-7 py-3 font-medium rounded-lg text-sm text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:shadow-glow-accent hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #06b6d4 100%)' }}
            aria-label="Scroll down to view my projects"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-7 py-3 border border-white/10 hover:border-accent text-secondary hover:text-white font-medium rounded-lg text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Scroll down to contact section"
          >
            Contact
          </button>
        </motion.div>
      </motion.div>

      {/* ─── Scroll indicator ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.18em] uppercase text-secondary/40">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/10 to-transparent" />
      </motion.div>
    </section>
  )
}
