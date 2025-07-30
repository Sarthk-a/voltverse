import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ComparEV – Compare Electric Vehicles Side by Side in India",
  description:
    "Compare EVs in India using real-world specs. Find your best match based on range, charging, price, and cost-efficiency. Built for the EV-first future.",
  keywords:
    "electric vehicles, EV comparison, India, Tata Nexon EV, MG ZS EV, BYD Atto 3, Hyundai Ioniq 5, EV vs petrol car, electric car calculator",
  authors: [{ name: "ComparEV Team" }],
  creator: "ComparEV",
  publisher: "ComparEV",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://comparev.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ComparEV – Compare Electric Vehicles Side by Side in India",
    description:
      "Compare EVs in India using real-world specs. Find your best match based on range, charging, price, and cost-efficiency.",
    url: "https://comparev.in",
    siteName: "ComparEV",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ComparEV - India's EV Comparison Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ComparEV – Compare Electric Vehicles Side by Side in India",
    description:
      "Compare EVs in India using real-world specs. Find your best match based on range, charging, price, and cost-efficiency.",
    images: ["/og-image.jpg"],
    creator: "@ComparEV",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
