import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MED-Alert - Medical Electronic Database with Alert System',
    short_name: 'MED-Alert',
    description: 'Comprehensive healthcare management system for school clinics and barangay health centers in the Philippines',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#C41E3A',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    categories: ['healthcare', 'medical', 'productivity'],
    orientation: 'portrait-primary',
  };
}
