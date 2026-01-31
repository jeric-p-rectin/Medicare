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

  const dismissAlert = async (alertId: string) => {
    try {
      const res = await fetch(`/api/alerts/${alertId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to dismiss alert');

      // Optimistically update the local data
      mutate();
    } catch (error) {
      console.error('Error dismissing alert:', error);
      throw error;
    }
  };

  return {
    alerts: data || [],
    error,
    isLoading,
    mutate,
    markAsRead,
    dismissAlert,
    unreadCount: data?.filter(alert => !alert.isRead).length || 0,
  };
}
