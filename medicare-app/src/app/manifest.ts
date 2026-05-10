import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MED-Alert — Medical Electronic Database with Alert System',
    short_name: 'MED-Alert',
    description: 'Free healthcare management system for Philippine school clinics and barangay health centers. Digitize patient records, detect outbreaks, and send automated health alerts.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#C41E3A',
    lang: 'en-PH',
    dir: 'ltr',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['health', 'medical', 'productivity', 'education'],
    orientation: 'portrait-primary',
    prefer_related_applications: false,
    shortcuts: [
      {
        name: 'Get Started',
        short_name: 'Login',
        description: 'Sign in to MED-Alert',
        url: '/login',
        icons: [{ src: '/logo.png', sizes: '96x96', type: 'image/png' }],
      },
    ],
  };
}
