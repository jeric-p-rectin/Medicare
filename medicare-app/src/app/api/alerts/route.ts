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

    let alerts = await getAlerts({ unread, limit });

    // ROLE-BASED FILTERING FOR SYSTEM ALERTS
    // SUPER_ADMIN sees all alerts including SYSTEM alerts (approval notifications)
    // ADMIN/PATIENT should NOT see SYSTEM alerts (they're not meant for them)
    if (session.user.role !== 'SUPER_ADMIN') {
      alerts = alerts.filter(alert => alert.alertType !== 'SYSTEM');
    }

    return NextResponse.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
