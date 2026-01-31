import { query } from '../db';
import type { Section, SectionWithCount } from '@/types/section';

/**
 * Get all sections for a specific grade
 */
export async function getSectionsByGrade(grade: string): Promise<Section[]> {
  const sql = `
    SELECT
      id,
      grade_level as gradeLevel,
      alternative_level as alternativeLevel,
      section_name as sectionName,
      display_name as displayName,
      section_category as sectionCategory,
      is_active as isActive,
      created_at as createdAt,
      updated_at as updatedAt
    FROM sections
    WHERE grade_level = ? AND is_active = TRUE
    ORDER BY section_name ASC
  `;

  return query<Section>(sql, [grade]);
}

/**
 * Get all sections across all grades with student counts
 */
export async function getAllSectionsWithCounts(): Promise<SectionWithCount[]> {
  const sql = `
    SELECT
      s.id,
      s.grade_level as gradeLevel,
      s.alternative_level as alternativeLevel,
      s.section_name as sectionName,
      s.display_name as displayName,
      s.section_category as sectionCategory,
      COUNT(st.id) as studentCount
    FROM sections s
    LEFT JOIN students st ON s.grade_level = st.grade_level AND s.section_name = st.section
    WHERE s.is_active = TRUE
    GROUP BY s.id, s.grade_level, s.alternative_level, s.section_name, s.display_name, s.section_category
    ORDER BY s.grade_level ASC, s.section_name ASC
  `;

  return query<SectionWithCount>(sql);
}

/**
 * Get all sections (without counts)
 */
export async function getAllSections(): Promise<Section[]> {
  const sql = `
    SELECT
      id,
      grade_level as gradeLevel,
      alternative_level as alternativeLevel,
      section_name as sectionName,
      display_name as displayName,
      section_category as sectionCategory,
      is_active as isActive,
      created_at as createdAt,
      updated_at as updatedAt
    FROM sections
    WHERE is_active = TRUE
    ORDER BY grade_level ASC, section_name ASC
  `;

  return query<Section>(sql);
}
