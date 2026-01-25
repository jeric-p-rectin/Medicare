'use client';

import { FileText, Bell, BarChart3, ClipboardList, Calendar, LineChart } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: LineChart,
    title: 'Analytics',
    description: 'Data-driven health insights',
  },
  // {
  //   icon: FileText,
  //   title: 'Medical Records',
  //   description: 'Digital EMR system for complete patient history',
  // },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Real-time notifications for Disease Outbreaks',
  },
  {
    icon: BarChart3,
    title: 'Disease Tracking',
    description: 'Monitor health trends across the School',
  },
  // {
  //   icon: ClipboardList,
  //   title: 'Prescriptions',
  //   description: 'Efficient medication management system',
  // },
  // {
  //   icon: Calendar,
  //   title: 'Appointments',
  //   description: 'Streamlined scheduling and reminders',
  // },
];

export function Features() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-[120px] px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className={cn(
              'text-4xl sm:text-5xl font-extrabold mb-4 text-medicare-red transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}
          >
            Comprehensive Healthcare Tools
          </h2>
          <p
            className={cn(
              'text-lg text-medicare-medium-gray max-w-2xl mx-auto transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Everything you need to manage patient care efficiently
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'group text-center p-10 rounded-3xl bg-white relative overflow-hidden transition-all duration-500 hover:-translate-y-3',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{
                boxShadow: '0 4px 24px rgba(196, 30, 58, 0.08)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Top border animation */}
              <div
                className="absolute top-0 left-0 w-full h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{
                  background: 'linear-gradient(90deg, #C41E3A, #E63946)',
                }}
              />

              {/* Icon wrapper */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                {/* Rotated diamond background */}
                <div
                  className="absolute inset-0 rounded-3xl rotate-45 transition-all duration-500 group-hover:rotate-[225deg] group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(230, 57, 70, 0.1))',
                  }}
                />
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <feature.icon className="w-12 h-12 text-medicare-red transition-all duration-300 group-hover:text-medicare-bright-red group-hover:scale-110" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-medicare-dark-gray mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-medicare-medium-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
