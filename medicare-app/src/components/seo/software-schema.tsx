export function SoftwareSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MED-Alert',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Medical Records Management',
    operatingSystem: 'Web-based',

    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PHP',
    },

    description: 'Comprehensive healthcare management system for school clinics and barangay health centers. Features patient records, outbreak detection, and automated alerts.',

    featureList: [
      'Patient Record Management',
      'Disease Outbreak Detection',
      'Automated Health Alerts',
      'Medical History Tracking',
      'Compliance Audit Logging',
      'Role-based Access Control',
    ],

    screenshot: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://medalertportal.com'}/logo.png`,

    targetProduct: {
      '@type': 'MedicalBusiness',
      name: 'School Clinics and Barangay Health Centers',
    },

    provider: {
      '@type': 'Organization',
      name: 'MED-Alert',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
