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

export const metadata: Metadata = {
  title: 'Healthcare Management System for Schools & Barangay Health Centers',
  description: 'MED-Alert provides comprehensive healthcare management for Philippine school clinics (Grades 7-12) and barangay health centers. Features include patient record management, disease outbreak detection, automated alerts, and compliance tracking. Built for DepEd schools and LGU health facilities.',
  keywords: [
    'school clinic management',
    'barangay health center software',
    'student health records',
    'disease outbreak detection',
    'medical alert system Philippines',
    'DepEd clinic software',
    'healthcare compliance tracking',
    'electronic medical records',
  ],
  openGraph: {
    title: 'MED-Alert - Healthcare Management System for Philippine Schools & Barangays',
    description: 'Streamline clinic operations, track patient records, and detect disease outbreaks with MED-Alert. Purpose-built for Philippine school clinics and barangay health centers.',
    url: '/',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'MED-Alert - Healthcare Management System',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
};

export default function LandingPage() {
  return (
    <>
      <OrganizationSchema />
      <SoftwareSchema />
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <ValueBar />
        <section id="features">
          <Features />
        </section>
        <Demo />
        <section id="about">
          <Roles />
        </section>
        <Alerts />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
