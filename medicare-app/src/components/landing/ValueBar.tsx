'use client';

import { CheckCircle, Shield, Zap, Cloud } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: CheckCircle,
    title: 'Easy to Use',
    subtitle: 'Simple & Intuitive',
  },
  {
    icon: Shield,
    title: 'Secure',
    subtitle: 'Patient data protected',
  },
  {
    icon: Zap,
    title: 'Quick Setup',
    subtitle: 'Ready in minutes',
  },
  {
    icon: Cloud,
    title: 'Cloud-Based',
    subtitle: 'Access anywhere',
  },
];

export function ValueBar() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-12 px-4 sm:px-6 lg:px-20 border-t border-b"
      style={{
        background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.03) 0%, rgba(230, 57, 70, 0.03) 100%)',
        borderColor: 'rgba(196, 30, 58, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-4">
          {values.map((value, index) => (
            <div key={value.title} className="contents">
              {/* Value item */}
              <div
                className={cn(
                  'flex items-center gap-4 px-4 py-2 transition-all duration-500 group',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon container */}
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-[5deg] group-hover:bg-gradient-to-br group-hover:from-medicare-red group-hover:to-medicare-bright-red group-hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(230, 57, 70, 0.1))',
                  }}
                >
                  <value.icon className="w-7 h-7 text-medicare-red transition-colors duration-300 group-hover:text-white" />
                </div>

                {/* Text content */}
                <div>
                  <div className="text-lg font-bold text-medicare-dark-gray">
                    {value.title}
                  </div>
                  <div className="text-sm text-medicare-medium-gray font-medium">
                    {value.subtitle}
                  </div>
                </div>
              </div>

              {/* Divider - hidden on mobile and after last item */}
              {index < values.length - 1 && (
                <div
                  className="hidden lg:block w-px h-12"
                  style={{
                    background: 'linear-gradient(180deg, transparent, rgba(196, 30, 58, 0.2), transparent)',
                  }}
                />
              )}

              {/* Horizontal divider for mobile */}
              {index < values.length - 1 && (
                <div
                  className="lg:hidden w-4/5 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(196, 30, 58, 0.2), transparent)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
