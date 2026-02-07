'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ActionStatusBadge } from './action-status-badge';
import type {
  PendingActionWithRequester,
  RegistrationActionData,
  DeactivationActionData,
  DeletionActionData,
} from '@/types/pending-action';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface ApproveActionModalProps {
  action: PendingActionWithRequester | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (notes?: string) => Promise<void>;
  onReject: (notes: string) => Promise<void>;
}

export function ApproveActionModal({
  action,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: ApproveActionModalProps) {
  const [notes, setNotes] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (!action) return null;

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await onApprove(notes || undefined);
      setNotes('');
      onClose();
    } catch (error) {
      console.error('Error approving action:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (!notes.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    setIsRejecting(true);
    try {
      await onReject(notes);
      setNotes('');
      setShowRejectInput(false);
      onClose();
    } catch (error) {
      console.error('Error rejecting action:', error);
    } finally {
      setIsRejecting(false);
    }
  };

  const getActionTitle = (type: string) => {
    switch (type) {
      case 'REGISTER_STUDENT':
        return 'Student Registration Request';
      case 'DEACTIVATE_USER':
        return 'User Deactivation Request';
      case 'DELETE_USER':
        return 'User Deletion Request';
      default:
        return 'Action Request';
    }
  };

  const renderActionDetails = () => {
    switch (action.actionType) {
      case 'REGISTER_STUDENT':
        const regData = action.actionData as RegistrationActionData;
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-sm">
                  {regData.firstName} {regData.middleName} {regData.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-sm">{new Date(regData.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Sex</label>
                <p className="text-sm">{regData.sex}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Age</label>
                <p className="text-sm">{regData.age} years</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Grade & Section</label>
                <p className="text-sm">
                  Grade {regData.gradeLevel} - Section {regData.section}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">LRN</label>
                <p className="text-sm font-mono">{regData.lrn}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Parent/Guardian</label>
              <p className="text-sm">
                {regData.parentGuardianName} - {regData.parentGuardianContact}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-sm">{regData.address}</p>
            </div>
            {regData.email && (
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-sm">{regData.email}</p>
              </div>
            )}
          </div>
        );

      case 'DEACTIVATE_USER':
      case 'DELETE_USER':
        const userData = action.actionData as DeactivationActionData | DeletionActionData;
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Username</label>
                <p className="text-sm font-mono">{userData.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-sm">{userData.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Role</label>
                <p className="text-sm">
                  <Badge variant="outline">{userData.role}</Badge>
                </p>
              </div>
              {userData.email && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm">{userData.email}</p>
                </div>
              )}
            </div>
            {userData.reason && (
              <div>
                <label className="text-sm font-medium text-gray-500">Reason</label>
                <p className="text-sm text-gray-700">{userData.reason}</p>
              </div>
            )}
            {action.actionType === 'DELETE_USER' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ Warning: This is a permanent action that cannot be undone. The user and all associated student
                  records will be permanently deleted from the database.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return <p className="text-sm text-gray-600">No additional details available.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getActionTitle(action.actionType)}
            <ActionStatusBadge status={action.status} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Requester Info */}
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-700">Requested by</p>
                <p className="text-sm text-gray-600">
                  {action.requesterName} ({action.requesterRole})
                </p>
                {action.requesterEmail && <p className="text-xs text-gray-500">{action.requesterEmail}</p>}
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Requested on</p>
                <p className="text-sm text-gray-700">
                  {new Date(action.requestedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Action Details */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Details</h4>
            {renderActionDetails()}
          </div>

          {/* Notes Input */}
          {!showRejectInput ? (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Review Notes (Optional)
              </label>
              <Textarea
                placeholder="Add any notes about this approval..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1">{notes.length}/1000 characters</p>
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Rejection Reason (Required) <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Please explain why you are rejecting this request..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                maxLength={1000}
                className="border-red-300 focus:border-red-500"
              />
              <p className="text-xs text-gray-500 mt-1">{notes.length}/1000 characters</p>
            </div>
          )}
        </div>

        <DialogFooter>
          {!showRejectInput ? (
            <>
              <Button variant="outline" onClick={onClose} disabled={isApproving || isRejecting}>
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRejectInput(true)}
                disabled={isApproving || isRejecting}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <Button
                className="bg-[#C41E3A] hover:bg-[#A01828]"
                onClick={handleApprove}
                disabled={isApproving || isRejecting}
              >
                {isApproving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectInput(false);
                  setNotes('');
                }}
                disabled={isRejecting}
              >
                Back
              </Button>
              <Button variant="destructive" onClick={handleReject} disabled={isRejecting || !notes.trim()}>
                {isRejecting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-1" />
                    Confirm Rejection
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
