import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medalertportal.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C41E3A',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "MED-Alert | Medical Electronic Database with Alert System for School Clinics",
    template: "%s | MED-Alert"
  },

  description: "MED-Alert is a free, web-based healthcare management system built for Philippine school clinics (Grades 7–12) and barangay health centers. Digitize patient records, detect disease outbreaks in real time, and send automated health alerts — all in one secure platform.",

  keywords: [
    // Core product
    "MED-Alert",
    "medical electronic database",
    "healthcare alert system",
    "school clinic management system",
    "barangay health center software",
    // Target users & locations
    "DepEd school clinic Philippines",
    "LGU health center software Philippines",
    "school nurse management system",
    "Philippine school health system",
    // Feature-specific
    "electronic medical records Philippines",
    "student health records system",
    "disease outbreak detection system",
    "automated health alerts school",
    "patient record management Philippines",
    "healthcare compliance tracking",
    "medical history tracking school",
    // Long-tail
    "free school clinic management software Philippines",
    "school health monitoring system Philippines",
    "DepEd clinic digital records",
    "barangay health center digitization",
    "real-time disease surveillance Philippines",
  ],

  authors: [{ name: "MED-Alert Development Team", url: BASE_URL }],
  creator: "MED-Alert",
  publisher: "MED-Alert",

  applicationName: "MED-Alert",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },

  manifest: '/manifest.webmanifest',

  openGraph: {
    type: 'website',
    locale: 'en_PH',
    alternateLocale: ['fil_PH'],
    url: BASE_URL,
    siteName: 'MED-Alert',
    title: 'MED-Alert — Free Healthcare Management System for Philippine School Clinics',
    description: 'Digitize your school clinic or barangay health center with MED-Alert. Free, secure, and built for the Philippines — patient records, outbreak detection, and real-time health alerts in one platform.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MED-Alert — Medical Electronic Database with Alert System',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@MedAlertPH',
    creator: '@MedAlertPH',
    title: 'MED-Alert — Free School Clinic Healthcare Management System',
    description: 'Free healthcare management for Philippine school clinics & barangay health centers. Real-time outbreak detection, automated alerts, and secure patient records.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        alt: 'MED-Alert — Medical Electronic Database with Alert System',
      }
    ],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-PH': BASE_URL,
    },
  },

  category: 'healthcare',
  classification: 'Healthcare Management Software',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PH">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
