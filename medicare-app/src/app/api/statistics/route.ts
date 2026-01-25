import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDiseaseDistribution, getTrendData, getTotalCases } from '@/lib/queries/statistics';
import type { TimePeriod } from '@/types/statistics';

/**
 * GET /api/statistics?period=week|month|quarter|year
 * Get disease/illness statistics for a time period
 */
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = (searchParams.get('period') || 'month') as TimePeriod;

    // Validate period
    if (!['week', 'month', 'quarter', 'year'].includes(period)) {
      return NextResponse.json({ error: 'Invalid time period' }, { status: 400 });
    }

    // Get statistics
    const [diseaseBreakdown, trendData, totalCases] = await Promise.all([
      getDiseaseDistribution(period),
      getTrendData(period),
      getTotalCases(period)
    ]);

    return NextResponse.json({
      diseaseBreakdown,
      trendData,
      totalCases,
      timePeriod: period
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
