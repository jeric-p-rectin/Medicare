import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAlerts } from '@/lib/queries/alerts';

/**
 * GET /api/alerts?unread=true&limit=10
 * Get alerts (optionally filter by unread)
 */
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const unread = searchParams.get('unread') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');

    const alerts = await getAlerts({ unread, limit });

    return NextResponse.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
