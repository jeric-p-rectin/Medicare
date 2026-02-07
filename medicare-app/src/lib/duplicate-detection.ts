import { query } from './db';
import { createAlert } from './queries/alerts';
import { DuplicateDetectionRow } from '@/types/api-response';

/**
 * Compare two dates by YYYY-MM-DD string (ignores time/timezone)
 */
function compareDates(date1: Date, date2: Date): boolean {
  return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
}

/**
 * Detect if a student is a potential duplicate and create alerts
 *
 * This function runs AFTER a student is successfully created.
 * It uses an alert-based workflow: duplicates are allowed but flagged for admin review.
 *
 * Matching criteria (case-insensitive for names):
 * - First name + Last name + DOB = potential duplicate
 * - LRN match = potential duplicate
 *
 * Scoring: 25 points per matching field (first name, last name, DOB, LRN)
 * Threshold: ≥50% similarity creates an alert
 *
 * Note: LRN duplicates are prevented at the database level (unique constraint),
 * so this function will never encounter true LRN duplicates.
 */
export async function detectDuplicate(
  studentId: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  lrn: string
): Promise<void> {
  // Find potential duplicates (match ANY field, scoring determines if alert-worthy)
  const sql = `
    SELECT
      s.id,
      u.first_name,
      u.last_name,
      s.date_of_birth,
      s.lrn
    FROM students s
    JOIN users u ON s.user_id = u.id
    WHERE s.id != ?
    AND (
      LOWER(u.first_name) = LOWER(?)
      OR LOWER(u.last_name) = LOWER(?)
      OR s.date_of_birth = ?
      OR s.lrn = ?
    )
  `;

  const duplicates = await query<DuplicateDetectionRow>(sql, [
    studentId,
    firstName,
    lastName,
    dateOfBirth,
    lrn
  ]);

  // Process each potential duplicate
  for (const duplicate of duplicates) {
    const matchingFields: string[] = [];
    let similarityScore = 0;

    // Check which fields match (case-insensitive)
    if (duplicate.first_name.toLowerCase() === firstName.toLowerCase()) {
      matchingFields.push('first_name');
      similarityScore += 25;
    }
    if (duplicate.last_name.toLowerCase() === lastName.toLowerCase()) {
      matchingFields.push('last_name');
      similarityScore += 25;
    }
    if (compareDates(new Date(duplicate.date_of_birth), dateOfBirth)) {
      matchingFields.push('date_of_birth');
      similarityScore += 25;
    }
    if (duplicate.lrn === lrn) {
      matchingFields.push('lrn');
      similarityScore += 25;
    }

    // If similarity >= 50%, record as duplicate and create alert
    if (similarityScore >= 50) {
      // Record in duplicate_detections table
      await query(
        `INSERT INTO duplicate_detections (
          id, student_id_1, student_id_2, similarity_score, matching_fields
        ) VALUES (UUID(), ?, ?, ?, ?)`,
        [studentId, duplicate.id, similarityScore, JSON.stringify(matchingFields)]
      );

      // Create alert for admins
      await createAlert({
        alertType: 'DUPLICATE_DETECTED',
        title: 'Duplicate Student Record Detected',
        message: `Potential duplicate found: ${firstName} ${lastName} has matching information with an existing student record. Matching fields: ${matchingFields.join(', ')}`,
        severity: similarityScore >= 75 ? 'HIGH' : 'MEDIUM',
        relatedStudentId: studentId,
      });
    }
  }
}

/**
 * Calculate similarity between two students
 *
 * Used for comparing student records.
 * Uses case-insensitive matching for names.
 * Returns a score (0-100) and list of matching fields.
 */
export function calculateSimilarity(
  student1: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    lrn: string;
  },
  student2: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    lrn: string;
  }
): { score: number; matchingFields: string[] } {
  let score = 0;
  const matchingFields: string[] = [];

  if (student1.firstName.toLowerCase() === student2.firstName.toLowerCase()) {
    score += 25;
    matchingFields.push('first_name');
  }

  if (student1.lastName.toLowerCase() === student2.lastName.toLowerCase()) {
    score += 25;
    matchingFields.push('last_name');
  }

  if (compareDates(student1.dateOfBirth, student2.dateOfBirth)) {
    score += 25;
    matchingFields.push('date_of_birth');
  }

  if (student1.lrn === student2.lrn) {
    score += 25;
    matchingFields.push('lrn');
  }

  return { score, matchingFields };
}
