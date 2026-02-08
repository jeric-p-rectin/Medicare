import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getGradeLevelStats } from '@/lib/queries/dashboard';

/**
 * GET /api/dashboard/grade/[grade]
 * Get statistics for a specific grade level (total + sections breakdown)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ grade: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { grade } = await params;

    // Validate grade (7-12 and Non-Graded)
    if (!['7', '8', '9', '10', '11', '12', 'Non-Graded'].includes(grade)) {
      return NextResponse.json({ error: 'Invalid grade level' }, { status: 400 });
    }

    // Get stats for this grade
    const stats = await getGradeLevelStats(grade);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching grade level stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
