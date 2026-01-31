'use client';

import { useState } from 'react';
import { PendingActionCard } from './pending-action-card';
import { ApproveActionModal } from './approve-action-modal';
import type { PendingActionWithRequester, ActionType } from '@/types/pending-action';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PendingActionListProps {
  actions: PendingActionWithRequester[];
  isLoading?: boolean;
  userRole?: string;
  onApprove: (id: string, notes?: string) => Promise<void>;
  onReject: (id: string, notes: string) => Promise<void>;
  onCancel: (id: string) => Promise<void>;
}

export function PendingActionList({
  actions,
  isLoading,
  userRole,
  onApprove,
  onReject,
  onCancel,
}: PendingActionListProps) {
  const [selectedAction, setSelectedAction] = useState<PendingActionWithRequester | null>(null);
  const [filter, setFilter] = useState<'all' | ActionType>('all');

  const filteredActions = actions.filter((action) => {
    if (filter === 'all') return true;
    return action.actionType === filter;
  });

  const getFilterLabel = (type: 'all' | ActionType) => {
    switch (type) {
      case 'all':
        return 'All Requests';
      case 'REGISTER_STUDENT':
        return 'Registrations';
      case 'DEACTIVATE_USER':
        return 'Deactivations';
      case 'DELETE_USER':
        return 'Deletions';
      default:
        return type;
    }
  };

  const getFilterCount = (type: 'all' | ActionType) => {
    if (type === 'all') return actions.length;
    return actions.filter((a) => a.actionType === type).length;
  };

  const handleOpenModal = (action: PendingActionWithRequester) => {
    setSelectedAction(action);
  };

  const handleCloseModal = () => {
    setSelectedAction(null);
  };

  const handleApproveFromModal = async (notes?: string) => {
    if (selectedAction) {
      await onApprove(selectedAction.id, notes);
      setSelectedAction(null);
    }
  };

  const handleRejectFromModal = async (notes: string) => {
    if (selectedAction) {
      await onReject(selectedAction.id, notes);
      setSelectedAction(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#C41E3A]" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'REGISTER_STUDENT', 'DEACTIVATE_USER', 'DELETE_USER'] as const).map((type) => (
          <Button
            key={type}
            variant={filter === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(type)}
            className={filter === type ? 'bg-[#C41E3A] hover:bg-[#A01828]' : ''}
          >
            {getFilterLabel(type)} ({getFilterCount(type)})
          </Button>
        ))}
      </div>

      {/* Action List */}
      {filteredActions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No {filter !== 'all' ? getFilterLabel(filter).toLowerCase() : 'pending actions'} found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredActions.map((action) => (
            <PendingActionCard
              key={action.id}
              action={action}
              onApprove={() => handleOpenModal(action)}
              onReject={() => handleOpenModal(action)}
              onCancel={onCancel}
              onClick={() => handleOpenModal(action)}
              userRole={userRole}
            />
          ))}
        </div>
      )}

      {/* Approve/Reject Modal */}
      <ApproveActionModal
        action={selectedAction}
        isOpen={!!selectedAction}
        onClose={handleCloseModal}
        onApprove={handleApproveFromModal}
        onReject={handleRejectFromModal}
      />
    </div>
  );
}
