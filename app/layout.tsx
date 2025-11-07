import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Discipline Mastery',
  description: 'Build unshakeable discipline through proven strategies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
