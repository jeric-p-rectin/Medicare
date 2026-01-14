'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const alerts = [
  {
    icon: '⚠️',
    title: 'Low Stock Alert',
    message: 'Paracetamol (500mg) - 5 units remaining',
    time: '2 minutes ago',
    borderColor: '#FF6B6B',
  },
  {
    icon: '📅',
    title: 'Upcoming Appointment',
    message: 'Maria Santos - Check-up at 2:00 PM',
    time: 'Today',
    borderColor: '#C41E3A',
  },
  {
    icon: '🔔',
    title: 'Expiry Warning',
    message: 'COVID-19 Vaccine Batch #A123 expires in 7 days',
    time: '5 hours ago',
    borderColor: '#FFA726',
  },
];

export function Alerts() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-[120px] px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, white 0%, rgba(255, 245, 246, 0.3) 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className={cn(
              'text-4xl sm:text-5xl font-extrabold mb-4 text-medicare-red transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}
          >
            Stay Ahead with Smart Alerts
          </h2>
          <p
            className={cn(
              'text-xl text-medicare-medium-gray transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Real-time notifications keep you informed
          </p>
        </div>

        {/* Alert cards */}
        <div className="space-y-5">
          {alerts.map((alert, index) => (
            <div
              key={alert.title}
              className={cn(
                'bg-white rounded-2xl p-6 flex items-start gap-4 transition-all duration-500 hover:translate-x-2 hover:scale-[1.02]',
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-24'
              )}
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                borderLeft: `4px solid ${alert.borderColor}`,
                transitionDelay: `${200 + index * 150}ms`,
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(230, 57, 70, 0.1))',
                }}
              >
                {alert.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-medicare-dark-gray mb-1">
                  {alert.title}
                </h3>
                <p className="text-medicare-dark-gray/70 text-sm mb-2 leading-relaxed">
                  {alert.message}
                </p>
                <span className="text-xs text-medicare-medium-gray font-medium">
                  {alert.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
