'use client';

import { Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const demoFeatures = [
  'Intuitive dashboard design',
  'Quick patient lookup',
  'Real-time notifications',
];

export function Demo() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-[120px] px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 245, 246, 0.5) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div
            className={cn(
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            )}
          >
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-medicare-red"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
            >
              Powerful. Intuitive. Efficient.
            </h2>
            <p className="text-xl text-medicare-medium-gray mb-8 leading-relaxed">
              Experience healthcare management reimagined
            </p>

            {/* Feature checklist */}
            <ul className="space-y-4">
              {demoFeatures.map((feature, index) => (
                <li
                  key={feature}
                  className={cn(
                    'flex items-center gap-3 transition-all duration-500',
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-medicare-red/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-medicare-red" strokeWidth={3} />
                  </div>
                  <span className="text-medicare-dark-gray/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Device mockup */}
          <div
            className={cn(
              'relative transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            )}
            style={{ perspective: '1000px' }}
          >
            {/* Device frame */}
            <div
              className="relative rounded-3xl p-5 transition-transform duration-500 hover:rotate-y-0 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.08)',
                transform: 'rotateY(-5deg) rotateX(5deg)',
              }}
            >
              {/* Screen content */}
              <div
                className="rounded-2xl overflow-hidden aspect-video"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F6 100%)',
                }}
              >
                {/* Dashboard preview mockup */}
                <div className="p-6 h-full">
                  {/* Header bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl" style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)' }} />
                      <div>
                        <div className="h-3 w-24 bg-medicare-dark-gray/20 rounded" />
                        <div className="h-2 w-16 bg-medicare-dark-gray/10 rounded mt-1" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-lg bg-medicare-red/10" />
                      <div className="w-8 h-8 rounded-lg bg-medicare-bright-red/10" />
                    </div>
                  </div>

                  {/* Stats cards */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="h-2 w-8 bg-medicare-medium-gray/20 rounded mb-2" />
                        <div className="h-4 w-12 bg-medicare-red/30 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Content area */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm">
                      <div className="h-2 w-20 bg-medicare-dark-gray/20 rounded mb-3" />
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-3 bg-medicare-light-gray rounded" />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="h-2 w-12 bg-medicare-dark-gray/20 rounded mb-3" />
                      <div className="h-16 bg-medicare-bright-red/20 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification cards */}
            <div
              className="absolute -top-4 -left-8 bg-white rounded-2xl px-5 py-4 shadow-lg flex items-center gap-3 animate-float"
              style={{ boxShadow: '0 8px 32px rgba(196, 30, 58, 0.2)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg" style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)' }}>
                ✓
              </div>
              <span className="font-semibold text-medicare-dark-gray whitespace-nowrap">
                Record Created
              </span>
            </div>

            <div
              className="absolute top-1/2 -right-12 bg-white rounded-2xl px-5 py-4 shadow-lg flex items-center gap-3 animate-float-delay-1"
              style={{ boxShadow: '0 8px 32px rgba(196, 30, 58, 0.2)' }}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white text-lg">
                ⚠
              </div>
              <span className="font-semibold text-medicare-dark-gray whitespace-nowrap">
                Low Stock Alert
              </span>
            </div>

            <div
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-4 shadow-lg flex items-center gap-3 animate-float-delay-2"
              style={{ boxShadow: '0 8px 32px rgba(196, 30, 58, 0.2)' }}
            >
              <div className="w-10 h-10 rounded-xl bg-medicare-red flex items-center justify-center text-white text-lg">
                📅
              </div>
              <span className="font-semibold text-medicare-dark-gray whitespace-nowrap">
                Appointment Today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
