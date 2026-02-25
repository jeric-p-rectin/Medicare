'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { medicalRecordUpdateSchema, type MedicalRecordUpdatePayload } from '@/lib/validations/medical-records';
import type { MedicalRecordWithStudent } from '@/types/medical-record';

interface EditRecordDialogProps {
  record: MedicalRecordWithStudent | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditRecordDialog({ record, open, onClose, onSuccess }: EditRecordDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diseaseCategories, setDiseaseCategories] = useState<string[]>([]);
  const [illnessTypes, setIllnessTypes] = useState<string[]>([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showCustomIllnessType, setShowCustomIllnessType] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [customIllnessType, setCustomIllnessType] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<MedicalRecordUpdatePayload>({
    resolver: zodResolver(medicalRecordUpdateSchema),
  });

  const selectedCategory = watch('diseaseCategory');
  const selectedIllnessType = watch('illnessType');

  // Populate form when record changes
  useEffect(() => {
    if (record && open) {
      const visitDateStr = record.visitDate
        ? new Date(record.visitDate).toISOString().split('T')[0]
        : '';

      reset({
        visitDate: visitDateStr,
        chiefComplaint: record.chiefComplaint,
        diagnosis: record.diagnosis ?? '',
        treatment: record.treatment ?? '',
        notes: record.notes ?? '',
        diseaseCategory: record.diseaseCategory ?? '',
        illnessType: record.illnessType ?? '',
        severity: record.severity,
      });

      setShowCustomCategory(false);
      setShowCustomIllnessType(false);
      setCustomCategory('');
      setCustomIllnessType('');
    }
  }, [record, open, reset]);

  // Fetch disease categories on open
  useEffect(() => {
    if (!open) return;
    fetch('/api/disease-categories')
      .then((r) => r.json())
      .then(({ categories, illnessTypes: types }) => {
        setDiseaseCategories(categories ?? []);
        setIllnessTypes(types ?? []);
      })
      .catch(() => {});
  }, [open]);

  // Handle custom category toggle
  useEffect(() => {
    if (selectedCategory === 'CUSTOM') {
      setShowCustomCategory(true);
    } else {
      setShowCustomCategory(false);
      setCustomCategory('');
    }
  }, [selectedCategory]);

  // Handle custom illness type toggle
  useEffect(() => {
    if (selectedIllnessType === 'CUSTOM') {
      setShowCustomIllnessType(true);
    } else {
      setShowCustomIllnessType(false);
      setCustomIllnessType('');
    }
  }, [selectedIllnessType]);

  const onSubmit = async (data: MedicalRecordUpdatePayload) => {
    if (!record) return;
    setIsSubmitting(true);

    try {
      // Resolve custom values
      const finalCategory =
        data.diseaseCategory === 'CUSTOM' ? customCategory || null : data.diseaseCategory || null;
      const finalIllnessType =
        data.illnessType === 'CUSTOM' ? customIllnessType || null : data.illnessType || null;

      const payload = {
        ...data,
        diseaseCategory: finalCategory,
        illnessType: finalIllnessType,
        diagnosis: data.diagnosis || null,
        treatment: data.treatment || null,
        notes: data.notes || null,
      };

      const res = await fetch(`/api/medical-records/${record.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('Medical record updated successfully');
        onSuccess();
        onClose();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to update record');
      }
    } catch {
      toast.error('An error occurred while updating the record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl ' +
    'focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 ' +
    'transition-all outline-none';

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Medical Record</DialogTitle>
          <DialogDescription>
            {record && (
              <span>
                Editing record for{' '}
                <span className="font-semibold text-gray-700">{record.studentName}</span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
          {/* Visit Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Visit Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Visit Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  {...register('visitDate')}
                  className={inputClass}
                />
                {errors.visitDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.visitDate.message}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Severity
                </Label>
                <div className="flex gap-4 pt-2.5">
                  {(['MILD', 'MODERATE', 'SEVERE'] as const).map((s) => (
                    <label key={s} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        value={s}
                        {...register('severity')}
                        className="w-4 h-4"
                      />
                      <span
                        className={`text-sm font-medium ${
                          s === 'MILD'
                            ? 'text-green-700'
                            : s === 'MODERATE'
                            ? 'text-orange-700'
                            : 'text-red-700'
                        }`}
                      >
                        {s.charAt(0) + s.slice(1).toLowerCase()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Chief Complaint <span className="text-red-500">*</span>
              </Label>
              <textarea
                {...register('chiefComplaint')}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Primary reason for the visit"
              />
              {errors.chiefComplaint && (
                <p className="text-red-500 text-xs mt-1">{errors.chiefComplaint.message}</p>
              )}
            </div>
          </div>

          {/* Diagnosis & Treatment */}
          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Diagnosis & Treatment
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Diagnosis
                </Label>
                <textarea
                  {...register('diagnosis')}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Medical diagnosis"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Treatment
                </Label>
                <textarea
                  {...register('treatment')}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Treatment provided"
                />
              </div>
            </div>
          </div>

          {/* Disease Tracking */}
          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Disease Tracking
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Disease Category
                </Label>
                <select {...register('diseaseCategory')} className={inputClass}>
                  <option value="">Select Category</option>
                  {diseaseCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="CUSTOM">✏️ Custom (Add New)</option>
                </select>
                {showCustomCategory && (
                  <Input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom disease category"
                    className="mt-2"
                  />
                )}
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Illness Type
                </Label>
                <select {...register('illnessType')} className={inputClass}>
                  <option value="">Select Type</option>
                  {illnessTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                  <option value="CUSTOM">✏️ Custom (Add New)</option>
                </select>
                {showCustomIllnessType && (
                  <Input
                    value={customIllnessType}
                    onChange={(e) => setCustomIllnessType(e.target.value)}
                    placeholder="Enter custom illness type"
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="border-t border-gray-100 pt-5">
            <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
              Additional Notes
            </Label>
            <textarea
              {...register('notes')}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Any additional observations"
            />
          </div>

          <DialogFooter className="pt-2">
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
