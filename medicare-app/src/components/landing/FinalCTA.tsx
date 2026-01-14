'use client';

import Link from 'next/link';
import { CheckCircle, Shield, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const trustIndicators = [
  { icon: CheckCircle, text: 'Free Forever' },
  { icon: Shield, text: 'Secure & Private' },
  { icon: Clock, text: 'Setup in Minutes' },
];

export function FinalCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-[150px] px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.05) 0%, rgba(230, 57, 70, 0.05) 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Heading */}
        <h2
          className={cn(
            'text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-medicare-red transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ fontSize: 'clamp(40px, 6vw, 64px)' }}
        >
          Ready to Transform Healthcare Management?
        </h2>

        {/* Subtitle */}
        <p
          className={cn(
            'text-xl text-medicare-medium-gray mb-12 transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          Start improving patient care today
        </p>

        {/* CTA Button */}
        <div
          className={cn(
            'transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Link href="/login">
            <Button
              size="lg"
              className="group mega-cta text-white text-xl px-16 py-7 rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-400 inline-flex items-center gap-4"
              style={{
                background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)',
                boxShadow: '0 16px 48px rgba(196, 30, 58, 0.4), 0 8px 16px rgba(196, 30, 58, 0.2)',
              }}
            >
              <span className="relative z-10">Get Started Now</span>
              <span className="relative z-10 text-2xl transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div
          className={cn(
            'flex flex-wrap justify-center gap-8 sm:gap-12 mt-16 transition-all duration-700 delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {trustIndicators.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 text-medicare-dark-gray/70"
            >
              <item.icon className="w-6 h-6 text-medicare-red" />
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
