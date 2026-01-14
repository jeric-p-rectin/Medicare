'use client';

import { Users, FileText, User } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const roles = [
  {
    icon: Users,
    title: 'Super Admin',
    description: 'Complete system control & user management',
    badge: 'Full Access',
  },
  {
    icon: FileText,
    title: 'Health Worker',
    description: 'Patient care & records management',
    badge: 'Staff',
  },
  {
    icon: User,
    title: 'Patient',
    description: 'View records & manage appointments',
    badge: 'Personal',
  },
];

export function Roles() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-[120px] px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className={cn(
              'text-4xl sm:text-5xl font-extrabold mb-4 text-medicare-red transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}
          >
            Who Can Use MED-Alert?
          </h2>
          <p
            className={cn(
              'text-lg text-medicare-medium-gray transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Tailored access for every user type
          </p>
        </div>

        {/* Roles grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {roles.map((role, index) => (
            <div
              key={role.title}
              className={cn(
                'group text-center p-12 rounded-[2rem] relative overflow-hidden transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-medicare-red',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f8fafb)',
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Background gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, #C41E3A, #E63946)',
                }}
              />

              {/* Icon container */}
              <div
                className="w-28 h-28 mx-auto mb-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(230, 57, 70, 0.1))',
                }}
              >
                <role.icon
                  className="w-16 h-16 text-medicare-red transition-colors duration-300 group-hover:text-white"
                  strokeWidth={1.5}
                />
                {/* Filled background on hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: 'linear-gradient(135deg, #C41E3A, #E63946)',
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-medicare-dark-gray mb-4 relative z-10">
                {role.title}
              </h3>

              {/* Description */}
              <p className="text-medicare-medium-gray mb-6 leading-relaxed relative z-10">
                {role.description}
              </p>

              {/* Badge */}
              <span
                className="inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-medicare-red relative z-10 transition-all duration-300 group-hover:bg-white group-hover:text-medicare-red"
                style={{
                  background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(230, 57, 70, 0.1))',
                }}
              >
                {role.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
