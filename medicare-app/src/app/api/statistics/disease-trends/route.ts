import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDiseaseMonthlyCounts } from '@/lib/queries/statistics';
import type { DiseaseTrendEntry, DiseaseTrendsResponse } from '@/types/statistics';

/**
 * GET /api/statistics/disease-trends
 * Returns per-disease monthly histogram data for the last 12 months,
 * plus current/previous month counts and percent change for trend badges.
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rows = await getDiseaseMonthlyCounts();

    // --- build the 12-month key array (current month back to 11 months ago) ---
    const monthKeys: string[] = [];
    const monthLabels: string[] = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      monthKeys.push(key);
      monthLabels.push(label);
    }

    // --- group rows by disease ---
    const diseaseMap = new Map<string, Map<string, number>>();
    for (const row of rows) {
      if (!diseaseMap.has(row.disease)) {
        diseaseMap.set(row.disease, new Map());
      }
      diseaseMap.get(row.disease)!.set(row.monthKey, row.count);
    }

    // --- transform into DiseaseTrendEntry[] ---
    const currentMonthKey = monthKeys[11]; // last element = current month
    const previousMonthKey = monthKeys[10]; // second-to-last = previous month

    const trends: DiseaseTrendEntry[] = [];

    diseaseMap.forEach((monthCounts, disease) => {
      const months = monthKeys.map((key, idx) => ({
        label: monthLabels[idx],
        count: monthCounts.get(key) || 0,
      }));

      const currentCount = monthCounts.get(currentMonthKey) || 0;
      const previousCount = monthCounts.get(previousMonthKey) || 0;

      let percentChange: number | null = null;
      if (previousCount > 0) {
        percentChange = Math.round(((currentCount - previousCount) / previousCount) * 100);
      }

      trends.push({ disease, months, currentCount, previousCount, percentChange });
    });

    // Sort alphabetically by disease name for stable rendering order
    trends.sort((a, b) => a.disease.localeCompare(b.disease));

    const response: DiseaseTrendsResponse = { trends };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching disease trends:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
