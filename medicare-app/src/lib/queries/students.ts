import { query, queryOne, transaction } from '../db';
import type { Student, StudentCreateInput, StudentUpdateInput, StudentSearchOptions, StudentListResult } from '@/types/student';

/**
 * Find students with search, pagination, and filters
 */
export async function findStudents(options: StudentSearchOptions): Promise<StudentListResult> {
  const { page = 1, limit = 20, search = '', grade = '', section = '' } = options;

  // Validate pagination parameters (should already be numbers from API route)
  const pageInt = typeof page === 'number' && !isNaN(page) && page > 0
    ? Math.floor(page)
    : 1;

  const limitInt = typeof limit === 'number' && !isNaN(limit) && limit > 0
    ? Math.max(1, Math.min(Math.floor(limit), 1000))
    : 20;

  const offset = (pageInt - 1) * limitInt;

  // DEBUG: Log validated values
  console.log('[findStudents] Pagination:', { pageInt, limitInt, offset });
  console.log('[findStudents] Filters:', { search, grade, section });

  let whereClauses: string[] = [];
  let params: (string | number)[] = [];

  // Search filter
  if (search) {
    whereClauses.push(`(
      u.first_name LIKE ? OR
      u.last_name LIKE ? OR
      s.student_number LIKE ? OR
      s.lrn LIKE ?
    )`);
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  // Grade filter
  if (grade) {
    whereClauses.push('s.grade_level = ?');
    params.push(grade);
  }

  // Section filter
  if (section) {
    whereClauses.push('s.section = ?');
    params.push(section);
  }

  const whereClause = whereClauses.length > 0
    ? `WHERE ${whereClauses.join(' AND ')}`
    : '';

  // Get students
  // Use direct interpolation for LIMIT/OFFSET (values are validated integers)
  // to avoid mysql2 parameter type issues with prepared statements
  const sql = `
    SELECT
      s.id,
      s.user_id as userId,
      u.first_name as firstName,
      u.last_name as lastName,
      u.middle_name as middleName,
      s.age,
      s.date_of_birth as dateOfBirth,
      s.sex,
      s.grade_level as gradeLevel,
      s.section,
      s.lrn,
      s.student_number as studentNumber,
      s.parent_guardian_name as parentGuardianName,
      s.parent_guardian_contact as parentGuardianContact,
      s.address,
      s.bmi,
      s.health_history as healthHistory,
      s.created_by_id as createdById,
      s.updated_by_id as updatedById,
      s.created_at as createdAt,
      s.updated_at as updatedAt
    FROM students s
    JOIN users u ON s.user_id = u.id
    ${whereClause}
    ORDER BY u.last_name, u.first_name
    LIMIT ${limitInt} OFFSET ${offset}
  `;

  // Pass only WHERE clause parameters (LIMIT/OFFSET are interpolated)
  const students = await query<Student>(sql, params);

  // Get total count
  const countSql = `
    SELECT COUNT(*) as total
    FROM students s
    JOIN users u ON s.user_id = u.id
    ${whereClause}
  `;
  const countResult = await queryOne<{ total: number }>(countSql, params);
  const total = countResult?.total || 0;

  return {
    students,
    total,
    page: pageInt,
    limit: limitInt,
    totalPages: Math.ceil(total / limitInt)
  };
}

/**
 * Find a single student by ID with full details
 */
export async function findStudentById(id: string): Promise<Student | null> {
  const sql = `
    SELECT
      s.id,
      s.user_id as userId,
      u.first_name as firstName,
      u.last_name as lastName,
      u.middle_name as middleName,
      s.age,
      s.date_of_birth as dateOfBirth,
      s.sex,
      s.grade_level as gradeLevel,
      s.section,
      s.lrn,
      s.student_number as studentNumber,
      s.parent_guardian_name as parentGuardianName,
      s.parent_guardian_contact as parentGuardianContact,
      s.address,
      s.bmi,
      s.health_history as healthHistory,
      s.created_by_id as createdById,
      s.updated_by_id as updatedById,
      s.created_at as createdAt,
      s.updated_at as updatedAt
    FROM students s
    JOIN users u ON s.user_id = u.id
    WHERE s.id = ?
    LIMIT 1
  `;

  return queryOne<Student>(sql, [id]);
}

/**
 * Convert various date formats to MySQL DATE format (YYYY-MM-DD)
 * Handles: ISO strings, Date objects, and MySQL DATE strings
 */
function toMySQLDate(date: Date | string): string {
  if (typeof date === 'string') {
    // If already in YYYY-MM-DD format, return as-is
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    // Parse ISO datetime string or other formats
    date = new Date(date);
  }

  // Convert Date object to YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Create a new student (creates user account + student record in transaction)
 */
export async function createStudent(data: StudentCreateInput): Promise<string> {
  return transaction(async (connection) => {
    // Create user account first
    const userSql = `
      INSERT INTO users (id, username, email, password, role, first_name, last_name, middle_name)
      VALUES (UUID(), ?, ?, ?, 'PATIENT', ?, ?, ?)
    `;

    await connection.execute(userSql, [
      data.username,
      data.email || null,
      data.password,
      data.firstName,
      data.lastName,
      data.middleName || null
    ]);

    // Get the created user ID
    const [userRows]: any = await connection.execute(
      'SELECT id FROM users WHERE username = ? LIMIT 1',
      [data.username]
    );
    const userId = userRows[0].id;

    // Create student record
    const studentSql = `
      INSERT INTO students (
        id, user_id, lrn, student_number, date_of_birth, age, sex,
        grade_level, section, address, parent_guardian_name, parent_guardian_contact,
        bmi, health_history, created_by_id
      ) VALUES (
        UUID(), ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?
      )
    `;

    await connection.execute(studentSql, [
      userId,
      data.lrn,
      data.studentNumber,
      toMySQLDate(data.dateOfBirth),
      data.age,
      data.sex,
      data.gradeLevel,
      data.section,
      data.address,
      data.parentGuardianName,
      data.parentGuardianContact,
      data.bmi || null,
      data.healthHistory || null,
      data.createdById
    ]);

    // Get the created student ID
    const [studentRows]: any = await connection.execute(
      'SELECT id FROM students WHERE user_id = ? LIMIT 1',
      [userId]
    );

    return studentRows[0].id;
  });
}

/**
 * Update student information
 */
export async function updateStudent(id: string, data: StudentUpdateInput): Promise<void> {
  const updates: string[] = [];
  const params: any[] = [];

  // Build dynamic UPDATE query based on provided fields
  if (data.firstName) {
    updates.push('u.first_name = ?');
    params.push(data.firstName);
  }
  if (data.lastName) {
    updates.push('u.last_name = ?');
    params.push(data.lastName);
  }
  if (data.middleName !== undefined) {
    updates.push('u.middle_name = ?');
    params.push(data.middleName || null);
  }
  if (data.dateOfBirth) {
    updates.push('s.date_of_birth = ?');
    params.push(data.dateOfBirth);
  }
  if (data.age) {
    updates.push('s.age = ?');
    params.push(data.age);
  }
  if (data.sex) {
    updates.push('s.sex = ?');
    params.push(data.sex);
  }
  if (data.gradeLevel) {
    updates.push('s.grade_level = ?');
    params.push(data.gradeLevel);
  }
  if (data.section) {
    updates.push('s.section = ?');
    params.push(data.section);
  }
  if (data.address) {
    updates.push('s.address = ?');
    params.push(data.address);
  }
  if (data.parentGuardianName) {
    updates.push('s.parent_guardian_name = ?');
    params.push(data.parentGuardianName);
  }
  if (data.parentGuardianContact) {
    updates.push('s.parent_guardian_contact = ?');
    params.push(data.parentGuardianContact);
  }
  if (data.bmi !== undefined) {
    updates.push('s.bmi = ?');
    params.push(data.bmi || null);
  }
  if (data.healthHistory !== undefined) {
    updates.push('s.health_history = ?');
    params.push(data.healthHistory || null);
  }

  // Always update updated_by_id
  updates.push('s.updated_by_id = ?');
  params.push(data.updatedById);

  if (updates.length === 0) return;

  // Add student ID to params
  params.push(id);

  const sql = `
    UPDATE students s
    JOIN users u ON s.user_id = u.id
    SET ${updates.join(', ')}
    WHERE s.id = ?
  `;

  await query(sql, params);
}

/**
 * Check for duplicate students (by name, DOB, and LRN)
 * Uses case-insensitive matching for names
 * Note: This function is kept for potential future use but is no longer
 * called during student registration (alert-based workflow)
 */
export async function checkDuplicateStudent(
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  lrn?: string
): Promise<Student[]> {
  let sql = `
    SELECT
      s.id,
      u.first_name as firstName,
      u.last_name as lastName,
      u.middle_name as middleName,
      s.lrn,
      s.grade_level as gradeLevel,
      s.section,
      s.date_of_birth as dateOfBirth
    FROM students s
    JOIN users u ON s.user_id = u.id
    WHERE (LOWER(u.first_name) = LOWER(?) AND LOWER(u.last_name) = LOWER(?) AND s.date_of_birth = ?)
  `;

  const params: any[] = [firstName, lastName, dateOfBirth];

  // Also check for LRN match if provided
  if (lrn) {
    sql += ` OR s.lrn = ?`;
    params.push(lrn);
  }

  return query<Student>(sql, params);
}

/**
 * Find a student by user ID
 * Used for PATIENT users to access their own student record
 */
export async function findStudentByUserId(userId: string): Promise<Student | null> {
  const sql = `
    SELECT
      s.id,
      s.user_id as userId,
      u.first_name as firstName,
      u.last_name as lastName,
      u.middle_name as middleName,
      s.age,
      s.date_of_birth as dateOfBirth,
      s.sex,
      s.grade_level as gradeLevel,
      s.section,
      s.lrn,
      s.student_number as studentNumber,
      s.parent_guardian_name as parentGuardianName,
      s.parent_guardian_contact as parentGuardianContact,
      s.address,
      s.bmi,
      s.health_history as healthHistory,
      s.created_by_id as createdById,
      s.updated_by_id as updatedById,
      s.created_at as createdAt,
      s.updated_at as updatedAt
    FROM students s
    JOIN users u ON s.user_id = u.id
    WHERE s.user_id = ?
    LIMIT 1
  `;

  return queryOne<Student>(sql, [userId]);
}
