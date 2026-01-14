'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled
        ? "bg-white/80 backdrop-blur-md border-b border-medicare-red/10"
        : "bg-transparent border-b border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="MED-Alert"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <span className="text-xl font-bold text-medicare-dark-gray">MED-Alert</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, '#features')}
              className="text-medicare-dark-gray/70 hover:text-medicare-red transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className="text-medicare-dark-gray/70 hover:text-medicare-red transition-colors font-medium"
            >
              About
            </a>
            <Link href="/login">
              <Button
                className="hover:opacity-90 text-white font-semibold px-6"
                style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)' }}
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-medicare-light-gray transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-medicare-dark-gray" />
            ) : (
              <Menu className="w-6 h-6 text-medicare-dark-gray" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={cn(
            "md:hidden py-4 border-t border-medicare-red/10",
            !isScrolled && "bg-white/95 backdrop-blur-md -mx-4 px-4"
          )}>
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={(e) => handleSmoothScroll(e, '#features')}
                className="text-medicare-dark-gray/70 hover:text-medicare-red transition-colors font-medium py-2"
              >
                Features
              </a>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, '#about')}
                className="text-medicare-dark-gray/70 hover:text-medicare-red transition-colors font-medium py-2"
              >
                About
              </a>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className="w-full hover:opacity-90 text-white font-semibold"
                  style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)' }}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
