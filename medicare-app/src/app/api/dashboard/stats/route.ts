import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSchoolWideStats } from '@/lib/queries/dashboard';

/**
 * GET /api/dashboard/stats
 * Get school-wide statistics (total students + breakdown by grade)
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get stats
    const stats = await getSchoolWideStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
