import useSWR from 'swr';
import type { Alert } from '@/types/alert';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch alerts');
  return res.json();
};

interface UseAlertsOptions {
  unreadOnly?: boolean;
  refreshInterval?: number;
}

export function useAlerts(options: UseAlertsOptions = {}) {
  const {
    unreadOnly = false,
    refreshInterval = 5000 // Poll every 5 seconds for faster notifications
  } = options;

  const url = `/api/alerts${unreadOnly ? '?unread=true' : ''}`;

  const { data, error, mutate, isLoading } = useSWR<Alert[]>(
    url,
    fetcher,
    { refreshInterval }
  );

  const markAsRead = async (alertId: string) => {
    try {
      const res = await fetch(`/api/alerts/${alertId}/read`, {
        method: 'PUT',
      });

      if (!res.ok) throw new Error('Failed to mark alert as read');

      // Optimistically update the local data
      mutate();
    } catch (error) {
      console.error('Error marking alert as read:', error);
      throw error;
    }
  };

  // Soft-delete (resolve/dismiss) - archives the alert
  const resolveAlert = async (alertId: string, notes?: string) => {
    try {
      const res = await fetch(`/api/alerts/${alertId}/resolve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolutionNotes: notes }),
      });

      if (!res.ok) throw new Error('Failed to dismiss alert');

      // Optimistically update the local data
      mutate();
    } catch (error) {
      console.error('Error dismissing alert:', error);
      throw error;
    }
  };

  // Hard-delete (permanent) - removes the alert from database
  const deleteAlert = async (alertId: string) => {
    try {
      const res = await fetch(`/api/alerts/${alertId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete alert');
      }

      // Optimistically update the local data
      mutate();
    } catch (error) {
      console.error('Error deleting alert:', error);
      throw error;
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch('/api/alerts/mark-all-read', {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Failed to mark all alerts as read');

      // Optimistically update the local data
      mutate();
    } catch (error) {
      console.error('Error marking all alerts as read:', error);
      throw error;
    }
  };

  return {
    alerts: data || [],
    error,
    isLoading,
    mutate,
    markAsRead,
    resolveAlert,  // Soft-delete (dismiss)
    deleteAlert,   // Hard-delete (permanent)
    markAllAsRead,
    unreadCount: data?.filter(alert => !alert.isRead).length || 0,
  };
}
