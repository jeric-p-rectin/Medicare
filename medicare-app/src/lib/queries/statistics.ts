import { query } from '../db';
import type { DiseaseStats, TrendData, TimePeriod, DiseaseMonthlyCount } from '@/types/statistics';

/**
 * Get disease distribution for a time period (for pie/bar charts)
 */
export async function getDiseaseDistribution(timePeriod: TimePeriod): Promise<DiseaseStats[]> {
  const dateFilter = getDateFilter(timePeriod);

  const sql = `
    SELECT
      disease_category as name,
      COUNT(*) as value
    FROM medical_records
    WHERE visit_date >= ${dateFilter}
    AND disease_category IS NOT NULL
    GROUP BY disease_category
    ORDER BY value DESC
  `;

  return query<DiseaseStats>(sql);
}

/**
 * Get trend data over time (for line charts)
 */
export async function getTrendData(timePeriod: TimePeriod): Promise<TrendData[]> {
  const dateFilter = getDateFilter(timePeriod);

  let sql = '';

  switch (timePeriod) {
    case 'week':
    case 'month':
      sql = `
        SELECT
          DATE_FORMAT(visit_date, '%Y-%m-%d') as date,
          COUNT(*) as cases
        FROM medical_records
        WHERE visit_date >= ${dateFilter}
        GROUP BY DATE_FORMAT(visit_date, '%Y-%m-%d')
        ORDER BY DATE_FORMAT(visit_date, '%Y-%m-%d') ASC
      `;
      break;
    case 'quarter':
      sql = `
        SELECT
          DATE_FORMAT(visit_date, '%Y-W%u') as date,
          COUNT(*) as cases
        FROM medical_records
        WHERE visit_date >= ${dateFilter}
        GROUP BY DATE_FORMAT(visit_date, '%Y-W%u')
        ORDER BY DATE_FORMAT(visit_date, '%Y-W%u') ASC
      `;
      break;
    case 'year':
      sql = `
        SELECT
          DATE_FORMAT(visit_date, '%Y-%m') as date,
          COUNT(*) as cases
        FROM medical_records
        WHERE visit_date >= ${dateFilter}
        GROUP BY DATE_FORMAT(visit_date, '%Y-%m')
        ORDER BY DATE_FORMAT(visit_date, '%Y-%m') ASC
      `;
      break;
  }

  return query<TrendData>(sql);
}

/**
 * Get total case count for a time period
 */
export async function getTotalCases(timePeriod: TimePeriod): Promise<number> {
  const dateFilter = getDateFilter(timePeriod);

  const sql = `
    SELECT COUNT(*) as total
    FROM medical_records
    WHERE visit_date >= ${dateFilter}
  `;

  const result = await query<{ total: number }>(sql);
  return result[0]?.total || 0;
}

/**
 * Get disease case count for a specific disease
 */
export async function getDiseaseCount(disease: string, days: number = 7): Promise<number> {
  const sql = `
    SELECT COUNT(*) as count
    FROM medical_records
    WHERE disease_category = ?
    AND visit_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
  `;

  const result = await query<{ count: number }>(sql, [disease, days]);
  return result[0]?.count || 0;
}

/**
 * Get per-disease monthly case counts for the last 12 months.
 * Returns one row per (disease, month) pair that has at least one case.
 * Months with zero cases are NOT returned -- the API layer pads them.
 */
export async function getDiseaseMonthlyCounts(): Promise<DiseaseMonthlyCount[]> {
  const sql = `
    SELECT
      disease_category as disease,
      DATE_FORMAT(visit_date, '%Y-%m') as monthKey,
      COUNT(*) as count
    FROM medical_records
    WHERE disease_category IS NOT NULL
      AND visit_date >= DATE_SUB(CURDATE(), INTERVAL 11 MONTH)
    GROUP BY disease_category, DATE_FORMAT(visit_date, '%Y-%m')
    ORDER BY disease_category ASC, monthKey ASC
  `;

  return query<DiseaseMonthlyCount>(sql);
}

/**
 * Helper: Get SQL date filter for time period
 */
function getDateFilter(timePeriod: TimePeriod): string {
  switch (timePeriod) {
    case 'week':
      return 'DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
    case 'month':
      return 'DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
    case 'quarter':
      return 'DATE_SUB(CURDATE(), INTERVAL 90 DAY)';
    case 'year':
      return 'DATE_SUB(CURDATE(), INTERVAL 365 DAY)';
    default:
      return 'DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
  }
}
