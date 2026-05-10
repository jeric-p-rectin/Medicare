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
              'relative transition-all duration-700 delay-200 mt-12 lg:mt-0 flex justify-center',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            )}
            style={{ perspective: '1000px' }}
          >
            {/* Mobile scaling wrapper to perfectly fit floating elements */}
            <div className="relative w-[75%] sm:w-[80%] lg:w-[85%] max-w-[600px] mx-auto">
              
              {/* Device frame */}
              <div
                className="relative rounded-2xl sm:rounded-3xl p-3 sm:p-5 transition-transform duration-500 hover:rotate-y-0 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.08)',
                  transform: 'rotateY(-5deg) rotateX(5deg)',
                }}
              >
                {/* Screen content */}
                <div
                  className="rounded-xl sm:rounded-2xl overflow-hidden aspect-video"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F6 100%)',
                  }}
                >
                  {/* Dashboard preview mockup */}
                  <div className="p-3 sm:p-6 h-full flex flex-col justify-between">
                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-3 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-xl" style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)' }} />
                        <div>
                          <div className="h-2 sm:h-3 w-16 sm:w-24 bg-medicare-dark-gray/20 rounded" />
                          <div className="h-1.5 sm:h-2 w-10 sm:w-16 bg-medicare-dark-gray/10 rounded mt-1" />
                        </div>
                      </div>
                      <div className="flex gap-1 sm:gap-2">
                        <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-medicare-red/10" />
                        <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-medicare-bright-red/10" />
                      </div>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm">
                          <div className="h-1.5 sm:h-2 w-6 sm:w-8 bg-medicare-medium-gray/20 rounded mb-1 sm:mb-2" />
                          <div className="h-2 sm:h-4 w-8 sm:w-12 bg-medicare-red/30 rounded" />
                        </div>
                      ))}
                    </div>

                    {/* Content area */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="col-span-2 bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm">
                        <div className="h-1.5 sm:h-2 w-12 sm:w-20 bg-medicare-dark-gray/20 rounded mb-2 sm:mb-3" />
                        <div className="space-y-1.5 sm:space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-1.5 sm:h-3 bg-medicare-light-gray rounded" />
                          ))}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm">
                        <div className="h-1.5 sm:h-2 w-8 sm:w-12 bg-medicare-dark-gray/20 rounded mb-2 sm:mb-3" />
                        <div className="h-8 sm:h-16 bg-medicare-bright-red/20 rounded-md sm:rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification cards */}
              <div
                className="absolute bg-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-5 sm:py-4 shadow-lg flex items-center gap-2 sm:gap-3 animate-float z-10"
                style={{ top: '-6%', left: '-12%', boxShadow: '0 8px 32px rgba(196, 30, 58, 0.2)' }}
              >
                <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-xl flex items-center justify-center text-white text-xs sm:text-lg" style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)' }}>
                  ✓
                </div>
                <span className="font-semibold text-[10px] sm:text-base text-medicare-dark-gray whitespace-nowrap">
                  Record Created
                </span>
              </div>

              <div
                className="absolute bg-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-5 sm:py-4 shadow-lg flex items-center gap-2 sm:gap-3 animate-float-delay-1 z-10"
                style={{ top: '40%', right: '-15%', boxShadow: '0 8px 32px rgba(196, 30, 58, 0.2)' }}
              >
                <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-xl bg-amber-500 flex items-center justify-center text-white text-xs sm:text-lg">
                  ⚠
                </div>
                <span className="font-semibold text-[10px] sm:text-base text-medicare-dark-gray whitespace-nowrap">
                  Disease Trend Alert
                </span>
              </div>

              <div
                className="absolute bg-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-5 sm:py-4 shadow-lg flex items-center gap-2 sm:gap-3 animate-float-delay-2 z-10"
                style={{ bottom: '-5%', left: '-6%', boxShadow: '0 8px 32px rgba(196, 30, 58, 0.2)' }}
              >
                <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-xl bg-medicare-red flex items-center justify-center text-white text-xs sm:text-lg">
                  📅
                </div>
                <span className="font-semibold text-[10px] sm:text-base text-medicare-dark-gray whitespace-nowrap">
                  Patients Management
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
