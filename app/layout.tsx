import React from "react"
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'XO - Workspaces for AI Agents',
  description: 'The environment where your agents do real work, and you see exactly what that work costs and delivers.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/xo-logo.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#83d63a",
          colorPrimaryForeground: "#000000",
          colorBackground: "#0a0a0a",
          colorForeground: "#ffffff",
          colorNeutral: "#ffffff",
          colorInput: "#141414",
          colorInputForeground: "#ffffff",
          borderRadius: "0.25rem",
        },
      }}
    >
      <html lang="en">
        <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
