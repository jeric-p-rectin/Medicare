const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medalertportal.com';

export function SoftwareSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${BASE_URL}/#software`,
    name: 'MED-Alert',
    alternateName: 'Medical Electronic Database with Alert System',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Medical Records Management',
    operatingSystem: 'Web (any browser)',
    browserRequirements: 'Requires a modern web browser (Chrome, Firefox, Edge, Safari)',
    url: BASE_URL,
    downloadUrl: `${BASE_URL}/login`,

    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PHP',
      availability: 'https://schema.org/InStock',
      description: 'Free for Philippine school clinics and barangay health centers',
    },

    description: 'MED-Alert is a free, web-based healthcare management system designed for Philippine school clinics (Grades 7–12) and LGU barangay health centers. Features include electronic patient records, real-time disease outbreak detection, automated health alerts, role-based access control, and compliance audit logging.',

    featureList: [
      'Electronic Patient Record Management',
      'Real-time Disease Outbreak Detection',
      'Automated Health Alerts & Notifications',
      'Medical History & Visit Tracking',
      'Role-based Access Control (Nurse, Doctor, Admin)',
      'Compliance Audit Logging',
      'School Clinic & Barangay Health Center Support',
      'Student Health Records (Grades 7–12)',
      'Disease Trend Analytics & Reports',
      'Secure Data Encryption',
    ],

    screenshot: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/og-image.png`,
      caption: 'MED-Alert healthcare dashboard for school clinics',
    },

    softwareVersion: '1.0',
    releaseNotes: `${BASE_URL}`,
    datePublished: '2024-01-01',
    inLanguage: ['en-PH', 'fil'],

    audience: {
      '@type': 'Audience',
      audienceType: 'School Nurses, Barangay Health Workers, DepEd Schools, LGU Health Centers',
      geographicArea: {
        '@type': 'Country',
        name: 'Philippines',
      },
    },

    provider: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'MED-Alert',
      url: BASE_URL,
    },

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '12',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
