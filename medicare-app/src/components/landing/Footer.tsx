import Image from 'next/image';
import Link from 'next/link';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export function Footer() {
  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #263238 0%, #8B1A2E 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo and tagline */}
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="MED-Alert"
              width={48}
              height={48}
              className="brightness-0 invert"
            />
            <div>
              <span className="text-xl font-bold text-white">MED-Alert</span>
              <p className="text-white/60 text-sm">Medical Electronic Database with Alert System</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/70 text-sm font-medium hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} MED-Alert. Built for Philippine Barangay Health Centers.
          </p>
        </div>
      </div>
    </footer>
  );
}
