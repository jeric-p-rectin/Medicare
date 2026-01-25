'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCard } from '@/components/alerts/alert-card';
import { useAlerts } from '@/hooks/useAlerts';
import { cn } from '@/lib/utils';
import type { AlertType } from '@/types/alert';

type FilterTab = 'all' | 'unread' | 'outbreak' | 'duplicate';

export default function AlertsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  // Fetch all alerts (not just unread)
  const { alerts, isLoading, markAsRead, dismissAlert } = useAlerts({
    unreadOnly: false,
    refreshInterval: 30000,
  });

  // Filter alerts based on active tab
  const filteredAlerts = alerts.filter((alert) => {
    switch (activeFilter) {
      case 'unread':
        return !alert.isRead;
      case 'outbreak':
        return alert.alertType === 'OUTBREAK_SUSPECTED';
      case 'duplicate':
        return alert.alertType === 'DUPLICATE_DETECTED';
      case 'all':
      default:
        return true;
    }
  });

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'outbreak', label: 'Outbreak' },
    { id: 'duplicate', label: 'Duplicate' },
  ];

  const getTabCount = (filterId: FilterTab) => {
    switch (filterId) {
      case 'unread':
        return alerts.filter((a) => !a.isRead).length;
      case 'outbreak':
        return alerts.filter((a) => a.alertType === 'OUTBREAK_SUSPECTED').length;
      case 'duplicate':
        return alerts.filter((a) => a.alertType === 'DUPLICATE_DETECTED').length;
      case 'all':
      default:
        return alerts.length;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Alerts</h1>
        <p className="text-gray-600">
          Manage outbreak notifications and duplicate detection alerts
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                'px-4 py-3 font-medium text-sm transition-all relative',
                activeFilter === tab.id
                  ? 'text-[#C41E3A]'
                  : 'text-gray-600 hover:text-gray-800'
              )}
            >
              {tab.label}
              {getTabCount(tab.id) > 0 && (
                <span
                  className={cn(
                    'ml-2 px-2 py-0.5 rounded-full text-xs',
                    activeFilter === tab.id
                      ? 'bg-[#C41E3A] text-white'
                      : 'bg-gray-200 text-gray-600'
                  )}
                >
                  {getTabCount(tab.id)}
                </span>
              )}
              {activeFilter === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-12 h-12 animate-spin text-[#C41E3A]" />
        </div>
      ) : filteredAlerts.length === 0 ? (
        <Card className="bg-white rounded-2xl shadow-lg">
          <div className="py-16 text-center">
            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No {activeFilter !== 'all' && activeFilter} alerts
            </h3>
            <p className="text-gray-500">
              {activeFilter === 'unread'
                ? "You're all caught up! No unread alerts at the moment."
                : activeFilter === 'outbreak'
                ? 'No outbreak alerts detected. The system is monitoring for disease patterns.'
                : activeFilter === 'duplicate'
                ? 'No duplicate students detected during registration.'
                : 'No alerts in the system yet.'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onMarkAsRead={markAsRead}
              onDismiss={dismissAlert}
              onClick={() => router.push(`/alerts/${alert.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
