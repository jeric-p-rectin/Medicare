import { RowDataPacket } from 'mysql2';

/**
 * Database row types extending RowDataPacket
 */
export interface DuplicateDetectionRow extends RowDataPacket {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  lrn: string;
}

export interface AuditLogEntry extends RowDataPacket {
  id: string;
  user_id: string;
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
  table_name: string;
  record_id: string | null;
  old_values: string | null;
  new_values: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: Date;
}

export interface UserRow extends RowDataPacket {
  id: string;
  username: string;
}

/**
 * Application layer types (camelCase)
 */
export interface AuditLogWithUser extends RowDataPacket {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
  tableName: string;
  recordId: string | null;
  oldValues: unknown;
  newValues: unknown;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

/**
 * Error handling utilities
 */
export interface ErrorWithMessage {
  message: string;
}

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return { message: JSON.stringify(maybeError) };
  } catch {
    return { message: String(maybeError) };
  }
}
