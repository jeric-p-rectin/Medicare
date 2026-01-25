/**
 * Role-Based Access Control (RBAC) Helpers
 * Authorization utilities for managing user permissions and access control
 */

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'PATIENT';

/**
 * Check if user has one of the required roles
 */
export function hasRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Check if user is an administrator (SUPER_ADMIN or ADMIN)
 */
export function isAdmin(role: UserRole): boolean {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

/**
 * Check if user is a patient
 */
export function isPatient(role: UserRole): boolean {
  return role === 'PATIENT';
}

/**
 * Check if user can access a specific student record
 * - SUPER_ADMIN and ADMIN can access any student
 * - PATIENT can only access their own student record
 *
 * @param userRole - Role of the requesting user
 * @param userId - ID of the requesting user
 * @param studentUserId - user_id field of the student record
 * @returns true if user can access the student record, false otherwise
 */
export function canAccessStudent(
  userRole: UserRole,
  userId: string,
  studentUserId?: string | null
): boolean {
  // Admins can access all students
  if (isAdmin(userRole)) {
    return true;
  }

  // Patients can only access their own record
  if (isPatient(userRole)) {
    return userId === studentUserId;
  }

  // Default: deny access
  return false;
}
