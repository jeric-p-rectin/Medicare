'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { MedicalRecord } from '@/types/medical-record';
import { toast } from 'sonner';

interface DeleteRecordDialogProps {
  record: MedicalRecord;
  studentId: string;
  onDelete: () => void; // Callback to refresh parent
}

export function DeleteRecordDialog({ record, studentId, onDelete }: DeleteRecordDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/students/${studentId}/records/${record.id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        let errorMessage = 'Failed to delete medical record';
        try {
          const error = await response.json();
          errorMessage = error.error || errorMessage;
        } catch {
          // Response wasn't JSON (e.g., HTML 404 page)
        }
        throw new Error(errorMessage);
      }

      toast.success('Medical record deleted successfully');
      setOpen(false);
      onDelete(); // Trigger parent refresh
    } catch (error) {
      console.error('Error deleting medical record:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete medical record');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Medical Record</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this medical record? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Record details for verification */}
        <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
          <div>
            <span className="font-semibold">Visit Date:</span>{' '}
            {new Date(record.visitDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Chief Complaint:</span> {record.chiefComplaint}
          </div>
          {record.diagnosis && (
            <div>
              <span className="font-semibold">Diagnosis:</span> {record.diagnosis}
            </div>
          )}
          {record.diseaseCategory && (
            <div>
              <span className="font-semibold">Category:</span> {record.diseaseCategory}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
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
                Delete Record
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
