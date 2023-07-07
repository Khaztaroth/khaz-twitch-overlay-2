// import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import './globals.css'

export const metadata = {
  title: 'Custom Twitch Overlay',
  description: 'Khaz\'s custom overlay for their twitch stream',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
