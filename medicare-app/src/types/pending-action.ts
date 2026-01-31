import { RowDataPacket } from 'mysql2';
import { StudentCreateInput } from './student';

// Action Types
export type ActionType = 'REGISTER_STUDENT' | 'DEACTIVATE_USER' | 'DELETE_USER';

// Action Status
export type ActionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// Priority Levels
export type ActionPriority = 'LOW' | 'MEDIUM' | 'HIGH';

/**
 * Action-specific data structures
 */

// Registration action stores full student registration form data
export type RegistrationActionData = StudentCreateInput;

// Deactivation action stores user details and reason
export interface DeactivationActionData {
  userId: string;
  username: string;
  fullName: string;
  email?: string;
  role: string;
  reason?: string;
  isActive: boolean; // Current status (should be true)
}

// Deletion action stores user details and reason
export interface DeletionActionData {
  userId: string;
  username: string;
  fullName: string;
  email?: string;
  role: string;
  reason?: string;
}

/**
 * Main PendingAction interface (database row)
 */
export interface PendingAction extends RowDataPacket {
  id: string;
  actionType: ActionType;
  requestedById: string;
  requestedAt: Date;
  targetUserId?: string;
  status: ActionStatus;
  reviewedById?: string;
  reviewedAt?: Date;
  reviewNotes?: string;
  actionData: RegistrationActionData | DeactivationActionData | DeletionActionData;
  priority: ActionPriority;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * PendingAction with requester details (for frontend display)
 */
export interface PendingActionWithRequester extends PendingAction {
  requesterName: string;
  requesterEmail?: string;
  requesterRole: string;
  reviewerName?: string;
  targetUserName?: string;
}

/**
 * Input for creating a new pending action
 */
export interface PendingActionCreateInput {
  actionType: ActionType;
  requestedById: string;
  targetUserId?: string; // Required for DEACTIVATE_USER and DELETE_USER
  actionData: RegistrationActionData | DeactivationActionData | DeletionActionData;
  priority?: ActionPriority;
}

/**
 * Filters for querying pending actions
 */
export interface PendingActionFilters {
  status?: ActionStatus;
  actionType?: ActionType;
  requestedById?: string;
  limit?: number;
  offset?: number;
}

/**
 * Response for approve/reject operations
 */
export interface PendingActionResponse {
  success: boolean;
  message: string;
  actionId: string;
  credentials?: {
    username: string;
    password: string;
    studentNumber: string;
    fullName: string;
  };
}

/**
 * List result for pending actions
 */
export interface PendingActionListResult {
  pendingActions: PendingActionWithRequester[];
  total: number;
  unreviewed: number;
}
