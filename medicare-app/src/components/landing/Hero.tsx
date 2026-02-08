'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ParticleBackground } from '@/components/animations/ParticleBackground';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(196, 30, 58, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(230, 57, 70, 0.06) 0%, transparent 50%),
            linear-gradient(135deg, #FFFFFF 0%, #FFF5F6 100%)
          `,
        }}
      />

      {/* Particle animation */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Subline text */}
        <p
          className={`text-sm sm:text-base md:text-lg text-medicare-dark-gray/70 font-normal tracking-widest mb-4 transition-all duration-700 ease-out ${
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          Medical Electronic Database with Alert System
        </p>

        {/* Main heading with gradient text */}
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 transition-all duration-700 delay-200 ease-out ${
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontSize: 'clamp(36px, 8vw, 96px)',
          }}
        >
          <span className="text-medicare-red">MED-Alert</span>
        </h1>

        {/* Tagline */}
        <p
          className={`text-lg sm:text-xl md:text-2xl text-medicare-dark-gray/70 font-normal mb-12 max-w-2xl mx-auto transition-all duration-700 delay-300 ease-out ${
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontSize: 'clamp(18px, 3vw, 28px)',
          }}
        >
          Your Trusted Healthcare Partner
        </p>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-500 ease-out ${
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <Link href="/login">
            <Button
              size="lg"
              className="cta-button text-white text-lg px-12 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)',
                boxShadow: '0 8px 24px rgba(196, 30, 58, 0.3), 0 4px 8px rgba(196, 30, 58, 0.2)',
              }}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
