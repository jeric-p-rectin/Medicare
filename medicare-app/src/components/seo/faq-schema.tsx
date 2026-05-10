const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medalertportal.com';

const faqs = [
  {
    question: 'What is MED-Alert?',
    answer: 'MED-Alert (Medical Electronic Database with Alert System) is a free, web-based healthcare management platform built specifically for Philippine school clinics (Grades 7–12) and barangay health centers. It enables school nurses and health workers to digitize patient records, detect disease outbreaks in real time, and send automated health alerts.',
  },
  {
    question: 'Is MED-Alert free to use?',
    answer: 'Yes. MED-Alert is completely free for Philippine school clinics, DepEd institutions, and LGU barangay health centers. There are no subscription fees or hidden charges.',
  },
  {
    question: 'What features does MED-Alert offer?',
    answer: 'MED-Alert includes electronic patient record management, real-time disease outbreak detection, automated health alerts and notifications, medical history tracking, role-based access control for nurses, doctors, and admins, compliance audit logging, and disease trend analytics and reports.',
  },
  {
    question: 'Who can use MED-Alert?',
    answer: 'MED-Alert is designed for school nurses, clinic staff, barangay health workers, LGU health officers, and DepEd school administrators managing health services for Grades 7–12 students and community members in the Philippines.',
  },
  {
    question: 'How does MED-Alert detect disease outbreaks?',
    answer: 'MED-Alert monitors patient records and visit data in real time. When multiple students or patients present with the same symptoms or diagnoses within a defined period, the system automatically generates an alert and notifies the appropriate clinic staff and administrators.',
  },
  {
    question: 'Is patient data secure in MED-Alert?',
    answer: 'Yes. MED-Alert uses role-based access control so only authorized personnel can view sensitive patient information. All data is encrypted and access is logged for compliance and audit purposes.',
  },
  {
    question: 'Does MED-Alert work on mobile devices?',
    answer: 'Yes. MED-Alert is fully responsive and works on smartphones, tablets, and desktop computers using any modern web browser — no app download required.',
  },
  {
    question: 'How do I get started with MED-Alert?',
    answer: `You can get started by visiting ${BASE_URL}/login and registering your clinic. Setup takes only a few minutes and no technical expertise is required.`,
  },
];

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
