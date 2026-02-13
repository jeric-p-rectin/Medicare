'use client';

import { useState } from 'react';
import { Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { Alert } from '@/types/alert';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface DeleteAlertDialogProps {
  alert: Alert | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (alertId: string) => Promise<void>;
}

export function DeleteAlertDialog({
  alert,
  open,
  onOpenChange,
  onDelete,
}: DeleteAlertDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!alert) return;

    setIsDeleting(true);
    try {
      await onDelete(alert.id);
      toast.success('Alert permanently deleted');
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting alert:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete alert');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!alert) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Alert Permanently?
          </DialogTitle>
          <DialogDescription>
            This will permanently delete this alert from the database. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Alert details for verification */}
        <div className="space-y-3 rounded-lg bg-gray-50 p-4 text-sm border border-gray-200">
          <div>
            <span className="font-semibold text-gray-700">Title:</span>
            <p className="mt-1 text-gray-900">{alert.title}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Type:</span>
            <Badge variant="outline" className="text-xs">
              {alert.alertType.replace('_', ' ')}
            </Badge>
          </div>

          {alert.alertType !== 'DUPLICATE_DETECTED' && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Severity:</span>
              <Badge className={cn('text-white text-xs', getSeverityColor(alert.severity))}>
                {alert.severity}
              </Badge>
            </div>
          )}

          {alert.relatedDisease && (
            <div>
              <span className="font-semibold text-gray-700">Disease:</span>{' '}
              <span className="text-gray-900">{alert.relatedDisease}</span>
            </div>
          )}

          <div>
            <span className="font-semibold text-gray-700">Created:</span>{' '}
            <span className="text-gray-900">
              {new Date(alert.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {alert.message && (
            <div>
              <span className="font-semibold text-gray-700">Message:</span>
              <p className="mt-1 text-gray-900 text-sm line-clamp-3">{alert.message}</p>
            </div>
          )}
        </div>

        <div className="rounded-lg bg-red-50 border border-red-200 p-3 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800">
            <strong>Warning:</strong> This alert will be permanently removed from the system.
            Consider using "Dismiss" instead if you want to archive the alert.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Permanently
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
