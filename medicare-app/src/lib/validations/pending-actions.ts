import { z } from 'zod';

/**
 * Validation schema for creating a pending action
 * Used when ADMIN submits a request that requires SUPER_ADMIN approval
 */
export const createPendingActionSchema = z.object({
  actionType: z.enum(['REGISTER_STUDENT', 'DEACTIVATE_USER', 'DELETE_USER'], {
    errorMap: () => ({ message: 'Invalid action type' }),
  }),
  targetUserId: z.string().uuid('Invalid user ID').optional(),
  actionData: z.record(z.any()), // JSON object - structure varies by action type
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional().default('MEDIUM'),
});

/**
 * Validation schema for approving a pending action
 * Optional review notes can be provided
 */
export const approveActionSchema = z.object({
  reviewNotes: z.string().max(1000, 'Review notes must be 1000 characters or less').optional(),
});

/**
 * Validation schema for rejecting a pending action
 * Rejection reason is REQUIRED
 */
export const rejectActionSchema = z.object({
  reviewNotes: z.string()
    .min(1, 'Rejection reason is required')
    .max(1000, 'Rejection reason must be 1000 characters or less'),
});

/**
 * Validation schema for registration action data
 * Used to validate the actionData field when actionType is REGISTER_STUDENT
 */
export const registrationActionDataSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be 50 characters or less'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  email: z.string().email('Invalid email address').max(100).optional(),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  middleName: z.string().max(50).optional(),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  age: z.number().int().min(1).max(120),
  sex: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: 'Sex must be either MALE or FEMALE' }),
  }),
  gradeLevel: z.enum(['7', '8', '9', '10', '11', '12', 'Non-Graded'], {
    message: 'Invalid grade level',
  }),
  section: z.string().min(1, 'Section is required').max(50),
  lrn: z.string().length(12, 'LRN must be exactly 12 digits').regex(/^\d+$/, 'LRN must contain only numbers'),
  studentNumber: z.string().min(1, 'Student number is required').max(20),
  address: z.string().min(1, 'Address is required'),
  parentGuardianName: z.string().min(1, 'Parent/Guardian name is required').max(100),
  parentGuardianContact: z.string().min(1, 'Parent/Guardian contact is required').max(15),
  bmi: z.number().min(0).max(100).optional(),
  healthHistory: z.string().optional(),
  createdById: z.string().uuid('Invalid creator ID'),
});

/**
 * Validation schema for deactivation action data
 * Used to validate the actionData field when actionType is DEACTIVATE_USER
 */
export const deactivationActionDataSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  username: z.string().min(1, 'Username is required'),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address').optional(),
  role: z.string().min(1, 'Role is required'),
  reason: z.string().max(500, 'Reason must be 500 characters or less').optional(),
  isActive: z.boolean(),
});

/**
 * Validation schema for deletion action data
 * Used to validate the actionData field when actionType is DELETE_USER
 */
export const deletionActionDataSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  username: z.string().min(1, 'Username is required'),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address').optional(),
  role: z.string().min(1, 'Role is required'),
  reason: z.string().max(500, 'Reason must be 500 characters or less').optional(),
});

/**
 * Validation schema for query filters
 */
export const pendingActionFiltersSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  actionType: z.enum(['REGISTER_STUDENT', 'DEACTIVATE_USER', 'DELETE_USER']).optional(),
  limit: z.number().int().min(1).max(1000).optional().default(50),
  offset: z.number().int().min(0).optional().default(0),
});

/**
 * Type definitions for validation schemas
 */
export type CreatePendingActionInput = z.infer<typeof createPendingActionSchema>;
export type ApproveActionInput = z.infer<typeof approveActionSchema>;
export type RejectActionInput = z.infer<typeof rejectActionSchema>;
export type RegistrationActionDataInput = z.infer<typeof registrationActionDataSchema>;
export type DeactivationActionDataInput = z.infer<typeof deactivationActionDataSchema>;
export type DeletionActionDataInput = z.infer<typeof deletionActionDataSchema>;
export type PendingActionFiltersInput = z.infer<typeof pendingActionFiltersSchema>;
