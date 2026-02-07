'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ActionStatusBadge } from './action-status-badge';
import type {
  PendingActionWithRequester,
  RegistrationActionData,
  DeactivationActionData,
  DeletionActionData,
} from '@/types/pending-action';
import { cn } from '@/lib/utils';
import { ClipboardList, UserX, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

interface PendingActionCardProps {
  action: PendingActionWithRequester;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onCancel?: (id: string) => void;
  onClick?: () => void;
  userRole?: string;
}

export function PendingActionCard({
  action,
  onApprove,
  onReject,
  onCancel,
  onClick,
  userRole,
}: PendingActionCardProps) {
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'REGISTER_STUDENT':
        return <ClipboardList className="h-6 w-6 text-[#C41E3A]" />;
      case 'DEACTIVATE_USER':
        return <UserX className="h-6 w-6 text-orange-500" />;
      case 'DELETE_USER':
        return <Trash2 className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };

  const getActionTitle = (type: string) => {
    switch (type) {
      case 'REGISTER_STUDENT':
        return 'Student Registration';
      case 'DEACTIVATE_USER':
        return 'User Deactivation';
      case 'DELETE_USER':
        return 'User Deletion';
      default:
        return type;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getActionSummary = () => {
    switch (action.actionType) {
      case 'REGISTER_STUDENT':
        const regData = action.actionData as RegistrationActionData;
        return `${regData.firstName} ${regData.lastName} - Grade ${regData.gradeLevel} ${regData.section}`;
      case 'DEACTIVATE_USER':
        const deactData = action.actionData as DeactivationActionData;
        return `${deactData.username} (${deactData.role})`;
      case 'DELETE_USER':
        const delData = action.actionData as DeletionActionData;
        return `${delData.username} (${delData.role})`;
      default:
        return '';
    }
  };

  const isSuperAdmin = userRole === 'SUPER_ADMIN';
  const isPending = action.status === 'PENDING';
  const isRequester = action.requestedById;

  return (
    <Card
      className={cn(
        'border-l-4 transition-all hover:shadow-md',
        action.status === 'PENDING' && 'border-l-yellow-500 bg-yellow-50/30',
        action.status === 'APPROVED' && 'border-l-green-500',
        action.status === 'REJECTED' && 'border-l-red-500',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <CardContent className="pt-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">{getActionIcon(action.actionType)}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-800">{getActionTitle(action.actionType)}</h3>
                <ActionStatusBadge status={action.status} />
                <Badge variant="outline" className={cn('border', getPriorityColor(action.priority))}>
                  {action.priority}
                </Badge>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {new Date(action.requestedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2">{getActionSummary()}</p>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <span>
                Requested by: <span className="font-medium">{action.requesterName}</span> ({action.requesterRole})
              </span>
            </div>

            {action.status !== 'PENDING' && action.reviewerName && (
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span>
                  {action.status === 'APPROVED' ? 'Approved' : 'Rejected'} by:{' '}
                  <span className="font-medium">{action.reviewerName}</span>
                </span>
                {action.reviewedAt && (
                  <span className="text-gray-400">
                    on {new Date(action.reviewedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
            )}

            {action.reviewNotes && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                <span className="font-medium">Notes:</span> {action.reviewNotes}
              </div>
            )}

            {isPending && (
              <div className="flex gap-2 mt-3">
                {isSuperAdmin && (
                  <>
                    <Button
                      size="sm"
                      className="bg-[#C41E3A] hover:bg-[#A01828]"
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove?.(action.id);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReject?.(action.id);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                {!isSuperAdmin && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancel?.(action.id);
                    }}
                  >
                    Cancel Request
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
