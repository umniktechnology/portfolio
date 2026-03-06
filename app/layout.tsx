import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  // ─── Metadata ───────────────────────────────────────────────────
  title: 'Hendi Valentino — Cloud Engineer',
  description:
    'Seasoned Cloud Engineer specialising in AWS, Azure, Microsoft 365, DevOps, and cloud security — helping organisations scale securely in the cloud.',
  keywords: [
    'Hendi Valentino',
    'Cloud Engineer',
    'AWS',
    'Azure',
    'Microsoft 365',
    'DevOps',
    'Cloud Security',
    'portfolio',
  ],
  authors: [{ name: 'Hendi Valentino', url: 'https://www.linkedin.com/in/hendi-valentino-507b36126/' }],
  openGraph: {
    title: 'Hendi Valentino — Cloud Engineer',
    description:
      'Seasoned Cloud Engineer specialising in AWS, Azure, Microsoft 365, DevOps, and cloud security.',
    type: 'website',
    url: 'https://www.linkedin.com/in/hendi-valentino-507b36126/',
    siteName: 'Hendi Valentino',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hendi Valentino — Cloud Engineer',
    description:
      'Seasoned Cloud Engineer specialising in AWS, Azure, Microsoft 365, DevOps, and cloud security.',
    creator: '@hendivalentino',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-white antialiased min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
