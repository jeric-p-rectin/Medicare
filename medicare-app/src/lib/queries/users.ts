import { query, queryOne, execute } from '../db';
import { User, UserCreateInput } from '@/types/user';
import { RowDataPacket } from 'mysql2';

/**
 * Find a user by their username
 * Used for authentication
 */
export async function findUserByUsername(username: string): Promise<User | null> {
  const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
  return queryOne<User>(sql, [username]);
}

/**
 * Find a user by their ID
 */
export async function findUserById(id: string): Promise<User | null> {
  const sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';
  return queryOne<User>(sql, [id]);
}

/**
 * Find a user by their email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
  return queryOne<User>(sql, [email]);
}

/**
 * Create a new user
 * Returns the created user's ID
 */
export async function createUser(data: UserCreateInput): Promise<string> {
  const sql = `
    INSERT INTO users (id, username, email, password, role, first_name, last_name, middle_name)
    VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)
  `;

  await execute(sql, [
    data.username,
    data.email || null,
    data.password,
    data.role,
    data.firstName,
    data.lastName,
    data.middleName || null
  ]);

  // Get the created user's ID
  const user = await findUserByUsername(data.username);
  if (!user) {
    throw new Error('Failed to create user');
  }

  return user.id;
}

/**
 * Update user's last login timestamp
 */
export async function updateUserLastLogin(userId: string): Promise<void> {
  const sql = 'UPDATE users SET last_login = NOW() WHERE id = ?';
  await execute(sql, [userId]);
}

/**
 * Get all users, optionally filtered by role
 */
export async function getAllUsers(role?: string): Promise<User[]> {
  let sql = 'SELECT id, username, email, role, first_name, last_name, middle_name, is_active, last_login, created_at, updated_at FROM users WHERE 1=1';
  const params: (string | number | boolean | null)[] = [];

  if (role) {
    sql += ' AND role = ?';
    params.push(role);
  }

  sql += ' ORDER BY created_at DESC';

  return query<User>(sql, params);
}

/**
 * Update user's active status
 */
export async function updateUserStatus(userId: string, isActive: boolean): Promise<void> {
  const sql = 'UPDATE users SET is_active = ? WHERE id = ?';
  await execute(sql, [isActive, userId]);
}

/**
 * Update user profile
 */
export async function updateUser(
  userId: string,
  data: Partial<{
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
  }>
): Promise<void> {
  const updates: string[] = [];
  const params: (string | null)[] = [];

  if (data.email !== undefined) {
    updates.push('email = ?');
    params.push(data.email);
  }
  if (data.firstName !== undefined) {
    updates.push('first_name = ?');
    params.push(data.firstName);
  }
  if (data.lastName !== undefined) {
    updates.push('last_name = ?');
    params.push(data.lastName);
  }
  if (data.middleName !== undefined) {
    updates.push('middle_name = ?');
    params.push(data.middleName || null);
  }

  if (updates.length === 0) return;

  params.push(userId);
  const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
  await execute(sql, params);
}

/**
 * Update user password
 */
export async function updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
  const sql = 'UPDATE users SET password = ? WHERE id = ?';
  await execute(sql, [hashedPassword, userId]);
}

/**
 * Check if username exists
 */
export async function usernameExists(username: string): Promise<boolean> {
  const sql = 'SELECT 1 FROM users WHERE username = ? LIMIT 1';
  const result = await queryOne<RowDataPacket>(sql, [username]);
  return result !== null;
}

/**
 * Check if email exists
 */
export async function emailExists(email: string): Promise<boolean> {
  const sql = 'SELECT 1 FROM users WHERE email = ? LIMIT 1';
  const result = await queryOne<RowDataPacket>(sql, [email]);
  return result !== null;
}

/**
 * Delete a user (hard delete - permanently removes user from database)
 * Student records will be cascaded due to foreign key constraints
 */
export async function deleteUser(userId: string): Promise<void> {
  const sql = 'DELETE FROM users WHERE id = ?';
  await execute(sql, [userId]);
}
