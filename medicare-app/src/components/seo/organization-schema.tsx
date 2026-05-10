const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medalertportal.com';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'HealthcareOrganization'],
    '@id': `${BASE_URL}/#organization`,
    name: 'MED-Alert',
    alternateName: [
      'Medical Electronic Database with Alert System',
      'MED-Alert Portal',
    ],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/og-image.png`,
    description: 'MED-Alert is a free, web-based healthcare management platform purpose-built for Philippine school clinics (Grades 7–12) and barangay health centers. It enables school nurses and health workers to manage patient records, detect disease outbreaks in real time, and send automated health alerts.',
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'Philippines',
      '@id': 'https://www.wikidata.org/wiki/Q928',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'School nurses, barangay health workers, LGU health officers, DepEd school administrators',
    },
    medicalSpecialty: [
      'PublicHealth',
      'PreventiveMedicine',
    ],
    knowsAbout: [
      'Electronic Health Records',
      'Disease Surveillance',
      'Public Health Monitoring',
      'School Health Services',
      'Barangay Health Center Management',
      'DepEd Health Compliance',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Filipino'],
    },
    sameAs: [
      `${BASE_URL}`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
