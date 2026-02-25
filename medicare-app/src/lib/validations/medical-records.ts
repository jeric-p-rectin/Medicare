import { z } from 'zod';

export const medicalRecordUpdateSchema = z.object({
  visitDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format')
    .optional(),
  chiefComplaint: z.string().min(3, 'Minimum 3 characters').max(500).optional(),
  diagnosis: z.string().max(1000).nullable().optional(),
  treatment: z.string().max(1000).nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
  diseaseCategory: z.string().max(100).nullable().optional(),
  illnessType: z.string().max(100).nullable().optional(),
  severity: z.enum(['MILD', 'MODERATE', 'SEVERE']).optional(),
});

export const bulkDeleteSchema = z.object({
  ids: z
    .array(z.string().uuid('Each ID must be a valid UUID'))
    .min(1, 'At least one record ID required')
    .max(100, 'Cannot bulk delete more than 100 records at once'),
});

export type MedicalRecordUpdatePayload = z.infer<typeof medicalRecordUpdateSchema>;
export type BulkDeletePayload = z.infer<typeof bulkDeleteSchema>;
