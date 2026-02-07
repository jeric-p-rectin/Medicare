import { AlertTriangle, Users, Info, TrendingUp } from 'lucide-react';
import type { AlertType, AlertSeverity } from '@/types/alert';
import { cn } from '@/lib/utils';

interface AlertIconProps {
  type: AlertType;
  severity: AlertSeverity;
  className?: string;
}

// Module-level constant mapping to prevent component creation during render
const ALERT_TYPE_ICONS: Record<AlertType, typeof AlertTriangle> = {
  OUTBREAK_SUSPECTED: AlertTriangle,
  DUPLICATE_DETECTED: Users,
  DISEASE_TREND: TrendingUp,
  SYSTEM: Info,
} as const;

export function AlertIcon({ type, severity, className }: AlertIconProps) {
  const getSeverityColors = (severity: AlertSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-red-600 bg-red-50';
      case 'HIGH':
        return 'text-orange-600 bg-orange-50';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50';
      case 'LOW':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const Icon = ALERT_TYPE_ICONS[type];
  const colors = getSeverityColors(severity);

  return (
    <div className={cn('p-2 rounded-lg', colors, className)}>
      <Icon className="w-5 h-5" />
    </div>
  );
}
