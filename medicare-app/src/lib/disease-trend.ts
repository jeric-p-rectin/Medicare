import { createAlert, trendAlertExists } from './queries/alerts';
import { query } from './db';

/**
 * Check whether the given disease has a significant month-over-month increase
 * and, if so, create a HIGH-priority DISEASE_TREND alert.
 *
 * Rules:
 *   - previous month > 0:  alert if percentChange >= 50 AND currentCount >= 2
 *                            AND (currentCount - previousCount) >= 2
 *   - previous month == 0: alert if currentCount >= 3
 *   - current month == 0:  no alert (a drop to zero is not a health concern)
 *   - 24-hour spam prevention per disease (same pattern as outbreak alerts)
 *
 * Called immediately after createMedicalRecord in the POST /api/students/[id]/records route.
 */
export async function checkDiseaseTrend(disease: string): Promise<void> {
  // --- spam prevention (24-hour window) ---
  const alreadyAlerted = await trendAlertExists(disease, 24);
  if (alreadyAlerted) return;

  // --- fetch current and previous month counts for this disease ---
  // Lower bound: first day of previous month
  const sql = `
    SELECT
      DATE_FORMAT(visit_date, '%Y-%m') as monthKey,
      COUNT(*) as count
    FROM medical_records
    WHERE disease_category = ?
      AND visit_date >= DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)
    GROUP BY DATE_FORMAT(visit_date, '%Y-%m')
    ORDER BY monthKey ASC
  `;

  const rows = await query<{ monthKey: string; count: number }>(sql, [disease]);

  // Derive the two month keys we care about
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed
  const currentMonthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;

  const prevDate = new Date(currentYear, currentMonth - 1, 1);
  const prevMonthKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

  // Look up counts; default to 0 if the month is missing from the result set
  const currentCount = rows.find(r => r.monthKey === currentMonthKey)?.count || 0;
  const previousCount = rows.find(r => r.monthKey === prevMonthKey)?.count || 0;

  // --- current month is 0 → no alert ---
  if (currentCount === 0) return;

  // --- determine whether to alert ---
  let shouldAlert = false;
  let message = '';

  if (previousCount === 0) {
    // Special case: can't compute percentage. Alert if >= 3 new cases.
    if (currentCount >= 3) {
      shouldAlert = true;
      message = `${currentCount} new ${disease} cases detected this month.`;
    }
  } else {
    const absoluteIncrease = currentCount - previousCount;
    const percentChange = ((currentCount - previousCount) / previousCount) * 100;

    if (percentChange >= 50 && currentCount >= 2 && absoluteIncrease >= 2) {
      shouldAlert = true;
      message = `${disease} cases increased by ${Math.round(percentChange)}% this month (${previousCount} last month, ${currentCount} this month).`;
    }
  }

  if (!shouldAlert) return;

  // --- create the alert ---
  await createAlert({
    alertType: 'DISEASE_TREND',
    title: `Disease Trend: ${disease}`,
    message,
    severity: 'HIGH',
    relatedDisease: disease,
    // recipientUserId intentionally omitted → null → global alert visible to all staff
  });
}
