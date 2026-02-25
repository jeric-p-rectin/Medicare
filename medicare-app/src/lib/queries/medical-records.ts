import { query, queryOne, execute } from '../db';
import type { MedicalRecord, MedicalRecordCreateInput, MedicalRecordUpdateInput, MedicalRecordWithStudent, MedicalRecordListOptions, MedicalRecordListResult } from '@/types/medical-record';

/**
 * Get all medical records for a student (chronological order)
 */
export async function getStudentMedicalRecords(studentId: string): Promise<MedicalRecord[]> {
  const sql = `
    SELECT
      mr.id,
      mr.student_id as studentId,
      mr.visit_date as visitDate,
      mr.chief_complaint as chiefComplaint,
      mr.diagnosis,
      mr.treatment,
      mr.notes,
      mr.disease_category as diseaseCategory,
      mr.illness_type as illnessType,
      mr.severity,
      mr.is_outbreak_related as isOutbreakRelated,
      mr.recorded_by_id as recordedById,
      CONCAT(u.first_name, ' ', u.last_name) as recordedByName,
      mr.created_at as createdAt,
      mr.updated_at as updatedAt
    FROM medical_records mr
    JOIN users u ON mr.recorded_by_id = u.id
    WHERE mr.student_id = ?
    ORDER BY mr.visit_date DESC, mr.created_at DESC
  `;

  return query<MedicalRecord>(sql, [studentId]);
}

/**
 * Create a new medical record
 * Note: This will trigger outbreak check in the API layer
 */
export async function createMedicalRecord(data: MedicalRecordCreateInput): Promise<string> {
  const sql = `
    INSERT INTO medical_records (
      id, student_id, visit_date, chief_complaint, diagnosis, treatment,
      notes, disease_category, illness_type, severity, recorded_by_id
    ) VALUES (
      UUID(), ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `;

  await query(sql, [
    data.studentId,
    data.visitDate,
    data.chiefComplaint,
    data.diagnosis || null,
    data.treatment || null,
    data.notes || null,
    data.diseaseCategory || null,
    data.illnessType || null,
    data.severity || 'MILD',
    data.recordedById
  ]);

  // Get the created record ID
  const result = await queryOne<{ id: string }>(
    'SELECT id FROM medical_records WHERE student_id = ? ORDER BY created_at DESC LIMIT 1',
    [data.studentId]
  );

  return result?.id || '';
}

/**
 * Update an existing medical record
 */
export async function updateMedicalRecord(id: string, data: MedicalRecordUpdateInput): Promise<void> {
  const updates: string[] = [];
  const params: (string | number | Date | null)[] = [];

  if (data.visitDate) {
    updates.push('visit_date = ?');
    params.push(data.visitDate);
  }
  if (data.chiefComplaint) {
    updates.push('chief_complaint = ?');
    params.push(data.chiefComplaint);
  }
  if (data.diagnosis !== undefined) {
    updates.push('diagnosis = ?');
    params.push(data.diagnosis || null);
  }
  if (data.treatment !== undefined) {
    updates.push('treatment = ?');
    params.push(data.treatment || null);
  }
  if (data.notes !== undefined) {
    updates.push('notes = ?');
    params.push(data.notes || null);
  }
  if (data.diseaseCategory !== undefined) {
    updates.push('disease_category = ?');
    params.push(data.diseaseCategory || null);
  }
  if (data.illnessType !== undefined) {
    updates.push('illness_type = ?');
    params.push(data.illnessType || null);
  }
  if (data.severity) {
    updates.push('severity = ?');
    params.push(data.severity);
  }
  if (data.isOutbreakRelated !== undefined) {
    updates.push('is_outbreak_related = ?');
    params.push(data.isOutbreakRelated ? 1 : 0);
  }

  if (updates.length === 0) return;

  params.push(id);

  const sql = `UPDATE medical_records SET ${updates.join(', ')} WHERE id = ?`;

  await query(sql, params);
}

/**
 * Get a single medical record by ID
 */
export async function getMedicalRecordById(id: string): Promise<MedicalRecord | null> {
  const sql = `
    SELECT
      mr.id,
      mr.student_id as studentId,
      mr.visit_date as visitDate,
      mr.chief_complaint as chiefComplaint,
      mr.diagnosis,
      mr.treatment,
      mr.notes,
      mr.disease_category as diseaseCategory,
      mr.illness_type as illnessType,
      mr.severity,
      mr.is_outbreak_related as isOutbreakRelated,
      mr.recorded_by_id as recordedById,
      CONCAT(u.first_name, ' ', u.last_name) as recordedByName,
      mr.created_at as createdAt,
      mr.updated_at as updatedAt
    FROM medical_records mr
    JOIN users u ON mr.recorded_by_id = u.id
    WHERE mr.id = ?
    LIMIT 1
  `;

  return queryOne<MedicalRecord>(sql, [id]);
}

/**
 * Delete a medical record by ID
 * Note: Audit logging should be done in the API layer BEFORE calling this function
 */
export async function deleteMedicalRecord(id: string): Promise<void> {
  const sql = 'DELETE FROM medical_records WHERE id = ?';
  await execute(sql, [id]);
}

/**
 * Get all medical records across all students with filtering and pagination
 */
export async function getAllMedicalRecords(options: MedicalRecordListOptions): Promise<MedicalRecordListResult> {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(100, Math.max(1, options.limit ?? 20));
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (options.search) {
    const like = `%${options.search}%`;
    conditions.push('(u.first_name LIKE ? OR u.last_name LIKE ? OR mr.chief_complaint LIKE ?)');
    params.push(like, like, like);
  }
  if (options.grade) {
    conditions.push('s.grade_level = ?');
    params.push(options.grade);
  }
  if (options.section) {
    conditions.push('s.section = ?');
    params.push(options.section);
  }
  if (options.diseaseCategory) {
    conditions.push('mr.disease_category = ?');
    params.push(options.diseaseCategory);
  }
  if (options.severity) {
    conditions.push('mr.severity = ?');
    params.push(options.severity);
  }
  if (options.dateFrom) {
    conditions.push('mr.visit_date >= ?');
    params.push(options.dateFrom);
  }
  if (options.dateTo) {
    conditions.push('mr.visit_date <= ?');
    params.push(options.dateTo);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const countSql = `
    SELECT COUNT(*) as total
    FROM medical_records mr
    JOIN students s  ON mr.student_id     = s.id
    JOIN users u     ON s.user_id         = u.id
    JOIN users rec   ON mr.recorded_by_id = rec.id
    ${whereClause}
  `;

  const dataSql = `
    SELECT
      mr.id,
      mr.student_id          AS studentId,
      CONCAT(u.last_name, ', ', u.first_name,
             CASE WHEN u.middle_name IS NOT NULL AND u.middle_name != ''
                  THEN CONCAT(' ', u.middle_name) ELSE '' END) AS studentName,
      s.grade_level          AS gradeLevel,
      s.section,
      mr.visit_date          AS visitDate,
      mr.chief_complaint     AS chiefComplaint,
      mr.diagnosis,
      mr.treatment,
      mr.notes,
      mr.disease_category    AS diseaseCategory,
      mr.illness_type        AS illnessType,
      mr.severity,
      mr.is_outbreak_related AS isOutbreakRelated,
      mr.recorded_by_id      AS recordedById,
      CONCAT(rec.first_name, ' ', rec.last_name) AS recordedByName,
      mr.created_at          AS createdAt,
      mr.updated_at          AS updatedAt
    FROM medical_records mr
    JOIN students s  ON mr.student_id     = s.id
    JOIN users u     ON s.user_id         = u.id
    JOIN users rec   ON mr.recorded_by_id = rec.id
    ${whereClause}
    ORDER BY mr.visit_date DESC, mr.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [countResult, records] = await Promise.all([
    queryOne<{ total: number }>(countSql, params),
    query<MedicalRecordWithStudent>(dataSql, params),
  ]);

  const total = countResult?.total ?? 0;

  return {
    records,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Bulk delete medical records by IDs
 * Note: Audit logging must be done in the API layer BEFORE calling this function
 */
export async function bulkDeleteMedicalRecords(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const placeholders = ids.map(() => '?').join(', ');
  const sql = `DELETE FROM medical_records WHERE id IN (${placeholders})`;
  await execute(sql, ids);
}
