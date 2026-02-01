'use client';

import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { Bell, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertIcon } from './alert-icon';
import { useAlerts } from '@/hooks/useAlerts';
import { cn } from '@/lib/utils';

export function AlertPopover() {
  const router = useRouter();
  const { alerts, unreadCount, markAsRead, isLoading } = useAlerts({
    unreadOnly: true,
    refreshInterval: 5000, // Poll every 5 seconds for faster notifications
  });

  // Get only the 5 most recent unread alerts
  const recentAlerts = alerts.slice(0, 5);

  const handleAlertClick = async (alertId: string) => {
    try {
      await markAsRead(alertId);
      router.push(`/alerts/${alertId}`);
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-all">
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <Badge
              className={cn(
                'absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center',
                'px-1.5 text-xs font-bold text-white bg-[#E63946] animate-pulse'
              )}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="border-b border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              You have {unreadCount} unread {unreadCount === 1 ? 'alert' : 'alerts'}
            </p>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin w-6 h-6 border-2 border-[#C41E3A] border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2 text-sm">Loading alerts...</p>
            </div>
          ) : recentAlerts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No new alerts</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 hover:bg-[#FFF5F6] cursor-pointer transition-colors"
                  onClick={() => handleAlertClick(alert.id)}
                >
                  <div className="flex items-start gap-3">
                    <AlertIcon type={alert.alertType} severity={alert.severity} className="flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm text-gray-800 line-clamp-1">
                          {alert.title}
                        </h4>
                        <Badge
                          className={cn(
                            'text-xs text-white flex-shrink-0',
                            alert.severity === 'CRITICAL' && 'bg-red-500',
                            alert.severity === 'HIGH' && 'bg-orange-500',
                            alert.severity === 'MEDIUM' && 'bg-yellow-500',
                            alert.severity === 'LOW' && 'bg-gray-400'
                          )}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {alert.message}
                      </p>
                      {new Date(alert.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 p-3">
          <Button
            variant="ghost"
            className="w-full justify-between text-[#C41E3A] hover:bg-[#FFF5F6]"
            onClick={() => router.push('/alerts')}
          >
            View All Alerts
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
