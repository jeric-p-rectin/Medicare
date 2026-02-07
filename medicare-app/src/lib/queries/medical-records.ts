import { query, queryOne } from '../db';
import type { MedicalRecord, MedicalRecordCreateInput, MedicalRecordUpdateInput } from '@/types/medical-record';

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
