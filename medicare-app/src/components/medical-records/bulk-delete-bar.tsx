'use client';

import { Trash2, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BulkDeleteBarProps {
  count: number;
  onDelete: () => void;
  isDeleting: boolean;
  onClearSelection: () => void;
}

export function BulkDeleteBar({ count, onDelete, isDeleting, onClearSelection }: BulkDeleteBarProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
      <span className="text-sm font-semibold text-[#C41E3A]">
        {count} record{count !== 1 ? 's' : ''} selected
      </span>
      <Button
        onClick={onDelete}
        disabled={isDeleting}
        size="sm"
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        {isDeleting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Deleting...
          </>
        ) : (
          <>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </>
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearSelection}
        disabled={isDeleting}
        className="text-gray-500 hover:text-gray-700"
      >
        <X className="mr-1 h-3 w-3" />
        Clear
      </Button>
    </div>
  );
}
