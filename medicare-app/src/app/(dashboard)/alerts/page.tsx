'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Bell, Loader2, ClipboardCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCard } from '@/components/alerts/alert-card';
import { PendingActionList } from '@/components/pending-actions/pending-action-list';
import { useAlerts } from '@/hooks/useAlerts';
import { usePendingActions } from '@/hooks/usePendingActions';
import { cn } from '@/lib/utils';
import type { AlertType } from '@/types/alert';

type FilterTab = 'all' | 'unread' | 'outbreak' | 'duplicate' | 'pending';

export default function AlertsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  // Fetch all alerts (not just unread)
  const { alerts, isLoading, markAsRead, dismissAlert } = useAlerts({
    unreadOnly: false,
    refreshInterval: 5000, // Poll every 5 seconds for consistency
  });

  // Fetch pending actions (only for SUPER_ADMIN)
  const {
    pendingActions,
    isLoading: pendingLoading,
    pendingCount,
    approvePendingAction,
    rejectPendingAction,
    cancelPendingAction,
  } = usePendingActions();

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

  const isSuperAdmin = session?.user?.role === 'SUPER_ADMIN';

  const tabs: { id: FilterTab; label: string; show?: boolean }[] = [
    { id: 'all' as FilterTab, label: 'All' },
    { id: 'unread' as FilterTab, label: 'Unread' },
    { id: 'outbreak' as FilterTab, label: 'Outbreak' },
    { id: 'duplicate' as FilterTab, label: 'Duplicate' },
    { id: 'pending' as FilterTab, label: 'Pending Approvals', show: isSuperAdmin },
  ].filter((tab) => tab.show !== false);

  const getTabCount = (filterId: FilterTab) => {
    switch (filterId) {
      case 'unread':
        return alerts.filter((a) => !a.isRead).length;
      case 'outbreak':
        return alerts.filter((a) => a.alertType === 'OUTBREAK_SUSPECTED').length;
      case 'duplicate':
        return alerts.filter((a) => a.alertType === 'DUPLICATE_DETECTED').length;
      case 'pending':
        return pendingCount;
      case 'all':
      default:
        return alerts.length;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {activeFilter === 'pending' ? 'Pending Approvals' : 'System Alerts'}
        </h1>
        <p className="text-gray-600">
          {activeFilter === 'pending'
            ? 'Review and approve requests from ADMIN users'
            : 'Manage outbreak notifications and duplicate detection alerts'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto pb-2">
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

      {/* Content Area */}
      {activeFilter === 'pending' ? (
        // Pending Approvals Tab (SUPER_ADMIN only)
        <PendingActionList
          actions={pendingActions}
          isLoading={pendingLoading}
          userRole={session?.user?.role}
          onApprove={async (id, notes) => {
            await approvePendingAction(id, notes);
          }}
          onReject={async (id, notes) => {
            await rejectPendingAction(id, notes);
          }}
          onCancel={async (id) => {
            if (confirm('Are you sure you want to cancel this request?')) {
              await cancelPendingAction(id);
            }
          }}
        />
      ) : (
        // Alerts List (All other tabs)
        <>
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
        </>
      )}
    </div>
  );
}
