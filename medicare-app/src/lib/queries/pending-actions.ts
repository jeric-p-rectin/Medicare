import { query, queryOne, execute } from '../db';
import { createAlert } from './alerts';
import type {
  PendingAction,
  PendingActionWithRequester,
  PendingActionCreateInput,
  PendingActionFilters,
  ActionStatus,
} from '@/types/pending-action';

/**
 * Helper function to generate notification title based on action type
 */
function getNotificationTitle(actionType: string): string {
  switch (actionType) {
    case 'REGISTER_STUDENT':
      return 'New Student Registration Request';
    case 'DEACTIVATE_USER':
      return 'New User Deactivation Request';
    case 'DELETE_USER':
      return 'New User Deletion Request';
    default:
      return 'New Pending Action';
  }
}

/**
 * Helper function to generate notification message based on action type
 */
function getNotificationMessage(actionType: string, requesterName: string, actionData: any): string {
  switch (actionType) {
    case 'REGISTER_STUDENT':
      return `${requesterName} has submitted a student registration request for ${actionData.firstName} ${actionData.lastName} (Grade ${actionData.gradeLevel} ${actionData.section}). Please review in the Pending Approvals tab.`;
    case 'DEACTIVATE_USER':
      return `${requesterName} has requested to deactivate user ${actionData.username || actionData.fullName}. Please review in the Pending Approvals tab.`;
    case 'DELETE_USER':
      return `${requesterName} has requested to delete user ${actionData.username || actionData.fullName}. Please review in the Pending Approvals tab.`;
    default:
      return `${requesterName} has submitted a new request. Please review in the Pending Approvals tab.`;
  }
}

/**
 * Create a new pending action
 */
export async function createPendingAction(data: PendingActionCreateInput): Promise<string> {
  const sql = `
    INSERT INTO pending_actions (
      id,
      action_type,
      requested_by_id,
      target_user_id,
      action_data,
      priority,
      status
    ) VALUES (UUID(), ?, ?, ?, ?, ?, 'PENDING')
  `;

  const params = [
    data.actionType,
    data.requestedById,
    data.targetUserId || null,
    JSON.stringify(data.actionData),
    data.priority || 'MEDIUM',
  ];

  const result = await execute(sql, params);

  // Get the inserted ID
  const selectSql = `
    SELECT id FROM pending_actions
    WHERE requested_by_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  const pendingAction = await queryOne<{ id: string }>(selectSql, [data.requestedById]);
  const pendingActionId = pendingAction!.id;

  // Create notification alert for SUPER_ADMIN
  try {
    // Get requester details
    const requesterSql = `
      SELECT CONCAT(first_name, ' ', last_name) as fullName, email
      FROM users
      WHERE id = ?
    `;
    const requester = await queryOne<{ fullName: string; email: string }>(requesterSql, [data.requestedById]);
    const requesterName = requester?.fullName || requester?.email || `User ${data.requestedById}`;

    const alertId = await createAlert({
      alertType: 'SYSTEM',
      title: getNotificationTitle(data.actionType),
      message: getNotificationMessage(data.actionType, requesterName, data.actionData),
      severity: data.priority === 'HIGH' ? 'HIGH' : 'MEDIUM',
    });

    console.log(`[createPendingAction] Notification alert created (ID: ${alertId}) for pending action ${pendingActionId}`);
  } catch (alertError) {
    // Don't fail the entire request if alert creation fails
    // The pending action is still created successfully
    console.error('[createPendingAction] Failed to create notification alert:', alertError);
    console.error('[createPendingAction] Alert details:', {
      alertType: 'SYSTEM',
      title: getNotificationTitle(data.actionType),
      actionType: data.actionType,
    });
  }

  return pendingActionId;
}

/**
 * Get pending actions with filters
 */
export async function getPendingActions(filters?: PendingActionFilters): Promise<PendingActionWithRequester[]> {
  let sql = `
    SELECT
      pa.id,
      pa.action_type as actionType,
      pa.requested_by_id as requestedById,
      pa.requested_at as requestedAt,
      pa.target_user_id as targetUserId,
      pa.status,
      pa.reviewed_by_id as reviewedById,
      pa.reviewed_at as reviewedAt,
      pa.review_notes as reviewNotes,
      pa.action_data as actionData,
      pa.priority,
      pa.created_at as createdAt,
      pa.updated_at as updatedAt,
      CONCAT(requester.first_name, ' ', requester.last_name) as requesterName,
      requester.email as requesterEmail,
      requester.role as requesterRole,
      CONCAT(reviewer.first_name, ' ', reviewer.last_name) as reviewerName,
      CONCAT(target.first_name, ' ', target.last_name) as targetUserName
    FROM pending_actions pa
    INNER JOIN users requester ON pa.requested_by_id = requester.id
    LEFT JOIN users reviewer ON pa.reviewed_by_id = reviewer.id
    LEFT JOIN users target ON pa.target_user_id = target.id
  `;

  const whereClauses: string[] = [];
  const params: any[] = [];

  if (filters?.status) {
    whereClauses.push('pa.status = ?');
    params.push(filters.status);
  }

  if (filters?.actionType) {
    whereClauses.push('pa.action_type = ?');
    params.push(filters.actionType);
  }

  if (filters?.requestedById) {
    whereClauses.push('pa.requested_by_id = ?');
    params.push(filters.requestedById);
  }

  if (whereClauses.length > 0) {
    sql += ` WHERE ${whereClauses.join(' AND ')}`;
  }

  // Order by priority and creation date
  sql += " ORDER BY FIELD(pa.priority, 'HIGH', 'MEDIUM', 'LOW'), pa.created_at DESC";

  // Apply limit and offset
  if (filters?.limit) {
    const limitInt = Math.max(1, Math.min(parseInt(String(filters.limit)) || 50, 1000));
    sql += ` LIMIT ${limitInt}`;

    if (filters?.offset) {
      const offsetInt = Math.max(0, parseInt(String(filters.offset)) || 0);
      sql += ` OFFSET ${offsetInt}`;
    }
  }

  const results = await query<PendingActionWithRequester>(sql, params);

  // Parse JSON action_data for each result
  return results.map(action => ({
    ...action,
    actionData: typeof action.actionData === 'string'
      ? JSON.parse(action.actionData)
      : action.actionData
  }));
}

/**
 * Get a single pending action by ID
 */
export async function getPendingActionById(id: string): Promise<PendingActionWithRequester | null> {
  const sql = `
    SELECT
      pa.id,
      pa.action_type as actionType,
      pa.requested_by_id as requestedById,
      pa.requested_at as requestedAt,
      pa.target_user_id as targetUserId,
      pa.status,
      pa.reviewed_by_id as reviewedById,
      pa.reviewed_at as reviewedAt,
      pa.review_notes as reviewNotes,
      pa.action_data as actionData,
      pa.priority,
      pa.created_at as createdAt,
      pa.updated_at as updatedAt,
      CONCAT(requester.first_name, ' ', requester.last_name) as requesterName,
      requester.email as requesterEmail,
      requester.role as requesterRole,
      CONCAT(reviewer.first_name, ' ', reviewer.last_name) as reviewerName,
      CONCAT(target.first_name, ' ', target.last_name) as targetUserName
    FROM pending_actions pa
    INNER JOIN users requester ON pa.requested_by_id = requester.id
    LEFT JOIN users reviewer ON pa.reviewed_by_id = reviewer.id
    LEFT JOIN users target ON pa.target_user_id = target.id
    WHERE pa.id = ?
  `;

  const result = await queryOne<PendingActionWithRequester>(sql, [id]);

  if (!result) return null;

  // Parse JSON action_data
  return {
    ...result,
    actionData: typeof result.actionData === 'string'
      ? JSON.parse(result.actionData)
      : result.actionData
  };
}

/**
 * Approve a pending action
 */
export async function approvePendingAction(
  id: string,
  reviewedById: string,
  notes?: string
): Promise<void> {
  const sql = `
    UPDATE pending_actions
    SET
      status = 'APPROVED',
      reviewed_by_id = ?,
      reviewed_at = CURRENT_TIMESTAMP,
      review_notes = ?
    WHERE id = ? AND status = 'PENDING'
  `;

  await execute(sql, [reviewedById, notes || null, id]);
}

/**
 * Reject a pending action
 */
export async function rejectPendingAction(
  id: string,
  reviewedById: string,
  notes: string
): Promise<void> {
  const sql = `
    UPDATE pending_actions
    SET
      status = 'REJECTED',
      reviewed_by_id = ?,
      reviewed_at = CURRENT_TIMESTAMP,
      review_notes = ?
    WHERE id = ? AND status = 'PENDING'
  `;

  await execute(sql, [reviewedById, notes, id]);
}

/**
 * Delete/cancel a pending action
 */
export async function deletePendingAction(id: string): Promise<void> {
  const sql = `DELETE FROM pending_actions WHERE id = ?`;
  await execute(sql, [id]);
}

/**
 * Count pending actions by status
 */
export async function countPendingByStatus(status: ActionStatus = 'PENDING'): Promise<number> {
  const sql = `SELECT COUNT(*) as count FROM pending_actions WHERE status = ?`;
  const result = await queryOne<{ count: number }>(sql, [status]);
  return result?.count || 0;
}

/**
 * Check if a pending action exists for a specific user action
 * (Prevents duplicate pending requests)
 */
export async function pendingActionExists(
  actionType: string,
  targetUserId?: string,
  requestedById?: string
): Promise<boolean> {
  let sql = `
    SELECT COUNT(*) as count
    FROM pending_actions
    WHERE action_type = ?
    AND status = 'PENDING'
  `;

  const params: any[] = [actionType];

  if (targetUserId) {
    sql += ' AND target_user_id = ?';
    params.push(targetUserId);
  }

  if (requestedById) {
    sql += ' AND requested_by_id = ?';
    params.push(requestedById);
  }

  const result = await queryOne<{ count: number }>(sql, params);
  return (result?.count || 0) > 0;
}
