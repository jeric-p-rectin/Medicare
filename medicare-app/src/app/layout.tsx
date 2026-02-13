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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C41E3A',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://medalertportal.com'),
  title: {
    default: "MED-Alert - Medical Electronic Database with Alert System",
    template: "%s | MED-Alert"
  },
  description: "Professional healthcare management system for Philippine school clinics and barangay health centers. Track patient records, detect disease outbreaks, and streamline clinic operations.",
  keywords: [
    "healthcare management system",
    "medical records system",
    "Philippine school clinic",
    "barangay health center",
    "DepEd clinic system",
    "disease outbreak detection",
    "health alert system",
    "student health records Philippines",
    "HIPAA-compliant healthcare",
    "secure medical database",
    "MED-Alert",
  ],
  authors: [{ name: "MED-Alert Development Team" }],
  creator: "MED-Alert",
  publisher: "MED-Alert",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: '/',
    siteName: 'MED-Alert',
    title: 'MED-Alert - Medical Electronic Database with Alert System',
    description: 'Professional healthcare management system for Philippine school clinics and barangay health centers. Track patient records, detect disease outbreaks, and streamline clinic operations.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'MED-Alert Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MED-Alert - Healthcare Management System',
    description: 'Professional healthcare management for Philippine clinics. Outbreak detection, patient records, and streamlined operations.',
    images: ['/logo.png'],
    creator: '@MedAlert',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  category: 'healthcare',
  classification: 'Healthcare Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
