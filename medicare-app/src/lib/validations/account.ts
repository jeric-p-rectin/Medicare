import { z } from 'zod';

/**
 * Validation schema for profile updates
 * Used when users edit their profile information
 */
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be 50 characters or less'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be 50 characters or less'),
  middleName: z.string().max(50, 'Middle name must be 50 characters or less').optional(),
  email: z.string().email('Invalid email address').max(100, 'Email must be 100 characters or less').optional(),
});

/**
 * Validation schema for password changes
 * Requires current password and enforces strong password requirements
 */
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

/**
 * Validation schema for creating new users (SUPER_ADMIN only)
 * Used in the user management interface
 */
export const userCreateSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be 50 characters or less')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email must be 100 characters or less')
    .optional(),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be 50 characters or less'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be 50 characters or less'),
  middleName: z.string().max(50, 'Middle name must be 50 characters or less').optional(),
  role: z.enum(['ADMIN', 'PATIENT'], {
    errorMap: () => ({ message: 'Role must be either ADMIN or PATIENT' }),
  }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

/**
 * Validation schema for user status updates (deactivate/activate)
 * Used by SUPER_ADMIN to toggle user active status
 */
export const userStatusUpdateSchema = z.object({
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be a boolean'
  })
});

/**
 * Type definitions for validation schemas
 */
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserStatusUpdateInput = z.infer<typeof userStatusUpdateSchema>;
