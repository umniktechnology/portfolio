import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>

      {/* ─── Contact / Footer ──────────────────────────────────── */}
      <footer
        id="contact"
        aria-labelledby="contact-heading"
        className="py-20 px-6 border-t border-white/[0.06]"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-5"
          >
            Let&apos;s Build Something in the Cloud.
          </h2>
          <p className="text-secondary leading-relaxed mb-8 text-base">
            I&apos;m always open to discussing new cloud projects, security challenges, or
            opportunities to collaborate. Drop me a message — I&apos;ll get back to you promptly.
          </p>

          <a
            href="mailto:hendi@umniktech.com"
            className="inline-block px-7 py-3 rounded-lg border border-accent text-accent font-medium hover:bg-accent hover:text-white transition-all duration-200 hover:shadow-glow-accent-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Send an email to Hendi Valentino"
          >
            hendi@umniktech.com
          </a>

          {/* ─── Social links (commented out) ─────────────────────
          <nav aria-label="Social links" className="mt-10">
            <ul className="flex justify-center gap-6 text-sm text-secondary" role="list">
              <li>
                <a href="https://github.com/hendivalentino" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200" aria-label="GitHub profile">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/hendi-valentino-507b36126/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200" aria-label="LinkedIn profile">LinkedIn</a>
              </li>
              <li>
                <a href="https://twitter.com/hendivalentino" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200" aria-label="Twitter / X profile">Twitter</a>
              </li>
            </ul>
          </nav>
          ───────────────────────────────────────────────────── */}

          <p className="mt-12 text-xs text-secondary/60">
            © {new Date().getFullYear()} Hendi Valentino. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
