import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        'surface-2': '#161616',
        accent: {
          DEFAULT: '#6366f1',
          hover: '#818cf8',
          muted: 'rgba(99,102,241,0.12)',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          hover: '#22d3ee',
          muted: 'rgba(6,182,212,0.12)',
        },
        violet: {
          DEFAULT: '#8b5cf6',
          muted: 'rgba(139,92,246,0.12)',
        },
        emerald: {
          DEFAULT: '#10b981',
          muted: 'rgba(16,185,129,0.12)',
        },
        rose: {
          DEFAULT: '#f43f5e',
          muted: 'rgba(244,63,94,0.12)',
        },
        amber: {
          DEFAULT: '#f59e0b',
          muted: 'rgba(245,158,11,0.12)',
        },
        secondary: '#a1a1aa',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 30px rgba(99,102,241,0.22), 0 0 60px rgba(99,102,241,0.08)',
        'glow-accent-sm': '0 0 16px rgba(99,102,241,0.3)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.22), 0 0 60px rgba(6,182,212,0.08)',
        'glow-cyan-sm': '0 0 16px rgba(6,182,212,0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.15) 0%, rgba(6,182,212,0.05) 50%, transparent 100%)',
        'accent-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
        'text-gradient': 'linear-gradient(135deg, #e0e0ff 0%, #a5b4fc 40%, #67e8f9 100%)',
      },
    },
  },
  plugins: [],
}

export default config
