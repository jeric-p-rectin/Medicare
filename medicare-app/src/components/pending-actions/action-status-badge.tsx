import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ActionStatus } from '@/types/pending-action';

interface ActionStatusBadgeProps {
  status: ActionStatus;
  className?: string;
}

export function ActionStatusBadge({ status, className }: ActionStatusBadgeProps) {
  const getStatusConfig = (status: ActionStatus) => {
    switch (status) {
      case 'PENDING':
        return {
          color: 'bg-yellow-500',
          text: 'Pending',
        };
      case 'APPROVED':
        return {
          color: 'bg-green-500',
          text: 'Approved',
        };
      case 'REJECTED':
        return {
          color: 'bg-red-500',
          text: 'Rejected',
        };
      default:
        return {
          color: 'bg-gray-500',
          text: status,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={cn('text-white', config.color, className)}>
      {config.text}
    </Badge>
  );
}
