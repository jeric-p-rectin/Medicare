import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import {
  Hero,
  ValueBar,
  Features,
  Demo,
  Roles,
  Alerts,
  FinalCTA,
  Footer,
} from '@/components/landing';
import { OrganizationSchema } from '@/components/seo/organization-schema';
import { SoftwareSchema } from '@/components/seo/software-schema';
import { FAQSchema } from '@/components/seo/faq-schema';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medalertportal.com';

export const metadata: Metadata = {
  title: 'Free Healthcare Management System for Philippine School Clinics & Barangay Health Centers',
  description: 'MED-Alert helps school nurses and barangay health workers manage patient records, detect disease outbreaks, and send automated health alerts — for free. Trusted by DepEd schools and LGU health centers across the Philippines.',
  keywords: [
    'school clinic management Philippines',
    'barangay health center software free',
    'student health records system Philippines',
    'disease outbreak detection school',
    'medical alert system Philippine schools',
    'DepEd clinic software free',
    'electronic health records Philippines',
    'health monitoring school nurse',
    'LGU health center digitization',
    'free healthcare software Philippines',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'MED-Alert — Free Healthcare Management for Philippine School Clinics & Barangays',
    description: 'Digitize patient records, detect disease outbreaks in real time, and send automated alerts. MED-Alert is free, secure, and purpose-built for Philippine school clinics and barangay health centers.',
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MED-Alert — Healthcare Management System for Philippine School Clinics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MED-Alert — Free Healthcare Management for Philippine Schools & Barangays',
    description: 'Patient records, real-time disease outbreak detection, and automated health alerts — free for Philippine school clinics and barangay health centers.',
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function LandingPage() {
  return (
    <>
      {/* Structured Data / JSON-LD */}
      <OrganizationSchema />
      <SoftwareSchema />
      <FAQSchema />
      <BreadcrumbSchema />

      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <ValueBar />
        <section id="features" aria-labelledby="features-heading">
          <Features />
        </section>
        <Demo />
        <section id="about" aria-labelledby="about-heading">
          <Roles />
        </section>
        <Alerts />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
