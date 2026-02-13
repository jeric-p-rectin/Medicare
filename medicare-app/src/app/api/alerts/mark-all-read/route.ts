import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { markAllAlertsAsRead } from '@/lib/queries/alerts';

/**
 * Mark all unread alerts as read for the current user
 * POST /api/alerts/mark-all-read
 */
export async function POST() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mark all unread alerts as read for this user
    await markAllAlertsAsRead(session.user.id);

    return NextResponse.json({
      success: true,
      message: 'All alerts marked as read'
    });
  } catch (error) {
    console.error('Failed to mark all alerts as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark all alerts as read' },
      { status: 500 }
    );
  }
}
