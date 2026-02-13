import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { AlertIcon } from './alert-icon';
import type { Alert } from '@/types/alert';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  alert: Alert;
  onMarkAsRead?: (id: string) => void;
  onResolve?: (id: string) => void;  // Soft-delete (dismiss)
  onDelete?: (id: string) => void;   // Hard-delete (permanent)
  onClick?: () => void;
  userRole?: string;  // To show/hide delete button
}

export function AlertCard({ alert, onMarkAsRead, onResolve, onDelete, onClick, userRole }: AlertCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500';
      case 'HIGH':
        return 'bg-orange-500';
      case 'MEDIUM':
        return 'bg-yellow-500';
      case 'LOW':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getSeverityBorderColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'border-l-red-500';
      case 'HIGH':
        return 'border-l-orange-500';
      case 'MEDIUM':
        return 'border-l-yellow-500';
      case 'LOW':
        return 'border-l-gray-300';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <Card
      className={cn(
        'border-l-4 transition-all cursor-pointer hover:shadow-md',
        'border-l-red-500',
        !alert.isRead && 'bg-[#FFF5F6]'
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-start gap-4 pt-4">
        <AlertIcon type={alert.alertType} severity={alert.severity} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-800">{alert.title}</h3>
              {/* Only show severity for non-duplicate alerts */}
              {alert.alertType !== 'DUPLICATE_DETECTED' && (
                <Badge className={cn('text-white', getSeverityColor(alert.severity))}>
                  {alert.severity}
                </Badge>
              )}
              {!alert.isRead && (
                <Badge variant="outline" className="border-[#C41E3A] text-[#C41E3A]">
                  NEW
                </Badge>
              )}
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {new Date(alert.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{alert.message}</p>

          {alert.relatedDisease && (
            <p className="text-xs text-gray-500">
              <span className="font-semibold">Disease:</span> {alert.relatedDisease}
            </p>
          )}

          <div className="flex gap-2 mt-3">
            {!alert.isRead && onMarkAsRead && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(alert.id);
                }}
                className="text-xs"
              >
                Mark as Read
              </Button>
            )}
            {onResolve && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onResolve(alert.id);
                }}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Dismiss
              </Button>
            )}
            {onDelete && userRole === 'SUPER_ADMIN' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(alert.id);
                }}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
