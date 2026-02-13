import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { checkOutbreakThreshold, getOutbreakThresholds } from '@/lib/alert-system';

export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await auth();
    if (!session || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get all configured disease thresholds
    const thresholds = await getOutbreakThresholds();

    // 3. Trigger outbreak check for each disease
    const results = [];
    for (const threshold of thresholds) {
      await checkOutbreakThreshold(threshold.disease);
      results.push({
        disease: threshold.disease,
        threshold: threshold.casesPerWeek,
        checked: true
      });
    }

    // 4. Return summary
    return NextResponse.json({
      message: 'Alert checking completed',
      diseasesChecked: results.length,
      diseases: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error triggering alerts:', error);
    return NextResponse.json(
      { error: 'Failed to trigger alert checking' },
      { status: 500 }
    );
  }
}
