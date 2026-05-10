'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// ─── Trust element data ───────────────────────────────────────────────────────
const trustElements = [
  {
    id: 'trust-fast-alerts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: 'Fast Alerts',
  },
  {
    id: 'trust-secure-db',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: 'Secure Database',
  },
  {
    id: 'trust-realtime',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Real-Time',
  },
  {
    id: 'trust-clinic-ready',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: 'Clinic-Ready',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F6 60%, #FFE8EA 100%)',
      }}
    >
      {/* ── Shared background decorations ─────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft radial glow — top-right */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '55%', height: '70%',
          background: 'radial-gradient(circle, rgba(196,30,58,0.07) 0%, transparent 70%)',
        }} />
        {/* Soft radial glow — bottom-left */}
        <div style={{
          position: 'absolute', bottom: '-5%', left: '-5%',
          width: '40%', height: '50%',
          background: 'radial-gradient(circle, rgba(196,30,58,0.05) 0%, transparent 70%)',
        }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          LAYOUT CONTAINER
          Mobile  → single centered column  (no heart)
          Desktop → two-column grid         (content left, heart right)
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24 lg:py-0 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* ── LEFT / CENTER column: Content ────────────────────────────── */}
          {/*   Mobile  → items-center  text-center                           */}
          {/*   Desktop → items-start   text-left                             */}
          <div className={`flex flex-col items-center lg:items-start text-center lg:text-left
            transition-all duration-700 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Animated badge / overline */}
            <div
              id="hero-badge"
              className={`inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full
                border border-red-200 bg-red-50 text-medicare-red
                text-xs font-semibold tracking-widest uppercase
                transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-medicare-red animate-pulse" />
              Medical Electronic Database with Alert System
            </div>

            {/* Main heading */}
            <h1
              id="hero-heading"
              className={`font-extrabold tracking-tight text-medicare-red leading-none mb-4
                transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontSize: 'clamp(52px, 9vw, 108px)', transitionDelay: '200ms' }}
            >
              MED-Alert
            </h1>

            {/* Sub-heading */}
            <p
              id="hero-subheading"
              className={`font-medium text-gray-600 mb-2 leading-snug
                transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontSize: 'clamp(15px, 2.2vw, 22px)', transitionDelay: '300ms' }}
            >
              Medical Electronic Database with Alert System
            </p>

            {/* Tagline */}
            <p
              id="hero-tagline"
              className={`text-medicare-red font-semibold mb-10
                transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontSize: 'clamp(14px, 1.8vw, 20px)', transitionDelay: '350ms' }}
            >
              Your Trusted Healthcare Partner
            </p>

            {/* CTA button */}
            <div
              className={`mb-8 transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '450ms' }}
            >
              <Link href="/login" id="hero-cta-link">
                <Button
                  id="hero-cta-button"
                  size="lg"
                  className="cta-button text-white text-base px-10 py-6 rounded-full font-semibold
                    shadow-lg hover:shadow-xl hover:-translate-y-1
                    transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-red-300"
                  style={{
                    background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)',
                    boxShadow: '0 8px 24px rgba(196,30,58,0.35), 0 4px 8px rgba(196,30,58,0.2)',
                  }}
                >
                  Get Started
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                    className="ml-2 w-4 h-4">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>
              </Link>
            </div>

            {/* Trust elements — centered on mobile, left-aligned on desktop */}
            <div
              id="hero-trust-elements"
              className={`flex flex-wrap gap-3 justify-center lg:justify-start
                transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '550ms' }}
            >
              {trustElements.map((el) => (
                <div
                  key={el.id}
                  id={el.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg
                    bg-white/70 border border-red-100 shadow-sm backdrop-blur-sm"
                >
                  <span className="text-medicare-red">{el.icon}</span>
                  <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                    {el.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* ── END content column ────────────────────────────────────────── */}

          {/* ── RIGHT column: Heart visual — DESKTOP ONLY ─────────────────── */}
          <div
            id="hero-visual"
            className={`hidden lg:flex items-center justify-center
              transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '250ms' }}
          >
            <div
              id="hero-heart-container"
              className="hero-heart-float relative select-none flex items-center justify-center"
              style={{ width: 'clamp(400px, 70vw, 1000px)' }}
            >
              {/* Glowing aura behind the heart */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: '85%',
                  height: '85%',
                  background: 'radial-gradient(circle, rgba(220, 20, 60, 0.45) 0%, rgba(220, 20, 60, 0) 65%)',
                  filter: 'blur(50px)',
                  zIndex: -1,
                }}
              />
              <Image
                src="/Heart.svg"
                alt="Anatomical wireframe heart — MED-Alert visual"
                width={1000}
                height={1000}
                priority
                className="w-full h-auto"
                style={{
                  filter:
                    'drop-shadow(0 0 60px rgba(220,20,60,0.4)) ' +
                    'sepia(0.25) saturate(1.5) hue-rotate(-8deg)',
                }}
              />
            </div>
          </div>
          {/* ── END right column ──────────────────────────────────────────── */}

        </div>
      </div>
    </section>
  );
}
