import bcrypt from 'bcryptjs';
import { transaction } from './db';
import { createStudent } from './queries/students';
import { updateUserStatus, deleteUser } from './queries/users';
import { createAlert } from './queries/alerts';
import { detectDuplicate } from './duplicate-detection';
import { logAction } from './audit-logger';
import type {
  PendingActionWithRequester,
  RegistrationActionData,
  DeactivationActionData,
  DeletionActionData,
} from '@/types/pending-action';

/**
 * Credentials returned after successful registration
 */
export interface RegistrationCredentials {
  username: string;
  password: string;
  studentNumber: string;
  fullName: string;
}

/**
 * Execute an approved pending action
 * This function handles the actual business logic for each action type
 */
export async function executePendingAction(
  action: PendingActionWithRequester,
  reviewedById: string
): Promise<{ success: boolean; message: string; credentials?: RegistrationCredentials }> {
  try {
    switch (action.actionType) {
      case 'REGISTER_STUDENT':
        return await executeRegistration(
          action.actionData as RegistrationActionData,
          action.requestedById,
          reviewedById
        );

      case 'DEACTIVATE_USER':
        return await executeDeactivation(
          action.actionData as DeactivationActionData,
          reviewedById
        );

      case 'DELETE_USER':
        return await executeDeletion(
          action.actionData as DeletionActionData,
          reviewedById
        );

      default:
        throw new Error(`Unknown action type: ${action.actionType}`);
    }
  } catch (error) {
    console.error(`[executePendingAction] Error executing action ${action.id}:`, error);
    throw error;
  }
}

/**
 * Execute student registration
 * Creates user account and student record within a transaction
 */
async function executeRegistration(
  data: RegistrationActionData,
  requestedById: string,
  reviewedById: string
): Promise<{ success: boolean; message: string; credentials: RegistrationCredentials }> {
  // Hash password BEFORE creating student
  // The plain text password from pending action will be used for the alert
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Update createdById to be the reviewer (SUPER_ADMIN who approved)
  const registrationData = {
    ...data,
    password: hashedPassword,  // Use hashed password for database
    createdById: reviewedById,
  };

  // Create student within transaction
  const studentId = await createStudent(registrationData);

  // Run duplicate detection (non-blocking)
  try {
    await detectDuplicate(
      studentId,
      data.firstName,
      data.lastName,
      new Date(data.dateOfBirth),
      data.lrn
    );
  } catch (error) {
    console.error('[executeRegistration] Duplicate detection failed:', error);
    // Don't fail the registration if duplicate detection fails
  }

  // Log the action
  await logAction(reviewedById, 'CREATE', 'student', studentId, null, {
    student_id: studentId,
    approved_from_pending_action: true,
    original_requester_id: requestedById,
  });

  // Return credentials for notification
  const fullName = `${data.firstName} ${data.lastName}`;

  return {
    success: true,
    message: `Student ${fullName} registered successfully`,
    credentials: {
      username: data.username,
      password: data.password,
      studentNumber: data.studentNumber,
      fullName,
    },
  };
}

/**
 * Execute user deactivation
 * Sets is_active to false
 */
async function executeDeactivation(
  data: DeactivationActionData,
  reviewedById: string
): Promise<{ success: boolean; message: string }> {
  // Deactivate the user
  await updateUserStatus(data.userId, false);

  // Log the action
  await logAction(reviewedById, 'UPDATE', 'user', data.userId, {
    is_active: true,
  }, {
    is_active: false,
    reason: data.reason || 'Approved deactivation request',
  });

  return {
    success: true,
    message: `User ${data.username} has been deactivated`,
  };
}

/**
 * Execute user deletion
 * Permanently removes user from database (cascades to students table)
 */
async function executeDeletion(
  data: DeletionActionData,
  reviewedById: string
): Promise<{ success: boolean; message: string }> {
  // Log the action before deletion (since user will be removed)
  await logAction(reviewedById, 'DELETE', 'user', data.userId, {
    username: data.username,
    fullName: data.fullName,
    email: data.email,
    role: data.role,
  }, null);

  // Delete the user (cascades to students table due to foreign key)
  await deleteUser(data.userId);

  return {
    success: true,
    message: `User ${data.username} has been permanently deleted`,
  };
}

/**
 * Create notification alert for the requester
 * Called after action is approved or rejected
 */
export async function notifyRequester(
  requesterId: string,
  actionType: string,
  status: 'APPROVED' | 'REJECTED',
  message: string,
  credentials?: RegistrationCredentials
): Promise<void> {
  let title: string;
  let alertMessage: string;
  let severity: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';

  if (status === 'APPROVED') {
    switch (actionType) {
      case 'REGISTER_STUDENT':
        title = 'Registration Approved';
        alertMessage = credentials
          ? `${message}\n\nCredentials:\nUsername: ${credentials.username}\nPassword: ${credentials.password}\nStudent Number: ${credentials.studentNumber}\n\nPlease provide these credentials to the student.`
          : message;
        break;
      case 'DEACTIVATE_USER':
        title = 'Deactivation Approved';
        alertMessage = message;
        break;
      case 'DELETE_USER':
        title = 'Deletion Approved';
        alertMessage = message;
        break;
      default:
        title = 'Request Approved';
        alertMessage = message;
    }
  } else {
    title = 'Request Rejected';
    alertMessage = message;
    severity = 'MEDIUM';
  }

  await createAlert({
    alertType: 'SYSTEM',
    title,
    message: alertMessage,
    severity,
    recipientUserId: requesterId,  // Send notification to the requesting ADMIN
  });

  console.log(`[notifyRequester] Notification sent to requester ${requesterId}:`, title);
}
