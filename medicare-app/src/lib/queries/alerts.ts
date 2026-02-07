import { query, queryOne, execute } from '../db';
import type { Alert, AlertCreateInput } from '@/types/alert';

/**
 * Get all unread alerts
 */
export async function getUnreadAlerts(): Promise<Alert[]> {
  const sql = `
    SELECT
      id,
      alert_type as alertType,
      title,
      message,
      severity,
      related_disease as relatedDisease,
      related_record_id as relatedRecordId,
      related_student_id as relatedStudentId,
      recipient_user_id as recipientUserId,
      is_read as isRead,
      is_resolved as isResolved,
      resolved_by_id as resolvedById,
      resolution_notes as resolutionNotes,
      created_at as createdAt,
      read_at as readAt,
      resolved_at as resolvedAt
    FROM alerts
    WHERE is_read = FALSE
    ORDER BY severity DESC, created_at DESC
  `;

  return query<Alert>(sql);
}

/**
 * Get all alerts (with optional filters)
 */
export async function getAlerts(options?: { unread?: boolean; limit?: number }): Promise<Alert[]> {
  let sql = `
    SELECT
      id,
      alert_type as alertType,
      title,
      message,
      severity,
      related_disease as relatedDisease,
      related_record_id as relatedRecordId,
      related_student_id as relatedStudentId,
      recipient_user_id as recipientUserId,
      is_read as isRead,
      is_resolved as isResolved,
      resolved_by_id as resolvedById,
      resolution_notes as resolutionNotes,
      created_at as createdAt,
      read_at as readAt,
      resolved_at as resolvedAt
    FROM alerts
  `;

  const whereClauses: string[] = [];
  const params: (string | number)[] = [];

  if (options?.unread) {
    whereClauses.push('is_read = ?');
    params.push(0);  // Convert false → 0 for MySQL tinyint(1)
  }

  if (whereClauses.length > 0) {
    sql += ` WHERE ${whereClauses.join(' AND ')}`;
  }

  sql += ' ORDER BY severity DESC, created_at DESC';

  if (options?.limit) {
    // Ensure limit is an integer to prevent SQL injection
    const limitInt = Math.max(1, Math.min(parseInt(String(options.limit)) || 50, 1000));
    sql += ` LIMIT ${limitInt}`;  // Use interpolation - MySQL doesn't support parameterized LIMIT
    // Don't push to params - we're using direct interpolation
  }

  return query<Alert>(sql, params);
}

/**
 * Mark an alert as read
 */
export async function markAlertAsRead(id: string): Promise<void> {
  const sql = `
    UPDATE alerts
    SET is_read = TRUE, read_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  await execute(sql, [id]);
}

/**
 * Create a new alert
 */
export async function createAlert(data: AlertCreateInput): Promise<string> {
  const alertId = crypto.randomUUID();

  const sql = `
    INSERT INTO alerts (
      id, alert_type, title, message, severity,
      related_disease, related_record_id, related_student_id, recipient_user_id
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `;

  await execute(sql, [
    alertId,
    data.alertType,
    data.title,
    data.message,
    data.severity,
    data.relatedDisease || null,
    data.relatedRecordId || null,
    data.relatedStudentId || null,
    data.recipientUserId || null
  ]);

  return alertId;
}

/**
 * Delete an alert
 */
export async function deleteAlert(id: string): Promise<void> {
  const sql = 'DELETE FROM alerts WHERE id = ?';
  await execute(sql, [id]);
}

/**
 * Resolve an alert
 */
export async function resolveAlert(
  id: string,
  resolvedById: string,
  resolutionNotes?: string
): Promise<void> {
  const sql = `
    UPDATE alerts
    SET is_resolved = TRUE, resolved_by_id = ?, resolution_notes = ?, resolved_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  await execute(sql, [resolvedById, resolutionNotes || null, id]);
}

/**
 * Check if an outbreak alert already exists for a disease
 */
export async function outbreakAlertExists(disease: string, hoursAgo: number = 24): Promise<boolean> {
  const sql = `
    SELECT COUNT(*) as count
    FROM alerts
    WHERE alert_type = 'OUTBREAK_SUSPECTED'
    AND related_disease = ?
    AND created_at >= DATE_SUB(NOW(), INTERVAL ? HOUR)
  `;

  const result = await query<{ count: number }>(sql, [disease, hoursAgo]);
  return (result[0]?.count || 0) > 0;
}

/**
 * Check if a DISEASE_TREND alert already exists for a disease within hoursAgo hours.
 * Used for 24-hour spam prevention, mirroring outbreakAlertExists.
 */
export async function trendAlertExists(disease: string, hoursAgo: number = 24): Promise<boolean> {
  const sql = `
    SELECT COUNT(*) as count
    FROM alerts
    WHERE alert_type = 'DISEASE_TREND'
    AND related_disease = ?
    AND created_at >= DATE_SUB(NOW(), INTERVAL ? HOUR)
  `;

  const result = await query<{ count: number }>(sql, [disease, hoursAgo]);
  return (result[0]?.count || 0) > 0;
}
