import { query, queryOne } from '../db';
import type { DashboardStats, GradeLevelStats, GradeStats } from '@/types/statistics';

/**
 * Get school-wide statistics
 * Returns total students and breakdown by grade (7-12)
 */
export async function getSchoolWideStats(): Promise<DashboardStats> {
  // Total students
  const totalResult = await queryOne<{ total: number }>(
    'SELECT COUNT(*) as total FROM students'
  );

  // Students per grade
  const gradeResults = await query<GradeStats>(
    `SELECT
      grade_level as grade,
      COUNT(*) as totalStudents
    FROM students
    GROUP BY grade_level
    ORDER BY grade_level ASC`
  );

  return {
    totalStudents: totalResult?.total || 0,
    gradeStats: gradeResults
  };
}

/**
 * Get grade level statistics with sections
 * Returns total students for a grade and breakdown by section
 */
export async function getGradeLevelStats(grade: string): Promise<GradeLevelStats> {
  // Total students in grade
  const totalResult = await queryOne<{ total: number }>(
    'SELECT COUNT(*) as total FROM students WHERE grade_level = ?',
    [grade]
  );

  // Students per section in grade
  const sectionResults = await query<{ sectionName: string; studentCount: number }>(
    `SELECT
      section as sectionName,
      COUNT(*) as studentCount
    FROM students
    WHERE grade_level = ?
    GROUP BY section
    ORDER BY section ASC`,
    [grade]
  );

  return {
    totalStudents: totalResult?.total || 0,
    sections: sectionResults
  };
}
