import useSWR from 'swr';
import type { PendingActionWithRequester } from '@/types/pending-action';
import { toast } from 'sonner';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    // If unauthorized or forbidden, return empty data
    if (res.status === 401 || res.status === 403) {
      return { pendingActions: [], total: 0, unreviewed: 0 };
    }
    throw new Error('Failed to fetch pending actions');
  }
  return res.json();
};

interface UsePendingActionsOptions {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  refreshInterval?: number;
}

export function usePendingActions(options: UsePendingActionsOptions = {}) {
  const {
    status = 'PENDING',
    refreshInterval = 30000 // Poll every 30 seconds
  } = options;

  const url = `/api/pending-actions?status=${status}`;

  const { data, error, mutate, isLoading } = useSWR<{
    pendingActions: PendingActionWithRequester[];
    total: number;
    unreviewed: number;
  }>(
    url,
    fetcher,
    { refreshInterval }
  );

  const approvePendingAction = async (id: string, notes?: string) => {
    try {
      const res = await fetch(`/api/pending-actions/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewNotes: notes }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || 'Failed to approve action');
        throw new Error(result.error || 'Failed to approve action');
      }

      toast.success(result.message || 'Action approved successfully');

      // Refresh the list
      mutate();
    } catch (error: any) {
      console.error('Error approving pending action:', error);
      throw error;
    }
  };

  const rejectPendingAction = async (id: string, notes: string) => {
    try {
      const res = await fetch(`/api/pending-actions/${id}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewNotes: notes }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || 'Failed to reject action');
        throw new Error(result.error || 'Failed to reject action');
      }

      toast.success('Action rejected');

      // Refresh the list
      mutate();
    } catch (error: any) {
      console.error('Error rejecting pending action:', error);
      throw error;
    }
  };

  const cancelPendingAction = async (id: string) => {
    try {
      const res = await fetch(`/api/pending-actions/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || 'Failed to cancel action');
        throw new Error(result.error || 'Failed to cancel action');
      }

      toast.success('Request cancelled');

      // Refresh the list
      mutate();
    } catch (error: any) {
      console.error('Error cancelling pending action:', error);
      throw error;
    }
  };

  return {
    pendingActions: data?.pendingActions || [],
    pendingCount: data?.unreviewed || 0,
    total: data?.total || 0,
    error,
    isLoading,
    mutate,
    approvePendingAction,
    rejectPendingAction,
    cancelPendingAction,
  };
}
