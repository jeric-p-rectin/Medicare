import { query } from './db';

/**
 * Log an action to the audit log
 * Records who did what, when, and what changed
 */
export async function logAction(
  userId: string,
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE',
  tableName: string,
  recordId: string | null = null,
  oldValues: any = null,
  newValues: any = null,
  request?: Request
): Promise<void> {
  // Extract IP and user agent from request if provided
  let ipAddress: string | null = null;
  let userAgent: string | null = null;

  if (request) {
    // Try to get real IP from headers (behind proxy)
    ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      null;

    userAgent = request.headers.get('user-agent') || null;
  }

  const sql = `
    INSERT INTO audit_logs (
      id, user_id, action, table_name, record_id,
      old_values, new_values, ip_address, user_agent
    ) VALUES (
      UUID(), ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `;

  await query(sql, [
    userId,
    action,
    tableName,
    recordId,
    oldValues ? JSON.stringify(oldValues) : null,
    newValues ? JSON.stringify(newValues) : null,
    ipAddress,
    userAgent
  ]);
}

/**
 * Get audit logs for a specific record
 */
export async function getRecordAuditLogs(tableName: string, recordId: string): Promise<any[]> {
  const sql = `
    SELECT
      al.id,
      al.user_id as userId,
      CONCAT(u.first_name, ' ', u.last_name) as userName,
      u.role as userRole,
      al.action,
      al.old_values as oldValues,
      al.new_values as newValues,
      al.ip_address as ipAddress,
      al.created_at as createdAt
    FROM audit_logs al
    JOIN users u ON al.user_id = u.id
    WHERE al.table_name = ? AND al.record_id = ?
    ORDER BY al.created_at DESC
  `;

  return query(sql, [tableName, recordId]);
}

/**
 * Get recent audit logs for a user
 */
export async function getUserAuditLogs(userId: string, limit: number = 50): Promise<any[]> {
  const sql = `
    SELECT
      al.id,
      al.action,
      al.table_name as tableName,
      al.record_id as recordId,
      al.ip_address as ipAddress,
      al.created_at as createdAt
    FROM audit_logs al
    WHERE al.user_id = ?
    ORDER BY al.created_at DESC
    LIMIT ?
  `;

  return query(sql, [userId, limit]);
}
