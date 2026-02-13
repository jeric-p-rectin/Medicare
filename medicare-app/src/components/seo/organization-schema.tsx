export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HealthcareOrganization',
    name: 'MED-Alert',
    alternateName: 'Medical Electronic Database with Alert System',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://medalertportal.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://medalertportal.com'}/logo.png`,
    description: 'Professional healthcare management system for Philippine school clinics and barangay health centers.',

    medicalSpecialty: [
      'PublicHealth',
      'PreventiveMedicine',
      'StudentHealth'
    ],

    areaServed: {
      '@type': 'Country',
      name: 'Philippines',
    },

    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Filipino'],
    },

    knowsAbout: [
      'Healthcare Management',
      'Electronic Health Records',
      'Disease Surveillance',
      'Public Health Monitoring',
      'School Health Services',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
