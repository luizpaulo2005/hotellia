import './globals.css'

import type { Metadata } from 'next'
import { JetBrains_Mono as JetBrainsMono, Outfit } from 'next/font/google'

import { HotelProvider } from '@/providers/hotel'
import { ThemeProvider } from '@/providers/theme'

const outfitSans = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

const jetBrainsMono = JetBrainsMono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hotellia',
  description: 'A modern hotel booking app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body
          className={`${outfitSans.variable} ${jetBrainsMono.variable} bg-background text-foreground flex min-h-screen flex-col !p-2 antialiased`}
        >
          <HotelProvider>{children}</HotelProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
