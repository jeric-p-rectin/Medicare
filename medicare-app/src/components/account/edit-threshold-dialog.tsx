'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { DiseaseThreshold } from '@/types/disease-threshold';

interface EditThresholdDialogProps {
  threshold: DiseaseThreshold;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditThresholdDialog({
  threshold,
  open,
  onClose,
  onSuccess
}: EditThresholdDialogProps) {
  const [casesPerWeek, setCasesPerWeek] = useState(threshold.casesPerWeek);
  const [description, setDescription] = useState(threshold.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (casesPerWeek <= 0) {
      toast.error('Threshold must be greater than 0');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/disease-thresholds/${threshold.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          casesPerWeek: Math.floor(casesPerWeek),
          description: description.trim() || undefined
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update threshold');
      }

      toast.success('Threshold updated successfully');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update threshold');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Alert Threshold: {threshold.diseaseName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cases Per Week */}
          <div>
            <Label htmlFor="casesPerWeek">Threshold (Cases per Week)</Label>
            <Input
              id="casesPerWeek"
              type="number"
              min="1"
              value={casesPerWeek}
              onChange={(e) => setCasesPerWeek(parseInt(e.target.value) || 1)}
              required
              className="px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50"
            />
            <p className="text-xs text-gray-500 mt-1">
              Alert will trigger when cases in past 7 days exceed this number
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., Seasonal flu outbreak threshold based on historical data"
              rows={3}
              className="px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
