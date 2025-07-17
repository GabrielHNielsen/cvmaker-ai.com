import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../components/AuthProvider'
import React from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'CVmaker.ai - AI Resume Builder',
  description: 'Create professional resumes with AI assistance',
  keywords: 'CV, resume, AI, job application, professional',
  authors: [{ name: 'CVmaker.ai' }],
  robots: 'index, follow',
  metadataBase: new URL('https://cvmaker-ai.com'),
  openGraph: {
    title: 'CVmaker.ai - AI Resume Builder',
    description: 'Create professional resumes with AI assistance',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.openai.com" />
        <link rel="dns-prefetch" href="https://api.canva.com" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
} 